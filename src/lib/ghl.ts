// Server-only GoHighLevel delivery. Never import this from a page component.
import { BUSINESS } from './config';

const API = 'https://services.leadconnectorhq.com';
const API_VERSION = '2021-07-28';
const TIMEOUT_MS = 8000;

export interface CrmLead {
  leadId: string;
  firstName: string;
  lastName: string;
  phoneE164: string;
  email?: string;
  propertyType: string;
  serviceType: string;
  timeline: string;
  city: string;
  message: string;
  smsConsent: boolean;
  consentText: string;
  attribution: Record<string, string | undefined>;
  ip?: string;
  userAgent?: string;
  submittedAt: string;
}

export interface DeliveryResult {
  delivered: boolean;
  contactId?: string;
  errors: string[];
}

export function crmConfigured(): boolean {
  return Boolean((process.env.GHL_PRIVATE_TOKEN && process.env.GHL_LOCATION_ID) || process.env.GHL_WEBHOOK_URL);
}

function tagsFor(lead: CrmLead): string[] {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return [
    'lp-residential',
    'source-google-ads-lp',
    `property-${slug(lead.propertyType)}`,
    `service-${slug(lead.serviceType)}`,
    `city-${slug(lead.city)}`,
    lead.timeline.startsWith('Immediate') ? 'urgent-24h' : '',
    lead.smsConsent ? 'sms-consent-yes' : 'sms-consent-no',
  ].filter(Boolean);
}

function noteFor(lead: CrmLead): string {
  const a = lead.attribution;
  return [
    `NEW RESIDENTIAL LEAD – ${lead.leadId}`,
    `Property: ${lead.propertyType}`,
    `Service: ${lead.serviceType}`,
    `Timeline: ${lead.timeline}`,
    `City: ${lead.city}`,
    `Details: ${lead.message || '—'}`,
    '',
    `SMS/call consent: ${lead.smsConsent ? 'YES' : 'NO'} (${lead.submittedAt}, IP ${lead.ip ?? 'n/a'})`,
    lead.smsConsent ? `Consent text: "${lead.consentText}"` : '',
    '',
    `Campaign: ${a.utm_campaign ?? '—'} | Term: ${a.utm_term ?? '—'} | Source: ${a.utm_source ?? '—'}/${a.utm_medium ?? '—'}`,
    `GCLID: ${a.gclid ?? a.gbraid ?? a.wbraid ?? '—'}`,
    `Landing page: ${a.landing_page ?? '—'}`,
  ]
    .filter((l) => l !== '')
    .join('\n');
}

function customFields(lead: CrmLead): { id: string; field_value: string }[] {
  let ids: Record<string, string> = {};
  try {
    ids = JSON.parse(process.env.GHL_CUSTOM_FIELD_IDS || '{}');
  } catch {
    console.error('[ghl] GHL_CUSTOM_FIELD_IDS is not valid JSON – skipping custom fields');
  }
  const values: Record<string, string | undefined> = {
    property_type: lead.propertyType,
    service_type: lead.serviceType,
    timeline: lead.timeline,
    city: lead.city,
    message: lead.message,
    gclid: lead.attribution.gclid ?? lead.attribution.gbraid ?? lead.attribution.wbraid,
    utm_source: lead.attribution.utm_source,
    utm_medium: lead.attribution.utm_medium,
    utm_campaign: lead.attribution.utm_campaign,
    utm_term: lead.attribution.utm_term,
    landing_page: lead.attribution.landing_page,
  };
  return Object.entries(ids)
    .filter(([key, id]) => id && values[key])
    .map(([key, id]) => ({ id, field_value: String(values[key]) }));
}

async function ghl(path: string, body: unknown): Promise<any> {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GHL_PRIVATE_TOKEN}`,
      Version: API_VERSION,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`GHL ${path} ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

async function deliverViaApi(lead: CrmLead, errors: string[]): Promise<string | undefined> {
  const locationId = process.env.GHL_LOCATION_ID!;
  const upsert = await ghl('/contacts/upsert', {
    locationId,
    firstName: lead.firstName,
    lastName: lead.lastName || undefined,
    phone: lead.phoneE164,
    email: lead.email || undefined,
    city: lead.city,
    state: 'CA',
    country: 'US',
    source: 'Residential Landing Page (Google Ads)',
    customFields: customFields(lead),
  });
  const contactId: string | undefined = upsert?.contact?.id;
  if (!contactId) throw new Error('GHL upsert returned no contact id');

  // Secondary steps: a failure here must not lose the lead, so collect errors instead of throwing.
  const followUps: Promise<unknown>[] = [
    ghl(`/contacts/${contactId}/tags`, { tags: tagsFor(lead) }),
    ghl(`/contacts/${contactId}/notes`, { body: noteFor(lead) }),
  ];
  if (process.env.GHL_PIPELINE_ID && process.env.GHL_PIPELINE_STAGE_ID) {
    followUps.push(
      ghl('/opportunities/', {
        locationId,
        pipelineId: process.env.GHL_PIPELINE_ID,
        pipelineStageId: process.env.GHL_PIPELINE_STAGE_ID,
        contactId,
        name: `${lead.firstName} ${lead.lastName}`.trim() + ` – ${lead.propertyType} (${lead.city})`,
        status: 'open',
        source: 'Residential Landing Page',
      }),
    );
  }
  for (const r of await Promise.allSettled(followUps)) {
    if (r.status === 'rejected') errors.push(String(r.reason));
  }
  return contactId;
}

async function deliverViaWebhook(lead: CrmLead): Promise<void> {
  const res = await fetch(process.env.GHL_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lead_id: lead.leadId,
      first_name: lead.firstName,
      last_name: lead.lastName,
      full_name: `${lead.firstName} ${lead.lastName}`.trim(),
      phone: lead.phoneE164,
      email: lead.email ?? '',
      city: lead.city,
      state: 'CA',
      property_type: lead.propertyType,
      service_type: lead.serviceType,
      timeline: lead.timeline,
      message: lead.message,
      sms_consent: lead.smsConsent,
      consent_text: lead.smsConsent ? lead.consentText : '',
      tags: tagsFor(lead).join(','),
      note: noteFor(lead),
      submitted_at: lead.submittedAt,
      source: 'Residential Landing Page (Google Ads)',
      business: BUSINESS.name,
      ...lead.attribution,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`GHL webhook ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

/** Deliver to every configured channel. Succeeds if at least one primary channel accepted the lead. */
export async function deliverLead(lead: CrmLead): Promise<DeliveryResult> {
  const errors: string[] = [];
  let delivered = false;
  let contactId: string | undefined;

  const useApi = Boolean(process.env.GHL_PRIVATE_TOKEN && process.env.GHL_LOCATION_ID);
  const useWebhook = Boolean(process.env.GHL_WEBHOOK_URL);

  const [api, hook] = await Promise.allSettled([
    useApi ? deliverViaApi(lead, errors) : Promise.resolve(undefined),
    useWebhook ? deliverViaWebhook(lead) : Promise.resolve(),
  ]);
  if (useApi) {
    if (api.status === 'fulfilled') {
      delivered = true;
      contactId = api.value;
    } else errors.push(String(api.reason));
  }
  if (useWebhook) {
    if (hook.status === 'fulfilled') delivered = true;
    else errors.push(String(hook.reason));
  }
  return { delivered, contactId, errors };
}
