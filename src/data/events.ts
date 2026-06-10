// Single source of truth for industry events. The homepage derives everything
// from this list at build time: upcoming cards, past pills, and the JSON-LD
// Event entries — an event "moves" from upcoming to past automatically once
// its end date passes (deploy.yml also rebuilds weekly so this happens even
// without pushes).
//
// JSON-LD inclusion is gated on `description`: events with full schema data
// (the ones we announced while upcoming) keep their Event entry with
// eventStatus derived from the date; older past events only render as pills.

export interface CalmaEvent {
  /** Short display name for the card / pill (e.g. "Affiliate World") */
  name: string;
  /** JSON-LD Event name with edition/year (defaults to `name`) */
  schemaName?: string;
  /** JSON-LD description — presence opts the event into the Event schema */
  description?: string;
  /** YYYY-MM-DD. For old events where only the month is known, use the 1st. */
  start: string;
  /** YYYY-MM-DD (same as start for one-day events) */
  end: string;
  location: string;
  url?: string;
  organizer?: { name: string; url: string };
  /** schema.org offer availability (defaults to InStock) */
  availability?: 'InStock' | 'SoldOut';
  /** Upcoming-card logo */
  logo?: { src: string; alt: string };
  /** Upcoming-card link caption (bare domain) */
  linkLabel?: string;
}

export const events: CalmaEvent[] = [
  // — Announced with full schema data —
  {
    name: 'SBC Summit Americas',
    schemaName: 'SBC Summit Americas 2026',
    description:
      'Premier gaming and sports betting conference connecting operators, affiliates, and technology providers across the Americas.',
    start: '2026-06-09',
    end: '2026-06-11',
    location: 'Fort Lauderdale, US',
    url: 'https://sbcevents.com/sbc-summit-americas/',
    organizer: { name: 'SBC Events', url: 'https://sbcevents.com' },
    logo: { src: '/img/sbc-logo-white.svg', alt: 'SBC Summit Americas' },
    linkLabel: 'sbcevents.com',
  },
  {
    name: 'Affiliate World',
    schemaName: 'Affiliate World Europe 2026',
    description:
      'Premier affiliate marketing conference bringing together top affiliates, networks, and advertisers.',
    start: '2026-07-09',
    end: '2026-07-10',
    location: 'Budapest, Hungary',
    url: 'https://affiliateworldconferences.com/europe',
    organizer: { name: 'Affiliate World Conferences', url: 'https://affiliateworldconferences.com' },
    logo: { src: '/img/aw-logo.png', alt: 'Affiliate World' },
    linkLabel: 'affiliateworldconferences.com',
  },
  {
    name: 'Affiliate Takeover',
    schemaName: 'Affiliate Takeover Barcelona 2026',
    description:
      'Exclusive affiliate marketing event focused on networking and advanced performance marketing strategies.',
    start: '2026-07-16',
    end: '2026-07-17',
    location: 'Barcelona, Spain',
    url: 'https://www.affiliatetakeover.com/barcelona',
    organizer: { name: 'Affiliate Takeover', url: 'https://www.affiliatetakeover.com' },
    logo: { src: '/img/ato-logo.png', alt: 'Affiliate Takeover' },
    linkLabel: 'affiliatetakeover.com',
  },
  {
    name: 'Affiliate Summit East',
    schemaName: 'Affiliate Summit East 2026',
    description:
      "North America's largest performance marketing event connecting affiliates, advertisers, networks, and technology providers.",
    start: '2026-07-27',
    end: '2026-07-28',
    location: 'New York, US',
    url: 'https://affiliatesummit.com/east',
    organizer: { name: 'Affiliate Summit', url: 'https://affiliatesummit.com' },
    logo: { src: '/img/ase-logo.png', alt: 'Affiliate Summit' },
    linkLabel: 'affiliatesummit.com',
  },
  {
    name: 'Affiliate Summit West',
    schemaName: 'Affiliate Summit West 2027',
    description:
      'The flagship performance marketing conference in Las Vegas, connecting affiliates, advertisers, and industry leaders.',
    start: '2027-01-12',
    end: '2027-01-14',
    location: 'Las Vegas, US',
    url: 'https://affiliatesummit.com/west',
    organizer: { name: 'Affiliate Summit', url: 'https://affiliatesummit.com' },
    logo: { src: '/img/asw-logo.png', alt: 'Affiliate Summit' },
    linkLabel: 'affiliatesummit.com',
  },
  {
    name: 'Miami Tech Mixer',
    schemaName: 'Miami Tech Mixer 2026',
    description:
      'Networking event for tech professionals, entrepreneurs, and investors in Miami.',
    start: '2026-05-28',
    end: '2026-05-28',
    location: 'Miami, US',
    url: 'https://www.eventbrite.com/e/miami-tech-mixer-2026-tickets-1988572379518',
    organizer: { name: 'Miami Tech Mixer', url: 'https://www.eventbrite.com/o/78289113293' },
  },
  {
    name: 'DigiMarCon Midwest',
    schemaName: 'DigiMarCon Midwest 2026',
    description:
      'Digital marketing conference covering SEO, PPC, social media, content marketing, and lead generation strategies.',
    start: '2026-05-19',
    end: '2026-05-20',
    location: 'Chicago, US',
    url: 'https://digimarconmidwest.com/',
    organizer: { name: 'DigiMarCon', url: 'https://digimarcon.com' },
    availability: 'SoldOut',
  },

  // — Older past events (pill-only, month precision) —
  { name: 'LeadsCon', start: '2026-04-01', end: '2026-04-01', location: 'Las Vegas, US' },
  { name: 'Affiliate Summit West', start: '2026-01-01', end: '2026-01-01', location: 'Las Vegas, US' },
  { name: 'Web Summit', start: '2025-11-01', end: '2025-11-01', location: 'Lisbon, Portugal' },
  // SBC ran mid-September, Affiliate World early September — days kept so the
  // past list sorts SBC first within the month.
  { name: 'SBC', start: '2025-09-16', end: '2025-09-18', location: 'Lisbon, Portugal' },
  { name: 'Affiliate World Europe', start: '2025-09-04', end: '2025-09-05', location: 'Budapest, Hungary' },
  { name: 'Affiliate Summit East', start: '2025-08-01', end: '2025-08-01', location: 'New York, US' },
  { name: 'AppGala', start: '2025-04-01', end: '2025-04-01', location: 'Warsaw, Poland' },
  { name: 'Affiliate Takeover', start: '2024-07-01', end: '2024-07-01', location: 'Barcelona, Spain' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d };
}

/** "9-11 Jun 2026" / "28 May 2026" / "30 Jun - 1 Jul 2026" */
export function formatUpcomingDate(e: CalmaEvent): string {
  const s = parts(e.start);
  const en = parts(e.end);
  if (e.start === e.end) return `${s.d} ${MONTHS[s.m - 1]} ${s.y}`;
  if (s.m === en.m && s.y === en.y) return `${s.d}-${en.d} ${MONTHS[s.m - 1]} ${s.y}`;
  return `${s.d} ${MONTHS[s.m - 1]} - ${en.d} ${MONTHS[en.m - 1]} ${en.y}`;
}

/** "May 2026" */
export function formatPastDate(e: CalmaEvent): string {
  const en = parts(e.end);
  return `${MONTHS[en.m - 1]} ${en.y}`;
}
