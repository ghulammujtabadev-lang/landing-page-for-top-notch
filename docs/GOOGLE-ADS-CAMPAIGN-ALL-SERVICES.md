# Google Ads Campaign – All Security Services (Bay Area)

One Search campaign for all four landing pages, **$100/day**, **exact match only**. Replaces the residential-only
plan. Conversion tracking is already live on every page (see GHL-AND-GOOGLE-ADS-SETUP.md).

| | |
|---|---|
| Ad groups | 8 (2 per service) |
| Keywords | 209, all exact match |
| Ads | 1 responsive search ad per ad group: 15 headlines, 4 descriptions |
| Negative keywords | 147 |
| Import files | `docs/google-ads-import/` (keywords, ads, negatives) for Google Ads Editor |

> Every claim in the ads is also on the landing page (Google Ads misrepresentation policy). All headlines are
> ≤ 30 characters and descriptions ≤ 90, checked by script.

---

## 1. Why one campaign, exact match only

- **One budget for all services.** Google spends where people are searching that day. Four separate $25/day
  campaigns would each get only 2–4 clicks a day and learn nothing.
- **Exact match = only searches that mean the same thing as the keyword.** Close variants are included
  automatically (plurals, misspellings, word order, "guard" vs "guards"), so they are not added separately.
  No alarm, camera or job searches slip in the way they did with phrase match.
- **Exact match doesn't add words.** "security guard **san jose**" does not match `[security guard]`. That's why the
  list has more keywords: **"near me"** and **city** versions of the core terms, and the different ways people
  describe each need.
- **"Low search volume" is fine.** Google will mark many exact keywords that way. They cost nothing and start
  serving as soon as searches pick up. Don't delete them.
- **Every keyword shows buying intent:** guard, patrol, officer, services, company, hire or a specific need
  (e.g. "sprinkler system down fire watch"). Informational and job searches are excluded.
- **Private parties and weddings are left out:** the event page is about company events, and those searches
  rarely become paying clients.

---

## 2. Campaign settings

| Setting | Value |
|---|---|
| Campaign type | **Search** (objective: Leads) |
| Campaign name | `Search – Security Services – Bay Area` |
| Existing residential campaign | If it has already run: **edit it** (rename it, add the new ad groups) to keep its history. If it never ran: create the new campaign and remove the old one |
| Networks | Google Search only. **Untick** Search Partners and Display Network |
| Locations | The 21 cities below. Location option: **Presence: people in or regularly in your included locations** |
| Language | English |
| Ad schedule | All day, every day (24/7 dispatch; fire watch is often urgent at night) |
| Budget | **$100/day** (≈ $3,040/month) |
| Bidding (first 3–4 weeks) | **Maximize clicks**, max CPC limit **$12** |
| Bidding (after ~15–20 leads) | **Maximize conversions** |
| Goals | **Campaign-specific goals**: only *Submit lead form* (LP lead) + *Phone call lead* (LP – Website Calls + calls from ads) |
| AI Max / Final URL expansion / automatically created assets | **Off**, so every click goes to the right landing page |
| Broad match keywords setting | **Off** |

**Locations (21 cities):** Oakland, San Jose, San Francisco, South San Francisco, Walnut Creek, Antioch, Richmond,
Fremont, Half Moon Bay, Santa Cruz, Napa, Fairfield, Berkeley, Alameda, Daly City, San Rafael, Vallejo, Pinole,
Livermore, Pleasanton, San Ramon (all California).

**Why $12 max CPC:** fire watch, warehouse and event clicks often cost more than residential. With Maximize clicks
the limit applies to the whole campaign. If impression share "lost to rank" is high after a week, raise it to $15.

---

## 3. Ad groups and keywords

Final URLs are the plain page URLs (no `?svc=`). Paste each list into **Keywords → + → choose the ad group**:
the square brackets make every keyword exact match.

