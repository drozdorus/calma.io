# Hiring page — plan

Status: **page built, sync pending.** Branch `feature/hiring-page`, not merged.
Steps 1–3 and 6 are done; steps 4–5 need the owner; step 7 is deliberately held
until the public Notion page stops being used for the current hiring round.
Last revised 2026-07-28.

Delete this file once the page is live and stable.

---

## The decision

Notion stays, but changes role. It is no longer a public page — it becomes the
editorial backend. The site owns the URL, the design, the SEO and the form.

| | Owner |
|---|---|
| Vacancy **content** (text, comp, requirements) | Notion — edited by founder, recruiter, co-founders, no git |
| **URL and presentation** (canonical address, design, SEO, apply form) | The site — `calma.io/hiring/` |

Everything else follows from that split.

## Architecture

```
Notion Vacancies DB ──n8n sync──> repo (.md) ──GH Actions──> calma.io/hiring/
                                                                    │
                                                              apply form
                                                                    ▼
                                        n8n webhook ──> Notion Applications DB
```

One tool — n8n, already running on `apps` — carries both directions. The inbound
half (form → Notion) was the original plan; the outbound half (Notion → repo) is
the part that replaces the current build-time Notion read.

### Why sync-to-repo and not the current build-time Notion read

The branch currently calls the Notion API during `astro build` (`src/lib/notion.ts`).
That gets replaced because sync-to-repo is strictly better on every axis:

- zero Notion secrets in GitHub Actions — the token lives only in n8n
- Notion down or token expired → the site still builds, content is already in the repo
- vacancy edits land in git history: who changed what, when
- local `npm run dev` shows real vacancies with no token at all
- the fragile hand-written block renderer is solved once in n8n (`notion-to-md`)
  instead of being maintained inside the build

Freshness: 15-minute polling, or a Notion button → webhook → rebuild in about a
minute. n8n does either. (The weekly cron already in `deploy.yml` is for events —
it must not be the mechanism for vacancies, a closed role would hang for days.)

### Congruence: the apply target is config, not content

A recruiter describes the role. Where to apply is decided by the site, from a
single file — `src/data/hiring.ts`. Nobody writes a contact address into a job
description. Changing the apply target is one edit in one file: nothing in Notion,
nothing in LinkedIn posts, nothing on job boards, because every one of those links
points at `calma.io/hiring/`.

## Rejected alternatives

**Hardcoded markdown in the repo, no Notion.** Simplest, zero moving parts — but
every typo fix, comp change and deadline edit routes through the founder and a
commit. Three people write vacancies; only one can deploy. Rejected on that alone.

**Build-time Notion read (what the branch does today).** Works, but puts two
secrets in CI, couples every build to the Notion API, hides edits from git history,
and breaks local dev without a token. See above.

**ATS with an embed widget** (Dover, Breezy HR, Jobsoid — all have free tiers).
Rejected for two reasons that hit the actual goals: the embed is an iframe or JS
widget with foreign CSS, which lands as a foreign body in a custom dark theme with
wave canvas and accordions — exactly the "open Notion" problem being solved. And
iframe content does not belong to the domain, so the JobPosting markup earns SEO
for the vendor, not for calma.io. An ATS is worth it when there is candidate flow
needing a staged pipeline; the Notion Applications DB already covers what we need.

**"Publish to Google Jobs."** Not possible — the direction is the opposite of what
it looks like. Google for Jobs is an indexer, not a host: a page carrying
`JobPosting` JSON-LD gets crawled and surfaced in the jobs block. The site must be
the source. Direct feeds are only accepted from sites that are themselves job
boards.

## Google for Jobs — worth doing, do not over-expect

Costs roughly twenty lines in the template, generated from frontmatter the same way
FAQPage is generated in the blog. Required properties: `title`, `description`,
`datePosted`, `validThrough`, `hiringOrganization`, `jobLocation` (remote roles use
`jobLocationType: TELECOMMUTE`). Content must match the structured data, and a
closed role must be removed or have `validThrough` updated immediately — cheap,
since the vacancy is a file.

Realistic expectation: affiliate and media-buying roles get filled through Telegram
channels and niche boards, not Google Jobs. Do it because it is nearly free, not
because it will carry the funnel.

