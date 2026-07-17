import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, FileText, Headphones, Wrench, Smartphone, 
  Gamepad2, Watch, Speaker, Battery, Zap, CheckCircle2, 
  Clock, Award, MapPin, Phone, MessageCircle, Settings, Cpu, 
  Sparkles, Headset, Bluetooth, Volume2, Star
} from 'lucide-react';
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
import RepairCategoryGrid from "@/components/repairs/RepairCategoryGrid";

const warrantySections = [
  {
    icon: FileText,
    title: { fa: 'شرایط گارانتی 18 ماهه', en: '18-Month Warranty Conditions' },
    description: { fa: 'مشاهده کامل شرایط و ضوابط گارانتی ۱۸ ماهه محصولات اپل، سامسونگ، شیائومی و سونی با پوشش کامل تعمیرات', en: 'Full terms for 18-month warranty coverage' },
    link: '/warranty/conditions',
    badge: 'محبوب‌ترین'
  },
  {
    icon: Headphones,
    title: { fa: 'گارانتی لوازم جانبی و گجت‌ها', en: 'Accessory Warranty Conditions' },
    description: { fa: 'گارانتی تخصصی ایرپاد، هدفون، ساعت هوشمند، اسپیکر، باند و پاوربانک انکر و شیائومی', en: 'Warranty for accessories, wearables, audio' },
    link: '/warranty/accessories',
    badge: '۱۸ ماهه'
  },
  {
    icon: Wrench,
    title: { fa: 'تعمیرات تخصصی فاقد گارانتی', en: 'Out-of-Warranty Repairs' },
    description: { fa: 'تعمیرات فوق تخصصی انواع گوشی موبایل، PS5، ایرپاد، هدفون و اسپیکر حتی بدون گارانتی', en: 'Professional repair for all devices' },
    link: '/warranty/repairs',
    badge: 'فوری'
  }
];

const repairServices = [
  {
    icon: Smartphone,
    title: 'تعمیرات تخصصی گوشی موبایل',
    keywords: 'تعمیرات آیفون، سامسونگ، شیائومی، پوکو، نوکیا',
    desc: 'تعمیر فوق تخصصی برد، ال‌سی‌دی، باتری و دوربین انواع گوشی آیفون ۱۷ پرو، ۱۶ پرو، سامسونگ S25 Ultra، S24 Ultra، A56، A36، شیائومی 15T، ردمی نوت ۱۴ پرو و پوکو M7 با قطعات ۱۰۰٪ اورجینال و ابزار پیشرفته',
    color: 'from-blue-500 to-cyan-500',
    link: '/warranty/repairs'
  },
  {
    icon: Gamepad2,
    title: 'تعمیرات تخصصی PS5 و پلی استیشن',
    keywords: 'تعمیر PS5 اسلیم، فت، دیجیتال، دسته DualSense',
    desc: 'مرکز تخصصی تعمیر پلی استیشن 5 : تعمیر برد PS5، تعمیر پورت HDMI، تعمیر درایو، تعمیر دسته PS5، رفع ارور، تعمیر فن و اورهیت، نصب SSD با گارانتی ۳ ماهه قطعه تعویضی',
    color: 'from-purple-500 to-pink-500',
    link: '/warranty/repairs'
  },
  {
    icon: Headset,
    title: 'تعمیر ایرپاد و هدفون بلوتوثی',
    keywords: 'تعمیر ایرپاد پرو 2، ایرپاد 4، گلکسی بادز، انکر',
    desc: 'تعمیر تخصصی ایرپاد پرو ۲، ایرپاد ۴، ایرپاد مکس، گلکسی بادز ۳ پرو، انکر R50i، R60i NC و انواع هدفون بلوتوثی: تعمیر باتری، کیس شارژ، نویز کنسلینگ، میکروفون و اتصال بلوتوث',
    color: 'from-green-500 to-emerald-500',
    link: '/warranty/accessories'
  },
  {
    icon: Watch,
    title: 'تعمیر ساعت هوشمند اپل واچ و گلکسی واچ',
    keywords: 'تعمیر اپل واچ، گلکسی واچ 8، واچ اولترا',
    desc: 'تعمیر تخصصی اپل واچ سری ۱۱، اولترا ۳، SE، گلکسی واچ ۸، واچ ۷، واچ ۶ کلاسیک و واچ اولترا: تعویض گلس، باتری، سنسور ضربان، شناژ و برد با تجهیزات کالیبره',
    color: 'from-orange-500 to-red-500',
    link: '/warranty/accessories'
  },
  {
    icon: Speaker,
    title: 'تعمیر اسپیکر و باند خانگی و پرتابل',
    keywords: 'تعمیر اسپیکر بلوتوثی، باند، ساندبار',
    desc: 'تعمیر انواع اسپیکر بلوتوثی، باند اکتیو و پسیو، اسپیکر هارمن کاردن، سونی، JBL، پارتی باکس: تعمیر برد آمپلی‌فایر، درایور، باتری، پورت شارژ و اتصال بلوتوث',
    color: 'from-yellow-500 to-orange-500',
    link: '/warranty/accessories'
  },
  {
    icon: Battery,
    title: 'تعمیر پاوربانک و لوازم جانبی',
    keywords: 'تعمیر پاوربانک شیائومی، انکر، کابل و شارژر',
    desc: 'تعمیر تخصصی پاوربانک شیائومی 20000، انکر 10000 و 20000 میلی‌آمپری، شارژر، کابل، هندزفری سیمی با تست ظرفیت واقعی و تعویض سلول باتری اورجینال',
    color: 'from-indigo-500 to-blue-500',
    link: '/warranty/accessories'
  }
];

