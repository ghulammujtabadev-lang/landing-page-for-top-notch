import { MapPin } from 'lucide-react';
import { SERVICE_AREAS } from '@/lib/config';

export default function ServiceAreas({ highlightCity }: { highlightCity: string | null }) {
  return (
    <section className="section bg-gray-50" id="service-areas">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Service Areas</p>
          <h2 className="text-3xl md:text-4xl">Protecting Homes Across the Bay Area</h2>
          <p className="mt-4 text-lg text-gray-600">Local officers serving these communities and the neighborhoods around them.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_AREAS.map((a) => (
            <div key={a.county} className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-security-gold" aria-hidden /> {a.county}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {a.cities.map((c) => (
                  <li
                    key={c}
                    className={`rounded-full px-3 py-1 text-sm ${
                      c === highlightCity ? 'bg-security-yellow font-semibold text-security-navy' : 'bg-gray-100 text-security-gray'
                    }`}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
