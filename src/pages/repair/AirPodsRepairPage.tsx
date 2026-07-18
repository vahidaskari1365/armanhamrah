import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentAudio from '@/components/repairs/RepairLongContentAudio';
import { ChevronLeft, Headset } from 'lucide-react';

const AirPodsRepairPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">{isFa ? 'خانه' : 'Home'}</Link><span>/</span>
          <Link to="/repair" className="hover:text-primary">{isFa ? 'تعمیرات' : 'Repairs'}</Link><span>/</span>
          <span className="text-foreground font-bold warranty-title">{isFa ? 'تعمیر ایرپاد' : 'AirPods Repair'}</span>
        </div>
        <section className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> {isFa ? 'بازگشت' : 'Back'}</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Headset size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black warranty-title">{isFa ? 'تعمیر تخصصی ایرپاد پرو ۲، ایرپاد ۴، ایرپاد مکس - تعویض باتری Varta' : 'Professional AirPods Pro 2, 4, Max Repair - Varta Battery Replacement'}</h1>
                <p className="text-white/80 text-sm mt-1 warranty-text">{isFa ? 'باتری، کیس، یک گوش، میکروفون، ANC - با چسب B7000 و پرس - گارانتی ۲ ماهه' : 'Battery, case, one side, mic, ANC - with B7000 glue and press - 2-month warranty'}</p>
              </div>
            </div>
          </div>
        </section>
        <RepairLongContentAudio />
      </main>
      <Footer />
    </div>
  );
};

const AirPodsRepairPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title="تعمیر ایرپاد پرو ۲، ایرپاد ۴، ایرپاد مکس | تعویض باتری Varta و کیس | گارانتی تهران" description="تخصصی‌ترین مرکز تعمیر ایرپاد پرو ۲ و ایرپاد ۴ و مکس تهران - تعویض باتری Varta آلمان، تعمیر کیس MagSafe، رفع یک گوش، میکروفون و ANC با چسب B7000 و گارانتی ۲ ماهه" />
          <AirPodsRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default AirPodsRepairPage;
