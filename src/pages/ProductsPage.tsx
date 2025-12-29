import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';

const products = [
  // Apple Products
  {
    name: 'اپل واچ اولترا 2',
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20Watch%20Ultra%202/watch-ultra-2.webp',
    link: 'https://www.armanhamrah.com/product.php?p=23',
    category: 'ساعت هوشمند',
    brand: 'Apple',
  },
  {
    name: 'اپل واچ سری 9',
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20Watch%20Series%209/apple-watch-9.webp',
    link: 'https://www.armanhamrah.com/product.php?p=22',
    category: 'ساعت هوشمند',
    brand: 'Apple',
  },
  {
    name: 'اپل آیفون 15 پرو مکس',
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20iPhone%2015%20Pro%20Max/apple-iphone-15-promax.webp',
    link: 'https://www.armanhamrah.com/product.php?p=21',
    category: 'موبایل',
    brand: 'Apple',
  },
  {
    name: 'اپل آیفون 15 پرو',
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20iPhone%2015%20Pro/apple-iphone-15-pro.webp',
    link: 'https://www.armanhamrah.com/product.php?p=20',
    category: 'موبایل',
    brand: 'Apple',
  },
  {
    name: 'اپل آیفون 15 پلاس',
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20iPhone%2015%20Plus/apple-iphone-15-plus.webp',
    link: 'https://www.armanhamrah.com/product.php?p=19',
    category: 'موبایل',
    brand: 'Apple',
  },
  {
    name: 'اپل آیفون 15',
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20iPhone%2015/apple-iphone-15.webp',
    link: 'https://www.armanhamrah.com/product.php?p=18',
    category: 'موبایل',
    brand: 'Apple',
  },
  // Samsung Products
  {
    name: 'سامسونگ گلکسی Z فولد 4',
    image: 'https://www.armanhamrah.com/uploads/products/Samsung%20Galaxy%20Z%20Fold4/samsung-galaxy-zfold4-1.webp',
    link: 'https://www.armanhamrah.com/product.php?p=17',
    category: 'موبایل',
    brand: 'Samsung',
  },
  {
    name: 'سامسونگ گلکسی A04e',
    image: 'https://www.armanhamrah.com/uploads/products/Samsung%20Galaxy%20A04e/samsung-galaxy-A04E-1.webp',
    link: 'https://www.armanhamrah.com/product.php?p=16',
    category: 'موبایل',
    brand: 'Samsung',
  },
  {
    name: 'سامسونگ گلکسی A04s',
    image: 'https://www.armanhamrah.com/uploads/products/Samsung%20Galaxy%20A04s/samsung-galaxy-A04S-1.webp',
    link: 'https://www.armanhamrah.com/product.php?p=15',
    category: 'موبایل',
    brand: 'Samsung',
  },
  {
    name: 'سامسونگ گلکسی A04',
    image: 'https://www.armanhamrah.com/uploads/products/Samsung%20Galaxy%20A04/samsung-galaxy-A04-1.webp',
    link: 'https://www.armanhamrah.com/product.php?p=14',
    category: 'موبایل',
    brand: 'Samsung',
  },
  {
    name: 'سامسونگ گلکسی واچ 5 پرو',
    image: 'https://www.armanhamrah.com/uploads/products/Samsung%20Galaxy%20Watch5%20Pro/galaxy-watch5-pro-1.webp',
    link: 'https://www.armanhamrah.com/product.php?p=13',
    category: 'ساعت هوشمند',
    brand: 'Samsung',
  },
  {
    name: 'سامسونگ گلکسی واچ 5',
    image: 'https://www.armanhamrah.com/uploads/products/Samsung%20Galaxy%20Watch5/samsung-galaxy-watch-5.webp',
    link: 'https://www.armanhamrah.com/product.php?p=12',
    category: 'ساعت هوشمند',
    brand: 'Samsung',
  },
];

const brands = ['همه', 'Apple', 'Samsung'];
const categories = ['همه', 'موبایل', 'ساعت هوشمند'];

const ProductsPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="محصولات | آرمان همراه ارتباطات آریا"
            description="مشاهده تمامی محصولات اپل، سامسونگ با گارانتی آرمان همراه - آیفون، گلکسی، اپل واچ و ساعت‌های هوشمند"
          />
          <div className="min-h-screen bg-background" dir="rtl">
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
                      بازگشت به صفحه اصلی
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                      محصولات
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      تمامی محصولات با گارانتی معتبر آرمان همراه ارتباطات آریا عرضه می‌شوند
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Brands Filter */}
              <section className="py-8 border-b border-border bg-card/50">
                <div className="container-custom">
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm font-medium text-muted-foreground ml-4">برند:</span>
                    {brands.map((brand, index) => (
                      <motion.button
                        key={brand}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                          index === 0
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                        }`}
                      >
                        {brand}
                      </motion.button>
                    ))}
                    <span className="text-sm font-medium text-muted-foreground mr-8 ml-4">دسته‌بندی:</span>
                    {categories.map((category, index) => (
                      <motion.button
                        key={category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (brands.length + index) * 0.1 }}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                          index === 0
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                        }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Products Grid */}
              <section className="section-padding">
                <div className="container-custom">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product, index) => (
                      <motion.a
                        key={index}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ y: -10 }}
                        className="card-premium text-center group"
                      >
                        <div className="relative mb-4 overflow-hidden rounded-xl bg-secondary/50 p-4">
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                          <span className="absolute top-2 right-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {product.brand}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground block mb-2">{product.category}</span>
                        <h3 className="text-sm md:text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <span className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-gold">
                          مشاهده
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default ProductsPage;