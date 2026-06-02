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
| `src/components/Header.astro` | **Page-level top nav** (Verticals dropdown, Blog, Contact, Hiring); pathname active; mobile burger menu. No `home` prop (all links absolute) |
| `src/components/Footer.astro` | **Single source of truth.** 3-column sitewide nav; `home` prop → bare `#anchor` on homepage section links, absolute `/#anchor` elsewhere |
| `src/components/SectionNav.astro` | Floating bottom **section pill** (homepage only) — jumps homepage sections, scroll-spy active |
| `src/pages/index.astro` | Homepage (sections, wave canvas, JSON-LD `@graph`, bottom CTA band → /contacts/, `<SectionNav />`) |
| `src/pages/blog/[...slug].astro` / `blog/index.astro` | Article template + `/blog/` library index (`ArticleCard` + `cardCovers`) |
| `src/pages/lead-generation/[...slug].astro` / `index.astro` | Per-vertical "what we do" pages + the hub (mirrors homepage "What We Do" groups) |
| `src/pages/contacts.astro` | Contact page (Formspree form + email + careers) — moved off the homepage |
| `src/pages/privacy.astro` | Privacy Policy |
| `src/content/blog/<slug>.md` · `src/content/verticals/<slug>.md` | Articles (3) + vertical pages (4) — Markdown + frontmatter |
| `src/content.config.ts` | `blog` + `verticals` collection schemas |
| `src/components/IconSprite.astro` | Shared hidden SVG icon sprite (homepage + hub) |
| `src/styles/*.css` | `style.css` (global+FAQ+footer), `blog.css`, `team.css` — gated per-page |
| `src/scripts/*.js` | `script.js` (wave canvas, island header, scroll-spy, drag scrollers, FAQ, form), `team.js` |
| `public/` | `img/`, `fonts/`, `CNAME`, `.nojekyll`, `robots.txt`, favicons |
| `astro.config.mjs` | `site`, `trailingSlash:'always'`, `build.format:'directory'`, sitemap, `markdown.processor` (smartypants off for verbatim quotes) |

---

## Site Structure & Navigation

Navigation is **split by purpose** (rebuilt 2026-06-02, Flighty-style):

- **Top header = pages** (`Header.astro`): logo · **Verticals ▾** (glass dropdown → 4
  vertical pages + "All verticals" hub) · **Blog** (`/blog/`) · **Contact** (`/contacts/`)
  · **Hiring** pill (Notion). Active state is **pathname-based** (Verticals on
  `/lead-generation/*`, Blog on `/blog/*`, Contact on `/contacts/*`). On mobile the nav
  collapses to a burger → full-screen page menu (Verticals + 4 sub-pages, Blog, Contact, Hiring).
- **Floating bottom pill = homepage sections** (`SectionNav.astro`, homepage only): a glass
  pill that jumps between homepage sections and highlights the active one on scroll
  (the scroll-spy drives it). Sections: **About · Verticals · Team · Events · FAQ**
  (Blog is omitted here — it's a page in the header). Hidden on non-home pages.

**Homepage sections** (in DOM order): Hero (`#top`) · About (`#about`) · Verticals /
"What We Do" (`#verticals`) · Team (`#team`) · Events (`#conferences`) · Blog teaser
(`#blog`) · FAQ (`#faq`) · **CTA band → `/contacts/`** · Footer.

**Contact is its own page** (`/contacts/`) — the homepage no longer has a `#contact`
section; its bottom CTA band links to the contacts page. A thin gradient scroll-progress
bar still sits at the top of every page.

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
- **Link affordances (two, deliberately)**: (1) **text links** — a word/phrase that is
  the link: shared `.text-link` = amber→mint, **underlined** (matches `.article-prose a`);
  use this, don't invent per-block link styles. (2) **card links** — the whole card is the
  link: no underline/arrow, the card's hover-lift is the affordance (blog, related, event,
  hub-vertical cards). Plus **buttons** (Hiring pill, the homepage CTA-band button) for
  prominent CTAs. Underline therefore = "link inside text"; no stray arrows.

