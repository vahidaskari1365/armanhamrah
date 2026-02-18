import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductDetailPageContent = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <div className="text-center py-20">{language === 'fa' ? 'محصول یافت نشد' : 'Product not found'}</div>;
  }

  return (
    <div className="min-h-screen bg-background admin-toolbar-offset" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24 relative z-10">
        <div className="container-custom">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                    <ArrowRight size={20} />
                    {language === 'fa' ? 'بازگشت به لیست محصولات' : 'Back to Products'}
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                    <div className="bg-secondary/50 rounded-2xl p-8 sticky top-28">
                        <motion.img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-auto object-contain max-h-96"
                            layoutId={`product-image-${product.slug}`}
                        />
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <span className="text-primary font-semibold">{product.brand}</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground my-3">{product.name}</h1>
                    <span className="text-lg text-muted-foreground">{product.category}</span>
                    
                    {product.description && (
                        <div className="mt-8">
                             <h2 className="text-2xl font-semibold text-foreground mb-4">__{language === 'fa' ? 'معرفی محصول' : 'Product Introduction'}__</h2>
                            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                        </div>
                    )}

                    <div className="mt-10 pt-8 border-t border-border">
                        <h2 className="text-2xl font-semibold text-foreground mb-6">__{language === 'fa' ? 'مشخصات فنی' : 'Specifications'}__</h2>
                        
                        {Object.keys(product.specs).length > 0 ? (
                            <div className="space-y-4">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center bg-secondary/30 px-5 py-4 rounded-lg">
                                        <span className="font-medium text-muted-foreground">{key}</span>
                                        <span className="font-semibold text-foreground text-right">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                {language === 'fa' ? 'مشخصات فنی این محصول به زودی اضافه خواهد شد.' : 'Specifications for this product will be added soon.'}
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
    const product = products.find(p => p.slug === slug);

    return (
      <HelmetProvider>
        <ThemeProvider>
          <LanguageProvider>
            <SEO 
              title={`${product ? product.name : 'محصول'} | آرمان همراه`}
              description={product ? product.description : 'مشاهده مشخصات و خرید محصولات با گارانتی آرمان همراه'}
            />
            <ProductDetailPageContent />
          </LanguageProvider>
        </ThemeProvider>
      </HelmetProvider>
    );
  };
  
  export default ProductDetailPage;
