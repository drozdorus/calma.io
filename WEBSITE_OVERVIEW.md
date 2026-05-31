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

- **Static site** — plain HTML/CSS/JavaScript, **no framework, no build step**
- **Hosting**: GitHub Pages (push to `main` deploys). `.nojekyll` is present, so the
  repo is served as-is (no Jekyll, no server-side includes/redirects)
- **Form backend**: Formspree (`https://formspree.io/f/xzzgddjo`)
- **Fonts**: Geologica (local TTF, 9 weights) — primary. Nexa present but unused in CSS.
- **No analytics** currently in the source

### Files

| File | Scope |
|------|-------|
| `index.html` | Single-page homepage |
| `style.css` | Global + homepage sections + **shared FAQ control** + footer |
| `blog.css` | Blog cards (homepage) + article-page layout (prose, related, FAQ container) |
| `team.css` | Team scroller (homepage only — not loaded on article pages) |
| `script.js` | Wave canvas, island header, scroll-progress + active-nav spy, smooth scroll, drag scrollers, contact form, FAQ slide |
| `team.js` | One line: inits the team drag-scroller |
| `blog/<slug>/index.html` | Article pages (3) |
| `cases/<slug>/index.html` | **Redirect stubs** → `/blog/<slug>/` (old URLs, articles were renamed cases→blog) |
| `privacy/index.html` | Privacy Policy |

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
- Renamed from `/cases/` → `/blog/` (2026-05-31). Old `/cases/<slug>/` paths are
  meta-refresh redirect stubs pointing at the new URLs; `sitemap.xml` lists `/blog/`.
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
© year + Privacy + LinkedIn. Same markup on homepage and article pages (article links
are absolute `/#…`); keep them in sync — there's no shared include yet (see Roadmap).

---

## Roadmap / TODO

### 1. Migrate to Astro (planned)

The biggest structural debt is that the header and footer are **duplicated across 4
HTML files** (index + 3 articles) — any nav/footer change must be repeated, and has
drifted before. Astro fixes this cleanly:

- Componentize `Header` / `Footer` / `Layout` (one source of truth).
- Articles become Markdown/MDX in a **content collection** → a new article is one
  `.md` file instead of ~300 lines of copy-pasted HTML.
- Auto-generate `sitemap.xml`; JSON-LD from frontmatter.
- Output stays **static** → GitHub Pages still works (add an `astro build` GitHub
  Action). Owner already runs Astro 6 on betterhouse, so the stack is familiar.
- **Sequence**: do this *after* the CSS/JS cleanup (done) — migrate clean code, not
  the zoo. Only worth it because the blog + per-vertical pages below will grow.

### 2. Standalone pages (planned)

- **`/blog/` index page** — a real blog library page (currently `#blog` is only a
  homepage anchor; article breadcrumbs point at it). Low effort, natural as content grows.
- **Per-vertical landing pages** — dedicated pages for each vertical (e.g. auto
  insurance lead generation). Biggest SEO/intent lever for a lead-gen company: someone
  searching "auto insurance lead generation" should land on a focused page, not a
  homepage card. Largest effort; fits Astro collections.
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
| GitHub Pages | Hosting & deploy (push to `main`) |
</content>