| # | Ad group | Final URL | Keywords |
|---|---|---|---|
| 1 | Residential – Security Guards | `/residential-security` | 35 |
| 2 | Residential – HOA, Apartments & Vacant | `/residential-security` | 35 |
| 3 | Events – Corporate Event Security | `/event-security` | 28 |
| 4 | Events – Event Security Guards | `/event-security` | 19 |
| 5 | Warehouse – Warehouse & Industrial | `/warehouse-security` | 27 |
| 6 | Warehouse – Storage, Yards & Logistics | `/warehouse-security` | 20 |
| 7 | Fire Watch – Fire Watch Services | `/fire-watch` | 24 |
| 8 | Fire Watch – Alarm Down, Hot Work & Construction | `/fire-watch` | 21 |

### AG1 – Residential – Security Guards
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security`  
People who want a guard or patrol for a house, estate or neighborhood.

```text
[residential security guard]
[residential security guard services]
[residential security services]
[residential security company]
[residential security patrol]
[residential patrol services]
[residential security officer]
[home security guard]
[home security guard service]
[security guard for home]
[security guard for house]
[house security guard]
[private security guard for home]
[private security for home]
[private home security guard]
[hire security guard for home]
[hire a security guard for my house]
[armed security guard for home]
[armed guard for home]
[unarmed security guard for home]
[24 hour security guard for home]
[overnight security guard for home]
[estate security guard]
[estate security services]
[private estate security]
[neighborhood security guard]
[neighborhood security patrol]
[private neighborhood patrol]
[residential security guard near me]
[home security guard near me]
[residential security bay area]
[residential security guard san jose]
[residential security guard san francisco]
[residential security guard oakland]
[residential security walnut creek]
```

### AG2 – Residential – HOA, Apartments & Vacant
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security`  
Property managers, HOA boards and owners of empty homes.

```text
[hoa security]
[hoa security guard]
[hoa security patrol]
[hoa security company]
[hoa security services]
[hoa patrol service]
[security patrol for hoa]
[gated community security]
[gated community security guard]
[gate guard service]
[gate guard security]
[gate security guard]
[community security patrol]
[apartment security guard]
[apartment security patrol]
[apartment complex security]
[apartment complex security guard]
[apartment security company]
[apartment security services]
[security guard for apartment complex]
[condo security guard]
[condominium security]
[residential building security guard]
[property management security services]
[mobile patrol for apartments]
[vacant home security]
[vacant house security]
[vacant property security]
[vacant property patrol]
[vacant building security guard]
[vacation home security patrol]
[house watch service]
[hoa security near me]
[apartment security guard near me]
[hoa security bay area]
```

### AG3 – Events – Corporate Event Security
Final URL: `https://www.topnotchsecuritysolutions.com/event-security`  
Companies planning conferences, galas, launches and company events.

```text
[corporate event security]
[corporate event security guard]
[corporate event security services]
[corporate event security company]
[security for corporate events]
[security guards for corporate events]
[corporate security for events]
[conference security]
[conference security guard]
[conference security services]
[trade show security]
[trade show security guard]
[convention security guard]
[expo security guard]
[gala security]
[gala security guard]
[company party security]
[corporate party security]
[holiday party security guard]
[product launch security]
[vip event security]
[executive event security]
[company picnic security]
[offsite event security]
[corporate event security near me]
[corporate event security san francisco]
[corporate event security san jose]
[corporate event security bay area]
```

### AG4 – Events – Event Security Guards
Final URL: `https://www.topnotchsecuritysolutions.com/event-security`  
General "event security" searches. Kept separate so it can be paused on its own if it brings weddings, concerts or private parties instead of company events.

```text
[event security]
[event security guard]
[event security services]
[event security company]
[event security guards for hire]
[hire event security]
[hire security for event]
[security guards for events]
[security for an event]
[event security staffing]
[armed security for event]
[unarmed security for event]
[event security near me]
[event security guard near me]
[event security bay area]
[event security san francisco]
[event security san jose]
[event security oakland]
[event security walnut creek]
```

