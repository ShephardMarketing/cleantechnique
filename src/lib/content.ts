import { site } from './site';
import { areaList } from './areas';

/* ───────────────────────────── GLOBAL FAQs ───────────────────────────── */
/* These feed the FAQ page, the FAQ block on key pages, and FAQPage JSON-LD. */

export const faqs: { q: string; a: string }[] = [
  {
    q: 'How much does cleaning cost?',
    a: `$${site.rate.regular} an hour for a recurring clean, $${site.rate.deep} for a deep clean, and $${site.rate.specialty} for move-outs, post-renovation work, organizing and Airbnb turnovers — those are slower and harder on supplies. Extras like laundry, windows, the fridge or the walls are flat fees on top of the hours. You get an hour range in writing before anything is booked.`,
  },
  {
    q: 'Why hourly instead of a flat rate per house?',
    a: 'Because a flat rate only works if every house is the same, and they are not. Hourly means you are not subsidising someone else’s larger home, and it means Stephanie is not rushing the last two rooms to protect a quote she got wrong. The hour range is agreed up front, so you still know what to expect.',
  },
  {
    q: 'What areas do you cover?',
    a: `${areaList}, plus the surrounding Semiahmoo Peninsula. No travel charge inside those areas. If you are a little further out, call and ask — it depends on the day.`,
  },
  {
    q: 'Who actually shows up at my house?',
    a: `${site.founder.name} does. She owns and operates the business, so the person who quotes your home is the person running the work and answering for it. On larger jobs she occasionally brings a second pair of hands, and you will know in advance who that is.`,
  },
  {
    q: 'Do you bring your own supplies and equipment?',
    a: 'Yes, everything comes with her, including a vacuum. She uses standard cleaning products by default, because they kill bacteria that gentler ones do not, but she keeps organic products on hand and will use those instead if you prefer — just say so when you book. If you would rather she used your own products, leave them out and that is what gets used.',
  },
  {
    q: 'Do I need to be home?',
    a: 'No. Most clients are at work. A key, a lockbox code or a garage code all work fine, and whatever you choose is agreed in writing before the first visit.',
  },
  {
    q: 'What about pets?',
    a: 'Pets are not a problem, and plenty of clients have them. Tell Stephanie about anything she should know ahead of time — a dog who needs the gate shut, a cat who bolts, a product you would rather she skipped around the food bowls.',
  },
  {
    q: 'How do I pay?',
    a: 'E-transfer after the visit is the simplest and what most clients use. Cash is fine too. Recurring clients get invoiced on a schedule that suits them.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Twenty-four hours notice and there is no charge. Less than that and the booked time is hard to fill, so it gets billed at the usual rate. Illness and genuine emergencies are treated as exactly that.',
  },
  {
    q: 'Can you do laundry, dishes or the windows?',
    a: 'Yes, all three, as flat-fee extras on top of the hours rather than squeezed into the clean. Laundry is $45 — a load put on and changed over, or left folded if you wash it before she arrives — and bed linens get changed as part of it. Windows and windowsills are $45 and most homes want them every couple of months, not every visit. Dishes and a tidied sink can be added to any visit; ask when you book.',
  },
  {
    q: 'What is not included?',
    a: 'Anything needing a licence or specialised gear: mould remediation, carpet steam cleaning, exterior windows at height, biohazard cleanup, pest work and hoarding situations. Stephanie will say so up front and can usually recommend someone local.',
  },
];

/** Pick FAQs by a distinctive fragment of the question rather than by index.
 *  Index-based selection silently reshuffled every page whenever an entry was
 *  added or removed; this fails the build with a clear message instead. */
export const pickFaqs = (...fragments: string[]) =>
  fragments.map((frag) => {
    const match = faqs.find((f) => f.q.toLowerCase().includes(frag.toLowerCase()));
    if (!match) throw new Error(`pickFaqs: no FAQ in content.ts matching "${frag}"`);
    return match;
  });

/* ───────────────────────── HOW IT WORKS / PROCESS ───────────────────────── */

export const processSteps = [
  {
    step: '01',
    title: 'Tell her about the house',
    body: 'Fill in the quote form or call. Rooms, bathrooms, roughly what you want done, and whether this is a one-off or a regular thing. Photos help and are not required.',
  },
  {
    step: '02',
    title: 'Get an hour range, in writing',
    body: `A short walkthrough or a look at your photos, then an estimate of how many hours the job takes at ${site.rate.rangePerHour}. Nothing is booked until you have the number.`,
  },
  {
    step: '03',
    title: 'Pick a day that works',
    body: 'Choose the slot, and decide how she gets in — you home, a key, a lockbox, a garage code. Recurring clients keep the same day and time.',
  },
  {
    step: '04',
    title: 'The work gets done, you check it',
    body: 'Same checklist every visit so nothing slips. Anything that needs your attention gets noted. If something is not right, say so and it gets put right.',
  },
];

/* ─────────────────────────── WHY THIS, NOT THEM ─────────────────────────── */

export const differentiators = [
  {
    title: 'Owned and operated',
    body: 'You are not handed off to whoever is on the schedule this week. Stephanie quotes the work, runs it and answers for how it turns out, which is why the standard holds from one visit to the next.',
  },
  {
    title: 'Everything inside the home',
    body: 'Cleaning, organizing, laundry, the fridge, the windows, the jobs that never make it onto a list. Most companies do one narrow thing and leave the rest for you. If the pantry needs sorting before it can be cleaned properly, that happens in the same booking — the extras are flat fees, so you know what each one costs before you add it.',
  },
  {
    title: 'An hour range before you commit',
    body: 'You get an estimate up front, not a surprise invoice. If the job runs shorter than expected, you pay for the shorter job.',
  },
  {
    title: 'Local to the Peninsula',
    body: `Based in ${site.baseCity}, working ${areaList}. Close enough to fit you in on short notice, and close enough to care what the neighbours say.`,
  },
];

