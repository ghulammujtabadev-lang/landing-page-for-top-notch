import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import {
  Building2, CircleCheckBig, House, KeyRound, LoaderCircle, Lock, PartyPopper, Phone, ChevronLeft, ArrowRight,
  TriangleAlert, Building, Ellipsis, type LucideIcon,
} from 'lucide-react';
import { BUSINESS, CITIES, CONSENT_TEXT, OTHER_CITY, PROPERTY_TYPES, SERVICE_TYPES, TIMELINES, type PropertyKey } from '@/lib/config';
import { EMPTY_LEAD, formatPhone, propertyLabel, toE164, validateStep, type FieldErrors, type LeadInput } from '@/lib/lead';
import { captureAttribution, saveHandoff, trackEvent } from '@/lib/tracking';
import type { LeadResponse } from '@/pages/api/lead';

const ICONS: Record<PropertyKey, LucideIcon> = {
  home: House,
  hoa: Building2,
  apartment: Building,
  vacant: KeyRound,
  event: PartyPopper,
  other: Ellipsis,
};

const DRAFT_KEY = 'tn_lead_draft';
const REDIRECT_DELAY_MS = 2800;
export const THANK_YOU_PATH = '/residential-security/thank-you';
/** Other sections dispatch this to preselect a property type and jump into the form. */
export const START_EVENT = 'tn:start-quote';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Props {
  initialProperty?: PropertyKey | null;
  initialCity?: string | null;
}

