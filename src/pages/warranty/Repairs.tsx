import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Smartphone, Gamepad2, Headphones, Watch, Speaker, Zap, Shield, CheckCircle2, Clock, Phone, Wrench, AlertTriangle, Cpu, Battery, Settings, Award, MessageCircle, MapPin } from 'lucide-react';
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
import RepairLongContentMobile from "@/components/repairs/RepairLongContentMobile";

const repairCategories = [
  {
    title: 'تعمیرات تخصصی گوشی موبایل همه برندها و مدل‌ها',
    icon: Smartphone,
    gradient: 'from-blue-600 to-cyan-500',
    keywords: ['تعمیر آیفون ۱۷ پرو', 'تعمیر سامسونگ S25 Ultra', 'تعمیر شیائومی 15T', 'تعمیر ردمی نوت ۱۴ پرو', 'تعمیر پوکو M7', 'تعمیر گلکسی A56'],
    problems: [
      'تعویض ال‌سی‌دی و گلس اورجینال آیفون ۱۶ پرو، S24 Ultra، A36 و...',
      'تعویض باتری اصلی با تست سلامت - آیفون، سامسونگ، شیائومی',
      'تعمیر برد و هارد تخصصی با میکروسکوپ - آبخوردگی و ضربه',
      'تعمیر دوربین، فیس آیدی، اثر انگشت و سنسورها',
      'رفع مشکل آنتن، بیس باند، وای فای و بلوتوث',
      'تعمیر سوکت شارژ، میکروفون و اسپیکر مکالمه',
      'باز کردن قفل iCloud و FRP به صورت قانونی با فاکتور',
    ],
    seoText: 'آرمان همراه به عنوان مجهزترین مرکز تعمیرات موبایل در پاساژ علاءالدین تهران، تخصصی‌ترین خدمات تعمیر گوشی آیفون ۱۷ پرو، ۱۶ پرو، سامسونگ گلکسی S25 Ultra، S24 Ultra، S25 FE، A56، A36، A26، شیائومی 15T، ردمی نوت ۱۴ پرو، ردمی ۱۵، پوکو M7 و C85، نوکیا ۱۰۵ فوجی و... را با قطعات ۱۰۰٪ اورجینال، ابزار کالیبره و گارانتی ۳ ماهه قطعه ارائه می‌دهد. عیب‌یابی اولیه کاملا رایگان است.'
  },
  {
    title: 'تعمیرات فوق تخصصی PS5 و پلی استیشن',
    icon: Gamepad2,
    gradient: 'from-purple-600 to-pink-600',
    keywords: ['تعمیر PS5', 'تعمیر PS5 اسلیم', 'تعمیر دسته PS5', 'تعمیر برد PS5', 'تعمیر HDMI PS5'],
    problems: [
      'تعمیر تخصصی برد اصلی PS5 - روشن نشدن، سه بوق، ارور',
      'تعویض پورت HDMI - تصویر ندادن PS5 روی تلویزیون',
      'تعمیر درایو نوری - نخواندن دیسک بازی PS5',
      'تعمیر فن و سیستم خنک‌کننده - رفع اورهیت و صدای زیاد',
      'تعمیر دسته DualSense - دریفت آنالوگ، خرابی R2، باتری',
      'نصب و ارتقاء SSD NVMe برای PS5 با هیت‌سینک',
      'رفع ارور CE-108255-1، SU-101312-8 و Safe Mode Loop',
      'سرویس دوره‌ای و تعویض خمیر سیلیکون با خمیر گریزلی'
    ],
    seoText: 'اگر PS5 شما روشن نمی‌شود، تصویر نمی‌دهد، صدای فن زیاد دارد، دسته دریفت دارد یا ارور می‌دهد، نگران نباشید. لابراتوار تخصصی PS5 آرمان همراه با پروگرامر برد، هیتر دقیق و تستر HDMI، تمامی مدل‌های PS5 فت، اسلیم و دیجیتال را با درصد موفقیت ۹۸٪ تعمیر می‌کند. حتی PS5 های آبخورده و ضربه خورده که در مراکز دیگر جواب نشده‌اند. تعمیرات با قطعات اصلی و ۹۰ روز گارانتی کتبی.'
  },
  {
    title: 'تعمیر تخصصی ایرپاد، هدفون و هندزفری بلوتوثی',
    icon: Headphones,
    gradient: 'from-green-600 to-emerald-500',
    keywords: ['تعمیر ایرپاد پرو ۲', 'تعمیر ایرپاد ۴', 'تعمیر گلکسی بادز ۳ پرو', 'تعمیر انکر R60i'],
    problems: [
      'تعویض باتری ایرپاد پرو ۲، ایرپاد ۴، ایرپاد مکس، گلکسی بادز ۳ پرو',
      'تعمیر کیس شارژ - شارژ نشدن، چراغ نزدن، درب خراب',
      'رفع مشکل یک گوش کار نکردن و قطع و وصل شدن',
      'تعمیر میکروفون - صدای ضعیف در تماس',
      'تعمیر نویز کنسلینگ ANC - کار نکردن حذف نویز',
      'رفع مشکل اتصال بلوتوث و پیدا نشدن',
      'تعمیر هدفون انکر R50i، R60i NC، P40i، Soundcore و شیائومی'
    ],
    seoText: 'بسیاری فکر می‌کنند ایرپاد و هدفون قابل تعمیر نیست اما در آرمان همراه ما دستگاه‌های باز شده را با چسب مخصوص اورجینال و ابزار دقیق تعمیر می‌کنیم. خدمات ما شامل تعویض باتری ایرپاد پرو ۲ که فقط ۶۰٪ شارژ نگه می‌دارد، تعمیر کیس ایرپاد ۴ که شارژ نمی‌شود، تعمیر گلکسی بادز ۳ پرو با مشکل نویز، تعمیر انکر R60i NC با مشکل بلوتوث است. حتی اگر یک لنگه گم شده، امکان ست کردن لنگه جدید وجود دارد.'
  },
  {
    title: 'تعمیر ساعت هوشمند اپل واچ و گلکسی واچ',
    icon: Watch,
    gradient: 'from-orange-500 to-red-500',
    keywords: ['تعمیر اپل واچ', 'تعمیر گلکسی واچ ۸', 'تعمیر واچ اولترا', 'تعویض گلس اپل واچ'],
    problems: [
      'تعویض گلس و ال‌سی‌دی اپل واچ سری ۱۱، اولترا ۳، SE و گلکسی واچ ۸',
      'تعویض باتری باد کرده اپل واچ و گلکسی واچ با باتری اصلی',
      'تعمیر سنسور ضربان قلب، ECG، اکسیژن خون و دما',
      'تعمیر برد، شارژ نشدن و خاموش شدن ناگهانی',
      'رفع مشکل تاچ و کار نکردن دیجیتال کراون',
      'تعمیر بند، قفل و بدنه ضربه خورده',
      'آبخوردگی ساعت هوشمند و رسوب شناژ'
    ],
    seoText: 'اپل واچ و گلکسی واچ شما ضربه خورده یا گلسش شکسته؟ باتری زود خالی می‌کند؟ سنسور ضربان اشتباه نشان می‌دهد؟ نگران نباشید، بخش تعمیرات ساعت هوشمند آرمان همراه با اتاق تمیز و چسب مخصوص IP، تعویض گلس اپل واچ سری ۱۱ ۴۶ میلی‌متر، اپل واچ اولترا ۳ تیتانیوم مشکی، گلکسی واچ ۸ ۴۴ میلی‌متر، واچ ۷ و واچ ۶ کلاسیک را در کمتر از ۲۴ ساعت انجام می‌دهد. حتی تعمیر برد واتر دمیج با التراسونیک.'
  },
  {
    title: 'تعمیر اسپیکر و باند خانگی و پرتابل',
    icon: Speaker,
    gradient: 'from-yellow-500 to-orange-600',
    keywords: ['تعمیر اسپیکر', 'تعمیر باند', 'تعمیر اسپیکر بلوتوثی', 'تعمیر پارتی باکس'],
    problems: [
      'تعمیر برد آمپلی‌فایر اسپیکر - روشن نشدن، صدای خش خش',
      'تعویض باتری اسپیکر بلوتوثی - شارژ نگه نداشتن',
      'تعمیر درایور و بلندگو - پاره شدن، خش خش',
      'تعمیر پورت شارژ USB-C و Micro USB',
      'رفع مشکل بلوتوث - وصل نشدن، قطع شدن',
      'تعمیر اسپیکر هارمن کاردن، JBL، سونی، انکر و شیائومی',
      'تعمیر باند اکتیو و پسیو خانگی، پارتی باکس و ساندبار'
    ],
    seoText: 'اسپیکر بلوتوثی شما روشن نمی‌شود؟ شارژ نگه نمی‌دارد؟ صدا خش خش دارد؟ باند خانگی یک کانال کار نمی‌کند؟ تیم تعمیرات صوتی آرمان همراه با اسیلوسکوپ و تستر درایور، انواع اسپیکر و باند پرتابل، اسپیکر هارمن کاردن، JBL Charge، Flip، Xtreme، سونی SRS، پارتی باکس و ساندبار را با نقشه شماتیک و قطعات اصلی تعمیر می‌کند. حتی تعویض کویل و دیافراگم درایور.'
  }
];

