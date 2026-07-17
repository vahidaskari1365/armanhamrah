import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentPS5 from '@/components/repairs/RepairLongContentPS5';
import { ChevronLeft, Gamepad2, MapPin } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: 'تعمیر HDMI PS5 چقدر هزینه دارد؟', a: 'تعویض HDMI PS5 اسلیم و فت ۱.۵ تا ۲.۵ میلیون، همان روز تحویل، با پورت Foxconn اورجینال و سیم‌کشی پد کنده شده.' },
  { q: 'تعمیر دسته PS5 دریفت چقدر است؟', a: 'تعویض آنالوگ Alps اصلی ژاپن ۶۰۰ تا ۹۰۰ هزار، با کالیبره Deadzone و گارانتی ۲ ماهه دریفت.' }
];

const PS5RepairPageContent = () => {
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span><Link to="/repair" className="hover:text-primary">تعمیرات</Link><span>/</span><span className="text-foreground font-bold">تعمیر PS5</span>
        </div>
        <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> بازگشت به هاب</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Gamepad2 size={28} /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black">تعمیر تخصصی PS5 اسلیم، فت، دیجیتال و دسته DualSense</h1>
                <p className="text-white/80 text-sm mt-1">تعمیر HDMI تصویر ندادن، برد روشن نشدن، اورهیت فن، دریفت دسته - ۹۸٪ موفقیت - گارانتی ۹۰ روزه</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['#تعمیر_PS5', '#تعمیر_HDMI_PS5', '#تعمیر_دسته_PS5', '#تعمیر_برد_PS5'].map((h,i)=><span key={i} className="text-xs px-3 py-1 rounded-full bg-white/20 border border-white/20">{h}</span>)}
            </div>
          </div>
        </section>
        <RepairLongContentPS5 />
        <section className="section-padding bg-zinc-950 text-white">
          <div className="container-custom max-w-4xl">
            <h2 className="text-2xl font-black mb-6">FAQ تعمیر PS5</h2>
            <Accordion type="single" collapsible className="bg-white/5 border border-white/10 rounded-2xl px-6">
              {faqs.map((f,i)=>(
                <AccordionItem key={i} value={`f-${i}`} className="border-b border-white/10 last:border-0">
                  <AccordionTrigger className="text-right font-bold text-white">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-zinc-300 leading-8 text-sm">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-black flex items-center gap-2"><MapPin size={18} className="text-purple-400" /> بیا پیش ما برای PS5</h3>
              <p className="text-sm leading-7 text-zinc-300 mt-2">تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴ - سرویس فن ۱ ساعته، HDMI همان روز، برد ۲۴-۴۸ ساعت - عیب‌یابی رایگان.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const PS5RepairPage = () => {
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
    { "@type": "ListItem", "position": 2, "name": "تعمیرات", "item": "https://armanhamrah.com/repair" },
    { "@type": "ListItem", "position": 3, "name": "تعمیر PS5", "item": "https://armanhamrah.com/repair/ps5" }
  ]};
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title="تعمیر PS5 اسلیم و فت و دسته DualSense تخصصی | HDMI، برد، اورهیت، دریفت | گارانتی 90 روزه تهران" description="تخصصی‌ترین مرکز تعمیر PS5 تهران علاءالدین - تعمیر HDMI تصویر ندادن، برد روشن نشدن، فن اورهیت، دسته دریفت، درایو، SSD با قطعه اصلی و گارانتی 90 روزه - بیا پیش ما عیب‌یابی رایگان" jsonLd={[breadcrumb]} />
          <PS5RepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default PS5RepairPage;
