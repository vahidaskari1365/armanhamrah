import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SEO = ({ title, description, image, url, type = 'website', keywords, jsonLd }: SEOProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  
  const defaultTitle = language === 'fa' 
    ? 'آرمان همراه | مرکز تخصصی تعمیرات موبایل، PS5، ایرپاد، ساعت هوشمند، اسپیکر و باند | گارانتی ۱۸ ماهه'
    : 'Arman Hamrah | Repair Center for Mobile, PS5, AirPods, Smartwatch, Speaker | 18 Month Warranty';
    
  const defaultDescription = language === 'fa'
    ? 'مرکز فوق تخصصی تعمیرات انواع گوشی موبایل آیفون ۱۷ پرو، سامسونگ S25 Ultra، شیائومی، PS5 و دسته DualSense، ایرپاد پرو ۲، هدفون بلوتوثی، ساعت هوشمند اپل واچ و گلکسی واچ، اسپیکر و باند با قطعات اورجینال، عیب‌یابی رایگان و گارانتی ۳ ماهه - آرمان همراه تهران علاءالدین'
    : 'Professional repair center for iPhone, Samsung, Xiaomi mobiles, PS5 and DualSense, AirPods Pro 2, headphones, Apple Watch, Galaxy Watch, speakers and home audio with original parts, free diagnosis and 3-month warranty - Tehran Aladdin';

  const siteUrl = 'https://armanhamrah.com';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const finalImage = image || defaultImage;
  const currentPath = location.pathname === '/' ? '' : location.pathname;
  const finalUrl = url || `${siteUrl}${currentPath}`;
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const siteName = language === 'fa' ? 'آرمان همراه - مرکز تخصصی تعمیرات' : 'Arman Hamrah Repair Center';

  const megaKeywordsFa = `تعمیرات موبایل, تعمیر گوشی, تعمیرات تخصصی موبایل, تعمیر گوشی آیفون, تعمیر آیفون ۱۷ پرو, تعمیر آیفون ۱۶ پرو, تعمیرات سامسونگ, تعمیر سامسونگ S25 Ultra, تعمیر S24 Ultra, تعمیر گلکسی A56, تعمیر گلکسی A36, تعمیرات شیائومی, تعمیر شیائومی 15T, تعمیر ردمی نوت ۱۴ پرو, تعمیرات پوکو, تعمیر پوکو M7, تعمیرات نوکیا, تعمیر PS5, تعمیر پلی استیشن 5, تعمیر PS5 اسلیم, تعمیر PS5 فت, تعمیر دسته PS5, تعمیر DualSense, تعمیر ایرپاد, تعمیر ایرپاد پرو 2, تعمیر ایرپاد 4, تعمیر ایرپاد مکس, تعمیر هدفون, تعمیر هدفون بلوتوثی, تعمیر گلکسی بادز 3 پرو, تعمیر انکر R60i, تعمیر انکر R50i, تعمیر ساعت هوشمند, تعمیر اپل واچ, تعمیر اپل واچ اولترا 3, تعمیر اپل واچ سری 11, تعمیر گلکسی واچ 8, تعمیر گلکسی واچ 7, تعمیر واچ اولترا, تعمیر اسپیکر, تعمیر اسپیکر بلوتوثی, تعمیر باند, تعمیر باند خانگی, تعمیر پارتی باکس, تعمیر ساندبار, تعمیر پاوربانک, تعمیرات تهران, مرکز تعمیرات علاءالدین, تعمیر برد موبایل, تعویض ال سی دی, تعویض باتری, تعمیر آبخوردگی, گارانتی آرمان همراه, گارانتی ۱۸ ماهه`;

  const megaKeywordsEn = `mobile repair Tehran, iPhone repair, Samsung Galaxy repair, Xiaomi repair, PS5 repair, DualSense repair, AirPods Pro repair, headphone repair, Galaxy Buds repair, smartwatch repair, Apple Watch repair, Galaxy Watch repair, speaker repair, bluetooth speaker repair, powerbank repair, Arman Hamrah warranty, Aladdin passage repair center`;

  const finalKeywords = keywords || (language === 'fa' ? megaKeywordsFa : megaKeywordsEn);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ElectronicsStore", "ComputerRepairShop"],
    "name": language === 'fa' ? "آرمان همراه ارتباطات آریا - مرکز تخصصی تعمیرات موبایل و PS5" : "Arman Hamrah Aria Communications - Repair Center",
    "alternateName": ["Arman Hamrah", "آرمان همراه", "مرکز تعمیرات موبایل علاءالدین"],
    "url": siteUrl,
    "logo": `${siteUrl}/logo.jpeg`,
    "description": finalDescription,
    "foundingDate": "2014",
    "areaServed": { "@type": "Country", "name": "Iran" },
    "sameAs": [],
    "knowsAbout": [
      "تعمیرات موبایل", "تعمیر آیفون", "تعمیر سامسونگ", "تعمیر شیائومی", 
      "تعمیر PS5", "تعمیر دسته PS5", "تعمیر ایرپاد", "تعمیر هدفون", 
      "تعمیر ساعت هوشمند", "تعمیر اپل واچ", "تعمیر گلکسی واچ", 
      "تعمیر اسپیکر", "تعمیر باند", "تعمیر پاوربانک"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "IR",
      "availableLanguage": ["Persian", "English"],
      "telephone": "+98-21-XXXX"
    },
    "brand": ["Apple", "Samsung", "Xiaomi", "Sony", "Harman Kardon", "Anker", "Poco", "Nokia"],
    "makesOffer": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیرات تخصصی گوشی موبایل" : "Mobile Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیر PS5 و دسته" : "PS5 Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیر ایرپاد و هدفون" : "AirPods Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیر ساعت هوشمند" : "Smartwatch Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fa' ? "تعمیر اسپیکر و باند" : "Speaker Repair" } }
    ]
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
      <link rel="alternate" hrefLang="en-US" href={finalUrl} />
      <link rel="alternate" hrefLang="x-default" href={finalUrl} />
      
      {/* Keywords - Heavy SEO for repairs */}
      <meta name="keywords" content={finalKeywords} />

      {/* GEO & AEO & AIO */}
      <meta name="subject" content="تعمیرات تخصصی موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند" />
      <meta name="classification" content="Repair Service" />
      <meta name="geography" content="Tehran, Iran" />
      <meta name="language" content={language === 'fa' ? 'fa-IR' : 'en-US'} />

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
