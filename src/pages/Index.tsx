import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import Subsidiaries from '@/components/Subsidiaries';
import pageBg from '@/assets/page-bg.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": language === 'fa' ? "آرمان همراه ارتباطات آریا" : "Arman Hamrah Ertebatat Aria",
    "image": "https://armanhamrah.com/og-image.jpg",
    "url": "https://armanhamrah.com",
    "telephone": "+9821-12345678",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": language === 'fa'
        ? "خیابان جمهوری، پاساژ علاءالدین، طبقه ششم، پلاک ۶۱۴"
        : "Jomhouri St., Aladdin Passage, 6th Floor, No. 614",
      "addressLocality": language === 'fa' ? "تهران" : "Tehran",
      "addressRegion": language === 'fa' ? "تهران" : "Tehran Province",
      "addressCountry": "IR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.6892",
      "longitude": "51.3890"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <HelmetProvider>
      <SEO jsonLd={localBusinessJsonLd} />
      <FAQSchema />
      <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties}>
        <Navbar />
        <main>
          <Hero />
          <Brands />
          <Services />
          <Subsidiaries />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Index;