import { Star } from 'lucide-react';
import { GOOGLE_RATING, TESTIMONIALS } from '@/lib/config';

// Renders nothing until real reviews are added in src/lib/config.ts.
export default function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  return (
    <section className="section bg-white" id="reviews">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Client Reviews</p>
          <h2 className="text-3xl md:text-4xl">What Bay Area Clients Say</h2>
          {GOOGLE_RATING && (
            <a href={GOOGLE_RATING.url} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 text-gray-600 hover:text-security-navy">
              <span className="flex" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-5 w-5 fill-security-yellow text-security-yellow" />)}
              </span>
              <strong className="text-security-navy">{GOOGLE_RATING.rating.toFixed(1)}</strong> from {GOOGLE_RATING.count} Google reviews
            </a>
          )}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name + t.quote.slice(0, 20)} className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 fill-security-yellow text-security-yellow" aria-hidden />)}
              </div>
              <blockquote className="mt-4 flex-1 text-security-navy">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="block font-semibold text-security-navy">{t.name}</span>
                <span className="text-gray-500">{t.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
