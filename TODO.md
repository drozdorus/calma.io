# TODO

Backlog for calma.io. Closed items get checked off with the date, not deleted.

## Brand search: "calma + X" (roadmap, started 2026-10-16)

**Goal:** calma.io first for "calma lead generation", "calma marketing", "calma agency", "calma company", "calma insurance leads", and AI assistants (ChatGPT, Perplexity, Gemini, Claude) answering "what is Calma" with this company. The bare word "calma" is out of reach (dictionary word, the Calm app, a historic Calma Company on Wikipedia) and is not a target. Purpose is entity recognition for banks, partners and candidates who search the name, not inbound clients.

**Baseline 2026-10-16 (Google US, owner's browser; Search Console, last 3 months).** The brand+category queries are already won: calma.io is **#1** for "calma lead generation" (5 of the top 9 are calma.io, plus LinkedIn #4 and Crunchbase #5), "calma marketing" and "calma agency". "calma company" puts calma.io **#3**, under the Wikipedia article about the 1965–1988 CAD vendor Calma Company and calmacompany.com. The bare "calma" shows nothing of ours, as expected. Search Console, queries containing "calma": 495 impressions, 1 click; the largest are "calma" 103 at position 14.8, "calma b2b" 102 at 41.9, "calma ai" 86 at 8.4, "calma distribution" 53 at 40.2, "calma company" 48 at 8.2. Nobody searches "calma lead generation" yet, which is why it is easy to hold. So what is left: **"calma company"**, and **AI answers**. Perplexity needs a login, so the AI check is still open.

How it works: search engines and LLMs decide "Calma = this company" from consistent facts in several independent places (site schema, Wikidata, LinkedIn, Crunchbase, directories, articles that say "Calma, a lead generation company"). Each step below adds one such place or makes the existing ones agree.

### 0. Baseline: measure before and after
- [x] 2026-10-16 — Google Search Console and a manual Google US check, numbers above. Bing Webmaster Tools still to read.
- [ ] AI check: ask ChatGPT, Perplexity, Gemini and Claude "What is Calma, the lead generation company?" and record whether each finds calma.io.
- [ ] Repeat steps 0.2–0.3 monthly; next 2026-11-16.

### 1. On-site entity record
- [x] 2026-10-16 — Organization JSON-LD moved to `src/data/organization.ts` and emitted on `/` and `/about/` (about pointed at `#organization` without carrying it). Added `foundingDate` and The Org in `sameAs`. `llms.txt`: The Org and a disambiguation line (not the Calm app, not other "calma" businesses). **The legal entity stays out of machine-readable text** (owner, 2026-10-16; same rule as the reversed text on `/privacy/`): no legal name or address in schema, footer, `llms.txt` or profiles.
- [ ] Add the Wikidata QID to `sameAs` the day the item exists (step 3).

### 2. Existing profiles: one description everywhere (owner, Claude can fill in the browser)
One line, used verbatim: **"Calma is a performance lead generation company for the US insurance, home services and financial verticals, founded in 2024."** Same name, website `https://calma.io`, founding year, logo. No legal name or address.
- [ ] LinkedIn company page `calma-io`: tagline, about, website, industry, size, founded, location.
- [ ] Crunchbase org `calma-b99b`: description, founded, website, socials.
- [ ] The Org `theorg.com/org/calma`: description, people.
- [ ] Founders' LinkedIn: current role reads "Calma" linked to the company page, not plain text.

### 3. Wikidata item for Calma
Wikidata feeds Google's Knowledge Graph and is a standard source for LLMs. Its notability rule (Wikidata:Notability) accepts an item that has serious, publicly available references, **or** one that fills a structural need. Calma on its own has thin independent references: LinkedIn, Crunchbase and its own site are self-published. Its safe ground is the structural need, as the employer of the founder's item. So it goes **second, right after the person item** in the founder's own plan, not alone. Without that, it risks a quiet deletion request.
- [ ] Owner: register the Wikidata account (neutral nickname, no VPN). It must be autoconfirmed (4 days + 50 small edits) before items with URL references.
- [ ] Person item first, then the Calma item: instance of marketing agency + business, inception 2024, official website, Crunchbase and LinkedIn IDs, founded by. **No country, legal name or address**, the same rule as on the site.
- [ ] QID into `src/data/organization.ts` `sameAs` and `llms.txt`; watchlist the item, look at it monthly (anyone can add statements).

### 4. Directories
- [x] 2026-08-31 — **Clutch: rejected** ("not a fit": marketplaces and lead sellers are out of scope). The appeal was dropped 2026-10-08. Do not re-apply.
- [ ] GoodFirms: the owner registers (account creation is not something Claude does), Claude fills the profile in the browser from the one-line description in step 2. GoodFirms sells itself on visibility in AI answers, which is the open part of this goal.
- [ ] One try at a directory with a lower bar, positioned as a service ("performance marketing and lead generation campaigns"), not as a lead seller: **GoodFirms** first (ranks for "lead generation agency" queries), then Sortlist (already ranks on "calma marketing agency" with a namesake). Stop at the first rejection of the same kind as Clutch's.
- [ ] Conference pages: ask organizers of events in `src/data/events.ts` where Calma exhibited, sponsored or spoke for a listing that links to calma.io. Industry pages that carry "Calma" next to "lead generation" are the most on-topic signal available.
- Not doing: contact-scraper directories (ZoomInfo, Apollo, RocketReach and similar) — they publish phones and emails. Google Business Profile — there is no customer-facing office.

### 5. Mentions in text
LLMs learn "Calma = lead generation" from sentences where the two stand together.
- [ ] Every column, podcast and interview byline: "founder of Calma (calma.io), a performance lead generation company". Same phrase each time.
- [ ] calma.io blog: one post a quarter is enough to keep the site alive in the index.

### Related
- [ ] `src/content/verticals/auto-insurance.md` FAQ says "We design consent capture around current rules — including TCPA…". Calma collects no personal data on its side (owner, 2026-09-27: no compliance-tooling claims). Rewrite or drop that answer and the JSON-LD copy of it.

## Hiring

- [x] 2026-09-16 — **Owner:** share the Notion DB "Applications (website)" with the `n8n` integration (open the DB → ••• → Connections → n8n). The intake workflow is active but its Notion write fails with "Could not find database … make sure it is shared with your integration" (execution 101990, 2026-09-16). Then re-run the smoke test: `curl -X POST https://nnnnnnnn.calma.ad/webhook/calma-hiring-apply -H 'Content-Type: application/json' -d '{"name":"TEST","email":"t@example.com","role":"Open application","message":"test"}'` must return `{ "ok": true }` and a row must appear in the DB.
- [ ] Alert on intake **failures**: successful applications post to the hiring topic via Morse (since 2026-09-16), but n8n still has no error workflow, so a failing Notion write is visible only to the candidate (the form treats anything but `{ ok: true }` as an error and shows the email route). Add an Error Trigger workflow posting to the owner's DM through Morse and set it as the intake workflow's error workflow.
- [ ] Public Notion page "Open Vacancies" (`169f120c65df806bba68fc5163bcfa52`, under Staff) — owner's plan (2026-09-16): first replace its content with a "moved to calma.io/hiring/" notice, then unpublish it entirely after one or two weeks (target ≈ 2026-09-30). It is indexed and competes with `/hiring/` for the same queries. Nothing links to it anymore: calma.io and drozdorus.com both point at `/hiring/` since 2026-09-16.
- [ ] Delete the Notion "Vacancies (website)" DB (`481ef85f-ed6f-42e6-87af-b9049779913a`). It was created for a Notion → repo n8n sync that was never built; the repo is the source of truth for vacancies now and nothing reads that DB.
- [x] 2026-09-16 — Language: owner decided **EN only**. If a Ukrainian version is ever revisited: hiring-only (`/uk/hiring/`, `/uk/hiring/<slug>/`), same templates with a strings map, `hreflang` pairs with `x-default` = EN, never a site-wide i18n.
- [ ] After the first deploy: Google Search Console → Enhancements → Job postings. Both role pages carry JobPosting JSON-LD; confirm they validate and note any warnings here.
- [ ] Refactor candidate: `/about/` founders row still hand-writes its team-card markup (it renders buttons, not the shared `TeamCards`). Fold it in if the founders row and the roster ever need to change together.
