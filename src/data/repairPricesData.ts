export interface ModelPrice {
  service: string;
  priceMin: string;
  priceMax: string;
}

export interface PriceEntry {
  modelSlug: string;
  modelName: string;
  services: ModelPrice[];
}

export const repairPricesData: Record<string, ModelPrice[]> = {
  'iphone-17-pro': [
    { service: 'تعویض گلس با وکیوم (بدون ال‌سی‌دی)', priceMin: '3,000,000', priceMax: '5,000,000' },
    { service: 'تعویض ال‌سی‌دی اورجینال سرویس‌پک', priceMin: '12,000,000', priceMax: '18,000,000' },
    { service: 'تعویض باتری اصلی', priceMin: '2,000,000', priceMax: '3,000,000' },
    { service: 'تعمیر فیس آیدی', priceMin: '1,000,000', priceMax: '2,000,000' },
    { service: 'تعمیر برد دو طبقه', priceMin: '2,000,000', priceMax: '6,000,000' },
    { service: 'تعمیر آبخوردگی', priceMin: '1,500,000', priceMax: '3,000,000' },
  ],
  'iphone-16-pro': [
    { service: 'تعویض گلس بدون ال‌سی‌دی', priceMin: '2,500,000', priceMax: '4,000,000' },
    { service: 'تعویض ال‌سی‌دی اورجینال', priceMin: '8,000,000', priceMax: '12,000,000' },
    { service: 'تعویض باتری اصلی', priceMin: '2,000,000', priceMax: '3,000,000' },
    { service: 'تعمیر فیس آیدی', priceMin: '800,000', priceMax: '1,500,000' },
    { service: 'تعمیر برد', priceMin: '1,500,000', priceMax: '5,000,000' },
  ],
  'samsung-s25-ultra': [
    { service: 'تعویض گلس بدون ال‌سی‌دی', priceMin: '4,000,000', priceMax: '6,000,000' },
    { service: 'تعویض ال‌سی‌دی AMOLED اورجینال', priceMin: '12,000,000', priceMax: '18,000,000' },
    { service: 'تعویض باتری اصلی', priceMin: '1,800,000', priceMax: '2,500,000' },
    { service: 'تعمیر قلم S Pen', priceMin: '800,000', priceMax: '1,200,000' },
  ],
  'samsung-s24-ultra': [
    { service: 'تعویض گلس با وکیوم', priceMin: '3,000,000', priceMax: '5,000,000' },
    { service: 'تعویض ال‌سی‌دی اورجینال', priceMin: '9,000,000', priceMax: '14,000,000' },
    { service: 'تعویض باتری اصلی', priceMin: '1,500,000', priceMax: '2,500,000' },
  ],
  'ps5-slim': [
    { service: 'تعویض پورت HDMI', priceMin: '1,500,000', priceMax: '2,500,000' },
    { service: 'سرویس فن و خمیر حرارتی', priceMin: '800,000', priceMax: '1,500,000' },
    { service: 'تعمیر برد اصلی', priceMin: '2,000,000', priceMax: '8,000,000' },
    { service: 'تعمیر درایو دیسک', priceMin: '1,200,000', priceMax: '3,000,000' },
  ],
  'airpods-pro-2': [
    { service: 'تعویض باتری ایرپاد', priceMin: '600,000', priceMax: '1,000,000' },
    { service: 'تعمیر کیس شارژ', priceMin: '600,000', priceMax: '1,500,000' },
    { service: 'تعویض اسپیکر ایرپاد', priceMin: '500,000', priceMax: '900,000' },
    { service: 'درمان آبخوردگی (التراسونیک)', priceMin: '400,000', priceMax: '700,000' },
  ],
  'galaxy-buds3-pro': [
    { service: 'تعویض باتری', priceMin: '400,000', priceMax: '700,000' },
    { service: 'تعمیر میکروفون', priceMin: '300,000', priceMax: '600,000' },
    { service: 'تعمیر ظرفیت کیس', priceMin: '500,000', priceMax: '1,000,000' },
  ],
  'apple-watch-ultra-3': [
    { service: 'تعویض گلس سافایر', priceMin: '3,500,000', priceMax: '6,000,000' },
    { service: 'تعویض باتری', priceMin: '1,500,000', priceMax: '2,500,000' },
    { service: 'تعمیر سنسور قلب و ECG', priceMin: '1,000,000', priceMax: '2,000,000' },
  ],
  'galaxy-watch-8': [
    { service: 'تعویض گلس', priceMin: '1,500,000', priceMax: '3,000,000' },
    { service: 'تعویض باتری', priceMin: '800,000', priceMax: '1,500,000' },
    { service: 'تعمیر تاچ و نمایشگر', priceMin: '1,200,000', priceMax: '3,500,000' },
  ],
  'jbl-charge-5': [
    { service: 'تعویض باتری 7500mAh', priceMin: '600,000', priceMax: '1,200,000' },
    { service: 'تعمیر آمپلی‌فایر TPA3116', priceMin: '400,000', priceMax: '900,000' },
    { service: 'تعمیر بلوتوث و برد', priceMin: '500,000', priceMax: '1,000,000' },
  ],
};