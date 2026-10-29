import type { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import { CONSENT_TEXT, OTHER_CITY } from '@/lib/config';
import { ATTRIBUTION_KEYS, propertyLabel, splitName, toE164, validateLead, type FieldErrors, type LeadInput } from '@/lib/lead';
import { crmConfigured, deliverLead } from '@/lib/ghl';

export type LeadResponse =
  | { ok: true; leadId: string; firstName: string }
  | { ok: false; error: string; fieldErrors?: FieldErrors };

// Best-effort per-instance throttle. Serverless instances are short-lived, so this only stops bursts.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const MIN_FILL_MS = 2500;

function str(v: unknown, max = 200): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LeadResponse>) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '').split(',')[0].trim();
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many requests. Please call us instead.' });
  }

  const b = (req.body ?? {}) as Record<string, unknown>;
  const attrIn = (b.attribution ?? {}) as Record<string, unknown>;
  const attribution: Record<string, string | undefined> = {};
  for (const k of ATTRIBUTION_KEYS) if (str(attrIn[k])) attribution[k] = str(attrIn[k]);

  const lead: LeadInput = {
    propertyType: str(b.propertyType, 40),
    otherProperty: str(b.otherProperty, 80),
    serviceType: str(b.serviceType, 80),
    timeline: str(b.timeline, 80),
    city: str(b.city, 80),
    otherCity: str(b.otherCity, 80),
    name: str(b.name, 100),
    phone: str(b.phone, 30),
    email: str(b.email, 120),
    message: str(b.message, 1500),
    smsConsent: b.smsConsent === true,
    attribution,
  };

  const leadId = randomUUID();
  const { firstName, lastName } = splitName(lead.name);

  // Bots: filled honeypot or inhumanly fast submit. Pretend success so they don't adapt.
  const elapsed = typeof b.elapsedMs === 'number' ? b.elapsedMs : 0;
  if (str(b.company_website) || elapsed < MIN_FILL_MS) {
    console.warn('[lead] dropped as spam', { ip, elapsed });
    return res.status(200).json({ ok: true, leadId, firstName });
  }

  const fieldErrors = validateLead(lead);
  if (Object.keys(fieldErrors).length) {
    return res.status(400).json({ ok: false, error: 'Please check the highlighted fields.', fieldErrors });
  }

  if (!crmConfigured()) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[lead] CRM not configured – dev mode, lead logged only', { leadId, ...lead });
      return res.status(200).json({ ok: true, leadId, firstName });
    }
    console.error('[lead] CRM not configured in production – set GHL_* env vars');
    return res.status(503).json({ ok: false, error: 'We could not submit your request right now.' });
  }

  const result = await deliverLead({
    leadId,
    firstName,
    lastName,
    phoneE164: toE164(lead.phone),
    email: lead.email,
    propertyType: lead.propertyType === 'other' ? `Other – ${lead.otherProperty}` : propertyLabel(lead.propertyType),
    serviceType: lead.serviceType,
    timeline: lead.timeline,
    city: lead.city === OTHER_CITY ? lead.otherCity : lead.city,
    message: lead.message,
    smsConsent: lead.smsConsent,
    consentText: CONSENT_TEXT,
    attribution,
    ip,
    userAgent: str(req.headers['user-agent'], 300),
    submittedAt: new Date().toISOString(),
  });

  if (result.errors.length) console.error('[lead] delivery issues', { leadId, errors: result.errors });
  if (!result.delivered) {
    return res.status(502).json({ ok: false, error: 'We could not submit your request right now.' });
  }
  return res.status(200).json({ ok: true, leadId, firstName });
}
