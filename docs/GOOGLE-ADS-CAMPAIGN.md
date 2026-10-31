# Google Ads Campaign – Residential Security (Bay Area)

Everything needed to build the first Search campaign for
`https://www.topnotchsecuritysolutions.com/residential-security`. Conversion tracking is already set up
(see GHL-AND-GOOGLE-ADS-SETUP.md).

> Ad text only uses facts already on the landing page. "Call back within 2 hours" and "no long-term contracts"
> are left out until the client confirms them.

---

## 1. Campaign settings

| Setting | Value |
|---|---|
| Campaign type | **Search** (objective: Leads) |
| Campaign name | `Search – Residential Security – Bay Area` |
| Networks | Google Search only. **Untick** Search Partners and Display Network |
| Locations | The 21 cities below. Location option: **Presence: people in or regularly in your included locations** |
| Language | English |
| Ad schedule | All day, every day (24/7 dispatch) |
| Budget | **$60/day** (≈ $1,825/month) |
| Bidding (weeks 1–3) | **Maximize clicks**, max CPC limit **$10** |
| Bidding (after ~15–20 leads) | **Maximize conversions** |
| Goals | **Use campaign-specific goals**: only *Submit lead form* + *Phone call lead* |
| AI Max / Final URL expansion / automatically created assets | **Off** for launch, so every click goes to the right landing page |
| Broad match keywords setting | Off (we use phrase and exact match) |

**Locations (21 cities):** Oakland, San Jose, San Francisco, South San Francisco, Walnut Creek, Antioch, Richmond,
Fremont, Half Moon Bay, Santa Cruz, Napa, Fairfield, Berkeley, Alameda, Daly City, San Rafael, Vallejo, Pinole,
Livermore, Pleasanton, San Ramon (all California).

---

## 2. Ad groups, keywords and final URLs

Keyword match types: `"phrase"` and `[exact]`. Final URL suffix (UTMs) is already set at account level.

### AG1 – Residential (general)
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security`
```text
"residential security guard"
"residential security services"
"residential security company"
"home security guard"
"security guard for house"
"private security for home"
"hire a security guard"
"security guard service near me"
[residential security guard]
[home security guard]
```

### AG2 – Home & Estate
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=home`
```text
"estate security guard"
"estate security services"
"private security guard for home"
"house security guard"
"residential security officer"
"home protection security guard"
[estate security]
[private home security guard]
```

### AG3 – HOA & Gated Community
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=hoa`
```text
"hoa security"
"hoa security patrol"
"hoa security guard"
"gated community security"
"gated community security guard"
"neighborhood security patrol"
"community security patrol"
"neighborhood patrol service"
[hoa security]
[gated community security]
```

### AG4 – Apartment & Condo
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=apartment`
```text
"apartment security guard"
"apartment security patrol"
"apartment complex security"
"condo security guard"
"condominium security"
"residential building security"
[apartment security guard]
[apartment security services]
```

### AG5 – Vacant & Vacation Home
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=vacant`
```text
"vacant home security"
"vacant house security"
"vacant property security patrol"
"vacation home security"
"empty house security"
[vacant property security]
```

### AG6 – Private Events
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=event`
```text
"private event security"
"party security guard"
"house party security"
"wedding security guard"
"hire security for party"
"event security guard"
[private event security]
[party security guard]
```

---

## 3. Negative keywords (campaign level, phrase match)

```text
jobs
job
hiring
career
careers
salary
pay
hourly
resume
indeed
apply
part time
full time
near me hiring
how to become
training
course
class
classes
school
certification
license requirements
guard card
bsis exam
test
camera
cameras
cctv
alarm
alarm system
adt
ring
simplisafe
vivint
doorbell
smart home
system
install
installation
lock
locksmith
safe
diy
free
software
app
uniform
vest
games
movie
security deposit
cyber
network security
```

---

## 4. Responsive search ads (one per ad group)

