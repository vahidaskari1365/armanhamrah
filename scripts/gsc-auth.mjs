import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const secretPath = path.join(root, 'gsc-client-secret.json');
if (!fs.existsSync(secretPath)) {
  console.error('gsc-client-secret.json not found in project root');
  process.exit(1);
}
const secret = JSON.parse(fs.readFileSync(secretPath, 'utf8'));
const { client_id: clientId, client_secret: clientSecret } = secret.installed || secret.web || secret;

const PORT = 8080;
const REDIRECT = `http://localhost:${PORT}/callback`;
const SCOPES = ['https://www.googleapis.com/auth/webmasters'];

const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent',
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== '/callback') {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  if (error) {
    res.end('<h2 style="direction:rtl">خطا در ورود: ' + error + '</h2><p>پنجره را ببندید.</p>');
    console.error('OAuth error:', error);
    process.exit(1);
    return;
  }
  if (!code) {
    res.end('<h2>no code</h2>');
    return;
  }
  try {
    const tok = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: REDIRECT,
        grant_type: 'authorization_code',
      }),
    }).then(r => r.json());
    if (tok.error) throw new Error(`${tok.error}: ${tok.error_description || ''}`);
    tok.expires_at = Date.now() + (tok.expires_in || 3599) * 1000 - 60000;
    fs.writeFileSync(path.join(root, 'gsc-tokens.json'), JSON.stringify(tok, null, 2));
    res.end('<h2 style="direction:rtl">ورود موفق شد؛ توکن‌ها ذخیره شد. حالا پنجره را ببندید.</h2>');
    console.log('OK: tokens saved to gsc-tokens.json');
    server.close(() => process.exit(0));
  } catch (e) {
    res.end('<h2>error: ' + e.message + '</h2>');
    console.error('exchange failed:', e.message);
  }
});

server.listen(PORT, () => {
  fs.writeFileSync(path.join(root, 'gsc-auth-url.txt'), authUrl);
  if (process.platform === 'win32') {
    spawn('powershell', ['-NoProfile', '-Command', `Start-Process '${authUrl}'`], { detached: true, stdio: 'ignore' }).unref();
  } else {
    const opener = process.platform === 'darwin' ? 'open' : 'xdg-open';
    spawn(opener, [authUrl], { detached: true, stdio: 'ignore' }).unref();
  }
  console.log('Browser opened for Google login. Fallback: open gsc-auth-url.txt manually if nothing happens.');
  console.log('Waiting for callback... (server on port 8080)');
});
