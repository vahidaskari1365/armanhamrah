#!/bin/bash
# اسکریپت خودکار نگهداری AEO برای آرمان همراه
# توجه: این سشن فقط به arena/019f8ca6-armanhamrah پوش می‌کند

set -euo pipefail

echo "=== AEO Auto Maintenance Script ==="

# ۱) به‌روزرسانی Sitemap
echo "[1/5] به‌روزرسانی sitemap..."
cat > public/sitemap.xml << 'SITEMAP'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://armanhamrah.com/</loc><lastmod>2026-07-23</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://armanhamrah.com/repair</loc><lastmod>2026-07-23</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://armanhamrah.com/repair/mobile</loc><lastmod>2026-07-23</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://armanhamrah.com/repair/ps5</loc><lastmod>2026-07-23</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://armanhamrah.com/repair/airpods</loc><lastmod>2026-07-23</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://armanhamrah.com/faq</loc><lastmod>2026-07-23</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://armanhamrah.com/contact</loc><lastmod>2026-07-23</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://armanhamrah.com/warranty</loc><lastmod>2026-07-23</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://armanhamrah.com/products</loc><lastmod>2026-07-23</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
</urlset>
SITEMAP

# ۲) به‌روزرسانی llms.txt
echo "[2/5] به‌روزرسانی llms.txt..."
cat > public/llms.txt << 'LLMS'
# آرمان همراه - مرکز خدمات پس از فروش
آدرس: تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۲، واحد ۲۰۴
تلفن: 02158798
LLMS

# ۳) اصلاح آدرس و شماره در تمام فایل‌های منبع
echo "[3/5] اصلاح آدرس و شماره تماس در تمام صفحات..."
find src pages public/index.html -type f \( -name '*.tsx' -o -name '*.html' \) -exec sed -i 's/۰۲۱-۶۶۷۴۵۹۱۶/۰۲۱-۵۸۷۹۸/g' {} + 2>/dev/null || true
find src pages public/index.html -type f \( -name '*.tsx' -o -name '*.html' \) -exec sed -i 's/021-66745916/02158798/g' {} + 2>/dev/null || true
find src pages public/index.html -type f \( -name '*.tsx' -o -name '*.html' \) -exec sed -i 's/خیابان جمهوری، پاساژ علاءالدین، طبقه ششم، پلاک ۶۱۴/تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۲، واحد ۲۰۴/g' {} + 2>/dev/null || true

# ۴) کامیت خودکار
echo "[4/5] کامیت تغییرات..."
git add -A
git commit -m "AEO auto-update: sitemap, llms.txt, address 204/Motahhari, phone 02158798" || echo "هیچ تغییری برای کامیت وجود ندارد."

# ۵) پوش خودکار (فقط به branch سشن)
echo "[5/5] پوش به arena/019f8ca6-armanhamrah..."
git push origin arena/019f8ca6-armanhamrah

echo "=== AEO Auto Update Complete ==="
