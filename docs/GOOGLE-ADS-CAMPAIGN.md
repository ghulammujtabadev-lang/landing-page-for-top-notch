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
