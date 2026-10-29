# GoHighLevel + Google Ads Setup – Residential Landing Page

Follow this guide top to bottom in the new GHL sub-account. Every name below (fields, tags, pipeline, stages,
conversion actions) matches what the landing page code sends. **Use the names exactly as written.**

> GHL menus move around. If a menu path below doesn't match your screen, search for the item name in GHL's settings.

---

## How it fits together (no bridge software needed)

```
Google Ad click (gclid) ──► Landing page (Vercel) ──► /api/lead (Vercel server) ──► GHL API v2
                                │                                                    │ contact + custom fields
                                │ thank-you page fires "Residential LP – Lead"       │ note + tags (WF-1 adds the opportunity)
                                ▼ (with enhanced conversions)                        ▼
                           Google Ads  ◄─────────── "Add to Google Ads" workflow ── GHL pipeline stage changes
                                         (offline conversions: Qualified Lead, Closed Deal)
```

- The page talks to GHL **directly** through GHL's official API. There's no Zapier or Make, and no monthly fee
  for middleware. The API token lives only on the Vercel server.
- Google Ads gets the lead instantly from the thank-you page. Later it gets **lead quality** back from GHL when you
  move a lead through the pipeline. That second part teaches Google to find buyers instead of tire-kickers.

---

## Part 1 – GoHighLevel

### 1.1 Business basics
- **Settings → Business Profile**: legal name *Top Notch Security Solutions*, address *3183 Wayside Plaza, Walnut
  Creek, CA 94597*, phone, website, and **time zone America/Los_Angeles**. Workflow wait steps and business hours use
  this time zone.
- Copy the **Location ID** shown on that page. You'll need it for Vercel.

### 1.2 Phone number + A2P 10DLC (required to text US numbers)
1. **Settings → Phone Numbers**: buy a local 925 number. You can also port or forward (925) 440-6909 later.
2. **Settings → Phone Numbers → Trust Center / A2P Registration**: register the **Brand**, then the **Campaign**.
   Approval can take days to weeks, so **start this today**. Until it's approved, SMS confirmations won't send.
   Calls and emails still work.
3. In the campaign registration:
   - **Use case**: Customer Care, or Mixed (customer care + account notifications). Don't pick marketing.
   - **Opt-in description**: "Customers opt in by checking an unchecked consent box on our quote request form at
     <landing page URL> before submitting. The consent text is displayed next to the box."
   - **Opt-in text**: copy `CONSENT_TEXT` from `src/lib/config.ts` word for word.
   - **Sample messages**: use the SMS templates in 1.7 below.
4. **Privacy policy**: carriers check it, and the current policy at /privacy **has no SMS section**. Ask the website
   developer to add this paragraph:

   > **SMS/Text Messaging.** If you opt in to receive text messages, we use your mobile number only to respond to
   > your inquiry and provide service updates. Message frequency varies; message and data rates may apply. Reply STOP
   > to opt out or HELP for help. **No mobile information will be shared with third parties or affiliates for
   > marketing or promotional purposes.** Text messaging originator opt-in data and consent will not be shared with
   > any third parties.

### 1.3 Email sending domain
- **Settings → Email Services**: add a dedicated sending domain such as `mail.topnotchsecuritysolutions.com`.
- Add the DNS records GHL shows at the domain's DNS provider. This makes confirmation emails land in the inbox
  instead of spam.

### 1.4 Custom fields (Settings → Custom Fields → Contact)
Create a folder **"Landing Page"** and add these fields with **exactly these names**. The page finds them by name,
so you don't need to copy any IDs.

| Field name | Type | Filled with |
|---|---|---|
| Property Type | Single line | Home or estate / HOA or gated community / … |
| Service Type | Single line | Unarmed / Armed / Patrol / Not sure |
| Timeline | Single line | Immediate (Within 24 hours) … |
| Lead Details | Multi line | Visitor's notes |
| Google Click ID | Single line | Google click ID (**required for offline conversions**). GHL refuses the name "GCLID" because it has a built-in field by that name |
| GBRAID | Single line | Google click ID for iOS traffic |
| WBRAID | Single line | Google click ID for iOS web-to-app traffic |
| UTM Source | Single line | e.g. google |
| UTM Medium | Single line | e.g. cpc |
| UTM Campaign | Single line | campaign ID or name |
| UTM Term | Single line | keyword that was searched |
| UTM Content | Single line | ad group |
| Landing Page | Single line | URL the visitor landed on |

