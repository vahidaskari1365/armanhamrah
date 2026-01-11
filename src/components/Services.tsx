import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Store, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Shield,
      titleKey: 'services.warranty.title',
      descKey: 'services.warranty.desc',
      link: '/warranty',
      gradient: 'from-amber-500 to-orange-600',
      isInternal: true,
    },
    {
      icon: Store,
      titleKey: 'services.representatives.title',
      descKey: 'services.representatives.desc',
      link: '/representatives',
      gradient: 'from-amber-400 to-yellow-500',
      isInternal: true,
    },
    {
      icon: ShoppingBag,
      titleKey: 'services.shop.title',
      descKey: 'services.shop.desc',
      link: '/products',
      gradient: 'from-orange-500 to-red-500',
      isInternal: true,
    },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
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
            >
              {service.isInternal ? (
                <Link
                  to={service.link}
                  className="card-premium group cursor-pointer block"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-gold group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(service.descKey)}
                  </p>
                </Link>
              ) : (
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-premium group cursor-pointer block"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-gold group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(service.descKey)}
                  </p>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
