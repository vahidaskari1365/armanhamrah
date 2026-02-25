
import { useParams, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ArrowRight, AlertTriangle } from 'lucide-react';

import { productsData } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductDetailPageContent = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useLanguage();

    const product = productsData.find(p => p.slug === slug);

    if (!product) {
        return (
            <div className="text-center py-20 flex flex-col items-center gap-4 text-white min-h-screen justify-center">
                <AlertTriangle size={48} />
                <h2 className="text-2xl font-bold">{t('products.not_found', 'Product Not Found')}</h2>
                <Link to="/products" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
                    <ArrowRight size={20} />
                    {t('products.back_to_list', 'Back to Products')}
                </Link>
            </div>
        );
    }

    return (
        <main className="pt-24 relative z-10 pb-20">
            <div className="container-custom">
                <div className="mb-8">
                    <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                        <ArrowRight size={20} />
                        {t('products.back_to_list', 'Back to Products')}
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-white">
                    <div className="bg-secondary/50 rounded-2xl p-8 sticky top-28">
                        <img 
                            src={product.image} // CORRECTED PATH: Removed the extra slash
                            alt={t(product.name)}
                            className="w-full h-auto object-contain max-h-96"
                        />
                    </div>

                    <div>
                        <span className="text-primary font-semibold">{t(product.brand_id)}</span>
                        <h1 className="text-3xl md:text-4xl font-bold my-3">{t(product.name)}</h1>
                        <span className="text-lg text-muted-foreground">{t(product.category_id.replace('category.', ''))}</span>

                        {product.description && (
                            <p className="leading-relaxed mt-6">{t(product.description)}</p>
                        )}
                        
                        <div className="mt-10 pt-8 border-t border-border">
                            <h2 className="text-2xl font-semibold mb-6">{t('products.specs', 'Specifications')}</h2>
                            
                            {product.specs && Object.keys(product.specs).length > 0 ? (
                                <div className="space-y-4">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center bg-secondary/30 px-5 py-4 rounded-lg">
                                            <span className="font-medium text-muted-foreground">{t(key)}</span>
                                            <span className="font-semibold text-right">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>{t('products.specs_soon', 'Specifications will be added soon.')}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

const ProductDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useLanguage();
    const product = productsData.find(p => p.slug === slug);
    const title = product ? product.name : t('products.title', 'Product');

    return (
      <HelmetProvider>
        <SEO 
          title={`${title} | Arman Hamrah`}
          description={`Details for ${title}`}
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
