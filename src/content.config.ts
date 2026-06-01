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
    date: z.coerce.date(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
    related: z.array(z.string()).optional(),
  }),
});

// Phase 2 — per-vertical landing pages at /lead-generation/<vertical>/.
// Loader/schema are wired up now; the content dir is intentionally empty in v1.
const verticals = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/verticals' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonical: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog, verticals };
