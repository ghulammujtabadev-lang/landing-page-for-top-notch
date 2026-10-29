import { MapPin, Navigation } from 'lucide-react';
import { BUSINESS, SERVICE_AREAS } from '@/lib/config';
import CallLink from './CallLink';

export default function ServiceAreas({ highlightCity }: { highlightCity: string | null }) {
  return (
    <section className="section bg-gray-50" id="service-areas">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Service Areas</p>
          <h2 className="text-3xl md:text-4xl">Protecting Homes Across the Bay Area</h2>
          <p className="mt-4 text-lg text-gray-600">
            We serve the entire San Francisco Bay Area and neighboring areas – we&rsquo;re not limited to one zone.
          </p>
        </div>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_AREAS.map((a) => {
            const highlighted = Boolean(highlightCity && a.cities.includes(highlightCity));
            return (
              <li
                key={a.county}
                className={`flex items-center gap-3 rounded-xl border bg-white px-5 py-4 font-heading font-semibold text-security-navy ${
                  highlighted ? 'border-security-yellow ring-2 ring-security-yellow/40' : 'border-gray-200'
                }`}
              >
                <MapPin className="h-5 w-5 shrink-0 text-security-gold" aria-hidden /> {a.county}
              </li>
            );
          })}
        </ul>
        <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center gap-3 rounded-xl bg-security-navy px-6 py-5 text-center text-white sm:flex-row sm:text-left">
          <Navigation className="h-6 w-6 shrink-0 text-security-yellow" aria-hidden />
          <p className="flex-1">
            <span className="font-semibold">Neighboring counties too.</span>{' '}
            <span className="text-gray-300">Don&rsquo;t see your area? We cover surrounding communities – just ask.</span>
          </p>
          <CallLink location="service_areas" className="font-bold text-security-yellow underline underline-offset-4">
            {BUSINESS.phoneDisplay}
          </CallLink>
        </div>
      </div>
    </section>
  );
}
