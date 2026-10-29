# Top Notch Security – Google Ads Landing Pages

Conversion-focused landing pages for **topnotchsecuritysolutions.com** paid traffic, built on the same stack as the main
site: **Next.js 14 (Pages Router) · React 18 · Tailwind CSS · lucide icons · Inter/Poppins**, deployed on Vercel.

| Route | Purpose |
|---|---|
| `/residential-security` | Residential landing page (Bay Area) |
| `/residential-security/thank-you` | Post-submit confirmation + Google Ads conversion |
| `/api/lead` | Server route that validates the form and sends the lead to GoHighLevel |

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000/residential-security
```

Without GHL env vars, dev mode logs leads to the terminal instead of sending them.

## Editing content

Everything business-related lives in **`src/lib/config.ts`**: phone, license, hours, response-time promise,
cities, form options, headlines, testimonials, Google rating, and tracking IDs.

- **Testimonials / Google rating** – the reviews section stays hidden until you add *real* reviews there.
- **`yearsInBusiness`** – leave `null` unless it can be verified (Google Ads misrepresentation policy).

## Ad-matched headlines (message match)

The hero headline changes from URL parameters, rendered server-side (no flicker):

| Final URL | Headline |
|---|---|
| `/residential-security` | Licensed Residential Security Guards for Bay Area Homes & Communities |
| `?svc=home` | Private Home & Estate Security Guards |
| `?svc=hoa` | HOA & Gated Community Security Patrols |
| `?svc=apartment` | Apartment & Condo Security Guards |
| `?svc=vacant` | Vacant & Vacation Home Security |
| `?svc=event` | Security Guards for Private Residential Events |
| `?svc=hoa&city=walnut-creek` | HOA & Gated Community Security Patrols in Walnut Creek |

`svc` also preselects the matching option in the form. `city` accepts any of the 21 target cities (`san-jose`,
`half-moon-bay`, ...) and highlights it in the service-area list. Unknown values fall back to the default copy.

Suggested Google Ads final-URL suffix (Settings → Tracking):
`utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={adgroupid}`

## Lead form → GoHighLevel

3-step form: property type → service/timeline/city → name/phone/email (optional) + optional SMS consent.

What happens on submit:
1. The browser validates each step; the server validates again (`src/lib/lead.ts` is shared).
2. Spam is dropped silently (hidden honeypot field, minimum fill time, per-IP burst limit).
3. `/api/lead` sends the lead to GHL (below). The visitor sees **"Request received, {name}"** with the 3 next steps.
4. ~3 seconds later they are redirected to the thank-you page, which fires the Google Ads conversion **once per lead**
   (with enhanced-conversion data and `transaction_id` = lead ID for de-duplication).
5. If delivery fails, the visitor sees an error with the 24/7 phone number and their answers are kept.

Every lead carries UTM parameters, `gclid`/`gbraid`/`wbraid` (stored for 90 days), and the landing page URL.

### Option A (recommended): GHL API v2

1. GHL → **Settings → Private Integrations → Create** with scopes `contacts.write`, `contacts.readonly`
   and `opportunities.write`.
2. In Vercel → Project → **Settings → Environment Variables**, add:
   - `GHL_PRIVATE_TOKEN` – the token (never commit it)
   - `GHL_LOCATION_ID` – Settings → Business Profile → Location ID
   - optional `GHL_PIPELINE_ID` + `GHL_PIPELINE_STAGE_ID` – also creates an opportunity
   - optional `GHL_CUSTOM_FIELD_IDS` – JSON map of custom-field IDs, e.g.
     `{"property_type":"abc123","service_type":"def456","timeline":"...","city":"...","gclid":"...","utm_campaign":"...","utm_term":"..."}`

Each lead is **upserted** (no duplicate contacts), tagged, and gets a note with all answers, the consent record and the ad source.

Tags added: `lp-residential`, `source-google-ads-lp`, `property-*`, `service-*`, `city-*`, `urgent-24h`
(when "Immediate"), and `sms-consent-yes` / `sms-consent-no`.

### Option B: GHL inbound webhook

Create a Workflow with the **Inbound Webhook** trigger and put its URL in `GHL_WEBHOOK_URL`. The payload is flat JSON:
`first_name, last_name, phone (E.164), email, city, property_type, service_type, timeline, message, sms_consent,
consent_text, tags, note, gclid, utm_*`. You can set both A and B; the lead succeeds if either accepts it.

### GHL workflow to build (what the page promises)

The thank-you page tells the visitor to expect a confirmation and a call. Create a workflow triggered by
**Contact Tag Added = `lp-residential`**:
1. Send an instant SMS confirmation (only if the tag `sms-consent-yes` is present) and an email confirmation (if email exists).
2. Notify the sales team (SMS/app) – prioritise `urgent-24h`.
3. Create a call task due within the promised response time (`BUSINESS.responsePromise` in config).

## Google Ads tracking

- Tag `AW-17120170393` loads on every page (`NEXT_PUBLIC_GADS_ID` overrides it).
- Conversion fired on the thank-you page: `NEXT_PUBLIC_GADS_CONVERSION` (defaults to the main site's existing lead
  conversion). **Recommended:** create a dedicated "Residential LP – Lead" conversion action and set its
  `AW-…/label` here so this page is measured separately.
- Enable **Enhanced conversions for leads** in Google Ads; the page already sends the hashed email and phone.
- `dataLayer` events for GTM (`NEXT_PUBLIC_GTM_ID`): `lead_form_start`, `lead_form_step`,
  `lead_form_submit_success`, `lead_form_submit_error`, `generate_lead`, `click_to_call`.

## Deploying on the main domain

The main site is a separate Next.js project. Two options:

**1. Subdomain (no access to the main site needed)**
- Import this repo into Vercel as a new project, then add the domain, e.g. `secure.topnotchsecuritysolutions.com`.
- Add the CNAME record Vercel shows at your DNS provider.
- Ad final URL: `https://secure.topnotchsecuritysolutions.com/residential-security`

**2. Same domain path (`topnotchsecuritysolutions.com/residential-security`)**
- Deploy this project to Vercel (e.g. `top-notch-lp.vercel.app`).
- The main site's developer adds these rewrites to the main project's `next.config.js`:

```js
async rewrites() {
  return [
    { source: '/residential-security/:path*', destination: 'https://top-notch-lp.vercel.app/residential-security/:path*' },
    { source: '/residential-security', destination: 'https://top-notch-lp.vercel.app/residential-security' },
    { source: '/api/lead', destination: 'https://top-notch-lp.vercel.app/api/lead' },
  ];
}
```

  Assets (`/_next/*`, `/img/*`) would also need prefixing in that setup. Ask before choosing this route; the subdomain
  is simpler.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
