import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://openclaw-release-feed.vercel.app',
  integrations: [react(), tailwind(), sitemap()],
  build: {
    assets: 'assets',
  },
})
