// Per-article hero cover SVGs (960×240) — same composition and figure as the
// matching small card in `cardCovers.ts`, scaled up, so a card and its article
// hero read as one piece. Keyed by slug; the [...slug] template injects the
// matching one with set:html.
export const heroCovers: Record<string, string> = {
  'us-auto-insurance-market': `<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="960" height="240" fill="#0d0d0d"/>
              <rect x="60" y="170" width="50" height="70" rx="3" fill="#E8B547" fill-opacity="0.32"/>
              <rect x="120" y="140" width="50" height="100" rx="3" fill="#E8B547" fill-opacity="0.44"/>
              <rect x="180" y="108" width="50" height="132" rx="3" fill="#E8B547" fill-opacity="0.6"/>
              <rect x="240" y="128" width="50" height="112" rx="3" fill="#E8B547" fill-opacity="0.44"/>
              <rect x="300" y="152" width="50" height="88" rx="3" fill="#E8B547" fill-opacity="0.32"/>
              <rect x="360" y="142" width="50" height="98" rx="3" fill="#E8B547" fill-opacity="0.38"/>
              <line x1="0" y1="170" x2="960" y2="170" stroke="#E8B547" stroke-opacity="0.18" stroke-width="1"/>
              <text x="620" y="128" text-anchor="middle" font-family="system-ui,sans-serif" font-size="68" font-weight="800" fill="#E8B547" fill-opacity="0.6">$312B</text>
              <text x="620" y="158" text-anchor="middle" font-family="Menlo,monospace" font-size="13" letter-spacing="0.18em" fill="#E8B547" fill-opacity="0.4">US AUTO INSURANCE MARKET</text>
              <defs><linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.5"/><stop offset="42%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="960" height="110" fill="url(#hg1)"/>
            </svg>`,
  'meta-auto-insurance-ads': `<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="960" height="240" fill="#0d0d0d"/>
              <line x1="150" y1="90" x2="380" y2="165" stroke="#3DD68C" stroke-opacity="0.26" stroke-width="2"/>
              <line x1="150" y1="90" x2="480" y2="70" stroke="#3DD68C" stroke-opacity="0.2" stroke-width="2"/>
              <line x1="380" y1="165" x2="620" y2="130" stroke="#3DD68C" stroke-opacity="0.26" stroke-width="2"/>
              <line x1="480" y1="70" x2="620" y2="130" stroke="#3DD68C" stroke-opacity="0.18" stroke-width="2"/>
              <line x1="620" y1="130" x2="800" y2="180" stroke="#3DD68C" stroke-opacity="0.2" stroke-width="2"/>
              <line x1="380" y1="165" x2="500" y2="205" stroke="#3DD68C" stroke-opacity="0.16" stroke-width="2"/>
              <line x1="800" y1="180" x2="880" y2="145" stroke="#3DD68C" stroke-opacity="0.15" stroke-width="2"/>
              <line x1="480" y1="70" x2="350" y2="40" stroke="#3DD68C" stroke-opacity="0.13" stroke-width="1.5"/>
              <circle cx="150" cy="90" r="9" fill="#3DD68C" fill-opacity="0.5"/>
              <circle cx="380" cy="165" r="13" fill="#3DD68C" fill-opacity="0.62"/>
              <circle cx="480" cy="70" r="8" fill="#3DD68C" fill-opacity="0.46"/>
              <circle cx="620" cy="130" r="18" fill="#3DD68C" fill-opacity="0.56"/>
              <circle cx="800" cy="180" r="9" fill="#3DD68C" fill-opacity="0.42"/>
              <circle cx="500" cy="205" r="6" fill="#3DD68C" fill-opacity="0.34"/>
              <circle cx="880" cy="145" r="7" fill="#3DD68C" fill-opacity="0.3"/>
              <circle cx="350" cy="40" r="5" fill="#3DD68C" fill-opacity="0.26"/>
              <text x="740" y="65" text-anchor="middle" font-family="system-ui,sans-serif" font-size="56" font-weight="800" fill="#3DD68C" fill-opacity="0.42">56%</text>
              <text x="740" y="92" text-anchor="middle" font-family="Menlo,monospace" font-size="12" letter-spacing="0.16em" fill="#3DD68C" fill-opacity="0.32">OF OUTCOMES: CREATIVE</text>
              <defs><linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.4"/><stop offset="40%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="960" height="110" fill="url(#hg2)"/>
            </svg>`,
  'ny-ai-advertising-law': `<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="960" height="240" fill="#0d0d0d"/>
              <line x1="0" y1="80" x2="960" y2="80" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="0" y1="160" x2="960" y2="160" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="240" y1="0" x2="240" y2="240" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="480" y1="0" x2="480" y2="240" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="720" y1="0" x2="720" y2="240" stroke="white" stroke-opacity="0.07" stroke-width="1"/>
              <line x1="380" y1="72" x2="580" y2="72" stroke="#E8B547" stroke-opacity="0.65" stroke-width="2"/>
              <line x1="480" y1="55" x2="480" y2="185" stroke="#E8B547" stroke-opacity="0.48" stroke-width="2"/>
              <line x1="380" y1="72" x2="380" y2="130" stroke="#3DD68C" stroke-opacity="0.65" stroke-width="2"/>
              <line x1="580" y1="72" x2="580" y2="130" stroke="#E8B547" stroke-opacity="0.65" stroke-width="2"/>
              <circle cx="380" cy="148" r="24" fill="none" stroke="#3DD68C" stroke-opacity="0.58" stroke-width="2"/>
              <circle cx="580" cy="148" r="24" fill="none" stroke="#E8B547" stroke-opacity="0.58" stroke-width="2"/>
              <text x="380" y="153" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#3DD68C" fill-opacity="0.85">AI</text>
              <text x="580" y="153" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#E8B547" fill-opacity="0.85">LAW</text>
              <defs><linearGradient id="hg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.35"/><stop offset="35%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="960" height="100" fill="url(#hg3)"/>
            </svg>`,
  'fomo-tax-ai-horizon-journal': `<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="960" height="240" fill="#0d0d0d"/>
              <circle cx="90" cy="60" r="3" fill="white" fill-opacity="0.2"/>
              <circle cx="150" cy="190" r="2.5" fill="white" fill-opacity="0.18"/>
              <circle cx="230" cy="50" r="2" fill="white" fill-opacity="0.15"/>
              <circle cx="300" cy="200" r="3" fill="white" fill-opacity="0.19"/>
              <circle cx="420" cy="45" r="2.5" fill="white" fill-opacity="0.15"/>
              <circle cx="560" cy="205" r="2" fill="white" fill-opacity="0.15"/>
              <circle cx="640" cy="55" r="3" fill="white" fill-opacity="0.2"/>
              <circle cx="740" cy="195" r="2.5" fill="white" fill-opacity="0.16"/>
              <circle cx="820" cy="65" r="2" fill="white" fill-opacity="0.15"/>
              <circle cx="890" cy="185" r="3" fill="white" fill-opacity="0.19"/>
              <text x="480" y="108" text-anchor="middle" font-family="system-ui,sans-serif" font-size="62" font-weight="800" fill="#3DD68C" fill-opacity="0.6">FOMO TAX</text>
              <text x="480" y="136" text-anchor="middle" font-family="Menlo,monospace" font-size="12" letter-spacing="0.18em" fill="#3DD68C" fill-opacity="0.4">AI HORIZON JOURNAL</text>
              <polyline points="60,204 190,176 330,208 470,168 610,202 750,178 900,198" fill="none" stroke="#3DD68C" stroke-opacity="0.5" stroke-width="2"/>
              <circle cx="60" cy="204" r="5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="190" cy="176" r="5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="330" cy="208" r="5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="470" cy="168" r="6" fill="#3DD68C" fill-opacity="0.75"/>
              <circle cx="610" cy="202" r="5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="750" cy="178" r="5" fill="#3DD68C" fill-opacity="0.6"/>
              <circle cx="900" cy="198" r="5" fill="#3DD68C" fill-opacity="0.6"/>
              <defs><linearGradient id="hg4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.45"/><stop offset="40%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="960" height="110" fill="url(#hg4)"/>
            </svg>`,
};
