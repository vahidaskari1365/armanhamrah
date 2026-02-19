import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductDetailPageContent = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <div className="text-center py-20">{t('products.not_found')}</div>;
  }

  return (
    <div className="min-h-screen bg-background admin-toolbar-offset" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24 relative z-10 pb-20">
        <div className="container-custom">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                    <ArrowRight size={20} />
                    {t('products.back_to_list')}
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left Column: Image and Description */}
                <div className="flex flex-col gap-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                        <div className="bg-secondary/50 rounded-2xl p-8 sticky top-28">
                            <motion.img 
                                src={product.image} 
                                alt={t(product.name)}
                                className="w-full h-auto object-contain max-h-96"
                                layoutId={`product-image-${product.slug}`}
                            />
                        </div>
                    </motion.div>
                    {product.description && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="mt-8 lg:mt-0"
                        >
                             <h2 className="text-2xl font-semibold text-foreground mb-4">__{t('products.intro')}__</h2>
                            <p className="text-muted-foreground leading-relaxed">{t(product.description)}</p>
                        </motion.div>
                    )}
                </div>

                {/* Right Column: Details and Specs */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <span className="text-primary font-semibold">{t(product.brand)}</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground my-3">{t(product.name)}</h1>
                    <span className="text-lg text-muted-foreground">{t(product.category)}</span>
                    
                    <div className="mt-10 pt-8 border-t border-border">
                        <h2 className="text-2xl font-semibold text-foreground mb-6">__{t('products.specs')}__</h2>
                        
                        {Object.keys(product.specs).length > 0 ? (
                            <div className="space-y-4">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center bg-secondary/30 px-5 py-4 rounded-lg">
                                        <span className="font-medium text-muted-foreground">{t(key)}</span>
                                        <span className="font-semibold text-foreground text-right">{t(String(value))}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                {t('products.specs_soon')}
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const ProductDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useLanguage();
    const product = products.find(p => p.slug === slug);
    const title = product ? t(product.name) : t('products.not_found');
    const description = product ? t(product.description) : 'Product details page';

    return (
      <HelmetProvider>
        <SEO 
          title={`${title} | Arman Hamrah`}
          description={description}
        />
        <ProductDetailPageContent />
      </HelmetProvider>
    );
  };
  
  export default ProductDetailPage;