Each ad uses the **12 shared headlines** + **3 ad-group headlines** = 15, and the **4 descriptions**.
Pin nothing at launch.

**Shared headlines**
```text
Licensed Security Guards
Bay Area Residential Security
Free Security Quote
Available 24/7
Licensed PPO #122479
BSIS-Licensed Officers
Armed & Unarmed Guards
Licensed, Bonded & Insured
Get a Quote in 30 Seconds
Vetted, Trained Officers
Local Walnut Creek Company
Rated 5.0 on Google
```

**Ad-group headlines**
| Ad group | Headline 13 | Headline 14 | Headline 15 |
|---|---|---|---|
| AG1 Residential | Residential Security Guards | Security Guards Near You | Home Security Guard Service |
| AG2 Home & Estate | Home & Estate Security Guards | Protect Your Home & Family | On-Site Guards for Estates |
| AG3 HOA | HOA Security Patrols | Gated Community Security | Patrols for Your HOA |
| AG4 Apartment | Apartment Security Guards | Condo & Apartment Security | Security for Your Building |
| AG5 Vacant | Vacant Home Security | Vacation Home Patrols | Protect Your Empty Home |
| AG6 Events | Private Event Security | Party & Wedding Security | Guards for Your Event |

**Descriptions (all ad groups)**
```text
Licensed armed & unarmed security guards for Bay Area homes, HOAs and apartments.
Free consultation and custom security plan. Call 24/7 or get a quote in 30 seconds.
Vetted, BSIS-licensed officers. Mobile patrols and on-site guards. PPO #122479.
Local Walnut Creek security company serving the East Bay, South Bay and Peninsula.
```

**Display path:** `residential` / `security`

---

## 5. Assets (campaign level)

**Call asset:** (925) 440-6909, call reporting on, conversion action *Residential – Calls from Ads*.

**Sitelinks**
| Text | Line 1 | Line 2 | Final URL |
|---|---|---|---|
| HOA & Gated Communities | Patrols & gate officers | For HOA boards & managers | `…/residential-security?svc=hoa` |
| Home & Estate Security | On-site guards for homes | Armed or unarmed officers | `…/residential-security?svc=home` |
| Apartments & Condos | Guards for your building | Patrols, lobby & parking | `…/residential-security?svc=apartment` |
| Private Event Security | Parties, weddings & more | Licensed event guards | `…/residential-security?svc=event` |

**Callouts:** 24/7 Dispatch · Free Consultation · BSIS Licensed · Armed & Unarmed · Mobile Patrols · Local Company ·
Custom Security Plan · Fast Response

**Structured snippet – Services:** Unarmed Guards, Armed Guards, Mobile Patrols, HOA Patrols, Event Security,
Vacant Property Checks

**Business name / logo:** Top Notch Security Solutions + logo (needs advertiser verification).

---

## 6. Launch checklist
- [ ] Conversion goals on the campaign: only *Submit lead form* + *Phone call lead*
- [ ] Display Network and Search Partners off
- [ ] Location option = Presence
- [ ] All 6 final URLs open the landing page with the matching headline
- [ ] Negative keyword list attached
- [ ] Call asset uses the Google forwarding number
- [ ] Ads approved (Policy status "Eligible")

---

## 7. Budget and the first 30 days

- **Budget: $60/day** (agreed). Bay Area clicks for security-guard terms usually cost about $6–15, so expect
  roughly 5–9 clicks a day at launch. If the far cities (Santa Cruz, Napa, Fairfield, Half Moon Bay) spend
  without leads in the first two weeks, remove them.
- **Week 1–2:** check *Search terms* every 2–3 days and add new negatives. Pause keywords with spend but no
  relevant searches.
- **After ~15–20 leads:** switch bidding to **Maximize conversions**.
- **After ~30 qualified leads/month:** make *Residential – Qualified Lead* primary (see setup guide 2.4).
- **Later:** city-specific ads using `&city=oakland` etc. for the best-performing cities.
