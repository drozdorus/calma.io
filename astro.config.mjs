// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://calma.io',
  trailingSlash: 'always',
  // Prefetch internal links on hover — near-instant page transitions for free.
  prefetch: { prefetchAll: true },
  build: {
    format: 'directory',
  },
  markdown: {
    // Keep straight quotes/apostrophes verbatim — the legacy articles use them.
    // GFM (tables, etc.) stays on; disabling smartypants only affects quote glyphs.
    processor: unified({ smartypants: false }),
  },
  integrations: [
    sitemap({
      // Image entries for pages whose main image is not the shared OG cover.
      serialize(item) {
        if (item.url === 'https://calma.io/about/') {
          item.img = [{ url: 'https://calma.io/img/team/ruslan-drozdov.webp' }];
        }
        return item;
      },
    }),
  ],
});
