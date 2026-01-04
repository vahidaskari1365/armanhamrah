import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, Settings, Package, FileText, Palette, 
  Plus, Trash2, Edit, Save, X 
} from 'lucide-react';
import { User } from '@supabase/supabase-js';

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

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name_fa: '',
    name_en: '',
    image_url: '',
    link: '',
    category: '',
    brand: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate('/admin/auth');
          return;
        }
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/auth');
        return;
      }
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (error || !data) {
      await supabase.auth.signOut();
      navigate('/admin/auth');
      toast({
        title: 'دسترسی غیرمجاز',
        description: 'شما دسترسی ادمین ندارید',
        variant: 'destructive',
      });
      return;
    }

    setLoading(false);
    fetchProducts();
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: 'خطا',
        description: 'خطا در دریافت محصولات',
        variant: 'destructive',
      });
      return;
    }

    setProducts(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
  };

  const handleAddProduct = async () => {
    if (!newProduct.name_fa || !newProduct.image_url || !newProduct.link) {
      toast({
        title: 'خطا',
        description: 'لطفا فیلدهای ضروری را پر کنید',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase.from('products').insert({
      name_fa: newProduct.name_fa,
      name_en: newProduct.name_en || null,
      image_url: newProduct.image_url,
      link: newProduct.link,
      category: newProduct.category || 'عمومی',
      brand: newProduct.brand || 'سایر',
    });

    if (error) {
      toast({
        title: 'خطا',
        description: 'خطا در افزودن محصول',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'موفق',
      description: 'محصول با موفقیت اضافه شد',
    });

    setNewProduct({
      name_fa: '',
      name_en: '',
      image_url: '',
      link: '',
      category: '',
      brand: '',
    });
    fetchProducts();
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    const { error } = await supabase
      .from('products')
      .update({
        name_fa: editingProduct.name_fa,
        name_en: editingProduct.name_en,
        image_url: editingProduct.image_url,
        link: editingProduct.link,
        category: editingProduct.category,
        brand: editingProduct.brand,
        is_active: editingProduct.is_active,
      })
      .eq('id', editingProduct.id);

    if (error) {
      toast({
        title: 'خطا',
        description: 'خطا در ویرایش محصول',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'موفق',
      description: 'محصول با موفقیت ویرایش شد',
    });

    setEditingProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      toast({
        title: 'خطا',
        description: 'خطا در حذف محصول',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'موفق',
      description: 'محصول با موفقیت حذف شد',
    });

    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">پنل مدیریت</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              محصولات
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              محتوا
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              تم و رنگ‌ها
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
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
                    />
                  </div>
                  <div>
                    <Label>نام انگلیسی</Label>
                    <Input
                      value={newProduct.name_en}
                      onChange={(e) => setNewProduct({ ...newProduct, name_en: e.target.value })}
                      placeholder="Product name"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label>لینک تصویر *</Label>
                    <Input
                      value={newProduct.image_url}
                      onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                      placeholder="https://..."
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label>لینک محصول *</Label>
                    <Input
                      value={newProduct.link}
                      onChange={(e) => setNewProduct({ ...newProduct, link: e.target.value })}
                      placeholder="https://..."
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label>دسته‌بندی</Label>
                    <Input
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      placeholder="موبایل"
                    />
                  </div>
                  <div>
                    <Label>برند</Label>
                    <Input
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                      placeholder="Apple"
                      dir="ltr"
                    />
                  </div>
                </div>
                <Button onClick={handleAddProduct} className="mt-4 btn-gold">
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
                      className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name_fa}
                        className="w-16 h-16 object-contain rounded"
                      />
                      {editingProduct?.id === product.id ? (
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                          <Input
                            value={editingProduct.name_fa}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, name_fa: e.target.value })
                            }
                          />
                          <Input
                            value={editingProduct.brand}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, brand: e.target.value })
                            }
                          />
                          <Input
                            value={editingProduct.category}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, category: e.target.value })
                            }
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleUpdateProduct}>
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingProduct(null)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <p className="font-medium">{product.name_fa}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.brand} - {product.category}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingProduct(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                  {products.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      هیچ محصولی وجود ندارد
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-premium p-6"
            >
              <h2 className="text-lg font-semibold mb-4">مدیریت محتوا</h2>
              <p className="text-muted-foreground">
                در این بخش می‌توانید متن‌ها و عکس‌های صفحات را مدیریت کنید.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                این بخش به زودی فعال می‌شود...
              </p>
            </motion.div>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-premium p-6"
            >
              <h2 className="text-lg font-semibold mb-4">تنظیمات تم و رنگ‌ها</h2>
              <p className="text-muted-foreground">
                در این بخش می‌توانید رنگ‌ها، فونت‌ها و تم سایت را تغییر دهید.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                این بخش به زودی فعال می‌شود...
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
