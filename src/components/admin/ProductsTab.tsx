import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit, Save, X, Upload, GripVertical } from 'lucide-react';
import { Reorder } from "framer-motion"
import { z } from 'zod';

const productSchema = z.object({
  name_fa: z.string().trim().min(1, 'نام فارسی الزامی است'),
  name_en: z.string().trim().optional().nullable(),
  link: z.string().trim().url('لینک معتبر نیست'),
});

interface Product {
  id: string;
  name_fa: string;
  name_en: string | null;
  description_fa: string | null;
  description_en: string | null;
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
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ name_fa: '', link: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Sort initial products by display_order when the component receives them
    const sortedProducts = [...initialProducts].sort((a, b) => a.display_order - b.display_order);
    setProducts(sortedProducts);
  }, [initialProducts]);

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('products').upload(fileName, file);
    if (error) {
      toast({ title: 'Error uploading image', description: error.message, variant: 'destructive' });
      return null;
    }
    const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
    return publicUrl;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, forEditing: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      if (forEditing && editingProduct) {
        setEditingProduct({ ...editingProduct, image_url: url });
      } else {
        setNewProduct({ ...newProduct, image_url: url });
      }
    }
    setUploading(false);
  };

  const handleAddProduct = async () => {
    const validation = productSchema.safeParse(newProduct);
    if(!validation.success) {
        const newErrors: Record<string, string> = {};
        validation.error.errors.forEach(err => {
            newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
        return;
    }

    const { error } = await supabase.from('products').insert([{
        ...newProduct,
        display_order: products.length, // Add to the end
    }]);
    if (error) {
      toast({ title: 'Error adding product', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'محصول با موفقیت اضافه شد', description: 'Product added successfully' });
      setNewProduct({ name_fa: '', link: '' });
      onRefresh();
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    const validation = productSchema.safeParse(editingProduct);
     if(!validation.success) {
        const newErrors: Record<string, string> = {};
        validation.error.errors.forEach(err => {
            newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
        return;
    }

    const { error } = await supabase.from('products').update(editingProduct).eq('id', editingProduct.id);
    if (error) {
      toast({ title: 'Error updating product', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'محصول با موفقیت ویرایش شد', description: 'Product updated successfully' });
      setEditingProduct(null);
      onRefresh();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error deleting product', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'محصول با موفقیت حذف شد', description: 'Product deleted successfully' });
      onRefresh();
    }
    setDeleteConfirm(null);
  };

  const handleReorder = async (newOrder: Product[]) => {
    setProducts(newOrder);
    const updates = newOrder.map((p, index) => 
      supabase.from('products').update({ display_order: index }).eq('id', p.id)
    );
    const results = await Promise.all(updates);
    const hasError = results.some(res => res.error);
    if (hasError) {
        toast({ title: 'خطا', description: 'خطا در ذخیره ترتیب جدید.', variant: 'destructive' });
    } else {
        toast({ title: 'موفق', description: 'ترتیب محصولات با موفقیت ذخیره شد.' });
        onRefresh();
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Add Product Form */}
        <div className="card-premium p-6">
            <h2 className="text-lg font-semibold mb-4">افزودن محصول جدید</h2>
            <div className="grid grid-cols-2 gap-4">
                <Input placeholder="نام فارسی" value={newProduct.name_fa || ''} onChange={e => setNewProduct({...newProduct, name_fa: e.target.value})} />
                <Input placeholder="لینک" value={newProduct.link || ''} onChange={e => setNewProduct({...newProduct, link: e.target.value})} />
            </div>
             {errors.name_fa && <p className="text-destructive text-xs mt-1">{errors.name_fa}</p>}
             {errors.link && <p className="text-destructive text-xs mt-1">{errors.link}</p>}
            <Button onClick={handleAddProduct} className="mt-4">افزودن</Button>
        </div>

        {/* Products List */}
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
                                    <Textarea value={editingProduct.description_fa || ''} onChange={e => setEditingProduct({...editingProduct, description_fa: e.target.value})} placeholder="توضیحات فارسی" />
                                    <Textarea value={editingProduct.description_en || ''} onChange={e => setEditingProduct({...editingProduct, description_en: e.target.value})} placeholder="English Description" />
                                    <Input value={editingProduct.link} onChange={e => setEditingProduct({...editingProduct, link: e.target.value})} />
                                     {errors.link && <p className="text-destructive text-xs mt-1">{errors.link}</p>}
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
