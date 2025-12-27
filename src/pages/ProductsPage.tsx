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
    image: 'https://www.armanhamrah.com/uploads/products/Apple%20iPhone%2015%20Plus/apple-iphone-15-plus.webp',
    link: 'https://www.armanhamrah.com/product.php?p=18',
    category: 'موبایل',
    brand: 'Apple',
  },
  {
    name: 'سامسونگ گلکسی S23 اولترا',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    link: 'https://www.armanhamrah.com/products.php',
    category: 'موبایل',
    brand: 'Samsung',
  },
  {
    name: 'شیائومی 13 پرو',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
    link: 'https://www.armanhamrah.com/products.php',
    category: 'موبایل',
    brand: 'Xiaomi',
  },
  {
    name: 'سونی ایکسپریا 1 V',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    link: 'https://www.armanhamrah.com/products.php',
    category: 'موبایل',
    brand: 'Sony',
  },
  {
    name: 'هارمن کاردن اسپیکر',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400',
    link: 'https://www.armanhamrah.com/products.php',
    category: 'صوتی',
    brand: 'Harman Kardon',
  },
];

const brands = ['همه', 'Apple', 'Samsung', 'Xiaomi', 'Sony', 'Harman Kardon'];

const ProductsPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="محصولات | آرمان همراه ارتباطات آریا"
            description="مشاهده تمامی محصولات اپل، سامسونگ، شیائومی، سونی و هارمن کاردن با گارانتی آرمان همراه"
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
