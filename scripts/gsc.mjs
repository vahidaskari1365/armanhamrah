import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const secretPath = path.join(root, 'gsc-client-secret.json');
const tokenPath = path.join(root, 'gsc-tokens.json');
const secret = JSON.parse(fs.readFileSync(secretPath, 'utf8'));
const { client_id: clientId, client_secret: clientSecret } = secret.installed || secret.web || secret;

const API = 'https://www.googleapis.com/webmasters/v3';

async function refreshToken(tok) {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: tok.refresh_token,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
    }),
  }).then(x => x.json());
  if (r.error) throw new Error(`refresh failed: ${r.error} ${r.error_description || ''}`);
  r.refresh_token = tok.refresh_token;
  r.expires_at = Date.now() + (r.expires_in || 3599) * 1000 - 60000;
  fs.writeFileSync(tokenPath, JSON.stringify(r, null, 2));
  return r;
}

async function getToken() {
  const tok = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
  return (tok.expires_at && Date.now() < tok.expires_at) ? tok : await refreshToken(tok);
}

async function gsc(pathname, options = {}) {
  const tok = await getToken();
  const url = `${API}${pathname}`;
  const r = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${tok.access_token}`,
      'Content-Type': 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`${r.status}: ${t.slice(0, 400)}`);
  }
  return r.json();
}

const cmd = process.argv[2];

if (cmd === 'sites') {
  const d = await gsc('/sites');
  console.table((d.siteEntry || []).map(s => ({
    site: s.siteUrl,
    permission: s.permissionLevel,
  })));
} else if (cmd === 'sitemaps') {
  const site = process.argv[3];
  if (!site) { console.error('usage: node scripts/gsc.mjs sitemaps <siteUrl>'); process.exit(1); }
  const d = await gsc(`/sites/${encodeURIComponent(site)}/sitemaps`);
  console.table((d.sitemap || []).map(s => ({
    path: s.path,
    lastSubmitted: s.lastSubmitted,
    type: s.type,
    indexed: s.contents ? s.contents.map(c => c.submitted).join(',') : '',
    errors: s.isPending ? 'PENDING' : s.errors,
  })));
} else if (cmd === 'submit') {
  const site = process.argv[3];
  const sitemapUrl = process.argv[4];
  if (!site || !sitemapUrl) { console.error('usage: node scripts/gsc.mjs submit <siteUrl> <sitemapUrl>'); process.exit(1); }
  await gsc(`/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(sitemapUrl)}`, { method: 'PUT' });
  console.log('sitemap submitted:', sitemapUrl);
} else if (cmd === 'query') {
  const site = process.argv[3];
  const days = parseInt(process.argv[4] || '28', 10);
  if (!site) { console.error('usage: node scripts/gsc.mjs query <siteUrl> [days]'); process.exit(1); }
  const start = new Date();
  start.setDate(start.getDate() - days);
  const d = await gsc(`/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
    method: 'POST',
    body: {
      startDate: start.toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      dimensions: ['query'],
      rowLimit: 25,
    },
  });
  const rows = (d.rows || []).map(r => ({
    query: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: (r.ctr * 100).toFixed(2) + '%',
    position: r.position.toFixed(1),
  }));
  console.table(rows);
} else if (cmd === 'pages') {
  const site = process.argv[3];
  const days = parseInt(process.argv[4] || '28', 10);
  if (!site) { console.error('usage: node scripts/gsc.mjs pages <siteUrl> [days]'); process.exit(1); }
  const start = new Date();
  start.setDate(start.getDate() - days);
  const d = await gsc(`/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
    method: 'POST',
    body: {
      startDate: start.toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      dimensions: ['page'],
      rowLimit: 25,
    },
  });
  const rows = (d.rows || []).map(r => ({
    page: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    position: r.position.toFixed(1),
  }));
  console.table(rows);
} else if (cmd === 'inspect') {
  const site = process.argv[3];
  const pageUrl = process.argv[4];
  if (!site || !pageUrl) { console.error('usage: node scripts/gsc.mjs inspect <siteUrl> <fullUrl>'); process.exit(1); }
  const d = await gsc(`/sites/${encodeURIComponent(site)}/urlInspection/index/inspect`, {
    method: 'POST',
    body: { inspectionUrl: pageUrl, siteUrl: site },
  });
  const r = d.inspectionResult || {};
  console.log('indexStatus:', r.indexStatusResult ? r.indexStatusResult.coverageState : 'n/a');
  console.log('lastCrawl:', r.indexStatusResult ? r.indexStatusResult.lastCrawlTime : 'n/a');
  console.log('robotsTxt:', r.indexStatusResult ? r.indexStatusResult.robotsTxtState : 'n/a');
  console.log('crawlAllowed:', r.indexStatusResult ? r.indexStatusResult.crawlingAllowed : 'n/a');
  console.log('indexingAllowed:', r.indexStatusResult ? r.indexStatusResult.indexingAllowed : 'n/a');
  if (r.richResultsResult) console.log('richResults:', r.richResultsResult.detectedItems ? JSON.stringify(r.richResultsResult.detectedItems.map(i => i.richResultType)) : 'none detected');
} else {
  console.log(`
Usage:
  node scripts/gsc.mjs sites
  node scripts/gsc.mjs sitemaps <siteUrl>
  node scripts/gsc.mjs submit <siteUrl> <sitemapUrl>
  node scripts/gsc.mjs query <siteUrl> [days]
  node scripts/gsc.mjs pages <siteUrl> [days]
  node scripts/gsc.mjs inspect <siteUrl> <fullUrl>
`);
}
