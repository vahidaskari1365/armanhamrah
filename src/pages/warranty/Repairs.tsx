import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, CheckCircle2, Clock, Wrench, AlertTriangle, Smartphone, Gamepad2, Headphones, Watch, Speaker, Headset } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { repairCategoriesData } from '@/data/repairCategoriesData';

const iconMap: any = { Smartphone, Gamepad2, Headset, Headphones, Watch, Speaker };

const outOfWarrantyRules = [
  {
    title: 'پذیرش دستگاه‌های آبخورده و ضربه‌خورده',
    desc: 'دستگاه‌های آب‌خورده و ضربه‌خورده به دلیل تغییر شکل ظاهری و اکسید برد، ممکن است پس از باز شدن به حالت اولیه هنگام پذیرش بازنگردد. این موضوع قبل از تعمیر با فرم رضایت‌نامه به اطلاع مشتری می‌رسد.'
  },
  {
    title: 'مسئولیت تعمیر بر اساس ایراد اعلامی',
    desc: 'دستگاهی که فاقد گارانتی بوده و با یک ایراد مشخص مثلا تعویض ال‌سی‌دی به مرکز مراجعه می‌کند، مرکز فقط در قبال همان ایراد مسئولیت می‌پذیرد. زیرا دستگاه آبخورده یا ضربه‌خورده ممکن است ایرادات پنهان دیگری نمایان سازد.'
  },
  {
    title: 'گارانتی ۳ ماهه قطعه تعویضی و سقف هزینه',
    desc: 'قطعه تعویضی به مدت ۳ ماه گارانتی دارد به شرط عدم آبخوردگی و ضربه مجدد. ایرادات تا سقف ۵۰۰ هزار تومان بدون هماهنگی و مبالغ بالاتر با تماس و تایید مشتری انجام می‌گردد.'
  }
];

const faqs = [
  { q: 'هزینه تعمیرات فاقد گارانتی چقدر است؟', a: 'تعمیرات سبک زیر ۱ میلیون، تعویض ال‌سی‌دی آیفون و S25 Ultra بین ۵ تا ۲۰ میلیون، برد و آبخوردگی ۱ تا ۵ میلیون و PS5 بین ۱.۵ تا ۸ میلیون. عیب‌یابی رایگان است.' },
  { q: 'آیا تعمیر گوشی آبخورده امکان‌پذیر است؟', a: 'بله اگر سریع خاموش کنید و به شارژ نزنید و بیاورید، با التراسونیک برد را رسوب‌زدایی می‌کنیم. ۷۰-۸۰٪ شانس تعمیر دارد.' },
  { q: 'مدت زمان تعمیر چقدر است؟', a: 'باتری و ال‌سی‌دی ساده ۱ تا ۳ ساعت، برد ۲۴ تا ۷۲ ساعت، PS5 و دسته ۲۴ تا ۴۸ ساعت، ایرپاد و ساعت ۲۴ ساعت، اسپیکر ۴۸ ساعت.' },
  { q: 'چگونه دستگاه را برای تعمیر ارسال کنم؟', a: 'تهران: حضوری به آدرس مطهری. شهرستان: تماس برای کد پذیرش و ارسال با تیپاکس. حتما با ضربه‌گیر بسته‌بندی کنید.' },
];

const WarrantyRepairsPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 flex flex-wrap items-center gap-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">{isFa ? 'خانه' : 'Home'}</Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/warranty" className="text-muted-foreground hover:text-primary">{isFa ? 'گارانتی و تعمیرات' : 'Warranty'}</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium warranty-title">{isFa ? 'تعمیرات فاقد گارانتی' : 'Out-of-Warranty Repairs'}</span>
        </div>

        {/* Header - same style as Conditions and Accessories */}
        <section className="bg-gradient-to-br from-primary/10 to-background py-12 border-b">
          <div className="container-custom max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/warranty" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 font-titr">
                <ChevronLeft size={20} /> {isFa ? 'بازگشت به صفحه گارانتی' : 'Back to Warranty'}
              </Link>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold font-titr">
                  <Shield size={14} /> {isFa ? 'گارانتی ۳ ماهه قطعه و عیب‌یابی رایگان' : '3-Month Part Warranty & Free Diagnosis'}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold font-titr">{isFa ? 'فاقد گارانتی - آبخورده، ضربه‌خورده، شکسته' : 'Out of warranty - Water & Impact Damage'}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4 warranty-title">
                {isFa ? 'شرایط عمومی تعمیرات دستگاه‌های فاقد گارانتی' : 'General Conditions for Out-of-Warranty Repairs'}
                <span className="block text-lg md:text-xl font-medium text-muted-foreground mt-3 warranty-text">{isFa ? 'موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند' : 'Mobile, PS5, AirPods, Headphones, Smartwatch, Speaker & Audio'}</span>
              </h1>

              <p className="text-muted-foreground leading-8 max-w-3xl warranty-text">
                {isFa ? (
                  <>اگر دستگاه شما به دلیل <strong>ضربه، آبخوردگی، شکستگی، تعمیر در مراکز غیرمجاز یا اتمام گارانتی</strong> شامل گارانتی ۱۸ ماهه نمی‌شود، نگران نباشید. مرکز تخصصی تعمیرات آرمان همراه با قطعات اورجینال و گارانتی ۳ ماهه قطعه، دستگاه شما را با هزینه مصوب تعمیر می‌کند.</>
                ) : (
                  <>If your device is out of 18-month warranty due to <strong>impact, water damage, breakage, unauthorized repair or warranty expiration</strong>, don&apos;t worry. Arman Hamrah specialized repair center with original parts and 3-month warranty will repair it at approved cost.</>
                )}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { icon: Wrench, t: isFa ? 'تعمیر برد با میکروسکوپ' : 'Board Repair with Microscope', d: isFa ? 'تخصصی' : 'Pro' },
                { icon: Shield, t: isFa ? '۳ ماه گارانتی کتبی' : '3-Month Written Warranty', d: isFa ? 'بدون قید' : 'No Condition' },
                { icon: CheckCircle2, t: isFa ? 'عیب‌یابی رایگان' : 'Free Diagnosis', d: isFa ? '۰ تومان' : 'Free' },
                { icon: Clock, t: isFa ? '۷۰٪ تعمیر در ۲۴ ساعت' : '70% in 24 Hours', d: isFa ? 'سریع' : 'Fast' },
              ].map((i, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-card border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground warranty-title">{i.t}</div>
                    <div className="text-xs text-muted-foreground warranty-text">{i.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-black text-foreground mb-6 warranty-title">{isFa ? 'دسته‌بندی تعمیرات فاقد گارانتی' : 'Out-of-Warranty Repair Categories'}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {repairCategoriesData.map((cat) => {
                  const Icon = iconMap[cat.icon] || Smartphone;
                  return (
                    <Link key={cat.id} to={`/repair/${cat.id}`} className="group bg-card border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all">
                      <div className="aspect-[16/9] overflow-hidden relative bg-secondary">
                        <img src={cat.image} alt={cat.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-card/90 flex items-center justify-center"><Icon size={16} className="text-primary" /></div>
                        <div className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm leading-5 warranty-title">{isFa ? cat.title : cat.titleEn}</div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground leading-6 line-clamp-2 mb-3 warranty-text">{isFa ? cat.shortDesc : cat.titleEn}</div>
                        <div className="text-xs font-bold text-primary flex items-center gap-1 font-titr">{isFa ? 'مشاهده صفحه تخصصی' : 'View Details'} <span>→</span></div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-black text-foreground warranty-title">{isFa ? 'قوانین پذیرش دستگاه فاقد گارانتی' : 'Out-of-Warranty Acceptance Rules'}</h2>
              </div>
              <div className="space-y-4">
                {outOfWarrantyRules.map((rule, i)=>(
                  <div key={i} className="card-premium p-6 rounded-xl">
                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 warranty-title">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black font-titr">{i+1}</span>
                      {isFa ? rule.title : `Rule ${i+1}`}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-7 pr-8 warranty-text">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-premium p-6 rounded-xl mb-12">
              <h3 className="font-bold text-foreground mb-4 warranty-title">{isFa ? 'نکات مهم قبل از تحویل:' : 'Important notes before delivery:'}</h3>
              <ul className="space-y-3 text-sm text-muted-foreground leading-7 list-disc pr-5 warranty-text">
                <li>{isFa ? 'چنانچه دستگاه علاوه بر ایراد اعلامی، ایرادات دیگری داشته باشد، حتما با تماس تلفنی هماهنگ می‌گردد.' : 'If device has other issues besides reported one, we will call you.'}</li>
                <li>{isFa ? 'ایرادات تا سقف ۵۰۰ هزار تومان بدون هماهنگی و بالاتر با تایید شما تعمیر می‌شود.' : 'Issues up to 500k IRR without coordination, higher with your approval.'}</li>
                <li>{isFa ? 'فرم رضایت‌نامه با امضاء، اثر انگشت و کد ملی تکمیل گردد.' : 'Consent form with signature, fingerprint and national ID must be completed.'}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-black text-foreground mb-6 warranty-title">{isFa ? 'پرسش‌های متداول' : 'FAQ'}</h2>
              <Accordion type="single" collapsible className="bg-card border rounded-2xl px-6">
                {faqs.map((f,i)=>(
                  <AccordionItem key={i} value={`f-${i}`} className="border-b last:border-0">
                    <AccordionTrigger className="text-right font-bold text-foreground text-sm warranty-title">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-7 text-sm warranty-text">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const WarrantyRepairsPage = () => {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
      { "@type": "ListItem", "position": 2, "name": "گارانتی", "item": "https://armanhamrah.com/warranty" },
      { "@type": "ListItem", "position": 3, "name": "تعمیرات فاقد گارانتی", "item": "https://armanhamrah.com/warranty/repairs" }
    ]
  };
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="تعمیرات فاقد گارانتی | موبایل، PS5، ایرپاد، ساعت هوشمند، اسپیکر و باند | گارانتی ۳ ماهه قطعه"
            description="شرایط تعمیرات فاقد گارانتی انواع گوشی آیفون سامسونگ شیائومی، PS5، ایرپاد، هدفون، اپل واچ، گلکسی واچ، اسپیکر و باند آبخورده و ضربه‌خورده با قطعه اورجینال و عیب‌یابی رایگان در آرمان همراه"
            jsonLd={[breadcrumb]}
          />
          <WarrantyRepairsPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyRepairsPage;
