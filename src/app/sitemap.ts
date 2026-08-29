import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/content/site'

// Requis par `output: 'export'` (next.config.ts) : ce fichier génère une route (/sitemap.xml)
// qui doit être explicitement marquée statique pour être prerendue au build.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/realisations', '/a-propos', '/contact']
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }))
}