const outOfWarrantyRules = [
  {
    title: 'پذیرش دستگاه‌های آبخورده و ضربه‌خورده',
    desc: 'دستگاه‌های آب‌خورده و ضربه‌خورده به دلیل تغییر شکل ظاهری و اکسید برد، ممکن است پس از باز شدن به حالت اولیه هنگام پذیرش بازنگردد. این موضوع قبل از تعمیر با فرم رضایت‌نامه به اطلاع مشتری می‌رسد. تعمیر آبخوردگی نیاز به زمان بیشتر برای رسوب‌زدایی با التراسونیک و تست تک تک قطعات دارد.'
  },
  {
    title: 'مسئولیت تعمیر بر اساس ایراد اعلامی',
    desc: 'دستگاهی که فاقد گارانتی بوده و با یک ایراد مشخص مثلا تعویض ال‌سی‌دی به مرکز مراجعه می‌کند، مرکز فقط در قبال همان ایراد مسئولیت می‌پذیرد. زیرا دستگاه آبخورده یا ضربه‌خورده ممکن است پس از مدتی ایرادات پنهان دیگری مانند مشکل برد، باتری یا آنتن را نمایان سازد که ربطی به تعمیر فعلی ندارد.'
  },
  {
    title: 'گارانتی ۳ ماهه قطعه تعویضی و سقف هزینه',
    desc: 'قطعه تعویضی در این مرکز به مدت ۳ ماه پس از تحویل گارانتی دارد، به شرط عدم آبخوردگی و ضربه مجدد و عدم تغییر فیزیکی. همچنین این مرکز ایرادات تا سقف ۵۰۰ هزار تومان را بدون هماهنگی تعمیر می‌نماید و مبالغ بالاتر حتما با تماس تلفنی و تأیید مشتری انجام می‌گردد.'
  }
];

