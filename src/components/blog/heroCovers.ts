// Per-article hero cover SVGs — kept verbatim from the legacy blog/<slug>/index.html
// .article-cover--hero markup. Keyed by slug; the [...slug] template injects the
// matching one with set:html so output is byte-identical to the static pages.
export const heroCovers: Record<string, string> = {
  'us-auto-insurance-market': `<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="960" height="240" fill="#0d0d0d"/>
              <rect x="60" y="170" width="50" height="70" rx="3" fill="#E8B547" fill-opacity="0.15"/>
              <rect x="120" y="140" width="50" height="100" rx="3" fill="#E8B547" fill-opacity="0.22"/>
              <rect x="180" y="108" width="50" height="132" rx="3" fill="#E8B547" fill-opacity="0.32"/>
              <rect x="240" y="128" width="50" height="112" rx="3" fill="#E8B547" fill-opacity="0.22"/>
              <rect x="300" y="152" width="50" height="88" rx="3" fill="#E8B547" fill-opacity="0.16"/>
              <rect x="360" y="142" width="50" height="98" rx="3" fill="#E8B547" fill-opacity="0.2"/>
              <line x1="0" y1="170" x2="960" y2="170" stroke="#E8B547" stroke-opacity="0.07" stroke-width="1"/>
              <text x="480" y="135" text-anchor="middle" font-family="system-ui,sans-serif" font-size="64" font-weight="800" fill="#E8B547" fill-opacity="0.07">$312B</text>
              <text x="480" y="162" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" letter-spacing="0.18em" fill="#E8B547" fill-opacity="0.1">US AUTO INSURANCE MARKET</text>
              <defs><linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="1"/><stop offset="55%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="960" height="140" fill="url(#hg1)"/>
            </svg>`,
  'meta-auto-insurance-ads': `<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="960" height="240" fill="#0d0d0d"/>
              <line x1="150" y1="90" x2="380" y2="165" stroke="#3DD68C" stroke-opacity="0.14" stroke-width="1.5"/>
              <line x1="150" y1="90" x2="480" y2="70" stroke="#3DD68C" stroke-opacity="0.11" stroke-width="1.5"/>
              <line x1="380" y1="165" x2="620" y2="130" stroke="#3DD68C" stroke-opacity="0.14" stroke-width="1.5"/>
              <line x1="480" y1="70" x2="620" y2="130" stroke="#3DD68C" stroke-opacity="0.1" stroke-width="1.5"/>
              <line x1="620" y1="130" x2="800" y2="180" stroke="#3DD68C" stroke-opacity="0.11" stroke-width="1.5"/>
              <line x1="380" y1="165" x2="500" y2="205" stroke="#3DD68C" stroke-opacity="0.09" stroke-width="1.5"/>
              <line x1="800" y1="180" x2="880" y2="145" stroke="#3DD68C" stroke-opacity="0.08" stroke-width="1.5"/>
              <line x1="480" y1="70" x2="350" y2="40" stroke="#3DD68C" stroke-opacity="0.07" stroke-width="1"/>
              <circle cx="150" cy="90" r="9" fill="#3DD68C" fill-opacity="0.32"/>
              <circle cx="380" cy="165" r="13" fill="#3DD68C" fill-opacity="0.42"/>
              <circle cx="480" cy="70" r="8" fill="#3DD68C" fill-opacity="0.28"/>
              <circle cx="620" cy="130" r="18" fill="#3DD68C" fill-opacity="0.36"/>
              <circle cx="800" cy="180" r="9" fill="#3DD68C" fill-opacity="0.26"/>
              <circle cx="500" cy="205" r="6" fill="#3DD68C" fill-opacity="0.2"/>
              <circle cx="880" cy="145" r="7" fill="#3DD68C" fill-opacity="0.18"/>
              <circle cx="350" cy="40" r="5" fill="#3DD68C" fill-opacity="0.16"/>
              <defs><linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="1"/><stop offset="55%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="960" height="140" fill="url(#hg2)"/>
            </svg>`,
  'ny-ai-advertising-law': `<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="960" height="240" fill="#0d0d0d"/>
              <line x1="0" y1="80" x2="960" y2="80" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="0" y1="160" x2="960" y2="160" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="240" y1="0" x2="240" y2="240" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="480" y1="0" x2="480" y2="240" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="720" y1="0" x2="720" y2="240" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="380" y1="72" x2="580" y2="72" stroke="#E8B547" stroke-opacity="0.45" stroke-width="2"/>
              <line x1="480" y1="55" x2="480" y2="185" stroke="#E8B547" stroke-opacity="0.3" stroke-width="2"/>
              <line x1="380" y1="72" x2="380" y2="130" stroke="#3DD68C" stroke-opacity="0.45" stroke-width="2"/>
              <line x1="580" y1="72" x2="580" y2="130" stroke="#E8B547" stroke-opacity="0.45" stroke-width="2"/>
              <circle cx="380" cy="148" r="24" fill="none" stroke="#3DD68C" stroke-opacity="0.38" stroke-width="2"/>
              <circle cx="580" cy="148" r="24" fill="none" stroke="#E8B547" stroke-opacity="0.38" stroke-width="2"/>
              <text x="369" y="153" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#3DD68C" fill-opacity="0.55">AI</text>
              <text x="558" y="153" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#E8B547" fill-opacity="0.55">LAW</text>
              <defs><linearGradient id="hg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="1"/><stop offset="50%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="960" height="130" fill="url(#hg3)"/>
            </svg>`,
};
