# TODO

Backlog for calma.io. Closed items get checked off with the date, not deleted.

## Brand search: "calma + X" (roadmap, started 2026-10-16)

**Goal:** calma.io first for "calma lead generation", "calma marketing", "calma agency", "calma company", "calma insurance leads", and AI assistants (ChatGPT, Perplexity, Gemini, Claude) answering "what is Calma" with this company. The bare word "calma" is out of reach (dictionary word, the Calm app, a historic Calma Company on Wikipedia) and is not a target. Purpose is entity recognition for banks, partners and candidates who search the name, not inbound clients.

**Starting point (2026-10-16, web search, not Google):** calma.io is absent from the results for "calma marketing agency", "calma lead generation" and "calma company". Competing namesakes are small: Calma Media (London, Sortlist profile), Calmia Agency, Calma clinic (Slovakia).

How it works: search engines and LLMs decide "Calma = this company" from consistent facts in several independent places (site schema, Wikidata, LinkedIn, Crunchbase, directories, articles that say "Calma, a lead generation company"). Each step below adds one such place or makes the existing ones agree.

### 0. Baseline: measure before and after
- [ ] Google Search Console, calma.io: queries containing "calma", last 3 months, impressions and average position. Same in Bing Webmaster Tools. Record the numbers here.
- [ ] Manual check, Google US: the five goal queries above plus "calma.io" — position of calma.io, what is on the first page.
- [ ] AI check: ask ChatGPT, Perplexity, Gemini and Claude "What is Calma, the lead generation company?" and record whether each finds calma.io.
- [ ] Repeat steps 0.2–0.3 monthly; next 2026-11-16.

### 1. On-site entity record
- [x] 2026-10-16 — Organization JSON-LD moved to `src/data/organization.ts` and emitted on `/` and `/about/` (about pointed at `#organization` without carrying it). Added `legalName` Calma Tech LTD, `foundingDate`, `address` (Limassol, CY), The Org in `sameAs`. Footer copyright now names Calma Tech LTD. `llms.txt`: legal entity, The Org, a disambiguation line (not the Calm app, not other "calma" businesses).
- [ ] Add the Wikidata QID to `sameAs` the day the item exists (step 3).

### 2. Existing profiles: one description everywhere (owner, Claude can fill in the browser)
One line, used verbatim: **"Calma is a performance lead generation company for the US insurance, home services and financial verticals, founded in 2024."** Same name, website `https://calma.io`, founding year, HQ Limassol, logo.
- [ ] LinkedIn company page `calma-io`: tagline, about, website, industry, size, founded, location.
- [ ] Crunchbase org `calma-b99b`: description, legal name, founded, HQ, website, socials.
- [ ] The Org `theorg.com/org/calma`: description, people.
- [ ] Founders' LinkedIn: current role reads "Calma" linked to the company page, not plain text.

### 3. Wikidata item for Calma
The strongest single signal for Google's Knowledge Graph and for LLMs. Needs no Wikipedia notability. The item spec already exists (owner's private notes). It needs the owner's Wikidata account, which must be autoconfirmed (4 days + 50 edits) before adding URL references.
- [ ] Owner: the account exists and is autoconfirmed.
- [ ] Create the Calma item: instance of marketing agency + business, inception 2024, official website, Crunchbase and LinkedIn IDs, founded by.
- [ ] QID into `src/data/organization.ts` `sameAs` and `llms.txt`; watchlist the item, look at it monthly.

### 4. Directories
- [x] 2026-08-31 — **Clutch: rejected** ("not a fit": marketplaces and lead sellers are out of scope). The appeal was dropped 2026-10-08. Do not re-apply.
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
