import { ArrowRight, Building, Building2, House, KeyRound, PartyPopper, type LucideIcon } from 'lucide-react';
import type { PropertyKey } from '@/lib/config';
import { START_EVENT } from './LeadForm';

const SERVICES: { key: PropertyKey; icon: LucideIcon; title: string; text: string; points: string[] }[] = [
  {
    key: 'home',
    icon: House,
    title: 'Home & Estate Security',
    text: 'Discreet on-site officers who protect your family, residence and valuables.',
    points: ['Overnight or 24/7 guards', 'Armed or unarmed', 'Access & visitor control'],
  },
  {
    key: 'hoa',
    icon: Building2,
    title: 'HOA & Gated Communities',
    text: 'Visible patrols and gate officers that deter crime and keep residents informed.',
    points: ['Scheduled mobile patrols', 'Gate & guardhouse staffing', 'Reports for your board'],
  },
  {
    key: 'apartment',
    icon: Building,
    title: 'Apartments & Condos',
    text: 'Uniformed officers for lobbies, garages and common areas.',
    points: ['Lobby & concierge security', 'Parking & garage patrols', 'Incident documentation'],
  },
  {
    key: 'vacant',
    icon: KeyRound,
    title: 'Vacant & Vacation Homes',
    text: 'Keep empty properties safe from break-ins, squatters and vandalism.',
    points: ['Random-time patrol checks', 'Exterior & entry inspections', 'Status updates while you’re away'],
  },
  {
    key: 'event',
    icon: PartyPopper,
    title: 'Private Residential Events',
    text: 'Professional, low-key security for parties, weddings and gatherings at home.',
    points: ['Guest list & entry control', 'Parking & crowd management', 'Low-key, professional presence'],
  },
];

export default function Services() {
  return (
    <section className="section bg-white" id="services">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Residential Services</p>
          <h2 className="text-3xl md:text-4xl">Protection Built Around Your Property</h2>
          <p className="mt-4 text-lg text-gray-600">Every plan is customized – choose the coverage you need, for as long as you need it.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ key, icon: Icon, title, text, points }) => (
            <article key={key} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-security-yellow hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-security-navy">
                <Icon className="h-6 w-6 text-security-yellow" aria-hidden />
              </span>
              <h3 className="mt-4 text-xl">{title}</h3>
              <p className="mt-2 text-gray-600">{text}</p>
              <ul className="mt-4 flex-1 space-y-1.5 text-sm">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-security-navy">
                    <span className="h-1.5 w-1.5 rounded-full bg-security-yellow" aria-hidden /> {p}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent(START_EVENT, { detail: { property: key } }))}
                className="mt-5 inline-flex items-center gap-1.5 self-start font-semibold text-security-blue hover:text-security-navy"
              >
                Get a quote <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </article>
          ))}
          <div className="flex flex-col justify-center rounded-2xl bg-security-navy p-6 text-white">
            <h3 className="text-xl text-white">Not sure what you need?</h3>
            <p className="mt-2 text-gray-300">Tell us about your property and a licensed consultant will recommend the right level of coverage – free.</p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent(START_EVENT))}
              className="btn-primary mt-5 self-start"
            >
              Get Free Recommendation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
