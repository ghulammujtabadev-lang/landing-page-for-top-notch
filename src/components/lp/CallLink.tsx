import type { ReactNode } from 'react';
import { BUSINESS } from '@/lib/config';
import { trackEvent } from '@/lib/tracking';

/** tel: link that reports click-to-call as an event (map it to a Google Ads call conversion in GTM if wanted). */
export default function CallLink({ className, children, location }: { className?: string; children?: ReactNode; location: string }) {
  return (
    <a href={BUSINESS.phoneHref} className={className} onClick={() => trackEvent('click_to_call', { location })}>
      {children ?? BUSINESS.phoneDisplay}
    </a>
  );
}
