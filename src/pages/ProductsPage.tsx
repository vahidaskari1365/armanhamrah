
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader2, Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import BackgroundImage from '../assets/radical-logo.jpeg';
import { productsData } from '@/data/products';
import { matchesSearch } from '@/lib/searchNormalize';

// Define interfaces for our data structures
export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: string;
  slug: string;
  image: string;
  brand_id: string;
  category_id: string;
  brand: { name: string };
  category: { name: string };
  specs: Record<string, string>;
}
export interface ProductWithExtra extends Product { extraSpecs?: string; }
export interface Brand { id: string; name: string; }
export interface Category { id: string; name: string; }

// --- LOCAL DATA FETCHING FUNCTIONS ---

const fetchProducts = async (): Promise<Product[]> => {
    const mappedProducts = productsData.map(p => ({
        ...p,
        id: p.slug,
        brand: { name: p.brand_id },
        category: { name: p.category_id } // Keep the full key like 'category.mobile'
    }));
    return mappedProducts as unknown as Product[];
};

const fetchBrands = async (): Promise<Brand[]> => {
    const brandNames = [...new Set(productsData.map(p => p.brand_id))].sort();
    return brandNames.map(name => ({ id: name, name }));
};

const fetchCategories = async (): Promise<Category[]> => {
    // Use the full category keys, the translation function will handle them
    const categoryKeys = [...new Set(productsData.map(p => p.category_id))].sort();
    return categoryKeys.map(key => ({ id: key, name: key }));
};

const CARD_SPEC_PRIORITY = [
  'spec.chip',
  'spec.chip_model',
  'spec.battery',
  'spec.ram',
  'spec.display',
  'spec.display_type',
] as const;

const getCardSpecs = (specs: Record<string, string>) => {
  const entries = Object.entries(specs);
  const prioritized = CARD_SPEC_PRIORITY
    .map((priorityKey) => entries.find(([key]) => key === priorityKey))
    .filter((entry): entry is [string, string] => Boolean(entry));

  const selectedKeys = new Set(prioritized.map(([key]) => key));
  const fallback = entries.filter(([key]) => !selectedKeys.has(key));

  return [...prioritized, ...fallback].slice(0, 4);
};

