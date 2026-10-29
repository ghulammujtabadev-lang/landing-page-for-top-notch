import { Award, BadgeCheck, Clock, FileText, ShieldCheck } from 'lucide-react';
import { BUSINESS } from '@/lib/config';

const ITEMS = [
  { icon: ShieldCheck, title: 'CA Licensed', text: BUSINESS.license },
  { icon: FileText, title: 'Fully Insured', text: 'Liability coverage' },
  { icon: BadgeCheck, title: 'Bonded', text: 'Bonded officers' },
  { icon: Award, title: 'BSIS & ASIS', text: 'Certified officers' },
  { icon: Clock, title: '24/7/365', text: 'Dispatch & support' },
];

export default function TrustBar() {
  return (
    <section aria-label="Credentials" className="border-b border-gray-100 bg-gray-50">
      <div className="container grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className={`flex items-center gap-3 ${i === ITEMS.length - 1 ? 'col-span-2 justify-center sm:col-span-1 sm:justify-start' : ''}`}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-security-navy">
              <Icon className="h-5 w-5 text-security-yellow" aria-hidden />
            </span>
            <span>
              <span className="block font-heading text-sm font-semibold text-security-navy">{title}</span>
              <span className="block text-xs text-gray-500">{text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
