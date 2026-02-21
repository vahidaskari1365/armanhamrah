import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Package, FileText, Users, Settings, AlertTriangle, BarChart3 } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import pageBg from '@/assets/page-bg.jpeg';

import AdminHeader from '@/components/admin/AdminHeader';
import ProductsTab from '@/components/admin/ProductsTab';
import SiteManagementTab from '@/components/admin/SiteManagementTab';
import UsersTab from '@/components/admin/UsersTab';
import SettingsTab from '@/components/admin/SettingsTab';
import AnalyticsTab from '@/components/admin/AnalyticsTab';

// Interfaces (as before)
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

interface PageContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_fa: string;
  content_en: string;
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
  const [activeTab, setActiveTab] = useState('analytics');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;
    
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (!session) {
        navigate('/admin/auth');
      } else {
        setUser(session.user);
        checkAdminRole(session.user);
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (!session) {
        navigate('/admin/auth');
      } else if (session.user !== user) {
        setUser(session.user);
        checkAdminRole(session.user);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, user]);

  const checkAdminRole = async (user: User) => {
    if (user.email === 'vahid.askari1986@gmail.com') {
      setIsAdmin(true);
      setLoading(false);
      fetchAllData();
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error || !data) {
        setIsAdmin(false);
        toast({
          title: 'دسترسی غیرمجاز',
          description: 'شما دسترسی ادمین ندارید',
          variant: 'destructive',
        });
        navigate('/'); 
      } else {
        setIsAdmin(true);
        fetchAllData();
      }
    } catch (err) {
      navigate('/admin/auth');
    } finally {
      setLoading(false);
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
    if (!error && data) setProducts(data);
  };

  const fetchPageContents = async () => {
    const { data, error } = await supabase.from('page_content').select('*');
    if (!error && data) setPageContents(data as PageContent[]);
  };

  const fetchSiteSettings = async () => {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (!error && data) setSiteSettings(data);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase.rpc('get_users_with_roles');
    if (!error && data) {
        const userList = data.map((u: any) => ({ ...u, id: u.user_id }));
        setUsers(userList);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
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
      <AdminHeader user={user} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="analytics"><BarChart3 className="w-4 h-4 ml-2" />آمار</TabsTrigger>
            <TabsTrigger value="products"><Package className="w-4 h-4 ml-2" />محصولات</TabsTrigger>
            <TabsTrigger value="content"><FileText className="w-4 h-4 ml-2" />مدیریت محتوا</TabsTrigger>
            <TabsTrigger value="users"><Users className="w-4 h-4 ml-2" />کاربران</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 ml-2" />تنظیمات</TabsTrigger>
          </TabsList>
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
          <TabsContent value="products">
            <ProductsTab products={products} onRefresh={fetchProducts} />
          </TabsContent>
          <TabsContent value="content">
            <SiteManagementTab pageContents={pageContents} onRefresh={fetchPageContents} />
          </TabsContent>
          <TabsContent value="users">
            <UsersTab users={users} currentUser={user} onRefresh={fetchUsers} />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab siteSettings={siteSettings} onRefresh={fetchSiteSettings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
