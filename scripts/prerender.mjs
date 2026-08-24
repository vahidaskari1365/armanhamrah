import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { businessInfo } from '../src/data/business.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

const SITE = businessInfo.siteUrl;
const OG_IMAGE = `${SITE}/og-image.jpg`;

const staticPages = {
  '/repair': {
    title: 'مرکز تخصصی تعمیرات موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند | آرمان همراه',
    description: 'مرکز تخصصی تعمیرات انواع گوشی آیفون و سامسونگ و شیائومی، PS5 و دسته DualSense، ایرپاد پرو ۲، هدفون بلوتوثی، ساعت هوشمند اپل واچ و گلکسی واچ، اسپیکر JBL و باند با قطعات اورجینال و گارانتی ۳ ماهه',
  },
  '/repair/mobile': {
    title: 'تعمیرات موبایل تهران | تعمیر گوشی با گارانتی - آرمان همراه',
    description: 'تعمیر موبایل در تهران | مرکز تخصصی تعمیرات گوشی | تعویض ال سی دی آیفون، سامسونگ، شیائومی | تعمیر برد | باتری اصل با گارانتی 3 ماهه',
  },
  '/repair/ps5': {
    title: 'تعمیر PS5 تهران | مرکز تخصصی تعمیرات پلی استیشن 5 با گارانتی - آرمان همراه',
    description: 'تعمیر PS5 در تهران | تعمیر برد PS5، تعویض HDMI، تعمیر درایو، دسته DualSense، رفع ارور با گارانتی 90 روزه در خیابان مطهری',
  },
  '/repair/airpods': {
    title: 'تعمیر ایرپاد تهران | تعمیرات تخصصی ایرپاد پرو 2، ایرپاد 4 با گارانتی - آرمان همراه',
    description: 'تعمیر ایرپاد در تهران | مرکز تخصصی تعمیرات ایرپاد پرو 2، ایرپاد 4، ایرپاد مکس، تعویض باتری، تعمیر کیس شارژ با قطعات اورجینال و گارانتی',
  },
  '/repair/headphone': {
    title: 'تعمیر هدفون بلوتوثی تهران | تعمیر گلکسی بادز 3 پرو، انکر | آرمان همراه',
    description: 'تعمیر تخصصی هدفون و هندزفری بلوتوثی در تهران | تعمیر گلکسی بادز 3 پرو، انکر R60i NC | تعمیر میکروفون و باتری با گارانتی',
  },
  '/repair/smartwatch': {
    title: 'تعمیر ساعت هوشمند تهران | اپل واچ اولترا 3 و گلکسی واچ 8 | گارانتی',
    description: 'تعمیر ساعت هوشمند اپل واچ و گلکسی واچ در تهران | تعویض گلس سافایر و Super AMOLED، باتری، سنسور با قطعات اورجینال و گارانتی',
  },
  '/repair/speaker': {
    title: 'تعمیر اسپیکر و باند تهران | تعمیر JBL، سونی، پارتی باکس | آرمان همراه',
    description: 'تعمیر اسپیکر بلوتوثی JBL، سونی، باند و پارتی باکس | تعمیر آمپلی‌فایر، باتری، درایور و بلوتوث با اسیلوسکوپ و گارانتی',
  },
  '/faq': {
    title: 'سوالات متداول | آرمان همراه - مرکز تخصصی تعمیرات',
    description: 'پاسخ سوالات متداول درباره تعمیرات موبایل، PS5، ایرپاد، ساعت هوشمند، گارانتی ۱۸ ماهه و فرآیند تعمیر در آرمان همراه',
  },
'/blog': {
    title: 'بلاگ و راهنمای تخصصی تعمیرات موبایل، PS5 و ایرپاد | آرمان همراه',
    description: 'مطالب آموزشی و راهنمای تعمیرات: قیمت تعمیر آیفون ۱۷ پرو، علت خاموش شدن PS5، تعمیر ایرپاد آبخورده، تعویض گلس بدون ال‌سی‌دی و تشخیص قطعات اورجینال.',
  },
  '/contact': {
    title: 'تماس با ما و آدرس مرکز تعمیرات | آرمان همراه',
    description: 'آدرس، تلفن، ساعت کاری و فرم درخواست تعمیر در آرمان همراه | تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۲، واحد ۲۰۴ | ۰۲۱-۵۸۷۹۸',
  },
  '/about': {
    title: 'درباره ما | آرمان همراه - از ۱۳۹۳',
    description: 'آرمان همراه ارتباطات آریا از سال ۱۳۹۳ مرکز تخصصی خدمات پس از بروشور تعمیرات موبایل، PS5، ایرپاد و لوازم دیجیتال با قطعات اورجینال',
  },
  '/products': {
    title: 'محصولات و فروشگاه | آرمان همراه',
    description: 'فروشگاه محصولات دیجیتال آرمان همراه | آیفون، سامسونگ، شیائومی، پوکو، اپل واچ، ایرپاد، هدفون و اسپیکر با گارانتی',
  },
  '/warranty': {
    title: 'گارانتی آرمان همراه | خدمات پس از فروش',
    description: 'شرایط و مزایای گارانتی ۱۸ ماهه تعمیرات و محصولات، گارانتی کتبی و خدمات پس از فروش آرمان همراه',
  },
  '/warranty/conditions': {
    title: 'شرایط گارانتی | آرمان همراه',
    description: 'شرایط کامل گارانتی محصولات و تعمیرات، موارد پوشش و عدم پوشش گارانتی در آرمان همراه',
  },
  '/warranty/accessories': {
    title: 'گارانتی لوازم جانبی | آرمان همراه',
    description: 'گارانتی لوازم جانبی و قطعات اورجینال خریداری‌شده از آرمان همراه | شرایط و نحوه استفاده از گارانتی',
  },
  '/warranty/repairs': {
    title: 'گارانتی تعمیرات | آرمان همراه',
    description: 'گارانتی کتبی تعمیرات موبایل، PS5، ایرپاد و ساعت هوشمند | مدت گارانتی ۳ ماهه تعمیرات و قطعات مصرفی',
  },
  '/representatives': {
    title: 'نمایندگی‌ها و همکاران | آرمان همراه',
    description: 'لیست نمایندگان مجاز آرمان همراه و مراکز خدمات پس از فروش همکار',
  },
  '/export': {
    title: 'صادرات آهن و فولاد، مس، قیر، نفت و تجهیزات | آرمان همراه',
    description: 'شرکت آرمان همراه | صادرات آهن و فولاد، مس مسی، قیر، فرآورده‌های نفتی، تجهیزات لوله‌گذاری و محصولات پتروشیمی',
  },
  '/export/iron-steel': { title: 'صادرات آهن و فولاد | آرمان همراه', description: 'صادرات میلگرد، ورق فولاد و محصولات آهن و فولاد | آرمان همراه' },
  '/export/copper-rod': { title: 'صادرات مفتول مسی | آرمان همراه', description: 'صادرات مفتول و محصولات مسی با کیفیت صادراتی | آرمان همراه' },
  '/export/bitumen': { title: 'صادرات قیر | آرمان همراه', description: 'صادرات قیر صادراتی با استانداردهای بین‌المللی | آرمان همراه' },
  '/export/oil': { title: 'صادرات فرآورده‌های نفتی | آرمان همراه', description: 'صادرات فرآورده‌های نفتی و مشتقات پالایشگاهی | آرمان همراه' },
  '/export/piping-equipment': { title: 'صادرات تجهیزات لوله‌گذاری | آرمان همراه', description: 'صادرات تجهیزات لوله‌گذاری و اتصالات صنعتی | آرمان همراه' },
  '/export/petrochemical-downstream': { title: 'صادرات پتروشیمی و پایین‌دستی | آرمان همراه', description: 'صادرات محصولات پتروشیمی و پایین‌دستی | آرمان همراه' },
  '/export/general-industrial-supplies': { title: 'تأمین کالاهای صنعتی | آرمان همراه', description: 'تأمین و صادرات کالاهای عمومی صنعتی | آرمان همراه' },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'ElectronicsStore', 'ComputerRepairShop'],
  '@id': `${SITE}/#organization`,
  'name': businessInfo.name,
  'alternateName': ['Arman Hamrah', 'آرمان همراه', 'مرکز خدمات پس از فروش آرمان همراه', 'مرکز تعمیرات علاءالدین'],
  'url': SITE,
  'logo': `${SITE}/logo.jpeg`,
  'image': OG_IMAGE,
  'description': 'مرکز فوق تخصصی خدمات پس از فروش تعمیرات موبایل، PS5، ایرپاد با قطعات اورجینال و گارانتی کتبی',
  'telephone': businessInfo.headOffice.telephone,
  'email': businessInfo.email,
  'priceRange': '$$',
  'foundingDate': '2014',
  'foundingLocation': { '@type': 'Place', 'name': 'Tehran, Iran' },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': businessInfo.headOffice.streetAddress,
    'addressLocality': businessInfo.headOffice.addressLocality,
    'addressRegion': businessInfo.headOffice.addressRegion,
    'postalCode': businessInfo.headOffice.postalCode,
    'addressCountry': businessInfo.headOffice.addressCountry,
  },
  'geo': { '@type': 'GeoCoordinates', 'latitude': businessInfo.geo.latitude, 'longitude': businessInfo.geo.longitude },
  'openingHoursSpecification': [businessInfo.openingHours],
  'areaServed': { '@type': 'City', 'name': 'Tehran' },
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'customer service',
    'areaServed': 'IR',
    'availableLanguage': ['Persian', 'English'],
    'telephone': businessInfo.afterSales.telephone,
  },
  'department': [
    { '@id': `${SITE}/#after-sales` },
    { '@id': `${SITE}/#store` },
  ],
};

const afterSalesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#after-sales`,
  'name': businessInfo.afterSales.name,
  'url': SITE,
  'telephone': businessInfo.afterSales.telephone,
  'image': OG_IMAGE,
  'parentOrganization': { '@id': `${SITE}/#organization` },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': businessInfo.afterSales.streetAddress,
    'addressLocality': businessInfo.afterSales.addressLocality,
    'addressRegion': businessInfo.afterSales.addressRegion,
    'postalCode': businessInfo.afterSales.postalCode,
    'addressCountry': businessInfo.afterSales.addressCountry,
  },
  'openingHoursSpecification': [businessInfo.openingHours],
};

const storeJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ElectronicsStore'],
  '@id': `${SITE}/#store`,
  'name': businessInfo.store.name,
  'url': SITE,
  'telephone': businessInfo.store.telephone,
  'image': OG_IMAGE,
  'parentOrganization': { '@id': `${SITE}/#organization` },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': businessInfo.store.streetAddress,
    'addressLocality': businessInfo.store.addressLocality,
    'addressRegion': businessInfo.store.addressRegion,
    'addressCountry': businessInfo.store.addressCountry,
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'sales',
    'telephone': businessInfo.store.mobile,
    'areaServed': 'IR',
    'availableLanguage': ['Persian'],
  },
  'openingHoursSpecification': [businessInfo.openingHours],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'آرمان همراه - مرکز تخصصی تعمیرات',
  'url': SITE,
  'inLanguage': 'fa-IR',
};

