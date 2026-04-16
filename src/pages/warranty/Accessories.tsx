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

const WarrantyAccessoriesPageContent = () => {
  const { language, t } = useLanguage();
  
  const accessoryItems = [
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
                <span dangerouslySetInnerHTML={{ __html: t('warranty.accessories.title') }} />
              </h1>

              <div className="card-premium prose prose-invert max-w-none text-muted-foreground">
                <p dangerouslySetInnerHTML={{ __html: t('warranty.accessories.main') }} />
                <ul>
                  {accessoryItems.map(key => (
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

const WarrantyAccessoriesPage = () => {
  const { t } = useLanguage();
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title={t('warranty.accessories.title')}
            description={t('warranty.accessories.title')}
          />
          <WarrantyAccessoriesPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyAccessoriesPage;
