
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';
import { useAdmin } from '@/contexts/AdminContext';
import { brandData } from '@/data/brands';

const Brands = () => {
  const { t } = useLanguage();
  const { isEditMode } = useAdmin();

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
            <EditableText
              contentKey="brands-title"
              page="home"
              section="brands"
              defaultValue={t('brands.title')}
              as="span"
            />
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brandData.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <Link
                to={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="block grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer"
              >
                {isEditMode ? (
                  <EditableImage
                    contentKey={`brand-logo-${brand.id}`}
                    page="home"
                    section="brands"
                    defaultSrc={brand.logo}
                    alt={brand.name}
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                ) : (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
