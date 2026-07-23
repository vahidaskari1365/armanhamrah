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
import RepairLongContentHeadphone from '@/components/repairs/RepairLongContentHeadphone';
import { ChevronLeft, Headphones } from 'lucide-react';
import HowToSchema from '@/components/HowToSchema';
import ServiceSchema from '@/components/ServiceSchema';
import ImageObjectSchema from '@/components/ImageObjectSchema';

const HeadphoneRepairPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">{isFa ? 'خانه' : 'Home'}</Link><span>/</span>
          <Link to="/repair" className="hover:text-primary">{isFa ? 'تعمیرات' : 'Repairs'}</Link><span>/</span>
          <span className="text-foreground font-bold warranty-title">{isFa ? 'تعمیر هدفون' : 'Headphone Repair'}</span>
        </div>
        <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> {isFa ? 'بازگشت' : 'Back'}</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Headphones size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black warranty-title">{isFa ? 'تعمیر تخصصی هدفون بلوتوثی گلکسی بادز ۳ پرو و انکر R60i NC' : 'Professional Bluetooth Headphone Repair - Galaxy Buds 3 Pro & Anker R60i NC'}</h1>
                <p className="text-white/80 text-sm mt-1 warranty-text">{isFa ? 'باتری، اسپیکر، میکروفون، بلوتوث، ANC - انکر R50i P40i سونی JBL - گارانتی' : 'Battery, speaker, mic, Bluetooth, ANC - Anker R50i P40i Sony JBL - Warranty'}</p>
              </div>
            </div>
          </div>
        </section>
        <RepairLongContentHeadphone />
      </main>
      <Footer />
    </div>
  );
};

const HeadphoneRepairPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title="تعمیر هدفون بلوتوثی گلکسی بادز 3 پرو انکر R60i NC سونی JBL | باتری و میکروفون" description="مرکز تخصصی تعمیر هدفون تهران - تعمیر گلکسی بادز 3 پرو و بادز 3، انکر R60i NC R50i P40i، سونی، JBL با تعویض باتری، اسپیکر، میکروفون و بلوتوث - گارانتی 2 ماهه" />
          <BreadcrumbSchema />
          <HowToSchema name={language === 'fa' ? 'فرآیند تعمیر در آرمان همراه' : 'Repair Process at Arman Hamrah'} steps={[{ text: language === 'fa' ? 'پذیرش رایگان و ثبت سفارش با کد پیگیری' : 'Free acceptance and order registration' }, { text: language === 'fa' ? 'عیب‌یابی دقیق با میکروسکوپ' : 'Accurate diagnosis with microscope' }, { text: language === 'fa' ? 'اعلام قیمت شفاف و تایید مشتری' : 'Transparent price announcement' }, { text: language === 'fa' ? 'تعمیر تخصصی و تحویل با گارانتی' : 'Specialized repair and delivery with warranty' }]} />
          <FAQSchema />
          <HeadphoneRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default HeadphoneRepairPage;
