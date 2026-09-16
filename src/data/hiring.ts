// How a candidate reaches us, plus everything the JobPosting markup needs.
//
// A vacancy file describes the ROLE; this file decides where applications go.
// Nobody writes a contact address into a job description — not in the Markdown
// here, not in a LinkedIn post. They all point at /hiring/, and this file is the
// one place that says what /hiring/ does with an application.
import { getCollection } from 'astro:content';
import { site } from './site';

/**
 * n8n webhook that turns a submitted form into a row in the Notion
 * "Applications (website)" DB. A PUBLIC_ env value would land in the built HTML
 * anyway, so this is a plain constant: no CI secret, no .env, and `npm run dev`
 * posts to the real thing (its CORS list includes localhost:4321).
 * An empty string hides the form and shows the email route instead.
 */
export const applyWebhook = 'https://nnnnnnnn.calma.ad/webhook/calma-hiring-apply';

/** Fallback contact, also shown next to the form. */
export const applyEmail = site.email;

/** Absolute canonical of the hub. */
export const hiringUrl = `https://calma.io${site.hiring}`;

/** Dropdown option for candidates applying without a specific opening. */
export const openApplicationLabel = 'Open application';

/**
 * How long a posting stays listed with Google after `datePosted` when the
 * vacancy file sets no `validThrough`. Past that date the page stays up but the
 * JobPosting markup is dropped — Google treats expired postings as an error.
 * A role still open after 90 days is a re-post: bump `datePosted`.
 */
export const defaultValidityDays = 90;

/** hiringOrganization for JobPosting JSON-LD. */
export const organization = {
  name: 'Calma',
  url: 'https://calma.io',
  logo: 'https://calma.io/img/logo.svg',
} as const;

/**
 * Default jobLocation for JobPosting JSON-LD. Google requires a location even
 * for remote roles; the TELECOMMUTE flag on the posting is what marks it remote.
 */
export const defaultJobLocation = {
  addressCountry: 'CY',
  addressLocality: 'Limassol',
} as const;

/** Maps our human-readable `type` onto schema.org employmentType. */
export const employmentTypeMap: Record<string, string> = {
  'Full-time': 'FULL_TIME',
  'Part-time': 'PART_TIME',
  Contract: 'CONTRACTOR',
  Internship: 'INTERN',
};

/**
 * Open vacancies in display order. The header (nav dot), the hub, the role
 * pages and the apply form all read this, so they can never disagree on what
 * is open. Zero is the normal state for most of the year — we run 0–2 openings
 * at a time — and every consumer is built for it.
 */
export async function getOpenVacancies() {
  const open = await getCollection('vacancies', (v) => v.data.status === 'open');
  return open.sort(
    (a, b) =>
      a.data.order - b.data.order ||
      b.data.datePosted.valueOf() - a.data.datePosted.valueOf()
  );
}
