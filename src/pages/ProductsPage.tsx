import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import ChatWidget from '@/components/ChatWidget';
import radicalLogo from '@/assets/radical-logo.jpeg';
import EditableText from '@/components/admin/EditableText';
import { products, brandsList, categories } from '@/data/products';

const ProductsPageContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, language } = useLanguage();
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
                {t('products.back')}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                <EditableText
                  contentKey="products-page-title"
                  page="products"
                  section="hero"
                  defaultValue={t('products.title')}
                  as="span"
                />
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                <EditableText
                  contentKey="products-page-description"
                  page="products"
                  section="hero"
                  defaultValue={t('products.description')}
                  as="span"
                  multiline
                />
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {/* Brands Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {t('products.brand')}
                </span>
                {brandsList.map((brand, index) => (
                  <motion.button
                    key={brand}
                    onClick={() => handleBrandClick(brand)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedBrand === brand
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    {t(brand)}
                  </motion.button>
                ))}
              </div>
              {/* Categories Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {t('products.category')}
                </span>
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (brandsList.length + index) * 0.05 }}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    {t(category)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="card-premium text-center group"
                >
                  <Link to={`/product/${product.slug}`}>
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
                    <span className="text-xs text-muted-foreground block mb-2">{t(product.category)}</span>
                    <h3 className="text-sm md:text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <span className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-gold">
                      {t('products.view')}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {t('products.noProducts')}
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
  const { t } = useLanguage();
  return (
    <HelmetProvider>
      <SEO 
        title={t('products.seo.title')}
        description={t('products.seo.description')}
      />
      <ProductsPageContent />
    </HelmetProvider>
  );
};

export default ProductsPage;