City, name, phone and email go into GHL's standard contact fields. A field you skip is just not filled; its value
still appears in the lead note.

### 1.5 Tags (created automatically, no setup needed)
`lp-residential` · `source-google-ads-lp` · `property-<type>` (e.g. `property-hoa-or-gated-community`) ·
`service-<type>` · `city-<city>` · `urgent-24h` (when "Immediate (Within 24 hours)" is chosen) ·
`sms-consent-yes` / `sms-consent-no`

### 1.6 Pipeline (Opportunities → Pipelines → Create)
Name: **Residential Security**. Create the stages in this order:

1. **New Lead** – WF-1 creates every opportunity here
2. **Contacted**
3. **Assessment Scheduled** – sends "Qualified Lead" to Google Ads (Part 2)
4. **Quote Sent**
5. **Won** – mark the opportunity status *Won* and enter the contract value. This sends "Closed Deal" to Google Ads.
6. **Lost** – mark status *Lost* with a reason

If the same person submits twice, GHL may refuse a second opportunity in the same pipeline. The contact, note and
tags are still updated.

### 1.7 Workflows (Automation → Workflows → Create from scratch)

**WF-1 "Residential LP – New Lead"**
- **Trigger**: Contact Tag Added → `lp-residential`
- **Settings → Allow re-entry: ON.** When someone submits the form again, the page first removes `lp-residential`
  (plus `urgent-24h` and `sms-consent-yes`/`-no`) and then adds the new tags, so the workflow runs again with the
  latest answers. In step 0, leave "Allow duplicate opportunities" off so the existing opportunity is updated.
- **Actions**:
  0. **Create/Update Opportunity** → pipeline *Residential Security*, stage *New Lead*, name
     `{{contact.name}} – {{contact.property_type}} ({{contact.city}})`, source `Residential Landing Page`.
     The page's API token deliberately has no opportunity access, so this step is what puts the lead in the pipeline.
  1. **Internal Notification (SMS + email)** to the owner and sales team:
     `🚨 New residential lead: {{contact.name}} {{contact.phone}} – {{contact.property_type}}, {{contact.service_type}}, {{contact.city}}. Timeline: {{contact.timeline}}`
     Use the merge-field picker so the custom-field keys come out right.
  2. **If/Else** → contact has tag `urgent-24h`. Yes → a second notification: "URGENT – call within 15 min".
  3. **If/Else** → contact has tag `sms-consent-yes`. Yes → **Send SMS**:
     `Hi {{contact.first_name}}, this is Top Notch Security Solutions. We received your security request and a licensed consultant will call you shortly from (925) 440-6909. Reply STOP to opt out.`
  4. **If/Else** → email is not empty. Yes → **Send Email** "We received your request – here's what happens next"
     (same 3 steps as the thank-you page).
  5. **Create Task** for the assigned user: "Call {{contact.name}}", due in 2 hours.
  6. **Wait** 2 hours (business hours only) → **If/Else** opportunity still in *New Lead* → notify the manager:
     "Lead not contacted yet."

**WF-2 "Google Ads – Qualified Lead"** (after Part 2 is done)
- **Trigger**: Pipeline Stage Changed → pipeline *Residential Security*, stage *Assessment Scheduled*
- **Action**: **Add to Google Ads** → conversion action **Residential – Qualified Lead**

**WF-3 "Google Ads – Closed Deal"** (after Part 2 is done)
- **Trigger**: Opportunity Status Changed → *Won* (pipeline Residential Security)
- **Action**: **Add to Google Ads** → conversion action **Residential – Closed Deal**, with the value set to the
  opportunity value

### 1.8 API access for the landing page
1. **Settings → Private Integrations → Create new integration**. Name it "Residential Landing Page".
2. Select only these scopes: **View Contacts, Edit Contacts, View Custom Fields**. Nothing else: the page only creates
   contacts, notes and tags, and WF-1 creates the opportunity.
3. Copy the token. **It is shown only once.** Don't paste it into chat or email.
4. In **Vercel → the landing-page project → Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `GHL_PRIVATE_TOKEN` | the token |
| `GHL_LOCATION_ID` | from 1.1 |

5. Redeploy: Vercel → Deployments → ⋯ → Redeploy.

### 1.9 Test (5 minutes)
1. Open `https://<your-domain>/residential-security?gclid=TEST123&utm_term=test` and submit with your own mobile
   number. Tick the consent box.