const faqItems = [
  ['هزینه تعمیرات موبایل در آرمان همراه چقدر است؟', 'هزینه تعمیرات موبایل در آرمان همراه بستگی به مدل گوشی و نوع خرابی دارد. عیب‌یابی کاملاً رایگان است و قبل از هر تعمیر، قیمت دقیق به شما اعلام می‌شود. برای استعلام قیمت با شماره ۰۲۱-۵۸۷۹۸ تماس بگیرید.'],
  ['آیا تعمیرات آرمان همراه گارانتی دارد؟', 'بله. تعمیرات موبایل با گارانتی ۳ ماهه کتبی، تعمیر PS5 با گارانتی ۹۰ روزه و قطعات مصرفی مانند باتری و LCD با گارانتی ۳ ماهه ارائه می‌شوند.'],
  ['تعمیر PS5 چقدر طول می‌کشد؟', 'بسته به نوع خرابی، تعمیر PS5 معمولاً بین ۱ تا ۳ روز کاری زمان می‌برد. عیب‌یابی اولیه رایگان و در کمتر از ۱۵ دقیقه انجام می‌شود.'],
  ['آیا قطعات تعمیرات در آرمان همراه اورجینال هستند؟', 'بله، آرمان همراه فقط از قطعات اورجینال و با کیفیت استفاده می‌کند. تمام قطعات دارای گارانتی اصالت هستند و قبل از نصب تست می‌شوند.'],
  ['آدرس مرکز تعمیرات آرمان همراه کجاست و ساعت کاری چیست؟', 'مرکز تعمیرات آرمان همراه به آدرس تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۲، واحد ۲۰۴ قرار دارد. کد پستی: ۱۵۷۵۹۴۵۳۳۵. ساعات کاری: شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر. شماره تماس: ۰۲۱-۵۸۷۹۸.'],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqItems.map(([name, text]) => ({
    '@type': 'Question',
    'name': name,
    'acceptedAnswer': { '@type': 'Answer', 'text': text },
  })),
};

