import { Eye, FileText, Radio, ShieldCheck, UserCheck, Users } from 'lucide-react';
import { BUSINESS } from '@/lib/config';
import CallLink from './CallLink';

const REASONS = [
  { icon: UserCheck, title: 'Vetted, licensed officers', text: 'Every officer is background-checked, BSIS guard-card certified and professionally trained.' },
  { icon: ShieldCheck, title: 'Fully licensed & insured', text: `California ${BUSINESS.license}. Licensed, bonded and insured.` },
  { icon: Eye, title: 'Discreet & professional', text: 'Courteous officers who respect your privacy, your neighbors and your residents.' },
  { icon: FileText, title: 'Clear reporting', text: 'Incident and activity reports so you always know what happened on your property.' },
  { icon: Radio, title: '24/7 dispatch & support', text: 'A live person answers day or night – including weekends and holidays.' },
  { icon: Users, title: 'Flexible coverage', text: 'One night, a few weeks or ongoing – armed or unarmed, on-site or patrol.' },
];

export default function WhyUs() {
  return (
    <section className="section bg-security-navy text-white" id="why-us">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-security-yellow">Why Top Notch</p>
          <h2 className="text-3xl text-white md:text-4xl">Security You Can Actually Trust at Home</h2>
          <p className="mt-4 text-lg text-gray-300">Letting someone protect your home is personal. Here’s what you can count on.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Icon className="h-8 w-8 text-security-yellow" aria-hidden />
              <h3 className="mt-4 text-lg text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-300">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-gray-300">
          Urgent situation? Call our 24/7 line:{' '}
          <CallLink location="why_us" className="font-bold text-security-yellow underline underline-offset-4" />
        </p>
      </div>
    </section>
  );
}
