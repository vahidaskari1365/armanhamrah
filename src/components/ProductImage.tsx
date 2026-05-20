import { useEffect, useState, useCallback } from 'react';
import { PRODUCT_IMAGE_PLACEHOLDER } from '@/types/product';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ProductImage = ({ src, alt, className = '', loading = 'lazy' }: ProductImageProps) => {
  const getValidSrc = (imagePath: string): string => {
    if (!imagePath) return PRODUCT_IMAGE_PLACEHOLDER;
    if (imagePath.startsWith('/images/products/')) {
      const fullPath = `${window.location.origin}${imagePath}`;
      return fullPath;
    }
    return imagePath;
  };

  const [currentSrc, setCurrentSrc] = useState<string>(getValidSrc(src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    setCurrentSrc(getValidSrc(src));
  }, [src]);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      if (currentSrc !== PRODUCT_IMAGE_PLACEHOLDER) {
        setCurrentSrc(PRODUCT_IMAGE_PLACEHOLDER);
      }
    }
  }, [hasError, currentSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={handleError}
    />
  );
};

export default ProductImage;