## Steps

1. ~~**Strip the build-time Notion read.**~~ **Done.** `src/lib/notion.ts` and the
   `@notionhq/client` dependency are gone; `NOTION_TOKEN` and
   `NOTION_VACANCIES_DB_ID` are out of `deploy.yml` and `.env.example`. Vacancies
   are a `vacancies` content collection, same pattern as `blog` and `verticals`.
   The page markup was untouched — only the data source changed.
2. ~~**`src/data/hiring.ts`**~~ **Done.** Form endpoint, contact, org details for
   JSON-LD. The client script reads the fallback address from it through a
   `data-email` attribute, so the contact is not duplicated even there.
3. ~~**`JobPosting` JSON-LD**~~ **Done.** Generated from frontmatter; `closed`
   roles drop both the card and the markup. `Date Posted`, `Valid Through`,
   `Slug` and `Order` were added to the Notion DB schema to feed it.
4. **n8n workflow #2** — Notion → markdown → commit to repo → `repository_dispatch`.
   Needs a GitHub PAT stored in n8n. **Owner.**
5. **n8n workflow #1** — `yeqK7GR7QKScSmIN`, "Calma.io Hiring | Application Intake",
   already built, still **inactive**. Activation was permission-blocked. **Owner.**
   Until `PUBLIC_N8N_WEBHOOK` is set, the form tells the candidate to email instead.
6. ~~**Switch the links.**~~ **Done** — header (×3), footer and `/contacts/` all
   point at `/hiring/`. Note this means merging removes the site's last link to
   the public Notion page.
7. **Close the public Notion share.** Held on purpose: the page is still in use
   for the current round. Once it isn't, unpublish it —
   `calma-io.notion.site/Open-Vacancies-...` is indexed and competes with
   `/hiring/` for the same queries, and the version without our brand, analytics
   or form is the one that would win.

## Seeded content

Both live roles were translated from the Ukrainian originals and now exist in
three places, which will collapse to one once the sync runs:

| Role | Repo | Notion DB | Public Notion page |
|---|---|---|---|
| Video Editor | `video-editor.md` | created 2026-07-28 | still live |
| Creative Producer | `creative-producer.md` | created 2026-07-28 | still live |

The site is English-only and both roles ask for English, so the postings are in
English — a Ukrainian JD on an English page would break both the reading
experience and the JobPosting markup Google reads.

Two things found in the originals that the new page deliberately drops:

- Creative Producer linked a Google Form using a `/edit` URL, which sends a
  candidate into the form editor they have no access to. It was broken for
  anyone who clicked it.
- Between the index page and the two postings there were three different ways to
  apply — a Google Form, `info@calma.io`, and a Telegram handle. That is the
  incongruence this rebuild exists to remove; if the Telegram route should
  survive, it belongs in `src/data/hiring.ts`, not in a job description.

## Known IDs

- Notion **Vacancies DB** `481ef85f-ed6f-42e6-87af-b9049779913a` (under Staff, private)
- Notion **Applications DB** `25db583f-46d6-4e95-8241-9f0eb3dedeb5` — schema matches
  the form fields exactly
- n8n intake workflow `yeqK7GR7QKScSmIN`, credential "Notion account"
  (`cBsG1YOO9AY4Q346`), CORS: calma.io + localhost:4321
- Prod webhook for `PUBLIC_N8N_WEBHOOK`:
  `https://nnnnnnnn.calma.ad/webhook/calma-hiring-apply`

## Out of scope, tracked separately

**Astro 7 upgrade.** We are on 6.4.5; current is 7.1.4 (Rust compiler, Vite 8 +
Rolldown, builds 15–61% faster). Breaking changes that touch us: strict HTML
validation — unclosed tags now error instead of being silently repaired; and
JSX-style whitespace — a newline between inline elements no longer renders a space.
The Markdown pipeline moving to a Rust engine does not affect us, since
`astro.config.mjs` already pins `processor: unified({ smartypants: false })`.

Do this **after** hiring ships, in its own branch. It needs a full visual QA pass
across every page type, and mixing that with a new feature guarantees not knowing
which change broke what.
