import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  X, 
  Home, 
  Package, 
  Shield, 
  Users, 
  FileText, 
  Phone, 
  Truck,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Layers,
  Eye,
  Edit3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';

interface PageInfo {
  path: string;
  name: string;
  icon: React.ElementType;
  sections: string[];
}

const pages: PageInfo[] = [
  { 
    path: '/', 
    name: 'صفحه اصلی', 
    icon: Home,
    sections: ['hero', 'brands', 'services', 'products', 'subsidiaries', 'guarantee']
  },
  { 
    path: '/products', 
    name: 'محصولات', 
    icon: Package,
    sections: ['hero', 'products']
  },
  { 
    path: '/warranty', 
    name: 'گارانتی', 
    icon: Shield,
    sections: ['hero', 'benefits', 'services', 'conditions']
  },
  { 
    path: '/representatives', 
    name: 'نمایندگان', 
    icon: Users,
    sections: ['hero', 'list']
  },
  { 
    path: '/export', 
    name: 'صادرات', 
    icon: Truck,
    sections: ['hero', 'features', 'partners']
  },
  { 
    path: '/blog', 
    name: 'بلاگ', 
    icon: FileText,
    sections: ['hero', 'articles']
  },
  { 
    path: '/contact', 
    name: 'تماس با ما', 
    icon: Phone,
    sections: ['hero', 'form', 'info']
  },
];

interface ContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
}

const AdminEditSidebar: React.FC = () => {
  const { isAdmin, isEditMode, toggleEditMode } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageContent, setCurrentPageContent] = useState<ContentItem[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const currentPage = pages.find(p => p.path === location.pathname) || pages[0];

  // Load content for current page
  useEffect(() => {
    if (!isAdmin || !isEditMode) return;

    const loadPageContent = async () => {
      const pageName = currentPage.path === '/' ? 'home' : currentPage.path.replace('/', '');
      
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page', pageName)
        .order('section', { ascending: true });

      if (data) {
        setCurrentPageContent(data);
      }
    };

    loadPageContent();
  }, [isAdmin, isEditMode, currentPage.path]);

  // Don't show on admin pages
  if (!isAdmin || location.pathname.startsWith('/admin')) return null;

  // Group content by section
  const contentBySection = currentPageContent.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const sectionNames: Record<string, string> = {
    hero: 'بنر اصلی',
    brands: 'برندها',
    services: 'خدمات',
    products: 'محصولات',
    subsidiaries: 'شرکت‌های زیرمجموعه',
    guarantee: 'گارانتی',
    benefits: 'مزایا',
    conditions: 'شرایط',
    list: 'لیست',
    features: 'ویژگی‌ها',
    partners: 'همکاران',
    articles: 'مقالات',
    form: 'فرم',
    info: 'اطلاعات',
  };

  return (
    <>
      {/* Toggle Button - Always visible when in edit mode */}
      <AnimatePresence>
        {isEditMode && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "fixed top-20 z-[90] bg-slate-900 text-white p-3 rounded-l-none rounded-r-lg shadow-xl transition-all",
              isOpen ? "right-80" : "right-0"
            )}
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <div className="flex items-center gap-2">
              {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              <span className="text-sm font-medium">پنل ویرایش</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isEditMode && isOpen && (
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-12 right-0 w-80 h-[calc(100vh-48px)] bg-slate-900 border-l border-slate-700 z-[89] shadow-2xl"
            dir="rtl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-white font-bold text-lg flex items-center gap-2">
                    <Layers className="w-5 h-5 text-orange-500" />
                    پنل ویرایش
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Current Page Badge */}
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-2">
                  <currentPage.icon className="w-4 h-4 text-orange-500" />
                  <span className="text-white text-sm font-medium">{currentPage.name}</span>
                  <Badge variant="secondary" className="mr-auto text-xs bg-orange-500/20 text-orange-400">
                    در حال ویرایش
                  </Badge>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="p-4 border-b border-slate-700">
                <h3 className="text-slate-400 text-xs font-medium mb-3 flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  رفتن به صفحه دیگر
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {pages.map((page) => (
                    <button
                      key={page.path}
                      onClick={() => navigate(page.path)}
                      className={cn(
                        "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                        location.pathname === page.path
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                      )}
                    >
                      <page.icon className="w-4 h-4" />
                      <span className="text-[10px] truncate w-full text-center">{page.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sections List */}
              <ScrollArea className="flex-1 p-4">
                <h3 className="text-slate-400 text-xs font-medium mb-3">بخش‌های این صفحه</h3>
                <div className="space-y-2">
                  {currentPage.sections.map((section) => {
                    const sectionContent = contentBySection[section] || [];
                    const hasEdits = sectionContent.length > 0;
                    
                    return (
                      <button
                        key={section}
                        onClick={() => {
                          // Scroll to section
                          const element = document.getElementById(section);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                          setSelectedSection(section);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg transition-colors text-right",
                          selectedSection === section
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Edit3 className="w-4 h-4" />
                          <span className="text-sm">{sectionNames[section] || section}</span>
                        </div>
                        {hasEdits && (
                          <Badge variant="outline" className="text-[10px] border-green-500/50 text-green-400">
                            {sectionContent.length} ویرایش
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>

                <Separator className="my-4 bg-slate-700" />

                {/* Edited Content Summary */}
                {currentPageContent.length > 0 && (
                  <div>
                    <h3 className="text-slate-400 text-xs font-medium mb-3">محتوای ویرایش شده</h3>
                    <div className="space-y-2">
                      {currentPageContent.slice(0, 10).map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-800 rounded-lg p-2 text-xs"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px] border-slate-600">
                              {sectionNames[item.section] || item.section}
                            </Badge>
                            <span className="text-slate-500">{item.content_key}</span>
                          </div>
                          <p className="text-slate-400 truncate">
                            {item.content_value.substring(0, 50)}...
                          </p>
                        </div>
                      ))}
                      {currentPageContent.length > 10 && (
                        <p className="text-slate-500 text-center text-xs">
                          و {currentPageContent.length - 10} مورد دیگر...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </ScrollArea>

              {/* Footer Actions */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <Button
                    onClick={toggleEditMode}
                    variant="outline"
                    className="flex-1 border-orange-500/50 text-orange-400 hover:bg-orange-500/20"
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    خروج از ویرایش
                  </Button>
                  <Button
                    onClick={() => navigate('/admin')}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    داشبورد کامل
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isEditMode && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 z-[88] md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminEditSidebar;