### AG5 – Warehouse – Warehouse & Industrial
Final URL: `https://www.topnotchsecuritysolutions.com/warehouse-security`  
Warehouses, distribution centers, manufacturing and industrial sites.

```text
[warehouse security]
[warehouse security guard]
[warehouse security services]
[warehouse security company]
[warehouse security patrol]
[security guard for warehouse]
[warehouse guard services]
[distribution center security]
[distribution center security guard]
[fulfillment center security]
[industrial security guard]
[industrial security services]
[industrial security company]
[industrial site security]
[industrial security patrol]
[manufacturing security guard]
[manufacturing plant security]
[plant security guard]
[factory security guard]
[loading dock security]
[warehouse security guard near me]
[industrial security guard near me]
[warehouse security bay area]
[warehouse security san jose]
[warehouse security fremont]
[warehouse security oakland]
[industrial security guard san jose]
```

### AG6 – Warehouse – Storage, Yards & Logistics
Final URL: `https://www.topnotchsecuritysolutions.com/warehouse-security`  
Storage facilities, truck and equipment yards, logistics hubs.

```text
[storage facility security]
[storage facility security guard]
[self storage security guard]
[self storage security patrol]
[storage yard security]
[yard security guard]
[truck yard security]
[equipment yard security]
[trailer yard security]
[lot security patrol]
[logistics security services]
[logistics security guard]
[trucking company security]
[transportation security guard]
[freight yard security]
[mobile patrol for business]
[night security patrol for business]
[after hours security patrol]
[storage facility security near me]
[yard security bay area]
```

### AG7 – Fire Watch – Fire Watch Services
Final URL: `https://www.topnotchsecuritysolutions.com/fire-watch`  
Core fire watch searches. Usually urgent and high value.

```text
[fire watch]
[fire watch guard]
[fire watch services]
[fire watch security]
[fire watch security guard]
[fire watch security services]
[fire watch company]
[fire watch officer]
[fire watch personnel]
[fire watch patrol]
[fire watch service provider]
[hire fire watch]
[fire watch guard service]
[24 hour fire watch]
[emergency fire watch]
[fire watch near me]
[fire watch services near me]
[fire watch guard near me]
[fire watch bay area]
[fire watch san francisco]
[fire watch san jose]
[fire watch oakland]
[fire watch california]
[fire watch walnut creek]
```

### AG8 – Fire Watch – Alarm Down, Hot Work & Construction
Final URL: `https://www.topnotchsecuritysolutions.com/fire-watch`  
People who already know why they need fire watch: impaired systems, hot work, construction.

```text
[fire alarm down fire watch]
[fire watch when fire alarm is down]
[fire alarm impairment fire watch]
[sprinkler system down fire watch]
[sprinkler impairment fire watch]
[fire watch for sprinkler outage]
[fire watch for fire alarm outage]
[fire watch required by fire marshal]
[fire marshal fire watch]
[fire watch for insurance]
[hot work fire watch]
[fire watch for hot work]
[welding fire watch]
[hot work fire watch services]
[construction fire watch]
[fire watch for construction]
[construction site fire watch]
[renovation fire watch]
[building fire watch]
[fire watch for buildings]
[fire watch for warehouse]
```

---

## 4. Negative keywords

