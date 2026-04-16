import { ReactNode } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Pencil } from 'lucide-react';

interface EditableProps {
  contentKey: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: (content: string) => ReactNode;
}

export const Editable = ({ contentKey, as: Component = 'span', className, children }: EditableProps) => {
  const { isEditMode } = useAdmin();

  // For now, just render the key as placeholder - actual content comes from LanguageContext t()
  const displayContent = contentKey;

  if (children) {
    return (
      <div className={isEditMode ? 'relative border border-dashed border-primary/50 p-1 rounded-md' : ''}>
        {children(displayContent)}
        {isEditMode && <EditButton />}
      </div>
    );
  }

  return (
    <Component className={`${className || ''} ${isEditMode ? 'relative border border-dashed border-primary/50 p-1 rounded-md cursor-pointer' : ''}`.trim()}>
      {displayContent}
      {isEditMode && <EditButton />}
    </Component>
  );
};

const EditButton = () => (
  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-lg z-10">
    <Pencil className="w-3 h-3" />
  </div>
);