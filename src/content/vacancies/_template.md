---
title: Creative Producer
shortDescription: Own the creative pipeline end to end — from brief to the asset that ships.
type: Full-time
department: Marketing
location: Remote
remote: true
status: open
datePosted: 2026-01-01
order: 0
# Optional. Where else this role is posted — shown as a quieter second route
# next to the form, for candidates who already have a profile there. Omit and
# nothing renders. Applications arriving this way land in the platform's inbox,
# not in the Notion Applications DB.
applyLinks:
  - platform: DOU
    url: https://jobs.dou.ua/companies/example/vacancies/
  - platform: Djinni
    url: https://djinni.co/jobs/example/
---

Underscore-prefixed files never render — this one documents the shape.

**To open a role:** copy this file to `<slug>.md` (the slug becomes the URL,
`/hiring/<slug>/`), fill in the frontmatter, write the body in ordinary
Markdown, push to `main`. The card, the page, the form option, the nav dot and
the JobPosting markup all follow from the file.

**To close a role:** set `status: closed` and push. The page and its markup
disappear; the file stays for history and for the next time we hire the role.

Three rules that matter beyond formatting:

1. **Never put a contact address in here.** Where to apply is decided by
   `src/data/hiring.ts`, so it can change in one place. A job description says
   what the role is, nothing about how to reach us.
2. **`datePosted` is the day it went live.** Google lists the posting for 90
   days from it (`validThrough` is optional and overrides that). A role still
   open after 90 days is a re-post: bump `datePosted`, don't let it expire.
3. **The body is the whole story.** Google reads it as the job description, so
   write it for the candidate, not as a teaser for the "real" posting elsewhere.

## What you'll do

- A concrete responsibility, not a vague aspiration
- Another one

## What we're looking for

- The experience that actually matters
- The tool or skill that is genuinely required

## Nice to have

- The thing that is a bonus rather than a filter