2. In GHL, check that:
   - the contact exists
   - the custom fields are filled, including **GCLID = TEST123**
   - the note has all the answers
   - the tags are applied
   - an opportunity is in *New Lead*
   - WF-1 ran
3. Delete the test contact afterwards so the fake gclid is never uploaded to Google.
4. If something is missing, check Vercel → Project → Logs and search for `[ghl]`. The log names the missing field
   or the GHL error.

---

## Part 2 – Google Ads

### 2.1 Account settings
- **Admin → Account settings → Auto-tagging: ON.** Without this, there's no gclid and no offline conversions.
- **Final URL suffix** (account or campaign level):
  `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={adgroupid}`
- **Customer data terms**: accept them under Goals → Conversions → Settings. Enhanced conversions need this.

### 2.2 Conversion actions (Goals → Conversions → New conversion action)

| Name (exact) | Source | Category | Count | Primary? | Notes |
|---|---|---|---|---|---|
| **Residential LP – Lead** | Website (set up manually with code) | Submit lead form | One | **Primary** at launch | Turn on **Enhanced conversions** (Google tag method). Send me the `AW-17120170393/xxxx` label, or put it in Vercel as `NEXT_PUBLIC_GADS_CONVERSION`. |
| **Residential – Qualified Lead** | Import → CRM / other data sources → Track conversions from clicks | Qualified lead | One | Secondary at first | Used by WF-2 |
| **Residential – Closed Deal** | Import → same | Converted lead / Purchase | One | Secondary at first | Use transaction-specific values. Used by WF-3 |
| **Calls from ads** | Phone calls → from ads (call assets) | Phone call lead | One | Primary | Calls of 60+ seconds through a Google forwarding number |
| **Click to call (mobile)** | Website → click on phone number | Phone call lead | One | Secondary | Optional. The page already sends a `click_to_call` dataLayer event for GTM. |

The *Qualified Lead* and *Closed Deal* names must match the GHL workflow setting **exactly**, including the dash and
spaces.

### 2.3 Connect Google Ads to GHL
- In GHL, go to **Settings → Integrations → Google** and connect the Google account that has access to the Ads
  account. Then choose that Ads account.
- Then finish WF-2 and WF-3 (1.7) by choosing the conversion actions.

### 2.4 Sending data back – how it improves results
1. **Launch**: optimise for *Residential LP – Lead*. You get fast signal from day one.
2. **After about 30 qualified leads a month**: make *Residential – Qualified Lead* primary and the LP lead
   secondary. Google then bids for people who actually book assessments.
3. **Later**: with enough *Closed Deal* conversions that carry values, switch to *Maximize conversion value / tROAS*.

Offline conversions must be uploaded **within 90 days of the click**. The workflows upload them as soon as a stage
changes, so this is automatic.

### 2.5 If the "Add to Google Ads" action skips a contact
GHL's action needs a click ID on the contact. Our page stores it in the **GCLID / GBRAID / WBRAID** custom fields.
GHL's documentation doesn't clearly say whether the action reads these custom fields or only GHL's own attribution
data, which is filled when GHL's own forms are used. After the first real ad lead reaches *Assessment Scheduled*,
open WF-2's **execution log**:

- **Success** → you're done.
- **"No click ID" / skipped** → use the fallback below. It needs no code changes:
  1. In GHL, add a **Google Sheets → Create Row** action to WF-2 and WF-3. Write to a sheet with these columns:
     `Google Click ID` ({{contact.gclid}}), `Conversion Name` (e.g. Residential – Qualified Lead),
     `Conversion Time` (the current date and time from GHL's "right now" merge fields, formatted
     `yyyy-MM-dd HH:mm:ss`), `Conversion Value`, `Conversion Currency` (USD). Start the sheet from Google's
     offline-conversion template and set its first row to `Parameters:TimeZone=America/Los_Angeles`.
  2. In Google Ads, go to **Goals → Conversions → Uploads → Schedules**, choose that Google Sheet, and set it to run
     **daily**.

---

## Part 3 – Values to send to me (or put in Vercel yourself)
- [ ] `NEXT_PUBLIC_GADS_CONVERSION`: the label of *Residential LP – Lead*
- [ ] Confirmation that the token and Location ID are in Vercel (**don't send the token**)
- [ ] The domain or subdomain the page will live on
- [ ] Optional: a Google Tag Manager container ID, if you want GTM