const ProductsPageContent = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedBrand, setSelectedBrand] = useState<string>(() => searchParams.get('brand') || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(() => searchParams.get('category') || 'all');
  const [searchTerm, setSearchTerm] = useState<string>(() => searchParams.get('q') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: brands, isLoading: isLoadingBrands } = useQuery<Brand[]>({ queryKey: ['brands'], queryFn: fetchBrands });
  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const brandMatch = selectedBrand === 'all' || product.brand.name === selectedBrand;
      const categoryMatch = selectedCategory === 'all' || product.category.name === selectedCategory;
      const q = debouncedSearchTerm.trim();
      const haystack = [
        product.name,
        t(product.name),
        product.brand.name,
        t(product.brand.name),
        t(product.category.name),
        product.slug,
      ].join(' ');
      const searchMatch = q === '' || matchesSearch(haystack, q);
      return brandMatch && categoryMatch && searchMatch;
    });
  }, [products, selectedBrand, selectedCategory, debouncedSearchTerm, t]);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    if (brandName === 'all') searchParams.delete('brand');
    else searchParams.set('brand', brandName);
    setSearchParams(searchParams, { replace: true });
  };
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (categoryName === 'all') searchParams.delete('category');
    else searchParams.set('category', categoryName);
    setSearchParams(searchParams, { replace: true });
  };
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) searchParams.delete('q');
    else searchParams.set('q', value);
    setSearchParams(searchParams, { replace: true });
  };
  const clearAllFilters = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSearchTerm('');
    setSearchParams({}, { replace: true });
  };
  const hasActiveFilters = selectedBrand !== 'all' || selectedCategory !== 'all' || searchTerm.trim() !== '';

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="pt-28 pb-16">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-12">
                  {t('products_page.title', 'Our Products')}
                </h1>
      
                <div className="relative max-w-xl mx-auto w-full mb-12">
                    <Search className={`absolute top-1/2 -translate-y-1/2 text-foreground ${language === 'fa' ? 'right-5' : 'left-5'}`} size={24} />
                    <Input 
                        type="text"
                        placeholder={t('products.search_placeholder', 'Search by product name or brand...')}
                        className={`h-14 w-full bg-card/80 backdrop-blur-sm border-2 border-border rounded-full shadow-lg text-lg hover:shadow-primary/10 focus:shadow-primary/20 focus:border-primary/50 transition-all duration-300 ease-in-out text-foreground ${language === 'fa' ? 'pr-14 pl-14' : 'pl-14 pr-14'}`}
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => handleSearchChange('')}
                        className={`absolute top-1/2 -translate-y-1/2 text-foreground hover:text-primary transition-colors ${language === 'fa' ? 'left-5' : 'right-5'}`}
                        aria-label={t('clear', 'Clear')}
                      >
                        <X size={20} />
                      </button>
                    )}
                </div>

                {/* Active filters bar */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                    <span className="text-sm text-foreground font-medium">
                      {filteredProducts.length} {t('products.results', 'results')}
                    </span>
                    {selectedBrand !== 'all' && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-sm font-medium">
                        {t(selectedBrand)}
                        <button onClick={() => handleBrandClick('all')} aria-label="remove">
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-sm font-medium">
                        {t(selectedCategory)}
                        <button onClick={() => handleCategoryClick('all')} aria-label="remove">
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-foreground font-medium hover:text-primary underline underline-offset-4"
                    >
                      {t('products.clear_filters', 'Clear all')}
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:items-start">
                    <aside className="lg:col-span-1 space-y-8 lg:sticky top-28 h-fit">
                        <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border/30">
                            <h3 className="text-xl font-bold mb-5 text-foreground">{t('products.brand', 'Brand')}</h3>
                            <div className="flex flex-col items-start gap-3">
                                <button onClick={() => handleBrandClick('all')} className={`w-full text-start px-4 py-2 rounded-lg text-base font-medium transition-all ${selectedBrand === 'all' ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}>{t('all', 'All')}</button>
                                {isLoadingBrands ? <Loader2 className="animate-spin" /> : brands?.map((brand) => (
                                <button key={brand.id} onClick={() => handleBrandClick(brand.name)} className={`w-full text-start px-4 py-2 rounded-lg text-base font-medium transition-all ${selectedBrand === brand.name ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}>
                                    {t(brand.name)}
                                </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border/30">
                            <h3 className="text-xl font-bold mb-5 text-foreground">{t('products.category', 'Category')}</h3>
                            <div className="flex flex-col items-start gap-3">
                                <button onClick={() => handleCategoryClick('all')} className={`w-full text-start px-4 py-2 rounded-lg text-base font-medium transition-all ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}>{t('all', 'All')}</button>
                                {isLoadingCategories ? <Loader2 className="animate-spin" /> : categories?.map((category) => (
                                <button key={category.id} onClick={() => handleCategoryClick(category.name)} className={`w-full text-start px-4 py-2 rounded-lg text-base font-medium transition-all ${selectedCategory === category.name ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}>
                                    {t(category.name)} 
                                </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <div className="lg:col-span-3">
                        {isLoadingProducts ? (
                            <div className="text-center py-16"><Loader2 className="animate-spin mx-auto text-primary" size={32} /></div>
                        ) : (
                            <AnimatePresence>
                            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => {
                                  const cardSpecs = getCardSpecs(product.specs);

                                  return (
                                <Link 
                                    key={product.slug} 
                                    to={`/product/${product.slug}`} 
                                    className="card-premium text-center block transition-all duration-300 group h-full flex flex-col"
                                >
                                    <div className="relative mb-4 overflow-hidden rounded-xl bg-secondary/50 p-4 h-48 flex items-center justify-center shrink-0">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy" 
                                            decoding="async"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/placeholder.svg';
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-sm md:text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 px-2">
                                        {t(product.name)}
                                    </h3>
                                    {cardSpecs.length > 0 && (
                                      <div className="px-3 mb-3 text-xs md:text-sm text-start space-y-1">
                                        {cardSpecs.map(([specKey, specValue]) => (
                                          <div key={specKey} className="flex items-center justify-between gap-2 text-muted-foreground">
                                            <span className="truncate">{t(specKey)}</span>
                                            <span className="font-medium text-foreground truncate">{t(specValue)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <p className="text-primary font-bold mb-3 text-sm">
                                        {product.price ? product.price : t('products.contact_for_price')}
                                    </p>
                                    <span className="inline-block mt-auto px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-gold">
                                        {t('products.view', 'View Details')}
                                    </span>
                                </Link>
                                  );
                                })}
                            </motion.div>
                            </AnimatePresence>
                        )}
                        {!isLoadingProducts && filteredProducts?.length === 0 && (
                            <div className="text-center py-16"><p className="text-foreground text-lg">{t('products.noProducts', 'No products matching your criteria.')}</p></div>
                        )}
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const ProductsPage = () => {
  const { t, language } = useLanguage();
  return (
    <HelmetProvider>
      <SEO 
        title={t('products.seo.title', 'Products | Arman Hamrah')} 
        description={t('products.seo.description', 'Browse our wide range of products.')}
      />
       <div className="min-h-screen w-full" dir={language === 'fa' ? 'rtl' : 'ltr'}>
            <div className="fixed inset-0 z-0">
                <img src={BackgroundImage} alt="Background" className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
            </div>
            <ProductsPageContent />
        </div>
    </HelmetProvider>
  );
};

export default ProductsPage;
