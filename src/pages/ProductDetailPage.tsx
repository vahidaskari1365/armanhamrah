
import { useParams, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ArrowRight, AlertTriangle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

import { productsData } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ProductImage from '@/components/ProductImage';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getSpecEntryText,
  resolveLegacySpecKey,
  resolveLegacySpecValue,
} from '@/lib/productSpecs';

const ProductDetailPageContent = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t, language } = useLanguage();
    const lang = language as 'fa' | 'en';

    const product = productsData.find(p => p.slug === slug);

    if (!product) {
        return (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AlertTriangle size={48} className="text-primary" />
                <h2 className="text-2xl font-bold">{t('products.not_found', 'Product Not Found')}</h2>
                <Link to="/products" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
                    <ArrowRight size={20} />
                    {t('products.back_to_list', 'Back to Products')}
                </Link>
            </motion.div>
        );
    }

    const specEntries = product.specEntries;
    const legacySpecs = product.specs && Object.keys(product.specs).length > 0 ? product.specs : null;
    const hasSpecs = (specEntries && specEntries.length > 0) || legacySpecs;
    const descriptionText = product.description ? t(product.description, product.description) : '';

    return (
        <main className="pt-28 md:pt-36 relative z-10 pb-20 overflow-hidden">
            <motion.div layout className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="mb-6 md:mb-8"
                >
                    <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary dark:text-slate-400 transition-colors">
                        <ArrowRight size={20} />
                        {t('products.back_to_list', 'Back to Products')}
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="lg:sticky top-32"
                    >
                        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-2xl border border-border/40 min-h-[360px] md:min-h-[460px] flex items-center justify-center">
                           <ProductImage
                               src={product.image}
                               alt={t(product.name, product.name)}
                               className="w-full h-full object-contain max-h-[560px] rounded-lg mx-auto"
                           />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex flex-col gap-10"
                    >
                        <div>
                            <span className="text-primary font-semibold tracking-wider">{t(product.brand_id)}</span>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold my-3 text-slate-900 dark:text-white leading-tight">
                                {t(product.name, product.name)}
                            </h1>
                            <span className="text-lg text-slate-500 dark:text-slate-400">{t(product.category_id)}</span>

                            {product.tags && product.tags.length > 0 && (
                                <motion.div layout className="flex flex-wrap gap-2 mt-4">
                                    {product.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </motion.div>
                            )}

                            {descriptionText && (
                                <p className="leading-8 text-slate-600 dark:text-slate-300 mt-6 text-base md:text-lg whitespace-pre-line">
                                  {descriptionText}
                                </p>
                            )}
                        </div>
                        
                        <div className="border-t border-slate-200 dark:border-border pt-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-white">{t('products.specs', 'Specifications')}</h2>
                            {hasSpecs ? (
                                <div className="divide-y divide-slate-200 dark:divide-gray-700/50">
                                    {specEntries?.map((entry, index) => {
                                        const { label, value } = getSpecEntryText(entry, lang);
                                        return (
                                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-4">
                                                <span className="font-medium text-slate-500 dark:text-gray-400">{label}</span>
                                                <span className="font-semibold sm:text-right text-slate-800 dark:text-white">{value}</span>
                                            </div>
                                        );
                                    })}
                                    {legacySpecs && Object.entries(legacySpecs).map(([key, value]) => (
                                        <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-4">
                                            <span className="font-medium text-slate-500 dark:text-gray-400">{resolveLegacySpecKey(key, t)}</span>
                                            <span className="font-semibold sm:text-right text-slate-800 dark:text-white">{resolveLegacySpecValue(value, t)}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500 dark:text-slate-400">{t('products.specs_soon', 'Specifications will be added soon.')}</p>
                            )}
                        </div>

                         <div className="bg-gradient-to-tr from-primary/10 via-transparent to-transparent border border-primary/30 rounded-2xl p-6 md:p-8 text-center mt-6 dark:from-primary/20">
                             <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                               {lang === 'fa' ? 'به این محصول علاقه‌مندید؟' : 'Interested in this product?'}
                             </h3>
                             <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-sm mx-auto text-sm md:text-base">
                               {lang === 'fa'
                                 ? 'برای دریافت اطلاعات بیشتر و استعلام موجودی با ما تماس بگیرید.'
                                 : 'Contact us for more information and availability.'}
                             </p>
                             <Link
                                to={`/contact?product=${encodeURIComponent(t(product.name))}`}
                                className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg text-base md:text-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                             >
                                 <Phone size={20}/>
                                 {lang === 'fa' ? 'تماس بگیرید' : 'Contact Us'}
                             </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}

const ProductDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useLanguage();
    const product = productsData.find(p => p.slug === slug);
    const title = product ? t(product.name) : t('products.title', 'Product');

    const productJsonLd = product ? {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": title,
      "image": product.image?.startsWith('http') ? product.image : `https://armanhamrah.com${product.image}`,
      "brand": { "@type": "Brand", "name": product.brand_id },
      "category": product.category_id,
      "url": `https://armanhamrah.com/product/${product.slug}`,
    } : undefined;

    return (
      <HelmetProvider>
        <SEO 
          title={`${title} | Arman Hamrah`}
          description={product?.description ? t(product.description) : `Details for ${title}`}
          type="product"
          url={product ? `https://armanhamrah.com/product/${product.slug}` : undefined}
          image={product?.image?.startsWith('http') ? product.image : (product ? `https://armanhamrah.com${product.image}` : undefined)}
          jsonLd={productJsonLd}
        />
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container-custom">
            <ProductDetailPageContent />
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    );
};

export default ProductDetailPage;
