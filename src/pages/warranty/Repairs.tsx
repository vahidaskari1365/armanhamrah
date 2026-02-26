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

const WarrantyRepairsPageContent = () => {
  const { language, t } = useLanguage();
  
  const repairItems = [
    'warranty.repairs.item1',
    'warranty.repairs.item2',
    'warranty.repairs.item3',
  ];

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` }} dir={language === 'fa' ? 'rtl' : 'ltr'}>
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
                <span dangerouslySetInnerHTML={{ __html: t('warranty.repairs.title') }} />
              </h1>

              <div className="card-premium prose prose-invert max-w-none text-muted-foreground">
                <ol>
                  {repairItems.map(key => (
                    <li key={key}>
                      <span dangerouslySetInnerHTML={{ __html: t(key) }} />
                    </li>
                  ))}
                </ol>
                <p dangerouslySetInnerHTML={{ __html: t('warranty.repairs.note') }} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const WarrantyRepairsPage = () => {
  const { t } = useLanguage();
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title={t('warranty.repairs.title')}
            description={t('warranty.repairs.title')}
          />
          <WarrantyRepairsPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyRepairsPage;
