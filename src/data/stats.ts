// Homepage "By the Numbers" block. Figures must stay defensible: rounded
// down, sources noted. Never add spend, revenue, payouts or partner counts —
// the audience includes buyers and partners, and those numbers are leverage.

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  // 445,816 approved conversions, 2025-05-31 → 2026-09-27:
  // SELECT count(*) FROM redtrack_conversions WHERE status = 'approved'
  { value: '400K+', label: 'leads delivered' },
  // ops.creatives had 8,686 on 2026-09-27; owner: part of production is not
  // tracked there, so the true total is past 10K.
  { value: '10K+', label: 'creatives tested' },
  // Owner's figure (2026-09-27): typical idea-to-live time for a campaign.
  { value: '3 days', label: 'from idea to launch' },
  { value: 'No cap', label: 'on scaling budgets' },
];
