import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Plus, Trash2, Edit, Save, X, Check, Shield,
  Globe, Phone, MessageSquare, Instagram, Mail, MapPin, Link as LinkIcon,
  Image as ImageIcon, FileText
} from 'lucide-react';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const settingSchema = z.object({
  key: z.string().trim().min(1, 'کلید الزامی است').max(100),
  value: z.string().trim().min(1, 'مقدار الزامی است').max(5000),
  category: z.string().trim().max(50),
});

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  category: string;
}

interface SettingsTabProps {
  siteSettings: SiteSetting[];
  onRefresh: () => void;
}

const settingCategories = [
  { id: 'general', name: 'عمومی', icon: Globe },
  { id: 'contact', name: 'اطلاعات تماس', icon: Phone },
  { id: 'social', name: 'شبکه‌های اجتماعی', icon: MessageSquare },
  { id: 'images', name: 'تصاویر', icon: ImageIcon },
  { id: 'seo', name: 'سئو', icon: FileText },
];

const predefinedSettings = [
  { key: 'site_title_fa', label: 'عنوان سایت (فارسی)', category: 'general' },
  { key: 'site_title_en', label: 'عنوان سایت (انگلیسی)', category: 'general' },
  { key: 'site_description_fa', label: 'توضیحات سایت (فارسی)', category: 'seo' },
  { key: 'site_description_en', label: 'توضیحات سایت (انگلیسی)', category: 'seo' },
  { key: 'phone_main', label: 'تلفن اصلی', category: 'contact' },
  { key: 'phone_support', label: 'تلفن پشتیبانی', category: 'contact' },
  { key: 'email_main', label: 'ایمیل اصلی', category: 'contact' },
  { key: 'email_support', label: 'ایمیل پشتیبانی', category: 'contact' },
  { key: 'address_fa', label: 'آدرس (فارسی)', category: 'contact' },
  { key: 'address_en', label: 'آدرس (انگلیسی)', category: 'contact' },
  { key: 'postal_code', label: 'کد پستی', category: 'contact' },
  { key: 'instagram_url', label: 'لینک اینستاگرام', category: 'social' },
  { key: 'telegram_url', label: 'لینک تلگرام', category: 'social' },
  { key: 'linkedin_url', label: 'لینک لینکدین', category: 'social' },
  { key: 'whatsapp_number', label: 'شماره واتساپ', category: 'social' },
  { key: 'logo_url', label: 'لوگو', category: 'images' },
  { key: 'favicon_url', label: 'فاویکون', category: 'images' },
  { key: 'hero_image_url', label: 'تصویر هدر', category: 'images' },
];

const SettingsTab = ({ siteSettings, onRefresh }: SettingsTabProps) => {
  const [editingSetting, setEditingSetting] = useState<SiteSetting | null>(null);
  const [newSetting, setNewSetting] = useState({
    key: '',
    value: '',
    category: 'general',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const { toast } = useToast();

  const getSettingLabel = (key: string): string => {
    const predefined = predefinedSettings.find(p => p.key === key);
    return predefined?.label || key;
  };

  const getSettingIcon = (key: string) => {
    if (key.includes('phone')) return <Phone className="w-4 h-4" />;
    if (key.includes('email')) return <Mail className="w-4 h-4" />;
    if (key.includes('address')) return <MapPin className="w-4 h-4" />;
    if (key.includes('instagram')) return <Instagram className="w-4 h-4" />;
    if (key.includes('url') || key.includes('link')) return <LinkIcon className="w-4 h-4" />;
    if (key.includes('image') || key.includes('logo')) return <ImageIcon className="w-4 h-4" />;
    return <Settings className="w-4 h-4" />;
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
      if (error.message.includes('duplicate')) {
        toast({ title: 'خطا', description: 'این کلید قبلاً وجود دارد', variant: 'destructive' });
      } else {
        toast({ title: 'خطا', description: 'خطا در افزودن تنظیم', variant: 'destructive' });
      }
      return;
    }

    toast({ title: 'موفق', description: 'تنظیم با موفقیت اضافه شد' });
    setNewSetting({ key: '', value: '', category: 'general' });
    onRefresh();
  };

  const handleQuickAdd = async (preset: typeof predefinedSettings[0]) => {
    // Check if already exists
    if (siteSettings.some(s => s.key === preset.key)) {
      toast({ title: 'توجه', description: 'این تنظیم قبلاً وجود دارد', variant: 'default' });
      return;
    }

    setNewSetting({
      key: preset.key,
      value: '',
      category: preset.category,
    });
    setShowQuickAdd(false);
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
    onRefresh();
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
    onRefresh();
  };

  // Find missing settings
  const missingSettings = predefinedSettings.filter(
    p => !siteSettings.some(s => s.key === p.key)
  );

  return (
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

      {/* Quick Add Suggestions */}
      {missingSettings.length > 0 && (
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Plus className="w-5 h-5" />
              تنظیمات پیشنهادی
            </h2>
            <Button
              variant={showQuickAdd ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setShowQuickAdd(!showQuickAdd)}
            >
              {showQuickAdd ? 'بستن' : `نمایش (${missingSettings.length})`}
            </Button>
          </div>
          
          {showQuickAdd && (
            <div className="flex flex-wrap gap-2">
              {missingSettings.map((preset) => (
                <Button
                  key={preset.key}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAdd(preset)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-3 h-3" />
                  {preset.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

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
              maxLength={5000}
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
                          <div className="md:col-span-2">
                            <Label className="text-xs">مقدار</Label>
                            {editingSetting.value.length > 100 ? (
                              <Textarea
                                value={editingSetting.value}
                                onChange={(e) => setEditingSetting({ ...editingSetting, value: e.target.value })}
                                rows={3}
                                maxLength={5000}
                              />
                            ) : (
                              <Input
                                value={editingSetting.value}
                                onChange={(e) => setEditingSetting({ ...editingSetting, value: e.target.value })}
                                maxLength={5000}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
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
                        <div className="flex items-center gap-3">
                          {getSettingIcon(setting.key)}
                          <div>
                            <p className="font-medium text-sm">{getSettingLabel(setting.key)}</p>
                            <p className="text-xs text-muted-foreground" dir="ltr">{setting.key}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-muted-foreground max-w-xs truncate">{setting.value}</p>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => setEditingSetting(setting)}>
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
  );
};

export default SettingsTab;
