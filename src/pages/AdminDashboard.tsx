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
  Users, Settings, Home, Phone, Mail, MapPin, AlertTriangle, Shield,
  UserPlus, Key, Check, Globe, MessageSquare
} from 'lucide-react';
import { User } from '@supabase/supabase-js';
import pageBg from '@/assets/page-bg.jpeg';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const newUserSchema = z.object({
  email: z.string().trim().email('ایمیل معتبر نیست').max(255),
  password: z.string().min(6, 'رمز عبور حداقل 6 کاراکتر'),
  first_name: z.string().trim().min(1, 'نام الزامی است').max(100),
  last_name: z.string().trim().max(100).optional(),
  role: z.enum(['admin', 'editor']),
});

const settingSchema = z.object({
  key: z.string().trim().min(1, 'کلید الزامی است').max(100),
  value: z.string().trim().min(1, 'مقدار الزامی است').max(1000),
  category: z.string().trim().max(50),
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

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  category: string;
}

interface UserWithRole {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([]);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [editingSetting, setEditingSetting] = useState<SiteSetting | null>(null);
  const [selectedPage, setSelectedPage] = useState('home');
  const [newProduct, setNewProduct] = useState({
    name_fa: '',
    name_en: '',
    image_url: '',
    link: '',
    category: '',
    brand: '',
  });
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'editor' as 'admin' | 'editor',
  });
  const [newSetting, setNewSetting] = useState({
    key: '',
    value: '',
    category: 'general',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [editUploading, setEditUploading] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const pages = [
    { id: 'home', name: 'صفحه اصلی', icon: Home },
    { id: 'contact', name: 'تماس با ما', icon: Phone },
  ];

  const settingCategories = [
    { id: 'general', name: 'عمومی', icon: Globe },
    { id: 'contact', name: 'اطلاعات تماس', icon: Phone },
    { id: 'social', name: 'شبکه‌های اجتماعی', icon: MessageSquare },
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
      fetchAllData();
    } catch (err) {
      await supabase.auth.signOut();
      navigate('/admin/auth');
    }
  };

  const fetchAllData = async () => {
    await Promise.all([
      fetchProducts(),
      fetchPageContents(),
      fetchSiteSettings(),
      fetchUsers(),
    ]);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setProducts(data);
    }
  };

  const fetchPageContents = async () => {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .order('page', { ascending: true });

    if (!error && data) {
      setPageContents(data);
    }
  };

  const fetchSiteSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('category', { ascending: true });

    if (!error && data) {
      setSiteSettings(data);
    }
  };

  const fetchUsers = async () => {
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('user_id, role, created_at');

    if (rolesError || !rolesData) return;

    const { data: profilesData } = await supabase
      .from('profiles')
      .select('user_id, first_name, last_name');

    const usersWithRoles: UserWithRole[] = rolesData.map((role) => {
      const profile = profilesData?.find(p => p.user_id === role.user_id);
      return {
        id: role.user_id,
        email: '',
        first_name: profile?.first_name || null,
        last_name: profile?.last_name || null,
        role: role.role,
        created_at: role.created_at || '',
      };
    });

    setUsers(usersWithRoles);
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

    toast({ title: 'موفق', description: 'محصول با موفقیت اضافه شد' });
    setNewProduct({ name_fa: '', name_en: '', image_url: '', link: '', category: '', brand: '' });
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
      return;
    }

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
    fetchProducts();
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
      .update({ content_value: content.content_value.trim() })
      .eq('id', content.id);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در ذخیره محتوا', variant: 'destructive' });
      setSavingContent(false);
      return;
    }

    toast({ title: 'موفق', description: 'محتوا با موفقیت ذخیره شد' });
    setEditingContent(null);
    setSavingContent(false);
    fetchPageContents();
  };

  const handleCreateUser = async () => {
    setErrors({});
    
    try {
      newUserSchema.parse(newUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setCreatingUser(true);

    try {
      // Create user using Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email.trim(),
        password: newUser.password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: {
            first_name: newUser.first_name.trim(),
            last_name: newUser.last_name.trim(),
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Add role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role: newUser.role,
          });

        if (roleError) throw roleError;
      }

      toast({ title: 'موفق', description: 'کاربر با موفقیت ایجاد شد' });
      setNewUser({ email: '', password: '', first_name: '', last_name: '', role: 'editor' });
      fetchUsers();
    } catch (error: any) {
      let message = 'خطا در ایجاد کاربر';
      if (error.message?.includes('already registered')) {
        message = 'این ایمیل قبلا ثبت شده است';
      }
      toast({ title: 'خطا', description: message, variant: 'destructive' });
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === user?.id) {
      toast({ title: 'خطا', description: 'نمی‌توانید خودتان را حذف کنید', variant: 'destructive' });
      return;
    }

    if (deleteConfirm !== userId) {
      setDeleteConfirm(userId);
      return;
    }

    const { error } = await supabase.from('user_roles').delete().eq('user_id', userId);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در حذف نقش کاربر', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'نقش کاربر با موفقیت حذف شد' });
    setDeleteConfirm(null);
    fetchUsers();
  };

  const handleAddSetting = async () => {
    setErrors({});
    
    try {
      settingSchema.parse(newSetting);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[`setting_${err.path[0]}`] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    const { error } = await supabase.from('site_settings').insert({
      key: newSetting.key.trim(),
      value: newSetting.value.trim(),
      category: newSetting.category,
    });

    if (error) {
      toast({ title: 'خطا', description: 'خطا در افزودن تنظیم', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'تنظیم با موفقیت اضافه شد' });
    setNewSetting({ key: '', value: '', category: 'general' });
    fetchSiteSettings();
  };

  const handleUpdateSetting = async () => {
    if (!editingSetting) return;

    const { error } = await supabase
      .from('site_settings')
      .update({
        key: editingSetting.key.trim(),
        value: editingSetting.value.trim(),
        category: editingSetting.category,
      })
      .eq('id', editingSetting.id);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در ویرایش تنظیم', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'تنظیم با موفقیت ویرایش شد' });
    setEditingSetting(null);
    fetchSiteSettings();
  };

  const handleDeleteSetting = async (id: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }

    const { error } = await supabase.from('site_settings').delete().eq('id', id);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در حذف تنظیم', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'تنظیم با موفقیت حذف شد' });
    setDeleteConfirm(null);
    fetchSiteSettings();
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">محصولات</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">محتوا</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">کاربران</span>
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
                              <div className="flex items-center gap-2 pt-5">
                                <Switch
                                  checked={editingProduct.is_active}
                                  onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, is_active: checked })}
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
                            className="w-16 h-16 object-contain rounded"
                            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{product.name_fa}</p>
                              {!product.is_active && (
                                <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">غیرفعال</span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{product.brand} - {product.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => { setEditingProduct(product); setDeleteConfirm(null); }}>
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
                      <div key={content.id} className="p-4 rounded-lg border border-border bg-secondary/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getContentIcon(content.content_key)}
                            <Label className="font-medium">{getContentLabel(content.content_key)}</Label>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{content.section}</span>
                          </div>
                          {editingContent?.id !== content.id && (
                            <Button size="sm" variant="ghost" onClick={() => setEditingContent(content)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        
                        {editingContent?.id === content.id ? (
                          <div className="space-y-3">
                            {content.content_value.length > 100 ? (
                              <Textarea
                                value={editingContent.content_value}
                                onChange={(e) => setEditingContent({ ...editingContent, content_value: e.target.value })}
                                rows={4}
                                className="resize-none"
                                maxLength={10000}
                              />
                            ) : (
                              <Input
                                value={editingContent.content_value}
                                onChange={(e) => setEditingContent({ ...editingContent, content_value: e.target.value })}
                                maxLength={10000}
                              />
                            )}
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleUpdateContent(editingContent)} disabled={savingContent} className="btn-gold">
                                <Save className="w-4 h-4 ml-1" />
                                {savingContent ? 'در حال ذخیره...' : 'ذخیره'}
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setEditingContent(null)}>
                                <X className="w-4 h-4 ml-1" />
                                انصراف
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm leading-relaxed">{content.content_value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Add User Form */}
              <div className="card-premium p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  افزودن کاربر جدید
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label>ایمیل *</Label>
                    <Input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="email@example.com"
                      dir="ltr"
                      maxLength={255}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label>رمز عبور *</Label>
                    <Input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="حداقل 6 کاراکتر"
                      dir="ltr"
                    />
                    {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <Label>نام *</Label>
                    <Input
                      value={newUser.first_name}
                      onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                      placeholder="نام"
                      maxLength={100}
                    />
                    {errors.first_name && <p className="text-destructive text-xs mt-1">{errors.first_name}</p>}
                  </div>
                  <div>
                    <Label>نام خانوادگی</Label>
                    <Input
                      value={newUser.last_name}
                      onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                      placeholder="نام خانوادگی"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <Label>نقش *</Label>
                    <Select value={newUser.role} onValueChange={(value: 'admin' | 'editor') => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">ادمین</SelectItem>
                        <SelectItem value="editor">ویرایشگر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleCreateUser} className="mt-4 btn-gold" disabled={creatingUser}>
                  <UserPlus className="w-4 h-4 ml-2" />
                  {creatingUser ? 'در حال ایجاد...' : 'ایجاد کاربر'}
                </Button>
              </div>

              {/* Users List */}
              <div className="card-premium p-6">
                <h2 className="text-lg font-semibold mb-4">لیست کاربران ({users.length})</h2>
                <div className="space-y-4">
                  {users.map((u) => (
                    <div key={u.id} className="p-4 rounded-lg border border-border bg-secondary/20 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {u.first_name || u.last_name ? `${u.first_name || ''} ${u.last_name || ''}`.trim() : 'بدون نام'}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs ${u.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
                              {u.role === 'admin' ? 'ادمین' : 'ویرایشگر'}
                            </span>
                            {u.id === user?.id && <span className="text-xs text-green-600">(شما)</span>}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {u.id !== user?.id && (
                          <>
                            <Button
                              size="sm"
                              variant={deleteConfirm === u.id ? 'destructive' : 'ghost'}
                              className={deleteConfirm !== u.id ? 'text-destructive hover:text-destructive' : ''}
                              onClick={() => handleDeleteUser(u.id)}
                            >
                              {deleteConfirm === u.id ? <span className="text-xs">تایید حذف</span> : <Trash2 className="w-4 h-4" />}
                            </Button>
                            {deleteConfirm === u.id && (
                              <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(null)}>
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  {users.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">هیچ کاربری وجود ندارد</p>
                  )}
                </div>
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
              {/* Security Status */}
              <div className="card-premium p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  وضعیت امنیتی
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="font-medium">احراز هویت سمت سرور</span>
                    </div>
                    <p className="text-sm text-muted-foreground">فعال</p>
                  </div>
                  <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="font-medium">RLS روی جداول</span>
                    </div>
                    <p className="text-sm text-muted-foreground">فعال</p>
                  </div>
                  <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="font-medium">اعتبارسنجی ورودی‌ها</span>
                    </div>
                    <p className="text-sm text-muted-foreground">فعال</p>
                  </div>
                </div>
              </div>

              {/* Add Setting Form */}
              <div className="card-premium p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  افزودن تنظیم جدید
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>کلید *</Label>
                    <Input
                      value={newSetting.key}
                      onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                      placeholder="مثال: phone_main"
                      dir="ltr"
                      maxLength={100}
                    />
                    {errors.setting_key && <p className="text-destructive text-xs mt-1">{errors.setting_key}</p>}
                  </div>
                  <div>
                    <Label>مقدار *</Label>
                    <Input
                      value={newSetting.value}
                      onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                      placeholder="مقدار تنظیم"
                      maxLength={1000}
                    />
                    {errors.setting_value && <p className="text-destructive text-xs mt-1">{errors.setting_value}</p>}
                  </div>
                  <div>
                    <Label>دسته‌بندی</Label>
                    <Select value={newSetting.category} onValueChange={(value) => setNewSetting({ ...newSetting, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {settingCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddSetting} className="mt-4 btn-gold">
                  <Plus className="w-4 h-4 ml-2" />
                  افزودن
                </Button>
              </div>

              {/* Settings List */}
              <div className="card-premium p-6">
                <h2 className="text-lg font-semibold mb-4">تنظیمات سایت ({siteSettings.length})</h2>
                
                {settingCategories.map((category) => {
                  const categorySettings = siteSettings.filter(s => s.category === category.id);
                  if (categorySettings.length === 0) return null;
                  
                  return (
                    <div key={category.id} className="mb-6">
                      <h3 className="text-md font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                        <category.icon className="w-4 h-4" />
                        {category.name}
                      </h3>
                      <div className="space-y-3">
                        {categorySettings.map((setting) => (
                          <div key={setting.id} className="p-4 rounded-lg border border-border bg-secondary/20">
                            {editingSetting?.id === setting.id ? (
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div>
                                    <Label className="text-xs">کلید</Label>
                                    <Input
                                      value={editingSetting.key}
                                      onChange={(e) => setEditingSetting({ ...editingSetting, key: e.target.value })}
                                      dir="ltr"
                                      maxLength={100}
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs">مقدار</Label>
                                    <Input
                                      value={editingSetting.value}
                                      onChange={(e) => setEditingSetting({ ...editingSetting, value: e.target.value })}
                                      maxLength={1000}
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs">دسته‌بندی</Label>
                                    <Select value={editingSetting.category} onValueChange={(value) => setEditingSetting({ ...editingSetting, category: value })}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {settingCategories.map((cat) => (
                                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={handleUpdateSetting} className="btn-gold">
                                    <Save className="w-4 h-4 ml-1" />
                                    ذخیره
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => setEditingSetting(null)}>
                                    <X className="w-4 h-4 ml-1" />
                                    انصراف
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm" dir="ltr">{setting.key}</p>
                                  <p className="text-muted-foreground">{setting.value}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="ghost" onClick={() => { setEditingSetting(setting); setDeleteConfirm(null); }}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={deleteConfirm === setting.id ? 'destructive' : 'ghost'}
                                    className={deleteConfirm !== setting.id ? 'text-destructive hover:text-destructive' : ''}
                                    onClick={() => handleDeleteSetting(setting.id)}
                                  >
                                    {deleteConfirm === setting.id ? <span className="text-xs">تایید</span> : <Trash2 className="w-4 h-4" />}
                                  </Button>
                                  {deleteConfirm === setting.id && (
                                    <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(null)}>
                                      <X className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {siteSettings.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">هیچ تنظیمی وجود ندارد</p>
                )}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;