
'use client';

import { useState, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useContent } from '@/contexts/ContentContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/admin/RichTextEditor';

// We need to extend the editingContent type to include our custom property
declare module '@/contexts/EditModeContext' {
    interface PageContent {
        isRichText?: boolean;
    }
}

export const UniversalEditorModal = () => {
  const { editingContent, finishEditing } = useEditMode();
  const { refreshContent } = useContent();
  const { toast } = useToast();
  
  const [contentFa, setContentFa] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editingContent) {
      setContentFa(editingContent.content_fa || '');
      setContentEn(editingContent.content_en || '');
    } else {
        setContentFa('');
        setContentEn('');
    }
  }, [editingContent]);

  const handleSave = async () => {
    if (!editingContent) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('page_content')
        .update({ content_fa: contentFa, content_en: contentEn })
        .eq('id', editingContent.id);

      if (error) throw error;
      
      toast({ title: 'موفق', description: 'محتوا با موفقیت ذخیره شد.' });
      await refreshContent(); // Refresh the global content store
      finishEditing(); // Close the modal
    } catch (error: any) {
      toast({ title: 'خطا', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const isRichText = editingContent?.isRichText || false;

  return (
    <Dialog open={!!editingContent} onOpenChange={(isOpen) => !isOpen && finishEditing()}>
      <DialogContent className="sm:max-w-4xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>ویرایش محتوا</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Key: <span className="font-mono bg-muted p-1 rounded">{editingContent?.content_key}</span>
          </p>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid w-full gap-1.5">
                <Label htmlFor="content_fa">محتوای فارسی</Label>
                {isRichText ? (
                    <RichTextEditor value={contentFa} onChange={setContentFa} dir="rtl" />
                ) : (
                    <Textarea id="content_fa" value={contentFa} onChange={(e) => setContentFa(e.target.value)} rows={5} dir="rtl" />
                )}
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="content_en">محتوای انگلیسی</Label>
                 {isRichText ? (
                    <RichTextEditor value={contentEn} onChange={setContentEn} dir="ltr" />
                ) : (
                    <Textarea id="content_en" value={contentEn} onChange={(e) => setContentEn(e.target.value)} rows={5} dir="ltr" />
                )}
            </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">لغو</Button>
          </DialogClose>
          <Button type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