/* ─────────────────────────── BEFORE AND AFTER ───────────────────────────
 * Drop image pairs into /public/images/before-after/ and list them here.
 * Filenames are up to you; just match them below.
 * `alt` text matters for both accessibility and image search — describe the
 * room and the city where it is true.
 * The gallery section hides itself if this array is empty.
 * ──────────────────────────────────────────────────────────────────────── */

export type BeforeAfter = {
  id: string;
  title: string;
  caption: string;
  service: string;
  /** City, once it is known. Leave empty and the label is simply not shown. */
  area: string;
  /** Both halves of a pair share this. Must match the real files. */
  ratio: '4/3' | '3/4';
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

export const beforeAfters: BeforeAfter[] = [
  {
    id: 'range-hood',
    title: 'Range hood filters, in place',
    caption:
      'Grease sets hard in a hood filter and a wipe-over does nothing. These came out, went through a hot degreasing soak, and went back.',
    service: 'Deep cleaning',
    area: '',
    ratio: '4/3',
    before: '/images/before-after/range-hood-before.jpg',
    after: '/images/before-after/range-hood-after.jpg',
    beforeAlt: 'Range hood with grease-clogged brown filters before a deep clean',
    afterAlt: 'The same range hood with clean metal filters refitted after a deep clean',
  },
  {
    id: 'tile-grout',
    title: 'Grout lines on white tile',
    caption:
      'Grout stains from the edges in, so it reads as dirty long before the tile does. Scrubbed line by line rather than mopped over.',
    service: 'Deep cleaning',
    area: '',
    ratio: '4/3',
    before: '/images/before-after/tile-grout-before.jpg',
    after: '/images/before-after/tile-grout-after.jpg',
    beforeAlt: 'White tile wall with brown staining in the grout lines during cleaning',
    afterAlt: 'The same white tile with the grout lines brought back to a clean, even tone',
  },
  {
    id: 'kitchen-island',
    title: 'Kitchen island and sink',
    caption:
      'A full sink and a counter that had stopped being usable. Dishes done, everything cleared, counters and sink wiped down and dried.',
    service: 'Recurring house cleaning',
    area: '',
    ratio: '3/4',
    before: '/images/before-after/kitchen-island-before.jpg',
    after: '/images/before-after/kitchen-island-after.jpg',
    beforeAlt:
      'Kitchen island covered in dishes, utensils and clutter with a full sink, before cleaning',
    afterAlt: 'The same kitchen island cleared, with an empty, wiped-down sink after cleaning',
  },
  {
    id: 'hood-filters',
    title: 'The same filters, out of the hood',
    caption:
      'Close up, the difference is the whole argument for a deep clean. This is the part of the kitchen nobody looks at until it starts to smell.',
    service: 'Deep cleaning',
    area: '',
    ratio: '3/4',
    before: '/images/before-after/hood-filters-before.jpg',
    after: '/images/before-after/hood-filters-after.jpg',
    beforeAlt: 'Two range hood filters coated in orange-brown cooking grease before cleaning',
    afterAlt: 'The same two range hood filters back to bare metal after degreasing',
  },
  {
    id: 'vanity-sink',
    title: 'Bathroom vanity and faucet',
    caption:
      'Hard water spotting on matte black fixtures, build-up along the counter seam, and the usual debris in the basin. Descaled, not scoured.',
    service: 'Recurring house cleaning',
    area: '',
    ratio: '4/3',
    before: '/images/before-after/vanity-sink-before.jpg',
    after: '/images/before-after/vanity-sink-after.jpg',
    beforeAlt:
      'Bathroom sink with debris in the basin and water spotting on the black faucet before cleaning',
    afterAlt: 'The same bathroom sink and black faucet clean and spot-free after cleaning',
  },
  {
    id: 'hex-floor',
    title: 'Black hex tile floor',
    caption:
      'Dark matte tile shows every footprint and film mark. Washed and buffed dry so the finish comes back instead of drying streaky.',
    service: 'Deep cleaning',
    area: '',
    ratio: '3/4',
    before: '/images/before-after/hex-floor-before.jpg',
    after: '/images/before-after/hex-floor-after.jpg',
    beforeAlt: 'Black hexagon tile bathroom floor looking dull and filmy before cleaning',
    afterAlt: 'The same black hexagon tile floor washed and buffed to an even finish',
  },
];

/* ───────────────────────────── TESTIMONIALS ─────────────────────────────
 * ⚠️  INTENTIONALLY EMPTY. Do not invent reviews — fake testimonials are a
 *     real legal exposure under Canadian advertising rules and they read as
 *     fake to customers anyway.
 *
 *     Add real ones here with the client's permission, using first name and
 *     neighbourhood only. The reviews section and the Review/AggregateRating
 *     schema both stay hidden until this array has entries, so the site is
 *     launch-ready without them.
 * ──────────────────────────────────────────────────────────────────────── */

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  service?: string;
  /** 1–5. Only set this for reviews that genuinely carried a rating. */
  rating?: number;
};

export const testimonials: Testimonial[] = [];