Create a shared list **`Neg – Security Services`** (Tools → Shared library → Negative keyword lists) and apply it to
the campaign. No marks = broad negative (blocks any search containing all its words). `"quotes"` = phrase negative.
With exact-match keywords, negatives are a safety net against close variants Google stretches too far. The list
blocks jobs and training, alarm/camera products and brands, competitors, informational searches (forms, templates,
requirements), the *Firewatch* video game, wildfire/weather "fire watch" searches and storage unit rentals.
Checked by script: **no negative blocks any of the keywords above.**

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
"part time"
"full time"
"how to become"
"how to start"
training
course
class
classes
school
certification
certificate
"license requirements"
"guard card"
"bsis exam"
osha
test
exam
camera
cameras
cctv
alarm system
"security system"
"security systems"
install
installation
installer
"security equipment"
device
devices
sensor
sensors
panel
kit
wireless
smart
"smart home"
doorbell
lock
locks
locksmith
safes
diy
software
app
subscription
monitoring
monitored
adt
vivint
ring
simplisafe
wyze
arlo
brinks
frontpoint
cove
abode
nest
eufy
blink
xfinity
comcast
honeywell
kangaroo
"deep sentinel"
"alarm.com"
allied
securitas
g4s
paladin
"companies like"
login
cancel
"customer service"
"phone number"
free
uniform
uniforms
vest
cyber
"network security"
"security deposit"
template
form
forms
pdf
log
"log sheet"
checklist
definition
meaning
"what is"
"what does"
wiki
requirements
rules
code
nfpa
game
steam
ps4
ps5
xbox
switch
"campo santo"
delilah
wallpaper
soundtrack
movie
tower
lookout
"cal fire"
wildfire
weather
"fire weather"
"red flag"
evacuation
smoke
extinguisher
extinguishers
"fire alarm repair"
"fire alarm installation"
"sprinkler repair"
"sprinkler installation"
inspection
inspector
ticket
tickets
volunteer
"self storage units"
"storage units"
rent
rental
"for rent"
"for sale"
used
```

---

## 5. Responsive search ads (one per ad group)

- 15 headlines and 4 descriptions per ad, each ad group's keywords in its headlines.
- No pinning, no phone number in the text (the call asset shows it), no exclamation marks.
- Display path: `topnotchsecuritysolutions.com/<path 1>/<path 2>`.

### AG1 – Residential – Security Guards
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security`  ·  Path: `residential` / `security-guards`

**Headlines**
```text
Residential Security Guards
Home Security Guard Service
Residential Security Patrols
Private Security for Homes
Estate Security Guards
Armed & Unarmed Officers
Neighborhood Security Patrol
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
Licensed security guards and patrols for Bay Area homes, estates and neighborhoods.
Armed or unarmed officers, day, night or 24/7. Free consultation and custom security plan.
Vetted, BSIS-certified officers from a local Walnut Creek company. Licensed and insured.
Tell us about your property and get a free security quote. It takes about 30 seconds.
```

### AG2 – Residential – HOA, Apartments & Vacant
Final URL: `https://www.topnotchsecuritysolutions.com/residential-security`  ·  Path: `hoa` / `apartments`

**Headlines**
```text
HOA Security Patrols
HOA Security Guards
Gated Community Security
Gate Guard Service
Apartment Security Guards
Apartment Complex Security
Condo Security Guards
Vacant Property Patrols
Reports for Your HOA Board
Parking & Garage Patrols
Free Security Quote
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Licensed patrols and guards for Bay Area HOAs, gated communities and apartment buildings.
Gate staffing, mobile patrols and vacant home checks, with reports you can review.
Vetted, BSIS-certified officers from a local Walnut Creek company. Licensed and insured.
Get a free security plan and quote for your property. Request one in about 30 seconds.
```

### AG3 – Events – Corporate Event Security
Final URL: `https://www.topnotchsecuritysolutions.com/event-security`  ·  Path: `corporate` / `event-security`

**Headlines**
```text
Corporate Event Security
Conference Security Guards
Trade Show Security
Gala & Party Security
Product Launch Security
VIP Event Protection
Access & Badge Control
Calm Crowd Management
Uniformed, Licensed Officers
Serving the SF Bay Area
Free Event Security Quote
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Licensed security officers for Bay Area conferences, galas, launches and company events.
Access and badge control, crowd management and VIP protection by uniformed officers.
Vetted, BSIS-certified officers from a local Walnut Creek company. Licensed and insured.
Tell us about your event and get a free security quote. It takes about 30 seconds.
```

### AG4 – Events – Event Security Guards
Final URL: `https://www.topnotchsecuritysolutions.com/event-security`  ·  Path: `event` / `security-guards`

