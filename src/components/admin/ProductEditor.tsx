import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2, Upload, AlertTriangle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Brand, Category, Product } from '@/pages/ProductsPage';

// --- Schema for form validation ---
const productSchema = z.object({
  name: z.string().min(3, 'نام محصول حداقل باید ۳ حرف باشد'),
  description: z.string().optional(),
  brand_id: z.string().uuid('برند انتخاب نشده است'),
  category_id: z.string().uuid('دسته بندی انتخاب نشده است'),
  image: z.string().optional(), // URL of the image
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductEditorProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null; // Full product object to edit
}

// --- Data Fetching Functions ---
const fetchBrands = async (): Promise<Brand[]> => {
    const { data, error } = await supabase.from('brands').select('id, name').order('name');
    if (error) throw new Error(error.message);
    return data;
  };
  
const fetchCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase.from('categories').select('id, name').order('name');
    if (error) throw new Error(error.message);
    return data;
};

const ProductEditor: React.FC<ProductEditorProps> = ({ isOpen, onClose, productToEdit }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const isEditMode = !!productToEdit;

  // --- React Hook Form setup ---
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // --- Data Queries ---
  const { data: brands, isLoading: isLoadingBrands } = useQuery<Brand[]>({ queryKey: ['brands'], queryFn: fetchBrands, enabled: isOpen });
  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories, enabled: isOpen });

  // --- Populate form with product data when editing ---
  useEffect(() => {
    if (isOpen && productToEdit) {
      setValue('name', productToEdit.name);
      // Note: brand and category are objects in Product, but we need IDs for the form
      // This requires fetching the full product details to get the IDs.
      // For now, we'll leave them blank and require the user to re-select.
      // A better implementation would fetch the product with its foreign key IDs.
      
      //setValue('brand_id', productToEdit.brand_id); 
      //setValue('category_id', productToEdit.category_id);
      
      if(productToEdit.image) {
          setImagePreview(productToEdit.image);
          setValue('image', productToEdit.image);
      }

    } else if (!isOpen) {
      reset();
      setImagePreview(null);
    }
  }, [isOpen, productToEdit, reset, setValue]);

  // --- Slugify Function ---
  const slugify = (text: string) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-')     // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
  }

  // --- Image Upload Handler ---
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('products') // Assumes a 'products' bucket in Supabase Storage
      .upload(fileName, file);

    if (error) {
      toast({ title: 'خطا در آپلود عکس', description: error.message, variant: 'destructive' });
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(data.path);
    setValue('image', publicUrl);
    setImagePreview(publicUrl);
    setIsUploading(false);
  };

  // --- Form Submission Mutation ---
  const mutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
        const slug = slugify(data.name);
        const payload = { ...data, slug };

        if (isEditMode) {
            const { error } = await supabase.from('products').update(payload).eq('id', productToEdit.id);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('products').insert(payload);
            if (error) throw error;
        }
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast({ title: 'موفقیت', description: `محصول با موفقیت ${isEditMode ? 'بروزرسانی' : 'ایجاد'} شد.` });
        onClose();
    },
    onError: (error: any) => {
        toast({ title: 'خطا', description: `خطا: ${error.message}`, variant: 'destructive' });
    }
  });

  const onSubmit = (data: ProductFormData) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-[150] flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900 border border-slate-700 rounded-2xl w-[95%] max-w-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
            <h2 className="text-lg font-semibold text-white">{isEditMode ? 'ویرایش محصول' : 'افزودن محصول جدید'}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Image */}
              <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-slate-300">تصویر محصول</label>
                 <div className="w-full aspect-square rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center relative overflow-hidden">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover"/>
                    ) : (
                        <div className="text-center text-slate-500">
                           <Upload size={40} className="mx-auto" />
                           <p className="mt-2 text-sm">برای آپلود کلیک کنید یا عکس را بکشید</p>
                        </div>
                    )}
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                            <Loader2 className="animate-spin text-white" size={40} />
                            <p className="text-white mt-2">در حال آپلود...</p>
                        </div>
                    )}
                    <Input 
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        disabled={isUploading || isSubmitting}
                    />
                 </div>
                 {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
              </div>

              {/* Right Column - Fields */}
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">نام محصول</label>
                  <Input {...register('name')} id="name" placeholder="مثال: iPhone 15 Pro" className="bg-slate-800 border-slate-600" />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="brand_id" className="block text-sm font-medium text-slate-300 mb-1.5">برند</label>
                    <Controller
                        name="brand_id"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoadingBrands}>
                                <SelectTrigger className="bg-slate-800 border-slate-600">
                                    <SelectValue placeholder={isLoadingBrands ? "در حال بارگذاری..." : "یک برند را انتخاب کنید"} />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600 text-white">
                                    {brands?.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.brand_id && <p className="mt-1 text-sm text-red-500">{errors.brand_id.message}</p>}
                </div>

                <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-slate-300 mb-1.5">دسته بندی</label>
                     <Controller
                        name="category_id"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoadingCategories}>
                                <SelectTrigger className="bg-slate-800 border-slate-600">
                                    <SelectValue placeholder={isLoadingCategories ? "در حال بارگذاری..." : "یک دسته را انتخاب کنید"} />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600 text-white">
                                    {categories?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category_id && <p className="mt-1 text-sm text-red-500">{errors.category_id.message}</p>}
                </div>

                 <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1.5">توضیحات (اختیاری)</label>
                  <Textarea {...register('description')} id="description" placeholder="ویژگی های اصلی محصول را وارد کنید..." className="bg-slate-800 border-slate-600 min-h-[100px]" />
                </div>
              </div>
            </div>

            {/* Storage Bucket Warning */}
            {mutation.error && mutation.error.message.includes('bucket not found') && (
                <div className='mt-4 p-3 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-start gap-3'>
                    <AlertTriangle className='w-5 h-5 mt-0.5'/>
                    <div>
                        <p className='font-semibold'>خطا: مخزن ذخیره سازی یافت نشد</p>
                        <p className='text-sm text-yellow-300/80 mt-1'>به نظر میرسد که شما هنوز مخزن (bucket) ذخیره سازی برای محصولات در Supabase ایجاد نکرده اید. لطفا یک bucket جدید با نام public <strong className='font-bold'>products</strong> بسازید و پالیسی های لازم را برای آپلود و مشاهده تصاویر روی آن اعمال کنید.</p>
                    </div>
                </div>
            )}

          </form>

          {/* Footer */}
          <div className="flex items-center justify-end p-4 border-t border-slate-700 flex-shrink-0 bg-slate-900/50 rounded-b-2xl">
             <Button variant="ghost" onClick={onClose} className="ml-2 text-slate-300 hover:text-white">لغو</Button>
             <Button type="submit" form="product-editor-form" disabled={isSubmitting || isUploading} className="btn-gold min-w-[120px]">
                {isSubmitting || isUploading ? <Loader2 className="animate-spin" /> : (isEditMode ? 'ذخیره تغییرات' : 'ایجاد محصول')}
             </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductEditor;
