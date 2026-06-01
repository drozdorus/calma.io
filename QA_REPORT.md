# Calma.io Astro Migration — QA Report (Subagent D)

Branch `astro-migration`. `npm run build` is **green** (5 pages, ~0.8s). All checks
below were run by diffing the built `dist/` against the legacy static files in the
repo (`index.html`, `blog/<slug>/index.html`, `privacy/index.html`).

Build warnings (non-blocking):
- `markdown.smartypants` deprecation notice (Astro will move it onto the processor in a future major). Harmless for now.
- `[glob-loader] No files found matching "*.md" in directory "src/content/verticals"` — expected; the `verticals` collection is pre-wired for Phase 2 and intentionally empty.

---

## Route-by-route results

| Route | dist file emitted | title | canonical | description | robots | og:type/url | og:image | twitter:card | favicons (3) | JSON-LD | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | `dist/index.html` ✓ | ✓ matches legacy | `https://calma.io/` ✓ | ✓ matches | index,follow ✓ | website / `https://calma.io/` ✓ | metaimg.png ✓ | summary_large_image ✓ | ✓ | `@graph` (Org, WebSite, Person, OfferCatalog 6×Service, 6×Event, FAQPage 7×Q) ✓ | **PASS** |
| `/blog/us-auto-insurance-market/` | ✓ | ✓ matches legacy | ✓ trailing slash | ✓ matches | index,follow ✓ | article / canonical ✓ | metaimg.png ✓ | ✓ | ✓ | FAQPage(5Q) + Article ✓ | **PASS** |
| `/blog/meta-auto-insurance-ads/` | ✓ | ✓ matches legacy | ✓ trailing slash | ✓ matches | index,follow ✓ | article / canonical ✓ | metaimg.png ✓ | ✓ | ✓ | FAQPage(5Q) + Article ✓ | **PASS** |
| `/blog/ny-ai-advertising-law/` | ✓ | ✓ matches legacy* | ✓ trailing slash | ✓ matches | index,follow ✓ | article / canonical ✓ | metaimg.png ✓ | ✓ | ✓ | FAQPage(5Q) + Article ✓ | **PASS** |
| `/privacy/` | `dist/privacy/index.html` ✓ | "Calma — Privacy Policy" ✓ | `https://calma.io/privacy/` (added) | added (legacy had none) | index,follow | website / canonical ✓ | metaimg.png ✓ | ✓ | 3 favicon links | none (legacy had none) ✓ | **PASS** |

\* NY article title renders the apostrophe as `&#39;` in dist vs raw `'` in legacy. This is an equivalent HTML entity — renders identically, no SEO/display difference. **Not a regression.**

### Content parity (dist vs legacy, counts matched exactly)

