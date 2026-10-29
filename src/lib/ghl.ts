// Server-only GoHighLevel delivery. Never import this from a page component.
import { BUSINESS } from './config';

// GHL_API_BASE exists only so tests can point at a mock server.
const API = process.env.GHL_API_BASE || 'https://services.leadconnectorhq.com';
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
    `Click ID: ${a.gclid ? `gclid ${a.gclid}` : a.gbraid ? `gbraid ${a.gbraid}` : a.wbraid ? `wbraid ${a.wbraid}` : '—'}`,
    `Landing page: ${a.landing_page ?? '—'}`,
  ]
    .filter((l) => l !== '')
    .join('\n');
}

// Contact custom fields this page fills. Create them in GHL (Settings → Custom Fields → Contact) with exactly
// these names; GHL turns the name into the key shown here (e.g. "Property Type" → contact.property_type).
export const CUSTOM_FIELDS = {
  property_type: 'Property Type',
  service_type: 'Service Type',
  timeline: 'Timeline',
  lead_details: 'Lead Details',
  gclid: 'Google Click ID', // "GCLID" is taken by a GHL standard field the API ignores
  gbraid: 'GBRAID',
  wbraid: 'WBRAID',
  utm_source: 'UTM Source',
  utm_medium: 'UTM Medium',
  utm_campaign: 'UTM Campaign',
  utm_term: 'UTM Term',
  utm_content: 'UTM Content',
  landing_page: 'Landing Page',
} as const;
type FieldKey = keyof typeof CUSTOM_FIELDS;

// key → GHL field id, looked up once per server instance.
let fieldIdCache: { at: number; ids: Partial<Record<FieldKey, string>> } | null = null;
const FIELD_CACHE_MS = 10 * 60 * 1000;

async function resolveFieldIds(): Promise<Partial<Record<FieldKey, string>>> {
  // Manual override, if someone prefers to paste ids: {"gclid":"abc123",...}
  if (process.env.GHL_CUSTOM_FIELD_IDS) {
    try {
      return JSON.parse(process.env.GHL_CUSTOM_FIELD_IDS);
    } catch {
      console.error('[ghl] GHL_CUSTOM_FIELD_IDS is not valid JSON – falling back to lookup by name');
    }
  }
  if (fieldIdCache && Date.now() - fieldIdCache.at < FIELD_CACHE_MS) return fieldIdCache.ids;

  const data = await ghlRequest('GET', `/locations/${process.env.GHL_LOCATION_ID}/customFields?model=contact`);
  const ids: Partial<Record<FieldKey, string>> = {};
  for (const f of (data?.customFields ?? []) as { id: string; name?: string; fieldKey?: string }[]) {
    const key = (f.fieldKey ?? '').replace(/^contact\./, '');
    const byKey = (Object.keys(CUSTOM_FIELDS) as FieldKey[]).find((k) => k === key);
    const byName = (Object.keys(CUSTOM_FIELDS) as FieldKey[]).find(
      (k) => CUSTOM_FIELDS[k].toLowerCase() === (f.name ?? '').trim().toLowerCase(),
    );
    const match = byKey ?? byName;
    if (match) ids[match] = f.id;
  }
  const missing = (Object.keys(CUSTOM_FIELDS) as FieldKey[]).filter((k) => !ids[k]);
  if (missing.length) console.warn('[ghl] custom fields not found in GHL (create them to store these values):', missing.join(', '));
  fieldIdCache = { at: Date.now(), ids };
  return ids;
}

