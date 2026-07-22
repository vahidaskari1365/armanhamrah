import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Headphones, Watch, Speaker, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const WarrantyAccessoriesPageContent = () => {
  const { language, t } = useLanguage();
  const isFa = language === 'fa';

  const accessoryKeys = [
    'warranty.accessories.item1',
    'warranty.accessories.item2',
    'warranty.accessories.item3',
    'warranty.accessories.item4',
    'warranty.accessories.item5',
    'warranty.accessories.item6',
    'warranty.accessories.item7',
    'warranty.accessories.item8',
    'warranty.accessories.item9',
  ];

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
          <span>/</span>
          <Link to="/warranty" className="hover:text-primary">{isFa ? 'گارانتی و تعمیرات تخصصی' : 'Warranty & Repairs'}</Link>
          <span>/</span>
          <span className="text-foreground font-bold warranty-title">{isFa ? 'گارانتی لوازم جانبی' : 'Accessory Warranty'}</span>
        </div>

        <section className="bg-gradient-to-br from-primary/10 to-background py-12 border-b">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/warranty" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 font-titr">
                <ChevronLeft size={20} /> {t('warranty.backLink')}
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 font-titr">
                <Shield size={14} /> {isFa ? 'گارانتی ۱۸ ماهه لوازم جانبی و گجت‌ها' : '18-Month Accessory & Gadget Warranty'}
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 warranty-title">
                {t('warranty.accessories.title')}
                <span className="block text-lg md:text-xl font-medium text-muted-foreground mt-3 warranty-text">
                  {isFa ? 'ساعت هوشمند، اسپیکر، باند، هدفون، ایرپاد، هدست، پاوربانک انکر و شیائومی' : 'Smartwatch, Speaker, Headphone, AirPods, PowerBank Anker & Xiaomi'}
                </span>
              </h1>
              <p className="text-muted-foreground leading-8 max-w-4xl warranty-text" dangerouslySetInnerHTML={{ __html: t('warranty.accessories.main') }} />
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: Watch, title: isFa ? 'ساعت هوشمند' : 'Smartwatch', desc: isFa ? 'اپل واچ، گلکسی واچ، واچ اولترا - گارانتی ۱۸ ماهه' : 'Apple Watch, Galaxy Watch, Watch Ultra - 18 month warranty', color: 'from-blue-500 to-cyan-500' },
                { icon: Speaker, title: isFa ? 'اسپیکر و باند' : 'Speaker & Audio', desc: isFa ? 'اسپیکر بلوتوثی، باند خانگی، ساندبار - ۱۸ ماهه' : 'Bluetooth speaker, home audio, soundbar - 18 months', color: 'from-orange-500 to-red-500' },
                { icon: Headphones, title: isFa ? 'هدفون و ایرپاد' : 'Headphone & AirPods', desc: isFa ? 'ایرپاد پرو، گلکسی بادز، انکر - ۱۸ ماهه' : 'AirPods Pro, Galaxy Buds, Anker - 18 months', color: 'from-green-500 to-emerald-500' },
              ].map((c, i) => (
                <div key={i} className="bg-card border rounded-xl p-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}>
                    <c.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-foreground warranty-title">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-6 warranty-text">{c.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-2 warranty-title">
              <Shield className="text-primary" /> {isFa ? '۹ بند کلیدی گارانتی لوازم جانبی' : '9 Key Points of Accessory Warranty'}
            </h2>

            <div className="space-y-4">
              {accessoryKeys.map((key, i) => (
                <motion.div key={key} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border rounded-xl p-6">
                  <h3 className="font-bold text-foreground mb-3 flex gap-2 warranty-title">
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black flex-shrink-0 font-titr">{i + 1}</span>
                    <span className="warranty-title">{isFa ? `بند ${i+1}` : `Clause ${i+1}`}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-8 pr-9 warranty-text" dangerouslySetInnerHTML={{ __html: t(key) }} />
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black text-white border border-white/10">
              <h3 className="font-black text-lg mb-2 text-white warranty-title">{isFa ? 'برای تعمیرات فاقد گارانتی لوازم جانبی چه کنیم؟' : 'What to do for out-of-warranty accessories?'}</h3>
              <p className="text-sm leading-8 text-white warranty-text">
                {isFa ? (
                  <>اگر اسپیکر، ایرپاد، ساعت یا هدفون شما آبخورده یا ضربه‌خورده و گارانتی آن باطل شده، نگران نباشید. ما در بخش <Link to="/warranty/repairs" className="underline font-bold text-white">تعمیرات فاقد گارانتی</Link> تمامی این دستگاه‌ها را با هزینه مصوب و گارانتی ۳ ماهه قطعه تعمیر می‌کنیم. کافیست به آدرس: تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد 304 مراجعه یا دستگاه را با پست ارسال کنید.</>
                ) : (
                  <>If your speaker, AirPods, watch or headphones are water or impact damaged and warranty is void, don&apos;t worry. We in <Link to="/warranty/repairs" className="underline font-bold text-white">out-of-warranty repairs</Link> section repair all with approved cost and 3-month warranty. Visit: Tehran, Motahari St., Amir Atabak Bldg, 3rd Fl, Unit 204 or send by post.</>
                )}
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
      { "@type": "ListItem", "position": 3, "name": "گارانتی لوازم جانبی", "item": "https://armanhamrah.com/warranty/accessories" }
    ]
  };
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="گارانتی لوازم جانبی ۱۸ ماهه | ساعت هوشمند، اسپیکر، باند، هدفون، ایرپاد | آرمان همراه"
            description="شرایط کامل گارانتی ۱۸ ماهه ساعت هوشمند اپل واچ و گلکسی واچ، اسپیکر و باند بلوتوثی، هدفون، ایرپاد پرو ۲ با تعمیرات تخصصی"
            jsonLd={[breadcrumb]}
          />
          <WarrantyAccessoriesPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyAccessoriesPage;
