
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useAdmin } from '@/hooks/use-admin'; // Assuming you have a hook to check if the user is an admin

interface PageContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_fa: string;
  content_en: string;
}

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  editingContent: PageContent | null;
  startEditing: (content: PageContent) => void;
  finishEditing: () => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const { isAdmin } = useAdmin(); // Only allow edit mode for admins

  const toggleEditMode = useCallback(() => {
    if (isAdmin) {
      setIsEditMode(prev => !prev);
    } else {
      setIsEditMode(false);
    }
  }, [isAdmin]);

  const startEditing = (content: PageContent) => {
      if(isEditMode) {
          setEditingContent(content);
      }
  }

  const finishEditing = () => {
      setEditingContent(null);
  }

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, editingContent, startEditing, finishEditing }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};
