import { useState, useEffect } from 'react';
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
import { Label } from '@/components/ui/label';

interface EditingContent {
  id: string;
  content_key: string;
  content_value: string;
}

interface UniversalEditorModalProps {
  editingContent: EditingContent | null;
  onClose: () => void;
  onSaved?: () => void;
}

export const UniversalEditorModal = ({ editingContent, onClose, onSaved }: UniversalEditorModalProps) => {
  const { toast } = useToast();
  const [contentValue, setContentValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editingContent) {
      setContentValue(editingContent.content_value || '');
    }
  }, [editingContent]);

  const handleSave = async () => {
    if (!editingContent) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('page_content')
        .update({ content_value: contentValue })
        .eq('id', editingContent.id);
      if (error) throw error;
      toast({ title: 'موفق', description: 'محتوا با موفقیت ذخیره شد.' });
      onSaved?.();
      onClose();
    } catch (error: any) {
      toast({ title: 'خطا', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={!!editingContent} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>ویرایش محتوا</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Key: <span className="font-mono bg-muted p-1 rounded">{editingContent?.content_key}</span>
          </p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="content_value">محتوا</Label>
            <Textarea id="content_value" value={contentValue} onChange={(e) => setContentValue(e.target.value)} rows={5} dir="rtl" />
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