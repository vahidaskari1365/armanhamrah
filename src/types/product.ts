export type LocalizedString = { fa: string; en: string };

export interface ProductSpecEntry {
  label: LocalizedString;
  value: LocalizedString;
}

/** Catalog product — showcase only, no commerce fields */
export interface CatalogProductInput {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  brand_id: string;
  category_id: string;
  tags: string[];
  specs: ProductSpecEntry[];
}

/** Legacy + catalog union shape used in products list */
export interface ProductDataBase {
  id?: string;
  slug: string;
  name: string;
  description?: string;
  slug_key?: string;
  image: string;
  brand_id: string;
  category_id: string;
  tags?: string[];
  specs?: Record<string, string>;
  specEntries?: ProductSpecEntry[];
}

export const PRODUCT_IMAGE_PLACEHOLDER = '/images/products/placeholder.webp';
