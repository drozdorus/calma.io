// Small (480×150) article-card cover SVGs, keyed by slug. Shared by the homepage
// blog teaser and the /blog/ index so the artwork lives in one place. The larger
// 960×240 hero variants used on the article pages live in `heroCovers.ts` — same
// composition, same opacities, so a card and its article hero read as one piece.
// Each cover carries one legible figure or thesis word pulled straight from the
// article's own text (never a new claim) so the card reads as a point, not a
// decorative placeholder.
export const cardCovers: Record<string, string> = {
  'us-auto-insurance-market': `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="480" height="150" fill="#0d0d0d"/>
              <rect x="30" y="95" width="28" height="55" rx="2" fill="#E8B547" fill-opacity="0.38"/>
              <rect x="68" y="75" width="28" height="75" rx="2" fill="#E8B547" fill-opacity="0.52"/>
              <rect x="106" y="58" width="28" height="92" rx="2" fill="#E8B547" fill-opacity="0.62"/>
              <rect x="144" y="72" width="28" height="78" rx="2" fill="#E8B547" fill-opacity="0.46"/>
              <rect x="182" y="88" width="28" height="62" rx="2" fill="#E8B547" fill-opacity="0.36"/>
              <line x1="0" y1="88" x2="480" y2="88" stroke="#E8B547" stroke-opacity="0.18" stroke-width="1"/>
              <text x="285" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="34" font-weight="800" fill="#E8B547" fill-opacity="0.65">$312B</text>
              <text x="285" y="100" text-anchor="middle" font-family="Menlo,monospace" font-size="10" letter-spacing="0.14em" fill="#E8B547" fill-opacity="0.45">US MARKET</text>
              <defs><linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.55"/><stop offset="42%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="480" height="60" fill="url(#cg1)"/>
            </svg>`,
  'meta-auto-insurance-ads': `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="480" height="150" fill="#0d0d0d"/>
              <line x1="80" y1="55" x2="190" y2="95" stroke="#3DD68C" stroke-opacity="0.3" stroke-width="1.5"/>
              <line x1="80" y1="55" x2="240" y2="42" stroke="#3DD68C" stroke-opacity="0.24" stroke-width="1.5"/>
              <line x1="190" y1="95" x2="310" y2="75" stroke="#3DD68C" stroke-opacity="0.3" stroke-width="1.5"/>
              <line x1="240" y1="42" x2="310" y2="75" stroke="#3DD68C" stroke-opacity="0.2" stroke-width="1.5"/>
              <line x1="310" y1="75" x2="400" y2="110" stroke="#3DD68C" stroke-opacity="0.24" stroke-width="1.5"/>
              <line x1="190" y1="95" x2="250" y2="125" stroke="#3DD68C" stroke-opacity="0.2" stroke-width="1.5"/>
              <line x1="400" y1="110" x2="440" y2="85" stroke="#3DD68C" stroke-opacity="0.16" stroke-width="1.5"/>
              <circle cx="80" cy="55" r="5" fill="#3DD68C" fill-opacity="0.55"/>
              <circle cx="190" cy="95" r="7" fill="#3DD68C" fill-opacity="0.68"/>
              <circle cx="240" cy="42" r="4" fill="#3DD68C" fill-opacity="0.48"/>
              <circle cx="310" cy="75" r="10" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="400" cy="110" r="5" fill="#3DD68C" fill-opacity="0.48"/>
              <circle cx="250" cy="125" r="3" fill="#3DD68C" fill-opacity="0.4"/>
              <circle cx="440" cy="85" r="4" fill="#3DD68C" fill-opacity="0.36"/>
              <text x="365" y="40" text-anchor="middle" font-family="system-ui,sans-serif" font-size="30" font-weight="800" fill="#3DD68C" fill-opacity="0.5">56%</text>
              <defs><linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.4"/><stop offset="38%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="480" height="55" fill="url(#cg2)"/>
            </svg>`,
  'ny-ai-advertising-law': `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="480" height="150" fill="#0d0d0d"/>
              <line x1="0" y1="50" x2="480" y2="50" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="0" y1="100" x2="480" y2="100" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="120" y1="0" x2="120" y2="150" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="240" y1="0" x2="240" y2="150" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="360" y1="0" x2="360" y2="150" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="195" y1="45" x2="285" y2="45" stroke="#E8B547" stroke-opacity="0.65" stroke-width="1.5"/>
              <line x1="240" y1="35" x2="240" y2="115" stroke="#E8B547" stroke-opacity="0.48" stroke-width="1.5"/>
              <line x1="195" y1="45" x2="195" y2="80" stroke="#3DD68C" stroke-opacity="0.65" stroke-width="1.5"/>
              <line x1="285" y1="45" x2="285" y2="80" stroke="#E8B547" stroke-opacity="0.65" stroke-width="1.5"/>
              <circle cx="195" cy="88" r="14" fill="none" stroke="#3DD68C" stroke-opacity="0.58" stroke-width="1.5"/>
              <circle cx="285" cy="88" r="14" fill="none" stroke="#E8B547" stroke-opacity="0.58" stroke-width="1.5"/>
              <text x="195" y="91" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" font-weight="700" fill="#3DD68C" fill-opacity="0.85">AI</text>
              <text x="285" y="91" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" font-weight="700" fill="#E8B547" fill-opacity="0.85">LAW</text>
              <defs><linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.35"/><stop offset="35%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="480" height="55" fill="url(#cg3)"/>
            </svg>`,
  'fomo-tax-ai-horizon-journal': `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="480" height="150" fill="#0d0d0d"/>
              <circle cx="45" cy="38" r="2" fill="white" fill-opacity="0.2"/>
              <circle cx="75" cy="119" r="1.7" fill="white" fill-opacity="0.18"/>
              <circle cx="115" cy="32" r="1.4" fill="white" fill-opacity="0.15"/>
              <circle cx="150" cy="125" r="2" fill="white" fill-opacity="0.19"/>
              <circle cx="210" cy="28" r="1.7" fill="white" fill-opacity="0.15"/>
              <circle cx="280" cy="128" r="1.4" fill="white" fill-opacity="0.15"/>
              <circle cx="320" cy="35" r="2" fill="white" fill-opacity="0.2"/>
              <circle cx="370" cy="122" r="1.7" fill="white" fill-opacity="0.16"/>
              <circle cx="410" cy="40" r="1.4" fill="white" fill-opacity="0.15"/>
              <circle cx="445" cy="115" r="2" fill="white" fill-opacity="0.19"/>
              <text x="240" y="70" text-anchor="middle" font-family="system-ui,sans-serif" font-size="32" font-weight="800" fill="#3DD68C" fill-opacity="0.6">FOMO TAX</text>
              <polyline points="30,130 95,104 165,132 235,98 305,128 375,106 450,124" fill="none" stroke="#3DD68C" stroke-opacity="0.5" stroke-width="1.5"/>
              <circle cx="30" cy="130" r="3.5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="95" cy="104" r="3.5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="165" cy="132" r="3.5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="235" cy="98" r="4.5" fill="#3DD68C" fill-opacity="0.75"/>
              <circle cx="305" cy="128" r="3.5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="375" cy="106" r="3.5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="450" cy="124" r="3.5" fill="#3DD68C" fill-opacity="0.6"/>
              <defs><linearGradient id="cg4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.45"/><stop offset="40%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="480" height="60" fill="url(#cg4)"/>
            </svg>`,
};
