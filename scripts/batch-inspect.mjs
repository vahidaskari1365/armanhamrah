import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const secret = JSON.parse(fs.readFileSync(path.join(root, 'gsc-client-secret.json'), 'utf8'));
const { client_id: clientId, client_secret: clientSecret } = secret.installed || secret.web || secret;
const TOKEN_PATH = path.join(root, 'gsc-tokens.json');
const OUT_PATH = path.join(root, 'gsc-results.jsonl');
const CONCURRENCY = 4;

async function getToken() {
  const tok = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  if (tok.expires_at && Date.now() < tok.expires_at) return tok.access_token;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ refresh_token: tok.refresh_token, client_id: clientId, client_secret: clientSecret, grant_type: 'refresh_token' }),
  }).then(x => x.json());
  r.refresh_token = tok.refresh_token;
  r.expires_at = Date.now() + (r.expires_in || 3599) * 1000 - 60000;
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(r, null, 2));
  return r.access_token;
}

async function inspect(accessToken, url) {
  const r = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    signal: AbortSignal.timeout(60000),
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: 'sc-domain:armanhamrah.com' }),
  });
  if (!r.ok) return { status: `HTTP_${r.status}`, verdict: '' };
  const d = await r.json();
  const res = (d.inspectionResult || {}).indexStatusResult || {};
  return { status: res.coverageState || 'UNKNOWN', verdict: res.verdict || '' };
}

const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

const done = new Set();
if (fs.existsSync(OUT_PATH)) {
  for (const line of fs.readFileSync(OUT_PATH, 'utf8').split('\n').filter(Boolean)) {
    try { done.add(JSON.parse(line).url); } catch {}
  }
}
const todo = urls.filter(u => !done.has(u));
console.log(`Total: ${urls.length}, done: ${done.size}, to inspect: ${todo.length} (concurrency ${CONCURRENCY})`);

// serialized writer (appendFileSync is atomic per line; queue to be safe)
let writeChain = Promise.resolve();
function writeLine(obj) {
  writeChain = writeChain.then(() => {
    fs.appendFileSync(OUT_PATH, JSON.stringify(obj) + '\n');
  });
  return writeChain;
}

const token = await getToken();
let cursor = 0;
let finished = 0;
const total = todo.length;

async function worker() {
  while (true) {
    const i = cursor++;
    if (i >= total) return;
    const url = todo[i];
    try {
      const r = await inspect(token, url);
      await writeLine({ url, ...r });
    } catch (e) {
      await writeLine({ url, status: `ERROR_${e.name}`, verdict: '' });
      console.error(`ERR ${url}: ${e.message}`);
    }
    finished++;
    if (finished % 10 === 0) console.error(`...${finished}/${total}`);
  }
}

await Promise.all([worker(), worker(), worker(), worker()]);
await writeChain;

// summary
const counts = {};
for (const line of fs.readFileSync(OUT_PATH, 'utf8').split('\n').filter(Boolean)) {
  const r = JSON.parse(line);
  counts[r.status] = (counts[r.status] || 0) + 1;
}
console.log('\n=== INDEX STATUS SUMMARY ===');
for (const [k, v] of Object.entries(counts)) console.log(`${k}: ${v}`);

const notIndexed = [];
for (const line of fs.readFileSync(OUT_PATH, 'utf8').split('\n').filter(Boolean)) {
  const r = JSON.parse(line);
  if (!/indexed/i.test(r.status)) notIndexed.push(r.url);
}
fs.writeFileSync(path.join(root, 'gsc-not-indexed.txt'), notIndexed.join('\n'));
console.log(`\nNot fully indexed (${notIndexed.length}) written to gsc-not-indexed.txt`);