| Check | Legacy | Dist |
|---|---|---|
| Homepage sections (#about/#verticals/#team/#conferences/#blog/#faq/#contact) | 1 each | 1 each ✓ |
| Homepage Formspree endpoint | `formspree.io/f/xzzgddjo` | same ✓ |
| Homepage team cards | 11 | 11 ✓ |
| Homepage conference cards | 15 | 15 ✓ |
| Homepage FAQ items | 7 | 7 ✓ |
| Homepage blog teaser links (3 articles) | 3 | 3 ✓ |
| Homepage JSON-LD `@graph` Service / Event nodes | 6 / 6 | 6 / 6 ✓ |
| Article FAQ items (each of 3) | 5 | 5 ✓ |
| Article related cards (each) | 2 | 2 ✓ |
| Article h2/h3 prose headings (per article) | match | match ✓ |
| Privacy `.privacy-section` blocks (7 sections) | 12 token hits | 12 ✓ |

### Anchor convention (verified correct)
- Homepage nav/footer: **bare** `#contact` etc. (3 bare nav links, 0 absolute) — smooth-scroll JS matches.
- Articles: **absolute** `/#blog` etc. (15 absolute, 0 bare) — jumps back to homepage.
- Privacy: **absolute** `/#…` (14 absolute, 0 bare); back-to-home link is `/`. Header + Footer both render (home=false, correct).

---

## Global checks

| Item | Result |
|---|---|
| `dist/CNAME` | ✓ `calma.io` |
| `dist/.nojekyll` | ✓ present |
| `dist/robots.txt` | ✓ present — `Sitemap: https://calma.io/sitemap-index.xml` (updated from legacy `sitemap.xml`; correct for `@astrojs/sitemap`) |
| `dist/sitemap-index.xml` + `dist/sitemap-0.xml` | ✓ both generated |
| Sitemap URLs | 5/5 present, all `https://calma.io/…` with trailing slashes (see list below) |
| `dist/fonts/` | ✓ present (`geologica/`, `nexa/`) |
| `@font-face` src paths in built CSS | ✓ all absolute `/fonts/geologica/*.ttf` (7 weights) |
| `dist/img/` incl. `favicon/` + `metaimg.png` | ✓ present (favicon dir has full icon set, manifest, browserconfig) |
| `.github/workflows/deploy.yml` | ✓ valid Astro→Pages (Node 20, `npm ci`, `npm run build`, `configure-pages@v5`, `upload-pages-artifact@v3` path `./dist`, `deploy-pages@v4`; permissions contents:read / pages:write / id-token:write; trigger push→main + workflow_dispatch; concurrency guard) |
| Leftover relative asset paths (404 risk) | **None that render.** See note below. |

### Sitemap URL list (`dist/sitemap-0.xml`)
```
https://calma.io/
https://calma.io/blog/meta-auto-insurance-ads/
https://calma.io/blog/ny-ai-advertising-law/
https://calma.io/blog/us-auto-insurance-market/
https://calma.io/privacy/
```
All 5 routes present, all absolute `https://calma.io/…`, all trailing-slash. ✓

### Relative-path / 404 scan
A full grep of `dist/` for `src="./`, `href="./`, `src="img/`, relative `url(...)` in CSS, etc. found exactly **one** non-absolute reference:

- `dist/index.html` line 19: `<img src="img/aw-logo.png" …>` — **inside an HTML comment** (the commented-out "Affiliate World Dubai" upcoming-event card). Browsers never fetch `src` inside `<!-- -->`, so this is **not a runtime 404**. The live aw-logo usage uses absolute `/img/aw-logo.png`.

  - Source: `src/pages/index.astro` line 595 (commented), the live one at line 606 is absolute.
  - **Recommendation (cosmetic, optional):** Subagent B converted every other homepage `img/` to `/img/` but left this one inside the dead comment. Either delete the commented Dubai card or change it to `/img/` for consistency. No functional impact.

All CSS `url()` references resolve to absolute `/fonts/...`. No `./` or `../` paths anywhere in rendered output.

---

## Parity diffs / things flagged for the orchestrator

1. **Privacy `<head>` is parity-plus, not byte-parity.** Legacy `privacy/index.html` had a bare head (only `<title>` + `style.css` link — **no** description, canonical, OG, favicons, or viewport). The Astro port runs through `BaseLayout`, so `/privacy/` now gets the full SEO/OG/favicon head plus a canonical `https://calma.io/privacy/` and a new description. This is an **intentional improvement** per the task brief; flagging it because it is not a 1:1 head match.

2. **Privacy now has Header + Footer.** Legacy privacy page had no site header/footer (just `.privacy-container` + a "← Back to Home"). Per the migration plan (single-source Header/Footer), the port adds both. The Back-to-Home link is preserved and now points to `/` (was `../`). Visual change — eyeball on preview.

3. **NY article apostrophe** rendered as `&#39;` entity (equivalent). Noted above; no action needed.

4. **Lone commented relative img path** (item in Relative-path scan). Cosmetic only.

5. **robots.txt Sitemap line changed** from `sitemap.xml` → `sitemap-index.xml`. Correct for the new `@astrojs/sitemap` output, but note the **old `https://calma.io/sitemap.xml` will 404** after cutover. If anything (GSC, external monitors) has the old sitemap URL registered, re-submit the new `sitemap-index.xml` in Google Search Console post-cutover.

No dropped content, no broken internal links, no missing sections were found.

---

## Pre-cutover checklist for the owner (manual visual QA on `npm run preview`)

Run `npm run preview` and eyeball these — they can't be verified from static HTML diffing:

- [ ] **Homepage hero wave canvas** animates (the `<canvas>` driven by `script.js`).
- [ ] **Drag-to-scroll** works on the Events scrollers (upcoming + past) and the Team scroller (`initHScroller`): click-drag scrolls horizontally, fade-mask edges show, no arrows/dots.
- [ ] **FAQ accordion** opens/closes (homepage 7 items + each article's 5 `<details>` items; `+` icon animates).
- [ ] **Mobile menu** opens/closes (hamburger → `#mobileMenu`, close button, links scroll then close).
- [ ] **Scroll-progress bar** + active-nav highlight track scroll on the homepage.
- [ ] **Contact form (Formspree)** actually submits to `formspree.io/f/xzzgddjo` and shows success state. Send one real test submission.
- [ ] **Fonts load** (Geologica weights render; no FOUT/fallback). Check Network tab → no 404 on `/fonts/geologica/*.ttf`.
- [ ] **Favicon** shows in the tab on every route incl. `/privacy/`.
- [ ] **OG/LinkedIn preview:** paste `https://calma.io/`, an article URL, and `/privacy/` into the LinkedIn Post Inspector (and/or Facebook Sharing Debugger) after deploy — confirm `metaimg.png` + titles/descriptions render. (Can only be done once live, not on localhost.)
- [ ] **Privacy page** visual: gradient title, amber section headings, contact card, header/footer render, "← Back to Home" returns to `/`.
- [ ] **Article pages:** breadcrumb (`calma.io / Blog / <label>`), hero cover SVG, prose styling, related cards link correctly, JSON-LD validates (Google Rich Results Test once live).
- [ ] **All URLs trailing-slash:** clicking nav/footer/breadcrumb/related links never lands on a non-slashed URL.

### Post-cutover (after flipping Pages → GitHub Actions)
- [ ] Confirm `https://calma.io/` and all 4 sub-routes serve (not 404).
- [ ] Confirm old `https://calma.io/sitemap.xml` → re-point GSC to `sitemap-index.xml`.
- [ ] Confirm `legacy-static` branch still deployable as rollback (per migration plan).

---

**Bottom line:** Build green; all 5 routes emit at the correct trailing-slash paths with correct heads, JSON-LD, content counts, and anchor conventions. Zero rendering 404 risks. The only non-byte-parity items are the intentional privacy-page upgrades (full head + Header/Footer) and the robots sitemap path change — all expected per the plan. Safe to proceed to owner visual QA on preview.
