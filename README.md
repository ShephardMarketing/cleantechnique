# The Clean Technique — website

Next.js 16 (App Router) + TypeScript + Tailwind. Built to deploy on Vercel.

House cleaning and home organization for White Rock and South Surrey, BC.
Owner-operated by Stephanie Wideski. $35–$40/hour.

---

## Before launch — the must-do list

Four of these are blockers. Nothing else stops the site going live.

| # | What | Where |
| --- | --- | --- |
| ~~1~~ | ~~Real phone number~~ — set to `(604) 499-8455` | `src/lib/site.ts` → `phone`, `phoneHref` |
| ~~2~~ | ~~Real email~~ — set to `steph211w@hotmail.com` | `src/lib/site.ts` → `email` |
| 3 | **Real domain** — drives every canonical URL and the sitemap | `src/lib/site.ts` → `url` |
| 4 | **Lead delivery** — set `RESEND_API_KEY` + `QUOTE_NOTIFY_EMAIL`, or `QUOTE_WEBHOOK_URL`, in Vercel | see `.env.example` |

> **On the email**: `steph211w@hotmail.com` is where leads should *land*, so
> that is the value for `QUOTE_NOTIFY_EMAIL`. It cannot be the *sending*
> address — Resend only sends from a domain you have verified, so
> `QUOTE_FROM_EMAIL` needs to be something like `quotes@<the real domain>` once
> the domain exists. Setting the hotmail address as the sender will make every
> notification bounce.
>
> Worth raising with Stephanie separately: a hotmail address published on the
> site works, but an address on her own domain reads as more established to
> anyone deciding whether to let her into their house.

| 5 | Stephanie's headshot — the only remaining placeholder image | `public/images/stephanie-wideski.jpg` |
| 6 | Her story, in her own words — three paragraphs | `src/app/about/page.tsx`, marked with a ⚠️ comment |
| 7 | Instagram / Facebook URLs — delete any that do not exist | `src/lib/site.ts` → `social` |
| 8 | Insurance claims removed from the site 2026-10-06 | re-add only once coverage is confirmed in writing |
| 9 | Confirm the homeowner is fine with the gallery photos being public | `src/lib/content.ts` → `beforeAfters` |

Everything above lives in **one or two files**. The business details are not
duplicated into the pages — change `src/lib/site.ts` and the whole site follows.

---

## Deploying to Vercel

```bash
git init && git add -A && git commit -m "Initial site"
gh repo create clean-technique --private --source=. --push
```

Then on vercel.com: **Add New → Project → import the repo**. Framework is
detected automatically; no build settings to change. Add the environment
variables from `.env.example`, then **Settings → Domains** to point the real
domain at it.

Local development:

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, same as Vercel runs
```

---

## Where to change things

| You want to change… | Edit this |
| --- | --- |
| Name, phone, email, domain, hours, hourly rate, social links | `src/lib/site.ts` |
| Services — add, remove, reword, change the checklists | `src/lib/services.ts` |
| Service areas, neighbourhoods, local copy | `src/lib/areas.ts` |
| FAQs, the four process steps, before/after gallery, testimonials | `src/lib/content.ts` |
| Brand colours | `tailwind.config.ts` → `sage` (eucalyptus) and `lav` (lavender) |
| Photos | `public/images/` — see the README in that folder |

**The rate appears in roughly thirty places on the site.** All of them read
`site.rate`. Change `min` and `max` in `src/lib/site.ts` and every page, meta
description and schema block updates together.

### Adding a third service area

Add an object to the `areas` array in `src/lib/areas.ts`. That alone creates
the page at `/<slug>`, adds it to the nav, the footer, the sitemap, the quote
form dropdown and the LocalBusiness schema.

Give it genuinely different copy. Two area pages that say the same thing with
the city name swapped is the textbook doorway-page pattern, and it is the
fastest way to get both of them discounted.

---

## Local SEO — what is already in place

- **Exact-match URLs**: `/house-cleaning-white-rock`, `/house-cleaning-south-surrey`
- **Per-page metadata**, with canonicals — important because paid traffic
  arrives with `gclid` and `utm` parameters that would otherwise be treated as
  separate URLs
- **Structured data**, all generated from the content files so it cannot drift:
  - `HouseCleaningService` + `LocalBusiness` sitewide, with `areaServed`,
    `geo`, `openingHours` and an offer catalogue priced per hour
  - `Service` on each service page
  - City-scoped `HouseCleaningService` on each area page, listing every
    neighbourhood as a served `Place`
  - `FAQPage` on the home, area, service, pricing and FAQ pages
  - `BreadcrumbList` with matching visible breadcrumbs
  - `ImageGallery` on the before/after page
  - `Person` for Stephanie on the About page
- **`sitemap.xml` and `robots.txt`**, generated at build
- **Neighbourhood link mesh** in the footer — the long-tail "cleaner in Ocean
  Park" searches
- **Self-hosted fonts**, so there is no render-blocking Google Fonts request
  and no third-party call to disclose in the privacy policy
- **FAQ answers in the HTML on first paint** (native `<details>`, no JS)

### What is deliberately NOT here

- **No testimonials.** `testimonials` in `src/lib/content.ts` is an empty array
  and every review component hides itself until it has entries. Inventing
  reviews is a Competition Act problem and customers spot them anyway. Add real
  ones with permission, first name and neighbourhood only — the
  `AggregateRating` schema then appears on its own.
- **No analytics or tracking.** `/privacy` states this plainly. If you add
  GA4, a Meta Pixel or a booking embed, **update that page** — PIPEDA and BC
  PIPA both expect disclosure.
- **No `AggregateRating` without reviews.** Marking up a rating you do not have
  is a manual-action risk.

### First week after launch

1. Create and verify the **Google Business Profile** — for a local service
   business it outranks anything on the site itself. Service-area business, no
   public address.
2. Submit the sitemap in **Google Search Console**.
3. Get the first handful of Google reviews, then paste the profile link into
   `site.googleReviewUrl`.
4. Keep the NAP (name, address, phone) identical across the site, the Google
   profile and every directory listing.

---

## The quote form

Three steps — what you need, about the home, how to reach you — posting to
`POST /api/quote`.

- Validation runs on the client and again on the server (`src/lib/quote.ts`,
  shared by both so they cannot disagree)
- Honeypot field plus a minimum fill time; both return `200` so bots learn
  nothing from the response
- Per-IP rate limit of 8 in 15 minutes. **Validation failures are not counted**
  — a typo should not lock someone out, and an office behind one NAT shares an
  address
- Delivery order: Resend → webhook → the Vercel function log. The form reports
  success either way, so a misconfigured env var never costs a lead

Note the rate limit is in-memory, so it resets on cold start and is not shared
between regions. It stops casual bot spam; it is not a WAF.

---

## Accessibility

Skip link, visible focus rings, labelled form controls with `aria-invalid` and
`role="alert"` on errors, keyboard-operable before/after sliders (they are real
range inputs), `prefers-reduced-motion` honoured, and semantic heading order
with exactly one `<h1>` per page.

Verified: no console errors, no failed requests and no horizontal overflow at
390px or 1440px across the home, area, service, gallery and pricing pages.
