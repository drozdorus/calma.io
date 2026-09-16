# calma.io

Corporate website for [Calma](https://calma.io) — performance lead-gen agency.

Stack: Astro 7, static. Deployed via GitHub Actions → GitHub Pages on every push to `main`.

Full documentation: [WEBSITE_OVERVIEW.md](WEBSITE_OVERVIEW.md)

## Hiring

`/hiring/` is the careers hub, `/hiring/<slug>/` one page per open role. Vacancies are
Markdown files in `src/content/vacancies/` — **the repo is the source of truth**, not
Notion. The pages are designed for the real cadence of 0–2 openings at a time: with
nothing open the hub still works (empty-state card, "Open application" in the form).

**Open a role:** copy `src/content/vacancies/_template.md` to `<slug>.md` (the slug is
the URL), fill the frontmatter, write the description, push to `main`. The card, the
page, the form option, the nav dot and the JobPosting markup all follow from the file.
No local git? Edit the file in GitHub's web editor — the deploy runs on merge.

**Close a role:** set `status: closed`, push. The page and its markup disappear (the old
link 404s, which is what Google asks for); the file stays for the next time.

**Where applications go:** both pages render `ApplyForm.astro`, which posts JSON to the
n8n webhook in `src/data/hiring.ts` → workflow **"Calma.io Hiring | Application Intake"**
(`yeqK7GR7QKScSmIN` on `apps`, active since 2026-09-16, CORS: calma.io + localhost:4321)
→ Notion DB **Applications (website)** (`25db583f-46d6-4e95-8241-9f0eb3dedeb5`, under
Staff; fields Name, Email, Role, Portfolio, Message, Status) → a Telegram post through
**Morse** (`@calmamorsebot`, n8n credential "Morse (@calmamorsebot)") into the team group's
**hiring** topic (chat `-1002210960589`, thread `63288`; since 2026-09-16) with role, name,
email, portfolio, message and the Notion link. The Telegram node continues on failure, so a
missing notification never fails the candidate's submission. An empty webhook constant
swaps the form for the email route. Where to apply is decided only in `hiring.ts` —
never write a contact address into a job description.

**Check it works:** `npm run build` must list `/hiring/<slug>/` for every open role.
After a deploy, submit the form once and look for the row in Notion. Search Console →
Enhancements → Job postings shows whether Google accepted the markup.