### Key interactions

- Canvas wave animation (multi-layer sine, color-shifting, scroll-fade)
- Island header (full-width → floating pill on scroll)
- Smooth-scroll anchors (80px offset); the **scroll-spy drives the bottom section pill**
  (`SectionNav`) on the homepage; top scroll-progress bar on every page
- **Verticals dropdown** (header): hover + click/keyboard (Enter/Space/Arrow/Esc), `aria-expanded`
- Drag-to-scroll horizontal scrollers (events, team) via `initHScroller`
- **FAQ**: one control site-wide (`.faq-list`) — native `<details>` markup with a
  JS height-slide (Web Animations API) as progressive enhancement; works without JS;
  reduced-motion falls back to native toggle; items open independently everywhere
- Contact form (Formspree) with validation + toast notifications
- `prefers-reduced-motion` support throughout

---

## Footer

Full sitewide nav (rebuilt 2026-06-02), single `Footer.astro` component. Brand block +
three columns: **What we do** (4 vertical pages + All verticals, data-driven) · **Company**
(About, Team, Events, Blog, Careers) · **Get in touch** (Contact `/contacts/`, info@calma.io,
LinkedIn). Bottom bar: © year + Privacy. Responsive grid (`min-width:0` / `minmax(0,…)`) —
no horizontal overflow on phones. The `home` prop only affects the Company section anchors
(bare `#…` on homepage vs absolute `/#…` elsewhere).

---

## Roadmap / TODO

### 1. ~~Migrate to Astro~~ — DONE (2026-05-31)

Migrated to Astro 6, parity-only (lift & shift). Header/Footer/Layout componentized
(single source of truth), articles moved to a `blog` content collection, sitemap
auto-generated, JSON-LD driven by frontmatter, deploy via GitHub Actions. Plan +
QA in `ASTRO_MIGRATION_PLAN.md` / `QA_REPORT.md` (delete both once cutover is stable;
`legacy-static` branch + `pre-astro` tag are the rollback, keep ~2 weeks then drop).

### 2. ~~Standalone pages~~ — DONE (2026-06-01)

- **`/blog/` index** — real blog library page (`ArticleCard` + shared `cardCovers`),
  linked from the homepage `#blog` ("View all articles") and article breadcrumbs.
- **Verticals / "what we do" pages** — SEO + client-gen surfaces, **distinct from the
  blog**, at **`/lead-generation/<vertical>/`** (`verticals` content collection +
  `[...slug].astro`). Hub at `/lead-generation/` mirrors the homepage "What We Do" groups
  (Insurance / Home Services / Finance) and links wherever a page exists. Pages: auto-insurance,
  home-insurance, home-services, finance (insurance split to sub-niches; the rest at group
  level). Linked from the homepage "What We Do" ("Explore lead generation by vertical").
- Shared `IconSprite.astro` (homepage + hub). Accent links use one `.text-link` (amber→mint),
  matching the contact/careers convention — don't reintroduce per-block link styles.
- Lower priority / not built: standalone `/team`, `/about` (homepage sections for now).

### 3. ~~Navigation overhaul~~ — DONE (2026-06-02)

Split nav by purpose (Flighty-style): page-level top header (Verticals dropdown, Blog,
Contact, Hiring) + a floating bottom **section pill** on the homepage. Moved Contact to a
`/contacts/` page (homepage gets a CTA band). Footer became a full 3-column sitewide nav.
Collapsed the link zoo to two affordances (text-link underline / card-link card) + buttons.

### 4. Backlog

- **Redesign the verticals hub as cards** — the hub currently uses a grouped nested **list**
  of text links (Insurance → Auto/Home, etc.), which only reads as clickable because of the
  underline. Re-present each linkable vertical as a **card** (the site's no-underline card
  pattern), keeping the Insurance / Home Services / Finance grouping as headings. Goal: hub
  affordance without underline, fully consistent with the blog/event card language.
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
