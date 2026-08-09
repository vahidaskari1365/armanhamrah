import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Save, X, GripVertical } from 'lucide-react';
import { Reorder } from "framer-motion";

interface Product {
  id: string;
  name_fa: string;
  name_en: string | null;
  image_url: string;
  link: string;
  category: string;
  brand: string;
  is_active: boolean;
  display_order: number;
}

interface ProductsTabProps {
  products: Product[];
  onRefresh: () => void;
}

const ProductsTab = ({ products: initialProducts, onRefresh }: ProductsTabProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({ name_fa: '', link: '', brand: '', category: '', image_url: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const sortedProducts = [...initialProducts].sort((a, b) => a.display_order - b.display_order);
    setProducts(sortedProducts);
  }, [initialProducts]);

  const handleAddProduct = async () => {
    if (!newProduct.name_fa || !newProduct.link || !newProduct.brand || !newProduct.category || !newProduct.image_url) {
      toast({ title: 'خطا', description: 'لطفاً همه فیلدها را پر کنید', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.from('products').insert([{
        name_fa: newProduct.name_fa,
        link: newProduct.link,
        brand: newProduct.brand,
        category: newProduct.category,
        image_url: newProduct.image_url,
        display_order: products.length,
    }]);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'محصول با موفقیت اضافه شد' });
      setNewProduct({ name_fa: '', link: '', brand: '', category: '', image_url: '' });
      onRefresh();
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    const { error } = await supabase.from('products').update({
      name_fa: editingProduct.name_fa,
      name_en: editingProduct.name_en,
      link: editingProduct.link,
      is_active: editingProduct.is_active,
    }).eq('id', editingProduct.id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'محصول با موفقیت ویرایش شد' });
      setEditingProduct(null);
      onRefresh();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (deleteConfirm !== id) { setDeleteConfirm(id); return; }
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'محصول با موفقیت حذف شد' });
      onRefresh();
    }
    setDeleteConfirm(null);
  };

  const handleReorder = async (newOrder: Product[]) => {
    setProducts(newOrder);
    const updates = newOrder.map((p, index) => 
      supabase.from('products').update({ display_order: index }).eq('id', p.id)
    );
    await Promise.all(updates);
    onRefresh();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="card-premium p-6">
            <h2 className="text-lg font-semibold mb-4">افزودن محصول جدید</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input placeholder="نام فارسی" value={newProduct.name_fa} onChange={e => setNewProduct({...newProduct, name_fa: e.target.value})} />
                <Input placeholder="لینک" value={newProduct.link} onChange={e => setNewProduct({...newProduct, link: e.target.value})} />
                <Input placeholder="برند" value={newProduct.brand} onChange={e => setNewProduct({...newProduct, brand: e.target.value})} />
                <Input placeholder="دسته‌بندی" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                <Input placeholder="آدرس تصویر" value={newProduct.image_url} onChange={e => setNewProduct({...newProduct, image_url: e.target.value})} className="col-span-2" />
            </div>
            <Button onClick={handleAddProduct} className="mt-4">افزودن</Button>
        </div>

        <div className="card-premium p-6">
            <h2 className="text-lg font-semibold mb-4">لیست محصولات ({products.length})</h2>
            <Reorder.Group axis="y" values={products} onReorder={handleReorder}>
                {products.map((product) => (
                    <Reorder.Item key={product.id} value={product}>
                        <div className="flex items-center gap-4 p-2 rounded-lg mb-2 bg-secondary/30">
                             <GripVertical className="cursor-grab" />
                            {editingProduct?.id === product.id ? (
                                <div className="flex-1 space-y-2">
                                    <Input value={editingProduct.name_fa} onChange={e => setEditingProduct({...editingProduct, name_fa: e.target.value})} />
                                    <Input value={editingProduct.name_en || ''} onChange={e => setEditingProduct({...editingProduct, name_en: e.target.value})} placeholder="نام انگلیسی" />
                                    <Input value={editingProduct.link} onChange={e => setEditingProduct({...editingProduct, link: e.target.value})} />
                                    <div className="flex items-center gap-2">
                                        <Switch checked={editingProduct.is_active} onCheckedChange={checked => setEditingProduct({...editingProduct, is_active: checked})} />
                                        <Label>فعال</Label>
                                    </div>
                                    <Button onClick={handleUpdateProduct} size="sm">ذخیره</Button>
                                    <Button onClick={() => setEditingProduct(null)} size="sm" variant="ghost">انصراف</Button>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-between">
                                    <span>{product.name_fa} ({product.brand})</span>
                                    <div>
                                        <Button onClick={() => setEditingProduct(product)} size="sm" variant="ghost"><Edit className="w-4 h-4" /></Button>
                                        <Button onClick={() => handleDeleteProduct(product.id)} size="sm" variant="ghost" className="text-destructive">
                                            {deleteConfirm === product.id ? 'تایید؟' : <Trash2 className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    </motion.div>
  );
};

export default ProductsTab;