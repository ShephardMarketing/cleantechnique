# Images

Everything in here is a **labelled placeholder**. Each file shows its own path
and the aspect ratio it needs. Replace the file, keep the filename, and nothing
in the code has to change.

Everything here is now a **real photo of Stephanie's work**, except the one
marked below.

## Still a placeholder

| File | Ratio | What it should be |
| --- | --- | --- |
| `stephanie-wideski.jpg` | 4:5 portrait | **Her headshot.** Used on `/about` and in the Person schema. This is the only placeholder left. |

## Worth upgrading when there is a better shot

| File | Ratio | Currently | Better would be |
| --- | --- | --- | --- |
| `hero-white-rock.jpg` | 4:3 | A cleaned vanity | A wider finished room, or Stephanie at work |
| `stephanie-working.jpg` | 4:5 | A cleaned kitchen island | Stephanie actually in frame |
| `og-default.jpg` | 1200×630 | The logo on cream | Fine as is; this is what shows when the site is shared |
| `areas/*.jpg` | 4:3 | Interior work shots | Recognisable local scenes, if any exist |

## Before and after pairs

`before-after/` holds six pairs. Both halves of a pair **must be the same
aspect ratio and shot from the same spot**, or the reveal jumps as you drag.

| Pair | Ratio |
| --- | --- |
| `range-hood-before/after.jpg` | 4:3 |
| `tile-grout-before/after.jpg` | 4:3 |
| `vanity-sink-before/after.jpg` | 4:3 |
| `kitchen-island-before/after.jpg` | 3:4 |
| `hood-filters-before/after.jpg` | 3:4 |
| `hex-floor-before/after.jpg` | 3:4 |

To add, remove or re-caption pairs, edit `beforeAfters` in
`src/lib/content.ts`. Each entry declares a `ratio` — **it must match the real
pixel dimensions of both files**, or the two halves will not line up.

Two things to fill in there:

- **`area`** is empty on every pair because the city of each job was not
  recorded. Set it to `'White Rock'` or `'South Surrey'` and that pair starts
  showing on the matching area page and gains a location label.
- **`alt`** text already describes each room. If you add the city to the alt
  text too, the photos get a shot at ranking in Google Images for
  "before and after house cleaning White Rock".

A note on the kitchen island pair: the before and after were taken from
slightly different positions, so the reveal shifts a little as you drag it.
Worth reshooting from a fixed spot next time — same corner, same height.

## Service photos

`services/<service-slug>.jpg` at 16:10. The slugs come from
`src/lib/services.ts`. These are the lowest priority; the placeholders are
inoffensive enough to launch with.

## Practical notes

- Shoot or export at roughly the pixel sizes shown on the placeholders. Next.js
  resizes and serves AVIF/WebP automatically, so there is no need to optimise by
  hand — but do not upload 8MB phone originals.
- Get the homeowner's permission before publishing any photo of their house.
- `logo.png` is referenced by the business schema. The header wordmark is built
  in code (`src/components/Logo.tsx`), so a logo file is optional until there
  is a real one.