function breadcrumbJsonLd(segments) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': segments.map(([name, url], i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': name,
      'item': `${SITE}${url}`,
    })),
  };
}

const modelsSource = fs.readFileSync(path.join(root, 'src', 'data', 'repairModelsData.ts'), 'utf8');
const modelBlocks = [...modelsSource.matchAll(/\{\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)',[\s\S]*?category:\s*'([^']+)',\s*image:\s*'([^']+)',[\s\S]*?seoTitle:\s*'([^']+)',\s*seoDesc:\s*'([^']+)'/g)]
  .map(m => ({ slug: m[1], title: m[2], category: m[3], image: m[4], seoTitle: m[5], seoDesc: m[6] }));

const productsSource = fs.readFileSync(path.join(root, 'src', 'data', 'products.ts'), 'utf8');
const productPairs = [...productsSource.matchAll(/name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g)]
  .map(m => ({ name: m[1], slug: m[2] }));
const products = [...new Map(productPairs.map(p => [p.slug, p])).values()];

const blogSource = fs.readFileSync(path.join(root, 'src', 'data', 'blogPosts.ts'), 'utf8');
const blogPosts = [...blogSource.matchAll(/slug:\s*'([^']+)',\s*title:\s*'([^']+)',\s*excerpt:\s*'([^']+)',\s*seoTitle:\s*'([^']+)',\s*seoDesc:\s*'([^']+)'/g)]
  .map(m => ({ slug: m[1], title: m[2], excerpt: m[3], seoTitle: m[4], seoDesc: m[5] }));

function parsePrices(source, slug) {
  const idx = source.indexOf(`'${slug}': [`);
  if (idx === -1) return null;
  const chunk = source.slice(idx, source.indexOf('\n  ]', idx) + 4);
  const items = [...chunk.matchAll(/\{ service:\s*'([^']+)',\s*priceMin:\s*'([^']+)',\s*priceMax:\s*'([^']+)'\s*\}/g)];
  return items.map(([_, service, min, max]) => ({
    service,
    min: parseInt(min.replace(/,/g, ''), 10),
    max: parseInt(max.replace(/,/g, ''), 10),
  }));
}
const pricesSource = fs.readFileSync(path.join(root, 'src', 'data', 'repairPricesData.ts'), 'utf8');

const reviewsSource = fs.readFileSync(path.join(root, 'src', 'data', 'reviewsData.ts'), 'utf8');
const allReviews = [...reviewsSource.matchAll(/model:\s*'([^']+)',\s*name:\s*'([^']+)',\s*rating:\s*(\d),\s*date:\s*'([^']+)',\s*text:\s*'([^']+)',\s*service:\s*'([^']+)'/g)]
  .map(m => ({ model: m[1], name: m[2], rating: parseInt(m[3], 10), date: m[4], text: m[5], service: m[6] }));
const reviewsByModel = (slug) => allReviews.filter(r => r.model === slug);
const aggregateRatingJsonLd = (slug) => {
  const rs = reviewsByModel(slug);
  if (rs.length === 0) return null;
  return {
    '@type': 'AggregateRating',
    'ratingValue': (rs.reduce((s, r) => s + r.rating, 0) / rs.length).toFixed(1),
    'reviewCount': rs.length,
    'bestRating': '5',
  };
};
const reviewJsonLd = (slug) => reviewsByModel(slug).map(r => ({
  '@type': 'Review',
  'author': { '@type': 'Person', 'name': r.name },
  'datePublished': r.date,
  'reviewBody': r.text,
  'name': r.service,
  'reviewRating': { '@type': 'Rating', 'ratingValue': r.rating, 'bestRating': '5' },
}));

const areasSource = fs.readFileSync(path.join(root, 'src', 'data', 'tehranAreasData.ts'), 'utf8');
const areas = [...areasSource.matchAll(/slug:\s*'([^']+)',\s*name:\s*'([^']+)',\s*neighborhoods:\s*'([^']+)',\s*seoTitle:\s*'([^']+)',\s*seoDesc:\s*'([^']+)'/g)]
  .map(m => ({ slug: m[1], name: m[2], neighborhoods: m[3], seoTitle: m[4], seoDesc: m[5] }));

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const stripTemplateJsonLd = (html) =>
  html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

function renderPage({ url, title, description, jsonLd = [] }) {
  // Canonical/og:url must match sitemap URLs (trailing slash) and the server's 301 target
  const basePath = url === '/' ? '' : `${url.replace(/\/+$/, '')}/`;
  const fullUrl = `${SITE}${basePath}`;
  let html = stripTemplateJsonLd(template)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
    .replace(/<link rel="canonical" href="https:\/\/armanhamrah\.com" \/>/, `<link rel="canonical" href="${fullUrl}" />`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${fullUrl}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`);

  const scripts = [orgJsonLd, afterSalesJsonLd, storeJsonLd, websiteJsonLd, ...jsonLd]
    .map(d => `<script type="application/ld+json">${JSON.stringify(d)}</script>`)
    .join('\n    ');

  html = html.replace('</head>', `    ${scripts}\n  </head>`);
  return html;
}

function writePage(url, html) {
  const outDir = path.join(dist, url === '/' ? '' : url);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}

let count = 0;

writePage('/', renderPage({
  url: '/',
  title: 'آرمان همراه | مرکز خدمات پس از فروش تعمیرات ایرپاد، PS5 و گوشی در تهران',
  description: 'مرکز فوق تخصصی خدمات پس از فروش تعمیرات گوشی، PS5 و ایرپاد با گارانتی ۱۸ ماهه. عیب‌یابی رایگان و قطعات اورجینال در تهران، مطهری.',
  jsonLd: [breadcrumbJsonLd([['صفحه اصلی', '/']]), faqJsonLd],
}));
count++;

for (const [pathname, meta] of Object.entries(staticPages)) {
  const crumbs = [['صفحه اصلی', '/']];
  if (pathname.startsWith('/export/')) {
    crumbs.push(['صادرات', '/export'], [meta.title.split(' | ')[0], pathname]);
  } else if (pathname.startsWith('/warranty/')) {
    crumbs.push(['گارانتی', '/warranty'], [meta.title.split(' | ')[0], pathname]);
  } else if (pathname.startsWith('/repair/')) {
    crumbs.push(['مرکز تعمیرات', '/repair'], [meta.title.split(' | ')[0], pathname]);
  } else {
    crumbs.push([meta.title.split(' | ')[0], pathname]);
  }
  writePage(pathname, renderPage({
    url: pathname,
    title: meta.title,
    description: meta.description,
    jsonLd: [breadcrumbJsonLd(crumbs), ...(pathname.startsWith('/repair/') ? [faqJsonLd] : [])],
  }));
  count++;
}

for (const m of modelBlocks) {
  const url = `/repair/${m.slug}`;
  const prices = parsePrices(pricesSource, m.slug);
  const modelJsonLd = [
    breadcrumbJsonLd([['صفحه اصلی', '/'], ['مرکز تعمیرات', '/repair'], [m.title, url]]),
    faqJsonLd,
  ];
  if (prices && prices.length > 0) {
    const offers = prices.map(p => ({
      '@type': 'AggregateOffer',
      'itemOffered': {
        '@type': 'Service',
        'name': p.service,
        'provider': { '@id': `${SITE}/#organization` },
      },
      'lowPrice': p.min,
      'highPrice': p.max,
      'priceCurrency': 'IRR',
      'availability': 'https://schema.org/InStock',
      'url': `${SITE}${url}`,
    }));
    const aggRating = aggregateRatingJsonLd(m.slug);
    modelJsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': m.title,
      'url': `${SITE}${url}`,
      'image': `${SITE}${m.image}`,
      'brand': { '@type': 'Brand', 'name': m.title.split(' ')[2] || 'Electronics' },
      'offers': {
        '@type': 'AggregateOffer',
        'lowPrice': Math.min(...prices.map(p => p.min)),
        'highPrice': Math.max(...prices.map(p => p.max)),
        'priceCurrency': 'IRR',
        'offerCount': prices.length,
        'offers': offers,
        'availability': 'https://schema.org/InStock',
      },
      ...(aggRating ? { 'aggregateRating': aggRating, 'review': reviewJsonLd(m.slug) } : {}),
    });
  }
  writePage(url, renderPage({
    url,
    title: m.seoTitle,
    description: m.seoDesc,
    jsonLd: modelJsonLd,
  }));
  count++;
}

