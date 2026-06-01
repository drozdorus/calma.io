// Small (480×150) article-card cover SVGs, keyed by slug. Shared by the homepage
// blog teaser and the /blog/ index so the artwork lives in one place. The larger
// 960×240 hero variants used on the article pages live in `heroCovers.ts`.
export const cardCovers: Record<string, string> = {
  'us-auto-insurance-market': `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="480" height="150" fill="#0d0d0d"/>
              <rect x="30" y="95" width="28" height="55" rx="2" fill="#E8B547" fill-opacity="0.18"/>
              <rect x="68" y="75" width="28" height="75" rx="2" fill="#E8B547" fill-opacity="0.28"/>
              <rect x="106" y="58" width="28" height="92" rx="2" fill="#E8B547" fill-opacity="0.32"/>
              <rect x="144" y="72" width="28" height="78" rx="2" fill="#E8B547" fill-opacity="0.22"/>
              <rect x="182" y="88" width="28" height="62" rx="2" fill="#E8B547" fill-opacity="0.18"/>
              <line x1="0" y1="88" x2="480" y2="88" stroke="#E8B547" stroke-opacity="0.07" stroke-width="1"/>
              <text x="290" y="72" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="#E8B547" fill-opacity="0.12">$312B</text>
              <defs><linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="1"/><stop offset="55%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="480" height="80" fill="url(#cg1)"/>
            </svg>`,
  'meta-auto-insurance-ads': `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="480" height="150" fill="#0d0d0d"/>
              <line x1="80" y1="55" x2="190" y2="95" stroke="#3DD68C" stroke-opacity="0.15" stroke-width="1"/>
              <line x1="80" y1="55" x2="240" y2="42" stroke="#3DD68C" stroke-opacity="0.12" stroke-width="1"/>
              <line x1="190" y1="95" x2="310" y2="75" stroke="#3DD68C" stroke-opacity="0.15" stroke-width="1"/>
              <line x1="240" y1="42" x2="310" y2="75" stroke="#3DD68C" stroke-opacity="0.1" stroke-width="1"/>
              <line x1="310" y1="75" x2="400" y2="110" stroke="#3DD68C" stroke-opacity="0.12" stroke-width="1"/>
              <line x1="190" y1="95" x2="250" y2="125" stroke="#3DD68C" stroke-opacity="0.1" stroke-width="1"/>
              <line x1="400" y1="110" x2="440" y2="85" stroke="#3DD68C" stroke-opacity="0.08" stroke-width="1"/>
              <circle cx="80" cy="55" r="5" fill="#3DD68C" fill-opacity="0.35"/>
              <circle cx="190" cy="95" r="7" fill="#3DD68C" fill-opacity="0.45"/>
              <circle cx="240" cy="42" r="4" fill="#3DD68C" fill-opacity="0.28"/>
              <circle cx="310" cy="75" r="10" fill="#3DD68C" fill-opacity="0.38"/>
              <circle cx="400" cy="110" r="5" fill="#3DD68C" fill-opacity="0.28"/>
              <circle cx="250" cy="125" r="3" fill="#3DD68C" fill-opacity="0.22"/>
              <circle cx="440" cy="85" r="4" fill="#3DD68C" fill-opacity="0.2"/>
              <defs><linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="1"/><stop offset="50%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="480" height="65" fill="url(#cg2)"/>
            </svg>`,
  'ny-ai-advertising-law': `<svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="480" height="150" fill="#0d0d0d"/>
              <line x1="0" y1="50" x2="480" y2="50" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="0" y1="100" x2="480" y2="100" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="120" y1="0" x2="120" y2="150" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="240" y1="0" x2="240" y2="150" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="360" y1="0" x2="360" y2="150" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
              <line x1="195" y1="45" x2="285" y2="45" stroke="#E8B547" stroke-opacity="0.45" stroke-width="1.5"/>
              <line x1="240" y1="35" x2="240" y2="115" stroke="#E8B547" stroke-opacity="0.3" stroke-width="1.5"/>
              <line x1="195" y1="45" x2="195" y2="80" stroke="#3DD68C" stroke-opacity="0.45" stroke-width="1.5"/>
              <line x1="285" y1="45" x2="285" y2="80" stroke="#E8B547" stroke-opacity="0.45" stroke-width="1.5"/>
              <circle cx="195" cy="88" r="14" fill="none" stroke="#3DD68C" stroke-opacity="0.38" stroke-width="1.5"/>
              <circle cx="285" cy="88" r="14" fill="none" stroke="#E8B547" stroke-opacity="0.38" stroke-width="1.5"/>
              <text x="187" y="92" font-family="system-ui,sans-serif" font-size="9" font-weight="600" fill="#3DD68C" fill-opacity="0.55">AI</text>
              <text x="274" y="92" font-family="system-ui,sans-serif" font-size="9" font-weight="600" fill="#E8B547" fill-opacity="0.55">LAW</text>
              <defs><linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a0a" stop-opacity="1"/><stop offset="45%" stop-color="#0a0a0a" stop-opacity="0"/></linearGradient></defs>
              <rect width="480" height="65" fill="url(#cg3)"/>
            </svg>`,
};
