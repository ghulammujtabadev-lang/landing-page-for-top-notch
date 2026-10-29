import { useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { BUSINESS, HEADLINES, SERVICE_AREAS, cityFromSlug, propertyFromSlug, type PropertyKey } from '@/lib/config';
import { captureAttribution } from '@/lib/tracking';
import Header from '@/components/lp/Header';
import Hero from '@/components/lp/Hero';
import TrustBar from '@/components/lp/TrustBar';
import Services from '@/components/lp/Services';
import HowItWorks from '@/components/lp/HowItWorks';
import WhyUs from '@/components/lp/WhyUs';
import Testimonials from '@/components/lp/Testimonials';
import ServiceAreas from '@/components/lp/ServiceAreas';
import FAQ from '@/components/lp/FAQ';
import FinalCTA from '@/components/lp/FinalCTA';
import Footer from '@/components/lp/Footer';
import MobileBar from '@/components/lp/MobileBar';
import { FAQS } from '@/components/lp/faq-data';

interface Props {
  property: PropertyKey | null;
  city: string | null;
  headline: string;
  subheadline: string;
}

// Rendered on the server so the ad-matched headline is in the first paint (no flicker).
// URL params: ?svc=hoa|home|apartment|vacant|event  &city=oakland|walnut-creek|...
export const getServerSideProps: GetServerSideProps<Props> = async ({ query, res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const property = propertyFromSlug(one(query.svc));
  const city = cityFromSlug(one(query.city));
  const copy = HEADLINES[property ?? 'default'];
  let headline = copy.h1;
  if (city) headline = property ? `${copy.h1} in ${city}` : `Licensed Residential Security Guards in ${city}, CA`;
  return { props: { property, city, headline, subheadline: copy.sub } };
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${BUSINESS.mainSite}/#business`,
      name: BUSINESS.name,
      url: BUSINESS.mainSite,
      telephone: '+1-925-440-6909',
      email: BUSINESS.email,
      image: `${BUSINESS.mainSite}/img/logo/top_notch_security_logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3183 Wayside Plaza',
        addressLocality: 'Walnut Creek',
        addressRegion: 'CA',
        postalCode: '94597',
        addressCountry: 'US',
      },
      areaServed: SERVICE_AREAS.flatMap((a) => a.cities.map((c) => ({ '@type': 'City', name: `${c}, CA` }))),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function ResidentialSecurityPage({ property, city, headline, subheadline }: Props) {
  // Store gclid/UTMs as soon as the visitor lands, even if they submit later.
  useEffect(() => {
    captureAttribution();
  }, []);

  const title = city ? `Residential Security Guards in ${city}, CA | ${BUSINESS.name}` : `Residential Security Guards – Bay Area | ${BUSINESS.name}`;
  const description =
    'Licensed armed & unarmed security guards for Bay Area homes, estates, HOAs and apartments. Free consultation – call 24/7 or get a quote in 30 seconds.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Paid-traffic page: keep it out of organic results so it doesn't compete with the main site. */}
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <Header />
      <main>
        <Hero headline={headline} subheadline={subheadline} initialProperty={property} initialCity={city} />
        <TrustBar />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <ServiceAreas highlightCity={city} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
