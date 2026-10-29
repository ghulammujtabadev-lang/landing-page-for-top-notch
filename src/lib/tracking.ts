// Browser-only helpers: ad attribution capture and Google Ads conversion firing.
import { TRACKING } from './config';
import { ATTRIBUTION_KEYS, type Attribution } from './lead';

const ATTR_KEY = 'tn_attribution';
const ATTR_TTL_MS = 90 * 24 * 60 * 60 * 1000; // Google Ads click IDs are valid for 90 days
export const LEAD_HANDOFF_KEY = 'tn_lead_handoff';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function safeStorage(kind: 'local' | 'session'): Storage | null {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Store UTM/click IDs from the current URL. A new ad click overwrites the old one. */
export function captureAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Attribution = {};
  for (const k of ATTRIBUTION_KEYS) {
    const v = params.get(k);
    if (v) fromUrl[k] = v.slice(0, 200);
  }
  const store = safeStorage('local');
  let saved: { at: number; data: Attribution } | null = null;
  try {
    saved = JSON.parse(store?.getItem(ATTR_KEY) ?? 'null');
  } catch {
    saved = null;
  }
  if (saved && Date.now() - saved.at > ATTR_TTL_MS) saved = null;

  const isNewClick = Object.keys(fromUrl).length > 0;
  const data: Attribution = isNewClick
    ? { ...fromUrl, landing_page: window.location.pathname + window.location.search, referrer: document.referrer || undefined }
    : saved?.data ?? { landing_page: window.location.pathname, referrer: document.referrer || undefined };

  if (isNewClick || !saved) {
    try {
      store?.setItem(ATTR_KEY, JSON.stringify({ at: Date.now(), data }));
    } catch {
      /* storage blocked – attribution still sent from memory */
    }
  }
  return data;
}

export interface LeadHandoff {
  leadId: string;
  firstName: string;
  email?: string;
  phoneE164: string;
  propertyLabel: string;
  city: string;
  timeline: string;
}

export function saveHandoff(h: LeadHandoff) {
  try {
    safeStorage('session')?.setItem(LEAD_HANDOFF_KEY, JSON.stringify(h));
  } catch {
    /* ignore */
  }
}

export function readHandoff(): LeadHandoff | null {
  try {
    return JSON.parse(safeStorage('session')?.getItem(LEAD_HANDOFF_KEY) ?? 'null');
  } catch {
    return null;
  }
}

/** Fire the Google Ads conversion once per lead (refreshes/back-navigation won't double count). */
export function fireLeadConversion(h: LeadHandoff) {
  const firedKey = `tn_conv_${h.leadId}`;
  const ss = safeStorage('session');
  if (ss?.getItem(firedKey)) return;

  const sendTo = TRACKING.leadConversion;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'generate_lead', lead_id: h.leadId, property_type: h.propertyLabel, city: h.city });

  if (typeof window.gtag === 'function') {
    // Enhanced conversions: gtag hashes these before sending.
    window.gtag('set', 'user_data', {
      ...(h.email ? { email: h.email } : {}),
      phone_number: h.phoneE164,
    });
    if (sendTo) window.gtag('event', 'conversion', { send_to: sendTo, transaction_id: h.leadId });
  }
  ss?.setItem(firedKey, '1');
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}
