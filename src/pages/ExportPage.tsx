
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Truck, Shield, FileCheck, Package, BadgeCheck, Handshake, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import EditableText from '@/components/admin/EditableText';
import exportGoalImage from '@/assets/export-goal.jpg';

// Data now uses translation keys
const features = [
  {
    icon: Globe,
    titleKey: 'export.features.international.title',
    descriptionKey: 'export.features.international.description',
  },
  {
    icon: Truck,
    titleKey: 'export.features.transportation.title',
    descriptionKey: 'export.features.transportation.description',
  },
  {
    icon: Shield,
    titleKey: 'export.features.original.title',
    descriptionKey: 'export.features.original.description',
  },
  {
    icon: FileCheck,
    titleKey: 'export.features.documentation.title',
    descriptionKey: 'export.features.documentation.description',
  },
];

const services = [
  {
    icon: Package,
    titleKey: 'export.services.packaging.title',
    descriptionKey: 'export.services.packaging.description',
  },
  {
    icon: BadgeCheck,
    titleKey: 'export.services.clearance.title',
    descriptionKey: 'export.services.clearance.description',
  },
  {
    icon: Handshake,
    titleKey: 'export.services.quality.title',
    descriptionKey: 'export.services.quality.description',
  },
];

const countries = [
  { nameKey: 'country.uae', flag: '🇦🇪' },
  { nameKey: 'country.iraq', flag: '🇮🇶' },
  { nameKey: 'country.afghanistan', flag: '🇦🇫' },
  { nameKey: 'country.turkmenistan', flag: '🇹🇲' },
  { nameKey: 'country.azerbaijan', flag: '🇦🇿' },
  { nameKey: 'country.armenia', flag: '🇦🇲' },
  { nameKey: 'country.qatar', flag: '🇶🇦' },
  { nameKey: 'country.kuwait', flag: '🇰🇼' },
];

const exportProducts = [
  {
    id: 'iron-steel',
    slug: '/export/iron-steel',
    nameKey: 'export.products.iron_steel.name',
    image: 'https://export.armanhamrah.com/uploads/products/iron.webp',
    categoryKey: 'export.products.category.metals',
    descriptionKey: 'export.products.iron_steel.description',
  },
  {
    id: 'copper-rod',
    slug: '/export/copper-rod',
    nameKey: 'export.products.copper_rod.name',
    image: 'https://export.armanhamrah.com/uploads/products/copper-rod.webp',
    categoryKey: 'export.products.category.metals',
    descriptionKey: 'export.products.copper_rod.description',
  },
  {
    id: 'bitumen',
    slug: '/export/bitumen',
    nameKey: 'export.products.bitumen.name',
    image: 'https://export.armanhamrah.com/uploads/products/bitumen.webp',
    categoryKey: 'export.products.category.petrochemical',
    descriptionKey: 'export.products.bitumen.description',
    grades: ['60/70', 'VG10', 'VG20', 'VG30', 'VG40'],
  },
  {
    id: 'oil',
    slug: '/export/oil',
    nameKey: 'export.products.oil.name',
    image: 'https://export.armanhamrah.com/uploads/products/oil.webp',
    categoryKey: 'export.products.category.petrochemical',
    descriptionKey: 'export.products.oil.description',
  },
  {
    id: 'thread',
    slug: null,
    nameKey: 'export.products.thread.name',
    image: 'https://export.armanhamrah.com/uploads/products/thread.webp',
    categoryKey: 'export.products.category.textile',
    descriptionKey: 'export.products.thread.description',
  },
  {
    id: 'piping-equipment',
    slug: '/export/piping-equipment',
    nameKey: 'export.products.piping-equipment.name',
    image: '/images/products/export-2.jpg',
    categoryKey: 'export.products.category.construction',
    descriptionKey: 'export.products.piping-equipment.description',
  },
  {
    id: 'petrochemical-downstream',
    slug: '/export/petrochemical-downstream',
    nameKey: 'export.products.petrochemical-downstream.name',
    image: '/images/products/export-3.jpg',
    categoryKey: 'export.products.category.petrochemical',
    descriptionKey: 'export.products.petrochemical-downstream.description',
  },
  {
    id: 'general-industrial-supplies',
    slug: '/export/general-industrial-supplies',
    nameKey: 'export.products.general-industrial-supplies.name',
    image: '/images/products/export-1.jpeg',
    categoryKey: 'export.products.category.general',
    descriptionKey: 'export.products.general-industrial-supplies.description',
  },
];