const repairSteps = [
  { step: '01', title: 'ثبت درخواست آنلاین / حضوری', desc: 'از طریق سایت، تماس یا مراجعه حضوری به نمایندگی علاءالدین' },
  { step: '02', title: 'عیب‌یابی رایگان و اعلام هزینه', desc: 'بررسی تخصصی دستگاه با تجهیزات پیشرفته و اعلام شفاف هزینه قبل از تعمیر' },
  { step: '03', title: 'تعمیر تخصصی با قطعه اورجینال', desc: 'انجام تعمیر توسط تکنسین مجرب با قطعات اصلی و ابزار کالیبره' },
  { step: '04', title: 'تست نهایی و تحویل با گارانتی', desc: 'تست کامل عملکرد + ارائه فاکتور رسمی و ۳ ماه گارانتی قطعه' }
];

const faqItems = [
  {
    q: 'بهترین مرکز تعمیرات تخصصی گوشی موبایل، PS5 و ایرپاد در تهران کجاست؟',
    a: 'مرکز تخصصی تعمیرات آرمان همراه در پاساژ علاءالدین تهران، با بیش از ۱۰ سال سابقه، مجهزترین مرکز تعمیرات انواع گوشی آیفون، سامسونگ، شیائومی، PS5، ایرپاد پرو، هدفون، اپل واچ، گلکسی واچ، اسپیکر و باند است. ما با داشتن تکنسین‌های certified و قطعات ۱۰۰٪ اورجینال، دستگاه شما را با گارانتی کتبی و در سریع‌ترین زمان ممکن تعمیر می‌کنیم. بیش از ۵۰۰ هزار دستگاه موفق تعمیر شده گواهی ماست.'
  },
  {
    q: 'هزینه تعمیرات گوشی آیفون، سامسونگ و شیائومی چقدر است؟',
    a: 'هزینه تعمیرات بستگی به مدل دستگاه و نوع خرابی دارد. به عنوان مثال: تعویض ال‌سی‌دی آیفون ۱۶ پرو، تعویض باتری سامسونگ S25 Ultra، تعمیر برد شیائومی ردمی نوت ۱۴ پرو هر کدام قیمت متفاوت دارد. در آرمان همراه، عیب‌یابی کاملا رایگان است و قبل از هر اقدامی، هزینه نهایی به صورت شفاف به شما اعلام می‌شود. تعمیرات تا سقف ۵۰۰ هزار تومان بدون هماهنگی و بالاتر با تماس تلفنی انجام می‌شود.'
  },
  {
    q: 'آیا تعمیرات PS5 شامل تعمیر برد، HDMI و دسته هم می‌شود؟',
    a: 'بله، ما تخصصی‌ترین مرکز تعمیر PS5 در ایران هستیم. خدمات ما شامل: تعمیر برد اصلی PS5، تعویض پورت HDMI، تعمیر درایو نوری، رفع مشکل روشن نشدن، تعمیر فن و مشکل اورهیت و صدای زیاد، تعمیر دسته DualSense (دریفت آنالوگ، باتری، دکمه‌ها)، نصب و ارتقاء SSD و رفع انواع ارور نرم‌افزاری و سخت‌افزاری PS5 فت، اسلیم و دیجیتال می‌شود. تمام قطعات تعویضی ۳ ماه گارانتی دارند.'
  },
  {
    q: 'تعمیر ایرپاد پرو و هدفون بلوتوثی امکان‌پذیر است؟',
    a: 'بله، برخلاف تصور عموم، بسیاری از ایرپادها و هدفون‌ها قابل تعمیر هستند. در آرمان همراه ما خدمات تخصصی شامل: تعویض باتری ایرپاد پرو ۲ و ایرپاد ۴، تعمیر کیس شارژ، تعمیر میکروفون و اسپیکر، رفع مشکل نویز کنسلینگ ANC، تعمیر اتصال بلوتوث گلکسی بادز ۳ پرو، انکر R60i NC، R50i و P40i و انواع هدفون انکر و شیائومی را ارائه می‌دهیم. حتی اگر کیس گم شده باشد، امکان تهیه کیس جایگزین اورجینال وجود دارد.'
  },
  {
    q: 'تعمیر ساعت هوشمند اپل واچ و گلکسی واچ چقدر زمان می‌برد؟',
    a: 'زمان تعمیر ساعت هوشمند معمولا بین ۲ تا ۷۲ ساعت کاری است. تعویض گلس اپل واچ سری ۱۱ و اولترا ۳ در همان روز، تعویض باتری گلکسی واچ ۸ و واچ ۷ معمولا ۲۴ ساعته و تعمیر برد و سنسورها نیاز به ۲-۳ روز بررسی تخصصی دارد. در طول مدت تعمیر، در صورت نیاز دستگاه امانی تحت شرایط خاص ارائه می‌گردد تا بدون ساعت نمانید.'
  },
  {
    q: 'آیا اسپیکر و باند بلوتوثی هم تعمیر می‌کنید؟',
    a: 'بله، بخش تخصصی تعمیرات اسپیکر و باند ما، انواع اسپیکر بلوتوثی پرتابل، باند خانگی، پارتی باکس، ساندبار و اسپیکر برندهای هارمن کاردن، سونی، JBL، انکر و شیائومی را تعمیر می‌کند. مشکلات رایج مانند روشن نشدن، شارژ نشدن، قطع شدن صدا، خرابی برد آمپلی‌فایر، خش خش درایور و مشکل بلوتوث به صورت تخصصی با قطعات اصلی رفع می‌شود.'
  },
  {
    q: 'فرق گارانتی آرمان همراه با تعمیرات فاقد گارانتی چیست؟',
    a: 'گارانتی ۱۸ ماهه آرمان همراه شامل ایرادات سخت‌افزاری و کارخانه‌ای انواع گوشی موبایل، ساعت هوشمند و گجت‌ها می‌شود و به صورت رایگان رفع می‌گردد. حتی تا ۳ سال ضمانت تامین قطعه داریم. اما تعمیرات فاقد گارانتی شامل دستگاه‌هایی است که دچار ضربه، آبخوردگی، شکستگی، تعمیر در مراکز غیرمجاز یا اتمام گارانتی شده‌اند. این دستگاه‌ها نیز با هزینه مصوب و با همان کیفیت و گارانتی ۳ ماهه قطعه تعمیر می‌شوند.'
  },
  {
    q: 'آیا برای تعمیر نیاز به فاکتور و جعبه است؟',
    a: 'برای استفاده از خدمات گارانتی ۱۸ ماهه، همراه داشتن فاکتور رسمی مهمور و جعبه دستگاه الزامی است. اما برای تعمیرات فاقد گارانتی (پولی) نیازی به فاکتور نیست. فقط کافیست دستگاه را به همراه کارت شناسایی به مرکز خدمات آرمان همراه در تهران تحویل دهید. در شهرستان‌ها از طریق نمایندگان مجاز یا ارسال پستی با هماهنگی قبلی امکان پذیرش وجود دارد.'
  },
  {
    q: 'گارانتی قطعه تعویضی چقدر است؟',
    a: 'تمامی قطعات تعویض شده در مرکز تعمیرات آرمان همراه، ۳ ماه گارانتی بی‌قید و شرط دارند، به شرطی که دستگاه مجددا دچار ضربه، آبخوردگی یا شکستگی فیزیکی نشود. همچنین اگر تعمیر دستگاه بیش از مدت اعلامی طول بکشد، به ازای هر هفته تاخیر، یک ماه به گارانتی اصلی اضافه می‌گردد.'
  },
  {
    q: 'آیا تعمیرات موبایل در حین حضور مشتری انجام می‌شود؟',
    a: 'بسیاری از تعمیرات سبک مانند تعویض باتری آیفون، تعویض باتری سامسونگ A56 و A36، تعویض گلس و تعمیرات نرم‌افزاری در کمتر از ۱ ساعت و در حضور مشتری انجام می‌شود. اما تعمیرات تخصصی برد، تعمیرات آبخوردگی، تعمیرات PS5 و ایرپاد نیاز به زمان بیشتر و تست‌های تخصصی در لابراتوار دارد.'
  }
];

const WarrantyPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        {/* Breadcrumb - SEO & SXO */}
        <div className="container-custom py-4">
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">خانه</Link>
            <span>/</span>
            <span className="text-foreground font-medium">گارانتی و تعمیرات تخصصی</span>
          </nav>
        </div>

        {/* HERO - SEO Heavy H1 */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-bold border border-green-500/20">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  مرکز تخصصی تعمیرات در تهران - پاساژ علاءالدین
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  <Award size={14} /> گارانتی ۱۸ ماهه + ۳ سال تامین قطعه
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[52px] font-black leading-[1.2] text-foreground mb-6">
                تعمیرات تخصصی انواع
                <span className="text-primary"> گوشی موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند</span>
                <br />
                با گارانتی ۱۸ ماهه آرمان همراه
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-8 max-w-4xl mb-8">
                <strong className="text-foreground">آرمان همراه ارتباطات آریا</strong>، معتبرترین و هوشمندترین مرکز
                <strong> تعمیرات موبایل</strong> (آیفون ۱۷ پرو، ۱۶ پرو، سامسونگ گلکسی S25 Ultra، S24 Ultra، A56، شیائومی 15T، ردمی نوت ۱۴ پرو، پوکو M7 و...)، 
                <strong> تعمیرات PS5 اسلیم و فت و دسته DualSense</strong>، 
                <strong>تعمیر ایرپاد پرو ۲، ایرپاد ۴، گلکسی بادز ۳ پرو، انکر R60i NC</strong>،
                <strong> تعمیر ساعت هوشمند اپل واچ اولترا ۳ و گلکسی واچ ۸</strong> و
                <strong> تعمیر اسپیکر و باند بلوتوثی</strong> در ایران. بیش از ۱۰ سال تجربه، ۵۰۰ هزار دستگاه تعمیر موفق، قطعات ۱۰۰٪ اورجینال و عیب‌یابی رایگان.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/warranty/repairs" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1">
                  <Wrench size={20} /> ثبت درخواست تعمیر فوری
                  <ArrowRight size={18} className={isFa ? '' : 'rotate-180'} />
                </Link>
                <a href="tel:+9821" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-bold text-lg hover:bg-secondary/80 transition-all border">
                  <Phone size={20} /> تماس: ۰۲۱-XXXX
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-4 bg-background border rounded-xl font-medium hover:bg-accent transition-colors">
                  <MapPin size={18} /> آدرس و نمایندگی‌ها
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: CheckCircle2, label: 'عیب‌یابی رایگان', sub: '۰ تومان' },
                  { icon: Clock, label: 'تعمیر فوری', sub: 'کمتر از ۲۴ ساعت' },
                  { icon: Shield, label: 'ضمانت قطعه', sub: '۳ ماه گارانتی' },
                  { icon: Award, label: 'قطعه اورجینال', sub: '۱۰۰٪ اصلی' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3 Main Cards - Internal Linking SXO */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                <Sparkles size={14} /> خدمات گارانتی و تعمیرات
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                هوشمندترین گارانتی و مرکز تعمیرات تخصصی در ایران
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-7">
                از سال ۱۳۹۴ تا کنون، شرکت گارانتی آرمان همراه ارتباطات آریا با پوشش ۱۸ ماهه و خدمات پس از فروش حرفه‌ای،
                همراه مطمئن شما برای <strong>تعمیرات گوشی، PS5، ایرپاد، ساعت و اسپیکر</strong> بوده است. هر دستگاهی که دارید، ما راه حلش را داریم.
              </p>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-6" />
            </motion.div>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {warrantySections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full group"
                >
                  <Link to={section.link} className="card-premium h-full flex flex-col text-center p-8 rounded-2xl relative overflow-hidden border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all hover:-translate-y-2 block">
                    {section.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {section.badge}
                      </span>
                    )}
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <section.icon size={32} className="text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {section.title[language as 'fa' | 'en']}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-grow leading-6">
                      {section.description[language as 'fa' | 'en']}
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-3 transition-all">
                        مشاهده جزئیات <ArrowRight className={`h-4 w-4 ${isFa ? '' : 'rotate-180'} `} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Repair Services Grid - Main SEO Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                خدمات فوق تخصصی تعمیرات آرمان همراه
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                مرکز تخصصی <strong>تعمیرات موبایل در تهران، تعمیر PS5، تعمیر ایرپاد و هدفون، تعمیر ساعت هوشمند و تعمیر اسپیکر و باند</strong> با مجهزترین لابراتوار و تکنسین‌های certified
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repairServices.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group bg-card border rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <service.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block mb-3">
                    {service.keywords}
                  </div>
                  <p className="text-sm text-muted-foreground leading-6 mb-4">
                    {service.desc}
                  </p>
                  <Link to={service.link} className="text-sm font-bold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
                    درخواست تعمیر <ArrowRight size={14} className={isFa ? '' : 'rotate-180'} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW: Repair Category Grid with real images, hashtags, 1500+ word ready - Step 1 */}
        <RepairCategoryGrid />

        {/* Brands & Models - Long-tail SEO */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">
                  تعمیرات موبایل همه برندها و مدل‌ها
                  <span className="block text-lg font-medium text-primary mt-2">آیفون، سامسونگ، شیائومی، پوکو، نوکیا، انکر</span>
                </h2>
                <div className="prose prose-invert max-w-none text-muted-foreground leading-8 text-sm">
                  <p>
                    آیا به دنبال <strong>تعمیرات تخصصی گوشی موبایل</strong> هستید؟ آرمان همراه به عنوان نمایندگی رسمی و مرکز تخصصی تعمیرات، تمامی مدل‌های روز را پوشش می‌دهد:
                  </p>
                  <ul className="grid grid-cols-1 gap-2 mt-4 list-none p-0">
                    <li className="flex gap-2"><CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>تعمیرات آیفون:</strong> آیفون ۱۷ پرو، ۱۶ پرو، ۱۵، ۱۴، SE، تعویض ال‌سی‌دی اورجینال، باتری، برد، دوربین و فیس آیدی</span></li>
                    <li className="flex gap-2"><CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>تعمیرات سامسونگ:</strong> گلکسی S25 Ultra، S24 Ultra، S25 FE، A56، A36، A26، A17، A07، زد فولد و فلیپ، تعمیر قلم S Pen</span></li>
                    <li className="flex gap-2"><CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>تعمیرات شیائومی و پوکو:</strong> شیائومی 15T، ردمی نوت ۱۴ پرو، ردمی ۱۵، پوکو M7، C85، C75 با ابزار تخصصی مدیاتک و اسنپدراگون</span></li>
                    <li className="flex gap-2"><CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>تعمیرات تبلت:</strong> آیپد پرو، گلکسی Tab A9 Plus، Tab A9 و...</span></li>
                  </ul>
                  <p className="mt-4">
                    فرقی نمی‌کند مشکل <strong>شکستگی ال‌سی‌دی، خرابی باتری، آبخوردگی، ضربه، خاموش شدن ناگهانی، مشکل آنتن و بیس باند یا ایراد نرم‌افزاری</strong> باشد، ما در علاءالدین تهران با قطعات اورجینال و تست نهایی، دستگاه شما را مثل روز اول تحویل می‌دهیم.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">
                  مرکز تخصصی تعمیرات PS5 و کنسول بازی
                  <span className="block text-lg font-medium text-primary mt-2">PS5 Fat، Slim، Digital، دسته DualSense</span>
                </h2>
                <div className="bg-card border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <Gamepad2 size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">تعمیر PS5 درصد موفقیت ۹۸٪</div>
                      <div className="text-xs text-muted-foreground">سریع‌ترین تعمیر PS5 در تهران</div>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {[
                      'تعمیر برد اصلی PS5 و مشکل روشن نشدن',
                      'تعویض پورت HDMI PS5 (تصویر ندادن)',
                      'تعمیر درایو بلوری PS5 و نخواندن دیسک',
                      'تعمیر فن و رفع اورهیت و صدای زیاد PS5',
                      'تعمیر دسته DualSense - دریفت آنالوگ، دکمه، باتری',
                      'نصب SSD و ارتقاء حافظه PS5',
                      'رفع ارورهای CE و SU و Safe Mode PS5',
                      'سرویس دوره‌ای و تعویض خمیر سیلیکون PS5'
                    ].map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Zap size={14} className="text-purple-500" /> {t}
                      </li>
                    ))}
                  </ul>
                  <Link to="/warranty/repairs" className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Gamepad2 size={16} /> درخواست تعمیر PS5
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wearables & Audio SEO */}
        <section className="section-padding bg-primary/[0.03]">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                  <Bluetooth size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">تعمیر ایرپاد و هدفون</h3>
                <p className="text-sm text-muted-foreground leading-6">
                  تعمیر <strong>ایرپاد پرو ۲، ایرپاد پرو ۳، ایرپاد ۴ با و بدون ANC، ایرپاد مکس، گلکسی بادز ۳ و ۳ پرو، انکر R60i NC، R50i، P40i</strong> شامل تعویض باتری، تعمیر کیس، رفع مشکل یک گوش کار نکردن، نویز و اتصال.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['تعمیر ایرپاد', 'تعمیر هدفون', 'تعمیر بادز', 'تعمیر انکر'].map(k => (
                    <span key={k} className="text-[10px] px-2 py-1 rounded-full bg-secondary text-muted-foreground">{k}</span>
                  ))}
                </div>
              </div>
              <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Watch size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">تعمیر ساعت هوشمند</h3>
                <p className="text-sm text-muted-foreground leading-6">
                  تعمیر <strong>اپل واچ سری ۱۱ ۴۲ و ۴۶، اپل واچ اولترا ۳ بلک تیتانیوم، SE، گلکسی واچ ۸ ۴۰ و ۴۴، واچ ۷، واچ ۶ کلاسیک، واچ اولترا</strong> - تعویض گلس، باتری، سنسور ECG، اکسیژن، بند و برد.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['تعمیر اپل واچ', 'تعمیر گلکسی واچ', 'تعویض گلس ساعت', 'تعمیر واچ اولترا'].map(k => (
                    <span key={k} className="text-[10px] px-2 py-1 rounded-full bg-secondary text-muted-foreground">{k}</span>
                  ))}
                </div>
              </div>
              <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                  <Volume2 size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">تعمیر اسپیکر و باند</h3>
                <p className="text-sm text-muted-foreground leading-6">
                  تعمیر <strong>اسپیکر بلوتوثی، باند خانگی، پارتی باکس، ساندبار، اسپیکر هارمن کاردن، سونی، JBL</strong> - تعمیر آمپلی‌فایر، باتری، برد بلوتوث، پورت شارژ، خش خش صدا و روشن نشدن.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['تعمیر اسپیکر', 'تعمیر باند', 'تعمیر پارتی باکس', 'تعمیر ساندبار'].map(k => (
                    <span key={k} className="text-[10px] px-2 py-1 rounded-full bg-secondary text-muted-foreground">{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HowTo - GEO/AEO */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-foreground mb-3">مراحل تعمیر دستگاه در آرمان همراه</h2>
                <p className="text-muted-foreground">۴ مرحله ساده تا تحویل دستگاه سالم با گارانتی کتبی</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {repairSteps.map((s, i) => (
                  <div key={i} className="relative">
                    <div className="bg-card border rounded-2xl p-6 h-full">
                      <div className="text-4xl font-black text-primary/20 mb-3">{s.step}</div>
                      <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-6">{s.desc}</p>
                    </div>
                    {i < 3 && <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-primary/30"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Us - E-E-A-T */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-foreground mb-6">چرا تعمیرات آرمان همراه انتخاب اول ایران است؟</h2>
                <div className="space-y-5">
                  {[
                    { title: '۱۰ سال تجربه تخصصی و ۵۰۰ هزار تعمیر موفق', desc: 'از سال ۱۳۹۴، اعتماد دیجی کالا، تکنولایف و بزرگترین فروشگاه‌های ایران', icon: Star },
                    { title: 'قطعات ۱۰۰٪ اورجینال با گارانتی کتبی', desc: 'مستقیم از اپل، سامسونگ و شیائومی - نه های کپی بازار', icon: Shield },
                    { title: 'مجهزترین لابراتوار تعمیرات موبایل و PS5 در تهران', desc: 'میکروسکوپ، هیتر دقیق، پروگرامر برد و ابزار کالیبره', icon: Cpu },
                    { title: 'تکنسین‌های آموزش دیده و certified', desc: 'دوره دیده در دبی و استانبول، متخصص برد و هارد', icon: Settings },
                    { title: 'عیب‌یابی رایگان و اعلام هزینه شفاف', desc: 'بدون هزینه اضافی پنهان - فقط هزینه مصوب', icon: CheckCircle2 },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{item.title}</div>
                        <div className="text-sm text-muted-foreground mt-1 leading-6">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border rounded-2xl p-8">
                <h3 className="font-black text-xl text-foreground mb-6 flex items-center gap-2">
                  <MapPin className="text-primary" /> آدرس مرکز تخصصی تعمیرات
                </h3>
                <div className="space-y-4 text-sm leading-7 text-muted-foreground">
                  <p><strong className="text-foreground">مرکز اصلی:</strong> تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴ - شرکت آرمان همراه ارتباطات آریا</p>
                  <p><strong className="text-foreground">ساعات کاری:</strong> شنبه تا پنجشنبه ۱۰ تا ۲۰ - جمعه‌ها ۱۱ تا ۱۸</p>
                  <p><strong className="text-foreground">پذیرش شهرستان:</strong> ارسال با پست و تیپاکس از سراسر ایران</p>
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="p-3 rounded-xl bg-secondary text-center">
                      <div className="text-2xl font-black text-primary">+۱۲۰</div>
                      <div className="text-xs">نماینده فعال</div>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary text-center">
                      <div className="text-2xl font-black text-primary">۹۸٪</div>
                      <div className="text-xs">رضایت مشتری</div>
                    </div>
                  </div>
                  <Link to="/representatives" className="mt-4 block text-center py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
                    مشاهده نمایندگان سراسر کشور
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - AEO Heavy */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-foreground mb-4">سوالات متداول تعمیرات تخصصی</h2>
              <p className="text-muted-foreground">پاسخ به پرتکرارترین سوالات شما درباره تعمیرات موبایل، PS5، ایرپاد، ساعت و اسپیکر</p>
            </div>
            <Accordion type="single" collapsible className="w-full bg-card border rounded-2xl px-6">
              {faqItems.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
                  <AccordionTrigger className="text-right font-bold text-foreground hover:text-primary text-[15px] leading-6 py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-8 text-sm pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* SEO Keywords Cloud */}
            <div className="mt-12 p-6 rounded-2xl bg-secondary/50 border">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-primary" /> جستجوهای پرطرفدار تعمیرات
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'تعمیرات موبایل', 'تعمیر گوشی سامسونگ', 'تعمیر آیفون', 'تعمیرات شیائومی',
                  'تعمیر PS5', 'تعمیر دسته PS5', 'تعمیر پلی استیشن 5',
                  'تعمیر ایرپاد پرو', 'تعمیر ایرپاد', 'تعمیر هدفون بلوتوثی', 'تعمیر گلکسی بادز',
                  'تعمیر ساعت هوشمند', 'تعمیر اپل واچ', 'تعمیر گلکسی واچ', 'تعمیر واچ اولترا',
                  'تعمیر اسپیکر', 'تعمیر باند', 'تعمیر اسپیکر بلوتوثی', 'تعمیر ساندبار',
                  'تعمیرات پوکو', 'تعمیرات نوکیا', 'تعمیر پاوربانک انکر', 'تعمیرات تهران علاءالدین',
                  'تعمیر برد موبایل', 'تعویض ال سی دی', 'تعویض باتری', 'تعمیر آبخوردگی'
                ].map((kw, i) => (
                  <Link key={i} to="/warranty/repairs" className="px-3 py-1.5 rounded-full bg-card border text-xs font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                    {kw}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA - SXO */}
        <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container-custom text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black mb-4">دستگاهت خراب شده؟ همین الان تعمیرش کن!</h2>
            <p className="text-lg opacity-90 mb-8 leading-8">
              فرقی نمی‌کند <strong>گوشی، PS5، ایرپاد، ساعت هوشمند یا اسپیکر</strong> باشد - متخصصان آرمان همراه در کمتر از ۲۴ ساعت دستگاه شما را مثل روز اول تحویل می‌دهند. عیب‌یابی رایگان + گارانتی کتبی
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/warranty/repairs" className="px-8 py-4 bg-white text-primary rounded-xl font-black text-lg hover:bg-white/90 transition-colors shadow-xl flex items-center gap-2">
                <Wrench size={20} /> ثبت درخواست تعمیر آنلاین
              </Link>
              <a href="tel:+9821" className="px-8 py-4 bg-black/20 backdrop-blur text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-black/30 transition-colors flex items-center gap-2">
                <Phone size={20} /> مشاوره رایگان تعمیرات
              </a>
            </div>
            <div className="mt-8 flex justify-center gap-6 text-sm opacity-80">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} /> عیب‌یابی رایگان</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} /> گارانتی ۳ ماهه</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} /> قطعه اورجینال</span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

const WarrantyPage = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ElectronicsStore", "ComputerRepairShop"],
    "name": "آرمان همراه - مرکز تخصصی تعمیرات موبایل، PS5، ایرپاد، ساعت هوشمند، اسپیکر",
    "alternateName": "Arman Hamrah Repair Center",
    "url": "https://armanhamrah.com/warranty",
    "logo": "https://armanhamrah.com/logo.jpeg",
    "image": "https://armanhamrah.com/logo.jpeg",
    "description": "مرکز تخصصی تعمیرات انواع گوشی موبایل آیفون، سامسونگ، شیائومی، PS5، ایرپاد پرو، هدفون، ساعت هوشمند اپل واچ و گلکسی واچ، اسپیکر و باند با گارانتی ۱۸ ماهه و قطعات اورجینال در تهران علاءالدین",
    "telephone": "+98-21-XXXX",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴",
      "addressLocality": "تهران",
      "addressRegion": "تهران",
      "postalCode": "11369",
      "addressCountry": "IR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.6892",
      "longitude": "51.3890"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Iran"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات تعمیرات تخصصی",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تعمیرات تخصصی گوشی موبایل آیفون و سامسونگ" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تعمیرات PS5 و دسته DualSense" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تعمیر ایرپاد پرو و هدفون بلوتوثی" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تعمیر ساعت هوشمند اپل واچ و گلکسی واچ" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تعمیر اسپیکر و باند بلوتوثی" } }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2743",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "تعمیرات تخصصی موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند",
    "provider": {
      "@type": "Organization",
      "name": "آرمان همراه ارتباطات آریا",
      "url": "https://armanhamrah.com"
    },
    "areaServed": "IR",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "لیست خدمات تعمیرات",
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "تعمیرات موبایل", "itemListElement": [{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تعمیر آیفون ۱۷ پرو" } }, { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تعمیر سامسونگ S25 Ultra" } }] },
        { "@type": "OfferCatalog", "name": "تعمیر کنسول بازی", "itemListElement": [{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تعمیر PS5" } }] }
      ]
    },
    "termsOfService": "https://armanhamrah.com/warranty/conditions",
    "award": "بهترین مرکز تعمیرات موبایل و PS5 تهران"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
      { "@type": "ListItem", "position": 2, "name": "گارانتی و تعمیرات تخصصی", "item": "https://armanhamrah.com/warranty" }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "چگونه دستگاه خود را در آرمان همراه تعمیر کنیم؟",
    "description": "مراحل ثبت و تعمیر انواع گوشی، PS5، ایرپاد، ساعت هوشمند و اسپیکر",
    "totalTime": "PT24H",
    "step": repairSteps.map((s, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": s.title,
      "text": s.desc
    }))
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "تعمیرات تخصصی موبایل، PS5، ایرپاد، ساعت هوشمند، اسپیکر",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".faq-answer"]
    },
    "url": "https://armanhamrah.com/warranty"
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="تعمیرات تخصصی موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند | گارانتی ۱۸ ماهه آرمان همراه"
            description="مرکز تخصصی تعمیرات انواع گوشی آیفون، سامسونگ، شیائومی، PS5، ایرپاد پرو ۲، هدفون، اپل واچ، گلکسی واچ، اسپیکر و باند با قطعات اورجینال، عیب‌یابی رایگان و گارانتی ۳ ماهه در تهران علاءالدین ☎️"
            jsonLd={[localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema, howToSchema, speakableSchema]}
          />
          <WarrantyPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyPage;
