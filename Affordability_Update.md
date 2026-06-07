# Toronto Affordability — Update Log

## 2026-06-07 — New "Neighbourhoods" history section (original editorial content)

Added a blog-style **Neighbourhoods** section to deepen original, high-value content for the
AdSense review. Each post pairs a short, **original** history of an area on the affordability
map with its present-day numbers ("Old Toronto, new prices"). Inspired by — but not copied
from — the *Old Toronto Series* YouTube channel, which is credited on the hub.

**New pages** (clean URLs, shared `styles.css` + `site.js`, full SEO head + Article/Breadcrumb
JSON-LD, dark-mode + marquee + scroll-reveal):
- `/neighbourhoods/` — hub: intro, a table linking each post with its avg condo price +
  qualifying income, an "Inspired by Old Toronto Series" credit, and a "905 coming next" note.
- `/neighbourhoods/downtown-toronto/` — Town of York → financial/condo core; ~$825K condo / ~$178K income.
- `/neighbourhoods/north-york/` — farm township → Yonge "downtown uptown"; ~$712K / ~$152K.
- `/neighbourhoods/etobicoke/` — lakeshore villages + Humber industry; ~$695K / ~$148K.
- `/neighbourhoods/scarborough/` — Bluffs + postwar boom, most attainable 416; ~$621K / ~$131K.
- Per-area figures are pulled verbatim from the home page `REGIONS` data so they match the map.

**Wiring**
- Added a **Neighbourhoods** link to the hero `site-nav` and footer `foot-nav` on the homepage
  and all 7 existing content pages.
- Added a static "The Story Behind Each Area" links row on the homepage, directly under the
  region map (plain anchors — no map JS touched).
- Added the 5 new URLs to `sitemap.xml`.

**Out of scope (follow-up):** the 6 suburban 905 posts (Mississauga, Brampton, Vaughan,
Markham, Oakville, Pickering) using the same template.

## 2026-06-07 — Restore original branding across the whole site

Adopted the original archived design (`Archive/Original HTML On Site.html`) sitewide: white/teal
theme, Manrope + Inter + DM Mono, pill buttons, editorial black hero, and the "changing graphics"
(animated hero, marquee, scroll reveals).

**Homepage (`index.html`)** — now the restored archive (self-contained), with merges:
- Kept all original tools + the **MapLibre interactive map**, Chart.js, animated hero (word fade-up +
  5-font "Toronto" cycle), marquee, animated house-fill.
- Merged SEO head (title/description/canonical/robots/OG/theme-color), kept FAQ+Article schema,
  added Organization schema, removed the duplicate adsense meta, added favicon links.
- Fixed hero image path `New Material/Toronto.jpg` → `Toronto.jpg`.
- Unified theme to `localStorage['ta-theme']` + pre-paint FOUC script (persists across pages).
- Added hero `site-nav` + a footer nav linking all content pages; methodology CTA → `/methodology`.
- NOTE: `2026-04-26-index-v2.html` (the old cream/teal homepage) is now superseded/stale and
  unlinked — safe to delete or move into `Archive/`.

**`styles.css`** — rewritten for the original branding (content pages): tokens, Manrope/Inter/DM Mono,
editorial black hero (`header.site`), `site-nav`, breadcrumb, marquee, fade-up + scroll-reveal,
pill/tab styles, and article/tldr/callout/data-card/worked/related styling.

**`site.js`** (new, shared by content pages) — theme toggle (localStorage) + scroll-reveal observer
over `.article > *`.

**7 content pages** — hero wrapped in animated `.hero-inner` + marquee strip; inline theme script
replaced with `../site.js`. Written content unchanged.

**Verified** — all 8 pages + styles.css/site.js/favicons/Toronto.jpg/ads.txt/sitemap return 200;
homepage has single adsense meta, MapLibre, merged canonical/title, hero+footer nav; content pages
load shared CSS/JS, hero-inner + marquee, no leftover inline theme script.

## 2026-06-07 — Styling/theme rendering fix

Problem: new pages (and the homepage) looked unstyled when opened by double-click. Cause:
root-relative asset paths (`href="/styles.css"`, `/favicon.*`) don't resolve over `file://`, and
the design's `DM Mono` / `DM Sans` fonts were referenced but never loaded.

**Fixed**
- Asset links changed to document-relative: root pages use `styles.css` / `favicon.*`; subpages use
  `../styles.css` / `../favicon.*`. Now styling/theme render on local double-click AND when served.
- `styles.css` now `@import`s DM Mono + DM Sans (Google Fonts), so stats/tables/inputs get the
  intended polish instead of system-font fallback.
- Re-synced `index.html` to match `2026-04-26-index-v2.html` (verified identical).
- Verified: all 8 pages + `styles.css` return 200 over a local server; subpage `../styles.css`
  resolves to root; no root-relative asset links remain.
- Nav links kept as clean `/about` URLs (correct for GitHub Pages; preview full nav via a local server).

## 2026-06-07 — AdSense content build (multi-page expansion)

Goal: address the Google AdSense rejection for "insufficient original content" by turning the
single-page calculator into a small, navigable content site, without changing any of the tools.

**Added**
- `styles.css` — shared design system extracted from the homepage's inline `<style>` (light/dark,
  components, map, responsive). All pages now link it. Added content-page styles (article, site-nav,
  breadcrumb, callout, tldr, data-card, worked-example, related links).
- New pages (each `<page>/index.html`, clean URLs, native styling, dark-mode aware):
  - `/privacy` — AdSense-required privacy policy (advertising cookies + opt-outs; client-side calc note).
  - `/terms` — terms of use (informational only / not advice; Ontario governing law).
  - `/about` — who/why; establishes authorship (Eric Liu) and independence.
  - `/contact` — real email (eric.l12345@gmail.com).
  - `/methodology` — full documentation of every formula + data source, worked $800K example, limitations.
  - `/income-percentile-to-afford-toronto` — original analysis: condo ≈ $147K / house ≈ $254K mapped to
    StatCan income percentiles by age (condo ≈ 95th pct for 25–34; house ≈ 99th).
  - `/mortgage-stress-test-guide` — OSFI B-20 explained with worked examples at 4.0% / 5.49% / 6.5%.
- Root files: `ads.txt`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `favicon.ico`, `CNAME`.
- `index.html` — copy of the homepage so GitHub Pages serves it at `/` (see note below).

**Changed**
- `2026-04-26-index-v2.html` — inline `<style>` replaced with `<link href="/styles.css">` + favicon links;
  added hero `site-nav` and expanded footer nav. No calculator markup/JS touched.

**Verified**
- Local server: all 8 pages + 6 assets return HTTP 200; clean URLs resolve; homepage calculators
  (DATA, HOUSING, Chart.js, stress test) and theme toggle intact; no leftover inline CSS; no broken links.

**Deploy note**
- GitHub Pages serves `index.html` at `/`. `index.html` is currently a copy of `2026-04-26-index-v2.html`.
  Going forward, edit `index.html` (or re-copy from the dated source on each release) so the two don't drift.