for (const p of products) {
  const url = `/product/${p.slug}`;
  writePage(url, renderPage({
    url,
    title: `مشخصات و قیمت ${p.name} | آرمان همراه`,
    description: `مشخصات کامل و قیمت محصول ${p.name} | خرید با گارانتی از آرمان همراه | استعلام قیمت: ۲۱-۵۸۷۹۸`,
    jsonLd: [
      breadcrumbJsonLd([['صفحه اصلی', '/'], ['محصولات', '/products'], [p.name, url]]),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': p.name,
        'image': `${SITE}/images/products/${p.slug}.webp`,
        'url': `${SITE}${url}`,
        'brand': { '@type': 'Brand', 'name': p.name.split(' ')[0] },
        'offers': {
          '@type': 'Offer',
          'availability': 'https://schema.org/InStock',
          'priceCurrency': 'IRR',
          'url': `${SITE}${url}`,
        },
      },
    ],
  }));
  count++;
}

for (const post of blogPosts) {
  const url = `/blog/${post.slug}`;
  writePage(url, renderPage({
    url,
    title: post.seoTitle,
    description: post.seoDesc,
    jsonLd: [
      breadcrumbJsonLd([['صفحه اصلی', '/'], ['بلاگ و آموزش', '/blog'], [post.title, url]]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': post.title,
        'description': post.excerpt,
        'datePublished': new Date().toISOString().slice(0, 10),
        'inLanguage': 'fa-IR',
        'author': { '@type': 'Organization', 'name': 'آرمان همراه ارتباطات آریا', 'url': SITE },
        'publisher': {
          '@type': 'Organization',
          'name': 'آرمان همراه',
          'logo': { '@type': 'ImageObject', 'url': `${SITE}/logo.jpeg` },
        },
        'mainEntityOfPage': `${SITE}${url}`,
      },
    ],
  }));
  count++;
}

for (const a of areas) {
  const url = `/repair/areas/${a.slug}`;
  writePage(url, renderPage({
    url,
    title: a.seoTitle,
    description: a.seoDesc,
    jsonLd: [
      breadcrumbJsonLd([['صفحه اصلی', '/'], ['مرکز تعمیرات', '/repair'], [`تعمیر موبایل در ${a.name} تهران`, url]]),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': `تعمیر موبایل در ${a.name} تهران`,
        'description': a.seoDesc,
        'serviceType': 'Repair Service',
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'آرمان همراه',
          'telephone': '+982158798',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۲، واحد ۲۰۴',
            'addressLocality': 'تهران',
            'addressCountry': 'IR',
          },
        },
        'areaServed': { '@type': 'AdministrativeArea', 'name': a.name },
      },
    ],
  }));
  count++;
}

console.log(`Prerendered ${count} static route pages`);