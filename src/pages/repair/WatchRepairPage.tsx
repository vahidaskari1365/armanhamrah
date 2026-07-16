import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentWatch from '@/components/repairs/RepairLongContentWatch';
import { ChevronLeft, Watch, MapPin } from 'lucide-react';

const WatchRepairPageContent = () => {
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span><Link to="/repair" className="hover:text-primary">تعمیرات</Link><span>/</span><span className="text-foreground font-bold">تعمیر ساعت هوشمند</span>
        </div>
        <section className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> بازگشت</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Watch size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black">تعمیر ساعت هوشمند اپل واچ اولترا ۳ و گلکسی واچ ۸ - تعویض گلس و باتری</h1>
                <p className="text-white/80 text-sm mt-1">گلس شکسته، باتری باد، ECG، تاچ، شارژ، آبخوردگی - اتاق تمیز و چسب IP - گارانتی ۳ ماهه</p>
              </div>
            </div>
          </div>
        </section>
        <RepairLongContentWatch />
      </main>
      <Footer />
    </div>
  );
};

const WatchRepairPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title="تعمیر ساعت هوشمند اپل واچ اولترا 3 سری 11 گلکسی واچ 8 | تعویض گلس باتری | تهران" description="تخصصی‌ترین مرکز تعمیر ساعت هوشمند تهران - تعمیر اپل واچ اولترا 3 بلک تیتانیوم و سری 11 46mm، گلکسی واچ 8 44mm و واچ 7 و اولترا - تعویض گلس، باتری، سنسور ECG و برد با اتاق تمیز و گارانتی 3 ماهه - بیا پیش ما علاءالدین" />
          <WatchRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WatchRepairPage;
