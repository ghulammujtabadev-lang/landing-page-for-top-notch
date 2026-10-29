import { CalendarCheck, ClipboardList, ShieldCheck } from 'lucide-react';
import { BUSINESS } from '@/lib/config';

const STEPS = [
  { icon: ClipboardList, title: 'Request your free quote', text: 'Answer 3 quick questions about your property – it takes about 30 seconds.' },
  { icon: CalendarCheck, title: 'Get a custom security plan', text: `A licensed consultant calls you ${BUSINESS.responsePromiseDetail} to understand your risks and schedule.` },
  { icon: ShieldCheck, title: 'Officers on site', text: 'Vetted, uniformed officers start protecting your property – urgent requests can be staffed fast.' },
];

export default function HowItWorks() {
  return (
    <section className="section bg-gray-50" id="how-it-works">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How It Works</p>
          <h2 className="text-3xl md:text-4xl">Protected in 3 Simple Steps</h2>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative text-center">
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-security-navy shadow-lg">
                <Icon className="h-7 w-7 text-security-yellow" aria-hidden />
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-security-yellow text-sm font-bold text-security-navy">{i + 1}</span>
              </span>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-gray-600">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
