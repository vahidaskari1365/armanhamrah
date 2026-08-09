import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileText, Edit, Save, X, Home, Phone, Mail, MapPin, Plus, Trash2 } from 'lucide-react';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contentSchema = z.object({
  content_value: z.string().trim().min(1, 'محتوا نمی‌تواند خالی باشد').max(10000, 'محتوا حداکثر 10000 کاراکتر'),
});

interface PageContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string | null;
}

interface ContentTabProps {
  pageContents: PageContent[];
  onRefresh: () => void;
}

const pages = [
  { id: 'home', name: 'صفحه اصلی', icon: Home },
  { id: 'contact', name: 'تماس با ما', icon: Phone },
  { id: 'warranty', name: 'گارانتی', icon: FileText },
  { id: 'export', name: 'صادرات', icon: FileText },
];

const sections = [
  { id: 'hero', name: 'هدر' },
  { id: 'brands', name: 'برندها' },
  { id: 'services', name: 'خدمات' },
  { id: 'products', name: 'محصولات' },
  { id: 'footer', name: 'فوتر' },
  { id: 'general', name: 'عمومی' },
];

const ContentTab = ({ pageContents, onRefresh }: ContentTabProps) => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [savingContent, setSavingContent] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContent, setNewContent] = useState({
    page: 'home',
    section: 'general',
    content_key: '',
    content_value: '',
    content_type: 'text',
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredContents = pageContents.filter(c => c.page === selectedPage);

  const getContentLabel = (key: string): string => {
    const labels: Record<string, string> = {
      'title_fa': 'عنوان فارسی',
      'title_en': 'عنوان انگلیسی',
      'subtitle_fa': 'زیرعنوان فارسی',
      'subtitle_en': 'زیرعنوان انگلیسی',
      'description_fa': 'توضیحات فارسی',
      'description_en': 'توضیحات انگلیسی',
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
    onRefresh();
  };

  const handleAddContent = async () => {
    if (!newContent.content_key.trim() || !newContent.content_value.trim()) {
      toast({ title: 'خطا', description: 'همه فیلدها الزامی هستند', variant: 'destructive' });
      return;
    }

    const { error } = await supabase.from('page_content').insert({
      page: newContent.page,
      section: newContent.section,
      content_key: newContent.content_key.trim(),
      content_value: newContent.content_value.trim(),
      content_type: newContent.content_type,
    });

    if (error) {
      toast({ title: 'خطا', description: 'خطا در افزودن محتوا', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'محتوا با موفقیت اضافه شد' });
    setNewContent({ page: 'home', section: 'general', content_key: '', content_value: '', content_type: 'text' });
    setShowAddForm(false);
    onRefresh();
  };

  const handleDeleteContent = async (id: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }

    const { error } = await supabase.from('page_content').delete().eq('id', id);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در حذف محتوا', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'محتوا با موفقیت حذف شد' });
    setDeleteConfirm(null);
    onRefresh();
  };

  return (
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

      {/* Add Content Form */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            افزودن محتوای جدید
          </h2>
          <Button
            variant={showAddForm ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'بستن' : 'نمایش فرم'}
          </Button>
        </div>
        
        {showAddForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>صفحه</Label>
              <Select value={newContent.page} onValueChange={(value) => setNewContent({ ...newContent, page: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>بخش</Label>
              <Select value={newContent.section} onValueChange={(value) => setNewContent({ ...newContent, section: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>کلید</Label>
              <Input
                value={newContent.content_key}
                onChange={(e) => setNewContent({ ...newContent, content_key: e.target.value })}
                placeholder="title_fa"
                dir="ltr"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Label>محتوا</Label>
              <Textarea
                value={newContent.content_value}
                onChange={(e) => setNewContent({ ...newContent, content_value: e.target.value })}
                placeholder="محتوای مورد نظر..."
                rows={3}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Button onClick={handleAddContent} className="btn-gold">
                <Plus className="w-4 h-4 ml-2" />
                افزودن
              </Button>
            </div>
          </div>
        )}
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
                  <div className="flex gap-2">
                    {editingContent?.id !== content.id && (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => setEditingContent(content)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={deleteConfirm === content.id ? 'destructive' : 'ghost'}
                          className={deleteConfirm !== content.id ? 'text-destructive hover:text-destructive' : ''}
                          onClick={() => handleDeleteContent(content.id)}
                        >
                          {deleteConfirm === content.id ? <span className="text-xs">تایید</span> : <Trash2 className="w-4 h-4" />}
                        </Button>
                        {deleteConfirm === content.id && (
                          <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
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
  );
};

export default ContentTab;
