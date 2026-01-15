import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { z } from 'zod';

const productSchema = z.object({
  name_fa: z.string().trim().min(1, 'نام فارسی الزامی است').max(200, 'نام فارسی حداکثر 200 کاراکتر'),
  name_en: z.string().trim().max(200, 'نام انگلیسی حداکثر 200 کاراکتر').optional().nullable(),
  image_url: z.string().trim().url('آدرس تصویر معتبر نیست').max(1000, 'آدرس تصویر حداکثر 1000 کاراکتر'),
  link: z.string().trim().url('لینک معتبر نیست').max(1000, 'لینک حداکثر 1000 کاراکتر'),
  category: z.string().trim().max(100, 'دسته‌بندی حداکثر 100 کاراکتر'),
  brand: z.string().trim().max(100, 'برند حداکثر 100 کاراکتر'),
});

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

const ProductsTab = ({ products, onRefresh }: ProductsTabProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name_fa: '',
    name_en: '',
    image_url: '',
    link: '',
    category: '',
    brand: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [editUploading, setEditUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'خطا',
        description: 'فقط فایل‌های تصویری (JPEG, PNG, WebP, GIF) مجاز هستند',
        variant: 'destructive',
      });
      return false;
    }
    
    if (file.size > maxSize) {
      toast({
        title: 'خطا',
        description: 'حجم فایل نباید بیشتر از 5 مگابایت باشد',
        variant: 'destructive',
      });
      return false;
    }
    
    return true;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!validateFile(file)) return null;
    
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    
    if (!fileExt || !allowedExtensions.includes(fileExt)) {
      toast({
        title: 'خطا',
        description: 'پسوند فایل معتبر نیست',
        variant: 'destructive',
      });
      return null;
    }
    
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: 'خطا',
        description: 'خطا در آپلود تصویر',
        variant: 'destructive',
      });
      return null;
    }

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      setNewProduct({ ...newProduct, image_url: url });
      setErrors({ ...errors, image_url: '' });
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;

    setEditUploading(true);
    const url = await uploadImage(file);
    if (url) {
      setEditingProduct({ ...editingProduct, image_url: url });
    }
    setEditUploading(false);
    if (editFileInputRef.current) editFileInputRef.current.value = '';
  };

  const validateProduct = (product: typeof newProduct): boolean => {
    try {
      productSchema.parse(product);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleAddProduct = async () => {
    const productData = {
      name_fa: newProduct.name_fa.trim(),
      name_en: newProduct.name_en.trim() || null,
      image_url: newProduct.image_url.trim(),
      link: newProduct.link.trim(),
      category: newProduct.category.trim() || 'عمومی',
      brand: newProduct.brand.trim() || 'سایر',
    };

    if (!validateProduct(productData)) return;

    const { error } = await supabase.from('products').insert(productData);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در افزودن محصول', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'محصول با موفقیت اضافه شد' });
    setNewProduct({ name_fa: '', name_en: '', image_url: '', link: '', category: '', brand: '' });
    setErrors({});
    onRefresh();
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    const productData = {
      name_fa: editingProduct.name_fa.trim(),
      name_en: editingProduct.name_en?.trim() || null,
      image_url: editingProduct.image_url.trim(),
      link: editingProduct.link.trim(),
      category: editingProduct.category.trim(),
      brand: editingProduct.brand.trim(),
    };

    if (!validateProduct(productData)) return;

    const { error } = await supabase
      .from('products')
      .update({ ...productData, is_active: editingProduct.is_active })
      .eq('id', editingProduct.id);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در ویرایش محصول', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'محصول با موفقیت ویرایش شد' });
    setEditingProduct(null);
    setErrors({});
    onRefresh();
  };

  const handleDeleteProduct = async (id: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در حذف محصول', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'محصول با موفقیت حذف شد' });
    setDeleteConfirm(null);
    onRefresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Add Product Form */}
      <div className="card-premium p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          افزودن محصول جدید
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>نام فارسی *</Label>
            <Input
              value={newProduct.name_fa}
              onChange={(e) => setNewProduct({ ...newProduct, name_fa: e.target.value })}
              placeholder="نام محصول"
              maxLength={200}
            />
            {errors.name_fa && <p className="text-destructive text-xs mt-1">{errors.name_fa}</p>}
          </div>
          <div>
            <Label>نام انگلیسی</Label>
            <Input
              value={newProduct.name_en}
              onChange={(e) => setNewProduct({ ...newProduct, name_en: e.target.value })}
              placeholder="Product name"
              dir="ltr"
              maxLength={200}
            />
          </div>
          <div>
            <Label>تصویر محصول *</Label>
            <div className="flex gap-2">
              <Input
                value={newProduct.image_url}
                onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                placeholder="آدرس تصویر یا آپلود کنید"
                dir="ltr"
                className="flex-1"
                maxLength={1000}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? '⏳' : <Upload className="w-4 h-4" />}
              </Button>
            </div>
            {errors.image_url && <p className="text-destructive text-xs mt-1">{errors.image_url}</p>}
            {newProduct.image_url && (
              <img
                src={newProduct.image_url}
                alt="Preview"
                className="mt-2 w-20 h-20 object-contain rounded border border-border"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
          </div>
          <div>
            <Label>لینک محصول *</Label>
            <Input
              value={newProduct.link}
              onChange={(e) => setNewProduct({ ...newProduct, link: e.target.value })}
              placeholder="https://..."
              dir="ltr"
              maxLength={1000}
            />
            {errors.link && <p className="text-destructive text-xs mt-1">{errors.link}</p>}
          </div>
          <div>
            <Label>دسته‌بندی</Label>
            <Input
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              placeholder="موبایل"
              maxLength={100}
            />
          </div>
          <div>
            <Label>برند</Label>
            <Input
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              placeholder="Apple"
              dir="ltr"
              maxLength={100}
            />
          </div>
        </div>
        <Button onClick={handleAddProduct} className="mt-4 btn-gold" disabled={uploading}>
          <Plus className="w-4 h-4 ml-2" />
          افزودن
        </Button>
      </div>

      {/* Products List */}
      <div className="card-premium p-6">
        <h2 className="text-lg font-semibold mb-4">لیست محصولات ({products.length})</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`p-4 rounded-lg border ${product.is_active ? 'bg-secondary/30 border-border' : 'bg-muted/50 border-destructive/30'}`}
            >
              {editingProduct?.id === product.id ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={editingProduct.image_url}
                        alt={editingProduct.name_fa}
                        className="w-24 h-24 object-contain rounded border border-border"
                        onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                      />
                      <input
                        ref={editFileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                        onChange={handleEditFileSelect}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2"
                        onClick={() => editFileInputRef.current?.click()}
                        disabled={editUploading}
                      >
                        {editUploading ? '⏳' : <ImageIcon className="w-3 h-3" />}
                      </Button>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">نام فارسی</Label>
                        <Input
                          value={editingProduct.name_fa}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name_fa: e.target.value })}
                          maxLength={200}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">نام انگلیسی</Label>
                        <Input
                          value={editingProduct.name_en || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name_en: e.target.value })}
                          dir="ltr"
                          maxLength={200}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">برند</Label>
                        <Input
                          value={editingProduct.brand}
                          onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                          dir="ltr"
                          maxLength={100}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">دسته‌بندی</Label>
                        <Input
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          maxLength={100}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">لینک</Label>
                        <Input
                          value={editingProduct.link}
                          onChange={(e) => setEditingProduct({ ...editingProduct, link: e.target.value })}
                          dir="ltr"
                          maxLength={1000}
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-4">
                        <Switch
                          checked={editingProduct.is_active}
                          onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, is_active: checked })}
                        />
                        <Label className="text-xs">فعال</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" onClick={handleUpdateProduct} className="btn-gold">
                      <Save className="w-4 h-4 ml-1" />
                      ذخیره
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => { setEditingProduct(null); setErrors({}); }}>
                      <X className="w-4 h-4 ml-1" />
                      انصراف
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <img
                    src={product.image_url}
                    alt={product.name_fa}
                    className="w-16 h-16 object-contain rounded border border-border"
                    onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name_fa}</h3>
                    {product.name_en && <p className="text-sm text-muted-foreground" dir="ltr">{product.name_en}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.brand} | {product.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${product.is_active ? 'bg-green-500/20 text-green-600' : 'bg-destructive/20 text-destructive'}`}>
                      {product.is_active ? 'فعال' : 'غیرفعال'}
                    </span>
                    <Button size="sm" variant="ghost" onClick={() => setEditingProduct(product)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={deleteConfirm === product.id ? 'destructive' : 'ghost'}
                      className={deleteConfirm !== product.id ? 'text-destructive hover:text-destructive' : ''}
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      {deleteConfirm === product.id ? <span className="text-xs">تایید حذف</span> : <Trash2 className="w-4 h-4" />}
                    </Button>
                    {deleteConfirm === product.id && (
                      <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-center text-muted-foreground py-8">هیچ محصولی وجود ندارد</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsTab;
