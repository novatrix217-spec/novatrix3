import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/content/site'

// Requis par `output: 'export'` (next.config.ts) : ce fichier génère une route (/robots.txt)
// qui doit être explicitement marquée statique pour être prerendue au build.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
