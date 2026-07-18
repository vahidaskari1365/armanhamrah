import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import RepairLongContentMobile from '@/components/repairs/RepairLongContentMobile';
import { ChevronLeft, Smartphone } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqsFa = [
  { q: 'هزینه تعمیر موبایل آیفون و سامسونگ چقدر است؟', a: 'تعویض باتری ۱ تا ۲.۵ میلیون، تعویض گلس ۱.۵ تا ۳، ال‌سی‌دی A56 ۲ تا ۳.۵، ال‌سی‌دی آیفون ۱۷ پرو ۱۲ تا ۱۸ میلیون، برد آبخورده ۱ تا ۵ میلیون. عیب‌یابی رایگان.' },
  { q: 'تعمیر موبایل آبخورده امکان‌پذیر است؟', a: 'بله اگر سریع خاموش کنید و به شارژ نزنید و بیاورید پیش ما، ۷۰-۸۰٪ شانس تعمیر با التراسونیک وجود دارد.' },
  { q: 'بهترین مرکز تعمیرات موبایل تهران کجاست؟', a: 'آرمان همراه - مجهزترین لابراتوار میکروسولدر، قطعه اورجینال، ۱۰ سال سابقه و ۵۰۰ هزار تعمیر موفق.' }
];

const faqsEn = [
  { q: 'How much does iPhone and Samsung repair cost?', a: 'Battery 1-2.5M, glass 1.5-3M, A56 LCD 2-3.5M, iPhone 17 Pro LCD 12-18M, water damage board 1-5M. Free diagnosis.' },
  { q: 'Is water damaged mobile repairable?', a: 'Yes if you quickly turn off and bring to us, 70-80% chance with ultrasonic cleaning.' },
  { q: 'Best mobile repair center in Tehran?', a: 'Arman Hamrah - most equipped microsoldering lab, original parts, 10 years, 500k repairs.' }
];

const MobileRepairPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  const faqs = isFa ? faqsFa : faqsEn;

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">{isFa ? 'خانه' : 'Home'}</Link><span>/</span>
          <Link to="/repair" className="hover:text-primary">{isFa ? 'تعمیرات' : 'Repairs'}</Link><span>/</span>
          <span className="text-foreground font-bold warranty-title">{isFa ? 'تعمیرات موبایل' : 'Mobile Repairs'}</span>
        </div>

        <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-12">
          <div className="container-custom">
            <Link to="/repair" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6">
              <ChevronLeft size={20} /> {isFa ? 'بازگشت به هاب تعمیرات' : 'Back to Repair Hub'}
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <Smartphone size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight warranty-title">
                  {isFa ? 'تعمیرات تخصصی انواع گوشی موبایل آیفون، سامسونگ، شیائومی، پوکو' : 'Professional Mobile Repair - iPhone, Samsung, Xiaomi, Poco'}
                </h1>
                <p className="text-white/80 text-sm mt-1 warranty-text">
                  {isFa ? 'آیفون ۱۷ پرو، ۱۶ پرو، S25 Ultra، S24 Ultra، A56، A36، 15T، ردمی نوت ۱۴ پرو، پوکو M7 - عیب‌یابی رایگان + گارانتی ۳ ماهه' : 'iPhone 17 Pro, 16 Pro, S25 Ultra, S24 Ultra, A56, A36, 15T, Redmi Note 14 Pro, Poco M7 - Free diagnosis + 3-month warranty'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <RepairLongContentMobile />

        <section className="section-padding bg-secondary/30">
          <div className="container-custom max-w-4xl">
            <h2 className="text-2xl font-black text-foreground mb-6 warranty-title">
              {isFa ? 'سوالات متداول تعمیرات موبایل' : 'Mobile Repair FAQ'}
            </h2>
            <Accordion type="single" collapsible className="bg-card border rounded-2xl px-6">
              {faqs.map((f,i)=>(
                <AccordionItem key={i} value={`f-${i}`} className="border-b last:border-0">
                  <AccordionTrigger className="text-right font-bold warranty-title">{f.q}</AccordionTrigger>
                  <AccordionContent className="leading-8 text-sm text-muted-foreground warranty-text">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const MobileRepairPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "هزینه تعمیر موبایل", "acceptedAnswer": { "@type": "Answer", "text": "۱ تا ۱۸ میلیون بسته به مدل" } }
    ]
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
      { "@type": "ListItem", "position": 2, "name": "تعمیرات", "item": "https://armanhamrah.com/repair" },
      { "@type": "ListItem", "position": 3, "name": "تعمیرات موبایل", "item": "https://armanhamrah.com/repair/mobile" }
    ]
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="تعمیرات تخصصی موبایل آیفون ۱۷ پرو، سامسونگ S25 Ultra، شیائومی 15T | آرمان همراه"
            description="بهترین مرکز تعمیرات موبایل تهران - تعمیر آیفون 17 پرو، سامسونگ S25 Ultra، شیائومی با قطعه اورجینال و گارانتی 3 ماهه"
            jsonLd={[faqSchema, breadcrumb]}
          />
          <MobileRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default MobileRepairPage;
