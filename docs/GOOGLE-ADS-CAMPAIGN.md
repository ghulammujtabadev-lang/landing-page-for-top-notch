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

### Match type strategy
- **No broad match at launch.** With $60/day and no conversion history yet, broad match pulls in alarm-system,
  camera and job searches. Revisit after 30+ conversions with Maximize conversions.
- **Exact `[ ]`** for the core, highest-intent term of each ad group: these get the most budget and the cleanest
  data.
- **Phrase `" "`** for the rest: catches longer searches like "hoa security patrol **company near me**" or
  "**armed** estate security guard **san jose**".
- Both already include close variants (plurals, misspellings, reordered words with the same meaning), so
  "security guards" / "guard" versions are not added separately.
- **City names are not added to keywords.** Location targeting already limits the ads to the 21 cities, and
  phrase match covers "… oakland" style searches.
- **Each keyword lives in one ad group only**, so Google always sends it to the matching landing headline.
- Words like "home security", "house security" or "apartment security" on their own are avoided: they're mostly
  alarm/camera searches. Every keyword includes **guard**, **patrol**, **officer** or **security services**.

### AG1 – Residential (general)
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security`
| Keyword | Match | Intent |
|---|---|---|
| `[residential security guard]` | Exact | Core |
| `[residential security services]` | Exact | Core |
| `"residential security guard"` | Phrase | Core + longer searches |
| `"residential security services"` | Phrase | |
| `"residential security company"` | Phrase | |
| `"residential security patrol"` | Phrase | |
| `"neighborhood security guard"` | Phrase | |
| `"security guard for my house"` | Phrase | |

### AG2 – Home & Estate
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=home`
| Keyword | Match | Intent |
|---|---|---|
| `[home security guard]` | Exact | Core |
| `[private security for home]` | Exact | Core |
| `"home security guard"` | Phrase | |
| `"private security guard for home"` | Phrase | |
| `"house security guard"` | Phrase | |
| `"estate security guard"` | Phrase | High value |
| `"estate security services"` | Phrase | High value |
| `"armed guard for home"` | Phrase | |
| `"residential security officer"` | Phrase | |

### AG3 – HOA & Gated Community
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=hoa`
| Keyword | Match | Intent |
|---|---|---|
| `[hoa security]` | Exact | Core |
| `[hoa security patrol]` | Exact | Core |
| `"hoa security guard"` | Phrase | |
| `"hoa security patrol"` | Phrase | |
| `"hoa security company"` | Phrase | |
| `"gated community security"` | Phrase | |
| `"gate guard service"` | Phrase | |
| `"neighborhood security patrol"` | Phrase | |
| `"community patrol service"` | Phrase | |

### AG4 – Apartment & Condo
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=apartment`
| Keyword | Match | Intent |
|---|---|---|
| `[apartment security guard]` | Exact | Core |
| `[apartment security patrol]` | Exact | Core |
| `"apartment security guard"` | Phrase | |
| `"apartment security patrol"` | Phrase | |
| `"apartment complex security"` | Phrase | |
| `"condo security guard"` | Phrase | |
| `"residential building security guard"` | Phrase | |
| `"parking lot security patrol"` | Phrase | Apartment parking |

### AG5 – Vacant & Vacation Home
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=vacant`
| Keyword | Match | Intent |
|---|---|---|
| `[vacant home security]` | Exact | Core |
| `"vacant home security"` | Phrase | |
| `"vacant house security"` | Phrase | |
| `"vacant property patrol"` | Phrase | |
| `"vacation home security"` | Phrase | |
| `"house watch service"` | Phrase | |

### AG6 – Private Events
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=event`
| Keyword | Match | Intent |
|---|---|---|
| `[private event security]` | Exact | Core |
| `[party security guard]` | Exact | Core |
| `"private event security"` | Phrase | |
| `"party security guard"` | Phrase | |
| `"house party security"` | Phrase | |
| `"wedding security guard"` | Phrase | |
| `"hire security for party"` | Phrase | |

### Check volumes and costs in Keyword Planner before launch
Public sources don't publish reliable volumes or CPCs for these terms; only Keyword Planner has them.
1. Google Ads → **Tools → Planning → Keyword Planner → Get search volume and forecasts**.
2. Paste all keywords above (without quotes/brackets).
3. **Locations**: the 21 cities. **Language**: English. **Network**: Google. Date range: last 12 months.
4. Download the result (CSV) and keep: Avg. monthly searches, Top-of-page bid (low/high), Competition.
5. Drop keywords that show **0–10** searches **and** aren't core; flag any with a high top-of-page bid above
   **$25**. Then check **Discover new keywords** with seeds "hoa security", "residential security guard",
   "estate security" for ideas with real volume.

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

Rules applied so each ad can reach **Excellent** Ad Strength and pass review:
- **15 unique headlines and 4 unique descriptions** per ad, all within 30 / 90 characters.
- **The ad group's keywords appear in the headlines**, so the ad matches what people searched.
- **Varied themes:** keywords, services, trust (license, insurance, rating), and calls to action, so headlines
  don't repeat each other.
