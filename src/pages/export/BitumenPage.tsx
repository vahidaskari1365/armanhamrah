import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Shield, Award, FileCheck, MapPin, MessageCircle, Mail, Phone, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const BitumenPageContent = () => {
  const { t, direction } = useLanguage();

  const features = [
    { icon: Factory, titleKey: 'bitumen.feature1.title', descKey: 'bitumen.feature1.desc' },
    { icon: Shield, titleKey: 'bitumen.feature2.title', descKey: 'bitumen.feature2.desc' },
    { icon: Award, titleKey: 'bitumen.feature3.title', descKey: 'bitumen.feature3.desc' },
    { icon: FileCheck, titleKey: 'bitumen.feature4.title', descKey: 'bitumen.feature4.desc' },
  ];

  const grades = ['60/70', 'VG10', 'VG20', 'VG30', 'VG40'];

  const specs = [
      { characteristic: t('bitumen.spec.penetration'), unit: '0.1 mm', specification: '60-70', testMethod: 'ASTM D5', result: '65' },
      { characteristic: t('bitumen.spec.specificGravity'), unit: '-', specification: '1.01-1.06', testMethod: 'ASTM D70', result: '1.03' },
      { characteristic: t('bitumen.spec.softeningPoint'), unit: '°C', specification: '49-56', testMethod: 'ASTM D36', result: '52' },
      { characteristic: t('bitumen.spec.ductility'), unit: 'cm', specification: '100 min', testMethod: 'ASTM D113', result: '105' },
      { characteristic: t('bitumen.spec.lossOnHeating'), unit: 'wt %', specification: '0.2 max', testMethod: 'ASTM D6', result: '0.08' },
      { characteristic: t('bitumen.spec.dropInPenetration'), unit: '%', specification: '20 max', testMethod: 'ASTM D6 & D5', result: '10' },
      { characteristic: t('bitumen.spec.flashPoint'), unit: '°C', specification: '232 min', testMethod: 'ASTM D92', result: '255' },
      { characteristic: t('bitumen.spec.solubility'), unit: 'wt %', specification: '99 min', testMethod: 'ASTM D2042', result: '99.7' },
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t('bitumen.title')}</h1>
              <p className="text-xl text-primary font-medium mb-4">{t('bitumen.subtitle')}</p>
              <p className="text-lg text-muted-foreground max-w-2xl">{t('bitumen.description')}</p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
            <div className="container-custom">
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

        {/* Grades & Specs */}
        <section className="section-padding bg-gradient-premium">
            <div className="container-custom">
                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    {/* Grades */}
                    <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: direction === 'rtl' ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <h2 className="text-3xl font-bold text-foreground mb-6">{t('bitumen.gradesTitle')}</h2>
                        <div className="space-y-3">
                            {grades.map(grade => (
                                <div key={grade} className="card-premium p-4">
                                    <span className="font-semibold text-lg text-foreground">{grade}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Specs Table */}
                    <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
                        <h2 className="text-3xl font-bold text-foreground mb-6">{t('bitumen.specsTitle')}</h2>
                        <div className="overflow-x-auto rounded-xl card-premium p-0">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-secondary/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-medium">{t('bitumen.table.characteristic')}</th>
                                        <th scope="col" className="px-6 py-4 font-medium">{t('bitumen.table.unit')}</th>
                                        <th scope="col" className="px-6 py-4 font-medium">{t('bitumen.table.specification')}</th>
                                        <th scope="col" className="px-6 py-4 font-medium">{t('bitumen.table.testMethod')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {specs.map((spec, i) => (
                                        <tr key={i} className="border-b border-border last:border-b-0">
                                            <td className="px-6 py-4 font-medium text-foreground">{spec.characteristic}</td>
                                            <td className="px-6 py-4">{spec.unit}</td>
                                            <td className="px-6 py-4">{spec.specification}</td>
                                            <td className="px-6 py-4">{spec.testMethod}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const BitumenPage = () => {
  const { t } = useLanguage();
  
  return (
    <HelmetProvider>
      <SEO 
        title={t('bitumen.seo.title')}
        description={t('bitumen.seo.description')}
      />
      <BitumenPageContent />
    </HelmetProvider>
  );
};

export default BitumenPage;
