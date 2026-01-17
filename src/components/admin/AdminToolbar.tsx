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
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const AdminToolbar = () => {
  const { isAdmin, isEditMode, toggleEditMode, isLoading } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  if (isLoading || !isAdmin) return null;

  // Don't show on admin dashboard
  if (location.pathname.startsWith('/admin')) return null;

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
      >
        <div className="container mx-auto px-4 h-12 flex items-center justify-between">
          {/* Left Side - Logo & Site Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="text-white font-semibold text-sm hidden sm:inline">آرمان همراه</span>
            </div>
            
            {/* Status Badge */}
            <div className={cn(
              "px-2 py-0.5 rounded text-xs font-medium",
              isEditMode 
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                : "bg-green-500/20 text-green-400 border border-green-500/30"
            )}>
              {isEditMode ? 'حالت ویرایش' : 'حالت مشاهده'}
            </div>
          </div>

          {/* Center - Quick Actions */}
          <div className="hidden md:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 gap-1">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs">محتوا</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-slate-900 border-slate-700">
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
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 gap-1"
              onClick={() => navigate('/admin?tab=users')}
            >
              <Users className="w-4 h-4" />
              <span className="text-xs">کاربران</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 gap-1"
              onClick={() => navigate('/admin?tab=settings')}
            >
              <Settings className="w-4 h-4" />
              <span className="text-xs">تنظیمات</span>
            </Button>
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
                  <span className="text-xs hidden sm:inline">مشاهده</span>
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  <span className="text-xs hidden sm:inline">ویرایش</span>
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
                <DropdownMenuItem 
                  onClick={() => navigate('/')}
                  className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <Home className="w-4 h-4 ml-2" />
                  صفحه اصلی
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/admin')}
                  className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer md:hidden"
                >
                  <LayoutDashboard className="w-4 h-4 ml-2" />
                  داشبورد
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
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminToolbar;
