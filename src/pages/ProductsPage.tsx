import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { PlusCircle, Loader2, Search } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ChatWidget from '@/components/ChatWidget';
import EditableText from '@/components/admin/EditableText';
import EditableProductCard from '@/components/admin/EditableProductCard';
import ProductEditor from '@/components/admin/ProductEditor';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';

// Expanded Product type to include full relations for editing
export interface Product {
  id: string;
  name: string;
  description?: string;
  slug: string;
  image: string;
  brand_id: string; // Keep relation IDs for editing
  category_id: string;
  brand: { name: string }; 
  category: { name: string };
  specs: Record<string, string>;
}
export interface Brand { id: string; name: string; }
export interface Category { id: string; name: string; }

// --- Data Fetching and Mutation Functions ---
const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, brand:brands(name), category:categories(name)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as unknown as Product[];
};

const fetchBrands = async (): Promise<Brand[]> => {
  const { data, error } = await supabase.from('brands').select('id, name').order('name');
  if (error) throw new Error(error.message);
  return data;
};

const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from('categories').select('id, name').order('name');
  if (error) throw new Error(error.message);
  return data;
};

const deleteProduct = async (productId: string) => {
  const { error } = await supabase.from('products').delete().eq('id', productId);
  if (error) throw new Error(error.message);
};

const ProductsPageContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const { isEditMode } = useAdmin();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // --- Filter and Search State ---
  const [selectedBrand, setSelectedBrand] = useState<string>(() => searchParams.get('brand') || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce user input

  // --- Editor State ---
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // --- Queries ---
  const { data: products, isLoading: isLoadingProducts, error: productsError } = useQuery<Product[]>({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: brands, isLoading: isLoadingBrands } = useQuery<Brand[]>({ queryKey: ['brands'], queryFn: fetchBrands });
  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });

  // --- Mutations ---
  const deleteMutation = useMutation({ 
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: t('delete_product.success.title', 'Success'), description: t('delete_product.success.description', 'Product deleted successfully.') });
    },
    onError: (error) => {
      toast({ title: t('delete_product.error.title', 'Error'), description: t('delete_product.error.description', `Failed to delete product: ${error.message}`), variant: 'destructive' });
    }
  });

  // Update brand from URL search param
  useEffect(() => {
    const brandParam = searchParams.get('brand');
    if (brandParam) setSelectedBrand(brandParam);
  }, [searchParams]);
  
  // --- Filtering Logic ---
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const brandMatch = selectedBrand === 'all' || product.brand.name === selectedBrand;
      const categoryMatch = selectedCategory === 'all' || product.category.name === selectedCategory;
      const searchMatch = debouncedSearchTerm.trim() === '' || 
                          t(product.name).toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                          t(product.brand.name).toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      return brandMatch && categoryMatch && searchMatch;
    });
  }, [products, selectedBrand, selectedCategory, debouncedSearchTerm, t]);

  // --- Event Handlers ---
  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    if (brandName === 'all') searchParams.delete('brand');
    else searchParams.set('brand', brandName);
    setSearchParams(searchParams, { replace: true });
  };

  const handleCategoryClick = (categoryName: string) => setSelectedCategory(categoryName);
  const handleAddProduct = () => { setProductToEdit(null); setIsEditorOpen(true); };
  const handleEditProduct = (product: Product) => { setProductToEdit(product); setIsEditorOpen(true); };
  const handleDeleteProduct = (productId: string) => deleteMutation.mutate(productId);
  
  return (
    <>
      <div className="min-h-screen bg-background relative admin-toolbar-offset" dir={language === 'fa' ? 'rtl' : 'ltr'}>
        <Navbar />
        <main className="pt-24 relative z-10">
          <section className="py-16">
            <div className="container-custom">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                 <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  <EditableText contentKey="products-page-title" defaultValue={t('products_page.title', 'Our Products')} as="span" />
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  <EditableText contentKey="products-page-description" defaultValue={t('products_page.description', 'Here you can see our latest and highest quality products.')} as="span" multiline />
                </p>
              </motion.div>
            </div>
          </section>

          {isEditMode && (
            <div className="container-custom text-center mb-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Button onClick={handleAddProduct} size="lg" className="btn-gold gap-2 shadow-lg">
                  <PlusCircle />
                  {t('products.add_new', 'Add New Product')}
                </Button>
              </motion.div>
            </div>
          )}

          <section className="py-8 border-y border-border sticky top-[48px] bg-background/80 backdrop-blur-sm z-20">
              <div className="container-custom">
                <div className="flex flex-col gap-8">
                  <div className="relative max-w-md mx-auto">
                      <Search className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${language === 'fa' ? 'right-4' : 'left-4'}`} size={20} />
                      <Input 
                          type="text"
                          placeholder={t('products.search_placeholder', 'Search by product name or brand...')}
                          className={`w-full bg-background border-border rounded-full shadow-lg hover:shadow-primary/10 focus:shadow-primary/20 transition-all duration-300 ease-in-out ${language === 'fa' ? 'pr-12' : 'pl-12'}`} 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">{t('products.brand', 'Brand:')}</span>
                    <button onClick={() => handleBrandClick('all')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedBrand === 'all' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-primary/90 hover:text-primary-foreground'}`}>{t('all', 'All')}</button>
                    {isLoadingBrands ? <Loader2 className="animate-spin" /> : brands?.map((brand) => (
                      <button key={brand.id} onClick={() => handleBrandClick(brand.name)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedBrand === brand.name ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-primary/90 hover:text-primary-foreground'}`}>
                        {t(brand.name, brand.name)}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">{t('products.category', 'Category:')}</span>
                    <button onClick={() => handleCategoryClick('all')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-primary/90 hover:text-primary-foreground'}`}>{t('all', 'All')}</button>
                    {isLoadingCategories ? <Loader2 className="animate-spin" /> : categories?.map((category) => (
                      <button key={category.id} onClick={() => handleCategoryClick(category.name)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.name ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-primary/90 hover:text-primary-foreground'}`}>
                        {t(category.name, category.name)}
                      </button>
                    ))}
                  </div>
                </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-custom">
              {isLoadingProducts && (
                <div className="text-center py-16"><Loader2 className="animate-spin mx-auto text-primary" size={32} /></div>
              )}
              {productsError && (
                <div className="text-center py-16"><p className="text-destructive">{t('products.load_error', 'Error loading products')}: {productsError.message}</p></div>
              )}
              {!isLoadingProducts && (
                <AnimatePresence>
                  <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map((product, index) => (
                      <EditableProductCard 
                        key={product.id} 
                        product={product} 
                        index={index}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
               {!isLoadingProducts && filteredProducts?.length === 0 && (
                <div className="text-center py-16"><p className="text-muted-foreground text-lg">{t('products.noProducts', 'No products found.')}</p></div>
              )}
            </div>
          </section>
        </main>
        <Footer />
        <ChatWidget />
      </div>
      <ProductEditor 
          isOpen={isEditorOpen} 
          onClose={() => setIsEditorOpen(false)} 
          productToEdit={productToEdit}
      />
    </>
  );
};

const ProductsPage = () => {
  const { t } = useLanguage();
  return (
    <HelmetProvider>
      <SEO title={t('products.seo.title', 'Products | Arman Hamrah')} description={t('products.seo.description', 'Browse our wide range of products.')} />
      <ProductsPageContent />
    </HelmetProvider>
  );
};

export default ProductsPage;
