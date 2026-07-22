import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, FileText, Headphones, Wrench, Smartphone, 
  Gamepad2, Watch, Speaker, Battery, Zap, CheckCircle2, 
  Clock, Award, MapPin, Phone, Settings, Cpu, 
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
    description: { fa: 'مشاهده کامل شرایط و ضوابط گارانتی ۱۸ ماهه محصولات اپل، سامسونگ، شیائومی و سونی با پوشش کامل تعمیرات', en: 'Full terms for 18-month warranty coverage for Apple, Samsung, Xiaomi and Sony' },
    link: '/warranty/conditions',
    badge: { fa: 'محبوب‌ترین', en: 'Popular' }
  },
  {
    icon: Headphones,
    title: { fa: 'گارانتی لوازم جانبی و گجت‌ها', en: 'Accessory Warranty' },
    description: { fa: 'گارانتی تخصصی ایرپاد، هدفون، ساعت هوشمند، اسپیکر، باند و پاوربانک انکر و شیائومی', en: 'Specialized warranty for AirPods, headphones, smartwatches, speakers and powerbanks' },
    link: '/warranty/accessories',
    badge: { fa: '۱۸ ماهه', en: '18 Months' }
  },
  {
    icon: Wrench,
    title: { fa: 'تعمیرات تخصصی فاقد گارانتی', en: 'Out-of-Warranty Repairs' },
    description: { fa: 'تعمیرات فوق تخصصی انواع گوشی موبایل، PS5، ایرپاد، هدفون و اسپیکر حتی بدون گارانتی', en: 'Professional repair for mobiles, PS5, AirPods, headphones and speakers even out of warranty' },
    link: '/warranty/repairs',
    badge: { fa: 'فوری', en: 'Fast' }
  }
];

