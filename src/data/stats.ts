// Homepage stats strip. Numbers are rounded DOWN to a safe "N+" and must stay
// true: re-check against analytics_data before editing (queries noted below).
// Never add spend, revenue, payouts or partner counts — the audience includes
// buyers and partners, and those numbers are leverage.
import { events } from './events';

const today = new Date().toISOString().slice(0, 10);
const pastEvents = events.filter((e) => e.end < today).length;

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  // 445,816 approved conversions, 2025-05-31 → 2026-09-27:
  // SELECT count(*) FROM redtrack_conversions WHERE status = 'approved'
  { value: '400K+', label: 'leads delivered' },
  // Every state + DC has volume (lowest Wyoming 312), 2026-09-27:
  // redtrack_conversions WHERE country = 'US' GROUP BY region
  { value: '50', label: 'US states covered' },
  // 8,686 distinct creatives since 2025-05-31, 2026-09-27: SELECT count(*) FROM ops.creatives
  { value: '8,000+', label: 'creatives tested' },
  // Derived at build time from events.ts, floored to the nearest 5.
  { value: `${Math.floor(pastEvents / 5) * 5}+`, label: 'industry conferences' },
];