const ExportPageContent = () => {
    const { t, direction } = useLanguage();

    return (
        <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={direction}>
        <Navbar />
        <main className="pt-24">
          {/* Hero */}
          <section className="bg-gradient-hero py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                  <ArrowRight size={20} />
                  {t('nav.home')}
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  <EditableText
                    contentKey="export-title"
                    page="export"
                    section="hero"
                    defaultValue={t('export.title_main')}
                    as="span"
                  />
                </h1>
                <p className="text-xl text-primary font-medium mb-4">
                  <EditableText
                    contentKey="export-subtitle"
                    page="export"
                    section="hero"
                    defaultValue={t('export.subtitle_main')}
                    as="span"
                  />
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  <EditableText
                    contentKey="export-description"
                    page="export"
                    section="hero"
                    defaultValue={t('export.description_main')}
                    as="span"
                    multiline
                  />
                </p>
              </motion.div>
            </div>
          </section>

          {/* Features */}
          <section className="section-padding bg-gradient-premium">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('export.features.title')}</h2>
                <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card-premium text-center group"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <feature.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{t(feature.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(feature.descriptionKey)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Products */}
          <section className="section-padding">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('export.products.title')}</h2>
                <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-4" />
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {exportProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card-premium group"
                  >
                    <Link to={product.slug || '#'} className="block">
                        <div className="relative mb-4 overflow-hidden rounded-xl p-6">
                        <motion.img
                            src={product.image}
                            alt={t(product.nameKey)}
                            className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                        <span className="absolute top-3 right-3 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {t(product.categoryKey)}
                        </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{t(product.nameKey)}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{t(product.descriptionKey)}</p>
                        
                        {product.grades && (
                        <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                            {product.grades.map((grade) => (
                                <span key={grade} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {grade}
                                </span>
                            ))}
                            </div>
                        </div>
                        )}
                        
                        {product.slug && (
                        <div className="inline-flex items-center gap-2 text-primary text-sm hover:underline mt-2">
                            <span>{t('export.products.view_details')}</span>
                            <ExternalLink size={14} />
                        </div>
                        )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="section-padding bg-gradient-premium">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('export.services.title')}</h2>
                <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ y: -5 }}
                    className="card-premium"
                  >
                    <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
                      <service.icon size={24} className="text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{t(service.titleKey)}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t(service.descriptionKey)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Goal */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: (direction === 'rtl' ? 30 : -30) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-foreground mb-4">{t('export.goal.title')}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t('export.goal.description')}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: (direction === 'rtl' ? -30 : 30) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={exportGoalImage}
                    alt={t('export.goal.title')}
                    className="rounded-2xl shadow-2xl w-full"
                    loading="lazy"
                    width={1024}
                    height={768}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Countries */}
          <section className="section-padding bg-gradient-premium">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('export.countries.title')}</h2>
                <p className="text-muted-foreground">{t('export.countries.subtitle')}</p>
                <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-4" />
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {countries.map((country, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="card-premium text-center flex flex-col items-center justify-center gap-2"
                  >
                    <span className="text-4xl">{country.flag}</span>
                    <span className="font-medium text-foreground">{t(country.nameKey)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="max-w-2xl mx-auto">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: (direction === 'rtl' ? 30 : -30) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-foreground mb-6">{t('export.contact.title')}</h2>
                  <p className="text-xl text-primary mb-8">{t('export.contact.subtitle')}</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">Email</p>
                        <a href="mailto:commercial@armanhamrah.com" className="text-muted-foreground hover:text-primary" dir="ltr">commercial@armanhamrah.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">{t('export.contact.phone')}</p>
                        <a href="tel:02188321032" className="text-muted-foreground hover:text-primary" dir="ltr">+98 21 88321032</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">{t('export.contact.address')}</p>
                        <p className="text-muted-foreground text-sm">
                          {t('export.contact.address_value')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section-padding bg-gradient-premium">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center card-premium bg-gradient-gold p-12"
              >
                <Globe size={48} className="mx-auto mb-6 text-primary-foreground" />
                <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                  {t('export.cta.title')}
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                  {t('export.cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-block bg-background/20 text-primary-foreground border-2 border-primary-foreground/30 px-8 py-4 rounded-xl font-bold hover:bg-background/30 transition-colors"
                  >
                    {t('nav.contact')}
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
};

const ExportPage = () => {
  const { t } = useLanguage();
  
  return (
    <HelmetProvider>
      <SEO 
        title={t('export.seo.title')}
        description={t('export.seo.description')}
      />
      <ExportPageContent/>
    </HelmetProvider>
  );
};

export default ExportPage;
