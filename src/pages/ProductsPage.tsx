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
import BackgroundImage from '../assets/radical-logo.jpeg';

export interface Product {
  id: string;
  name: string;
  description?: string;
  slug: string;
  image: string;
  brand_id: string;
  category_id: string;
  brand: { name: string }; 
  category: { name: string };
  specs: Record<string, string>;
}
export interface Brand { id: string; name: string; }
export interface Category { id: string; name: string; }

const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, brand:brands(name), category:categories(name)')
    .order('name', { ascending: true }); // Sort by product name alphabetically
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
  const { t, language } = useLanguage();
  const { isEditMode } = useAdmin();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedBrand, setSelectedBrand] = useState<string>(() => searchParams.get('brand') || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const { data: products, isLoading: isLoadingProducts, error: productsError } = useQuery<Product[]>({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: brands, isLoading: isLoadingBrands } = useQuery<Brand[]>({ queryKey: ['brands'], queryFn: fetchBrands });
  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });

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

  useEffect(() => {
    const brandParam = searchParams.get('brand');
    if (brandParam) setSelectedBrand(brandParam);
  }, [searchParams]);
  
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
      <div 
        className="min-h-screen relative admin-toolbar-offset w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        dir={language === 'fa' ? 'rtl' : 'ltr'}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>

        <div className="relative z-10">
          <Navbar />
          <main>
            <section className="pb-16 pt-28">
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
            
            <section className="container-custom pb-16">
                <div className="relative max-w-xl mx-auto w-full mb-12">
                    <Search className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${language === 'fa' ? 'right-5' : 'left-5'}`} size={24} />
                    <Input 
                        type="text"
                        placeholder={t('products.search_placeholder', 'Search by product name or brand...')}
                        className={`h-14 w-full bg-background/80 border-2 border-border rounded-full shadow-lg text-lg hover:shadow-primary/10 focus:shadow-primary/20 focus:border-primary/50 transition-all duration-300 ease-in-out ${language === 'fa' ? 'pr-14' : 'pl-14'}`} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                  {/* --- Sidebar for Filters --- */}
                  <aside className="lg:col-span-1 space-y-8 lg:sticky top-24 h-fit">
                    {/* Brands Card */}
                    <div className="bg-background/70 p-6 rounded-xl shadow-lg border border-border/30">
                        <h3 className="text-xl font-bold mb-5 text-foreground">{t('products.brand', 'Brand')}</h3>
                        <div className="flex flex-col items-start gap-3">
                          <button onClick={() => handleBrandClick('all')} className={`w-full text-start px-4 py-2 rounded-lg text-base font-medium transition-all ${selectedBrand === 'all' ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}>{t('all', 'All')}</button>
                          {isLoadingBrands ? <Loader2 className="animate-spin" /> : brands?.map((brand) => (
                            <button key={brand.id} onClick={() => handleBrandClick(brand.name)} className={`w-full text-start px-4 py-2 rounded-lg text-base font-medium transition-all ${selectedBrand === brand.name ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}>
                              {t(brand.name, brand.name)}
                            </button>
                          ))}
                        </div>
                    </div>

                    {/* Categories Card */}
                    <div className="bg-background/70 p-6 rounded-xl shadow-lg border border-border/30">
                        <h3 className="text-xl font-bold mb-5 text-foreground">{t('products.category', 'Category')}</h3>
                        <div className="flex flex-col items-start gap-3">
                           <button onClick={() => handleCategoryClick('all')} className={`w-full text-start px-4 py-2 rounded-lg text-base font-medium transition-all ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}>{t('all', 'All')}</button>
                          {isLoadingCategories ? <Loader2 className="animate-spin" /> : categories?.map((category) => (
                            <button key={category.id} onClick={() => handleCategoryClick(category.name)} className={`w-full text-start px-4 py-2 rounded-lg text-base font-medium transition-all ${selectedCategory === category.name ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}>
                              {t(category.name, category.name)}
                            </button>
                          ))}
                        </div>
                    </div>
                  </aside>

                  {/* --- Products Grid --- */}
                  <div className="lg:col-span-3">
                    {isLoadingProducts && (
                      <div className="text-center py-16"><Loader2 className="animate-spin mx-auto text-primary" size={32} /></div>
                    )}
                    {productsError && (
                      <div className="text-center py-16"><p className="text-destructive">{t('products.load_error', 'Error loading products')}: {productsError.message}</p></div>
                    )}
                    {!isLoadingProducts && (
                      <AnimatePresence>
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                </div>
            </section>
          </main>
          <Footer />
          <ChatWidget />
        </div>
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
