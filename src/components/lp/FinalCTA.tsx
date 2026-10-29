import { Building, Building2, Ellipsis, House, KeyRound, PartyPopper, Phone, type LucideIcon } from 'lucide-react';
import { BUSINESS, PROPERTY_TYPES, type PropertyKey } from '@/lib/config';
import CallLink from './CallLink';
import { START_EVENT } from './LeadForm';

const ICONS: Record<PropertyKey, LucideIcon> = { home: House, hoa: Building2, apartment: Building, vacant: KeyRound, event: PartyPopper, other: Ellipsis };

// Repeats step 1 of the form so visitors who scrolled can start without hunting for it.
export default function FinalCTA() {
  return (
    <section className="section bg-gradient-to-br from-security-navy via-security-blue to-security-navy text-white" id="get-quote">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl text-white md:text-4xl">Get Your Free Residential Security Quote</h2>
        <p className="mt-4 text-lg text-gray-300">What do you need protected? Pick one to start – it takes 30 seconds.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PROPERTY_TYPES.map((p) => {
            const Icon = ICONS[p.key];
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent(START_EVENT, { detail: { property: p.key } }))}
                className="flex flex-col items-center gap-2 rounded-xl border-2 border-white/15 bg-white/5 px-3 py-5 font-semibold transition hover:border-security-yellow hover:bg-security-yellow/10"
              >
                <Icon className="h-7 w-7 text-security-yellow" aria-hidden />
                <span className="text-sm">{p.short}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-8 text-gray-300">
          Or call us 24/7:{' '}
          <CallLink location="final_cta" className="inline-flex items-center gap-1.5 font-bold text-security-yellow underline underline-offset-4">
            <Phone className="h-4 w-4" aria-hidden /> {BUSINESS.phoneDisplay}
          </CallLink>
        </p>
      </div>
    </section>
  );
}
