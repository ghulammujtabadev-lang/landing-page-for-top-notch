import Image from 'next/image';
import { BadgeCheck, Clock, ShieldCheck, Star, UserCheck } from 'lucide-react';
import { BUSINESS, GOOGLE_RATING, type PropertyKey } from '@/lib/config';
import LeadForm from './LeadForm';

interface Props {
  headline: string;
  subheadline: string;
  initialProperty: PropertyKey | null;
  initialCity: string | null;
}

const BULLETS = [
  'Licensed, background-checked & BSIS-certified officers',
  'Armed or unarmed – on-site guards or mobile patrols',
  `Free consultation – we call you back ${BUSINESS.responsePromise}`,
];

export default function Hero({ headline, subheadline, initialProperty, initialCity }: Props) {
  return (
    <section className="relative overflow-hidden bg-security-navy text-white">
      <Image
        src="/img/officer-hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_20%] opacity-20 lg:object-[30%_20%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-security-navy/60 via-security-navy/80 to-security-navy lg:bg-gradient-to-r lg:from-security-navy lg:via-security-navy/85 lg:to-security-navy/60" />

      <div className="container relative grid items-center gap-8 py-8 md:py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-20">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-security-yellow/40 bg-security-yellow/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-security-yellow">
            <ShieldCheck className="h-4 w-4" aria-hidden /> Residential Security · Bay Area
          </p>
          <h1 className="text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">{headline}</h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl">{subheadline}</p>

          <ul className="mt-6 hidden space-y-3 lg:block">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-100">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-security-yellow" aria-hidden /> {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 hidden flex-wrap gap-x-6 gap-y-3 text-sm text-gray-300 lg:flex">
            {GOOGLE_RATING && (
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-security-yellow text-security-yellow" aria-hidden />
                <strong className="text-white">{GOOGLE_RATING.rating.toFixed(1)}</strong> ({GOOGLE_RATING.count} Google reviews)
              </span>
            )}
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-security-yellow" aria-hidden /> {BUSINESS.license}</span>
            <span className="flex items-center gap-1.5"><UserCheck className="h-4 w-4 text-security-yellow" aria-hidden /> {BUSINESS.insurance}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-security-yellow" aria-hidden /> 24/7 dispatch</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-security-yellow/60 to-transparent blur-sm" aria-hidden />
          <div className="relative rounded-2xl bg-white text-security-gray shadow-2xl">
            <div className="rounded-t-2xl bg-security-yellow px-5 py-3 text-center sm:px-7">
              <p className="font-heading text-lg font-bold text-security-navy">Get Your Free Security Quote</p>
              <p className="text-sm font-medium text-security-navy/80">Takes 30 seconds · No obligation</p>
            </div>
            <LeadForm initialProperty={initialProperty} initialCity={initialCity} />
          </div>
        </div>

        <ul className="space-y-2.5 lg:hidden">
          {BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-gray-100">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-security-yellow" aria-hidden /> {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
