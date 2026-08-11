import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  ['/repair', 'weekly', '0.95'],
  ['/blog', 'daily', '0.8'],
  ['/repair/mobile', 'weekly', '0.92'],
  ['/repair/ps5', 'weekly', '0.92'],
  ['/repair/airpods', 'weekly', '0.92'],
  ['/repair/headphone', 'weekly', '0.88'],
  ['/repair/smartwatch', 'weekly', '0.88'],
  ['/repair/speaker', 'weekly', '0.87'],
  ['/repair/iphone-17-pro', 'weekly', '0.85'],
  ['/repair/iphone-16-pro', 'weekly', '0.85'],
  ['/repair/samsung-s25-ultra', 'weekly', '0.85'],
  ['/repair/samsung-s24-ultra', 'weekly', '0.85'],
  ['/repair/ps5-slim', 'weekly', '0.85'],
  ['/repair/airpods-pro-2', 'weekly', '0.85'],
  ['/repair/galaxy-buds3-pro', 'weekly', '0.85'],
  ['/repair/apple-watch-ultra-3', 'weekly', '0.85'],
  ['/repair/galaxy-watch-8', 'weekly', '0.85'],
  ['/repair/jbl-charge-5', 'weekly', '0.85'],
  ['/repair/iphone-15-pro', 'weekly', '0.85'],
  ['/repair/iphone-14', 'weekly', '0.85'],
  ['/repair/samsung-galaxy-s25', 'weekly', '0.85'],
  ['/repair/samsung-galaxy-a56', 'weekly', '0.85'],
  ['/repair/xiaomi-15t', 'weekly', '0.85'],
  ['/repair/redmi-note-14-pro', 'weekly', '0.85'],
  ['/repair/poco-x7', 'weekly', '0.85'],
  ['/repair/airpods-4', 'weekly', '0.85'],
  ['/repair/galaxy-buds3', 'weekly', '0.85'],
  ['/repair/sony-wh-1000xm5', 'weekly', '0.85'],
  ['/repair/apple-watch-series-10', 'weekly', '0.85'],
  ['/repair/galaxy-watch-7', 'weekly', '0.85'],
  ['/repair/jbl-flip-6', 'weekly', '0.85'],
  ['/repair/ps5-fat', 'weekly', '0.85'],
  ['/repair/ps5-controller', 'weekly', '0.85'],
  ['/faq', 'weekly', '0.9'],
  ['/contact', 'monthly', '0.85'],
  ['/about', 'monthly', '0.75'],
  ['/products', 'daily', '0.85'],
  ['/warranty', 'weekly', '0.9'],
  ['/warranty/conditions', 'monthly', '0.8'],
  ['/warranty/accessories', 'monthly', '0.75'],
  ['/warranty/repairs', 'weekly', '0.85'],
  ['/representatives', 'monthly', '0.7'],
  ['/export', 'monthly', '0.65'],
  ['/export/iron-steel', 'monthly', '0.6'],
  ['/export/copper-rod', 'monthly', '0.6'],
  ['/export/bitumen', 'monthly', '0.6'],
  ['/export/oil', 'monthly', '0.6'],
  ['/export/piping-equipment', 'monthly', '0.6'],
  ['/export/petrochemical-downstream', 'monthly', '0.6'],
  ['/export/general-industrial-supplies', 'monthly', '0.6'],
];

const productsSource = fs.readFileSync(path.join(root, 'src', 'data', 'products.ts'), 'utf8');
const slugs = [...productsSource.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
const productPages = [...new Set(slugs)].map((slug) => [`/product/${slug}`, 'daily', '0.8']);

const blogSource = fs.readFileSync(path.join(root, 'src', 'data', 'blogPosts.ts'), 'utf8');
const blogSlugs = [...blogSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
const blogPages = [...new Set(blogSlugs)].map((slug) => [`/blog/${slug}`, 'monthly', '0.7']);

const areasSource = fs.readFileSync(path.join(root, 'src', 'data', 'tehranAreasData.ts'), 'utf8');
const areaPages = [...areasSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => [`/repair/areas/${m[1]}`, 'weekly', '0.8']);

const lines = [];
lines.push('<?xml version="1.0" encoding="UTF-8"?>');
lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
lines.push('  <url><loc>https://armanhamrah.com/</loc><lastmod>' + today + '</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>');

for (const [loc, freq, prio] of [...staticPages, ...productPages, ...blogPages, ...areaPages]) {
  const slash = loc.endsWith('/') ? loc : loc + '/'; // live site serves URLs with trailing slash
  lines.push(`  <url><loc>https://armanhamrah.com${slash}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${prio}</priority></url>`);
}
lines.push('</urlset>');
lines.push('');

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), lines.join('\n'), 'utf8');
console.log(`sitemap.xml written: ${staticPages.length} static + ${productPages.length} product + ${blogPages.length} blog + ${areaPages.length} area URLs = ${staticPages.length + productPages.length + blogPages.length + areaPages.length} total`);