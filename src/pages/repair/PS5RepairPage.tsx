import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentPS5 from '@/components/repairs/RepairLongContentPS5';
import { ChevronLeft, Gamepad2 } from 'lucide-react';

const PS5RepairPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">{isFa ? 'خانه' : 'Home'}</Link><span>/</span>
          <Link to="/repair" className="hover:text-primary">{isFa ? 'تعمیرات' : 'Repairs'}</Link><span>/</span>
          <span className="text-foreground font-bold warranty-title">{isFa ? 'تعمیر PS5' : 'PS5 Repair'}</span>
        </div>
        <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6">
              <ChevronLeft size={20} /> {isFa ? 'بازگشت به هاب' : 'Back to Hub'}
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Gamepad2 size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black warranty-title">{isFa ? 'تعمیر تخصصی PS5 اسلیم، فت، دیجیتال و دسته DualSense' : 'Professional PS5 Slim, Fat, Digital and DualSense Repair'}</h1>
                <p className="text-white/80 text-sm mt-1 warranty-text">{isFa ? 'تعمیر HDMI تصویر ندادن، برد روشن نشدن، فن اورهیت، دریفت دسته - ۹۸٪ موفقیت - گارانتی ۹۰ روزه' : 'HDMI no image, board no power, fan overheating, drift - 98% success - 90-day warranty'}</p>
              </div>
            </div>
          </div>
        </section>
        <RepairLongContentPS5 />
      </main>
      <Footer />
    </div>
  );
};

const PS5RepairPage = () => {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
      { "@type": "ListItem", "position": 2, "name": "تعمیرات", "item": "https://armanhamrah.com/repair" },
      { "@type": "ListItem", "position": 3, "name": "تعمیر PS5", "item": "https://armanhamrah.com/repair/ps5" }
    ]
  };
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title="تعمیر PS5 اسلیم و فت و دسته DualSense تخصصی | HDMI، برد، اورهیت، دریفت | گارانتی 90 روزه تهران" description="تخصصی‌ترین مرکز تعمیر PS5 تهران - تعمیر HDMI تصویر ندادن، برد روشن نشدن، فن اورهیت، دسته دریفت، درایو، SSD با قطعه اصلی و گارانتی 90 روزه" jsonLd={[breadcrumb]} />
          <PS5RepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default PS5RepairPage;
