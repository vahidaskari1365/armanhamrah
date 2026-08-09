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
import RepairLongContentSpeaker from '@/components/repairs/RepairLongContentSpeaker';
import { ChevronLeft, Speaker } from 'lucide-react';
import ProcessStepsSchema from '@/components/ProcessStepsSchema';
import ServiceSchema from '@/components/ServiceSchema';
import ImageObjectSchema from '@/components/ImageObjectSchema';

const SpeakerRepairPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">{isFa ? 'خانه' : 'Home'}</Link><span>/</span>
          <Link to="/repair" className="hover:text-primary">{isFa ? 'تعمیرات' : 'Repairs'}</Link><span>/</span>
          <span className="text-foreground font-bold warranty-title">{isFa ? 'تعمیر اسپیکر و باند' : 'Speaker & Audio Repair'}</span>
        </div>
        <section className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> {isFa ? 'بازگشت' : 'Back'}</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Speaker size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black warranty-title">{isFa ? 'تعمیر اسپیکر بلوتوثی JBL سونی هارمن باند خانگی پارتی باکس ساندبار' : 'Bluetooth Speaker JBL Sony Harman Home PartyBox Soundbar Repair'}</h1>
                <p className="text-white/80 text-sm mt-1 warranty-text">{isFa ? 'آمپلی‌فایر، باتری، درایور، بلوتوث، پورت شارژ - با اسیلوسکوپ و نقشه شماتیک - گارانتی ۲ ماهه' : 'Amplifier, battery, driver, Bluetooth, charging port - with oscilloscope and schematic - 2-month warranty'}</p>
              </div>
            </div>
          </div>
        </section>
        <RepairLongContentSpeaker />
      </main>
      <Footer />
    </div>
  );
};

const SpeakerRepairPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title="تعمیر اسپیکر بلوتوثی JBL سونی هارمن باند پارتی باکس ساندبار | آمپلی‌فایر باتری | تهران" description="مرکز تخصصی تعمیر اسپیکر و باند تهران - تعمیر JBL Charge 5 Flip 6 Xtreme سونی SRS هارمن کاردن پارتی باکس ساندبار باند اکتیو با تعمیر آمپلی‌فایر، باتری، درایور و برد بلوتوث با اسیلوسکوپ و گارانتی 2 ماهه" />
          <BreadcrumbSchema />
          <ProcessStepsSchema name={language === 'fa' ? 'فرآیند تعمیر در آرمان همراه' : 'Repair Process at Arman Hamrah'} steps={[{ text: language === 'fa' ? 'پذیرش رایگان و ثبت سفارش با کد پیگیری' : 'Free acceptance and order registration' }, { text: language === 'fa' ? 'عیب‌یابی دقیق با میکروسکوپ' : 'Accurate diagnosis with microscope' }, { text: language === 'fa' ? 'اعلام قیمت شفاف و تایید مشتری' : 'Transparent price announcement' }, { text: language === 'fa' ? 'تعمیر تخصصی و تحویل با گارانتی' : 'Specialized repair and delivery with warranty' }]} />
          <FAQSchema />
          <SpeakerRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default SpeakerRepairPage;
