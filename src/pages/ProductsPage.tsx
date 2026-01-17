import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import ChatWidget from '@/components/ChatWidget';
import radicalLogo from '@/assets/radical-logo.jpeg';
import EditableText from '@/components/admin/EditableText';

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

const brandsList = ['همه', 'Apple', 'Samsung'];
const categories = ['همه', 'موبایل', 'ساعت هوشمند'];

const ProductsPageContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const [selectedBrand, setSelectedBrand] = useState<string>('همه');
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');

  useEffect(() => {
    const brandParam = searchParams.get('brand');
    if (brandParam) {
      setSelectedBrand(brandParam);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const brandMatch = selectedBrand === 'همه' || product.brand === selectedBrand;
    const categoryMatch = selectedCategory === 'همه' || product.category === selectedCategory;
    return brandMatch && categoryMatch;
  });

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
    if (brand === 'همه') {
      searchParams.delete('brand');
    } else {
      searchParams.set('brand', brand);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background relative admin-toolbar-offset" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      {/* Background Logo */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <img 
          src={radicalLogo} 
          alt="" 
          className="w-[90%] max-w-5xl opacity-15 dark:opacity-20"
        />
      </div>
      <Navbar />
      <main className="pt-24 relative z-10">
        {/* Hero */}
        <section className="py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                <ArrowRight size={20} />
                {language === 'fa' ? 'بازگشت به صفحه اصلی' : 'Back to Home'}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                <EditableText
                  contentKey="products-page-title"
                  page="products"
                  section="hero"
                  defaultValue={language === 'fa' ? 'محصولات' : 'Products'}
                  as="span"
                />
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                <EditableText
                  contentKey="products-page-description"
                  page="products"
                  section="hero"
                  defaultValue={language === 'fa' 
                    ? 'تمامی محصولات با گارانتی معتبر آرمان همراه ارتباطات آریا عرضه می‌شوند'
                    : 'All products come with valid Arman Hamrah warranty'
                  }
                  as="span"
                  multiline
                />
              </p>
            </motion.div>
          </div>
        </section>

        {/* Brands Filter */}
        <section className="py-8 border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm font-medium text-muted-foreground ml-4">
                {language === 'fa' ? 'برند:' : 'Brand:'}
              </span>
              {brandsList.map((brand, index) => (
                <motion.button
                  key={brand}
                  onClick={() => handleBrandClick(brand)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedBrand === brand
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {brand === 'همه' && language === 'en' ? 'All' : brand}
                </motion.button>
              ))}
              <span className="text-sm font-medium text-muted-foreground mr-8 ml-4">
                {language === 'fa' ? 'دسته‌بندی:' : 'Category:'}
              </span>
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (brandsList.length + index) * 0.1 }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {category === 'همه' && language === 'en' ? 'All' : 
                   category === 'موبایل' && language === 'en' ? 'Mobile' :
                   category === 'ساعت هوشمند' && language === 'en' ? 'Smartwatch' : category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((product, index) => (
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
                    {language === 'fa' ? 'مشاهده' : 'View'}
                  </span>
                </motion.a>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {language === 'fa' ? 'محصولی یافت نشد' : 'No products found'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

const ProductsPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="محصولات | آرمان همراه ارتباطات آریا"
            description="مشاهده تمامی محصولات اپل، سامسونگ با گارانتی آرمان همراه - آیفون، گلکسی، اپل واچ و ساعت‌های هوشمند"
          />
          <ProductsPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default ProductsPage;