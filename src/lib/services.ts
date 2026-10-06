import { site } from './site';

export type Service = {
  slug: string;
  /** Short label for nav and cards. */
  name: string;
  /** Used inside sentences: "book a {inline}". */
  inline: string;
  /** Meta description, 150–160 chars. */
  metaDescription: string;
  /** Card blurb, one sentence. */
  blurb: string;
  /** Opening paragraphs on the service page. */
  intro: string[];
  /** Checklist of what the service covers. */
  includes: { group: string; items: string[] }[];
  /** Who it suits. */
  bestFor: string[];
  /** Typical visit length. */
  typicalVisit: string;
  /** Pricing note specific to this service. */
  priceNote: string;
  /** Simple line icon key, see components/ServiceIcon.tsx */
  icon: 'spray' | 'sparkle' | 'boxes' | 'shelf' | 'hardhat' | 'key' | 'concierge';
  /** Photo for this service page. Reuses gallery shots rather than duplicating
   *  files; point it anywhere under /public/images when better ones exist. */
  image: string;
  imageAlt: string;
  /** Service-specific FAQs, merged with the global set on the page. */
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'recurring-house-cleaning',
    name: 'Recurring house cleaning',
    inline: 'recurring clean',
    metaDescription: `Weekly, biweekly or monthly house cleaning in White Rock and South Surrey. Owned and operated, $${site.rate.regular} an hour. Call ${site.phone} for a quote.`,
    blurb:
      'Weekly, biweekly or monthly visits working from a checklist you help build, so the same rooms get the same attention every time.',
    intro: [
      'Most clients start here. You pick the day and how often you want someone in the house, and Stephanie works through the same room-by-room list every visit so nothing gets skipped on a busy week.',
      'The checklist is the point. It carries over from visit to visit, so nobody has to be told twice which cupboard the vacuum lives in, that the guest room only needs doing once a month, or which product you would rather was not used near the dog.',
    ],
    includes: [
      {
        group: 'Kitchen',
        items: [
          'Counters and backsplash wiped down and dried',
          'Top of the stove degreased',
          'Sink scrubbed out',
          'Floors vacuumed and washed',
        ],
      },
      {
        group: 'Bathrooms — the full detail',
        items: [
          'Toilets, tubs, showers and glass descaled',
          'Mirrors and chrome polished streak-free',
          'Vanities cleared, wiped and reset',
          'Floors washed, including behind the toilet',
        ],
      },
      {
        group: 'Through the rest of the house',
        items: [
          'Carpets vacuumed, hard floors washed',
          'Countertops and reachable surfaces wiped',
          'A written note on anything that needs your attention',
        ],
      },
    ],
    bestFor: [
      'Working households that want the place consistently handled',
      'Families where cleaning has become a standing argument',
      'Anyone who would rather spend Saturday at the beach than on the bathroom floor',
    ],
    typicalVisit: '3–5 hours for a three-bedroom home, less once the first visit has caught everything up',
    priceNote:
      'Billed at $37 an hour. Extras like laundry, windows, the fridge or the walls are flat fees on top of the hours — the full list is on the pricing page. Recurring clients get first choice of time slots and tend to need fewer hours after the first couple of visits.',
    icon: 'spray',
    image: '/images/before-after/kitchen-island-after.jpg',
    imageAlt: 'A kitchen island and sink left clear and wiped down at the end of a regular visit',
    faqs: [
      {
        q: 'Do I need to be home during the clean?',
        a: 'Most clients are not. Plenty leave a key, a lockbox code or a garage code. Whatever you prefer, we agree on it in writing before the first visit.',
      },
      {
        q: 'Can I change how often you come?',
        a: 'Yes. Clients move between weekly and biweekly all the time, usually around holidays or when the kids are home. Just give a few days notice.',
      },
    ],
  },
  {
    slug: 'deep-cleaning',
    name: 'Deep cleaning',
    inline: 'deep clean',
    metaDescription: `Deep cleaning in White Rock and South Surrey — inside appliances, grout, baseboards and the spots a regular clean misses. ${site.rate.rangePerHour}.`,
    blurb:
      'A top-to-bottom reset that gets inside the oven and fridge, into the grout, and behind the furniture.',
    intro: [
      'A deep clean goes after the build-up a weekly tidy never touches. Inside the oven and fridge, the grout lines, the top of the kitchen cabinets, the baseboards, the inside of the window tracks, behind and under what can be safely moved.',
      'It is the usual first visit for a new client, and a lot of people book one on its own twice a year — once before guests arrive in summer, once in the grey stretch after the holidays.',
    ],
    includes: [
      {
        group: 'Kitchen',
        items: [
          'Inside the oven, racks degreased',
          'Inside the fridge and freezer, shelves out and washed',
          'Range hood filter and exhaust grille',
          'Cabinet tops, interiors on request, and under the toe-kick',
        ],
      },
      {
        group: 'Bathrooms',
        items: [
          'Grout and silicone scrubbed, hard water and soap scum lifted',
          'Shower heads and taps descaled',
          'Exhaust fan covers removed and washed',
          'Behind and under the toilet base',
        ],
      },
      {
        group: 'Everywhere else',
        items: [
          'Baseboards, door frames and trim washed by hand',
          'Light fixtures, fan blades and vent covers',
          'Interior windows, sills and tracks',
          'Behind and under furniture that moves safely',
          'Switch plates, handles, banisters and radiators',
        ],
      },
    ],
    bestFor: [
      'A first visit before starting a regular schedule',
      'A spring or pre-holiday reset',
      'Homes that have gone a while without help',
    ],
    typicalVisit: '6–9 hours for a three-bedroom home, often split across two days',
    priceNote:
      'Billed at $40 an hour. Stephanie walks the house or reviews your photos first and gives you an hour range before anyone starts, so there are no surprises.',
    icon: 'sparkle',
    image: '/images/before-after/range-hood-after.jpg',
    imageAlt: 'A range hood with freshly degreased filters after a deep clean',
    faqs: [
      {
        q: 'How is this different from a regular clean?',
        a: 'A regular clean maintains. A deep clean catches up. It covers everything the recurring checklist does plus inside appliances, grout, trim, fixtures and the areas behind furniture.',
      },
      {
        q: 'Will a deep clean get rid of hard water stains?',
        a: 'Usually most of them. Glass shower doors on the Peninsula take a beating from hard water, and a long soak with the right descaler lifts a lot of it. Etched glass is permanent, and Stephanie will tell you straight if that is what you are looking at.',
      },
    ],
  },
  {
    slug: 'move-in-move-out-cleaning',
    name: 'Move-in and move-out cleaning',
    inline: 'move-out clean',
    metaDescription: `Move-in and move-out cleaning in White Rock and South Surrey. Empty-home deep clean for possession day or your damage deposit. ${site.rate.rangePerHour}.`,
    blurb:
      'Empty-house cleaning for possession day — inside every cupboard, closet and appliance, nothing left behind.',
    intro: [
      'Moving is the one time a house is completely empty, which is the only time some of it can properly be cleaned. Inside every drawer and closet, the back of the cupboards, the floor under where the fridge stood.',
      'Sellers and renters book this to protect a deposit or hand over cleanly. Buyers book it for the day before the truck arrives, because nobody wants to unpack into someone else’s dust.',
    ],
    includes: [
      {
        group: 'Kitchen',
        items: [
          'Every cabinet and drawer washed inside and out',
          'Inside the oven, fridge, freezer, dishwasher and microwave',
          'Under and behind appliances where they pull out',
          'Sink, taps and garburator flange descaled',
        ],
      },
      {
        group: 'Bathrooms',
        items: [
          'Full descale of tubs, showers, glass and tile',
          'Vanities and medicine cabinets cleaned inside',
          'Exhaust fans, mirrors and fixtures',
          'Floors washed to the edges and corners',
        ],
      },
      {
        group: 'Whole house',
        items: [
          'All closets and storage wiped inside, shelves and rods included',
          'Baseboards, trim, doors and door frames',
          'Interior windows, sills, tracks and blinds',
          'Light fixtures, switch plates, vents and thermostat',
          'Floors vacuumed and washed throughout, garage swept on request',
        ],
      },
    ],
    bestFor: [
      'Renters who want the damage deposit back in full',
      'Sellers with a possession date and a clean-condition clause',
      'Buyers who want the place done before the furniture lands',
    ],
    typicalVisit: '5–10 hours depending on size and what the last occupant left behind',
    priceNote:
      'Billed at $50 an hour. Send photos or the listing and Stephanie will give you an hour range. Book early in the month — possession dates cluster and the calendar fills.',
    icon: 'boxes',
    image: '/images/before-after/vanity-sink-after.jpg',
    imageAlt: 'A bathroom vanity and sink left spotless for a possession date',
    faqs: [
      {
        q: 'Can you clean around the movers?',
        a: 'It works better after the truck has gone, because floors and baseboards cannot be done twice. If the timing is tight, Stephanie can do kitchen and bathrooms while the last rooms are being emptied.',
      },
      {
        q: 'Do you handle carpet cleaning?',
        a: 'Carpets are vacuumed thoroughly but not steam cleaned. If your lease requires professional carpet cleaning, Stephanie can point you to someone local who does it.',
      },
    ],
  },
  {
    slug: 'home-organization',
    name: 'Home organization',
    inline: 'organizing session',
    metaDescription: `Home organization in White Rock and South Surrey — closets, kitchens, pantries and garages sorted into systems that hold. ${site.rate.rangePerHour}.`,
    blurb:
      'Closets, pantries, garages and paperwork sorted into a system that still works three months later.',
    intro: [
      'Cleaning and organizing are two different jobs. A clean kitchen with eleven half-empty spice jars in three cupboards is still going to annoy you every morning.',
      'Organizing sessions work space by space. Everything comes out, gets sorted into keep, donate and bin, and goes back in a layout that matches how you actually use the room. Stephanie does the work with you, not at you, because you are the one who has to live in the system afterwards.',
    ],
    includes: [
      {
        group: 'Spaces she works on most',
        items: [
          'Kitchens and pantries, including expiry sweeps',
          'Bedroom closets and dressers, seasonal rotation',
          'Entryways, mudrooms and coat storage',
          'Bathrooms, linens and medicine cabinets',
          'Garages, storage rooms and that one hall cupboard',
          'Paperwork, filing and the kitchen drawer of mystery cables',
        ],
      },
      {
        group: 'How a session runs',
        items: [
          'Short walkthrough and a plan for the time booked',
          'Everything out, sorted, and measured before anything goes back',
          'Like with like, daily items at eye level, rarely used up high',
          'Donations bagged and loaded, recycling and e-waste separated',
          'Labels where labels help, skipped where they do not',
        ],
      },
    ],
    bestFor: [
      'A room that has quietly become a dumping ground',
      'Downsizing, or clearing a parent’s house',
      'New babies, new roommates, or a kitchen that no longer fits the family',
    ],
    typicalVisit: '4–6 hours for a pantry or closet, a full day or two for a garage',
    priceNote:
      'Billed at $50 an hour. Bins and baskets are not included — Stephanie measures first and sends you a short shopping list, or picks them up for you at cost.',
    icon: 'shelf',
    image: '/images/before-after/kitchen-island-after.jpg',
    imageAlt: 'A cleared kitchen counter after an organizing session',
    faqs: [
      {
        q: 'Do I have to throw things out?',
        a: 'No. Nothing leaves the house without you saying so. Stephanie will ask questions about items you have not used in years, but the decision is always yours.',
      },
      {
        q: 'Do you take the donations away?',
        a: 'Yes, up to a carload per session, dropped at a local donation centre on the way home. Anything larger needs a pickup booked, and she can help arrange it.',
      },
    ],
  },
  {
    slug: 'post-renovation-cleaning',
    name: 'Post-renovation cleaning',
    inline: 'post-reno clean',
    metaDescription: `Post-renovation and construction cleaning in White Rock and South Surrey. Drywall dust, adhesive residue and paint spatter removed. ${site.rate.rangePerHour}.`,
    blurb:
      'Construction dust is a different problem than household dust. This is the clean that actually ends a renovation.',
    intro: [
      'Drywall dust gets into everything and comes back twice after a normal clean, because the first pass just moves it around. It needs a HEPA vacuum, repeated passes, and someone willing to do the room three times.',
      'This is the clean that comes after the trades are finished and before you put the furniture back. Adhesive residue off new floors, paint spatter off hardware, stickers off appliances and window glass, dust out of every vent and track.',
    ],
    includes: [
      {
        group: 'Dust removal',
        items: [
          'HEPA vacuum on all surfaces, walls, ceilings and vents',
          'Repeat passes on horizontal surfaces as dust settles',
          'Inside new cabinets, closets and drawers',
          'Heat registers, cold air returns and light fixtures',
        ],
      },
      {
        group: 'Residue and finishing',
        items: [
          'Adhesive, caulk and grout haze off new tile and floors',
          'Paint spatter off hardware, glass, outlets and trim',
          'Manufacturer stickers and film off appliances, windows and fixtures',
          'Final wash of floors, trim and glass once the dust has stopped',
        ],
      },
    ],
    bestFor: [
      'Kitchen and bathroom renovations',
      'New builds before handover',
      'Flooring, painting or drywall work that spread further than planned',
    ],
    typicalVisit: '6–12 hours, and often two visits a few days apart so settling dust gets caught',
    priceNote:
      'Billed at $50 an hour. Heavy debris and anything needing a bin or a trades licence is not included. Stephanie will tell you before booking if your site needs that first.',
    icon: 'hardhat',
    image: '/images/before-after/tile-grout-after.jpg',
    imageAlt: 'White tile with the grout lines brought back to an even tone',
    faqs: [
      {
        q: 'Why does drywall dust need two visits?',
        a: 'Because it hangs in the air for days. Clean once and a fine layer reappears by the weekend. A second pass a few days later is what makes it stop.',
      },
      {
        q: 'Can you come while the trades are still working?',
        a: 'It is not worth your money. Wait until the last tool is out, otherwise you pay to clean the same room twice.',
      },
    ],
  },
  {
    slug: 'rental-turnover-cleaning',
    name: 'Airbnb and rental turnovers',
    inline: 'turnover clean',
    metaDescription: `Airbnb and short-term rental turnover cleaning in White Rock and South Surrey. Same-day changeovers, linens and restocking. ${site.rate.rangePerHour}.`,
    blurb:
      'Same-day changeovers with linens, restocking and a photo check so the next guest walks into a five-star review.',
    intro: [
      'Short-term rentals live or die on the cleanliness line in the review. A turnover is a tight window with a fixed checklist, and it has to be right the first time because there is no second chance before check-in.',
      'Stephanie handles changeovers across White Rock and South Surrey — beach-side suites, laneway homes, basement units. Linens stripped and remade, consumables restocked, and photos sent so you know the place is guest-ready without driving over.',
    ],
    includes: [
      {
        group: 'Every turnover',
        items: [
          'Beds stripped and remade with fresh linens',
          'Bathrooms reset, towels swapped, amenities restocked',
          'Kitchen cleaned out, dishes done, fridge emptied',
          'Floors vacuumed and washed, garbage and recycling out',
          'Photo set sent on completion',
        ],
      },
      {
        group: 'On request',
        items: [
          'Consumables restocked from your supply or purchased at cost',
          'Damage and left-behind items reported with photos',
          'Laundry handled on site or sent out',
          'Welcome notes, guest books and staging reset',
        ],
      },
    ],
    bestFor: [
      'Hosts managing one or two units remotely',
      'Owners tired of a rotating cast of unreliable cleaners',
      'Peak-season weekends with back-to-back bookings',
    ],
    typicalVisit: '2–4 hours per unit, scheduled inside your checkout-to-checkin window',
    priceNote:
      'Billed at $50 an hour. Regular hosts get a standing slot on the calendar, which is what makes same-day changeovers possible in July.',
    icon: 'key',
    image: '/images/before-after/hex-floor-after.jpg',
    imageAlt: 'A tiled floor washed and buffed between guests',
    faqs: [
      {
        q: 'Can you guarantee a same-day turnover?',
        a: 'For hosts on a standing schedule, yes. One-off requests depend on what is already booked that day, so the more notice the better.',
      },
      {
        q: 'Do you supply linens?',
        a: 'Most hosts keep two or three sets on site and Stephanie rotates them. If you would rather not manage that, she can arrange a linen service.',
      },
    ],
  },
  {
    slug: 'custom-and-monthly-help',
    name: 'Custom and monthly help',
    inline: 'custom visit',
    metaDescription: `Standing monthly help inside the home across White Rock and South Surrey — cleaning, laundry, dishes, organizing and the jobs nobody gets to. ${site.rate.rangePerHour}.`,
    blurb:
      'A standing arrangement for whatever the house needs that month, rather than a fixed list of rooms.',
    intro: [
      'Not every household wants a cleaning service. Some want one person who handles the inside of the house, decides what needs doing that month, and gets on with it.',
      'That is what this is. Cleaning, laundry, the dishes, the linen cupboard, the fridge nobody has emptied since spring, waiting in for a delivery, resetting the place before family arrive. Closer to a concierge for the inside of your home than a cleaner on a rota — and it suits people whose problem is time rather than dirt.',
      'It works the same way as everything else. You get an hour range in writing before the month starts, and you are told what got done and what is worth doing next time.',
    ],
    includes: [
      {
        group: 'The usual run',
        items: [
          'Cleaning to your checklist, as often as you want it',
          'Laundry washed, dried, folded and put away',
          'Dishes done and the kitchen reset',
          'Beds stripped and remade, linens rotated',
        ],
      },
      {
        group: 'The jobs that never get done',
        items: [
          'Fridge, pantry and freezer emptied, wiped and restocked',
          'Linen and towel cupboards sorted and refolded',
          'Seasonal wardrobe changeovers',
          'Cupboards, drawers and the spare room reset before guests',
        ],
      },
      {
        group: 'Around the house',
        items: [
          'Waiting in for a delivery or a tradesperson',
          'Returns packed and dropped off',
          'Plants watered and bins out while you are away',
          'A written note each month on what was done and what is next',
        ],
      },
    ],
    bestFor: [
      'Households where the problem is time rather than mess',
      'Anyone running two homes, or away often enough that things slip',
      'People who would rather hand over the whole inside of the house than manage a list',
    ],
    typicalVisit: 'Usually a half or full day a month, set against an agreed hour range',
    priceNote:
      'Billed at $50 an hour. You agree the hours for the month up front, and unused hours are not charged for. Flat-fee extras like laundry or the fridge can be folded in — see the pricing page.',
    icon: 'concierge',
    image: '/images/before-after/vanity-sink-after.jpg',
    imageAlt: 'A bathroom vanity left clean and reset during a standing monthly visit',
    faqs: [
      {
        q: 'How is this different from a recurring clean?',
        a: 'A recurring clean works through the same rooms every visit. This is broader and changes month to month — one month it is the fridge and the linen cupboard, the next it is a wardrobe changeover and waiting in for a delivery. If what you want is the same rooms done on a schedule, the recurring clean is cheaper and simpler.',
      },
      {
        q: 'Can I change what is included?',
        a: 'That is the point of it. Tell her at the start of the month what matters, and if something comes up mid-month, ask. Anything outside what she does, she will say so rather than take it on badly.',
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceSlugs = services.map((s) => s.slug);
