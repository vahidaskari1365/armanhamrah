import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

import { Product } from '@/pages/ProductsPage';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface EditableProductCardProps {
  product: Product;
  index: number;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const EditableProductCard: React.FC<EditableProductCardProps> = ({ product, index, onEdit, onDelete }) => {
  const { isEditMode } = useAdmin();
  const { t } = useLanguage();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`آیا از حذف محصول '${product.name}' مطمئن هستید؟`)) {
      onDelete(product.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative group"
    >
      {isEditMode && (
        <div className="absolute top-0 left-0 z-20 p-1.5 flex gap-1.5 bg-background/80 backdrop-blur-sm rounded-br-lg rounded-tl-xl border-b border-r border-border">
          <Button size="icon" variant="ghost" className="w-8 h-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10" onClick={handleEdit}>
            <Edit size={16} />
          </Button>
          <Button size="icon" variant="ghost" className="w-8 h-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10" onClick={handleDelete}>
            <Trash2 size={16} />
          </Button>
        </div>
      )}
      <Link 
        to={`/product/${product.slug}`}
        className={cn(
          "card-premium text-center block transition-all duration-300",
          isEditMode && "ring-2 ring-dashed ring-amber-500/60 group-hover:ring-amber-500"
        )}
        onClick={(e) => isEditMode && e.preventDefault()} // Prevent navigation in edit mode
      >
        <motion.div whileHover={{ y: isEditMode ? 0 : -10 }}>
          <div className="relative mb-4 overflow-hidden rounded-xl bg-secondary/50 p-4">
            <motion.img
              src={product.image || '/placeholder.png'}
              alt={product.name}
              loading="lazy"
              className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500"
              // Prevent image drag in edit mode
              onDragStart={(e) => isEditMode && e.preventDefault()}
            />
            {product.brand && (
              <span className="absolute top-2 right-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {product.brand.name}
              </span>
            )}
          </div>
          {product.category && <span className="text-xs text-muted-foreground block mb-2">{product.category.name}</span>}
          <h3 className="text-sm md:text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {!isEditMode && (
            <span className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-gold">
              {t('products.view')}
            </span>
          )}
           {isEditMode && (
            <span className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground">
              {t('products.view')}
            </span>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default EditableProductCard;