export default function LeadForm({ initialProperty, initialCity }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [lead, setLead] = useState<LeadInput>(() => ({
    ...EMPTY_LEAD,
    propertyType: initialProperty ?? '',
    city: initialCity ?? '',
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [firstName, setFirstName] = useState('');
  const startedAt = useRef(Date.now());
  const started = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Restore an unfinished draft (e.g. after an accidental refresh), then keep it saved.
  useEffect(() => {
    try {
      const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? 'null');
      if (draft?.lead) {
        setLead((l) => ({ ...l, ...draft.lead, propertyType: draft.lead.propertyType || l.propertyType }));
        if (draft.step > 1) setStep(Math.min(draft.step, 3));
      }
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    if (status === 'success') return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ step, lead: { ...lead, attribution: {} } }));
    } catch {
      /* ignore */
    }
  }, [lead, step, status]);

  const markStarted = useCallback(() => {
    if (started.current) return;
    started.current = true;
    trackEvent('lead_form_start');
  }, []);

  const goTo = useCallback((next: number) => {
    setStep(next);
    setErrors({});
    trackEvent('lead_form_step', { step: next });
    // Move focus to the new step's heading for keyboard and screen-reader users.
    requestAnimationFrame(() => stepHeadingRef.current?.focus({ preventScroll: true }));
  }, []);

  // "Get a quote" buttons elsewhere on the page.
  useEffect(() => {
    const onStart = (e: Event) => {
      const key = (e as CustomEvent<{ property?: PropertyKey }>).detail?.property;
      markStarted();
      if (key) {
        setLead((l) => ({ ...l, propertyType: key }));
        // "Other" stays on step 1 so the visitor can type the property type.
        if (status !== 'success') goTo(key === 'other' ? 1 : Math.max(2, step));
      }
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    window.addEventListener(START_EVENT, onStart);
    return () => window.removeEventListener(START_EVENT, onStart);
  }, [goTo, markStarted, status, step]);

  const update = <K extends keyof LeadInput>(key: K, value: LeadInput[K]) => {
    markStarted();
    setLead((l) => ({ ...l, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const choosePropertyType = (key: PropertyKey) => {
    update('propertyType', key);
    if (key === 'other') {
      requestAnimationFrame(() => document.getElementById('otherProperty')?.focus());
      return;
    }
    goTo(2);
  };

  const next = () => {
    const e = validateStep(step, lead);
    setErrors(e);
    if (Object.keys(e).length) return;
    goTo(step + 1);
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (step < 3) return next();
    if (status === 'submitting') return;
    const e = validateStep(3, lead);
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus('submitting');
    setServerError('');
    const honeypot = (ev.currentTarget as HTMLFormElement).elements.namedItem('company_website') as HTMLInputElement | null;
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          attribution: captureAttribution(),
          company_website: honeypot?.value ?? '',
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const data = (await res.json().catch(() => null)) as LeadResponse | null;
      if (!res.ok || !data?.ok) {
        if (data && !data.ok && data.fieldErrors) {
          setErrors(data.fieldErrors);
          const firstBad = [1, 2, 3].find((s) => Object.keys(validateStep(s, lead)).length);
          if (firstBad && firstBad !== step) goTo(firstBad);
        }
        throw new Error((data && !data.ok && data.error) || 'Request failed');
      }

      setFirstName(data.firstName);
      setStatus('success');
      trackEvent('lead_form_submit_success', { property_type: lead.propertyType });
      saveHandoff({
        leadId: data.leadId,
        firstName: data.firstName,
        email: lead.email || undefined,
        phoneE164: toE164(lead.phone),
        propertyLabel: propertyLabel(lead.propertyType, lead.otherProperty),
        city: lead.city === OTHER_CITY ? lead.otherCity : lead.city,
        timeline: lead.timeline,
      });
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      setTimeout(() => router.push(THANK_YOU_PATH), REDIRECT_DELAY_MS);
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error && err.message !== 'Request failed' ? err.message : 'Something went wrong on our end.');
      trackEvent('lead_form_submit_error');
    }
  };

  // The success panel is shorter than step 3, so bring it into view.
  useEffect(() => {
    if (status === 'success') rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [status]);

  if (status === 'success') {
    return (
      <div ref={rootRef} className="animate-fade-up p-6 sm:p-8" role="status" aria-live="polite">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CircleCheckBig className="h-8 w-8 text-green-600" aria-hidden />
        </div>
        <h3 className="text-center text-2xl">Request received{firstName ? `, ${firstName}` : ''}!</h3>
        <p className="mt-2 text-center text-gray-600">Your request is in our system and a security consultant has been notified.</p>
        <ol className="mt-6 space-y-3 text-sm">
          {[
            `A licensed security consultant reviews your ${propertyLabel(lead.propertyType, lead.otherProperty).toLowerCase()} request.`,
            `We call you from ${BUSINESS.phoneDisplay} ${BUSINESS.responsePromiseDetail}.`,
            'You get a free, no-obligation security plan and quote.',
          ].map((t, i) => (
            <li key={t} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-security-navy text-xs font-bold text-security-yellow">
                {i + 1}
              </span>
              <span className="text-security-navy">{t}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> Taking you to your confirmation page…
        </p>
      </div>
    );
  }

  const progress = (step / 3) * 100;
  const stepTitles = ['What do you need protected?', 'Tell us about the coverage', 'Where should we send your quote?'];

  return (
    <div ref={rootRef} id="quote-form">
      <form onSubmit={submit} noValidate className="p-5 sm:p-7" aria-describedby="form-privacy">
        {/* Progress */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-500">
            <span>Step {step} of 3</span>
            <span>About 30 seconds</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step} aria-label="Form progress">
            <div className="h-full rounded-full bg-gradient-to-r from-security-yellow to-security-gold transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h3 ref={stepHeadingRef} tabIndex={-1} className="mb-4 text-xl outline-none sm:text-2xl">
          {stepTitles[step - 1]}
        </h3>

        {/* Honeypot – hidden from people, filled by bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company_website">Company website</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {step === 1 && (
          <fieldset className="animate-fade-up">
            <legend className="sr-only">Property type</legend>
            <div className="grid gap-2.5">
              {PROPERTY_TYPES.map((p) => {
                const Icon = ICONS[p.key];
                const selected = lead.propertyType === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => choosePropertyType(p.key)}
                    aria-pressed={selected}
                    className={`group flex min-h-[56px] items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-semibold transition ${
                      selected
                        ? 'border-security-yellow bg-security-yellow/10 text-security-navy'
                        : 'border-gray-200 text-security-navy hover:border-security-yellow hover:bg-security-yellow/5'
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-security-navy text-security-yellow">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="flex-1">{p.label}</span>
                    <ArrowRight className="h-5 w-5 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-security-gold" aria-hidden />
                  </button>
                );
              })}
            </div>
            {errors.propertyType && <p className="field-error">{errors.propertyType}</p>}
            {lead.propertyType === 'other' && (
              <div className="mt-3">
                <label htmlFor="otherProperty" className="field-label">What type of property is it?</label>
                <input
                  id="otherProperty"
                  className="field"
                  placeholder="e.g. shelter, transitional housing, church"
                  value={lead.otherProperty}
                  onChange={(e) => update('otherProperty', e.target.value)}
                  aria-invalid={Boolean(errors.otherProperty)}
                />
                {errors.otherProperty && <p className="field-error">{errors.otherProperty}</p>}
              </div>
            )}
          </fieldset>
        )}

        {step === 2 && (
          <div className="animate-fade-up space-y-4">
            <fieldset>
              <legend className="field-label">Type of security</legend>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_TYPES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update('serviceType', s)}
                    aria-pressed={lead.serviceType === s}
                    className={`min-h-[48px] rounded-lg border-2 px-3 py-2 text-sm font-semibold transition ${
                      lead.serviceType === s
                        ? 'border-security-yellow bg-security-yellow/10 text-security-navy'
                        : 'border-gray-200 text-security-navy hover:border-security-yellow'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {errors.serviceType && <p className="field-error">{errors.serviceType}</p>}
            </fieldset>

            <div>
              <label htmlFor="timeline" className="field-label">When do you need coverage?</label>
              <select
                id="timeline"
                className="field"
                value={lead.timeline}
                onChange={(e) => update('timeline', e.target.value)}
                aria-invalid={Boolean(errors.timeline)}
              >
                <option value="">Select a timeline</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.timeline && <p className="field-error">{errors.timeline}</p>}
            </div>

            <div>
              <label htmlFor="city" className="field-label">Property location</label>
              <select
                id="city"
                className="field"
                value={lead.city}
                onChange={(e) => update('city', e.target.value)}
                aria-invalid={Boolean(errors.city)}
              >
                <option value="">Select your city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}, CA</option>
                ))}
                <option value={OTHER_CITY}>{OTHER_CITY}</option>
              </select>
              {errors.city && <p className="field-error">{errors.city}</p>}
              {lead.city === OTHER_CITY && (
                <div className="mt-2">
                  <label htmlFor="otherCity" className="sr-only">Your city</label>
                  <input
                    id="otherCity"
                    className="field"
                    placeholder="Your city"
                    autoComplete="address-level2"
                    value={lead.otherCity}
                    onChange={(e) => update('otherCity', e.target.value)}
                    aria-invalid={Boolean(errors.otherCity)}
                  />
                  {errors.otherCity && <p className="field-error">{errors.otherCity}</p>}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up space-y-4">
            <div>
              <label htmlFor="name" className="field-label">Full name</label>
              <input
                id="name"
                className="field"
                autoComplete="name"
                placeholder="Your full name"
                value={lead.name}
                onChange={(e) => update('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="field-label">Mobile phone</label>
              <input
                id="phone"
                className="field"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(555) 123-4567"
                value={lead.phone}
                onChange={(e) => update('phone', formatPhone(e.target.value))}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="email" className="field-label">
                Email <span className="font-normal text-gray-400">(for your written quote)</span>
              </label>
              <input
                id="email"
                className="field"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={lead.email}
                onChange={(e) => update('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="field-label">
                Anything we should know? <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                id="message"
                rows={2}
                className="field h-auto py-2.5"
                placeholder="e.g. overnight guard for 2 weeks, recent break-ins, gate access…"
                value={lead.message}
                onChange={(e) => update('message', e.target.value)}
              />
              {errors.message && <p className="field-error">{errors.message}</p>}
            </div>
            <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-gray-500">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-security-navy"
                checked={lead.smsConsent}
                onChange={(e) => update('smsConsent', e.target.checked)}
              />
              <span>{CONSENT_TEXT}</span>
            </label>
          </div>
        )}

        {status === 'error' && (
          <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <p className="flex items-center gap-2 font-semibold">
              <TriangleAlert className="h-4 w-4" aria-hidden /> {serverError}
            </p>
            <p className="mt-1">
              Your answers are saved – please try again, or call us now at{' '}
              <a href={BUSINESS.phoneHref} className="font-bold underline">{BUSINESS.phoneDisplay}</a> (24/7).
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          {step > 1 && (
            <button type="button" onClick={() => goTo(step - 1)} className="inline-flex h-12 items-center gap-1 rounded-lg px-3 font-semibold text-gray-500 hover:text-security-navy">
              <ChevronLeft className="h-5 w-5" aria-hidden /> Back
            </button>
          )}
          {(step > 1 || lead.propertyType === 'other') && (
            <button type="submit" className="btn-primary flex-1 text-lg" disabled={status === 'submitting'}>
              {status === 'submitting' ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden /> Sending…
                </>
              ) : step === 3 ? (
                <>Get My Free Quote <ArrowRight className="h-5 w-5" aria-hidden /></>
              ) : (
                <>Continue <ArrowRight className="h-5 w-5" aria-hidden /></>
              )}
            </button>
          )}
        </div>

        <p id="form-privacy" className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
          <Lock className="h-3.5 w-3.5" aria-hidden /> Your information is private and never sold.{' '}
          <a href={BUSINESS.privacyUrl} target="_blank" rel="noopener" className="underline">Privacy policy</a>
        </p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
          <Phone className="h-3.5 w-3.5" aria-hidden /> Prefer to talk?{' '}
          <a href={BUSINESS.phoneHref} className="font-semibold text-security-navy underline">{BUSINESS.phoneDisplay}</a>
        </p>
      </form>
    </div>
  );
}
