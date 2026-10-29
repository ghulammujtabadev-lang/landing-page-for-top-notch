import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CalendarCheck, CircleCheckBig, FileText, Mail, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import { BUSINESS } from '@/lib/config';
import { fireLeadConversion, readHandoff, type LeadHandoff } from '@/lib/tracking';
import CallLink from '@/components/lp/CallLink';
import Footer from '@/components/lp/Footer';

export default function ThankYouPage() {
  const [lead, setLead] = useState<LeadHandoff | null>(null);

  useEffect(() => {
    const h = readHandoff();
    setLead(h);
    // Only count a conversion when this browser actually submitted a lead.
    if (!h) return;
    let tries = 0;
    const fire = () => {
      if (typeof window.gtag === 'function' || tries++ > 20) fireLeadConversion(h);
      else setTimeout(fire, 150);
    };
    fire();
  }, []);

  const steps = [
    {
      icon: MessageSquare,
      title: 'Confirmation sent',
      text: lead?.email
        ? `Your request is logged. Watch your phone and ${lead.email} for a confirmation.`
        : 'Your request is logged. Watch your phone for a confirmation from our team.',
    },
    {
      icon: Phone,
      title: `We call you ${BUSINESS.responsePromise}`,
      text: `A licensed security consultant will call from ${BUSINESS.phoneDisplay} ${BUSINESS.responsePromiseDetail}. Please save our number so you recognize the call.`,
    },
    {
      icon: FileText,
      title: 'Free custom plan & quote',
      text: 'We review your property, schedule and risks, then send a written security plan and price. No obligation.',
    },
    {
      icon: ShieldCheck,
      title: 'Officers on site',
      text: 'Once you approve, vetted and licensed officers are scheduled – urgent requests can often be staffed within hours.',
    },
  ];

  return (
    <>
      <Head>
        <title>{`Request Received | ${BUSINESS.name}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <header className="border-b border-gray-100 bg-white">
        <div className="container flex h-16 items-center justify-between md:h-20">
          <Image src="/img/top-notch-logo.png" alt={BUSINESS.name} width={546} height={176} priority className="h-10 w-auto md:h-12" />
          <CallLink location="thank_you_header" className="flex items-center gap-2 font-bold text-security-navy">
            <Phone className="h-4 w-4 text-security-gold" aria-hidden /> {BUSINESS.phoneDisplay}
          </CallLink>
        </div>
      </header>

      <main className="bg-gray-50">
        <section className="bg-security-navy py-12 text-center text-white md:py-16">
          <div className="container max-w-2xl">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15">
              <CircleCheckBig className="h-10 w-10 text-green-400" aria-hidden />
            </span>
            <h1 className="mt-5 text-3xl text-white md:text-4xl">
              Thank you{lead?.firstName ? `, ${lead.firstName}` : ''}! Your request is in.
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              {lead
                ? `We received your ${lead.propertyLabel.toLowerCase()} security request${lead.city ? ` for ${lead.city}` : ''}. Here’s exactly what happens next.`
                : 'Here’s exactly what happens next.'}
            </p>
          </div>
        </section>

        <section className="container max-w-3xl py-12">
          <ol className="relative ml-5 space-y-8 border-l-2 border-security-yellow/40 pl-8">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative">
                <span className="absolute -left-[3.3rem] flex h-10 w-10 items-center justify-center rounded-full bg-security-navy ring-4 ring-gray-50">
                  <Icon className="h-5 w-5 text-security-yellow" aria-hidden />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-security-gold">Step {i + 1}{i === 0 ? ' · Done' : ''}</p>
                <h2 className="mt-1 text-xl">{title}</h2>
                <p className="mt-1 text-gray-600">{text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="flex items-center gap-2 text-lg"><CalendarCheck className="h-5 w-5 text-security-gold" aria-hidden /> Need coverage right now?</h2>
              <p className="mt-2 text-sm text-gray-600">Don’t wait for our call – our 24/7 line can dispatch help immediately.</p>
              <CallLink location="thank_you_urgent" className="btn-primary mt-4 w-full">
                <Phone className="h-5 w-5" aria-hidden /> Call {BUSINESS.phoneDisplay}
              </CallLink>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="flex items-center gap-2 text-lg"><Mail className="h-5 w-5 text-security-gold" aria-hidden /> Have photos or details?</h2>
              <p className="mt-2 text-sm text-gray-600">Send photos, a site map or your schedule to speed up your quote.</p>
              <a href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Residential security request – additional details')}`} className="btn-secondary mt-4 w-full border-security-navy text-security-navy hover:bg-security-navy hover:text-white">
                Email Our Team
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-green-600" aria-hidden /> CA License {BUSINESS.license}</span>
            <span>Licensed, bonded &amp; insured</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
