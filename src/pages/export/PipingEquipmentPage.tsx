import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const PipingEquipmentPage = () => {
  const { t, direction } = useLanguage();

  return (
    <HelmetProvider>
      <SEO 
        title={t('export.products.piping-equipment.name')}
        description={t('export.products.piping-equipment.description')}
      />
      <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={direction}>
        <Navbar />
        <main className="pt-24">
          <div className="container-custom py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/export" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft size={20} />
                {t('general.back_to_export')}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('export.products.piping-equipment.name')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t('export.products.piping-equipment.description')}
              </p>

              <div className="mt-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">{t('general.product_details')}</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>{t('general.description')}:</strong> {t('export.products.piping-equipment.details.description')}</li>
                  <li><strong>{t('general.material')}:</strong> {t('export.products.piping-equipment.details.material')}</li>
                  <li><strong>{t('general.size')}:</strong> {t('export.products.piping-equipment.details.size')}</li>
                  <li><strong>{t('general.length')}:</strong> {t('export.products.piping-equipment.details.length')}</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default PipingEquipmentPage;
