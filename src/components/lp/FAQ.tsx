import { ChevronDown } from 'lucide-react';
import { FAQS } from './faq-data';

export default function FAQ() {
  return (
    <section className="section bg-white" id="faq">
      <div className="container max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="text-3xl md:text-4xl">Questions Homeowners Ask</h2>
        </div>
        <div className="mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-semibold text-security-navy">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-security-gold transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
