import { site } from './site';

export type Area = {
  /** URL slug. Full path is /{slug}. Exact-match keyword URLs rank well locally. */
  slug: string;
  /** City name as a person would say it. */
  city: string;
  /** Used in sentences like "homes across {inline}". */
  inline: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Opening paragraphs. Written per city — do not share copy between areas. */
  intro: string[];
  /** Named neighbourhoods. Real local names only. */
  neighbourhoods: string[];
  /** Postal code prefixes served, for the "do you come to me" question. */
  postalCodes: string[];
  /** What is actually different about cleaning homes here. */
  localNotes: { title: string; body: string }[];
  /** Nearby places used for geo context in schema and copy. */
  landmarks: string[];
  geo: { lat: number; lng: number };
  /** Photo for this area's hero and card. */
  image: string;
  /** Drive time from Stephanie's base. */
  travelNote: string;
};

export const areas: Area[] = [
  {
    slug: 'house-cleaning-white-rock',
    city: 'White Rock',
    inline: 'White Rock',
    h1: 'House cleaning and home organization in White Rock, BC',
    metaTitle: `House Cleaning White Rock, BC | ${site.name}`,
    metaDescription: `House cleaning, organizing and in-home help in White Rock, BC. Owned and operated, ${site.rate.rangePerHour}. Call ${site.phone} for a quote.`,
    intro: [
      'The Clean Technique is based in White Rock and most of the week is spent inside a ten-minute drive of the pier. Stephanie Wideski owns and operates it, so the person who quotes your home is the person accountable for how it is left.',
      'White Rock homes have their own quirks. Salt air off Semiahmoo Bay coats the windows on the beach side. Hard water leaves a film on every glass shower door uptown. The older character homes above Marine Drive have original trim and single-pane windows that need a gentler hand than a new build. All of that gets factored into the hour estimate before you commit to anything.',
    ],
    neighbourhoods: [
      'East Beach',
      'West Beach',
      'Marine Drive waterfront',
      'Five Corners',
      'Uptown White Rock',
      'Hillside',
      'Centennial Park',
      'Semiahmoo',
      'Bakerview',
      'Peace Arch Park area',
    ],
    postalCodes: ['V4B'],
    localNotes: [
      {
        title: 'Salt air on the beach side',
        body: 'Homes below the tracks get a haze on the windows and a fine grit on the sills that builds up faster than it does inland. Exterior-facing glass and tracks go on the regular checklist for East and West Beach clients, not just the deep cleans.',
      },
      {
        title: 'Hard water on glass and tile',
        body: 'Shower doors and chrome across White Rock scale up quickly. Stephanie uses a descaler and a long dwell time rather than scrubbing harder, which gets the film off without scratching the glass.',
      },
      {
        title: 'Character homes and steep lots',
        body: 'A lot of the housing stock above Marine Drive is pre-1980 with original woodwork, painted trim and narrow stairs. Older finishes get pH-neutral products and hand washing. Steep driveways and street parking are factored into the time, not billed as a surprise.',
      },
      {
        title: 'Condos and lock-off suites',
        body: 'Marine Drive and uptown towers have their own rules about elevators, loading bays and fob access. Tell Stephanie the building and she sorts the logistics with the concierge before the first visit.',
      },
    ],
    landmarks: ['White Rock Pier', 'Marine Drive', 'Semiahmoo Bay', 'Five Corners', 'Peace Arch Park'],
    geo: { lat: 49.0253, lng: -122.8029 },
    image: '/images/areas/white-rock.jpg',
    travelNote: 'No travel charge anywhere in White Rock.',
  },
  {
    slug: 'house-cleaning-south-surrey',
    city: 'South Surrey',
    inline: 'South Surrey',
    h1: 'House cleaning and home organization in South Surrey, BC',
    metaTitle: `House Cleaning South Surrey, BC | ${site.name}`,
    metaDescription: `House cleaning and home organization across South Surrey — Ocean Park, Morgan Creek, Grandview Heights and Crescent Beach. ${site.rate.rangePerHour}.`,
    intro: [
      'South Surrey covers a lot of ground and a lot of very different houses. A 1950s cottage in Crescent Beach, a four-thousand-square-foot build in Morgan Creek and a brand-new townhouse off 24th Avenue are three separate jobs, and quoting them the same way is how cleaners end up underwater on a Friday afternoon.',
      'Stephanie Wideski quotes each home on what is actually in it. She is based in White Rock, which puts every South Surrey neighbourhood within a short drive, and she runs the work herself rather than handing it to whoever is on a dispatch list.',
    ],
    neighbourhoods: [
      'Ocean Park',
      'Crescent Beach',
      'Elgin Chantrell',
      'Morgan Creek',
      'Grandview Heights',
      'Rosemary Heights',
      'Sunnyside Park',
      'Hazelmere',
      'Pacific Douglas',
      'King George Corridor',
      'Douglas',
      'Redwood Park',
    ],
    postalCodes: ['V3Z', 'V4A', 'V4P'],
    localNotes: [
      {
        title: 'Large homes need an honest hour count',
        body: 'Morgan Creek and Elgin Chantrell houses often run 3,500 square feet and up, with three or four bathrooms. Stephanie walks the house before quoting so the estimate matches the square footage instead of a flat guess that falls apart on visit two.',
      },
      {
        title: 'New construction in Grandview Heights',
        body: 'Grandview is still filling in, and new builds hand over with drywall dust in the vents and film on the windows. A post-renovation clean before move-in costs less than discovering it after the furniture is in.',
      },
      {
        title: 'Crescent Beach damp and sand',
        body: 'Cottages near the water deal with damp, sand tracked through entryways and mildew in bathrooms with poor ventilation. Entry mats, grout and exhaust fans get extra attention down there.',
      },
      {
        title: 'Townhouse complexes and strata rules',
        body: 'Rosemary Heights and the 24th Avenue corridor are heavy on townhouse strata. Visitor parking and garage access vary by complex, so those details get sorted in advance rather than eating into your booked hours.',
      },
    ],
    landmarks: [
      'Crescent Beach',
      'Morgan Crossing',
      'Grandview Corners',
      'Elgin Heritage Park',
      'Southridge',
    ],
    geo: { lat: 49.045, lng: -122.8569 },
    image: '/images/before-after/range-hood-after.jpg',
    travelNote: 'No travel charge anywhere in South Surrey.',
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
export const areaSlugs = areas.map((a) => a.slug);

/** Every neighbourhood across every area, for the footer link mesh. */
export const allNeighbourhoods = areas.flatMap((a) =>
  a.neighbourhoods.map((n) => ({ name: n, city: a.city, slug: a.slug })),
);

/** Plain-language list of cities, e.g. "White Rock and South Surrey". */
export const areaList = areas.map((a) => a.city).join(' and ');
