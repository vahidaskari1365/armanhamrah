import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO = ({ title, description, image, url }: SEOProps) => {
  const { language } = useLanguage();
  
  const defaultTitle = language === 'fa' 
    ? 'آرمان همراه | هوشمندترین گارانتی و خدمات پس از فروش در ایران'
    : 'Arman Hamrah | The Smartest Warranty & After-Sales Services in Iran';
    
  const defaultDescription = language === 'fa'
    ? 'شرکت گارانتی آرمان همراه ارتباطات آریا، ارائه دهنده خدمات گارانتی و پس از فروش برای برندهای Apple، Samsung، Xiaomi و Sony از سال ۱۳۹۳'
    : 'Arman Hamrah Aria Communications Warranty Company, providing warranty and after-sales services for Apple, Samsung, Xiaomi and Sony brands since 2014';

  const siteUrl = 'https://armanhamrah.com';

  return (
    <Helmet>
      <html lang={language} dir={language === 'fa' ? 'rtl' : 'ltr'} />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={url || siteUrl} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Canonical */}
      <link rel="canonical" href={url || siteUrl} />
      
      {/* Keywords */}
      <meta name="keywords" content={language === 'fa' 
        ? 'گارانتی آرمان همراه, خدمات پس از فروش, گارانتی اپل, گارانتی سامسونگ, گارانتی شیائومی, گارانتی سونی, تعمیرات موبایل'
        : 'Arman Hamrah warranty, after-sales services, Apple warranty, Samsung warranty, Xiaomi warranty, Sony warranty, mobile repair'
      } />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": language === 'fa' ? "آرمان همراه ارتباطات آریا" : "Arman Hamrah Aria Communications",
          "url": siteUrl,
          "description": description || defaultDescription,
          "foundingDate": "2014",
          "areaServed": "Iran",
          "serviceType": ["Warranty Services", "After-Sales Services", "Mobile Repair"],
          "brand": ["Apple", "Samsung", "Xiaomi", "Sony", "Harman Kardon"]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
