import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const WarrantyConditionsPageContent = () => {
  const { language, t } = useLanguage();
  const isFa = language === 'fa';

  const conditionKeys = [
    'warranty.conditions.item1',
    'warranty.conditions.item2',
    'warranty.conditions.item3',
    'warranty.conditions.item4',
    'warranty.conditions.item5',
    'warranty.conditions.item6',
    'warranty.conditions.item7',
    'warranty.conditions.item8',
    'warranty.conditions.item9',
    'warranty.conditions.item10',
    'warranty.conditions.item11',
  ];

  const exceptionKeys = [
    'warranty.exceptions.item1',
    'warranty.exceptions.item2',
    'warranty.exceptions.item3',
    'warranty.exceptions.item4',
    'warranty.exceptions.item5',
    'warranty.exceptions.item6',
    'warranty.exceptions.item7',
    'warranty.exceptions.item8',
    'warranty.exceptions.item9',
    'warranty.exceptions.item10',
    'warranty.exceptions.item11',
    'warranty.exceptions.item12',
  ];

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
          <span>/</span>
          <Link to="/warranty" className="hover:text-primary">{isFa ? 'گارانتی و تعمیرات' : 'Warranty & Repairs'}</Link>
          <span>/</span>
          <span className="text-foreground font-bold warranty-title">{t('warranty.conditions.title')}</span>
        </div>

        <section className="bg-gradient-to-br from-primary/10 to-background py-12 border-b">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/warranty" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 font-titr">
                <ChevronLeft size={20} /> {t('warranty.backLink')}
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 font-titr">
                <Shield size={14} /> {isFa ? 'پوشش ۱۸ ماهه + ۳ سال تامین قطعه' : '18 Months Coverage + 3 Years Parts Supply'}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4 warranty-title">
                {t('warranty.conditions.title')}
                <span className="block text-lg md:text-xl font-medium text-muted-foreground mt-3 warranty-text">{isFa ? 'ویژه گوشی موبایل، تبلت، ساعت هوشمند، هدفون، اسپیکر و PS5' : 'For mobile, tablet, smartwatch, headphone, speaker and PS5'}</span>
              </h1>
              <p className="text-muted-foreground leading-8 max-w-4xl warranty-text">
                {isFa
                  ? 'تمامی قوانین گارانتی ۱۸ ماهه آرمان همراه برای تعمیرات موبایل آیفون، سامسونگ، شیائومی، تعمیر PS5، ایرپاد، هدفون، ساعت هوشمند و اسپیکر. مطالعه این شرایط قبل از مراجعه به مرکز خدمات الزامی است.'
                  : 'All 18-month warranty terms of Arman Hamrah for iPhone, Samsung, Xiaomi mobile repairs, PS5, AirPods, headphones, smartwatch and speaker. Please read before visiting service center.'}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <FileText className="text-primary" />
              <h2 className="text-2xl font-black text-foreground warranty-title">{isFa ? '۱۱ بند اصلی شرایط گارانتی ۱۸ ماهه' : '11 Main Clauses of 18-Month Warranty'}</h2>
            </div>
            <div className="space-y-4">
              {conditionKeys.map((key, i) => (
                <motion.div key={key} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border rounded-xl p-5 md:p-6">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black flex-shrink-0 text-sm font-titr">{i + 1}</div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground leading-8 warranty-text" dangerouslySetInnerHTML={{ __html: t(key) }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="text-amber-500" />
                <h2 className="text-2xl font-black text-foreground warranty-title">{t('warranty.exceptions.title')}</h2>
              </div>
              <div className="grid gap-4">
                {exceptionKeys.map((key, i) => (
                  <div key={key} className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-xl p-5">
                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 warranty-title">
                      <CheckCircle2 size={18} className="text-green-600" /> {isFa ? `مورد ${i+1}` : `Case ${i+1}`}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-8 warranty-text" dangerouslySetInnerHTML={{ __html: t(key) }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const WarrantyConditionsPage = () => {
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
          <SEO title="شرایط گارانتی ۱۸ ماهه آرمان همراه | تعمیرات موبایل، PS5، ایرپاد، ساعت هوشمند و اسپیکر" description="شرایط کامل گارانتی ۱۸ ماهه آرمان همراه برای گوشی موبایل، تبلت، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر" jsonLd={[breadcrumb]} />
          <WarrantyConditionsPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyConditionsPage;
