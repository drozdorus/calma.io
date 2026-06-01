# Calma.io — Website Overview

Corporate / presentation site for Calma. This is a company presentation, **not** a
client-acquisition funnel — there is a contact form, but no hard-sell CTAs.

## Company

- **Name**: Calma
- **Domain**: calma.io
- **Tagline**: "Keep calm, Calma generates leads"
- **Pitch**: Performance lead generation across insurance, financial, legal, and home services verticals.
- **Industry**: Performance lead generation
- **Team**: ~10 members
- **Target market**: US (primary)
- **Contact**: info@calma.io · [LinkedIn](https://www.linkedin.com/company/calma-io/)
- **Careers**: Managed in Notion — [Open Vacancies](https://calma-io.notion.site/Open-Vacancies-Calma-Agency-169f120c65df806bba68fc5163bcfa52)

> **Positioning note:** we no longer frame the brand around "regulated verticals."
> The portfolio includes home services (home improvement), which isn't regulated.
> Compliance is still a genuine value prop for insurance/financial, but it's one
> claim — not the headline framing. Keep copy vertical-agnostic.

---

## Tech Stack

- **Astro 6** — static output (migrated from plain HTML/CSS/JS on 2026-05-31; see Roadmap).
- **Build step**: `astro build` → `dist/`. Source is the same vanilla CSS/JS, now
  componentized (single-source Header/Footer/Layout) + a blog content collection.
- **Hosting**: GitHub Pages, **source = GitHub Actions** (`.github/workflows/deploy.yml`
  builds on push to `main` and deploys `dist/`). `CNAME`/`.nojekyll`/`robots.txt` live
  in `public/`. Repo-level Actions had to be enabled for this (was branch-deploy before).
- **Form backend**: Formspree (`https://formspree.io/f/xzzgddjo`)
- **Fonts**: Geologica (local TTF in `public/fonts/`, 9 weights) — primary. `@font-face`
  uses absolute `/fonts/...` paths (relative would 404 once CSS is bundled).
- **No analytics** currently in the source

### Files

| Path | Scope |
|------|-------|
| `src/layouts/BaseLayout.astro` | `<head>` (meta/OG/JSON-LD via props/slots), global CSS+JS includes |
| `src/components/Header.astro` / `Footer.astro` | **Single source of truth.** `home` prop → bare `#anchor` on homepage, absolute `/#anchor` elsewhere |
| `src/pages/index.astro` | Homepage (all 9 sections, wave canvas, JSON-LD `@graph`) |
| `src/pages/blog/[...slug].astro` | Article template (breadcrumb, prose, related, FAQ, JSON-LD from frontmatter) |
| `src/pages/privacy.astro` | Privacy Policy |
| `src/content/blog/<slug>.md` | Articles (3) — Markdown + frontmatter; a new article = one `.md` |
| `src/content.config.ts` | `blog` collection schema (+ `verticals` stub for phase 2) |
| `src/styles/*.css` | `style.css` (global+FAQ+footer), `blog.css`, `team.css` — gated per-page |
| `src/scripts/*.js` | `script.js` (wave canvas, island header, scroll-spy, drag scrollers, FAQ, form), `team.js` |
| `public/` | `img/`, `fonts/`, `CNAME`, `.nojekyll`, `robots.txt`, favicons |
| `astro.config.mjs` | `site`, `trailingSlash:'always'`, `build.format:'directory'`, sitemap, `markdown.processor` (smartypants off for verbatim quotes) |

---

## Site Structure

Single-page homepage with anchor nav + separate article pages.

| # | Section | Anchor | In nav? |
|---|---------|--------|---------|
| 1 | Hero | `#top` | — (logo) |
| 2 | About | `#about` | — |
| 3 | Team | `#team` | ✓ Team |
| 4 | Verticals ("What We Do") | `#verticals` | ✓ Verticals |
| 5 | Blog | `#blog` | ✓ Blog |
| 6 | Events ("Industry Events") | `#conferences` | ✓ Events |
| 7 | FAQ | `#faq` | — |
| 8 | Contact ("Get In Touch") | `#contact` | ✓ Contact |
| 9 | Footer | — | — |

Header also has a **Hiring** pill (→ Notion vacancies). Nav highlights the active
section on scroll; a thin gradient scroll-progress bar sits at the top of every page.

### Verticals (6)

Auto Insurance · Home Insurance · Health Insurance · Legal Services · Home Improvement (home services) · Financial Services

### Acquisition channels

Meta · Google Ads · TikTok Ads

### Methodology (3 pillars)

Audience Intelligence · Automated Optimization · Lead Verification

---

## Blog

- Section on the homepage (`#blog`) is a teaser grid of `.article-card`s.
- Articles live at `/blog/<slug>/`. Currently 3 (auto-insurance market, Meta auto
  ads, NY AI advertising law).
- Renamed from `/cases/` → `/blog/` (2026-05-31); the old `/cases/` redirect stubs
  were dropped. Sitemap is auto-generated (`/sitemap-index.xml`) by `@astrojs/sitemap`.
- Breadcrumb on articles: `calma.io / Blog / <title>`.

---

## Design System

- **Theme**: dark only. Background `#0a0a0a`.
- **Accents**: `--primary` gold `#E8B547`, `--secondary` mint `#3DD68C` (desaturated
  in the April 2026 refresh, were `#FFD700` / `#00FF7F`).
- **Text**: white with opacity tokens — `--text` / `--text-secondary` (.7) / `--text-muted` (.5).
- **Layout**: `.container` max-width **1000px**. Island header narrows to 860px on scroll.
- **Tokens**: spacing (`--space-xs…2xl`), radius (`--radius-sm…xl`), glass surface
  (`--glass-bg`, `--glass-shadow`, hover variants), borders, eases. Use these — avoid
  hardcoded values.
- **Cards**: one glass-card language (services, methodology, traffic, conference, blog
  cards) — glass bg, `translateY(-2px)` hover, `--border-hover`.
- **Gradient text**: hero title only (brand signature). Section titles are solid white.

### Key interactions

- Canvas wave animation (multi-layer sine, color-shifting, scroll-fade)
- Island header (full-width → floating pill on scroll)
- Smooth-scroll anchors (80px offset) + active-nav spy + top scroll-progress bar
- Drag-to-scroll horizontal scrollers (events, team) via `initHScroller`
- **FAQ**: one control site-wide (`.faq-list`) — native `<details>` markup with a
  JS height-slide (Web Animations API) as progressive enhancement; works without JS;
  reduced-motion falls back to native toggle; items open independently everywhere
- Contact form (Formspree) with validation + toast notifications
- `prefers-reduced-motion` support throughout

---

## Footer

Column layout (stacks on mobile): **Brand** (logo + one-line descriptor) · **Company**
(About, Team, Blog, Careers) · **Get in touch** (info@calma.io, Contact). Bottom bar:
© year + Privacy + LinkedIn. Now a single `Footer.astro` component (no more
duplication) — its `home` prop decides bare `#…` vs absolute `/#…` links.

---

## Roadmap / TODO

### 1. ~~Migrate to Astro~~ — DONE (2026-05-31)

Migrated to Astro 6, parity-only (lift & shift). Header/Footer/Layout componentized
(single source of truth), articles moved to a `blog` content collection, sitemap
auto-generated, JSON-LD driven by frontmatter, deploy via GitHub Actions. Plan +
QA in `ASTRO_MIGRATION_PLAN.md` / `QA_REPORT.md` (delete both once cutover is stable;
`legacy-static` branch + `pre-astro` tag are the rollback, keep ~2 weeks then drop).

### 2. Standalone pages (planned)

- **`/blog/` index page** — a real blog library page (currently `#blog` is only a
  homepage anchor; article breadcrumbs point at it). Low effort, natural as content grows.
- **Per-vertical landing pages** — dedicated pages for each vertical. Biggest SEO/intent
  lever for a lead-gen company. URL pattern decided: **`/lead-generation/<vertical>/`**.
  The `verticals` content collection is already stubbed in `content.config.ts` (empty
  dir) — add `.md` files + a `[...slug].astro` template, same shape as blog.
- Lower priority: standalone `/team`, `/about` (fine as homepage sections for now).

### 3. Smaller follow-ups

- Light/dark toggle is **not** planned (brand is dark-first); would need a real light
  design pass, not an inversion.
- No hero CTA by design — this is a presentation site, not an acquisition funnel.

---

## Third-Party Integrations

| Service | Purpose |
|---------|---------|
| Formspree | Contact form (`/f/xzzgddjo`) |
| LinkedIn | Company page (header? no — footer + JSON-LD `sameAs`) |
| Notion | Careers / open vacancies (external) |
| GitHub Pages | Hosting & deploy — source = GitHub Actions (`astro build` on push to `main`) |
</content>
