/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR BUSINESS DETAILS
 *  Edit this file to change the name, phone, email, rates or hours everywhere
 *  on the site at once. Nothing below is duplicated in the page files.
 *
 *  ⚠️  PLACEHOLDERS TO REPLACE BEFORE LAUNCH — see README.md checklist:
 *      phone, email, domain, social links, Google review link
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'The Clean Technique',
  legalName: 'The Clean Technique',
  tagline: 'Cleaning and organization for White Rock and South Surrey homes',
  shortDescription:
    'Owned and operated cleaning, organizing and in-home help serving White Rock, South Surrey and the surrounding Semiahmoo Peninsula.',

  phone: '(604) 499-8455',
  phoneHref: '+16044998455',

  // Stephanie's working inbox, and the address QUOTE_NOTIFY_EMAIL delivers to.
  // It is not on the site's domain, so it cannot be the Resend *sending*
  // address — QUOTE_FROM_EMAIL is quotes@cleantechnique.ca, which is the
  // domain verified in Resend.
  email: 'hello.cleantechnique@gmail.com',

  // ⚠️ PLACEHOLDER — must match the live Vercel domain for canonicals + sitemap.
  url: 'https://cleantechnique.ca',

  founder: {
    name: 'Stephanie Wideski',
    role: 'Owner and operator',
    firstName: 'Stephanie',
  },

  /* Hourly rates, by kind of work. Change here, changes everywhere.
   * `min`/`max`/`range`/`rangePerHour` are derived, so every page, component
   * and schema block that already reads them keeps working untouched. */
  rate: {
    regular: 37,   // recurring house cleaning
    deep: 40,      // deep cleaning
    specialty: 50, // move-out, post-renovation, organizing, turnovers, custom
    unit: 'hour',
    get min() {
      return this.regular;
    },
    get max() {
      return this.specialty;
    },
    get range() {
      return `$${this.min}–$${this.max}`;
    },
    get rangePerHour() {
      return `$${this.min}–$${this.max} per hour`;
    },
    get from() {
      return `from $${this.regular} per hour`;
    },
  },

  /* Flat-fee extras, charged ON TOP of the hours, not instead of them.
   * Order is the order they appear on the pricing page. */
  addOns: [
    {
      name: 'Laundry',
      price: 45,
      detail:
        'A load put on and changed over during the visit. Or leave it washed on the bed and it comes back folded. Bed linens — sheets, duvet covers, pillowcases — changed as part of the same job.',
    },
    {
      name: 'Windows and windowsills',
      price: 45,
      detail:
        'Every windowsill and window in the house. Most homes need this once every couple of months rather than every visit.',
    },
    {
      name: 'Fridge, inside and organized',
      price: 50,
      detail:
        'Emptied, shelves out and washed, expired food cleared, and put back in an order that still makes sense in a month.',
    },
    {
      name: 'Walls',
      price: 55,
      detail: 'Washed throughout, not just the marks you have already noticed.',
    },
  ],

  // Used for LocalBusiness schema. Google reads this.
  priceRange: '$$',

  // Service-area business — no storefront address is published.
  // If Stephanie ever registers a public address, add it here and to schema.ts.
  baseCity: 'White Rock',
  baseRegion: 'British Columbia',
  baseRegionCode: 'BC',
  baseCountry: 'CA',
  geo: { lat: 49.0253, lng: -122.8029 },
  serviceRadiusKm: 20,

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
    { days: ['Saturday'], opens: '09:00', closes: '15:00' },
  ],
  hoursLabel: 'Mon–Fri 9am–5pm · Sat 9am–3pm',

  social: {
    // ⚠️ PLACEHOLDERS — delete any line that does not exist yet.
    instagram: 'https://www.instagram.com/thecleantechnique',
    facebook: 'https://www.facebook.com/thecleantechnique',
  },

  // ⚠️ PLACEHOLDER — paste the Google Business Profile review link once it exists.
  googleReviewUrl: '',

  // Where quote submissions are sent. Set in Vercel env vars, not here.
  // QUOTE_NOTIFY_EMAIL / QUOTE_WEBHOOK_URL / RESEND_API_KEY
} as const;

export type Site = typeof site;

/** Digits-only phone for tel: links and schema. */
export const telHref = `tel:${site.phoneHref}`;
export const mailHref = `mailto:${site.email}`;