**Headlines**
```text
Event Security Guards
Event Security Services
Hire Event Security
Security Guards for Events
Armed & Unarmed Officers
Entry & Guest List Control
Calm Crowd Management
Uniformed, Licensed Officers
Serving the SF Bay Area
Free Event Security Quote
Get a Quote in 30 Seconds
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Licensed event security guards for Bay Area corporate events, conferences and galas.
Entry and guest list control, crowd management and VIP protection by uniformed officers.
Vetted, BSIS-certified officers from a local Walnut Creek company. Licensed and insured.
Tell us about your event and get a free security quote. It takes about 30 seconds.
```

### AG5 – Warehouse – Warehouse & Industrial
Final URL: `https://www.topnotchsecuritysolutions.com/warehouse-security`  ·  Path: `warehouse` / `security`

**Headlines**
```text
Warehouse Security Guards
Warehouse Security Services
Industrial Security Guards
Distribution Center Security
Manufacturing Site Security
Dock & Access Control
Stop Inventory Theft
Overnight & Weekend Guards
Alarm Response & Patrols
Free Site Security Quote
Local Walnut Creek Company
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Licensed guards and mobile patrols for Bay Area warehouses and industrial sites.
Access control, dock monitoring and patrols that help stop inventory theft and damage.
Vetted, BSIS-certified officers from a local Walnut Creek company. Licensed and insured.
Tell us about your site and get a free security quote. It takes about 30 seconds.
```

### AG6 – Warehouse – Storage, Yards & Logistics
Final URL: `https://www.topnotchsecuritysolutions.com/warehouse-security`  ·  Path: `yard` / `security`

**Headlines**
```text
Storage Facility Security
Yard & Lot Security Patrols
Truck Yard Security
Logistics Security Services
After-Hours Mobile Patrols
Random-Time Patrol Checks
Deter Break-Ins & Vandalism
Driver & Visitor Check-In
Overnight & Weekend Guards
Free Site Security Quote
Local Walnut Creek Company
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Mobile patrols and guards for Bay Area storage facilities, yards and logistics hubs.
Random-time patrols, gate checks and driver check-in that deter theft and vandalism.
Vetted, BSIS-certified officers from a local Walnut Creek company. Licensed and insured.
Tell us about your site and get a free security quote. It takes about 30 seconds.
```

### AG7 – Fire Watch – Fire Watch Services
Final URL: `https://www.topnotchsecuritysolutions.com/fire-watch`  ·  Path: `fire-watch` / `guards`

**Headlines**
```text
Fire Watch Guards
Fire Watch Services
Fire Watch Security
Fire Watch Officers On Site
Urgent Fire Watch Coverage
Trained in Fire Safety
Detailed Fire Watch Logs
Fire Code Compliant
Logs for the Fire Marshal
Serving the SF Bay Area
Free Fire Watch Quote
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Trained fire watch guards for Bay Area buildings and job sites. Call 24/7 if it is urgent.
Detailed fire watch logs for the fire marshal or insurer. Fire code compliant coverage.
Licensed, bonded and insured local Walnut Creek company. Day, night or 24/7 coverage.
Tell us your situation and get a free fire watch quote. It takes about 30 seconds.
```

### AG8 – Fire Watch – Alarm Down, Hot Work & Construction
Final URL: `https://www.topnotchsecuritysolutions.com/fire-watch`  ·  Path: `fire-watch` / `hot-work`

**Headlines**
```text
Fire Alarm Down? Fire Watch
Sprinkler Outage Fire Watch
Hot Work Fire Watch
Construction Fire Watch
Fire Marshal Requirements
Fire Watch Until Systems Fixed
Detailed Fire Watch Logs
Trained in Fire Safety
Urgent Fire Watch Coverage
Free Fire Watch Quote
Serving the SF Bay Area
Licensed PPO #122479
Licensed, Bonded & Insured
Rated 5.0 on Google
Available 24/7
```

**Descriptions**
```text
Fire watch guards on site while fire alarms or sprinklers are down, or during hot work.
Detailed logs for the fire marshal or insurer. Coverage until your systems are restored.
Trained, licensed officers from a local Walnut Creek company. Bonded and insured.
Need guards today? Call us 24/7, or get a free fire watch quote in about 30 seconds.
```

