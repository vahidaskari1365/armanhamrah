const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy requests to Supabase to avoid CORS issues
app.use('/rest/v1', createProxyMiddleware({
  target: 'https://iksjergvpjsqcbdiwizq.supabase.co',
  changeOrigin: true,
  headers: {
    'apikey': 'sb_publishable_IZrpkPS5e1wVyE-62ph7CA_vDKCCM8d',
    'Authorization': 'Bearer sb_publishable_IZrpkPS5e1wVyE-62ph7CA_vDKCCM8d'
  }
}));

const port = 3001;
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
