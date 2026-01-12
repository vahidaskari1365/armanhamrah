import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, Package, FileText, 
  Plus, Trash2, Edit, Save, X, Upload, Image as ImageIcon,
  Users, Settings, Home, Phone, Mail, MapPin, AlertTriangle, Shield
} from 'lucide-react';
import { User } from '@supabase/supabase-js';
import pageBg from '@/assets/page-bg.jpeg';
import { z } from 'zod';

// Validation schemas
const productSchema = z.object({
  name_fa: z.string().trim().min(1, 'نام فارسی الزامی است').max(200, 'نام فارسی حداکثر 200 کاراکتر'),
  name_en: z.string().trim().max(200, 'نام انگلیسی حداکثر 200 کاراکتر').optional().nullable(),
  image_url: z.string().trim().url('آدرس تصویر معتبر نیست').max(1000, 'آدرس تصویر حداکثر 1000 کاراکتر'),
  link: z.string().trim().url('لینک معتبر نیست').max(1000, 'لینک حداکثر 1000 کاراکتر'),
  category: z.string().trim().max(100, 'دسته‌بندی حداکثر 100 کاراکتر'),
  brand: z.string().trim().max(100, 'برند حداکثر 100 کاراکتر'),
});

const contentSchema = z.object({
  content_value: z.string().trim().min(1, 'محتوا نمی‌تواند خالی باشد').max(10000, 'محتوا حداکثر 10000 کاراکتر'),
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

interface PageContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string | null;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [selectedPage, setSelectedPage] = useState('home');
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
  const [savingContent, setSavingContent] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const pages = [
    { id: 'home', name: 'صفحه اصلی', icon: Home },
    { id: 'contact', name: 'تماس با ما', icon: Phone },
  ];

  // File type validation
  const validateFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
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

    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

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
    // Reset input
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
    // Reset input
    if (editFileInputRef.current) editFileInputRef.current.value = '';
  };

  useEffect(() => {
    let isMounted = true;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;
        
        if (!session) {
          navigate('/admin/auth');
          return;
        }
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlock
          setTimeout(() => {
            if (isMounted) {
              checkAdminRole(session.user.id);
            }
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      
      if (!session) {
        navigate('/admin/auth');
        return;
      }
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    try {
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

      setIsAdmin(true);
      setLoading(false);
      fetchProducts();
      fetchPageContents();
    } catch (err) {
      await supabase.auth.signOut();
      navigate('/admin/auth');
    }
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

  const fetchPageContents = async () => {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .order('page', { ascending: true });

    if (error) {
      toast({
        title: 'خطا',
        description: 'خطا در دریافت محتوا',
        variant: 'destructive',
      });
      return;
    }

    setPageContents(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
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

    if (!validateProduct(productData)) {
      toast({
        title: 'خطا',
        description: 'لطفا خطاهای فرم را برطرف کنید',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase.from('products').insert(productData);

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
    setErrors({});
    fetchProducts();
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

    if (!validateProduct(productData)) {
      toast({
        title: 'خطا',
        description: 'لطفا خطاهای فرم را برطرف کنید',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('products')
      .update({
        ...productData,
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
    setErrors({});
    fetchProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }

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

    setDeleteConfirm(null);
    fetchProducts();
  };

  const handleUpdateContent = async (content: PageContent) => {
    try {
      contentSchema.parse({ content_value: content.content_value });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'خطا',
          description: error.errors[0]?.message || 'محتوا معتبر نیست',
          variant: 'destructive',
        });
        return;
      }
    }

    setSavingContent(true);
    const { error } = await supabase
      .from('page_content')
      .update({
        content_value: content.content_value.trim(),
      })
      .eq('id', content.id);

    if (error) {
      toast({
        title: 'خطا',
        description: 'خطا در ذخیره محتوا',
        variant: 'destructive',
      });
      setSavingContent(false);
      return;
    }

    toast({
      title: 'موفق',
      description: 'محتوا با موفقیت ذخیره شد',
    });

    setEditingContent(null);
    setSavingContent(false);
    fetchPageContents();
  };

  const filteredContents = pageContents.filter(c => c.page === selectedPage);

  const getContentLabel = (key: string): string => {
    const labels: Record<string, string> = {
      'hero_title': 'عنوان اصلی',
      'hero_subtitle': 'زیرعنوان',
      'hero_description': 'توضیحات',
      'services_title': 'عنوان خدمات',
      'about_title': 'عنوان درباره ما',
      'about_description': 'توضیحات درباره ما',
      'contact_phone': 'تلفن',
      'contact_email': 'ایمیل',
      'contact_address': 'آدرس',
      'contact_title': 'عنوان تماس',
    };
    return labels[key] || key;
  };

  const getContentIcon = (key: string) => {
    if (key.includes('phone')) return <Phone className="w-4 h-4" />;
    if (key.includes('email')) return <Mail className="w-4 h-4" />;
    if (key.includes('address')) return <MapPin className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-lg text-muted-foreground">در حال بررسی دسترسی...</div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center card-premium p-8">
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">دسترسی غیرمجاز</h1>
          <p className="text-muted-foreground mb-4">شما اجازه دسترسی به این صفحه را ندارید</p>
          <Button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-background bg-background min-h-screen" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">پنل مدیریت</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="خروج">
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
              <span className="hidden sm:inline">محصولات</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">محتوا</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">تنظیمات</span>
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
                    {errors.name_en && <p className="text-destructive text-xs mt-1">{errors.name_en}</p>}
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
                        {uploading ? (
                          <span className="animate-spin">⏳</span>
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
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
                    {errors.category && <p className="text-destructive text-xs mt-1">{errors.category}</p>}
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
                    {errors.brand && <p className="text-destructive text-xs mt-1">{errors.brand}</p>}
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
                                  onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, name_fa: e.target.value })
                                  }
                                  maxLength={200}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">نام انگلیسی</Label>
                                <Input
                                  value={editingProduct.name_en || ''}
                                  onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, name_en: e.target.value })
                                  }
                                  dir="ltr"
                                  maxLength={200}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">برند</Label>
                                <Input
                                  value={editingProduct.brand}
                                  onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, brand: e.target.value })
                                  }
                                  dir="ltr"
                                  maxLength={100}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">دسته‌بندی</Label>
                                <Input
                                  value={editingProduct.category}
                                  onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, category: e.target.value })
                                  }
                                  maxLength={100}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">لینک</Label>
                                <Input
                                  value={editingProduct.link}
                                  onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, link: e.target.value })
                                  }
                                  dir="ltr"
                                  maxLength={1000}
                                />
                              </div>
                              <div className="flex items-center gap-2 pt-5">
                                <Switch
                                  checked={editingProduct.is_active}
                                  onCheckedChange={(checked) =>
                                    setEditingProduct({ ...editingProduct, is_active: checked })
                                  }
                                />
                                <Label className="text-xs">فعال</Label>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button size="sm" onClick={handleUpdateProduct} className="btn-gold">
                              <Save className="w-4 h-4 ml-1" />
                              ذخیره
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingProduct(null);
                                setErrors({});
                              }}
                            >
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
                            className="w-16 h-16 object-contain rounded"
                            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{product.name_fa}</p>
                              {!product.is_active && (
                                <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">
                                  غیرفعال
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {product.brand} - {product.category}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingProduct(product);
                                setDeleteConfirm(null);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={deleteConfirm === product.id ? 'destructive' : 'ghost'}
                              className={deleteConfirm !== product.id ? 'text-destructive hover:text-destructive' : ''}
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              {deleteConfirm === product.id ? (
                                <span className="text-xs">تایید حذف</span>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                            {deleteConfirm === product.id && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setDeleteConfirm(null)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
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
              className="space-y-6"
            >
              {/* Page Selector */}
              <div className="card-premium p-4">
                <div className="flex flex-wrap gap-2">
                  {pages.map((page) => (
                    <Button
                      key={page.id}
                      variant={selectedPage === page.id ? 'default' : 'outline'}
                      onClick={() => setSelectedPage(page.id)}
                      className="flex items-center gap-2"
                    >
                      <page.icon className="w-4 h-4" />
                      {page.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Content Editor */}
              <div className="card-premium p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  ویرایش محتوای {pages.find(p => p.id === selectedPage)?.name}
                </h2>
                
                {filteredContents.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>هنوز محتوایی برای این صفحه ثبت نشده است.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredContents.map((content) => (
                      <div
                        key={content.id}
                        className="p-4 rounded-lg border border-border bg-secondary/20"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getContentIcon(content.content_key)}
                            <Label className="font-medium">
                              {getContentLabel(content.content_key)}
                            </Label>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                              {content.section}
                            </span>
                          </div>
                          {editingContent?.id !== content.id && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingContent(content)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        
                        {editingContent?.id === content.id ? (
                          <div className="space-y-3">
                            {content.content_type === 'text' || !content.content_type ? (
                              content.content_value.length > 100 ? (
                                <Textarea
                                  value={editingContent.content_value}
                                  onChange={(e) =>
                                    setEditingContent({
                                      ...editingContent,
                                      content_value: e.target.value,
                                    })
                                  }
                                  rows={4}
                                  className="resize-none"
                                  maxLength={10000}
                                />
                              ) : (
                                <Input
                                  value={editingContent.content_value}
                                  onChange={(e) =>
                                    setEditingContent({
                                      ...editingContent,
                                      content_value: e.target.value,
                                    })
                                  }
                                  maxLength={10000}
                                />
                              )
                            ) : (
                              <Input
                                value={editingContent.content_value}
                                onChange={(e) =>
                                  setEditingContent({
                                    ...editingContent,
                                    content_value: e.target.value,
                                  })
                                }
                                dir="ltr"
                                maxLength={10000}
                              />
                            )}
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleUpdateContent(editingContent)}
                                disabled={savingContent}
                                className="btn-gold"
                              >
                                <Save className="w-4 h-4 ml-1" />
                                {savingContent ? 'در حال ذخیره...' : 'ذخیره'}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingContent(null)}
                              >
                                <X className="w-4 h-4 ml-1" />
                                انصراف
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {content.content_value}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="card-premium p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  تنظیمات سایت
                </h2>
                <div className="grid gap-6">
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      وضعیت امنیتی
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        احراز هویت سمت سرور فعال
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        RLS روی جداول فعال
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        اعتبارسنجی ورودی‌ها فعال
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <h3 className="font-medium mb-2">اطلاعات تماس</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      اطلاعات تماس سایت را از بخش محتوا و صفحه تماس با ما ویرایش کنید.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedPage('contact');
                        const contentTab = document.querySelector('[data-value="content"]');
                        if (contentTab instanceof HTMLElement) {
                          contentTab.click();
                        }
                      }}
                    >
                      رفتن به ویرایش محتوا
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <h3 className="font-medium mb-2">مدیریت کاربران</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      برای افزودن ادمین جدید، باید از طریق پایگاه داده اقدام کنید.
                    </p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">ادمین فعلی: {user?.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;