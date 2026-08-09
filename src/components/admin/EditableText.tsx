import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { Pencil, Check, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EditableTextProps {
  contentKey: string;
  page: string;
  section: string;
  defaultValue: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  contentKey,
  page,
  section,
  defaultValue,
  as: Component = 'span',
  className,
  multiline = false,
}) => {
  const { isEditMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [originalValue, setOriginalValue] = useState(defaultValue);
  const [isSaving, setIsSaving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Load content from database
  useEffect(() => {
    const loadContent = async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('content_value')
        .eq('page', page)
        .eq('section', section)
        .eq('content_key', contentKey)
        .maybeSingle();

      if (data?.content_value) {
        setValue(data.content_value);
        setOriginalValue(data.content_value);
      }
    };

    loadContent();
  }, [page, section, contentKey, defaultValue]);

  useEffect(() => {
      setValue(defaultValue)
  }, [defaultValue])

  const handleSave = async () => {
    if (value === originalValue) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
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
        // Update existing
        const { error } = await supabase
          .from('page_content')
          .update({ content_value: value, updated_at: new Date().toISOString() })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('page_content')
          .insert({
            page,
            section,
            content_key: contentKey,
            content_value: value,
            content_type: 'text',
          });

        if (error) throw error;
      }

      setOriginalValue(value);
      toast({
        title: 'ذخیره شد',
        description: 'محتوا با موفقیت ذخیره شد',
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'خطا',
        description: 'خطا در ذخیره محتوا',
        variant: 'destructive',
      });
      setValue(originalValue);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setValue(originalValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (!isEditMode) {
    return <Component className={cn(className, multiline && 'whitespace-pre-line')}>{value}</Component>;
  }

  return (
    <div
      className="relative inline-block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-2"
          >
            {multiline ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "bg-white/10 backdrop-blur-sm border border-orange-500/50 rounded px-2 py-1 text-inherit focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[200px] resize-none",
                  className
                )}
                rows={3}
                disabled={isSaving}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "bg-white/10 backdrop-blur-sm border border-orange-500/50 rounded px-2 py-1 text-inherit focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[100px]",
                  className
                )}
                disabled={isSaving}
              />
            )}
            <div className="flex gap-1">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="p-1 bg-green-600 hover:bg-green-700 rounded text-white transition-colors"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="p-1 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <Component
              className={cn(
                className,
                multiline && 'whitespace-pre-line',
                "outline outline-2 outline-transparent transition-all",
                isHovered && "outline-orange-500/50 outline-dashed"
              )}
            >
              {value}
            </Component>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs px-2 py-1 rounded shadow-lg flex items-center gap-1 whitespace-nowrap z-50"
                >
                  <Pencil className="w-3 h-3" />
                  کلیک برای ویرایش
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditableText;