const faqs = [
  { q: 'هزینه تعمیرات فاقد گارانتی چقدر است؟', a: 'هزینه بستگی به برند، مدل و نوع خرابی دارد. تعمیرات سبک مثل تعویض سوکت شارژ سامسونگ A07 یا باتری نوکیا ۱۰۵ فورجی زیر ۱ میلیون، تعویض ال‌سی‌دی آیفون ۱۶ پرو و S25 Ultra بین ۵ تا ۲۰ میلیون، تعمیر برد تخصصی و آبخوردگی بین ۱ تا ۵ میلیون و تعمیر PS5 بین ۱.۵ تا ۸ میلیون تومان بسته به خرابی متغیر است. عیب‌یابی رایگان و اعلام هزینه شفاف قبل از تعمیر انجام می‌شود.' },
  { q: 'آیا تعمیر گوشی آبخورده امکان‌پذیر است؟', a: 'بله، اگر سریع اقدام کنید شانس ۷۰-۸۰٪ دارد. گوشی آبخورده را خاموش کنید، به شارژ نزنید و سریعا به آرمان همراه بیاورید. ما با التراسونیک و مواد نانو، برد را رسوب‌زدایی کرده و قطعات شورتی را تعویض می‌کنیم. هرچه زمان بیشتری از آبخوردگی بگذرد، خوردگی بیشتر شده و شانس تعمیر کاهش می‌یابد.' },
  { q: 'مدت زمان تعمیر موبایل، PS5، ایرپاد و ساعت چقدر است؟', a: 'تعمیرات نرم‌افزاری و تعویض باتری و ال‌سی‌دی ساده: ۱ تا ۳ ساعت حضوری، تعمیر برد موبایل و آبخوردگی: ۲۴ تا ۷۲ ساعت، تعمیر PS5 و دسته: ۲۴ تا ۴۸ ساعت، تعمیر ایرپاد و هدفون: ۲۴ ساعت، تعمیر ساعت هوشمند و تعویض گلس: ۲۴ ساعت، تعمیر اسپیکر و باند: ۴۸ ساعت. در صورت نیاز دستگاه امانی ارائه می‌شود.' },
  { q: 'آیا اطلاعات داخل گوشی هنگام تعمیر پاک می‌شود؟', a: 'در ۹۵٪ تعمیرات سخت‌افزاری مانند تعویض ال‌سی‌دی، باتری، سوکت شارژ، اطلاعات پاک نمی‌شود. اما برای تعمیرات برد، فلش نرم‌افزاری و تعویض هارد، احتمال پاک شدن وجود دارد. توصیه می‌کنیم قبل از مراجعه حتما بک‌آپ بگیرید. شرکت هیچ مسئولیتی در قبال اطلاعات شخصی ندارد.' },
  { q: 'چگونه دستگاه فاقد گارانتی را برای تعمیر ارسال کنم؟', a: 'ساکنان تهران: مراجعه حضوری به پاساژ علاءالدین طبقه ۶ پلاک ۶۱۴. ساکنان شهرستان: تماس با ۰۲۱-XXXX برای دریافت کد پذیرش و ارسال با تیپاکس یا پست پیشتاز به آدرس مرکز. حتما دستگاه را با ضربه‌گیر بسته‌بندی کنید و کد پذیرش را روی بسته بنویسید. پس از دریافت، کارشناسان با شما تماس می‌گیرند.' },
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
          <span className="text-foreground font-medium">تعمیرات تخصصی فاقد گارانتی - موبایل، PS5، ایرپاد، ساعت، اسپیکر</span>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-14 border-b">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/warranty" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors">
                <ChevronLeft size={20} /> بازگشت به صفحه گارانتی
              </Link>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold">تعمیرات فاقد گارانتی - آبخورده، ضربه‌خورده، شکسته</span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold flex items-center gap-1"><Clock size={12}/> پاسخگویی ۲۴ ساعته</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
                تعمیرات فوق تخصصی انواع گوشی موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند
                <span className="block text-xl md:text-2xl font-bold text-zinc-300 mt-3">حتی برای دستگاه‌های فاقد گارانتی، آبخورده و ضربه‌خورده با گارانتی ۳ ماهه قطعه</span>
              </h1>

              <p className="text-zinc-300 leading-8 max-w-4xl text-lg mb-8">
                گوشی‌ات <strong className="text-white">آبخورده؟ ضربه خورده؟ ال‌سی‌دی شکسته؟ PS5 تصویر نمی‌دهد؟ ایرپاد یک گوش کار نمی‌کند؟ اپل واچ گلسش شکسته؟ اسپیکر شارژ نگه نمی‌دارد؟</strong> نگران نباش! لابراتوار تخصصی <strong className="text-white">آرمان همراه</strong> در علاءالدین تهران، تخصصی‌ترین مرکز <strong className="text-white">تعمیرات موبایل سامسونگ، آیفون، شیائومی، تعمیر PS5، تعمیر ایرپاد پرو، تعمیر هدفون بلوتوثی، تعمیر ساعت هوشمند و تعمیر اسپیکر و باند</strong> است. ما حتی دستگاه‌هایی که در مراکز دیگر تعمیر نشده‌اند را با ابزار پیشرفته، نقشه شماتیک و قطعات اورجینال تعمیر می‌کنیم.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
                {[
                  { icon: Wrench, t: 'تعمیر برد با میکروسکوپ' },
                  { icon: Shield, t: '۳ ماه گارانتی کتبی' },
                  { icon: CheckCircle2, t: 'عیب‌یابی رایگان' },
                  { icon: Award, t: 'قطعه ۱۰۰٪ اورجینال' },
                ].map((i, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur">
                    <i.icon size={18} className="text-primary" />
                    <span className="text-sm font-medium">{i.t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Repair Categories */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-foreground mb-4">لیست کامل خدمات تعمیرات تخصصی آرمان همراه</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-7">از تعمیرات موبایل آیفون ۱۷ پرو و سامسونگ S25 Ultra تا تعمیر PS5 اسلیم، تعمیر ایرپاد پرو ۲، تعمیر گلکسی واچ ۸ و تعمیر اسپیکر JBL - همه در یک مرکز فوق تخصصی</p>
            </div>

            <div className="space-y-8">
              {repairCategories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                            <cat.icon size={28} className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-foreground leading-tight">{cat.title}</h3>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {cat.keywords.map((k,i)=>(
                                <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">{k}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-7 mb-5 p-4 rounded-xl bg-secondary/50 border">
                          {cat.seoText}
                        </p>
                        <div className="grid md:grid-cols-2 gap-2.5">
                          {cat.problems.map((p, i)=>(
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground leading-6">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="lg:w-[320px] flex-shrink-0">
                        <div className="bg-secondary/50 rounded-xl p-5 border h-full flex flex-col">
                          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            <Zap size={16} className="text-primary" /> مشکلات رایج و راه حل
                          </h4>
                          <div className="space-y-3 flex-1">
                            <div className="text-xs text-muted-foreground leading-6 space-y-2">
                              <p>✅ <strong>تخصصی‌ترین ابزار:</strong> هیتر Quick، میکروسکوپ، پروگرامر، تستر باتری</p>
                              <p>✅ <strong>قطعه اورجینال:</strong> مستقیم از سرویس سنتر</p>
                              <p>✅ <strong>گارانتی کتبی:</strong> ۳ ماه بدون قید</p>
                              <p>✅ <strong>زمان:</strong> ۷۰٪ تعمیرات در ۲۴ ساعت</p>
                            </div>
                          </div>
                          <Link to="/contact" className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground text-center font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                            <Phone size={16} /> استعلام قیمت تعمیر
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LONG CONTENT 1500+ words - Mobile repairs - Step 2 */}
        <RepairLongContentMobile />

        {/* Out of warranty rules - Rewritten original content */}
        <section className="section-padding bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-900/50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                  <AlertTriangle size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground">شرایط عمومی تعمیرات دستگاه‌های فاقد گارانتی</h2>
                  <p className="text-sm text-muted-foreground">لطفا قبل از تحویل دستگاه، این بندها را با دقت مطالعه فرمایید</p>
                </div>
              </div>

              <div className="space-y-6">
                {outOfWarrantyRules.map((rule, i)=>(
                  <div key={i} className="bg-card border rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-black">{i+1}</span>
                      {rule.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-8">{rule.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-card border rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-4">نکات مهم قبل از تحویل:</h3>
                <ul className="space-y-3 text-sm text-muted-foreground leading-7 list-disc pr-5">
                  <li>چنانچه دستگاه علاوه بر ایراد اعلامی، ایرادات دیگری نیز داشته باشد، حتما طی تماس تلفنی با شما هماهنگ می‌گردد.</li>
                  <li>این مرکز ایرادات تا سقف ۵۰۰ هزار تومان را بدون هماهنگی و مبالغ بالاتر با تماس و تایید شما تعمیر می‌نماید.</li>
                  <li>لطفا شرایط را با آگاهی کامل مطالعه و فرم رضایت‌نامه را با امضاء، اثر انگشت و کد ملی تکمیل نمایید.</li>
                  <li>ارائه کد ملی، امضاء و اثر انگشت در فرم رضایت‌نامه الزامی می‌باشد.</li>
                </ul>
                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm leading-7">
                  <strong className="text-primary">💡 توصیه تکنسین:</strong> برای دستگاه‌های آبخورده، هرگز دستگاه را روشن نکنید یا به شارژ نزنید. سریع گوشی را در حالت خاموش به مرکز بیاورید. هر ساعت تاخیر به معنای خوردگی بیشتر برد و افزایش هزینه است.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-black text-center text-foreground mb-8">پرسش‌های پرتکرار تعمیرات فاقد گارانتی</h2>
            <Accordion type="single" collapsible className="bg-card border rounded-2xl px-6">
              {faqs.map((f,i)=>(
                <AccordionItem key={i} value={`f-${i}`} className="border-b last:border-0">
                  <AccordionTrigger className="text-right font-bold text-foreground">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-8 text-sm">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-zinc-900 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-black mb-4">دستگاه فاقد گارانتی دارید؟ همین الان ثبت کنید</h2>
            <p className="text-zinc-300 max-w-2xl mx-auto mb-8 leading-7">فرقی نمی‌کند آبخورده، ضربه‌خورده یا تعمیر نشده - متخصصان ما با عیب‌یابی رایگان، قبل از تعمیر هزینه را اعلام می‌کنند</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-black flex items-center gap-2 hover:bg-primary/90">
                <Wrench size={18} /> ثبت درخواست تعمیر
              </Link>
              <a href="tel:+9821" className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 font-bold flex items-center gap-2 hover:bg-white/20 transition-colors">
                <Phone size={18} /> مشاوره رایگان: ۰۲۱-XXXX
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

const WarrantyRepairsPage = () => {
  const repairFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ...faqs,
      ...repairCategories.map(cat => ({
        q: cat.title,
        a: cat.seoText
      }))
    ].map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "خدمات تعمیرات تخصصی آرمان همراه",
    "itemListElement": repairCategories.map((cat, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Service",
        "name": cat.title,
        "description": cat.seoText,
        "provider": { "@type": "Organization", "name": "آرمان همراه" },
        "serviceType": cat.keywords.join(', ')
      }
    }))
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
      { "@type": "ListItem", "position": 2, "name": "گارانتی", "item": "https://armanhamrah.com/warranty" },
      { "@type": "ListItem", "position": 3, "name": "تعمیرات فاقد گارانتی - موبایل، PS5، ایرپاد، ساعت، اسپیکر", "item": "https://armanhamrah.com/warranty/repairs" }
    ]
  };

  const howToRepair = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "نحوه ثبت درخواست تعمیرات فاقد گارانتی",
    "step": [
      { "@type": "HowToStep", "name": "ثبت درخواست", "text": "تماس یا فرم آنلاین" },
      { "@type": "HowToStep", "name": "عیب‌یابی رایگان", "text": "بررسی تخصصی برد و اعلام هزینه" },
      { "@type": "HowToStep", "name": "تعمیر با قطعه اورجینال", "text": "تعمیر در لابراتوار با میکروسکوپ" },
      { "@type": "HowToStep", "name": "تست و تحویل با گارانتی", "text": "تست نهایی و ارائه فاکتور + گارانتی ۳ ماهه" }
    ]
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="تعمیرات تخصصی فاقد گارانتی | تعمیر موبایل، PS5، ایرپاد، ساعت هوشمند، اسپیکر و باند با گارانتی ۳ ماهه"
            description="مرکز تخصصی تعمیرات فاقد گارانتی انواع گوشی موبایل آیفون، سامسونگ، شیائومی، PS5 و دسته، ایرپاد پرو، هدفون، اپل واچ، گلکسی واچ، اسپیکر و باند آبخورده، ضربه‌خورده، شکسته با قطعه اورجینال و عیب‌یابی رایگان در تهران علاءالدین"
            jsonLd={[repairFaqSchema, serviceListSchema, breadcrumb, howToRepair]}
          />
          <WarrantyRepairsPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyRepairsPage;
