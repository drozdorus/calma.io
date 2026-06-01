# Calma.io → Astro Migration Plan

> Living doc for the Astro migration. Delete once cutover is stable.
> Scope decision: **v1 = parity-only (lift & shift)**. New pages (blog index,
> niche pages, /contact) come in a later phase — routing/collections are
> pre-wired for them but not built in v1.

## Target stack
- Astro 6, output **static** (matches betterhouse), `@astrojs/sitemap`.
- Hosting stays **GitHub Pages**, but source switches from "deploy from branch"
  to **GitHub Actions** (`astro build` → `actions/deploy-pages`).
- Repo stays in `drozdorus/calma.io`. Domain/CNAME `calma.io` unchanged.

## Config
- `site: 'https://calma.io'`, `trailingSlash: 'always'`, `build.format: 'directory'`
  → preserves current `/blog/<slug>/index.html` URLs exactly.
- `@astrojs/sitemap` auto-generates sitemap; `robots.txt` updated to new path.

## Project structure
```
public/            ← img/, fonts/, favicon, robots.txt, CNAME, .nojekyll, metaimg.png (1:1)
src/
  layouts/BaseLayout.astro      ← <head>, meta/OG via props, @font-face, CSS+JS includes
  components/Header.astro        ← single source of truth (nav, hiring pill, scroll progress)
  components/Footer.astro        ← single source of truth
  pages/index.astro              ← homepage, all 9 sections, pixel parity
  pages/privacy.astro
  pages/blog/[...slug].astro     ← article template (breadcrumb, prose, related, FAQ)
  content/blog/<slug>.md         ← 3 articles as Markdown + frontmatter
  content.config.ts              ← blog collection schema (+ verticals collection, phase 2)
  styles/                        ← style.css / blog.css / team.css (global imports, unchanged)
  scripts/                       ← script.js / team.js (logic unchanged)
.github/workflows/deploy.yml     ← astro build → Pages
```

## Page structure
**v1 (now):** `/` · `/blog/<slug>/` (3) · `/privacy/`. Careers → external Notion.
**Phase 2 (pre-wired, not built):**
- `/blog/` library index page.
- Niche landings at **`/lead-generation/<vertical>/`** (content collection `verticals`):
  `auto-insurance`, `home-insurance`, `health-insurance`, `legal-services`,
  `home-improvement`, `financial-services`.
- `/contact/` standalone (contact stays a homepage anchor in v1).

## Article frontmatter (blog collection)
`title, description, canonical, ogTitle, ogDescription, ogImage, date, faq[], related[]`.
JSON-LD `FAQPage` is **generated from `faq[]`** (currently hand-written in HTML).

## Migration mapping
| Now | → Astro | How |
|---|---|---|
| index.html header/footer/sections | Header.astro + Footer.astro + index.astro | header/footer → components |
| blog/<slug>/index.html ×3 | content/blog/<slug>.md + [...slug].astro | HTML prose → Markdown; URL kept |
| privacy/index.html | pages/privacy.astro | 1:1 |
| style/blog/team .css | src/styles/* (global import) | unchanged |
| script.js / team.js | src/scripts/* (client script) | logic unchanged |
| img/, fonts/, favicon, metaimg | public/ | 1:1, absolute paths |
| CNAME, .nojekyll, robots.txt | public/ | keep domain/serve |
| hand sitemap.xml | @astrojs/sitemap | robots.txt updated |
| deploy-from-branch | GHA astro build | new workflow + source switch |

## Subagent breakdown
- **A — Core/Infra:** scaffold, config, public assets, BaseLayout + Header + Footer, deploy.yml.
- **B — Homepage:** index.astro parity + port script.js/team.js.
- **C — Blog:** content collection, 3 articles → MD, article template, JSON-LD, sitemap.
- **D — Privacy + QA:** privacy page, QA checklist, `astro preview` run.

A first (B/C/D depend on Layout/Header/Footer); then B/C/D.

## Owner actions
1. Approve plan + niche URL pattern. ✅ (`/lead-generation/<vertical>/`)
2. At cutover: GitHub → Settings → Pages → Source: "Deploy from a branch" → **"GitHub Actions"**.
3. Final visual QA on preview before merge.
4. Confirm nothing external consumes raw files from repo root.

## Rollback
Work all on `astro-migration`; `main` untouched until cutover.
- Tag `pre-astro` = code truth point. Branch `legacy-static` = deployable-as-is fallback.
- **Before cutover:** don't merge. Zero risk.
- **Cutover fails / regressions:** GitHub → Pages → Source → "Deploy from branch: `legacy-static`".
  Instant, no rebuild, no git revert.
- **Minor bugs:** forward-fix on main, GHA redeploys (~1 min).
- Keep `legacy-static` ~2 weeks after stable cutover, then delete (this doc too).

**Post-deploy check:** homepage render + wave canvas + scrollers + FAQ + Formspree submit;
3 articles (prose/breadcrumb/related/JSON-LD); privacy; fonts; favicon; OG tags (LinkedIn
preview); sitemap.xml/robots.txt; all URLs trailing-slash.
```
