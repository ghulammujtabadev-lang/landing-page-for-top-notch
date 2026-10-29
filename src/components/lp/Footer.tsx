import { BUSINESS } from '@/lib/config';
import CallLink from './CallLink';

export default function Footer() {
  return (
    <footer className="bg-security-navy pb-24 pt-10 text-sm text-gray-400 md:pb-10">
      <div className="container grid gap-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-base font-semibold text-white">{BUSINESS.name}</p>
          <p className="mt-2">{BUSINESS.address}</p>
          <p className="mt-1">California License {BUSINESS.license}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Contact</p>
          <p className="mt-2">
            <CallLink location="footer" className="hover:text-security-yellow" /> (24/7)
          </p>
          <p className="mt-1">
            <a href={`mailto:${BUSINESS.email}`} className="hover:text-security-yellow">{BUSINESS.email}</a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Office hours</p>
          {BUSINESS.hours.map((h) => (
            <p key={h.days} className="mt-1">{h.days}: {h.time}</p>
          ))}
        </div>
      </div>
      <div className="container mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        <p className="flex gap-4">
          <a href={BUSINESS.privacyUrl} className="hover:text-security-yellow">Privacy Policy</a>
          <a href={BUSINESS.mainSite} className="hover:text-security-yellow">Main website</a>
        </p>
      </div>
    </footer>
  );
}
