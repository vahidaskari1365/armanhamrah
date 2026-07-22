import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const baseUrl = 'https://armanhamrah.com';
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'صفحه اصلی', url: baseUrl }
  ];

  const pathMap: Record<string, { name: string; parent?: string }> = {
    '/repair': { name: 'تعمیرات' },
    '/repair/mobile': { name: 'تعمیر موبایل', parent: '/repair' },
    '/repair/ps5': { name: 'تعمیر PS5', parent: '/repair' },
    '/repair/airpods': { name: 'تعمیر ایرپاد', parent: '/repair' },
    '/repair/headphone': { name: 'تعمیر هدفون', parent: '/repair' },
    '/repair/smartwatch': { name: 'تعمیر ساعت هوشمند', parent: '/repair' },
    '/repair/watch': { name: 'تعمیر ساعت', parent: '/repair' },
    '/repair/speaker': { name: 'تعمیر اسپیکر', parent: '/repair' },
    '/repair/speaker-band': { name: 'تعمیر باند', parent: '/repair' },
    '/repair/iphone-17-pro': { name: 'تعمیر آیفون ۱۷ پرو', parent: '/repair/mobile' },
    '/repair/iphone-16-pro': { name: 'تعمیر آیفون ۱۶ پرو', parent: '/repair/mobile' },
    '/repair/samsung-s25-ultra': { name: 'تعمیر سامسونگ S25 اولترا', parent: '/repair/mobile' },
    '/repair/samsung-s24-ultra': { name: 'تعمیر سامسونگ S24 اولترا', parent: '/repair/mobile' },
    '/repair/ps5-slim': { name: 'تعمیر PS5 اسلیم', parent: '/repair/ps5' },
    '/repair/airpods-pro-2': { name: 'تعمیر ایرپاد پرو ۲', parent: '/repair/airpods' },
    '/repair/galaxy-buds3-pro': { name: 'تعمیر گلکسی بادز ۳ پرو', parent: '/repair/airpods' },
    '/repair/apple-watch-ultra-3': { name: 'تعمیر اپل واچ اولترا ۳', parent: '/repair/smartwatch' },
    '/repair/galaxy-watch-8': { name: 'تعمیر گلکسی واچ ۸', parent: '/repair/smartwatch' },
    '/repair/jbl-charge-5': { name: 'تعمیر JBL Charge 5', parent: '/repair/speaker' },
    '/warranty': { name: 'گارانتی' },
    '/warranty/conditions': { name: 'شرایط گارانتی', parent: '/warranty' },
    '/warranty/accessories': { name: 'لوازم جانبی', parent: '/warranty' },
    '/warranty/repairs': { name: 'تعمیرات گارانتی', parent: '/warranty' },
    '/products': { name: 'محصولات' },
    '/contact': { name: 'تماس با ما' },
    '/about': { name: 'درباره ما' },
    '/representatives': { name: 'نمایندگی‌ها' },
    '/export': { name: 'صادرات' },
  };

  // Handle dynamic routes like /repair/:model
  if (pathname.startsWith('/repair/')) {
    const modelPath = pathMap[pathname];
    if (modelPath) {
      if (modelPath.parent) {
        const parent = pathMap[modelPath.parent];
        if (parent) {
          breadcrumbs.push({ name: parent.name, url: `${baseUrl}${modelPath.parent}` });
        }
      }
      breadcrumbs.push({ name: modelPath.name, url: `${baseUrl}${pathname}` });
    } else {
      // Dynamic model page
      const modelName = pathname.split('/').pop()?.replace(/-/g, ' ') || '';
      breadcrumbs.push({ name: `تعمیر ${modelName}`, url: `${baseUrl}${pathname}` });
    }
    return breadcrumbs;
  }

  const staticPath = pathMap[pathname];
  if (staticPath) {
    if (staticPath.parent) {
      const parent = pathMap[staticPath.parent];
      if (parent) {
        breadcrumbs.push({ name: parent.name, url: `${baseUrl}${staticPath.parent}` });
      }
    }
    breadcrumbs.push({ name: staticPath.name, url: `${baseUrl}${pathname}` });
  }

  return breadcrumbs;
};

const BreadcrumbSchema = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  if (breadcrumbs.length <= 1) return null;

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbList)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;
