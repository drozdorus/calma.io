import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog articles — currently 3, migrated from blog/<slug>/index.html.
// JSON-LD FAQPage is generated from `faq[]`; `related[]` lists sibling slugs.
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonical: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    /** twitter:description override (defaults to ogDescription) */
    twitterDescription: z.string().optional(),
    /** Article JSON-LD description (defaults to `description`; legacy differs on some pages) */
    articleDescription: z.string().optional(),
    date: z.coerce.date(),
    /** listing tie-break for equal dates — lower shows first (homepage + /blog/) */
    order: z.number().default(0),
    // Presentation metadata for the article hero + cards (parity with legacy HTML).
    tag: z.string(),
    /** mint variant of the .article-tag pill (Paid Acquisition) */
    tagMint: z.boolean().default(false),
    readTime: z.string().default('5 min read'),
    /** short label shown in the breadcrumb's current crumb */
    breadcrumbLabel: z.string(),
    /** hero lead paragraph (differs from `description`) */
    lead: z.string(),
    /** canonical one-liner used when this article appears in a related-card */
    relatedDesc: z.string(),
    /** raw HTML rendered inside .article-prose after the FAQ block (e.g. legal disclaimer) */
    afterFaq: z.string().optional(),
    faq: z
      .array(
        z.object({
          // Question text for the FAQPage JSON-LD `name`.
          question: z.string(),
          // Summary text shown in the rendered <details> (falls back to `question`).
          questionRendered: z.string().optional(),
          // Rendered answer (verbatim from the <details> block).
          answer: z.string(),
          // Shorter text used in the FAQPage JSON-LD (falls back to `answer`).
          schemaText: z.string().optional(),
        })
      )
      .optional(),
    related: z.array(z.string()).optional(),
  }),
});

// Phase 2 — per-vertical "what we do" landing pages at /lead-generation/<vertical>/.
// SEO + client-generation surfaces (distinct from the editorial blog). The page
// body (Markdown) holds the overview prose; the structured blocks below drive the
// hero, methodology pillars, FAQ and CTA so every vertical page has the same shape.
const verticals = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/verticals' }),
  schema: z.object({
    // <head>
    title: z.string(),
    description: z.string(),
    canonical: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    // Ordering of the vertical in any future index.
    order: z.number().default(0),
    // Hero
    h1: z.string(),
    heroLead: z.string(),
    /** short label for the breadcrumb's current crumb */
    breadcrumbLabel: z.string(),
    // "How we do it" — three pillars (tailored per vertical).
    pillars: z
      .array(z.object({ label: z.string(), desc: z.string() }))
      .length(3),
    // SEO FAQ.
    faq: z.array(z.object({ question: z.string(), answer: z.string() })),
    // Closing call-to-action band.
    cta: z.object({ heading: z.string(), text: z.string() }),
  }),
});

export const collections = { blog, verticals };
