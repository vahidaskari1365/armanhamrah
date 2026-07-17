import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentMobile from '@/components/repairs/RepairLongContentMobile';
import { ChevronLeft, Smartphone, Hash, MapPin, CheckCircle2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: 'هزینه تعمیر موبایل آیفون و سامسونگ چقدر است؟', a: 'تعویض باتری ۱ تا ۲.۵ میلیون، تعویض گلس ۱.۵ تا ۳، ال‌سی‌دی A56 ۲ تا ۳.۵، ال‌سی‌دی آیفون ۱۷ پرو ۱۲ تا ۱۸ میلیون، برد آبخورده ۱ تا ۵ میلیون. عیب‌یابی رایگان و اعلام شفاف قبل تعمیر.' },
  { q: 'تعمیر موبایل آبخورده امکان‌پذیر است؟', a: 'بله اگر سریع خاموش کنی و به شارژ نزنی و بیاری آرمان همراه، ۷۰-۸۰٪ شانس تعمیر با التراسونیک و رسوب‌زدایی برد وجود دارد.' },
  { q: 'بهترین مرکز تعمیرات موبایل تهران کجاست؟', a: 'آرمان همراه در پاساژ تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴ - مجهزترین لابراتوار میکروسولدر، قطعه اورجینال، ۱۰ سال سابقه و ۵۰۰ هزار تعمیر موفق، گارانتی ۳ ماهه کتبی.' }
];

const MobileRepairPageContent = () => {
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span><Link to="/repair" className="hover:text-primary">تعمیرات</Link><span>/</span><span className="text-foreground font-bold">تعمیرات موبایل</span>
        </div>

        <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"><ChevronLeft size={20} /> بازگشت به هاب تعمیرات</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Smartphone size={28} className="text-white" /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight">تعمیرات تخصصی انواع گوشی موبایل آیفون، سامسونگ، شیائومی، پوکو</h1>
                <p className="text-white/80 text-sm mt-1">آیفون ۱۷ پرو، ۱۶ پرو، S25 Ultra، S24 Ultra، A56، A36، 15T، ردمی نوت ۱۴ پرو، پوکو M7 - عیب‌یابی رایگان + گارانتی ۳ ماهه</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['#تعمیرات_موبایل', '#تعمیر_آیفون', '#تعمیر_سامسونگ', '#تعمیر_شیائومی', '#تعویض_السی_دی', '#تعمیر_برد'].map((h,i)=><span key={i} className="text-xs px-3 py-1 rounded-full bg-white/20 border border-white/20">{h}</span>)}
            </div>
          </div>
        </section>

        <RepairLongContentMobile />

        <section className="section-padding bg-secondary/30">
          <div className="container-custom max-w-4xl">
            <h2 className="text-2xl font-black text-foreground mb-6">سوالات متداول تعمیرات موبایل</h2>
            <Accordion type="single" collapsible className="bg-card border rounded-2xl px-6">
              {faqs.map((f,i)=>(
                <AccordionItem key={i} value={`f-${i}`} className="border-b last:border-0">
                  <AccordionTrigger className="text-right font-bold">{f.q}</AccordionTrigger>
                  <AccordionContent className="leading-8 text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 p-6 rounded-2xl bg-card border">
              <h3 className="font-black flex items-center gap-2"><MapPin size={18} className="text-primary" /> بیا پیش ما برای تعمیر موبایل</h3>
              <p className="text-sm leading-7 text-muted-foreground mt-2">تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴ - اگر شهرستانی هستی با تیپاکس بفرست، فیلم عیب‌یابی واتساپ میشه. عیب‌یابی رایگان، حتی اگر تعمیر نکنی مشاوره مجانی.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const MobileRepairPage = () => {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
    { "@type": "Question", "name": "هزینه تعمیر موبایل", "acceptedAnswer": { "@type": "Answer", "text": "۱ تا ۱۸ میلیون بسته به مدل" } }
  ]};
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
    { "@type": "ListItem", "position": 2, "name": "تعمیرات", "item": "https://armanhamrah.com/repair" },
    { "@type": "ListItem", "position": 3, "name": "تعمیرات موبایل", "item": "https://armanhamrah.com/repair/mobile" }
  ]};
  const service = { "@context": "https://schema.org", "@type": "Service", "name": "تعمیرات تخصصی موبایل آیفون سامسونگ شیائومی", "provider": { "@type": "Organization", "name": "آرمان همراه" }, "areaServed": "IR" };
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title="تعمیرات تخصصی موبایل آیفون ۱۷ پرو، سامسونگ S25 Ultra، شیائومی 15T | تعویض ال‌سی‌دی، باتری، برد | آرمان همراه تهران" description="بهترین مرکز تعمیرات موبایل تهران علاءالدین - تعمیر آیفون 17 پرو و 16 پرو، سامسونگ S25 Ultra و A56، شیائومی 15T و ردمی نوت 14 پرو و پوکو M7 با قطعه اورجینال، میکروسکوپ، گارانتی 3 ماهه و عیب‌یابی رایگان - بیا پیش ما" jsonLd={[faqSchema, breadcrumb, service]} />
          <MobileRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default MobileRepairPage;