async function customFields(lead: CrmLead): Promise<{ id: string; key: string; field_value: string }[]> {
  let ids: Partial<Record<FieldKey, string>> = {};
  try {
    ids = await resolveFieldIds();
  } catch (err) {
    // Missing scope or API hiccup: still create the contact, the note keeps every value.
    console.error('[ghl] could not load custom fields', String(err));
  }
  const a = lead.attribution;
  const values: Record<FieldKey, string | undefined> = {
    property_type: lead.propertyType,
    service_type: lead.serviceType,
    timeline: lead.timeline,
    lead_details: lead.message,
    gclid: a.gclid,
    gbraid: a.gbraid,
    wbraid: a.wbraid,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_term: a.utm_term,
    utm_content: a.utm_content,
    landing_page: a.landing_page,
  };
  // Only non-empty values are sent, so a later visit without a click id never wipes the stored one.
  return (Object.keys(values) as FieldKey[])
    .filter((k) => ids[k] && values[k])
    .map((k) => ({ id: ids[k]!, key: k, field_value: String(values[k]) }));
}

async function ghlRequest(method: 'GET' | 'POST', path: string, body?: unknown): Promise<any> {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.GHL_PRIVATE_TOKEN}`,
      Version: API_VERSION,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`GHL ${path} ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

const ghl = (path: string, body: unknown) => ghlRequest('POST', path, body);

let pipelineCache: { at: number; value: { pipelineId: string; stageId: string } | null } | null = null;

/** Pipeline for new opportunities: explicit ids, or looked up by GHL_PIPELINE_NAME (+ optional stage name). */
async function resolvePipeline(): Promise<{ pipelineId: string; stageId: string } | null> {
  if (process.env.GHL_PIPELINE_ID && process.env.GHL_PIPELINE_STAGE_ID) {
    return { pipelineId: process.env.GHL_PIPELINE_ID, stageId: process.env.GHL_PIPELINE_STAGE_ID };
  }
  const name = process.env.GHL_PIPELINE_NAME?.trim().toLowerCase();
  if (!name) return null;
  if (pipelineCache && Date.now() - pipelineCache.at < FIELD_CACHE_MS) return pipelineCache.value;

  const data = await ghlRequest('GET', `/opportunities/pipelines?locationId=${process.env.GHL_LOCATION_ID}`);
  type Pipeline = { id: string; name: string; stages?: { id: string; name: string }[] };
  const pipeline = ((data?.pipelines ?? []) as Pipeline[]).find((p) => p.name.trim().toLowerCase() === name);
  const stageName = process.env.GHL_PIPELINE_STAGE_NAME?.trim().toLowerCase();
  const stage = stageName
    ? pipeline?.stages?.find((st) => st.name.trim().toLowerCase() === stageName)
    : pipeline?.stages?.[0];
  if (!pipeline || !stage) throw new Error(`GHL pipeline "${process.env.GHL_PIPELINE_NAME}" or its stage was not found`);
  pipelineCache = { at: Date.now(), value: { pipelineId: pipeline.id, stageId: stage.id } };
  return pipelineCache.value;
}

async function createOpportunity(lead: CrmLead, contactId: string): Promise<void> {
  const pipeline = await resolvePipeline();
  if (!pipeline) return;
  await ghl('/opportunities/', {
    locationId: process.env.GHL_LOCATION_ID,
    pipelineId: pipeline.pipelineId,
    pipelineStageId: pipeline.stageId,
    contactId,
    name: `${lead.firstName} ${lead.lastName}`.trim() + ` – ${lead.propertyType} (${lead.city})`,
    status: 'open',
    source: 'Residential Landing Page',
  });
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
    customFields: await customFields(lead),
  });
  const contactId: string | undefined = upsert?.contact?.id;
  if (!contactId) throw new Error('GHL upsert returned no contact id');

  // Secondary steps: a failure here must not lose the lead, so collect errors instead of throwing.
  // The "lp-residential" tag triggers GHL workflows, so it is added after the note and opportunity exist.
  const results = await Promise.allSettled([
    ghl(`/contacts/${contactId}/notes`, { body: noteFor(lead) }),
    createOpportunity(lead, contactId),
  ]);
  results.push(...(await Promise.allSettled([ghl(`/contacts/${contactId}/tags`, { tags: tagsFor(lead) })])));
  for (const r of results) {
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
