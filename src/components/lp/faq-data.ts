import { BUSINESS } from '@/lib/config';

export const FAQS: { q: string; a: string }[] = [
  {
    q: 'How much does a residential security guard cost?',
    a: 'Pricing depends on whether you need an armed or unarmed officer, the number of hours, the schedule (nights, weekends, holidays) and how long you need coverage. Mobile patrols are usually the most budget-friendly option. Request a free quote and we will give you an exact price for your property – no obligation.',
  },
  {
    q: 'How quickly can a guard start?',
    a: `For urgent situations we can often have officers on site within hours. Most clients are fully staffed within a few days. Call our 24/7 line at ${BUSINESS.phoneDisplay} if you need someone right away.`,
  },
  {
    q: 'Should I choose an armed or unarmed guard?',
    a: 'Most homes and communities are well served by unarmed officers, who provide a visible deterrent, access control and reporting. Armed officers are recommended for higher-risk situations, high-value estates or after specific threats. Your consultant will recommend the right option during your free consultation.',
  },
  {
    q: 'Are your officers licensed and insured?',
    a: `Yes. ${BUSINESS.name} is licensed by the California Bureau of Security and Investigative Services (${BUSINESS.license}). Our officers hold valid BSIS guard cards, and we are fully bonded and insured.`,
  },
  {
    q: 'Do I have to sign a long-term contract?',
    a: 'No. We offer coverage for a single night or event, a few weeks while you travel, or ongoing service. Your plan is built around your schedule.',
  },
  {
    q: 'Can you patrol our HOA or neighborhood instead of keeping a guard on site?',
    a: 'Yes. Mobile patrols visit your community at varied times, check common areas, gates and amenities, and document their activity – a cost-effective alternative to a full-time on-site officer.',
  },
  {
    q: 'What happens after I submit the form?',
    a: `Your request goes straight to our team. A licensed security consultant calls you ${BUSINESS.responsePromiseDetail} to understand your needs, then sends you a custom plan and quote. The consultation is free and there is no obligation.`,
  },
];
