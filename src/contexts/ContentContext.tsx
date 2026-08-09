import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PageContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string | null;
}

interface ContentContextType {
  content: Record<string, PageContent>;
  getContent: (key: string) => string;
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

      const contentMap = (data || []).reduce((acc, item) => {
        acc[item.content_key] = item as PageContent;
        return acc;
      }, {} as Record<string, PageContent>);
      
      setContent(contentMap);
    } catch (error: any) {
      console.error('Could not fetch page content:', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getContent = (key: string) => {
    const item = content[key];
    return item?.content_value || key;
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