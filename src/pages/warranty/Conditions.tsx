import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, CheckCircle2, AlertCircle, FileText, Clock, Award, Smartphone, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const WarrantyConditionsPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  // بازنویسی شده - محتوای یکتا برای جلوگیری از کپی
  const conditions = [
    {
      title: 'مدت زمان پوشش و شروع گارانتی',
      desc: 'تمامی تلفن‌های همراه، تبلت‌ها و گجت‌های هوشمند که با ضمانت شرکت آرمان همراه ارتباطات آریا عرضه می‌شوند، از لحظه فعال‌سازی و صدور فاکتور خرید، به مدت ۱۸ ماه تحت پوشش خدمات پس از فروش قرار می‌گیرند. علاوه بر این، تا ۳ سال تعهد تامین قطعات و پذیرش دستگاه جهت بررسی فنی وجود دارد. مبنای محاسبه شروع گارانتی برای موبایل و تبلت، تاریخ فعال‌سازی (فاکتور معتبر) است و حداکثر تا ۶ ماه پس از اظهار در سامانه جامع تجارت محاسبه خواهد شد.'
    },
    {
      title: 'گارانتی باتری داخلی و جداشدنی',
      desc: 'باتری‌های داخلی (Internal) که به صورت پرس شده داخل دستگاه هستند، شامل ۱۸ ماه گارانتی تعویض در صورت افت سلامت غیرعادی هستند. باتری‌های جداشدنی (Removable) مانند باتری‌های قدیمی نوکیا، به دلیل ماهیت مصرفی، ۶ ماه گارانتی خواهند داشت.'
    },
    {
      title: 'لوازم همراه مانند هندزفری و کابل',
      desc: 'اقلام مصرفی همراه دستگاه از قبیل هندزفری سیمی، کابل شارژ و آداپتور فابریک، جزو گارانتی اصلی محسوب نمی‌شوند. خواهشمندیم در زمان خرید، سلامت فیزیکی و عملکرد این اقلام را در حضور فروشنده به صورت کامل تست و بررسی نمایید.'
    },
    {
      title: 'قانون ۷ روزه و ۱ ماهه تعویض به دلیل ایراد کارخانه',
      desc: 'اگر خریدار تا ۷ روز پس از فعال‌سازی، ایراد سخت‌افزاری ذاتی و غیر ناشی از ضربه یا آبخوردگی در دستگاه مشاهده کند، دستگاه مشمول تعویض فوری خواهد بود. این بازه برای ایرادات فنی اثبات شده از سوی سازنده تا ۱ ماه نیز قابل تمدید است، به شرط عدم وجود ضربه، شکستگی و تغییر نرم‌افزاری غیرمجاز.'
    },
    {
      title: 'عدم پوشش آسیب‌های فیزیکی، آبخوردگی و نوسان برق',
      desc: 'هر گونه آسیب ناشی از سقوط، فشار، فرورفتگی، شکستگی صفحه، نفوذ مایعات، رطوبت بالا، شارژ با آداپتور غیراستاندارد، نوسان برق و یا سوختگی برد، از شمول گارانتی ۱۸ ماهه خارج است و به صورت تعمیرات فاقد گارانتی با هزینه مصوب پذیرش می‌شود.'
    },
    {
      title: 'ابطال گارانتی در صورت تعمیر در مراکز غیرمجاز',
      desc: 'اگر دستگاه قبلا در مرکزی غیر از شبکه خدمات پس از فروش مجاز آرمان همراه باز شده باشد و آثار دستکاری روی پیچ‌ها، پلمپ باتری یا برد مشاهده شود، گارانتی به صورت کامل باطل خواهد شد.'
    },
    {
      title: 'روت، کاستوم رام و آنلاک بوتلودر',
      desc: 'انجام عملیات Root، نصب رام‌های غیررسمی، آنلاک بوتلودر و هرگونه تغییر نرم‌افزاری سطح پایین که سطح امنیت Knox و سیستم عامل را کاهش دهد، منجر به خروج از گارانتی و شامل هزینه جهت بازگشت به رام رسمی خواهد بود.'
    },
    {
      title: 'فراموشی Mi Account و Google Account',
      desc: 'این شرکت مسئولیتی در قبال بازیابی حساب کاربری فراموش شده شیائومی (Mi Account) و گوگل (FRP) بر عهده ندارد. در صورتی که رفع قفل نیاز به خرید کردیت سرور داشته باشد، هزینه آن بر عهده مشتری بوده و با هماهنگی قبلی انجام می‌شود.'
    },
    {
      title: 'حفظ اطلاعات شخصی',
      desc: 'مسئولیت پشتیبان‌گیری (Backup) از اطلاعات شخصی، عکس‌ها، مخاطبین و برنامه‌ها قبل از تحویل دستگاه به مرکز خدمات، کاملا بر عهده مشتری است. مرکز تعمیرات هیچ گونه تعهدی نسبت به حفظ داده‌ها و امکان ریکاوری اطلاعات نخواهد داشت.'
    },
    {
      title: 'تغییر یا مخدوش کردن سریال IMEI',
      desc: 'هر گونه تغییر شماره سریال IMEI، دستکاری یا مخدوش نمودن آن توسط باکس‌ها و نرم‌افزارهای غیررسمی، باعث ابطال کامل گارانتی و عدم امکان ارائه خدمات خواهد شد.'
    },
    {
      title: 'فراخوان‌های جهانی شرکت سازنده',
      desc: 'در مواردی که شرکت مادر مانند اپل، سامسونگ یا شیائومی فراخوان جهانی (Recall) برای ایراد سخت‌افزاری یا نرم‌افزاری گسترده اعلام کند، آرمان همراه نیز دقیقا مطابق دستورالعمل ابلاغی شرکت سازنده اقدام خواهد نمود. در ایرادات نرم‌افزاری فراگیر، کاربر می‌بایست تا انتشار نسخه اصلاحی رسمی منتظر بماند.'
    },
  ];

  const exceptions = [
    {
      title: 'رطوبت ۱۰ تا ۱۵ درصدی در شهرهای شرجی',
      desc: 'در مناطق با رطوبت بالا مانند شهرهای شمالی و جنوبی، مشاهده نشانگر رطوبت تا ۱۵٪ به دلیل شرجی هوا، طبیعی بوده و دستگاه همچنان تحت گارانتی می‌ماند و شامل آبخوردگی کامل محسوب نمی‌شود.'
    },
    {
      title: 'باز شدن بدون دستکاری برد',
      desc: 'اگر تکنسین تشخیص دهد دستگاه قبلا در مرکز دیگری باز شده اما هیچ گونه دستکاری، تعویض قطعه، لحیم‌کاری یا آسیب به برد اصلی وارد نشده، دستگاه از گارانتی خارج نخواهد شد.'
    },
    {
      title: 'فلش نرم‌افزار در مرکز غیرمجاز بدون آسیب به رام',
      desc: 'اگر دستگاه فقط نرم‌افزار غیررسمی خورده باشد ولی پارتیشن بوت و رام اصلی آسیب ندیده باشد، با فلش رام رسمی و کسر هزینه نرم‌افزار، گارانتی سخت‌افزاری حفظ می‌شود. اما اگر ورژن پایین‌تر (Downgrade) زده شده و بوت آسیب دیده باشد، غیرگارانتی است.'
    },
    {
      title: 'گارانتی ۳ ماهه قطعات تعویضی',
      desc: 'قطعاتی که در مرکز ما روی دستگاه‌های فاقد گارانتی تعویض می‌شوند، در صورت عدم ضربه مجدد، آبخوردگی و تغییر شکل، ۳ ماه گارانتی تعویض دارند.'
    },
    {
      title: 'آبخوردگی برد جانبی و حفظ گارانتی اصلی',
      desc: 'اگر برد شارژ یا برد جانبی دستگاه به دلیل استفاده نادرست دچار آبخوردگی یا شکستگی شود، فقط همان قطعه شامل هزینه می‌شود ولی گارانتی برد اصلی و سایر بخش‌ها باطل نمی‌گردد.'
    },
    {
      title: 'قانون ۳ بار مراجعه برای ایراد مشابه',
      desc: 'در صورتی که مشتری برای یک ایراد ثابت و مشابه، ۳ بار به مرکز خدمات مراجعه کند و ایراد پس از تعمیر مجددا تکرار شود، جهت تکریم مشتری و جلب رضایت، دستگاه طبق ضوابط تعویض خواهد شد.'
    },
    {
      title: 'عدم موجودی و محاسبه استهلاک ۴٪ ماهانه',
      desc: 'اگر دستگاه مشمول تعویض باشد ولی موجودی کالا تامین نشود، به مشتری حق انتخاب دستگاه جایگزین هم‌رده یا عودت مبلغ فاکتور داده می‌شود. طبق مصوبه، به ازای هر ماه کارکرد، ۴٪ از مبلغ فاکتور به عنوان استهلاک کسر می‌گردد. اگر دستگاه پیشنهادی ارزش بالاتری داشته باشد و مشتری مابه‌التفاوت را نپذیرد، مبلغ فاکتور اصلی عودت می‌گردد.'
    },
    {
      title: 'دستگاه امانی در مدت تعمیر',
      desc: 'در زمان پذیرش، دستگاه می‌بایست مدت اعلام شده جهت عیب‌یابی دقیق در شرکت بماند. اگر مشتری دستگاه جایگزین نداشته و نیاز فوری داشته باشد، می‌تواند با تکمیل فرم و ارائه کارت ملی، دستگاه امانی به صورت موقت دریافت کند.'
    },
    {
      title: 'بررسی ظاهری دستگاه امانی هنگام تحویل',
      desc: 'مشتری موظف است هنگام تحویل دستگاه امانی، ظاهر، صفحه و عملکرد آن را کامل بررسی کرده و صحیح و سالم تحویل گیرد و هنگام عودت نیز دقیقا با همان شرایط ظاهری و سلامت به شرکت بازگرداند.'
    },
    {
      title: 'جبران خسارت دستگاه امانی آسیب دیده',
      desc: 'اگر در مدت استفاده از دستگاه امانی، دستگاه از نظر ظاهری یا فنی دچار آسیب شود، شرکت مجاز به دریافت خسارت وارده بوده و تا زمان عودت دستگاه امانی سالم، دستگاه اصلی نزد شرکت به امانت می‌ماند.'
    },
    {
      title: 'تاخیر در تعمیر و اضافه شدن به گارانتی',
      desc: 'اگر تعمیر دستگاه بیش از زمان اعلام شده به کاربر به طول انجامد، به ازای هر یک هفته تاخیر، یک ماه به مدت گارانتی افزوده می‌شود. این بند شامل تعطیلات رسمی اعلام شده توسط دولت، کاهش ساعت کاری و ایام نوروز نمی‌باشد.'
    },
    {
      title: 'مدارک لازم هنگام مراجعه',
      desc: 'در زمان مراجعه به مرکز خدمات آرمان همراه در علاءالدین، همراه داشتن فاکتور رسمی مهر شده و جعبه اصلی دستگاه با برچسب گارانتی الزامی است.'
    },
  ];

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">خانه</Link>
          <span>/</span>
          <Link to="/warranty" className="hover:text-primary">گارانتی و تعمیرات تخصصی</Link>
          <span>/</span>
          <span className="text-foreground font-bold">شرایط گارانتی ۱۸ ماهه موبایل، تبلت، PS5 و لوازم جانبی</span>
        </div>

        <section className="bg-gradient-to-br from-primary/10 to-background py-12 border-b">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/warranty" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                <ChevronLeft size={20} /> بازگشت به مرکز گارانتی
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                <Shield size={14} /> پوشش ۱۸ ماهه + ۳ سال تامین قطعه
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4">
                شرایط کامل گارانتی ۱۸ ماهه آرمان همراه
                <span className="block text-lg md:text-xl font-medium text-muted-foreground mt-3">ویژه گوشی موبایل، تبلت، ساعت هوشمند، هدفون، اسپیکر و PS5</span>
              </h1>
              <p className="text-muted-foreground leading-8 max-w-4xl">
                این صفحه شامل <strong>بازنویسی اختصاصی و یکتای</strong> تمامی قوانین گارانتی ۱۸ ماهه آرمان همراه ارتباطات آریا برای <strong>تعمیرات موبایل آیفون، سامسونگ، شیائومی، تعمیر PS5، تعمیر ایرپاد، هدفون، ساعت هوشمند و اسپیکر</strong> است. مطالعه این شرایط قبل از مراجعه به مرکز خدمات علاءالدین الزامی است. ما با ۱۰ سال تجربه، شفاف‌ترین قوانین گارانتی ایران را ارائه می‌دهیم.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <FileText className="text-primary" />
              <h2 className="text-2xl font-black text-foreground">۱۱ بند اصلی شرایط گارانتی ۱۸ ماهه</h2>
            </div>
            <div className="space-y-4">
              {conditions.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="bg-card border rounded-xl p-5 md:p-6 hover:shadow-md transition-all">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black flex-shrink-0 text-sm">{i + 1}</div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{c.title}</h3>
                      <p className="text-sm text-muted-foreground leading-8">{c.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="text-amber-500" />
                <h2 className="text-2xl font-black text-foreground">موارد قابل اغماض و تسهیلات ویژه مشتریان</h2>
              </div>
              <div className="grid gap-4">
                {exceptions.map((e, i) => (
                  <div key={i} className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-xl p-5">
                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-600" /> {e.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-8">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-primary text-primary-foreground">
              <h3 className="font-black text-lg mb-3">💡 نکته سئو و تجربه کاربری - تعمیرات سریع با گارانتی</h3>
              <p className="text-sm leading-8 opacity-90">
                چه دستگاه شما شامل گارانتی باشد چه نباشد، مرکز تعمیرات آرمان همراه در تهران با پوشش کامل <strong>تعمیرات موبایل، تعمیر PS5 و دسته، تعمیر ایرپاد و هدفون، تعمیر ساعت هوشمند و تعمیر اسپیکر و باند</strong>، با عیب‌یابی رایگان و قطعه اورجینال در خدمت شماست. برای ثبت درخواست تعمیر فوری به صفحه <Link to="/warranty/repairs" className="underline font-bold">تعمیرات تخصصی</Link> مراجعه کنید.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const WarrantyConditionsPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "گارانتی آرمان همراه چند ماه است؟", "acceptedAnswer": { "@type": "Answer", "text": "گارانتی آرمان همراه ۱۸ ماهه است و تا ۳ سال تامین قطعه دارد. شروع گارانتی از تاریخ فاکتور فعال‌سازی است." } },
      { "@type": "Question", "name": "آیا باتری شامل گارانتی می‌شود؟", "acceptedAnswer": { "@type": "Answer", "text": "بله باتری داخلی ۱۸ ماه و باتری جداشدنی ۶ ماه گارانتی دارد." } }
    ]
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
      { "@type": "ListItem", "position": 2, "name": "گارانتی", "item": "https://armanhamrah.com/warranty" },
      { "@type": "ListItem", "position": 3, "name": "شرایط گارانتی ۱۸ ماهه", "item": "https://armanhamrah.com/warranty/conditions" }
    ]
  };
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="شرایط گارانتی ۱۸ ماهه آرمان همراه | تعمیرات موبایل، PS5، ایرپاد، ساعت هوشمند و اسپیکر"
            description="مطالعه کامل و بازنویسی شده شرایط گارانتی ۱۸ ماهه آرمان همراه برای گوشی موبایل، تبلت، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند با ۳ سال تامین قطعه و قوانین تعویض و تعمیرات تخصصی در تهران"
            jsonLd={[faqSchema, breadcrumb]}
          />
          <WarrantyConditionsPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyConditionsPage;
