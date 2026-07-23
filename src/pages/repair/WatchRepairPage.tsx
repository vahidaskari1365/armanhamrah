import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentWatch from '@/components/repairs/RepairLongContentWatch';
import { ChevronLeft, Watch } from 'lucide-react';
import HowToSchema from '@/components/HowToSchema';
import ServiceSchema from '@/components/ServiceSchema';
import ImageObjectSchema from '@/components/ImageObjectSchema';

const WatchRepairPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">{isFa ? 'خانه' : 'Home'}</Link><span>/</span>
          <Link to="/repair" className="hover:text-primary">{isFa ? 'تعمیرات' : 'Repairs'}</Link><span>/</span>
          <span className="text-foreground font-bold warranty-title">{isFa ? 'تعمیر ساعت هوشمند' : 'Smartwatch Repair'}</span>
        </div>
        <section className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> {isFa ? 'بازگشت' : 'Back'}</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Watch size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black warranty-title">{isFa ? 'تعمیر ساعت هوشمند اپل واچ اولترا ۳ و گلکسی واچ ۸ - تعویض گلس و باتری' : 'Smartwatch Repair - Apple Watch Ultra 3 & Galaxy Watch 8 - Glass & Battery'}</h1>
                <p className="text-white/80 text-sm mt-1 warranty-text">{isFa ? 'گلس شکسته، باتری باد، ECG، تاچ، شارژ، آبخوردگی - اتاق تمیز و چسب IP - گارانتی ۳ ماهه' : 'Broken glass, swollen battery, ECG, touch, charging, water damage - clean room & IP glue - 3-month warranty'}</p>
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
          <SEO title="تعمیر ساعت هوشمند اپل واچ اولترا 3 سری 11 گلکسی واچ 8 | تعویض گلس باتری | تهران" description="تخصصی‌ترین مرکز تعمیر ساعت هوشمند تهران - تعمیر اپل واچ اولترا 3 و سری 11، گلکسی واچ 8 و واچ 7 و اولترا - تعویض گلس، باتری، سنسور ECG و برد با اتاق تمیز و گارانتی 3 ماهه" />
          <BreadcrumbSchema />
          <HowToSchema name={language === 'fa' ? 'فرآیند تعمیر در آرمان همراه' : 'Repair Process at Arman Hamrah'} steps={[{ text: language === 'fa' ? 'پذیرش رایگان و ثبت سفارش با کد پیگیری' : 'Free acceptance and order registration' }, { text: language === 'fa' ? 'عیب‌یابی دقیق با میکروسکوپ' : 'Accurate diagnosis with microscope' }, { text: language === 'fa' ? 'اعلام قیمت شفاف و تایید مشتری' : 'Transparent price announcement' }, { text: language === 'fa' ? 'تعمیر تخصصی و تحویل با گارانتی' : 'Specialized repair and delivery with warranty' }]} />
          <FAQSchema />
          <WatchRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WatchRepairPage;
