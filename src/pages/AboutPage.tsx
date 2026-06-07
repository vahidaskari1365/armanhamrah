
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import pageBg from '@/assets/page-bg.jpeg';

const AboutPage = () => {
  const { t, language } = useLanguage();

  return (
    <HelmetProvider>
    <SEO
      title={t('about.seo.title', language === 'fa' ? 'درباره ما | آرمان همراه' : 'About Us | Arman Hamrah')}
      description={t('about.seo.description', language === 'fa'
        ? 'درباره شرکت آرمان همراه ارتباطات آریا، سابقه، ماموریت و خدمات گارانتی و پس از فروش.'
        : 'About Arman Hamrah Aria Communications: history, mission, and warranty & after-sales services.')}
    />
    <div 
      dir={language === 'fa' ? 'rtl' : 'ltr'}
      className="page-background flex flex-col min-h-screen"
      style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties}
    >
      <Navbar />
      <main className="flex-grow flex justify-center items-center container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-card/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-xl border border-border/30 max-w-4xl w-full my-48"
        >
          <h1 className="text-4xl font-bold text-center mb-6 text-foreground">{t('about.title')}</h1>
          <div className="space-y-4 text-center text-foreground text-lg">
            <p>
              {t('about.p1')}
            </p>
            <p>
              {t('about.p2')}
            </p>
            <p>
              {t('about.p3')}
            </p>
            <p>
              {t('about.p4')}
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
    </HelmetProvider>
  );
};

export default AboutPage;
