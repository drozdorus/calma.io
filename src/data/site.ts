// Sitewide constants used across Header, Footer, and inner pages — one place
// to update the careers path, contact email, and social profiles instead of
// hunting for every hardcoded occurrence.
export const site = {
  email: 'info@calma.io',
  /**
   * Careers hub. The only address a candidate is ever sent to — job boards,
   * LinkedIn posts and Telegram all point here, so the apply route can change
   * in one place (src/data/hiring.ts) without touching any of them.
   */
  hiring: '/hiring/',
  linkedin: 'https://www.linkedin.com/company/calma-io/',
  crunchbase: 'https://www.crunchbase.com/organization/calma-b99b',
};
