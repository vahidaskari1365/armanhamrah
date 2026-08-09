import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { businessInfo, siteUrl } from '@/data/business';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SEO = ({ title, description, image, url, type = 'website', jsonLd }: SEOProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  
  const defaultTitle = language === 'fa' 
    ? 'آرمان همراه | مرکز خدمات پس از فروش تعمیرات ایرپاد، PS5 و گوشی در تهران'
    : 'Arman Hamrah | Pro Repair Center for AirPods, PS5 & Mobiles';
    
  const defaultDescription = language === 'fa'
    ? 'مرکز خدمات پس از فروش تخصصی تعمیرات گوشی، PS5 و ایرپاد با گارانتی ۱۸ ماهه. عیب‌یابی رایگان و قطعات اورجینال در تهران، مطهری.'
    : 'Professional repair center for Mobile phones, PS5, and AirPods with 18-month warranty. Free diagnosis and original parts in Tehran.';

  const defaultImage = `${siteUrl}/og-image.jpg`;
  const finalImage = image || defaultImage;
  const currentPath = location.pathname === '/' ? '' : location.pathname;
  const finalUrl = url || `${siteUrl}${currentPath}`;
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const siteName = language === 'fa' ? 'آرمان همراه - مرکز تخصصی تعمیرات' : 'Arman Hamrah Repair Center';

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ElectronicsStore", "ComputerRepairShop"],
    "@id": `${siteUrl}/#organization`,
    "name": businessInfo.name,
    "alternateName": ["Arman Hamrah", "آرمان همراه", "مرکز خدمات پس از فروش آرمان همراه", "مرکز تعمیرات علاءالدین"],
    "url": siteUrl,
    "logo": `${siteUrl}/logo.jpeg`,
    "image": `${siteUrl}/og-image.jpg`,
    "description": finalDescription,
    "foundingDate": "2014",
    "foundingLocation": { "@type": "Place", "name": "Tehran, Iran" },
    "email": businessInfo.email,
    "telephone": businessInfo.headOffice.telephone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessInfo.headOffice.streetAddress,
      "addressLocality": businessInfo.headOffice.addressLocality,
      "addressRegion": businessInfo.headOffice.addressRegion,
      "postalCode": businessInfo.headOffice.postalCode,
      "addressCountry": businessInfo.headOffice.addressCountry
    },
    "geo": { "@type": "GeoCoordinates", "latitude": businessInfo.geo.latitude, "longitude": businessInfo.geo.longitude },
    "openingHoursSpecification": [businessInfo.openingHours],
    "areaServed": { "@type": "City", "name": "Tehran", "containedInPlace": { "@type": "Country", "name": "Iran" } },
    "serviceArea": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": businessInfo.geo.latitude, "longitude": businessInfo.geo.longitude }, "geoRadius": 50000 },
    "sameAs": [
      "https://www.instagram.com/armanholdingco/",
      "https://t.me/armanhamrah",
      "https://www.linkedin.com/in/arman-corp-a443813a2/"
    ],
    "knowsAbout": [
      "تعمیرات موبایل تهران", "تعمیر آیفون", "تعمیر سامسونگ", "تعمیر شیائومی", "تعمیر PS5", "تعمیر دسته PS5", "تعمیر ایرپاد", "تعمیر هدفون", "تعمیر ساعت هوشمند", "تعمیر اپل واچ", "تعمیر گلکسی واچ", "تعمیر اسپیکر", "تعمیر باند"
    ],
    "brand": ["Apple", "Samsung", "Xiaomi", "Sony", "Harman Kardon", "Anker", "Poco", "Nokia", "Huawei", "OnePlus", "JBL"],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "IR",
      "availableLanguage": ["Persian", "English"],
      "telephone": businessInfo.afterSales.telephone
    },
    "makesOffer": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیرات تخصصی گوشی موبایل" : "Mobile Repair" }, "areaServed": "Tehran", "priceCurrency": "IRR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیر PS5 و دسته DualSense" : "PS5 Repair" }, "areaServed": "Tehran", "priceCurrency": "IRR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیر ایرپاد و هدفون بلوتوثی" : "AirPods Repair" }, "areaServed": "Tehran", "priceCurrency": "IRR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیر ساعت هوشمند" : "Smartwatch Repair" }, "areaServed": "Tehran", "priceCurrency": "IRR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیر اسپیکر و باند" : "Speaker Repair" }, "areaServed": "Tehran", "priceCurrency": "IRR" }
    ],
    "department": [
      { "@id": `${siteUrl}/#after-sales` },
      { "@id": `${siteUrl}/#store` }
    ]
  };

  const afterSalesJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#after-sales`,
    "name": businessInfo.afterSales.name,
    "url": siteUrl,
    "telephone": businessInfo.afterSales.telephone,
    "image": `${siteUrl}/og-image.jpg`,
    "parentOrganization": { "@id": `${siteUrl}/#organization` },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessInfo.afterSales.streetAddress,
      "addressLocality": businessInfo.afterSales.addressLocality,
      "addressRegion": businessInfo.afterSales.addressRegion,
      "postalCode": businessInfo.afterSales.postalCode,
      "addressCountry": businessInfo.afterSales.addressCountry
    },
    "openingHoursSpecification": [businessInfo.openingHours]
  };

  const storeJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ElectronicsStore"],
    "@id": `${siteUrl}/#store`,
    "name": businessInfo.store.name,
    "url": siteUrl,
    "telephone": businessInfo.store.telephone,
    "image": `${siteUrl}/og-image.jpg`,
    "parentOrganization": { "@id": `${siteUrl}/#organization` },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessInfo.store.streetAddress,
      "addressLocality": businessInfo.store.addressLocality,
      "addressRegion": businessInfo.store.addressRegion,
      "addressCountry": businessInfo.store.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": businessInfo.store.mobile,
      "areaServed": "IR",
      "availableLanguage": ["Persian"]
    },
    "openingHoursSpecification": [businessInfo.openingHours]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": siteUrl,
    "inLanguage": language === 'fa' ? 'fa-IR' : 'en-US',
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const extraJsonLd = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    : [];

  return (
    <Helmet>
      <html lang={language} dir={language === 'fa' ? 'rtl' : 'ltr'} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="آرمان همراه ارتباطات آریا" />
      <meta name="theme-color" content="#000000" />
      <meta name="geo.position" content="35.6892;51.3890" />
      <meta name="geo.placename" content="Tehran, Iran" />
      <meta name="geo.region" content="IR-07" />
      <meta name="ICBM" content="35.6892, 51.3890" />
      <meta name="rating" content="General" />
      <meta name="copyright" content="آرمان همراه ارتباطات آریا" />
      <meta name="distribution" content="Global" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:locale" content={language === 'fa' ? 'fa_IR' : 'en_US'} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1424" />
      <meta property="og:image:height" content="752" />
      <meta property="og:image:alt" content={finalTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={finalTitle} />

      {/* Canonical & Hreflang */}
      <link rel="canonical" href={finalUrl} />
      <link rel="alternate" hrefLang="fa-IR" href={finalUrl} />
      <link rel="alternate" hrefLang="x-default" href={finalUrl} />

      {/* GEO & AEO & AIO */}
      <meta name="subject" content="تعمیرات تخصصی موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند" />
      <meta name="classification" content="Repair Service" />
      <meta name="geography" content="Tehran, Iran" />
      <meta name="language" content={language === 'fa' ? 'fa-IR' : 'en-US'} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(afterSalesJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(storeJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      {extraJsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
