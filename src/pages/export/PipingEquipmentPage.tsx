import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, List, Star, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const PipingEquipmentPageContent = () => {
  const { t, direction } = useLanguage();

  const products = [
    { nameKey: 'piping.product1.name', descKey: 'piping.product1.desc' },
    { nameKey: 'piping.product2.name', descKey: 'piping.product2.desc' },
    { nameKey: 'piping.product3.name', descKey: 'piping.product3.desc' },
    { nameKey: 'piping.product4.name', descKey: 'piping.product4.desc' },
  ];

  const features = [
    { icon: Star, titleKey: 'piping.feature1.title', descKey: 'piping.feature1.desc' },
    { icon: CheckCircle, titleKey: 'piping.feature2.title', descKey: 'piping.feature2.desc' },
    { icon: List, titleKey: 'piping.feature3.title', descKey: 'piping.feature3.desc' },
  ];

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={direction}>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/export" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                <ArrowRight size={20} />
                {t('export.back')}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t('piping.title')}</h1>
              <p className="text-xl text-primary font-medium mb-4">{t('piping.subtitle')}</p>
              <p className="text-lg text-muted-foreground max-w-2xl">{t('piping.description')}</p>
            </motion.div>
          </div>
        </section>
        
        {/* Image */}
        <section className="section-padding">
            <div className="container-custom">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <img src="/images/products/export-2.jpg" alt={t('piping.title')} className="rounded-2xl shadow-xl w-full max-w-4xl mx-auto" loading="lazy" decoding="async" />
                </motion.div>
            </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-gradient-premium">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">{t('piping.productsTitle')}</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="card-premium">
                            <h3 className="text-xl font-bold text-foreground mb-2">{t(product.nameKey)}</h3>
                            <p className="text-muted-foreground">{t(product.descKey)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Features */}
        <section className="section-padding">
            <div className="container-custom">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">{t('piping.featuresTitle')}</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }} className="card-premium text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                <feature.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">{t(feature.titleKey)}</h3>
                            <p className="text-muted-foreground text-sm">{t(feature.descKey)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const PipingEquipmentPage = () => {
  const { t } = useLanguage();
  
  return (
    <HelmetProvider>
      <SEO 
        title={t('piping.seo.title')}
        description={t('piping.seo.description')}
      />
      <PipingEquipmentPageContent />
    </HelmetProvider>
  );
};

export default PipingEquipmentPage;
