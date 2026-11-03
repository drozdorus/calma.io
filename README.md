# calma.io

Corporate website for [Calma](https://calma.io), a performance lead generation company.

Stack: Astro 7, static. Deployed via GitHub Actions → GitHub Pages on every push to `main`.

```sh
npm ci
npm run dev     # http://localhost:4321
npm run build   # → dist/
```

## Content

- Blog posts: `src/content/blog/<slug>.md`
- Vertical pages: `src/content/verticals/<slug>.md` → `/lead-generation/<slug>/`
- Vacancies: `src/content/vacancies/<slug>.md` (copy `_template.md`; set `status: closed` to take a role down)
- Events, team, organization data: `src/data/`
