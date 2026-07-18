import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Headphones, Watch, Speaker, Battery, Shield, CheckCircle2, AlertTriangle, Clock, Award, Sparkles, Bluetooth, Volume2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const WarrantyAccessoriesPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  // بازنویسی یکتا برای سئو
  const items = [
    {
      title: 'قانون ۱ ماهه تعویض به دلیل ایراد ذاتی',
      desc: 'تمامی گجت‌ها و لوازم جانبی مانند ساعت هوشمند، اسپیکر، هندزفری و هدست که با گارانتی آرمان همراه عرضه می‌شوند، اگر دارای ایراد فنی ذاتی از سوی کارخانه باشند، تا ۳۰ روز پس از فعال‌سازی امکان تعویض با مدل مشابه دارند. این قانون شامل ایرادات ظاهری مانند خط و خش، فرورفتگی، رنگ پریدگی یا انتخاب اشتباه مدل نمی‌شود. حتما هنگام خرید، سلامت ظاهری را با فروشنده چک کنید.'
    },
    {
      title: 'عدم پوشش ضربه، آبخوردگی و دستکاری',
      desc: 'صدمات ناشی از نفوذ آب، سقوط، ضربه، تغییر شکل بدنه، رنگ رفتگی، باز شدن دستگاه در مراکز غیرمجاز و اتصال به برق با ولتاژ نامناسب و سوختگی، از شمول گارانتی خارج است. لطفا در نگهداری ساعت‌های هوشمند، اسپیکر و هدفون دقت کنید و آن‌ها را از رطوبت و ضربه دور نگه دارید.'
    },
    {
      title: 'عدم مسئولیت اطلاعات شخصی',
      desc: 'مرکز خدمات هیچ گونه مسئولیتی در قبال حفظ اپلیکیشن‌ها، اطلاعات سلامتی، موزیک و دیتای شخصی کاربر روی ساعت، اسپیکر یا هدفون نخواهد داشت. قبل از تحویل دستگاه به گارانتی، بک‌آپ تهیه کنید.'
    },
    {
      title: 'احتمال عدم بازگشت به حالت ۱۰۰٪ اولیه در دستگاه‌های آسیب دیده',
      desc: 'گجت‌هایی که با مشکلات شدید مانند آبخوردگی کامل، ضربه سنگین و شکستگی متعدد به مرکز مراجعه می‌کنند، گاه پس از تعمیر ممکن است ظاهر اولیه خود را به طور کامل به دست نیاورند و یا لک و رد ضربه باقی بماند. این موضوع توسط واحد پذیرش و تکنسین پس از بررسی اعلام می‌گردد.'
    },
    {
      title: 'فراخوان و اطلاع‌رسانی خرابی فراگیر',
      desc: 'اگر یک مدل خاص از اسپیکر، ساعت یا هدفون دچار ایراد فراگیر و سراسری شود، اطلاع‌رسانی رسمی از طریق سایت armanhamrah.com انجام شده و نحوه رفع ایراد یا فراخوان برای تعویض رایگان اعلام خواهد شد.'
    },
    {
      title: 'محاسبه استهلاک و مابه‌التفاوت در صورت عدم موجودی',
      desc: 'اگر گجت نیاز به تعویض داشته باشد اما همان مدل در انبار موجود نباشد، با پرداخت مابه‌التفاوت قیمت روز و کسر فرانشیز استهلاک اقدام به تعویض می‌شود. به ازای هر ماه استفاده، ۴٪ از ارزش کالا کسر می‌شود و مبنای قیمت، میانگین فروش ۳ ماهه اخیر همان مدل یا آخرین فاکتور شرکت است.'
    },
    {
      title: 'اضافه شدن به مدت گارانتی در صورت تاخیر',
      desc: 'اگر دستگاه تحت گارانتی بیش از ۱۵ روز کاری (بدون احتساب زمان ارسال پستی) در شرکت بماند و تعمیر آن طول بکشد، به ازای هر هفته تاخیر، یک ماه به مدت گارانتی اضافه خواهد شد تا خسارت تاخیر جبران گردد.'
    },
    {
      title: 'گارانتی شارژر و کابل اورجینال',
      desc: 'شارژر و کابل اورجینال همراه ساعت، اسپیکر و هدفون در صورت تایید اصالت و عدم وجود قطعی، پارگی، له‌شدگی و شکستگی سوکت، به مدت ۱ ماه گارانتی تعویض دارند. آسیب فیزیکی کابل مشمول گارانتی نیست.'
    },
    {
      title: 'مدارک لازم برای پذیرش گارانتی',
      desc: 'هنگام مراجعه برای گارانتی ساعت هوشمند، اسپیکر، هدفون، ایرپاد و پاوربانک، همراه داشتن فاکتور رسمی معتبر و جعبه اصلی دستگاه با لیبل گارانتی الزامی بوده و بدون آن‌ها امکان پذیرش وجود ندارد.'
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
          <span className="text-foreground font-bold">گارانتی لوازم جانبی - ساعت هوشمند، اسپیکر، هدفون، ایرپاد، پاوربانک</span>
        </div>

        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-12">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/warranty" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-6">
                <ChevronLeft size={20} /> بازگشت
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold">گارانتی اسپیکر و باند</span>
                <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold">گارانتی ایرپاد و هدفون</span>
                <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold">گارانتی ساعت هوشمند</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                شرایط گارانتی لوازم جانبی و اکسسوری
                <span className="block text-xl font-medium text-indigo-100 mt-2">ساعت هوشمند، اسپیکر، باند، هدفون، ایرپاد، هدست، پاوربانک انکر و شیائومی</span>
              </h1>
              <p className="text-indigo-100 leading-8 max-w-4xl">
                کلیه <strong className="text-white">ساعت‌های هوشمند اپل واچ اولترا ۳، سری ۱۱، SE، گلکسی واچ ۸، واچ ۷، گجت‌های پوشیدنی، اسپیکر بلوتوثی، باند، پارتی باکس، هدفون و ایرپاد پرو ۲، ایرپاد ۴، گلکسی بادز ۳ پرو، انکر R60i NC و پاوربانک‌های انکر و شیائومی</strong> که با گارانتی آرمان همراه عرضه می‌شوند، ۱۸ ماه گارانتی دارند. مبنای شروع گارانتی، تاریخ فعال‌سازی فاکتور و حداکثر ۶ ماه پس از اظهار واردات است. در ادامه شرایط تخصصی تعمیرات و تعویض این دسته را بخوانید.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: Watch, title: 'ساعت هوشمند', desc: 'اپل واچ، گلکسی واچ، واچ اولترا - گارانتی ۱۸ ماهه کامل', color: 'from-blue-500 to-cyan-500' },
                { icon: Speaker, title: 'اسپیکر و باند', desc: 'اسپیکر بلوتوثی، باند خانگی، ساندبار - گارانتی ۱۸ ماهه', color: 'from-orange-500 to-red-500' },
                { icon: Headphones, title: 'هدفون و ایرپاد', desc: 'ایرپاد پرو، گلکسی بادز، انکر، هندزفری - گارانتی ۱۸ ماهه', color: 'from-green-500 to-emerald-500' },
              ].map((c, i) => (
                <div key={i} className="bg-card border rounded-xl p-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}>
                    <c.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-foreground">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-6">{c.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-2">
              <Shield className="text-primary" /> ۹ بند کلیدی گارانتی لوازم جانبی
            </h2>

            <div className="space-y-4">
              {items.map((it, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border rounded-xl p-6 hover:shadow-md transition-all">
                  <h3 className="font-bold text-foreground mb-3 flex gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</span>
                    {it.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-8 pr-9">{it.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-secondary/50 border">
                <h3 className="font-bold flex items-center gap-2 mb-3"><Volume2 size={18} className="text-primary" /> تعمیرات تخصصی اسپیکر و باند</h3>
                <p className="text-sm text-muted-foreground leading-7">تعمیر اسپیکر بلوتوثی، باند اکتیو، پارتی باکس، ساندبار، آمپلی‌فایر، تعویض باتری اسپیکر و تعمیر برد بلوتوث با قطعات اصلی در لابراتوار صوتی آرمان همراه. اگر اسپیکر شما شارژ نگه نمی‌دارد یا خش خش دارد، ما آن را با گارانتی تعمیر می‌کنیم.</p>
              </div>
              <div className="p-6 rounded-xl bg-secondary/50 border">
                <h3 className="font-bold flex items-center gap-2 mb-3"><Bluetooth size={18} className="text-primary" /> تعمیرات تخصصی ایرپاد و هدفون</h3>
                <p className="text-sm text-muted-foreground leading-7">تعمیر ایرپاد پرو ۲، ایرپاد ۴، ایرپاد مکس، گلکسی بادز ۳ پرو، انکر R60i NC، R50i، P40i - تعویض باتری، تعمیر کیس شارژ، رفع مشکل ANC و اتصال بلوتوث. تعمیر هدفون حتی اگر یک گوش کار نکند.</p>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black text-white border border-white/10">
              <h3 className="font-black text-lg mb-2 text-white">برای تعمیرات فاقد گارانتی لوازم جانبی چه کنیم؟</h3>
              <p className="text-sm leading-8 text-white">
                اگر اسپیکر، ایرپاد، ساعت یا هدفون شما آبخورده یا ضربه‌خورده و گارانتی آن باطل شده، نگران نباشید. ما در بخش <Link to="/warranty/repairs" className="underline font-bold text-white">تعمیرات فاقد گارانتی</Link> تمامی این دستگاه‌ها را با هزینه مصوب و گارانتی ۳ ماهه قطعه تعمیر می‌کنیم. کافیست به آدرس: تهران، خیابان مطهری، بعد از مفتح، ابتدای سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۲۰۴ مراجعه یا دستگاه را با پست ارسال کنید.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const WarrantyAccessoriesPage = () => {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
      { "@type": "ListItem", "position": 2, "name": "گارانتی", "item": "https://armanhamrah.com/warranty" },
      { "@type": "ListItem", "position": 3, "name": "گارانتی لوازم جانبی - ساعت، اسپیکر، ایرپاد", "item": "https://armanhamrah.com/warranty/accessories" }
    ]
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "گارانتی ۱۸ ماهه لوازم جانبی",
    "provider": { "@type": "Organization", "name": "آرمان همراه" },
    "serviceType": "گارانتی ساعت هوشمند، اسپیکر، هدفون، ایرپاد، پاوربانک",
    "areaServed": "IR"
  };
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="گارانتی لوازم جانبی ۱۸ ماهه | ساعت هوشمند، اسپیکر، باند، هدفون، ایرپاد، پاوربانک | آرمان همراه"
            description="شرایط کامل گارانتی ۱۸ ماهه ساعت هوشمند اپل واچ و گلکسی واچ، اسپیکر و باند بلوتوثی، هدفون، ایرپاد پرو ۲، گلکسی بادز ۳ پرو، انکر R60i و پاوربانک انکر و شیائومی با تعمیرات تخصصی و تعویض در آرمان همراه"
            jsonLd={[breadcrumb, serviceSchema]}
          />
          <WarrantyAccessoriesPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyAccessoriesPage;
