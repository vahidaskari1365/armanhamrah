import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SEO = ({ title, description, image, url, type = 'website', jsonLd }: SEOProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  
  const defaultTitle = language === 'fa' 
    ? 'آرمان همراه | هوشمندترین گارانتی و خدمات پس از فروش در ایران'
    : 'Arman Hamrah | The Smartest Warranty & After-Sales Services in Iran';
    
  const defaultDescription = language === 'fa'
    ? 'شرکت گارانتی آرمان همراه ارتباطات آریا، ارائه دهنده خدمات گارانتی و پس از فروش برای برندهای Apple، Samsung، Xiaomi و Sony از سال ۱۳۹۳'
    : 'Arman Hamrah Aria Communications Warranty Company, providing warranty and after-sales services for Apple, Samsung, Xiaomi and Sony brands since 2014';

  const siteUrl = 'https://armanhamrah.com';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const finalImage = image || defaultImage;
  const currentPath = location.pathname === '/' ? '' : location.pathname;
  const finalUrl = url || `${siteUrl}${currentPath}`;
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const siteName = language === 'fa' ? 'آرمان همراه' : 'Arman Hamrah';

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": language === 'fa' ? "آرمان همراه ارتباطات آریا" : "Arman Hamrah Aria Communications",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.ico`,
    "description": finalDescription,
    "foundingDate": "2014",
    "areaServed": "IR",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "IR",
      "availableLanguage": ["Persian", "English"]
    },
    "brand": ["Apple", "Samsung", "Xiaomi", "Sony", "Harman Kardon"]
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
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:locale" content={language === 'fa' ? 'fa_IR' : 'en_US'} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Keywords */}
      <meta name="keywords" content={language === 'fa' 
        ? 'گارانتی آرمان همراه, خدمات پس از فروش, گارانتی اپل, گارانتی سامسونگ, گارانتی شیائومی, گارانتی سونی, تعمیرات موبایل'
        : 'Arman Hamrah warranty, after-sales services, Apple warranty, Samsung warranty, Xiaomi warranty, Sony warranty, mobile repair'
      } />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      {extraJsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