const WarrantyPageContent = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  
  const t = (fa: string, en: string) => isFa ? fa : en;

  const repairServices = [
    {
      icon: Smartphone,
      title: t('تعمیرات تخصصی گوشی موبایل', 'Professional Mobile Repair'),
      keywords: t('تعمیرات آیفون، سامسونگ، شیائومی، پوکو، نوکیا', 'iPhone, Samsung, Xiaomi, Poco, Nokia repairs'),
      desc: t(
        'تعمیر فوق تخصصی برد، ال‌سی‌دی، باتری و دوربین انواع گوشی آیفون ۱۷ پرو، ۱۶ پرو، سامسونگ S25 Ultra، S24 Ultra، A56، A36، شیائومی 15T، ردمی نوت ۱۴ پرو و پوکو M7 با قطعات ۱۰۰٪ اورجینال',
        'Professional board, LCD, battery and camera repair for iPhone 17 Pro, 16 Pro, Samsung S25 Ultra, S24 Ultra, A56, A36, Xiaomi 15T, Redmi Note 14 Pro and Poco M7 with 100% original parts'
      ),
      color: 'from-blue-500 to-cyan-500',
      link: '/warranty/repairs'
    },
    {
      icon: Gamepad2,
      title: t('تعمیرات تخصصی PS5 و پلی استیشن', 'PS5 & PlayStation Repairs'),
      keywords: t('تعمیر PS5 اسلیم، فت، دیجیتال، دسته DualSense', 'PS5 Slim, Fat, Digital, DualSense repair'),
      desc: t(
        'مرکز تخصصی تعمیر پلی استیشن 5: تعمیر برد PS5، پورت HDMI، درایو، دسته DualSense، رفع ارور، فن و اورهیت، نصب SSD با گارانتی ۳ ماهه',
        'Specialized PS5 repair center: board, HDMI port, drive, DualSense controller, errors, fan and overheating, SSD installation with 3-month warranty'
      ),
      color: 'from-purple-500 to-pink-500',
      link: '/warranty/repairs'
    },
    {
      icon: Headset,
      title: t('تعمیر ایرپاد و هدفون بلوتوثی', 'AirPods & Bluetooth Headphone Repair'),
      keywords: t('تعمیر ایرپاد پرو 2، ایرپاد 4، گلکسی بادز، انکر', 'AirPods Pro 2, AirPods 4, Galaxy Buds, Anker repair'),
      desc: t(
        'تعمیر تخصصی ایرپاد پرو ۲، ایرپاد ۴، ایرپاد مکس، گلکسی بادز ۳ پرو، انکر R50i، R60i NC: باتری، کیس شارژ، نویز کنسلینگ، میکروفون و بلوتوث',
        'Professional repair for AirPods Pro 2, AirPods 4, Max, Galaxy Buds 3 Pro, Anker R50i/R60i NC: battery, case, ANC, mic and Bluetooth'
      ),
      color: 'from-green-500 to-emerald-500',
      link: '/warranty/accessories'
    },
    {
      icon: Watch,
      title: t('تعمیر ساعت هوشمند', 'Smartwatch Repair'),
      keywords: t('تعمیر اپل واچ، گلکسی واچ 8، واچ اولترا', 'Apple Watch, Galaxy Watch 8, Watch Ultra repair'),
      desc: t(
        'تعمیر تخصصی اپل واچ سری ۱۱، اولترا ۳، SE، گلکسی واچ ۸، واچ ۷، واچ ۶ کلاسیک و واچ اولترا: تعویض گلس، باتری، سنسور',
        'Specialized repair for Apple Watch Series 11, Ultra 3, SE, Galaxy Watch 8, Watch 7, Watch 6 Classic and Watch Ultra: glass, battery, sensors'
      ),
      color: 'from-orange-500 to-red-500',
      link: '/warranty/accessories'
    },
    {
      icon: Speaker,
      title: t('تعمیر اسپیکر و باند', 'Speaker & Audio Repair'),
      keywords: t('تعمیر اسپیکر بلوتوثی، باند، ساندبار', 'Bluetooth speaker, PartyBox, Soundbar repair'),
      desc: t(
        'تعمیر انواع اسپیکر بلوتوثی، باند اکتیو و پسیو، هارمن کاردن، سونی، JBL، پارتی باکس: برد آمپلی‌فایر، درایور، باتری، پورت شارژ',
        'Repair for Bluetooth speakers, active/passive bands, Harman Kardon, Sony, JBL, PartyBox: amplifier board, driver, battery, charging port'
      ),
      color: 'from-yellow-500 to-orange-500',
      link: '/warranty/accessories'
    },
    {
      icon: Battery,
      title: t('تعمیر پاوربانک و لوازم جانبی', 'PowerBank & Accessories Repair'),
      keywords: t('تعمیر پاوربانک شیائومی، انکر', 'Xiaomi, Anker powerbank repair'),
      desc: t(
        'تعمیر تخصصی پاوربانک شیائومی 20000، انکر 10000 و 20000 میلی‌آمپری با تست ظرفیت واقعی و تعویض سلول اورجینال',
        'Professional repair for Xiaomi 20000mAh, Anker 10000/20000mAh powerbanks with real capacity test and original cell replacement'
      ),
      color: 'from-indigo-500 to-blue-500',
      link: '/warranty/accessories'
    }
  ];

  const repairSteps = [
    { step: '01', title: t('ثبت درخواست آنلاین / حضوری', 'Online / In-Person Request'), desc: t('از طریق سایت، تماس یا مراجعه حضوری', 'Via website, phone or in-person visit') },
    { step: '02', title: t('عیب‌یابی رایگان و اعلام هزینه', 'Free Diagnosis & Quote'), desc: t('بررسی تخصصی و اعلام شفاف هزینه', 'Professional check and transparent pricing') },
    { step: '03', title: t('تعمیر تخصصی با قطعه اورجینال', 'Pro Repair with Original Parts'), desc: t('توسط تکنسین مجرب با قطعات اصلی', 'By certified technicians with original parts') },
    { step: '04', title: t('تست نهایی و تحویل با گارانتی', 'Final Test & Warranty Delivery'), desc: t('تست کامل + فاکتور رسمی و ۳ ماه گارانتی', 'Full test + invoice and 3-month warranty') }
  ];

  const faqItems = isFa ? [
    {
      q: 'بهترین مرکز تعمیرات تخصصی گوشی موبایل، PS5 و ایرپاد در تهران کجاست؟',
      a: 'مرکز تخصصی تعمیرات آرمان همراه در تهران، با بیش از ۱۰ سال سابقه، مجهزترین مرکز تعمیرات انواع گوشی آیفون، سامسونگ، شیائومی، PS5، ایرپاد پرو، هدفون، اپل واچ، گلکسی واچ، اسپیکر و باند است. بیش از ۵۰۰ هزار دستگاه موفق تعمیر شده.'
    },
    {
      q: 'هزینه تعمیرات گوشی آیفون، سامسونگ و شیائومی چقدر است؟',
      a: 'هزینه بستگی به مدل و نوع خرابی دارد. عیب‌یابی کاملا رایگان است و قبل از هر اقدامی، هزینه نهایی به صورت شفاف اعلام می‌شود.'
    },
    {
      q: 'آیا تعمیرات PS5 شامل تعمیر برد، HDMI و دسته هم می‌شود؟',
      a: 'بله، ما تخصصی‌ترین مرکز تعمیر PS5 در ایران هستیم. تعمیر برد، HDMI، درایو، فن، دسته DualSense و نصب SSD با ۳ ماه گارانتی.'
    },
    {
      q: 'تعمیر ایرپاد پرو و هدفون بلوتوثی امکان‌پذیر است؟',
      a: 'بله، بسیاری از ایرپادها و هدفون‌ها قابل تعمیر هستند: باتری، کیس، میکروفون، ANC، بلوتوث.'
    },
    {
      q: 'تعمیر ساعت هوشمند چقدر زمان می‌برد؟',
      a: 'بین ۲ تا ۷۲ ساعت کاری. تعویض گلس همان روز، باتری ۲۴ ساعته و برد ۲-۳ روز.'
    },
    {
      q: 'آیا اسپیکر و باند بلوتوثی هم تعمیر می‌کنید؟',
      a: 'بله، انواع اسپیکر بلوتوثی، باند خانگی، پارتی باکس و ساندبار با قطعات اصلی تعمیر می‌شود.'
    }
  ] : [
    {
      q: 'Where is the best repair center for mobile, PS5 and AirPods in Tehran?',
      a: 'Arman Hamrah specialized repair center in Tehran, with 10+ years experience, is the most equipped center for iPhone, Samsung, Xiaomi, PS5, AirPods Pro, headphones, Apple Watch, Galaxy Watch, speakers. 500k+ successful repairs.'
    },
    {
      q: 'How much does iPhone, Samsung and Xiaomi repair cost?',
      a: 'Cost depends on model and damage type. Diagnosis is free and final cost is announced transparently before repair.'
    },
    {
      q: 'Does PS5 repair include board, HDMI and controller?',
      a: 'Yes, we are the most specialized PS5 center in Iran. Board, HDMI, drive, fan, DualSense controller and SSD with 3-month warranty.'
    },
    {
      q: 'Is AirPods Pro and Bluetooth headphone repair possible?',
      a: 'Yes, many AirPods and headphones are repairable: battery, case, mic, ANC, Bluetooth.'
    },
    {
      q: 'How long does smartwatch repair take?',
      a: '2 to 72 working hours. Glass same day, battery 24h, board 2-3 days.'
    },
    {
      q: 'Do you also repair Bluetooth speakers and PartyBoxes?',
      a: 'Yes, all Bluetooth speakers, home bands, PartyBoxes and Soundbars are repaired with original parts.'
    }
  ];

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4">
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">{t('خانه', 'Home')}</Link>
            <span>/</span>
            <span className="text-foreground font-medium font-titr">{t('گارانتی و تعمیرات تخصصی', 'Warranty & Professional Repairs')}</span>
          </nav>
        </div>

        {/* Services */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 font-titr">
                <Sparkles size={14} /> {t('خدمات گارانتی و تعمیرات', 'Warranty & Repair Services')}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4 warranty-title">
                {t('هوشمندترین گارانتی و مرکز تعمیرات تخصصی در ایران', 'The Smartest Warranty & Repair Center in Iran')}
              </h1>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-7 warranty-text">
                {t(
                  'از سال ۱۳۹۴ تا کنون، شرکت گارانتی آرمان همراه با پوشش ۱۸ ماهه و خدمات پس از فروش حرفه‌ای، همراه مطمئن شما برای تعمیرات گوشی، PS5، ایرپاد، ساعت و اسپیکر بوده است.',
                  'Since 2015, Arman Hamrah Warranty Company with 18-month coverage and professional after-sales service has been your trusted partner for mobile, PS5, AirPods, watch and speaker repairs.'
                )}
              </p>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-6" />
            </motion.div>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {warrantySections.map((section, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="h-full group">
                  <Link to={section.link} className="card-premium h-full flex flex-col text-center p-8 rounded-2xl relative overflow-hidden border hover:border-primary/30 hover:shadow-xl transition-all hover:-translate-y-2 block">
                    {section.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold font-titr">
                        {section.badge[language as 'fa' | 'en']}
                      </span>
                    )}
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <section.icon size={32} className="text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 warranty-title">
                      {section.title[language as 'fa' | 'en']}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-grow leading-6 warranty-text">
                      {section.description[language as 'fa' | 'en']}
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center gap-2 font-bold text-primary font-titr">
                        {t('مشاهده جزئیات', 'View Details')} <ArrowRight className={`h-4 w-4 ${isFa ? '' : 'rotate-180'}`} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Repair Services */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 warranty-title">
                {t('خدمات فوق تخصصی تعمیرات آرمان همراه', 'Arman Hamrah Professional Repair Services')}
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto warranty-text">
                {t(
                  'مرکز تخصصی تعمیرات موبایل در تهران، تعمیر PS5، تعمیر ایرپاد و هدفون، تعمیر ساعت هوشمند و تعمیر اسپیکر و باند',
                  'Specialized repair center for mobiles in Tehran, PS5, AirPods & headphones, smartwatches, speakers and PartyBoxes'
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repairServices.map((service, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border rounded-2xl p-6 hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <service.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 warranty-title">{service.title}</h3>
                  <div className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block mb-3 font-titr">{service.keywords}</div>
                  <p className="text-sm text-muted-foreground leading-6 mb-4 warranty-text">{service.desc}</p>
                  <Link to={service.link} className="text-sm font-bold text-primary inline-flex items-center gap-1 font-titr">
                    {t('درخواست تعمیر', 'Request Repair')} <ArrowRight size={14} className={isFa ? '' : 'rotate-180'} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <RepairCategoryGrid />

        {/* Brands */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 warranty-title">
                  {t('تعمیرات موبایل همه برندها و مدل‌ها', 'Mobile Repair for All Brands & Models')}
                  <span className="block text-lg font-medium text-primary mt-2 font-titr">{t('آیفون، سامسونگ، شیائومی، پوکو، نوکیا، انکر', 'Apple, Samsung, Xiaomi, Poco, Nokia, Anker')}</span>
                </h2>
                <div className="prose max-w-none text-muted-foreground leading-8 text-sm warranty-text">
                  <p>{t('آیا به دنبال تعمیرات تخصصی گوشی موبایل هستید؟ آرمان همراه به عنوان نمایندگی رسمی و مرکز تخصصی تعمیرات، تمامی مدل‌های روز را پوشش می‌دهد:', 'Looking for professional mobile repair? As an official representative and specialized center, Arman Hamrah covers all latest models:')}</p>
                  <ul className="grid grid-cols-1 gap-2 mt-4 list-none p-0">
                    <li className="flex gap-2"><CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>{t('تعمیرات آیفون:', 'iPhone:')}</strong> {t('آیفون ۱۷ پرو، ۱۶ پرو، ۱۵، ۱۴، SE، تعویض ال‌سی‌دی اورجینال، باتری، برد، دوربین و فیس آیدی', 'iPhone 17 Pro, 16 Pro, 15, 14, SE, original LCD, battery, board, camera and Face ID')}</span></li>
                    <li className="flex gap-2"><CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>{t('تعمیرات سامسونگ:', 'Samsung:')}</strong> {t('گلکسی S25 Ultra، S24 Ultra، S25 FE، A56، A36، زد فولد و فلیپ، تعمیر قلم S Pen', 'Galaxy S25 Ultra, S24 Ultra, S25 FE, A56, A36, Z Fold and Flip, S Pen repair')}</span></li>
                    <li className="flex gap-2"><CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" /> <span><strong>{t('تعمیرات شیائومی و پوکو:', 'Xiaomi & Poco:')}</strong> {t('شیائومی 15T، ردمی نوت ۱۴ پرو، پوکو M7، C85 با ابزار تخصصی', 'Xiaomi 15T, Redmi Note 14 Pro, Poco M7, C85 with specialized tools')}</span></li>
                  </ul>
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 warranty-title">
                  {t('مرکز تخصصی تعمیرات PS5 و کنسول بازی', 'Specialized PS5 & Gaming Console Repair Center')}
                  <span className="block text-lg font-medium text-primary mt-2 font-titr">PS5 Fat, Slim, Digital, DualSense</span>
                </h2>
                <div className="bg-card border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <Gamepad2 size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground warranty-title">{t('تعمیر PS5 درصد موفقیت ۹۸٪', 'PS5 Repair 98% Success Rate')}</div>
                      <div className="text-xs text-muted-foreground warranty-text">{t('سریع‌ترین تعمیر PS5 در تهران', 'Fastest PS5 repair in Tehran')}</div>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground warranty-text">
                    {[
                      t('تعمیر برد اصلی PS5 و مشکل روشن نشدن', 'Main board repair and no power issue'),
                      t('تعویض پورت HDMI PS5 (تصویر ندادن)', 'HDMI port replacement (no image)'),
                      t('تعمیر درایو بلوری و نخواندن دیسک', 'Blu-ray drive and disc reading repair'),
                      t('تعمیر فن و اورهیت و صدای زیاد', 'Fan, overheating and noise repair'),
                      t('تعمیر دسته DualSense - دریفت آنالوگ', 'DualSense controller - analog drift'),
                    ].map((txt, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Zap size={14} className="text-purple-500" /> {txt}
                      </li>
                    ))}
                  </ul>
                  <Link to="/warranty/repairs" className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors warranty-title">
                    <Gamepad2 size={16} /> {t('درخواست تعمیر PS5', 'Request PS5 Repair')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-foreground mb-3 warranty-title">{t('مراحل تعمیر دستگاه در آرمان همراه', 'Repair Steps at Arman Hamrah')}</h2>
                <p className="text-muted-foreground warranty-text">{t('۴ مرحله ساده تا تحویل دستگاه سالم با گارانتی کتبی', '4 simple steps to receive your device healthy with written warranty')}</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {repairSteps.map((s, i) => (
                  <div key={i} className="relative">
                    <div className="bg-card border rounded-2xl p-6 h-full">
                      <div className="text-4xl font-black text-primary/20 mb-3 warranty-title">{s.step}</div>
                      <h3 className="font-bold text-foreground mb-2 warranty-title">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-6 warranty-text">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom max-w-4xl mx-auto">
            <div>
              <h2 className="text-3xl font-black text-foreground mb-6 warranty-title text-center">{t('چرا تعمیرات آرمان همراه انتخاب اول ایران است؟', 'Why is Arman Hamrah the first choice in Iran?')}</h2>
              <div className="space-y-5">
                {[
                  { title: t('۱۰ سال تجربه تخصصی و ۵۰۰ هزار تعمیر موفق', '10 years experience & 500k successful repairs'), desc: t('از سال ۱۳۹۴، اعتماد دیجی کالا و تکنولایف', 'Since 2015, trusted by Digikala and Technoblog'), icon: Star },
                  { title: t('قطعات ۱۰۰٪ اورجینال با گارانتی کتبی', '100% Original Parts with Written Warranty'), desc: t('مستقیم از اپل، سامسونگ، شیائومی', 'Direct from Apple, Samsung, Xiaomi'), icon: Shield },
                  { title: t('مجهزترین لابراتوار تعمیرات', 'Most Equipped Repair Lab'), desc: t('میکروسکوپ، هیتر دقیق، پروگرامر برد', 'Microscope, precise heater, board programmer'), icon: Cpu },
                  { title: t('تکنسین‌های آموزش دیده', 'Certified Technicians'), desc: t('دوره دیده در دبی و استانبول', 'Trained in Dubai and Istanbul'), icon: Settings },
                  { title: t('عیب‌یابی رایگان', 'Free Diagnosis'), desc: t('بدون هزینه اضافی پنهان', 'No hidden extra costs'), icon: CheckCircle2 },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground warranty-title">{item.title}</div>
                      <div className="text-sm text-muted-foreground mt-1 leading-6 warranty-text">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-foreground mb-4 warranty-title">{t('سوالات متداول تعمیرات تخصصی', 'Frequently Asked Questions')}</h2>
              <p className="text-muted-foreground warranty-text">{t('پاسخ به پرتکرارترین سوالات شما درباره تعمیرات موبایل، PS5، ایرپاد، ساعت و اسپیکر', 'Answers to your most frequent questions about mobile, PS5, AirPods, watch and speaker repairs')}</p>
            </div>
            <Accordion type="single" collapsible className="w-full bg-card border rounded-2xl px-6">
              {faqItems.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
                  <AccordionTrigger className="text-right font-bold text-foreground hover:text-primary text-[15px] leading-6 py-5 warranty-title">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-8 text-sm pb-6 warranty-text">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-gradient-to-br from-zinc-900 to-black text-white">
          <div className="container-custom text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white warranty-title">{t('دستگاهت خراب شده؟ همین الان تعمیرش کن!', 'Device broken? Fix it now!')}</h2>
            <p className="text-lg text-white mb-8 leading-8 warranty-text">
              {t(
                'فرقی نمی‌کند گوشی، PS5، ایرپاد، ساعت هوشمند یا اسپیکر باشد - متخصصان آرمان همراه در کمتر از ۲۴ ساعت دستگاه شما را مثل روز اول تحویل می‌دهند.',
                'No matter if it is mobile, PS5, AirPods, smartwatch or speaker - Arman Hamrah experts deliver your device like first day in less than 24 hours.'
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+9821" className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-white/90 transition-colors shadow-xl flex items-center gap-2 font-titr">
                <Phone size={20} /> {t('مشاوره رایگان تعمیرات', 'Free Repair Consultation')}
              </a>
            </div>
            <div className="mt-8 flex justify-center gap-6 text-sm text-white warranty-text">
              <span className="flex items-center gap-1.5 text-white"><CheckCircle2 size={16} className="text-white" /> {t('عیب‌یابی رایگان', 'Free Diagnosis')}</span>
              <span className="flex items-center gap-1.5 text-white"><CheckCircle2 size={16} className="text-white" /> {t('گارانتی ۳ ماهه', '3-Month Warranty')}</span>
              <span className="flex items-center gap-1.5 text-white"><CheckCircle2 size={16} className="text-white" /> {t('قطعه اورجینال', 'Original Part')}</span>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        {isFa && (
          <section className="py-12 bg-background border-t border-border">
            <div className="container-custom max-w-4xl text-right">
              <h2 className="text-2xl font-bold text-foreground mb-4 warranty-title">قطب تخصصی تعمیرات ایرپاد، تعمیرات ps5 و تعمیرات گوشی همراه</h2>
              <p className="text-muted-foreground leading-8 text-sm warranty-text text-justify mb-4">
                یافتن مجموعه‌ای مطمئن برای حل مشکلات سخت‌افزاری و نرم‌افزاری دستگاه‌های هوشمند همواره یک دغدغه اساسی است. مجموعه آرمان همراه با در اختیار داشتن تکنسین‌های مجرب، به‌عنوان مرجع حرفه‌ای <strong>تعمیرات ایرپاد</strong> در مدل‌های مختلف شناخته می‌شود؛ از برطرف کردن نویز و ضعف باتری تا احیای کامل میکروفون و کیس شارژ. رویکرد ما در برخورد با گجت‌های پوشیدنی، حفظ ظرافت و استفاده از قطعات اصیل است.
              </p>
              <p className="text-muted-foreground leading-8 text-sm warranty-text text-justify mb-4">
                در بخش کنسول‌های بازی، <strong>تعمیرات ps5</strong> با حساسیت بسیار بالایی انجام می‌پذیرد. فرقی نمی‌کند کنسول شما دچار افت فریم، خرابی پورت تصویر (HDMI) یا نقص در دکمه‌های دسته دوال‌سنس شده باشد؛ کارشناسان ما با بهره‌گیری از تجهیزات پیشرفته، دستگاه شما را در کمترین زمان ممکن عیب‌یابی کرده و با تضمین کیفیت به شما تحویل می‌دهند.
              </p>
              <p className="text-muted-foreground leading-8 text-sm warranty-text text-justify">
                همچنین، در دپارتمان <strong>تعمیرات گوشی همراه</strong>، کلیه خدمات از قبیل رفع ایرادات مدار شارژ، ترمیم هارد، تعویض ال‌سی‌دی و باتری تلفن‌های هوشمند (اعم از آیفون، سامسونگ و شیائومی) به شکل اصولی و استاندارد صورت می‌گیرد. هدف ما در آرمان همراه این است که با ارائه خدماتی شفاف، مقرون‌به‌صرفه و گارانتی‌دار، تجربه‌ای آسوده‌خاطر را برای مراجعه‌کنندگان رقم بزنیم.
              </p>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
};

const WarrantyPage = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ElectronicsStore", "ComputerRepairShop"],
    "name": "آرمان همراه - مرکز تخصصی تعمیرات ایرپاد، PS5 و گوشی همراه",
    "url": "https://armanhamrah.com/warranty",
    "logo": "https://armanhamrah.com/logo.jpeg",
    "description": "ارائه خدمات فوق تخصصی تعمیرات ایرپاد، تعمیرات ps5 و تعمیرات گوشی همراه با گارانتی ۱۸ ماهه.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴",
      "addressLocality": "تهران",
      "addressCountry": "IR"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "تعمیرات ایرپاد",
          "description": "تعمیرات تخصصی ایرپاد شامل باتری، میکروفون، اسپیکر و کیس شارژ"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "تعمیرات ps5",
          "description": "تعمیرات فوق تخصصی پلی استیشن 5 شامل برد، پورت HDMI، درایو و دسته"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "تعمیرات گوشی همراه",
          "description": "تعمیرات تخصصی گوشی همراه سامسونگ، اپل و شیائومی با قطعات اورجینال"
        }
      }
    ]
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="تعمیرات ایرپاد، تعمیرات ps5 و تعمیرات گوشی همراه | آرمان همراه"
            description="مرکز فوق تخصصی تعمیرات گوشی همراه آیفون و سامسونگ، نمایندگی تعمیرات PS5، و تعمیرات تخصصی ایرپاد با قطعات اورجینال، عیب‌یابی رایگان و گارانتی در تهران."
            jsonLd={[localBusinessSchema]}
          />
          <WarrantyPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyPage;
