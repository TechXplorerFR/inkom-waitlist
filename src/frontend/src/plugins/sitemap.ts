import type { Plugin } from 'vite';
import { writeFileSync } from 'fs';
import { join } from 'path';

interface SitemapOptions {
  hostname: string;
  routes: Array<{
    path: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    lastmod?: string;
  }>;
  outDir?: string;
}

export function sitemapGenerator(options: SitemapOptions): Plugin {
  return {
    name: 'sitemap-generator',
    writeBundle() {
      const { hostname, routes, outDir = 'dist' } = options;
      
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => `  <url>
    <loc>${hostname}${route.path}</loc>
    <lastmod>${route.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq || 'weekly'}</changefreq>
    <priority>${route.path === "/" ? 1 : route.priority || 0.5}</priority>
  </url>`).join('\n')}
</urlset>`;

      writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
      console.log('✅ Sitemap generated successfully');
    }
  };
}