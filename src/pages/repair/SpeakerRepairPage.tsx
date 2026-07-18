import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentSpeaker from '@/components/repairs/RepairLongContentSpeaker';
import { ChevronLeft, Speaker } from 'lucide-react';

const SpeakerRepairPageContent = () => {
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span><Link to="/repair" className="hover:text-primary">تعمیرات</Link><span>/</span><span className="text-foreground font-bold">تعمیر اسپیکر و باند</span>
        </div>
        <section className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> بازگشت</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Speaker size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black">تعمیر اسپیکر بلوتوثی JBL سونی هارمن باند خانگی پارتی باکس ساندبار</h1>
                <p className="text-white/80 text-sm mt-1">آمپلی‌فایر، باتری، درایور، بلوتوث، پورت شارژ - با اسیلوسکوپ و نقشه شماتیک - گارانتی ۲ ماهه</p>
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
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default SpeakerRepairPage;
