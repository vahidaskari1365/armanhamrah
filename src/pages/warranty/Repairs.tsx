import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, CheckCircle2, Clock, Phone, Wrench, AlertTriangle, MapPin, Smartphone, Gamepad2, Headphones, Watch, Speaker, Headset } from 'lucide-react';
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
  { q: 'آیا تعمیر گوشی آبخورده امکان‌پذیر است؟', a: 'بله اگر سریع خاموش کنید و به شارژ نزنید و بیاورید پیش ما، با التراسونیک برد را رسوب‌زدایی می‌کنیم. ۷۰-۸۰٪ شانس تعمیر دارد.' },
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
          <Link to="/" className="text-muted-foreground hover:text-primary">خانه</Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/warranty" className="text-muted-foreground hover:text-primary">گارانتی و تعمیرات</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">تعمیرات فاقد گارانتی</span>
        </div>

        {/* Header like Conditions page */}
        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/warranty" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
                <ChevronLeft size={20} /> بازگشت به صفحه گارانتی
              </Link>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold">فاقد گارانتی - آبخورده، ضربه‌خورده، شکسته</span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300 text-xs font-bold flex items-center gap-1"><Clock size={12}/> پاسخگویی ۲۴ ساعته</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
                شرایط عمومی تعمیرات دستگاه‌های فاقد گارانتی
                <span className="block text-lg font-medium text-muted-foreground mt-2">موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند</span>
              </h1>

              <p className="text-muted-foreground leading-8 max-w-3xl mb-10">
                اگر دستگاه شما به دلیل <strong>ضربه، آبخوردگی، شکستگی، تعمیر در مراکز غیرمجاز یا اتمام گارانتی</strong> شامل گارانتی ۱۸ ماهه نمی‌شود، نگران نباشید. 
                مرکز تخصصی تعمیرات آرمان همراه با قطعات اورجینال و گارانتی ۳ ماهه قطعه، دستگاه شما را با هزینه مصوب تعمیر می‌کند. 
                لطفا قبل از تحویل، شرایط زیر را مطالعه بفرمایید.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { icon: Wrench, t: 'تعمیر برد با میکروسکوپ', d: 'تخصصی' },
                  { icon: Shield, t: '۳ ماه گارانتی کتبی', d: 'بدون قید' },
                  { icon: CheckCircle2, t: 'عیب‌یابی رایگان', d: '۰ تومان' },
                  { icon: Clock, t: '۷۰٪ تعمیر در ۲۴ ساعت', d: 'سریع' },
                ].map((i, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-card border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <i.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{i.t}</div>
                      <div className="text-xs text-muted-foreground">{i.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Categories - clean grid linking to dedicated landings */}
            <div className="mb-16">
              <h2 className="text-2xl font-black text-foreground mb-6">دسته‌بندی تعمیرات فاقد گارانتی</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-7">برای مشاهده جزئیات کامل، عکس واقعی، مدل‌های تحت پوشش و ثبت سفارش، وارد صفحه تخصصی هر دسته شوید:</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {repairCategoriesData.map((cat) => {
                  const Icon = iconMap[cat.icon] || Smartphone;
                  return (
                    <Link key={cat.id} to={`/repair/${cat.id}`} className="group bg-card border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all">
                      <div className="aspect-[16/9] overflow-hidden relative bg-secondary">
                        <img src={cat.image} alt={cat.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-card/90 flex items-center justify-center"><Icon size={16} className="text-primary" /></div>
                        <div className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm leading-5">{cat.title}</div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground leading-6 line-clamp-2 mb-3">{cat.shortDesc}</div>
                        <div className="text-xs font-bold text-primary group-hover:gap-2 flex items-center gap-1 transition-all">مشاهده صفحه تخصصی <span>→</span></div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Rules */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-black text-foreground">قوانین پذیرش دستگاه فاقد گارانتی</h2>
              </div>
              <div className="space-y-4">
                {outOfWarrantyRules.map((rule, i)=>(
                  <div key={i} className="card-premium p-6 rounded-xl">
                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black">{i+1}</span>
                      {rule.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-7 pr-8">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Important notes */}
            <div className="card-premium p-6 rounded-xl mb-12">
              <h3 className="font-bold text-foreground mb-4">نکات مهم قبل از تحویل:</h3>
              <ul className="space-y-3 text-sm text-muted-foreground leading-7 list-disc pr-5">
                <li>چنانچه دستگاه علاوه بر ایراد اعلامی، ایرادات دیگری داشته باشد، حتما با تماس تلفنی هماهنگ می‌گردد.</li>
                <li>ایرادات تا سقف ۵۰۰ هزار تومان بدون هماهنگی و بالاتر با تایید شما تعمیر می‌شود.</li>
                <li>فرم رضایت‌نامه با امضاء، اثر انگشت و کد ملی تکمیل گردد.</li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm leading-7">
                <strong className="text-primary">💡 توصیه:</strong> دستگاه آبخورده را روشن نکنید و به شارژ نزنید. در حالت خاموش سریعا به مرکز بیاورید.
              </div>
            </div>

            {/* Address CTA */}
            <div className="card-premium p-6 rounded-xl mb-12 bg-gradient-to-br from-primary/5 to-background">
              <h3 className="font-black text-foreground mb-3 flex items-center gap-2"><MapPin size={18} className="text-primary" /> بیا پیش ما برای تعمیرات فاقد گارانتی</h3>
              <p className="text-sm text-muted-foreground leading-7">
                <strong className="text-foreground">آدرس:</strong> تهران، خیابان مطهری، بعد از مفتح، ابتدای سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۲۰۴<br/>
                <strong className="text-foreground">ساعات کاری:</strong> شنبه تا پنجشنبه ۱۰ تا ۲۰ - عیب‌یابی رایگان، مشاوره تخصصی، گارانتی کتبی<br/>
                <strong className="text-foreground">شهرستان:</strong> ارسال با تیپاکس با ضربه‌گیر و کد پذیرش روی بسته
              </p>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-black text-foreground mb-6">پرسش‌های متداول</h2>
              <Accordion type="single" collapsible className="bg-card border rounded-2xl px-6">
                {faqs.map((f,i)=>(
                  <AccordionItem key={i} value={`f-${i}`} className="border-b last:border-0">
                    <AccordionTrigger className="text-right font-bold text-foreground text-sm">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-7 text-sm">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-zinc-900 text-white">
          <div className="container-custom text-center max-w-2xl">
            <h2 className="text-2xl font-black mb-3">دستگاه فاقد گارانتی دارید؟ همین الان ثبت کنید</h2>
            <p className="text-zinc-300 text-sm leading-7 mb-6">عیب‌یابی رایگان، اعلام هزینه شفاف قبل تعمیر، قطعه اورجینال و گارانتی کتبی</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">ثبت درخواست تعمیر</Link>
              <a href="tel:+9821" className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-bold text-sm">مشاوره: ۰۲۱-XXXX</a>
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
