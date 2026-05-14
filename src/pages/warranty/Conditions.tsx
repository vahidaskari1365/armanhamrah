import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const WarrantyConditionsPageContent = () => {
  const { language, t } = useLanguage();
  
  const warrantyConditions = [
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

  const exceptions = [
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
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/warranty" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
                <ChevronLeft size={20} />
                <span dangerouslySetInnerHTML={{ __html: t('warranty.backLink') }} />
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
                <span dangerouslySetInnerHTML={{ __html: t('warranty.conditions.title') }} />
              </h1>

              <div className="card-premium prose prose-invert max-w-none text-muted-foreground">
                <ol>
                  {warrantyConditions.map(key => (
                    <li key={key}>
                      <span dangerouslySetInnerHTML={{ __html: t(key) }} />
                    </li>
                  ))}
                </ol>
                <h2 className="!mt-16">
                   <span dangerouslySetInnerHTML={{ __html: t('warranty.exceptions.title') }} />
                </h2>
                <ul>
                  {exceptions.map(key => (
                    <li key={key}>
                      <span dangerouslySetInnerHTML={{ __html: t(key) }} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const WarrantyConditionsPage = () => {
  const { t } = useLanguage();
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title={t('warranty.conditions.title')}
            description={t('warranty.conditions.title')}
          />
          <WarrantyConditionsPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyConditionsPage;
