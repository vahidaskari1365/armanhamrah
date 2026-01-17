import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { Camera, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EditableImageProps {
  contentKey: string;
  page: string;
  section: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({
  contentKey,
  page,
  section,
  defaultSrc,
  alt,
  className,
  containerClassName,
}) => {
  const { isEditMode } = useAdmin();
  const [imageSrc, setImageSrc] = useState(defaultSrc);
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Load image from database
  useEffect(() => {
    const loadImage = async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('content_value')
        .eq('page', page)
        .eq('section', section)
        .eq('content_key', contentKey)
        .maybeSingle();

      if (data?.content_value) {
        setImageSrc(data.content_value);
      }
    };

    loadImage();
  }, [page, section, contentKey]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'خطا',
        description: 'فقط فایل‌های تصویری مجاز هستند',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'خطا',
        description: 'حداکثر حجم فایل ۵ مگابایت است',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${page}-${section}-${contentKey}-${Date.now()}.${fileExt}`;
      const filePath = `page-content/${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        // If bucket doesn't exist, use base64 as fallback
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result as string;
          await saveImageUrl(base64);
        };
        reader.readAsDataURL(file);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      await saveImageUrl(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'خطا',
        description: 'خطا در آپلود تصویر',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const saveImageUrl = async (url: string) => {
    try {
      // Check if content exists
      const { data: existing } = await supabase
        .from('page_content')
        .select('id')
        .eq('page', page)
        .eq('section', section)
        .eq('content_key', contentKey)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('page_content')
          .update({ content_value: url, updated_at: new Date().toISOString() })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('page_content')
          .insert({
            page,
            section,
            content_key: contentKey,
            content_value: url,
            content_type: 'image',
          });

        if (error) throw error;
      }

      setImageSrc(url);
      toast({
        title: 'ذخیره شد',
        description: 'تصویر با موفقیت ذخیره شد',
      });
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: 'خطا',
        description: 'خطا در ذخیره تصویر',
        variant: 'destructive',
      });
    }
  };

  if (!isEditMode) {
    return <img src={imageSrc} alt={alt} className={className} />;
  }

  return (
    <div
      className={cn("relative group", containerClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageSrc} alt={alt} className={cn(className, "transition-all", isHovered && "opacity-75")} />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <AnimatePresence>
        {isHovered && !isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-2 text-white">
              <Camera className="w-8 h-8" />
              <span className="text-sm font-medium">تغییر تصویر</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="flex flex-col items-center gap-2 text-white">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium">در حال آپلود...</span>
          </div>
        </div>
      )}

      {isHovered && !isUploading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded shadow-lg"
        >
          کلیک برای تغییر
        </motion.div>
      )}
    </div>
  );
};

export default EditableImage;
