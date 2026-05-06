import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Scaling, Shield, Award, FileCheck, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const CopperRodPageContent = () => {
  const { t, direction } = useLanguage();

  const features = [
    { icon: Scaling, titleKey: 'copper.feature1.title', descKey: 'copper.feature1.desc' },
    { icon: Shield, titleKey: 'copper.feature2.title', descKey: 'copper.feature2.desc' },
    { icon: Award, titleKey: 'copper.feature3.title', descKey: 'copper.feature3.desc' },
    { icon: FileCheck, titleKey: 'copper.feature4.title', descKey: 'copper.feature4.desc' },
  ];

  const specs = [
    { characteristic: t('copper.spec.diameter'), value: '8mm' },
    { characteristic: t('copper.spec.conductivity'), value: '101% IACS min' },
    { characteristic: t('copper.spec.tensile'), value: '220 - 240 N/mm2' },
    { characteristic: t('copper.spec.elongation'), value: '35% min' },
    { characteristic: t('copper.spec.purity'), value: '99.9% min' },
    { characteristic: t('copper.spec.standard'), value: 'ASTM B49' },
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t('copper.title')}</h1>
              <p className="text-xl text-primary font-medium mb-4">{t('copper.subtitle')}</p>
              <p className="text-lg text-muted-foreground max-w-2xl">{t('copper.description')}</p>
            </motion.div>
          </div>
        </section>

        {/* Image */}
        <section className="section-padding">
            <div className="container-custom">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <img src="https://export.armanhamrah.com/uploads/products/copper-rod.webp" alt={t('copper.title')} className="rounded-2xl shadow-xl w-full max-w-4xl mx-auto" / loading="lazy" decoding="async">
                </motion.div>
            </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-gradient-premium">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">{t('copper.featuresTitle')}</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="card-premium text-center group">
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

        {/* Specs Table */}
        <section className="section-padding">
            <div className="container-custom">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t('copper.specsTitle')}</h2>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="overflow-x-auto rounded-xl card-premium max-w-4xl mx-auto p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/50">
                            <tr>
                                <th scope="col" className="px-8 py-5 font-medium">{t('copper.table.characteristic')}</th>
                                <th scope="col" className="px-8 py-5 font-medium">{t('copper.table.value')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specs.map((spec, i) => (
                                <tr key={i} className="border-b border-border last:border-b-0">
                                    <td className="px-8 py-4 font-medium text-foreground">{spec.characteristic}</td>
                                    <td className="px-8 py-4 text-primary font-mono">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-gradient-premium">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center card-premium bg-gradient-gold p-12">
              <Globe size={48} className="mx-auto mb-6 text-primary-foreground" />
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">{t('export.cta.title')}</h2>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">{t('export.cta.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/9888321032" target="_blank" rel="noopener noreferrer" className="inline-block bg-background text-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">{t('export.cta.button_start')}</a>
                <Link to="/contact" className="inline-block bg-background/20 text-primary-foreground border-2 border-primary-foreground/30 px-8 py-4 rounded-xl font-bold hover:bg-background/30 transition-colors">{t('nav.contact')}</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const CopperRodPage = () => {
  const { t } = useLanguage();
  
  return (
    <HelmetProvider>
      <SEO 
        title={t('copper.seo.title')}
        description={t('copper.seo.description')}
      />
      <CopperRodPageContent />
    </HelmetProvider>
  );
};

export default CopperRodPage;
