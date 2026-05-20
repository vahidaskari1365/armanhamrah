export type LocalizedString = { fa: string; en: string };

export interface ProductSpecEntry {
  label: LocalizedString;
  value: LocalizedString;
}

export const PRODUCT_IMAGE_PLACEHOLDER = '/images/products/placeholder.webp';
