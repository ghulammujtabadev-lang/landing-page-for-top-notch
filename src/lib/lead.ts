// Lead shape + validation shared by the browser form and the /api/lead route.
import { CITIES, OTHER_CITY, PROPERTY_TYPES, SERVICE_TYPES, TIMELINES } from './config';

export const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'gbraid',
  'wbraid',
  'landing_page',
  'referrer',
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

export interface LeadInput {
  propertyType: string;
  serviceType: string;
  timeline: string;
  city: string;
  otherCity: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  smsConsent: boolean;
  attribution: Attribution;
  // Anti-spam: hidden honeypot field and time spent on the form.
  company_website?: string;
  elapsedMs?: number;
}

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

export const EMPTY_LEAD: LeadInput = {
  propertyType: '',
  serviceType: '',
  timeline: '',
  city: '',
  otherCity: '',
  name: '',
  phone: '',
  email: '',
  message: '',
  smsConsent: false,
  attribution: {},
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function phoneDigits(phone: string): string {
  let d = phone.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  return d;
}

export function formatPhone(input: string): string {
  const d = phoneDigits(input).slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function toE164(phone: string): string {
  return `+1${phoneDigits(phone)}`;
}

export function validateStep(step: number, lead: LeadInput): FieldErrors {
  const e: FieldErrors = {};
  if (step === 1) {
    if (!PROPERTY_TYPES.some((p) => p.key === lead.propertyType)) e.propertyType = 'Please choose what you need protected.';
  }
  if (step === 2) {
    if (!(SERVICE_TYPES as readonly string[]).includes(lead.serviceType)) e.serviceType = 'Please choose a service.';
    if (!(TIMELINES as readonly string[]).includes(lead.timeline)) e.timeline = 'Please choose when you need coverage.';
    if (lead.city !== OTHER_CITY && !CITIES.includes(lead.city)) e.city = 'Please choose your city.';
    if (lead.city === OTHER_CITY && lead.otherCity.trim().length < 2) e.otherCity = 'Please enter your city.';
  }
  if (step === 3) {
    const name = lead.name.trim();
    if (name.length < 2) e.name = 'Please enter your name.';
    else if (name.length > 80) e.name = 'Name is too long.';
    const d = phoneDigits(lead.phone);
    if (d.length !== 10 || /^[01]/.test(d)) e.phone = 'Please enter a valid 10-digit US phone number.';
    if (lead.email.trim() && !EMAIL_RE.test(lead.email.trim())) e.email = 'Please check your email address.';
    if (lead.message.length > 1500) e.message = 'Please keep details under 1,500 characters.';
  }
  return e;
}

export function validateLead(lead: LeadInput): FieldErrors {
  return { ...validateStep(1, lead), ...validateStep(2, lead), ...validateStep(3, lead) };
}

export function propertyLabel(key: string): string {
  return PROPERTY_TYPES.find((p) => p.key === key)?.label ?? key;
}

export function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] ?? '', lastName: parts.slice(1).join(' ') };
}
