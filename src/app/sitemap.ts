import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/realisations', '/a-propos', '/contact']
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }))
}
