import { FileText, Phone } from 'lucide-react';
import CallLink from './CallLink';
import { START_EVENT } from './LeadForm';

export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-gray-200 bg-white/95 p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <CallLink location="mobile_bar" className="flex h-12 items-center justify-center gap-2 rounded-lg bg-security-navy font-semibold text-white">
        <Phone className="h-5 w-5 text-security-yellow" aria-hidden /> Call Now
      </CallLink>
      <button type="button" onClick={() => window.dispatchEvent(new CustomEvent(START_EVENT))} className="btn-primary h-12 py-0">
        <FileText className="h-5 w-5" aria-hidden /> Free Quote
      </button>
    </div>
  );
}
