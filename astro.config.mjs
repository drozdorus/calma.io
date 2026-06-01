// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://calma.io',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    // Keep straight quotes/apostrophes verbatim — the legacy articles use them.
    // GFM (tables, etc.) stays on; disabling smartypants only affects quote glyphs.
    smartypants: false,
  },
  integrations: [sitemap()],
});
