// Single source of truth for how a candidate reaches us.
//
// A vacancy describes the ROLE; this file decides where applications go. Nobody
// writes a contact address into a job description — not in the Markdown here,
// not in Notion, not in a LinkedIn post. They all point at /hiring/, and this
// file is the one place that says what /hiring/ does with an application.
//
// Changing the apply target = editing this file. Nothing else.

/** Where the apply form posts. Empty string disables the form and shows the email fallback. */
export const applyWebhook = import.meta.env.PUBLIC_N8N_WEBHOOK ?? '';

/** Fallback contact, also shown next to the form. */
export const applyEmail = 'info@calma.io';

/** Canonical page a candidate should ever be sent to. */
export const hiringUrl = 'https://calma.io/hiring/';

/** Option shown in the role dropdown when someone applies without a specific opening. */
export const openApplicationLabel = 'Open Application';

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
