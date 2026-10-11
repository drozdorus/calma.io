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

## Search engines

`calma.io` is a domain property in both Google Search Console and Bing Webmaster Tools
(owner's account). Bing → Recommendations is where title and markup complaints surface;
the 2026-10-11 sweep (short/long titles, no IndexNow) is what the rules below come from.

**Titles:** Bing flags a `<title>` under ~30 or over 70 characters and Google truncates
around 60, so keep every page at 40–60. Blog posts and vacancies set `title` (the tag,
with the " — Calma" suffix) and `ogTitle` (the h1 / share title, no suffix) separately,
so a long headline can stay on the page while the tag gets a shorter rewrite. Audit after
a build:

```sh
for f in $(find dist -name index.html); do t=$(grep -o '<title>[^<]*' "$f" | cut -c8-); echo "${#t} $f"; done | sort -n
```

**IndexNow:** the `indexnow` job in `.github/workflows/deploy.yml` posts every sitemap URL
to `api.indexnow.org` after each push-triggered deploy (not the weekly cron), so Bing,
Yandex, Naver and Seznam recrawl within minutes instead of waiting for a crawl. The key is
public by design: `public/19d650364f2f508b0e54c881db8783b3.txt` (content = the key) and
`INDEXNOW_KEY` in the workflow must match. Rotate with `openssl rand -hex 16`, renaming the
file and updating the env in one commit. Verify in Bing WMT → IndexNow (submitted URLs show
up within a day), or re-run the job from the Actions tab. Manual submit from the Mac:

```sh
curl -sS -o /dev/null -w '%{http_code}\n' 'https://api.indexnow.org/indexnow?url=https://calma.io/&key=19d650364f2f508b0e54c881db8783b3'
```
