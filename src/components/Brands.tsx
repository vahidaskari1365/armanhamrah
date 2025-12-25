import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const brands = [
  { name: 'Apple', logo: 'https://www.armanhamrah.com/uploads/brands/apple-logo.webp' },
  { name: 'Samsung', logo: 'https://www.armanhamrah.com/uploads/brands/samsung-logo.webp' },
  { name: 'Xiaomi', logo: 'https://www.armanhamrah.com/uploads/brands/xiaomi-logo.webp' },
  { name: 'Sony', logo: 'https://www.armanhamrah.com/uploads/brands/sony-logo.webp' },
  { name: 'Harman Kardon', logo: 'https://www.armanhamrah.com/uploads/brands/harman-kardon-logo.webp' },
];

const Brands = () => {
  const { t } = useLanguage();

  return (
    <section id="brands" className="section-padding bg-gradient-premium">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('brands.title')}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
