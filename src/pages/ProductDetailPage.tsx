
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ArrowRight, AlertTriangle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

import { productsData } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductDetailPageContent = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const locationState = (location.state as {
        fromProductsLocation?: string;
        productsScrollY?: number;
    } | null) ?? null;

    const product = productsData.find(p => p.slug === slug);

    if (!product) {
        return (
            <div className="text-center py-20 flex flex-col items-center gap-4 text-slate-800 dark:text-white min-h-screen justify-center">
                <AlertTriangle size={48} className="text-primary" />
                <h2 className="text-2xl font-bold">{t('products.not_found', 'Product Not Found')}</h2>
                <Link to="/products" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
                    <ArrowRight size={20} />
                    {t('products.back_to_list', 'Back to Products')}
                </Link>
            </div>
        );
    }

    return (
        <main className="pt-28 md:pt-36 relative z-10 pb-20 overflow-hidden">
            <div className="container-custom">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => {
                            const savedLocation = locationState?.fromProductsLocation || sessionStorage.getItem('products:location') || '/products';
                            const savedScroll = Number(sessionStorage.getItem('products:scroll') || locationState?.productsScrollY || 0);

                            navigate(savedLocation, {
                                state: {
                                    restoreProductsScroll: true,
                                    productsScrollY: savedScroll,
                                },
                            });
                        }}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary dark:text-slate-400 transition-colors"
                    >
                        <ArrowRight size={20} />
                        {t('products.back_to_list', 'Back to Products')}
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="lg:sticky top-32"
                    >
                        <div className="bg-slate-100 dark:bg-gray-800/20 dark:backdrop-blur-md rounded-2xl p-6 shadow-2xl">
                           <motion.img
                               initial={{ scale: 0.95 }}
                               animate={{ scale: 1 }}
                               transition={{ duration: 0.5, delay: 0.2 }}
                               src={product.image}
                               alt={t(product.name)}
                               className="w-full h-auto object-contain max-h-[500px] rounded-lg"
                               onError={(e) => {
                                   const target = e.target as HTMLImageElement;
                                   target.src = '/placeholder.svg';
                               }}
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
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold my-3 text-slate-900 dark:text-white">
                                {t(product.name)}
                            </h1>
                            <span className="text-lg text-slate-500 dark:text-slate-400">{t(product.category_id.replace('category.', ''))}</span>

                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">{t('products.price')}</span>
                                <span className="text-2xl font-bold text-primary">
                                    {product.price ? product.price : t('products.contact_for_price')}
                                </span>
                            </div>

                            {product.description && (
                                <p className="leading-relaxed text-slate-600 dark:text-slate-300 mt-8 text-lg">{t(product.description)}</p>
                            )}
                        </div>
                        
                        <div className="border-t border-slate-200 dark:border-border pt-8">
                            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{t('products.specs', 'Specifications')}</h2>
                            {product.specs && Object.keys(product.specs).length > 0 ? (
                                <div className="divide-y divide-slate-200 dark:divide-gray-700/50">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center py-4">
                                            <span className="font-medium text-slate-500 dark:text-gray-400">{t(key)}</span>
                                            <span className="font-semibold text-right text-slate-800 dark:text-white">{t(String(value))}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500 dark:text-slate-400">{t('products.specs_soon', 'Specifications will be added soon.')}</p>
                            )}
                        </div>


                         <div className="bg-gradient-to-tr from-primary/5 via-primary/5 to-transparent dark:from-primary/40 dark:via-primary/25 dark:to-primary/10 border border-primary/20 dark:border-primary/60 rounded-2xl p-8 text-center mt-6">
                             <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">به این محصول علاقه‌مندید؟</h3>
                             <p className="text-slate-700 dark:text-slate-100 mb-6 max-w-sm mx-auto">برای دریافت اطلاعات بیشتر و استعلام قیمت با ما تماس بگیرید.</p>
                             <Link
                                to={`/contact?product=${encodeURIComponent(t(product.name))}`}
                                className="inline-flex items-center gap-3 bg-primary dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary/90 dark:hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
                             >
                                 <Phone size={20}/>
                                 تماس بگیرید
                             </Link>
                             <div className="mt-4 flex flex-col items-center gap-1" dir="ltr">
                                 <a href="tel:02166745916" className="text-slate-800 dark:text-slate-100 font-semibold hover:text-primary transition-colors">۰۲۱-۶۶۷۴۵۹۱۶</a>
                                 <a href="tel:09931635153" className="text-slate-800 dark:text-slate-100 font-semibold hover:text-primary transition-colors">۰۹۹۳۱۶۳۵۱۵۳</a>
                             </div>
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
    const product = productsData.find(p => p.slug === slug);
    const title = product ? t(product.name) : t('products.title', 'Product');

    const specProperties = product?.specs
      ? Object.entries(product.specs).map(([key, value]) => ({
          "@type": "PropertyValue",
          "name": t(key),
          "value": t(String(value)),
        }))
      : [];

    const productJsonLd = product ? {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": title,
      "image": product.image?.startsWith('http') ? product.image : `https://armanhamrah.com${product.image}`,
      "brand": { "@type": "Brand", "name": t(product.brand_id) },
      "category": product.category_id,
      "url": `https://armanhamrah.com/product/${product.slug}`,
      ...(specProperties.length > 0 ? { "additionalProperty": specProperties } : {}),
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "IRR",
        "price": product.price ? product.price.replace(/[^\d]/g, '') : undefined,
        "url": `https://armanhamrah.com/product/${product.slug}`
      }
    } : undefined;

    return (
      <HelmetProvider>
        <SEO 
          title={`${title} | Arman Hamrah`}
          description={`Details for ${title}`}
          type="product"
          url={product ? `https://armanhamrah.com/product/${product.slug}` : undefined}
          image={product?.image?.startsWith('http') ? product.image : (product ? `https://armanhamrah.com${product.image}` : undefined)}
          jsonLd={productJsonLd}
        />
        <div className="min-h-screen bg-background">
          <Navbar />
          <ProductDetailPageContent />
          <Footer />
        </div>
      </HelmetProvider>
    );
};

export default ProductDetailPage;
