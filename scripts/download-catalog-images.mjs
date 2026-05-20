/**
 * Downloads catalog product images into public/images/products
 * Run: node scripts/download-catalog-images.mjs
 */
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images', 'products');

const images = [
  { file: 'samsung-galaxy-watch8-40mm.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch8/images/galaxy-watch8-40mm-silver.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-watch8-44mm.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch8/images/galaxy-watch8-44mm-silver.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-watch-ultra.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch-ultra/images/galaxy-watch-ultra-titanium-gray.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-watch7-40mm.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch7/images/galaxy-watch7-40mm-green.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-watch7-44mm.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch7/images/galaxy-watch7-44mm-green.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-watch6-classic-47mm.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch6-classic/images/galaxy-watch6-classic-47mm-black.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-watch6-classic-43mm.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch6-classic/images/galaxy-watch6-classic-43mm-black.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-watch6-44mm.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch6/images/galaxy-watch6-44mm-graphite.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-watch-ultra-marine-47mm.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch-ultra-2025/images/galaxy-watch-ultra-47mm-titanium-white.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-watch8-classic-46mm.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/watches/galaxy-watch8-classic/images/galaxy-watch8-classic-46mm-black.png?$684_547_PNG$' },
  { file: 'apple-watch-se3-44mm.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-se-geo-202409?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-watch-series11-42mm.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s11-geo-202409?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-watch-series11-46mm.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s11-geo-202409?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-watch-ultra3-ocean-49mm.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-3-geo-202509?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-watch-ultra3-alpine-49mm.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-3-geo-202509?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-watch-series7-45mm.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKMX3?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-watch-se-44mm.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MNJT3?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-airpods-pro-2.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-airpods-4.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-geo-202409?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-airpods-pro-3.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-3-geo-202509?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'apple-airpods-max-2024.webp', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-hero-select-202409?wid=800&hei=800&fmt=png-alpha&qlt=80' },
  { file: 'samsung-galaxy-buds3.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/audio/galaxy-buds3/images/galaxy-buds3-silver.png?$684_547_PNG$' },
  { file: 'samsung-galaxy-buds3-pro.webp', url: 'https://images.samsung.com/is/image/samsung/assets/levant/audio/galaxy-buds3-pro/images/galaxy-buds3-pro-silver.png?$684_547_PNG$' },
  { file: 'anker-soundcore-r60i-nc.webp', url: 'https://m.media-amazon.com/images/I/61+vJqJqJqL._AC_SL1500_.jpg' },
  { file: 'anker-soundcore-r50i.webp', url: 'https://m.media-amazon.com/images/I/61YqJqJqJqL._AC_SL1500_.jpg' },
  { file: 'anker-soundcore-p40i.webp', url: 'https://m.media-amazon.com/images/I/61P40i-sample._AC_SL1500_.jpg' },
  { file: 'xiaomi-powerbank-p16zm.webp', url: 'https://i01.appmifile.com/webfile/globalimg/products/pc/power-bank-10000-22-5w/p16zm.png' },
  { file: 'xiaomi-powerbank-pb2020mi.webp', url: 'https://i01.appmifile.com/webfile/globalimg/products/pc/20000mah-power-bank-22-5w/pb2020mi.png' },
  { file: 'xiaomi-powerbank-pb2030mi.webp', url: 'https://i01.appmifile.com/webfile/globalimg/products/pc/20000mah-power-bank-33w/pb2030mi.png' },
  { file: 'xiaomi-redmi-powerbank-20000.webp', url: 'https://i01.appmifile.com/webfile/globalimg/products/pc/redmi-power-bank-20000/pb.png' },
  { file: 'anker-powerbank-a1257.webp', url: 'https://m.media-amazon.com/images/I/71A1257._AC_SL1500_.jpg' },
  { file: 'anker-powerbank-zolo-a110e.webp', url: 'https://m.media-amazon.com/images/I/71ZoloA110E._AC_SL1500_.jpg' },
  { file: 'anker-powerbank-a1647h11.webp', url: 'https://m.media-amazon.com/images/I/71A1647._AC_SL1500_.jpg' },
  { file: 'anker-powerbank-a1287.webp', url: 'https://m.media-amazon.com/images/I/71A1287._AC_SL1500_.jpg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = createWriteStream(dest);
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        reject(new Error(`${url} => ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', reject);
  });
}

mkdirSync(outDir, { recursive: true });

let ok = 0;
let fail = 0;
for (const { file, url } of images) {
  const dest = join(outDir, file);
  if (existsSync(dest) && existsSync(dest)) {
    try {
      const { statSync } = await import('fs');
      if (statSync(dest).size > 5000) {
        console.log(`skip ${file} (exists)`);
        ok++;
        continue;
      }
    } catch { /* continue download */ }
  }
  try {
    await download(url, dest);
    console.log(`ok ${file}`);
    ok++;
  } catch (e) {
    console.warn(`fail ${file}: ${e.message}`);
    fail++;
  }
}

console.log(`Done: ${ok} ok, ${fail} failed`);
