import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentAudio from '@/components/repairs/RepairLongContentAudio';
import { ChevronLeft, Headset, MapPin } from 'lucide-react';

const AirPodsRepairPageContent = () => {
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span><Link to="/repair" className="hover:text-primary">تعمیرات</Link><span>/</span><span className="text-foreground font-bold">تعمیر ایرپاد</span>
        </div>
        <section className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> بازگشت</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Headset size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black">تعمیر تخصصی ایرپاد پرو ۲، ایرپاد ۴، ایرپاد مکس - تعویض باتری Varta</h1>
                <p className="text-white/80 text-sm mt-1">باتری، کیس، یک گوش، میکروفون، ANC - با چسب B7000 و پرس - گارانتی ۲ ماهه</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['#تعمیر_ایرپاد', '#تعمیر_ایرپاد_پرو_2', '#تعویض_باتری_ایرپاد', '#تعمیر_کیس_ایرپاد'].map((h,i)=><span key={i} className="text-xs px-3 py-1 rounded-full bg-white/20 border border-white/20">{h}</span>)}
            </div>
          </div>
        </section>
        <RepairLongContentAudio />
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="p-6 rounded-2xl bg-card border">
          </div>
        </section>
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
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default AirPodsRepairPage;
