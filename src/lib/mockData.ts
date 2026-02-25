import { Product, Brand, Category } from '@/pages/ProductDetailPage';

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

// --- Comprehensive Spec Templates by Category ---
const baseMobileSpecs = {
    'spec.os': 'spec.value.android_14',
    'spec.chip_model': 'spec.value.snapdragon_7_gen_2',
    'spec.ram': 'spec.value.8_gb',
    'spec.internal_storage': 'spec.value.256_gb',
    'spec.display_type': 'spec.value.amoled',
    'spec.display_size': 'spec.value.6_67_inch',
    'spec.main_camera': 'spec.value.108_mp',
    'spec.selfie_camera': 'spec.value.16_mp',
    'spec.battery_capacity': 'spec.value.5000_mah',
    'spec.dimensions': 'spec.value.generic_dimensions',
    'spec.weight': 'spec.value.generic_weight',
};

const baseTabletSpecs = {
    'spec.os': 'spec.value.android_14',
    'spec.chip_model': 'spec.value.snapdragon_695',
    'spec.ram': 'spec.value.8_gb',
    'spec.internal_storage': 'spec.value.128_gb',
    'spec.display_type': 'spec.value.lcd',
    'spec.display_size': 'spec.value.11_inch_lcd',
    'spec.main_camera': 'spec.value.8_mp',
    'spec.battery_capacity': 'spec.value.7040_mah',
    'spec.connectivity': 'spec.value.wifi_cellular',
};

const baseSmartwatchSpecs = {
    'spec.chip_model': 'spec.value.s11_chip',
    'spec.internal_storage': 'spec.value.32_gb',
    'spec.display_type': 'spec.value.oled',
    'spec.feature': 'spec.value.blood_oxygen_ecg',
    'spec.connectivity': 'spec.value.gps_cellular',
    'spec.water_resistance': 'spec.value.50_meters',
};

const baseAccessorySpecs = {
    'spec.chip_model': 'spec.value.h2_chip',
    'spec.feature': 'spec.value.active_noise_cancellation',
    'spec.connectivity': 'spec.value.bluetooth_5_3',
    'spec.battery_life': 'spec.value.6_hours',
};

const baseFeaturePhoneSpecs = {
    'spec.display_size': 'spec.value.1_8_inch',
    'spec.connectivity': 'spec.value.4g',
    'spec.feature': 'spec.value.wireless_fm_radio',
    'spec.battery_capacity': 'spec.value.1450_mah',
};

// --- Image Files ---
const imageFiles = [
    "Apple Watch series10 40mm BLK.png", "Apple-Watch-series10-silver.png", "apple-airpods-pro2.jpg",
    "apple-watch-se-44mm.webp", "apple-watch-series11-46mm.png", "nokia-105-4g.webp", "samsung-a06.png",
    "samsung-a07.png", "samsung-a17.png", "samsung-a26.png", "samsung-a36.png", "samsung-a56.png",
    "samsung-galaxys25-fe.png", "samsung-galaxys25ultra.png", "samsung-tab-a9-plus.png", "samsung-tab-a9.png",
    "xiaomi-15t.png", "xiaomi-pococ71.png", "xiaomi-pococ75.png", "xiaomi-pococ85.png", "xiaomi-pocom6.jpg",
    "xiaomi-pocom7.png", "xiaomi-redmi-a5.png", "xiaomi-redmi13x.png", "xiaomi-redmi15.png", "xiaomi-redmi15c.png",
    "xiaomi-redmia3.png", "xiaomi-redminote-14-pro.png", "xiaomi-redminote-14-s.png", "xiaomi-redminote-14.png"
];

