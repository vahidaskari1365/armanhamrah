import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Ship, Award, FileCheck, Package, Truck, CheckCircle } from 'lucide-react';

const Export = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Globe,
      titleKey: 'export.feature1.title',
      descKey: 'export.feature1.desc',
    },
    {
      icon: Ship,
      titleKey: 'export.feature2.title',
      descKey: 'export.feature2.desc',
    },
    {
      icon: Award,
      titleKey: 'export.feature3.title',
      descKey: 'export.feature3.desc',
    },
    {
      icon: FileCheck,
      titleKey: 'export.feature4.title',
      descKey: 'export.feature4.desc',
    },
  ];

  const services = [
    {
      icon: Package,
      titleKey: 'export.service1.title',
      descKey: 'export.service1.desc',
    },
    {
      icon: Truck,
      titleKey: 'export.service2.title',
      descKey: 'export.service2.desc',
    },
    {
      icon: CheckCircle,
      titleKey: 'export.service3.title',
      descKey: 'export.service3.desc',
    },
  ];

  return (
    <section id="export" className="section-padding bg-gradient-premium">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('export.title')}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('export.description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="card-premium text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t('export.servicesTitle')}
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="card-premium group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6 shadow-gold group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {t(service.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(service.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6 text-lg">
            {t('export.cta.text')}
          </p>
          <motion.a
            href="#contact"
            className="btn-gold inline-block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('export.cta.button')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Export;
