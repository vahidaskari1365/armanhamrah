import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductEditorProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: any | null;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ isOpen, onClose, productToEdit }) => {
  const { toast } = useToast();
  const [nameFa, setNameFa] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [link, setLink] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!productToEdit;

  useEffect(() => {
    if (isOpen && productToEdit) {
      setNameFa(productToEdit.name_fa || '');
      setNameEn(productToEdit.name_en || '');
      setLink(productToEdit.link || '');
      setBrand(productToEdit.brand || '');
      setCategory(productToEdit.category || '');
      setImageUrl(productToEdit.image_url || '');
    } else if (!isOpen) {
      setNameFa(''); setNameEn(''); setLink(''); setBrand(''); setCategory(''); setImageUrl('');
    }
  }, [isOpen, productToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameFa || !link || !brand || !category || !imageUrl) {
      toast({ title: 'خطا', description: 'لطفاً همه فیلدهای الزامی را پر کنید', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    const payload = { name_fa: nameFa, name_en: nameEn || null, link, brand, category, image_url: imageUrl };

    try {
      if (isEditMode) {
        const { error } = await supabase.from('products').update(payload).eq('id', productToEdit.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([payload]);
        if (error) throw error;
      }
      toast({ title: 'موفقیت', description: `محصول با موفقیت ${isEditMode ? 'بروزرسانی' : 'ایجاد'} شد.` });
      onClose();
    } catch (error: any) {
      toast({ title: 'خطا', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-[150] flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
          className="bg-background border rounded-2xl w-[95%] max-w-lg p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{isEditMode ? 'ویرایش محصول' : 'افزودن محصول جدید'}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}><X /></Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="نام فارسی *" value={nameFa} onChange={e => setNameFa(e.target.value)} />
            <Input placeholder="نام انگلیسی" value={nameEn} onChange={e => setNameEn(e.target.value)} />
            <Input placeholder="لینک *" value={link} onChange={e => setLink(e.target.value)} />
            <Input placeholder="برند *" value={brand} onChange={e => setBrand(e.target.value)} />
            <Input placeholder="دسته‌بندی *" value={category} onChange={e => setCategory(e.target.value)} />
            <Input placeholder="آدرس تصویر *" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={onClose}>لغو</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : (isEditMode ? 'ذخیره' : 'ایجاد')}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductEditor;