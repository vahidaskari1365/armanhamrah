import { Product, Brand, Category } from '@/pages/ProductsPage';

// --- Base Data ---
export const mockBrands: Brand[] = [
    { id: 'brand-samsung', name: 'Samsung' },
    { id: 'brand-apple', name: 'Apple' },
    { id: 'brand-xiaomi', name: 'Xiaomi' },
    { id: 'brand-poco', name: 'Poco' }, 
    { id: 'brand-nokia', name: 'Nokia' },
];

export const mockCategories: Category[] = [
    { id: 'cat-mobile', name: 'category.mobile' },
    { id: 'cat-tablet', name: 'category.tablet' },
    { id: 'cat-accessory', name: 'category.accessories' },
    { id: 'cat-smartwatch', name: 'category.smartwatch' },
    { id: 'cat-feature', name: 'category.feature_phone' },
];

export const mockProducts: any[] = [];
export const fullMockProducts: Product[] = [];