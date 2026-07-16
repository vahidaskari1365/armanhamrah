import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentAudio from '@/components/repairs/RepairLongContentAudio';
import { ChevronLeft, Headphones, MapPin } from 'lucide-react';

const HeadphoneRepairPageContent = () => {
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span><Link to="/repair" className="hover:text-primary">تعمیرات</Link><span>/</span><span className="text-foreground font-bold">تعمیر هدفون</span>
        </div>
        <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> بازگشت</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Headphones size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black">تعمیر تخصصی هدفون بلوتوثی گلکسی بادز ۳ پرو و انکر R60i NC</h1>
                <p className="text-white/80 text-sm mt-1">باتری، اسپیکر، میکروفون، بلوتوث، ANC - انکر R50i P40i سونی JBL - گارانتی</p>
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

const HeadphoneRepairPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title="تعمیر هدفون بلوتوثی گلکسی بادز 3 پرو انکر R60i NC سونی JBL | باتری و میکروفون" description="مرکز تخصصی تعمیر هدفون تهران - تعمیر گلکسی بادز 3 پرو و بادز 3، انکر R60i NC R50i P40i، سونی، JBL با تعویض باتری، اسپیکر، میکروفون و بلوتوث - گارانتی 2 ماهه علاءالدین - بیا پیش ما" />
          <HeadphoneRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default HeadphoneRepairPage;