---

## 6. Assets (campaign level)

**Call asset:** (925) 440-6909, call reporting **on**, conversion action: a *Calls from ads* action (Goals →
Conversions → New → Phone calls → **Calls from ads using call assets**, name `LP – Calls from Ads`, count **One**,
call length **60 seconds**). Show it all day (24/7 dispatch).

**Sitelinks**
| Text (≤25) | Line 1 (≤35) | Line 2 (≤35) | Final URL |
|---|---|---|---|
| Residential Security | Guards & patrols for homes | HOAs, apartments & estates | `https://www.topnotchsecuritysolutions.com/residential-security` |
| Corporate Event Security | Conferences, galas & launches | Access & crowd control | `https://www.topnotchsecuritysolutions.com/event-security` |
| Warehouse Security | Warehouses & industrial sites | Dock & access control | `https://www.topnotchsecuritysolutions.com/warehouse-security` |
| Fire Watch Services | Alarm or sprinklers down | Hot work & construction | `https://www.topnotchsecuritysolutions.com/fire-watch` |

**Callouts (≤25):** 24/7 Dispatch · Free Consultation · BSIS Licensed Officers · Armed & Unarmed Guards ·
Mobile Patrols · Walnut Creek Company · Custom Security Plan · Bonded & Insured

**Structured snippet – Services:** Residential Security, Event Security, Warehouse Security, Fire Watch,
Mobile Patrols, Armed Guards

**Business name / logo:** Top Notch Security Solutions + logo (needs advertiser verification).

---

## 7. How to build it

**Option A – Google Ads website (no software)**
1. Campaigns → **+ New campaign** → Leads → Search → set everything from section 2.
2. Create the first ad group, paste its keywords, add its ad. Repeat for the other 7 ad groups.
3. Add the negative list (section 4) and the assets (section 6).

**Option B – Google Ads Editor (faster, uses the import files)**
1. Create the campaign with the settings from section 2 (website or Editor), then in Editor: **Get recent changes**.
2. **Account → Import → From file** → `google-ads-import/keywords.csv` → Review → Apply. This also creates the
   8 ad groups.
3. Import `ads.csv`, then `negative-keywords.csv` the same way. (Or create the shared negative list from
   section 4 instead of campaign negatives.)
4. **Post** the changes.

The campaign name in the files is `Search – Security Services – Bay Area`. If yours is different, change it in the files first or
rename the campaign to match.

---

## 8. Launch checklist
- [ ] Goals on the campaign: only *Submit lead form* + *Phone call lead*
- [ ] Display Network and Search Partners off; AI Max / Final URL expansion off
- [ ] Location option = Presence; 21 cities
- [ ] 8 ad groups, 209 exact keywords, 8 ads
- [ ] Negative list attached to the campaign
- [ ] Call asset + sitelinks + callouts added
- [ ] Ads approved (Policy status "Eligible")

---

## 9. Budget and the first 30 days

- **Expect** about 8–15 clicks a day at $6–12 per click, spread across the four services by search demand.
- **Every 2–3 days in weeks 1–2:** open *Search terms*. Anything irrelevant → add to the negative list.
  A good search that isn't a keyword yet → add it as an exact keyword in the right ad group.
- **Weekly:** Segment by ad group. If one ad group spends a lot with no leads after ~$150, pause its weakest
  keywords first. Watch **Events – Event Security Guards**: pause it if it mostly brings weddings or concerts.
- **If one service uses most of the budget** and the client wants a fixed share for another, move that service
  into its own campaign with its own budget.
- **Far cities** (Santa Cruz, Napa, Fairfield, Half Moon Bay): remove them if they spend without leads after two
  weeks.
- **After ~15–20 leads:** switch to **Maximize conversions**. **After ~30 qualified leads/month:** consider making
  *LPs – Qualified Lead* primary.
