import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  Edit, 
  Eye, 
  Settings, 
  LogOut, 
  Home,
  LayoutDashboard,
  ChevronDown,
  FileText,
  Package,
  Users,
  Shield,
  Phone,
  Truck,
  PanelRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const pages = [
  { path: '/', name: 'صفحه اصلی', icon: Home },
  { path: '/products', name: 'محصولات', icon: Package },
  { path: '/warranty', name: 'گارانتی', icon: Shield },
  { path: '/representatives', name: 'نمایندگان', icon: Users },
  { path: '/export', name: 'صادرات', icon: Truck },
  { path: '/blog', name: 'بلاگ', icon: FileText },
  { path: '/contact', name: 'تماس', icon: Phone },
];

const AdminToolbar = () => {
  const { isAdmin, isEditMode, toggleEditMode, isLoading } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  if (isLoading || !isAdmin) return null;

  // Don't show on admin dashboard
  if (location.pathname.startsWith('/admin')) return null;

  const currentPage = pages.find(p => p.path === location.pathname);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'خروج موفق',
      description: 'با موفقیت خارج شدید',
    });
    navigate('/');
  };

  // Add class to body for offset
  React.useEffect(() => {
    document.body.classList.add('has-admin-toolbar');
    return () => {
      document.body.classList.remove('has-admin-toolbar');
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-lg"
        dir="rtl"
      >
        <div className="container mx-auto px-4 h-12 flex items-center justify-between">
          {/* Left Side - Logo & Current Page */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="text-white font-semibold text-sm hidden sm:inline">آرمان همراه</span>
            </div>

            {/* Current Page Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 gap-1 border border-slate-700"
                >
                  {currentPage && <currentPage.icon className="w-4 h-4" />}
                  <span className="text-xs">{currentPage?.name || 'صفحه'}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-slate-900 border-slate-700 w-48">
                <DropdownMenuLabel className="text-slate-400 text-xs">صفحات سایت</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                {pages.map((page) => (
                  <DropdownMenuItem
                    key={page.path}
                    onClick={() => navigate(page.path)}
                    className={cn(
                      "cursor-pointer",
                      location.pathname === page.path
                        ? "bg-orange-500/20 text-orange-400"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    )}
                  >
                    <page.icon className="w-4 h-4 ml-2" />
                    {page.name}
                    {location.pathname === page.path && (
                      <Badge className="mr-auto text-[10px] bg-orange-500/30 text-orange-400 border-0">
                        فعلی
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Status Badge */}
            <div className={cn(
              "px-2 py-0.5 rounded text-xs font-medium hidden sm:flex items-center gap-1",
              isEditMode 
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                : "bg-green-500/20 text-green-400 border border-green-500/30"
            )}>
              {isEditMode ? <Edit className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {isEditMode ? 'حالت ویرایش' : 'حالت مشاهده'}
            </div>
          </div>

          {/* Center - Quick Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {pages.slice(0, 5).map((page) => (
              <Button
                key={page.path}
                variant="ghost"
                size="sm"
                onClick={() => navigate(page.path)}
                className={cn(
                  "h-7 px-2 gap-1",
                  location.pathname === page.path
                    ? "bg-orange-500/20 text-orange-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <page.icon className="w-3 h-3" />
                <span className="text-[11px]">{page.name}</span>
              </Button>
            ))}
          </div>

          {/* Right Side - Main Actions */}
          <div className="flex items-center gap-2">
            {/* Edit Mode Toggle */}
            <Button
              onClick={toggleEditMode}
              size="sm"
              className={cn(
                "h-8 gap-1 transition-all",
                isEditMode 
                  ? "bg-orange-600 hover:bg-orange-700 text-white" 
                  : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              )}
            >
              {isEditMode ? (
                <>
                  <Eye className="w-4 h-4" />
                  <span className="text-xs hidden sm:inline">خروج از ویرایش</span>
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  <span className="text-xs hidden sm:inline">شروع ویرایش</span>
                </>
              )}
            </Button>

            {/* Dashboard Link */}
            <Button
              onClick={() => navigate('/admin')}
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 gap-1"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-xs hidden sm:inline">داشبورد</span>
            </Button>

            {/* More Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 w-8 p-0">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 w-48">
                <DropdownMenuLabel className="text-slate-400 text-xs">مدیریت</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem 
                  onClick={() => navigate('/admin?tab=content')}
                  className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <FileText className="w-4 h-4 ml-2" />
                  مدیریت محتوا
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/admin?tab=products')}
                  className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <Package className="w-4 h-4 ml-2" />
                  مدیریت محصولات
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/admin?tab=users')}
                  className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <Users className="w-4 h-4 ml-2" />
                  کاربران
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/admin?tab=settings')}
                  className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <Settings className="w-4 h-4 ml-2" />
                  تنظیمات
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-slate-800 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 ml-2" />
                  خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Edit Mode Hint Bar */}
        <AnimatePresence>
          {isEditMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-orange-500/10 border-t border-orange-500/20 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-1.5 flex items-center justify-center gap-2 text-xs text-orange-400">
                <PanelRight className="w-3 h-3" />
                <span>حالت ویرایش فعال است - روی متن‌ها و تصاویر کلیک کنید تا ویرایش شوند</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminToolbar;