const createProductFromImage = (imageFile: string): Omit<Product, 'brand' | 'category'> => {
    const basePath = '/images/products/';
    const imagePath = basePath + imageFile;
    const slug = imageFile.split('.')[0];
    const name = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    let brand_id = 'brand-xiaomi';
    let category_id = 'cat-mobile';
    let finalName = name;
    let descriptionKey = 'product.default.description';
    let specs = {};

    // --- Assign Brand and Category ---
    if (name.toLowerCase().includes('samsung')) { brand_id = 'brand-samsung'; }
    if (name.toLowerCase().includes('apple')) { brand_id = 'brand-apple'; }
    if (name.toLowerCase().includes('nokia')) { brand_id = 'brand-nokia'; }
    if (name.toLowerCase().includes('poco')) { brand_id = 'brand-poco'; }
    
    if (name.toLowerCase().includes('watch')) { category_id = 'cat-smartwatch'; }
    if (name.toLowerCase().includes('tab')) { category_id = 'cat-tablet'; }
    if (name.toLowerCase().includes('airpods')) { category_id = 'cat-accessory'; }
    if (name.toLowerCase().includes('105')) { category_id = 'cat-feature'; }

    // --- Assign Specs based on Category and then Customize ---
    switch (category_id) {
        case 'cat-mobile': specs = { ...baseMobileSpecs }; break;
        case 'cat-tablet': specs = { ...baseTabletSpecs }; break;
        case 'cat-smartwatch': specs = { ...baseSmartwatchSpecs }; break;
        case 'cat-accessory': specs = { ...baseAccessorySpecs }; break;
        case 'cat-feature': specs = { ...baseFeaturePhoneSpecs }; break;
    }

    // --- Customize Name, Description, and Specs for specific products ---
    switch (slug) {
        case 'samsung-galaxys25ultra':
            finalName = 'Samsung Galaxy S25 Ultra';
            descriptionKey = 'product.galaxy_s25_ultra.description';
            specs = { ...specs, 'spec.chip_model': 'spec.value.exynos_2500', 'spec.ram': 'spec.value.16_gb', 'spec.internal_storage': 'spec.value.1_tb', 'spec.camera': 'spec.value.200_mp', 'spec.battery_capacity': 'spec.value.5500_mah' };
            break;
        case 'samsung-galaxys25-fe':
            finalName = 'Samsung Galaxy S25 FE';
            descriptionKey = 'product.galaxy_s25_fe.description';
            specs = { ...specs, 'spec.chip_model': 'spec.value.exynos_2400', 'spec.ram': 'spec.value.12_gb', 'spec.internal_storage': 'spec.value.512_gb' };
            break;
        case 'samsung-a56':
            finalName = 'Samsung Galaxy A56';
            descriptionKey = 'product.galaxy_a56.description';
            specs = { ...specs, 'spec.chip_model': 'spec.value.a56_chip_model', 'spec.ram': 'spec.value.8_gb', 'spec.battery_capacity': 'spec.value.a56_battery_capacity' };
            break;
        case 'samsung-a36': finalName = 'Samsung Galaxy A36'; specs = { ...specs, 'spec.ram': 'spec.value.6_gb', 'spec.internal_storage': 'spec.value.128_gb', 'spec.main_camera': 'spec.value.64_mp' }; break;
        case 'samsung-a26': finalName = 'Samsung Galaxy A26'; specs = { ...specs, 'spec.ram': 'spec.value.6_gb', 'spec.internal_storage': 'spec.value.128_gb', 'spec.main_camera': 'spec.value.50_mp' }; break;
        case 'samsung-a06': finalName = 'Samsung Galaxy A06'; specs = { ...specs, 'spec.ram': 'spec.value.4_gb', 'spec.internal_storage': 'spec.value.64_gb', 'spec.main_camera': 'spec.value.48_mp' }; break;
        case 'samsung-tab-a9-plus': finalName = 'Samsung Galaxy Tab A9+'; descriptionKey = 'product.tab_a9_plus.description'; break;
        case 'samsung-tab-a9': finalName = 'Samsung Galaxy Tab A9'; specs = { ...specs, 'spec.display_size': 'spec.value.8_7_inch', 'spec.chip_model': 'spec.value.helio_g99' }; break;
        case 'apple-watch-series11-46mm': finalName = 'Apple Watch Series 11 (46mm)'; descriptionKey = 'product.watch_11.description'; break;
        case 'apple-watch-se-44mm': finalName = 'Apple Watch SE (44mm)'; specs = { ...specs, 'spec.chip_model': 'spec.value.s8_chip', 'spec.internal_storage': 'spec.value.32_gb' }; break;
        case 'apple-airpods-pro2': finalName = 'Apple AirPods Pro 2'; descriptionKey = 'product.airpods_pro2.description'; break;
        case 'xiaomi-15t':
            finalName = 'Xiaomi 15T';
            descriptionKey = 'product.xiaomi_15t.description';
            specs = { ...specs, 'spec.chip_model': 'spec.value.snapdragon_8_gen_3', 'spec.ram': 'spec.value.12_gb', 'spec.internal_storage': 'spec.value.512_gb' };
            break;
        case 'xiaomi-redminote-14-pro':
            finalName = 'Xiaomi Redmi Note 14 Pro';
            descriptionKey = 'product.redmi_note_14_pro.description';
            specs = { ...specs, 'spec.chip_model': 'spec.value.dimensity_8200', 'spec.ram': 'spec.value.12_gb', 'spec.internal_storage': 'spec.value.512_gb' };
            break;
        case 'xiaomi-pocom7': finalName = 'Poco M7 Pro'; descriptionKey = 'product.poco_m7.description'; break;
        case 'xiaomi-pococ85': finalName = 'Poco C85'; descriptionKey = 'product.poco_c85.description'; specs = { ...specs, 'spec.ram': 'spec.value.6_gb', 'spec.internal_storage': 'spec.value.128_gb' }; break;
        case 'xiaomi-pococ75': finalName = 'Poco C75'; descriptionKey = 'product.poco_c75.description'; specs = { ...specs, 'spec.ram': 'spec.value.6_gb', 'spec.internal_storage': 'spec.value.128_gb' }; break;
        case 'xiaomi-redmi-a5': finalName = 'Xiaomi Redmi A5'; descriptionKey = 'product.redmi_a5.description'; specs = { ...specs, 'spec.ram': 'spec.value.4_gb', 'spec.internal_storage': 'spec.value.64_gb' }; break;
        case 'nokia-105-4g': finalName = 'Nokia 105 4G'; descriptionKey = 'product.nokia_105.description'; break;
        default:
            descriptionKey = 'product.' + slug.replace(/-/g, '_') + '.description';
            break;
    }

    return {
        id: 'prod_' + slug,
        name: finalName,
        slug: slug,
        description: descriptionKey,
        image: imagePath,
        brand_id: brand_id,
        category_id: category_id,
        specs: specs,
    };
};

export const mockProducts: Omit<Product, 'brand' | 'category'>[] = imageFiles.map(createProductFromImage);

const brandMap = new Map(mockBrands.map(b => [b.id, b]));
const categoryMap = new Map(mockCategories.map(c => [c.id, c]));

export const fullMockProducts: Product[] = mockProducts.map(p => ({
    ...p,
    brand: brandMap.get(p.brand_id)!,
    category: categoryMap.get(p.category_id)!,
})).filter(p => p.brand && p.category);
