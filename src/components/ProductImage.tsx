import { useEffect, useState } from 'react';
import { PRODUCT_IMAGE_PLACEHOLDER } from '@/types/product';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ProductImage = ({ src, alt, className = '', loading = 'lazy' }: ProductImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src || PRODUCT_IMAGE_PLACEHOLDER);

  useEffect(() => {
    setCurrentSrc(src || PRODUCT_IMAGE_PLACEHOLDER);
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => {
        if (currentSrc !== PRODUCT_IMAGE_PLACEHOLDER) {
          setCurrentSrc(PRODUCT_IMAGE_PLACEHOLDER);
        }
      }}
    />
  );
};

export default ProductImage;
