import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/pages/ProductsPage'; // Reuse the Product type

// --- Data Fetching Function ---
const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, brand:brands(name), category:categories(name)')
    .eq('slug', slug)
    .single(); // Use .single() to get one record or null

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is a valid case
    throw new Error(error.message);
  }

  return data as unknown as Product | null;
};


const ProductDetailPageContent = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();

  const { 
    data: product,
    isLoading,
    isError,
    error 
  } = useQuery<Product | null>({ 
    queryKey: ['product', slug], 
    queryFn: () => fetchProductBySlug(slug!)
  });

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
        <div className="text-center py-20 flex flex-col items-center gap-4">
            <AlertTriangle className="text-destructive" size={48} />
            <h2 className="text-2xl font-bold">An Error Occurred</h2>
            <p className="text-muted-foreground">{error.message}</p>
             <Link to="/products" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
                <ArrowRight size={20} />
                {t('products.back_to_list')}
            </Link>
      </div>
    );
  }
  
  // --- Not Found State ---
  if (!product) {
    return (
        <div className="text-center py-20 flex flex-col items-center gap-4">
            <AlertTriangle className="text-muted-foreground" size={48} />
            <h2 className="text-2xl font-bold">{t('products.not_found', 'Product Not Found')}</h2>
             <Link to="/products" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
                <ArrowRight size={20} />
                {t('products.back_to_list')}
            </Link>
      </div>
    )
  }

  // --- Success State (Product Found) ---
  return (
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
                           <h2 className="text-2xl font-semibold text-foreground mb-4">{t('products.intro', 'Introduction')}</h2>
                          <p className="text-muted-foreground leading-relaxed">{t(product.description)}</p>
                      </motion.div>
                  )}
              </div>

              {/* Right Column: Details and Specs */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                  <span className="text-primary font-semibold">{t(product.brand.name)}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground my-3">{t(product.name)}</h1>
                  <span className="text-lg text-muted-foreground">{t(product.category.name)}</span>
                  
                  <div className="mt-10 pt-8 border-t border-border">
                      <h2 className="text-2xl font-semibold text-foreground mb-6">{t('products.specs', 'Specifications')}</h2>
                      
                      {product.specs && Object.keys(product.specs).length > 0 ? (
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
                              {t('products.specs_soon', 'Specifications will be added soon.')}
                          </p>
                      )}
                  </div>
              </motion.div>
          </div>
      </div>
    </main>
  );
}

const ProductDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useLanguage();

    // We cannot get product name for SEO here without another fetch. 
    // A more advanced solution would be needed for perfect SEO, but this is good for now.
    const title = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : t('products.title');

    return (
      <HelmetProvider>
        <SEO 
          title={`${title} | Arman Hamrah`}
          description={t('products.seo.description')}
        />
        <div className="min-h-screen bg-background admin-toolbar-offset">
          <Navbar />
          <ProductDetailPageContent />
          <Footer />
        </div>
      </HelmetProvider>
    );
  };
  
  export default ProductDetailPage;
