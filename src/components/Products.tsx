import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const products = [
  {
    name: { fa: 'اپل واچ اولترا 2', en: 'Apple Watch Ultra 2' },
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20Watch%20Ultra%202/watch-ultra-2.webp',
    link: 'https://www.armanhamrah.com/product.php?p=23',
  },
  {
    name: { fa: 'اپل واچ سری 9', en: 'Apple Watch Series 9' },
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20Watch%20Series%209/apple-watch-9.webp',
    link: 'https://www.armanhamrah.com/product.php?p=22',
  },
  {
    name: { fa: 'اپل آیفون 15 پرو مکس', en: 'Apple iPhone 15 Pro Max' },
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20iPhone%2015%20Pro%20Max/apple-iphone-15-promax.webp',
    link: 'https://www.armanhamrah.com/product.php?p=21',
  },
  {
    name: { fa: 'اپل آیفون 15 پرو', en: 'Apple iPhone 15 Pro' },
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20iPhone%2015%20Pro/apple-iphone-15-pro.webp',
    link: 'https://www.armanhamrah.com/product.php?p=20',
  },
  {
    name: { fa: 'اپل آیفون 15 پلاس', en: 'Apple iPhone 15 Plus' },
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20iPhone%2015%20Plus/apple-iphone-15-plus.webp',
    link: 'https://www.armanhamrah.com/product.php?p=19',
  },
];

const Products = () => {
  const { t, language } = useLanguage();

  return (
    <section id="products" className="section-padding bg-gradient-premium">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('products.title')}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <motion.a
              key={product.link}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="card-premium text-center group"
            >
              <div className="relative mb-4 overflow-hidden rounded-xl bg-secondary/50 p-4">
                <motion.img
                  src={product.image}
                  alt={product.name[language]}
                  className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {product.name[language]}
              </h3>
              <span className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-gold">
                {t('products.view')}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
