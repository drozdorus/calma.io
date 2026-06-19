// Single source of truth for the homepage team section. Cards render from
// this list; the per-card accent color is computed — a mint→amber gradient
// spread evenly across the roster — so adding/removing a member never means
// recalculating nine rgba values by hand again.

export interface TeamMember {
  /** Display name on the card */
  name: string;
  /** Portrait alt text (full name) */
  alt: string;
  /** Portrait file in /img/team/ */
  img: string;
  role: string;
  website?: string;
  linkedin?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Rus',
    alt: 'Ruslan',
    img: 'rus.svg',
    role: 'Chief of Chaos',
    website: 'https://drozdorus.com',
    linkedin: 'https://www.linkedin.com/in/drozdorus/',
  },
  { name: 'Yehor', alt: 'Yehor', img: 'yehor.svg', role: 'Bizdev Machine' },
  {
    name: 'Artur',
    alt: 'Artur',
    img: 'artur.svg',
    role: 'Traffic Tamer',
    linkedin: 'https://www.linkedin.com/in/artur-bielyk-2351a5185/',
  },
  { name: 'Zak', alt: 'Zack', img: 'zak.svg', role: 'Creative Ops Overlord' },
  {
    name: 'Nastia',
    alt: 'Nastia',
    img: 'nastya.svg',
    role: 'Process Ninja',
    linkedin: 'https://www.linkedin.com/in/anastasiia-stefinin-140792256/',
  },
  { name: 'Val', alt: 'Val', img: 'val.svg', role: 'Encoded' },
  { name: 'Lisa', alt: 'Lisa', img: 'lisa.svg', role: 'Cut & Hook Specialist' },
  { name: 'Max', alt: 'Max', img: 'max.svg', role: 'Frame Surgeon' },
  { name: 'Alex', alt: 'Alex', img: 'alex.svg', role: 'Pixel Perfectionist' },
  {
    name: 'Julia',
    alt: 'Julia',
    img: 'julia.svg',
    role: 'Numbers Whisperer',
    linkedin: 'https://www.linkedin.com/in/yulia-gorodenska-a57109264/',
  },
  { name: 'Vik', alt: 'Vik', img: 'vik.svg', role: 'Talent Scout' },
];

const MINT = [61, 214, 140]; // --secondary
const AMBER = [232, 181, 71]; // --primary

/** Card accent: linear mint→amber interpolation across the roster. */
export function accentFor(index: number, count: number): string {
  const t = count > 1 ? index / (count - 1) : 0;
  const [r, g, b] = MINT.map((from, i) => Math.round(from + (AMBER[i] - from) * t));
  return `rgba(${r},${g},${b},0.6)`;
}
