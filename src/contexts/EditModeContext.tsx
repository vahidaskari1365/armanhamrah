import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  editingContentId: string | null;
  startEditing: (id: string) => void;
  finishEditing: () => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingContentId, setEditingContentId] = useState<string | null>(null);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const startEditing = (id: string) => {
    if (isEditMode) setEditingContentId(id);
  };

  const finishEditing = () => {
    setEditingContentId(null);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, editingContentId, startEditing, finishEditing }}>
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