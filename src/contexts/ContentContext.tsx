
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PageContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_fa: string;
  content_en: string;
}

interface ContentContextType {
  content: Record<string, PageContent>;
  getContent: (key: string) => Omit<PageContent, 'id' | 'page' | 'section' | 'content_key'>;
  refreshContent: () => Promise<void>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Record<string, PageContent>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('page_content').select('*');
      if (error) throw error;

      const contentMap = data.reduce((acc, item) => {
        acc[item.content_key] = item;
        return acc;
      }, {} as Record<string, PageContent>);
      
      setContent(contentMap);
    } catch (error: any) {
      toast({ title: 'خطا', description: `Could not fetch page content: ${error.message}`, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getContent = (key: string) => {
    const item = content[key];
    return {
      content_fa: item?.content_fa || `FA: ${key}`,
      content_en: item?.content_en || `EN: ${key}`,
    };
  };

  return (
    <ContentContext.Provider value={{ content, getContent, refreshContent: fetchContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
