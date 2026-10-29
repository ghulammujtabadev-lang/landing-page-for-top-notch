import Image from 'next/image';
import { Phone, ShieldCheck } from 'lucide-react';
import { BUSINESS } from '@/lib/config';
import CallLink from './CallLink';

// No navigation on purpose: the only exits are "call" and "get a quote".
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-3 md:h-20">
        <Image src="/img/top-notch-logo.png" alt={BUSINESS.name} width={546} height={176} priority className="h-10 w-auto md:h-12" />
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 text-sm font-medium text-security-gray lg:flex">
            <ShieldCheck className="h-4 w-4 text-green-600" aria-hidden /> Licensed {BUSINESS.license} · Insured
          </span>
          <CallLink location="header" className="flex items-center gap-2 rounded-lg bg-security-navy px-3 py-2 text-white transition hover:bg-security-blue md:px-4">
            <Phone className="h-4 w-4 text-security-yellow" aria-hidden />
            <span className="flex flex-col leading-tight">
              <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-security-yellow sm:block">Call 24/7</span>
              <span className="text-sm font-bold md:text-base">{BUSINESS.phoneDisplay}</span>
            </span>
          </CallLink>
        </div>
      </div>
    </header>
  );
}
