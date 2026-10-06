import { services } from './services';
import { areas } from './areas';

/** Shared between the client form and the API route so both agree on shape. */

export const frequencyOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Every two weeks' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'one-time', label: 'One time only' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export const bedroomOptions = ['Studio or 1', '2', '3', '4', '5+'] as const;
export const bathroomOptions = ['1', '1.5', '2', '3', '4+'] as const;

export const timingOptions = [
  { value: 'asap', label: 'As soon as possible' },
  { value: 'this-month', label: 'Within the next few weeks' },
  { value: 'specific-date', label: 'I have a specific date' },
  { value: 'planning', label: 'Just planning ahead' },
] as const;

export const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));

export const areaOptions = [
  ...areas.map((a) => ({ value: a.slug, label: a.city })),
  { value: 'other', label: 'Somewhere else nearby' },
];

export type QuotePayload = {
  services: string[];
  area: string;
  neighbourhood: string;
  bedrooms: string;
  bathrooms: string;
  frequency: string;
  timing: string;
  pets: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  /** Anti-spam: must stay empty. */
  website?: string;
  /** Anti-spam: ms between form mount and submit. */
  elapsedMs?: number;
  /** Which page the lead came from, for attribution. */
  sourcePath?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/** Accepts 10-digit North American numbers in any common formatting. */
const PHONE_RE = /^(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

/**
 * The browser form always sends strings, but this also runs against whatever
 * arrives at the public API route. A JSON body that parses fine but carries a
 * number or an object where a string belongs must not throw — so every field
 * is coerced to its expected shape before anything is read off it.
 */
const asText = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const asList = (v: unknown) =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];

/** A payload with every field coerced to a safe type. */
export function normalizeQuote(data: unknown): QuotePayload {
  const d = (typeof data === 'object' && data !== null ? data : {}) as Record<string, unknown>;
  return {
    services: asList(d.services),
    area: asText(d.area),
    neighbourhood: asText(d.neighbourhood),
    bedrooms: asText(d.bedrooms),
    bathrooms: asText(d.bathrooms),
    frequency: asText(d.frequency),
    timing: asText(d.timing),
    pets: asText(d.pets),
    name: asText(d.name),
    email: asText(d.email),
    phone: asText(d.phone),
    notes: asText(d.notes),
    website: asText(d.website),
    elapsedMs: typeof d.elapsedMs === 'number' && Number.isFinite(d.elapsedMs) ? d.elapsedMs : undefined,
    sourcePath: asText(d.sourcePath),
  };
}

export function validateQuote(data: Partial<QuotePayload>) {
  const errors: Record<string, string> = {};
  const services = asList(data.services);
  const name = asText(data.name);
  const email = asText(data.email);
  const phone = asText(data.phone);

  if (services.length === 0) {
    errors.services = 'Pick at least one thing you need help with.';
  }
  if (!asText(data.area)) errors.area = 'Let her know roughly where you are.';
  if (!name) errors.name = 'A first name is enough.';
  if (!email) {
    errors.email = 'An email so she can send the estimate.';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'That email address does not look right.';
  }
  if (!phone) {
    errors.phone = 'A phone number, in case the email bounces.';
  } else if (!PHONE_RE.test(phone)) {
    errors.phone = 'Please use a 10-digit number, like 604 555 0123.';
  }

  return { errors, valid: Object.keys(errors).length === 0 };
}

export function labelForService(slug: string) {
  return services.find((s) => s.slug === slug)?.name ?? slug;
}

export function labelForArea(slug: string) {
  if (slug === 'other') return 'Somewhere else nearby';
  return areas.find((a) => a.slug === slug)?.city ?? slug;
}
