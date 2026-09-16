# TODO

Backlog for calma.io. Closed items get checked off with the date, not deleted.

## Hiring

- [x] 2026-09-16 — **Owner:** share the Notion DB "Applications (website)" with the `n8n` integration (open the DB → ••• → Connections → n8n). The intake workflow is active but its Notion write fails with "Could not find database … make sure it is shared with your integration" (execution 101990, 2026-09-16). Then re-run the smoke test: `curl -X POST https://nnnnnnnn.calma.ad/webhook/calma-hiring-apply -H 'Content-Type: application/json' -d '{"name":"TEST","email":"t@example.com","role":"Open application","message":"test"}'` must return `{ "ok": true }` and a row must appear in the DB.
- [ ] Alert on intake **failures**: successful applications post to the hiring topic via Morse (since 2026-09-16), but n8n still has no error workflow, so a failing Notion write is visible only to the candidate (the form treats anything but `{ ok: true }` as an error and shows the email route). Add an Error Trigger workflow posting to the owner's DM through Morse and set it as the intake workflow's error workflow.
- [ ] Public Notion page "Open Vacancies" (`169f120c65df806bba68fc5163bcfa52`, under Staff) — owner's plan (2026-09-16): first replace its content with a "moved to calma.io/hiring/" notice, then unpublish it entirely after one or two weeks (target ≈ 2026-09-30). It is indexed and competes with `/hiring/` for the same queries. Nothing links to it anymore: calma.io and drozdorus.com both point at `/hiring/` since 2026-09-16.
- [ ] Delete the Notion "Vacancies (website)" DB (`481ef85f-ed6f-42e6-87af-b9049779913a`). It was created for a Notion → repo n8n sync that was never built; the repo is the source of truth for vacancies now and nothing reads that DB.
- [x] 2026-09-16 — Language: owner decided **EN only**. If a Ukrainian version is ever revisited: hiring-only (`/uk/hiring/`, `/uk/hiring/<slug>/`), same templates with a strings map, `hreflang` pairs with `x-default` = EN, never a site-wide i18n.
- [ ] After the first deploy: Google Search Console → Enhancements → Job postings. Both role pages carry JobPosting JSON-LD; confirm they validate and note any warnings here.
- [ ] Refactor candidate: `/about/` founders row still hand-writes its team-card markup (it renders buttons, not the shared `TeamCards`). Fold it in if the founders row and the roster ever need to change together.
