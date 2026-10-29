// Single source of truth for business facts, copy toggles and form options.
// Edit here – every section and the API read from this file.

export const BUSINESS = {
  name: 'Top Notch Security Solutions',
  phoneDisplay: '(925) 440-6909',
  phoneHref: 'tel:+19254406909',
  email: 'info@topnotchsecuritysolutions.com',
  address: '3183 Wayside Plaza, Walnut Creek, CA 94597',
  license: 'PPO #122479',
  hours: [
    { days: 'Mon–Fri', time: '7:00 AM – 7:00 PM' },
    { days: 'Sat–Sun', time: '9:00 AM – 5:00 PM' },
    { days: 'Emergency line', time: '24/7' },
  ],
  mainSite: 'https://www.topnotchsecuritysolutions.com',
  privacyUrl: 'https://www.topnotchsecuritysolutions.com/privacy',
  // Promise shown in the form, success state and thank-you page. Keep it truthful.
  responsePromise: 'within 2 hours',
  responsePromiseDetail: 'within 2 hours during business hours',
  // Set to a number only if it can be verified (Google Ads misrepresentation policy).
  yearsInBusiness: null as number | null,
};

// Shown next to the (optional, unchecked by default) consent box and stored on the GHL contact.
export const CONSENT_TEXT =
  'I agree to receive calls and text messages from Top Notch Security Solutions at the number provided about my request, ' +
  'including by automated means. Consent is not a condition of purchase. Msg & data rates may apply. ' +
  'Msg frequency varies. Reply STOP to opt out, HELP for help.';

export type PropertyKey = 'home' | 'hoa' | 'apartment' | 'vacant' | 'event' | 'other';

export const PROPERTY_TYPES: { key: PropertyKey; label: string; short: string }[] = [
  { key: 'home', label: 'Home or estate', short: 'Home / Estate' },
  { key: 'hoa', label: 'HOA or gated community', short: 'HOA / Gated Community' },
  { key: 'apartment', label: 'Apartment or condo building', short: 'Apartment / Condo' },
  { key: 'vacant', label: 'Vacant or vacation home', short: 'Vacant / Vacation Home' },
  { key: 'event', label: 'Private event at a residence', short: 'Private Event' },
  // Visitor types the property type (shelters, housing programs, …) in a text box.
  { key: 'other', label: 'Other type of property', short: 'Other' },
];

export const SERVICE_TYPES = [
  'Unarmed security guard',
  'Armed security guard',
  'Mobile / foot patrol',
  'Not sure – recommend for me',
] as const;

// Same urgency options as the main site's form, so reporting lines up.
export const TIMELINES = [
  'Immediate (Within 24 hours)',
  'Urgent (Within 3 days)',
  'Standard (Within 1 week)',
  'Planning Ahead (1+ weeks)',
] as const;

// The page lists counties only; cities feed the form's location list and ?city= headlines.
export const SERVICE_AREAS: { county: string; cities: string[] }[] = [
  { county: 'Alameda County', cities: ['Oakland', 'Berkeley', 'Alameda', 'Fremont', 'Livermore', 'Pleasanton'] },
  { county: 'Contra Costa County', cities: ['Walnut Creek', 'San Ramon', 'Richmond', 'Antioch', 'Pinole'] },
  { county: 'San Francisco County', cities: ['San Francisco'] },
  { county: 'San Mateo County', cities: ['South San Francisco', 'Daly City', 'Half Moon Bay'] },
  { county: 'Santa Clara County', cities: ['San Jose'] },
  { county: 'Marin County', cities: ['San Rafael'] },
  { county: 'Napa County', cities: ['Napa'] },
  { county: 'Solano County', cities: ['Fairfield', 'Vallejo'] },
  { county: 'Santa Cruz County', cities: ['Santa Cruz'] },
];

export const CITIES = SERVICE_AREAS.flatMap((a) => a.cities).sort();
export const OTHER_CITY = 'Other city or neighboring area';

// Dynamic headline (message match). Ad final URL: /residential-security?svc=hoa&city=oakland
const DEFAULT_HEADLINE = {
  h1: 'Licensed Residential Security Guards for Bay Area Homes & Communities',
  sub: 'Armed & unarmed officers, HOA patrols and estate protection – vetted, uniformed and ready to deploy fast.',
};
export const HEADLINES: Record<PropertyKey | 'default', { h1: string; sub: string }> = {
  default: DEFAULT_HEADLINE,
  other: DEFAULT_HEADLINE,
  home: {
    h1: 'Private Home & Estate Security Guards',
    sub: 'Discreet, licensed officers protecting your family, home and property – day, night or 24/7.',
  },
  hoa: {
    h1: 'HOA & Gated Community Security Patrols',
    sub: 'Uniformed patrols, gate officers and documented reports your board and residents can see.',
  },
  apartment: {
    h1: 'Apartment & Condo Security Guards',
    sub: 'Visible deterrence, access control and incident reporting for multifamily properties.',
  },
  vacant: {
    h1: 'Vacant & Vacation Home Security',
    sub: 'Scheduled patrols and on-site guards that keep empty homes safe from break-ins, squatters and vandalism.',
  },
  event: {
    h1: 'Security Guards for Private Residential Events',
    sub: 'Professional, discreet officers for parties, weddings and gatherings at your home.',
  },
};

export function cityFromSlug(slug: string | undefined): string | null {
  if (!slug) return null;
  const s = slug.toLowerCase().replace(/[-_+]/g, ' ').replace(/\s+ca$/, '').trim();
  return CITIES.find((c) => c.toLowerCase() === s) ?? null;
}

export function propertyFromSlug(slug: string | undefined): PropertyKey | null {
  const aliases: Record<string, PropertyKey> = {
    home: 'home', estate: 'home', house: 'home', residential: 'home',
    hoa: 'hoa', gated: 'hoa', community: 'hoa', neighborhood: 'hoa',
    apartment: 'apartment', apartments: 'apartment', condo: 'apartment', multifamily: 'apartment',
    vacant: 'vacant', vacation: 'vacant',
    event: 'event', party: 'event', wedding: 'event',
  };
  return slug ? aliases[slug.toLowerCase()] ?? null : null;
}

// Only add real, verifiable reviews (with permission). The section hides itself while empty.
export const TESTIMONIALS: { quote: string; name: string; context: string }[] = [];

export const GOOGLE_RATING: { rating: number; count: number; url: string } | null = null;

// Google Ads tag + the conversion fired on the thank-you page. Env vars override these defaults
// (create a dedicated "Residential LP Lead" conversion action and put its label in NEXT_PUBLIC_GADS_CONVERSION).
export const TRACKING = {
  gadsId: process.env.NEXT_PUBLIC_GADS_ID || 'AW-17120170393',
  leadConversion: process.env.NEXT_PUBLIC_GADS_CONVERSION || 'AW-17120170393/lUzSCNTltq4dEJmjxOM_',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
};
