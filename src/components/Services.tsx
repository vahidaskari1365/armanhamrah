import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Smartphone, ShoppingBag } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Shield,
      titleKey: 'services.warranty.title',
      descKey: 'services.warranty.desc',
      link: 'https://www.armanhamrah.com/guarantee.php',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: Smartphone,
      titleKey: 'services.myarman.title',
      descKey: 'services.myarman.desc',
      link: 'https://my.armanhamrah.com/',
      gradient: 'from-amber-400 to-yellow-500',
    },
    {
      icon: ShoppingBag,
      titleKey: 'services.shop.title',
      descKey: 'services.shop.desc',
      link: 'https://www.armanhamrah.com/products.php',
      gradient: 'from-orange-500 to-red-500',
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
            <motion.a
              key={service.titleKey}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="card-premium group cursor-pointer"
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
