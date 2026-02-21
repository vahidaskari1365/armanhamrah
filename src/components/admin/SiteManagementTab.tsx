import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PageContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_fa: string;
  content_en: string;
}

interface SiteManagementTabProps {
  pageContents: PageContent[];
  onRefresh: () => void;
}

const SiteManagementTab = ({ pageContents, onRefresh }: SiteManagementTabProps) => {
  const [editableContents, setEditableContents] = useState<PageContent[]>(pageContents);
  const [searchTerm, setSearchTerm] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleContentChange = (id: string, field: 'content_fa' | 'content_en', value: string) => {
    setEditableContents(prev => 
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async (contentItem: PageContent) => {
    setSavingId(contentItem.id);
    const { error } = await supabase
      .from('page_content')
      .update({
        content_fa: contentItem.content_fa,
        content_en: contentItem.content_en,
      })
      .eq('id', contentItem.id);

    if (error) {
      toast({ title: 'خطا', description: `خطا در ذخیره ${contentItem.content_key}`, variant: 'destructive' });
    } else {
      toast({ title: 'موفق', description: `محتوای ${contentItem.content_key} با موفقیت ذخیره شد.` });
    }
    setSavingId(null);
    onRefresh();
  };

  const groupedContent = editableContents.reduce((acc, item) => {
    const page = item.page || 'uncategorized';
    if (!acc[page]) {
      acc[page] = [];
    }
    acc[page].push(item);
    return acc;
  }, {} as Record<string, PageContent[]>);
  
  const filteredContent = Object.keys(groupedContent).reduce((acc, page) => {
    const items = groupedContent[page].filter(item => 
      item.content_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content_fa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content_en.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (items.length > 0) {
      acc[page] = items;
    }
    return acc;
  }, {} as Record<string, PageContent[]>);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">مدیریت محتوای سایت</h2>
        <div className="relative w-1/3">
          <Input
            placeholder="جستجو در کلید یا محتوا..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>
      </div>
      
      <Accordion type="multiple" defaultValue={Object.keys(filteredContent)} className="w-full">
        {Object.keys(filteredContent).sort().map(page => (
          <AccordionItem value={page} key={page}>
            <AccordionTrigger className="text-base font-medium capitalize bg-muted/50 px-4 rounded-t-lg">
              {page.replace(/_/g, ' ')}
            </AccordionTrigger>
            <AccordionContent className="p-4 border border-t-0 rounded-b-lg">
              <div className="space-y-4">
                {filteredContent[page].map(item => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-start p-3 bg-secondary/30 rounded-md">
                    <div className="col-span-2 text-sm text-muted-foreground font-mono self-center">{item.content_key}</div>
                    <div className="col-span-4">
                      <Label className="text-xs">فارسی</Label>
                      <Textarea
                        value={item.content_fa}
                        onChange={(e) => handleContentChange(item.id, 'content_fa', e.target.value)}
                        className="w-full text-sm font-sans"
                        rows={3}
                      />
                    </div>
                    <div className="col-span-4">
                      <Label className="text-xs">English</Label>
                      <Textarea
                        value={item.content_en}
                        onChange={(e) => handleContentChange(item.id, 'content_en', e.target.value)}
                        className="w-full text-sm font-sans"
                        dir="ltr"
                        rows={3}
                      />
                    </div>
                    <div className="col-span-2 self-center">
                      <Button 
                        onClick={() => handleSave(item)} 
                        size="sm" 
                        className="w-full btn-gold"
                        disabled={savingId === item.id}
                      >
                        {savingId === item.id ? '⏳' : <Save className="w-4 h-4 ml-1"/>}
                        ذخیره
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {Object.keys(filteredContent).length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          <p>هیچ محتوایی با عبارت جستجو شده یافت نشد.</p>
        </div>
      )}
    </motion.div>
  );
};

export default SiteManagementTab;
