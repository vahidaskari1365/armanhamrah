
'use client';

import { ReactNode } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { useContent } from '@/contexts/ContentContext';
import { Pencil } from 'lucide-react';

interface EditableProps {
  contentKey: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: (content: { content_fa: string; content_en: string }) => ReactNode;
  isRichText?: boolean;
}

export const Editable = ({ contentKey, as: Component = 'span', className, children, isRichText = false }: EditableProps) => {
  const { isEditMode, startEditing } = useEditMode();
  const { content, getContent } = useContent();

  const pageContent = content[contentKey];
  const displayContent = getContent(contentKey);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pageContent) {
      startEditing({ ...pageContent, isRichText }); // Pass isRichText to the editing state
    }
  };

  const editableWrapperClasses = isEditMode 
    ? 'relative border border-dashed border-primary/50 hover:border-primary transition-all p-1 rounded-md cursor-pointer' 
    : '';

  if (children) {
    return (
        <div onClick={isEditMode ? handleEditClick : undefined} className={editableWrapperClasses}>
            {children(displayContent)}
            {isEditMode && pageContent && (
                <EditButton />
            )}
        </div>
    );
  }

  if (isRichText) {
      return (
        <div onClick={isEditMode ? handleEditClick : undefined} className={`${editableWrapperClasses} prose prose-sm max-w-none ql-editor-display`}>
            <div dangerouslySetInnerHTML={{ __html: displayContent.content_fa }} />
            {isEditMode && pageContent && (
                <EditButton />
            )}
        </div>
      )
  }

  return (
    <Component className={`${className || ''} ${editableWrapperClasses}`.trim()} onClick={isEditMode ? handleEditClick : undefined}>
      {displayContent.content_fa}
      {isEditMode && pageContent && (
        <EditButton />
      )}
    </Component>
  );
};

const EditButton = () => (
    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-lg z-10">
        <Pencil className="w-3 h-3" />
    </div>
);