- **No pinning** at launch. Pinning lowers Ad Strength.
- **Policy-safe:** no phone numbers in the text (the call asset shows the number), no exclamation marks in
  headlines, no symbols like stars, no unverifiable "best/#1" claims. Every claim is also on the landing page.
- **One ad per ad group** at launch. With $60/day, one strong ad gathers data faster than two weak ones.
- Keep **AI Max / text customization off** until there's data. If it's on, Google writes extra headlines and
  ignores pins.
- Ad Strength is a guide, not a ranking factor. If Google shows "Good" for a while after publishing, that's fine.

### AG1 Residential (general)
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security`  ·  Path: `residential` / `security`

**Headlines**
```text
Residential Security Guards
Residential Security Services
Residential Security Company
Residential Security Patrols
Security Guard for Your House
Neighborhood Security Guards
Armed & Unarmed Officers
Serving the SF Bay Area
Free Custom Security Plan
Get a Quote in 30 Seconds
Local Walnut Creek Company
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Licensed residential security guards for Bay Area homes, HOAs and apartment buildings.
Armed or unarmed officers and mobile patrols. Free consultation and custom security plan.
Vetted, BSIS-licensed officers from a local Walnut Creek company. Available 24/7.
Tell us about your property and get a free security quote. It takes about 30 seconds.
```

### AG2 Home & Estate
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=home`  ·  Path: `residential` / `security`

**Headlines**
```text
Home Security Guards
Private Security for Homes
Estate Security Guards
Estate Security Services
House Security Guard Service
Armed Guards for Your Home
Residential Security Officers
Protect Your Family & Home
Discreet, Professional Guards
Overnight or 24/7 Coverage
Free Home Security Quote
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
On-site security guards for Bay Area homes and estates. Armed or unarmed, day or night.
Discreet, vetted officers protecting your family, home and valuables. Free consultation.
Access and visitor control by BSIS-licensed officers. Licensed, bonded and insured.
Get a free custom security plan and quote for your home. It takes about 30 seconds.
```

### AG3 HOA & Gated Community
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=hoa`  ·  Path: `residential` / `security`

**Headlines**
```text
HOA Security Patrols
HOA Security Guards
HOA Security Company
Gated Community Security
Gate Guard Service
Neighborhood Security Patrol
Community Patrol Service
Reports for Your HOA Board
Scheduled Mobile Patrols
Guardhouse & Gate Staffing
Free HOA Security Quote
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Licensed patrols and gate officers for Bay Area HOAs and gated communities.
Scheduled mobile patrols, gate staffing and documented reports your board can review.
Vetted, BSIS-licensed officers from a local Walnut Creek security company. Fully insured.
Get a free security plan and quote for your community. Request one in about 30 seconds.
```

### AG4 Apartment & Condo
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=apartment`  ·  Path: `residential` / `security`

**Headlines**
```text
Apartment Security Guards
Apartment Security Patrols
Apartment Complex Security
Condo Security Guards
Residential Building Security
Parking & Garage Patrols
Lobby & Concierge Security
Security for Property Managers
Incident Reports Included
Protect Residents & Property
Free Apartment Security Quote
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Licensed security guards and patrols for Bay Area apartment complexes and condo buildings.
Lobby officers, parking and garage patrols, and incident reports for property managers.
Vetted, BSIS-licensed officers from a local Walnut Creek company. Licensed and insured.
Get a free custom security plan for your building. Request a quote in about 30 seconds.
```

### AG5 Vacant & Vacation Home
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=vacant`  ·  Path: `residential` / `security`

**Headlines**
```text
Vacant Home Security
Vacant House Security
Vacant Property Patrols
Vacation Home Security
House Watch Service
Random-Time Patrol Checks
Deter Break-Ins & Squatters
Updates While You Are Away
Exterior & Entry Inspections
Protect Your Empty Home
Free Vacant Home Quote
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Mobile patrols and property checks for vacant homes and vacation homes in the Bay Area.
Deter break-ins, vandalism and squatters while your home is empty or between tenants.
Random-time patrols, entry inspections and status updates from BSIS-licensed officers.
Get a free custom patrol plan for your property. Request a quote in about 30 seconds.
```

### AG6 Private Events
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security?svc=event`  ·  Path: `residential` / `security`

**Headlines**
```text
Private Event Security
Party Security Guards
House Party Security
Wedding Security Guards
Hire Security for Your Party
Guest List & Entry Control
Parking & Crowd Management
Low-Key, Professional Guards
Licensed Event Officers
Enjoy Your Event Stress-Free
Free Event Security Quote
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Licensed security guards for private parties, weddings and events at Bay Area homes.
Guest list and entry control, parking and crowd management so you can enjoy your event.
Low-key, professional officers from a local Walnut Creek company. Licensed and insured.
Tell us about your event and get a free security quote. It takes about 30 seconds.
```

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
