import type { ProductSpecEntry } from '@/types/product';

export interface Product {
  slug: string;
  name: { fa: string; en: string };
  image: string;
  price: { fa: string; en: string };
  brand_id: string;
  category_id: string;
  description: { fa: string; en: string };
  specEntries: ProductSpecEntry[];
}

export const products: Product[] = [
  // --- MOBILE (APPLE) ---
  {
    slug: "apple-iphone-17-pro",
    name: { fa: "آیفون ۱۷ پرو", en: "iPhone 17 Pro" },
    image: "/images/products/apple-iphone-17-pro.webp",
    price: { fa: "۹۸,۵۰۰,۰۰۰ تومان", en: "IRR 98,500,000" },
    brand_id: "Apple",
    category_id: "category.mobile",
    description: {
      fa: "آیفون ۱۷ پرو با تراشه A19 Pro و سیستم دوربین پیشرفته زیر صفحه‌نمایش، مرزهای تکنولوژی را جابجا می‌کند.",
      en: "iPhone 17 Pro with A19 Pro chip and advanced under-display camera system pushes the boundaries of technology."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "A19 Pro", en: "A19 Pro" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "۶.۷ اینچ Super Retina XDR", en: "6.7\" Super Retina XDR" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۱۶ گیگابایت", en: "16 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۴۹۰۰ میلی‌آمپر", en: "4900 mAh" } },
    ],
  },
  {
    slug: "apple-iphone-16-pro",
    name: { fa: "آیفون ۱۶ پرو", en: "iPhone 16 Pro" },
    image: "/images/products/apple-iphone-16-pro.webp",
    price: { fa: "۸۴,۹۰۰,۰۰۰ تومان", en: "IRR 84,900,000" },
    brand_id: "Apple",
    category_id: "category.mobile",
    description: {
      fa: "آیفون ۱۶ پرو با دکمه جدید Camera Control و تراشه A18 Bionic برای عملکردی بی‌نظیر.",
      en: "iPhone 16 Pro with the new Camera Control button and A18 Bionic chip for unparalleled performance."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "A18 Bionic", en: "A18 Bionic" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "۶.۳ اینچ Super Retina XDR", en: "6.3\" Super Retina XDR" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۸ گیگابایت", en: "8 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۴۶۸۵ میلی‌آمپر", en: "4685 mAh" } },
    ],
  },

  // --- MOBILE (SAMSUNG) ---
  {
    slug: "samsung-galaxy-s25-ultra",
    name: { fa: "سامسونگ گلکسی اس ۲۵ اولترا", en: "Samsung Galaxy S25 Ultra" },
    image: "/images/products/samsung-galaxys25ultra.webp",
    price: { fa: "۹۱,۵۰۰,۰۰۰ تومان", en: "IRR 91,500,000" },
    brand_id: "Samsung",
    category_id: "category.mobile",
    description: {
      fa: "سامسونگ گلکسی S25 اولترا با بدنه تیتانیومی و هوش مصنوعی پیشرفته، تجربه گوشی‌های هوشمند را دگرگون می‌کند.",
      en: "Samsung Galaxy S25 Ultra with titanium body and advanced AI transforms the smartphone experience."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "اسنپدراگون ۸ نسل ۴", en: "Snapdragon 8 Gen 4" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "۶.۹ اینچ Dynamic AMOLED 2X", en: "6.9\" Dynamic AMOLED 2X" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۱۶ گیگابایت", en: "16 GB" } },
      { label: { fa: "دوربین اصلی", en: "Main Camera" }, value: { fa: "۲۵۰ مگاپیکسل", en: "250 MP" } },
    ],
  },
  {
    slug: "samsung-galaxy-s24-ultra",
    name: { fa: "سامسونگ گلکسی اس ۲۴ اولترا", en: "Samsung Galaxy S24 Ultra" },
    image: "/images/products/samsung-galaxy-s24-ultra.webp",
    price: { fa: "۷۲,۰۰۰,۰۰۰ تومان", en: "IRR 72,000,000" },
    brand_id: "Samsung",
    category_id: "category.mobile",
    description: {
      fa: "گلکسی S24 اولترا، پرچمدار قدرتمند سامسونگ با قلم S Pen و دوربین ۲۰۰ مگاپیکسلی.",
      en: "Galaxy S24 Ultra, Samsung's powerful flagship with S Pen and 200MP camera."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "اسنپدراگون ۸ نسل ۳", en: "Snapdragon 8 Gen 3" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "۶.۸ اینچ Dynamic AMOLED 2X", en: "6.8\" Dynamic AMOLED 2X" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۱۲ گیگابایت", en: "12 GB" } },
      { label: { fa: "دوربین اصلی", en: "Main Camera" }, value: { fa: "۲۰۰ مگاپیکسل", en: "200 MP" } },
    ],
  },
  {
    slug: "samsung-galaxy-s25-fe",
    name: { fa: "سامسونگ گلکسی اس ۲۵ اف‌ای", en: "Samsung Galaxy S25 FE" },
    image: "/images/products/samsung-galaxys25-fe.webp",
    price: { fa: "۳۸,۵۰۰,۰۰۰ تومان", en: "IRR 38,500,000" },
    brand_id: "Samsung",
    category_id: "category.mobile",
    description: {
      fa: "گلکسی S25 FE، ترکیبی از ویژگی‌های پرچمدار با قیمتی مناسب‌تر برای طرفداران سامسونگ.",
      en: "Galaxy S25 FE, combining flagship features at a more affordable price for Samsung fans."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "Exynos 2400 / Snapdragon 8 Gen 3", en: "Exynos 2400 / Snapdragon 8 Gen 3" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "۶.۷ اینچ Dynamic AMOLED", en: "6.7\" Dynamic AMOLED" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۸ گیگابایت", en: "8 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۴۷۰۰ میلی‌آمپر", en: "4700 mAh" } },
    ],
  },
  {
    slug: "samsung-galaxy-a56",
    name: { fa: "سامسونگ گلکسی A56", en: "Samsung Galaxy A56" },
    image: "/images/products/samsung-a56.webp",
    price: { fa: "۲۴,۵۰۰,۰۰۰ تومان", en: "IRR 24,500,000" },
    brand_id: "Samsung",
    category_id: "category.mobile",
    description: {
      fa: "سامسونگ گلکسی A56 با طراحی مدرن و عملکردی فراتر از یک میان‌رده.",
      en: "Samsung Galaxy A56 with modern design and performance beyond a mid-range phone."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "اگزینوس ۱۵۸۰", en: "Exynos 1580" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "Super AMOLED 120Hz", en: "Super AMOLED 120Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۸ گیگابایت", en: "8 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },
  {
    slug: "samsung-galaxy-a36",
    name: { fa: "سامسونگ گلکسی A36", en: "Samsung Galaxy A36" },
    image: "/images/products/samsung-a36.webp",
    price: { fa: "۱۸,۹۰۰,۰۰۰ تومان", en: "IRR 18,900,000" },
    brand_id: "Samsung",
    category_id: "category.mobile",
    description: {
      fa: "گلکسی A36 با صفحه‌نمایش با کیفیت و باتری قدرتمند، گزینه‌ای ایده‌آل برای استفاده روزمره.",
      en: "Galaxy A36 with high-quality display and powerful battery, an ideal choice for daily use."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "Exynos 1480", en: "Exynos 1480" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "Super AMOLED 120Hz", en: "Super AMOLED 120Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۸ گیگابایت", en: "8 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },
  {
    slug: "samsung-galaxy-a26",
    name: { fa: "سامسونگ گلکسی A26", en: "Samsung Galaxy A26" },
    image: "/images/products/samsung-a26.webp",
    price: { fa: "۱۴,۵۰۰,۰۰۰ تومان", en: "IRR 14,500,000" },
    brand_id: "Samsung",
    category_id: "category.mobile",
    description: {
      fa: "گلکسی A26 با دوربین سه‌گانه و پشتیبانی از شبکه 5G.",
      en: "Galaxy A26 with triple camera and 5G support."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "Exynos 1380", en: "Exynos 1380" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "Super AMOLED 120Hz", en: "Super AMOLED 120Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۸ گیگابایت", en: "8 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },
  {
    slug: "samsung-galaxy-a17",
    name: { fa: "سامسونگ گلکسی A17", en: "Samsung Galaxy A17" },
    image: "/images/products/samsung-a17.webp",
    price: { fa: "۱۱,۸۰۰,۰۰۰ تومان", en: "IRR 11,800,000" },
    brand_id: "Samsung",
    category_id: "category.mobile",
    description: {
      fa: "میان‌رده‌ای خوش‌ساخت از سامسونگ با صفحه‌نمایش بزرگ و باتری با دوام.",
      en: "A well-built mid-range phone from Samsung with a large screen and durable battery."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "Exynos 1280", en: "Exynos 1280" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "Super AMOLED 90Hz", en: "Super AMOLED 90Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۶ گیگابایت", en: "6 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },
  {
    slug: "samsung-galaxy-a07",
    name: { fa: "سامسونگ گلکسی A07", en: "Samsung Galaxy A07" },
    image: "/images/products/samsung-a07.webp",
    price: { fa: "۸,۹۰۰,۰۰۰ تومان", en: "IRR 8,900,000" },
    brand_id: "Samsung",
    category_id: "category.mobile",
    description: {
      fa: "گوشی اقتصادی جدید سامسونگ با طراحی زیبا و کارایی مناسب.",
      en: "Samsung's new budget phone with beautiful design and decent performance."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Helio G99", en: "MediaTek Helio G99" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "PLS LCD 90Hz", en: "PLS LCD 90Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۴ گیگابایت", en: "4 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },
  {
    slug: "samsung-galaxy-a06",
    name: { fa: "سامسونگ گلکسی A06", en: "Samsung Galaxy A06" },
    image: "/images/products/samsung-a06.webp",
    price: { fa: "۶,۸۰۰,۰۰۰ تومان", en: "IRR 6,800,000" },
    brand_id: "Samsung",
    category_id: "category.mobile",
    description: {
      fa: "گلکسی A06، انتخابی عالی برای کاربرانی که به دنبال کیفیت سامسونگ با بودجه کم هستند.",
      en: "Galaxy A06, an excellent choice for users looking for Samsung quality on a small budget."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "اسنپدراگون 680 4G", en: "Snapdragon 680 4G" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "PLS LCD 90Hz", en: "PLS LCD 90Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۶ گیگابایت", en: "6 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },

  // --- MOBILE (XIAOMI & POCO) ---
  {
    slug: "xiaomi-15t",
    name: { fa: "شیائومی 15T", en: "Xiaomi 15T" },
    image: "/images/products/xiaomi-15t.webp",
    price: { fa: "۳۲,۵۰۰,۰۰۰ تومان", en: "IRR 32,500,000" },
    brand_id: "Xiaomi",
    category_id: "category.mobile",
    description: {
      fa: "شیائومی 15T با تراشه قدرتمند و شارژ سریع ۱۲۰ واتی، سرعت و قدرت را به ارمغان می‌آورد.",
      en: "Xiaomi 15T with powerful chip and 120W fast charging brings speed and power."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "اسنپدراگون ۸ نسل ۴", en: "Snapdragon 8 Gen 4" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "۶.۶۷ اینچ AMOLED 144Hz", en: "6.67\" AMOLED 144Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۱۲ گیگابایت", en: "12 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۵۰۰ میلی‌آمپر", en: "5500 mAh" } },
    ],
  },
  {
    slug: "xiaomi-redmi-note-14-pro",
    name: { fa: "شیائومی ردمی نوت ۱۴ پرو", en: "Xiaomi Redmi Note 14 Pro" },
    image: "/images/products/xiaomi-redminote-14-pro.webp",
    price: { fa: "۱۶,۴۰۰,۰۰۰ تومان", en: "IRR 16,400,000" },
    brand_id: "Xiaomi",
    category_id: "category.mobile",
    description: {
      fa: "ردمی نوت ۱۴ پرو با دوربین ۲۰۰ مگاپیکسلی و صفحه‌نمایش منحنی، استانداردی جدید برای میان‌رده‌ها.",
      en: "Redmi Note 14 Pro with 200MP camera and curved display, a new standard for mid-range phones."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "اسنپدراگون 7s نسل ۲", en: "Snapdragon 7s Gen 2" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "AMOLED 120Hz Dolby Vision", en: "AMOLED 120Hz Dolby Vision" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۸ گیگابایت", en: "8 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۱۱۰ میلی‌آمپر", en: "5110 mAh" } },
    ],
  },
  {
    slug: "xiaomi-redmi-note-14",
    name: { fa: "شیائومی ردمی نوت ۱۴", en: "Xiaomi Redmi Note 14" },
    image: "/images/products/xiaomi-redminote-14.webp",
    price: { fa: "۱۲,۸۰۰,۰۰۰ تومان", en: "IRR 12,800,000" },
    brand_id: "Xiaomi",
    category_id: "category.mobile",
    description: {
      fa: "ردمی نوت ۱۴ با عملکرد متعادل و ارزش خرید بالا.",
      en: "Redmi Note 14 with balanced performance and high value for money."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Dimensity 7200 Ultra", en: "MediaTek Dimensity 7200 Ultra" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "AMOLED 120Hz", en: "AMOLED 120Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۸ گیگابایت", en: "8 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۱۱۰ میلی‌آمپر", en: "5110 mAh" } },
    ],
  },
  {
    slug: "xiaomi-redmi-15",
    name: { fa: "شیائومی ردمی ۱۵", en: "Xiaomi Redmi 15" },
    image: "/images/products/xiaomi-redmi15.webp",
    price: { fa: "۹,۵۰۰,۰۰۰ تومان", en: "IRR 9,500,000" },
    brand_id: "Xiaomi",
    category_id: "category.mobile",
    description: {
      fa: "گوشی جدید سری ردمی با طراحی تخت و باتری حجیم.",
      en: "New Redmi series phone with flat design and huge battery."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Dimensity 6080", en: "MediaTek Dimensity 6080" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "IPS LCD 120Hz", en: "IPS LCD 120Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۶ گیگابایت", en: "6 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۲۰۰ میلی‌آمپر", en: "5200 mAh" } },
    ],
  },
  {
    slug: "xiaomi-redmi-15c",
    name: { fa: "شیائومی ردمی 15c", en: "Xiaomi Redmi 15c" },
    image: "/images/products/xiaomi-redmi15c.webp",
    price: { fa: "۷,۴۰۰,۰۰۰ تومان", en: "IRR 7,400,000" },
    brand_id: "Xiaomi",
    category_id: "category.mobile",
    description: {
      fa: "نسخه اقتصادی سری ردمی ۱۵ با امکانات پایه و قیمت رقابتی.",
      en: "Economic version of the Redmi 15 series with basic features and competitive price."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Helio G91 Ultra", en: "MediaTek Helio G91 Ultra" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "IPS LCD 90Hz", en: "IPS LCD 90Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۶ گیگابایت", en: "6 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۱۶۰ میلی‌آمپر", en: "5160 mAh" } },
    ],
  },
  {
    slug: "xiaomi-redmi-a3",
    name: { fa: "شیائومی ردمی A3", en: "Xiaomi Redmi A3" },
    image: "/images/products/xiaomi-redmia3.webp",
    price: { fa: "۵,۲۰۰,۰۰۰ تومان", en: "IRR 5,200,000" },
    brand_id: "Xiaomi",
    category_id: "category.mobile",
    description: {
      fa: "ردمی A3 با طراحی شیشه‌ای در پشت و قیمتی بسیار مقرون‌به‌صرفه.",
      en: "Redmi A3 with glass back design and a very affordable price."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Helio G37", en: "MediaTek Helio G37" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "IPS LCD 90Hz", en: "IPS LCD 90Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۴ گیگابایت", en: "4 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },
  {
    slug: "xiaomi-redmi-a5",
    name: { fa: "شیائومی ردمی A5", en: "Xiaomi Redmi A5" },
    image: "/images/products/xiaomi-redmi-a5-v2.webp",
    price: { fa: "۶,۱۰۰,۰۰۰ تومان", en: "IRR 6,100,000" },
    brand_id: "Xiaomi",
    category_id: "category.mobile",
    description: {
      fa: "نسل جدید سری A ردمی با صفحه‌نمایش بزرگتر و شارژدهی عالی.",
      en: "New generation of Redmi A series with a larger screen and excellent battery life."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Helio G36", en: "MediaTek Helio G36" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "IPS LCD 90Hz", en: "IPS LCD 90Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۴ گیگابایت", en: "4 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },
  {
    slug: "poco-m7",
    name: { fa: "پوکو M7", en: "Poco M7" },
    image: "/images/products/xiaomi-pocom7-v2.webp",
    price: { fa: "۱۸,۵۰۰,۰۰۰ تومان", en: "IRR 18,500,000" },
    brand_id: "Poco",
    category_id: "category.mobile",
    description: {
      fa: "پوکو M7 با تمرکز بر عملکرد گیمینگ در رده میان‌رده.",
      en: "Poco M7 focusing on gaming performance in the mid-range category."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Dimensity 8300 Ultra", en: "MediaTek Dimensity 8300 Ultra" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "Flow AMOLED 120Hz", en: "Flow AMOLED 120Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۱۲ گیگابایت", en: "12 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },
  {
    slug: "poco-m6",
    name: { fa: "پوکو M6", en: "Poco M6" },
    image: "/images/products/xiaomi-pocom6-v2.webp",
    price: { fa: "۱۱,۲۰۰,۰۰۰ تومان", en: "IRR 11,200,000" },
    brand_id: "Poco",
    category_id: "category.mobile",
    description: {
      fa: "گوشی هوشمند پوکو M6 با طراحی خاص و سخت‌افزار قدرتمند.",
      en: "Poco M6 smartphone with special design and powerful hardware."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Dimensity 6080", en: "MediaTek Dimensity 6080" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "IPS LCD 90Hz", en: "IPS LCD 90Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۸ گیگابایت", en: "8 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۳۰ میلی‌آمپر", en: "5030 mAh" } },
    ],
  },
  {
    slug: "poco-c85",
    name: { fa: "پوکو C85", en: "Poco C85" },
    image: "/images/products/xiaomi-pococ85-v2.webp",
    price: { fa: "۸,۲۰۰,۰۰۰ تومان", en: "IRR 8,200,000" },
    brand_id: "Poco",
    category_id: "category.mobile",
    description: {
      fa: "سری جدید پوکو C با طراحی مدرن و باتری ۵۱۶۰ میلی‌آمپر ساعتی.",
      en: "New Poco C series with modern design and 5160mAh battery."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Helio G85", en: "MediaTek Helio G85" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "IPS LCD 90Hz", en: "IPS LCD 90Hz" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۶ گیگابایت", en: "6 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۱۶۰ میلی‌آمپر", en: "5160 mAh" } },
    ],
  },
  {
    slug: "poco-c75",
    name: { fa: "پوکو C75", en: "Poco C75" },
    image: "/images/products/xiaomi-pococ75-v2.webp",
    price: { fa: "۶,۹۰۰,۰۰۰ تومان", en: "IRR 6,900,000" },
    brand_id: "Poco",
    category_id: "category.mobile",
    description: {
      fa: "گوشی اقتصادی پوکو با تمرکز بر دوام و کارایی روزمره.",
      en: "Economic Poco phone focusing on durability and daily performance."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "Unisoc T612", en: "Unisoc T612" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "IPS LCD", en: "IPS LCD" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۶ گیگابایت", en: "6 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۱۶۰ میلی‌آمپر", en: "5160 mAh" } },
    ],
  },
  {
    slug: "poco-c71",
    name: { fa: "پوکو C71", en: "Poco C71" },
    image: "/images/products/xiaomi-pococ71.webp",
    price: { fa: "۵,۴۰۰,۰۰۰ تومان", en: "IRR 5,400,000" },
    brand_id: "Poco",
    category_id: "category.mobile",
    description: {
      fa: "پوکو C71، ارزان‌ترین گوشی خانواده پوکو با سیستم‌عامل سبک.",
      en: "Poco C71, the most affordable Poco family phone with a lightweight OS."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Helio G37", en: "MediaTek Helio G37" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "IPS LCD", en: "IPS LCD" } },
      { label: { fa: "رم", en: "RAM" }, value: { fa: "۴ گیگابایت", en: "4 GB" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۰۰۰ میلی‌آمپر", en: "5000 mAh" } },
    ],
  },

  // --- FEATURE PHONES ---
  {
    slug: "nokia-105-4g",
    name: { fa: "نوکیا 105 4G", en: "Nokia 105 4G" },
    image: "/images/products/nokia-105-4g.webp",
    price: { fa: "۱,۷۵۰,۰۰۰ تومان", en: "IRR 1,750,000" },
    brand_id: "Nokia",
    category_id: "category.feature_phone",
    description: {
      fa: "نوکیا ۱۰۵ جدید با پشتیبانی از شبکه 4G و کیفیت ساخت کلاسیک نوکیا.",
      en: "New Nokia 105 with 4G support and classic Nokia build quality."
    },
    specEntries: [
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "۱.۸ اینچ QQVGA", en: "1.8\" QQVGA" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۱۰۰۰ میلی‌آمپر", en: "1000 mAh" } },
      { label: { fa: "شبکه", en: "Network" }, value: { fa: "4G", en: "4G" } },
      { label: { fa: "سیم‌کارت", en: "SIM" }, value: { fa: "دو سیم‌کارت", en: "Dual SIM" } },
    ],
  },

  // --- TABLETS ---
  {
    slug: "samsung-galaxy-tab-a9-plus",
    name: { fa: "سامسونگ گلکسی تب A9 پلاس", en: "Samsung Galaxy Tab A9+" },
    image: "/images/products/samsung-tab-a9-plus.webp",
    price: { fa: "۱۲,۹۰۰,۰۰۰ تومان", en: "IRR 12,900,000" },
    brand_id: "Samsung",
    category_id: "category.tablet",
    description: {
      fa: "تبلت سامسونگ گلکسی Tab A9+ با صفحه‌نمایش ۱۱ اینچی ۹۰ هرتز، مناسب برای مولتی‌مدیا.",
      en: "Samsung Galaxy Tab A9+ with 11-inch 90Hz display, perfect for multimedia."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "اسنپدراگون 695 5G", en: "Snapdragon 695 5G" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "TFT LCD 90Hz", en: "TFT LCD 90Hz" } },
      { label: { fa: "اندازه", en: "Size" }, value: { fa: "۱۱ اینچ", en: "11 inches" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۷۰۴۰ میلی‌آمپر", en: "7040 mAh" } },
    ],
  },
  {
    slug: "samsung-galaxy-tab-a9",
    name: { fa: "سامسونگ گلکسی تب A9", en: "Samsung Galaxy Tab A9" },
    image: "/images/products/samsung-tab-a9.webp",
    price: { fa: "۸,۷۰۰,۰۰۰ تومان", en: "IRR 8,700,000" },
    brand_id: "Samsung",
    category_id: "category.tablet",
    description: {
      fa: "تبلت کامپکت ۸.۷ اینچی سامسونگ، ایده‌آل برای مطالعه و حمل آسان.",
      en: "Compact 8.7-inch Samsung tablet, ideal for reading and easy portability."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "مدیاتک Helio G99", en: "MediaTek Helio G99" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "TFT LCD", en: "TFT LCD" } },
      { label: { fa: "اندازه", en: "Size" }, value: { fa: "۸.۷ اینچ", en: "8.7 inches" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۵۱۰۰ میلی‌آمپر", en: "5100 mAh" } },
    ],
  },

  // --- SMARTWATCHES ---
  {
    slug: "apple-watch-series-11-46mm",
    name: { fa: "ساعت هوشمند 46 میلی‌متری اپل مدل Apple Watch Series 11", en: "Apple Watch Series 11 (46mm)" },
    image: "/images/products/apple-watch-series11-46mm.webp",
    price: { fa: "۲۴,۵۰۰,۰۰۰ تومان", en: "IRR 24,500,000" },
    brand_id: "Apple",
    category_id: "category.smartwatch",
    description: {
      fa: "اپل واچ سری ۱۱ با صفحه‌نمایش بزرگتر و سنسورهای جدید سلامتی.",
      en: "Apple Watch Series 11 with larger display and new health sensors."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "S11 SiP", en: "S11 SiP" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "OLED Retina همیشه روشن", en: "Always-on OLED Retina" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "تا ۱۸ ساعت", en: "Up to 18 hours" } },
      { label: { fa: "مقاومت آب", en: "Water Resistance" }, value: { fa: "تا عمق ۵۰ متر", en: "Up to 50 meters" } },
    ],
  },
  {
    slug: "apple-watch-series-11-42mm",
    name: { fa: "ساعت هوشمند 42 میلی‌متری اپل مدل Apple Watch Series 11", en: "Apple Watch Series 11 (42mm)" },
    image: "/images/products/apple-watch-series10-silver.webp",
    price: { fa: "۲۲,۸۰۰,۰۰۰ تومان", en: "IRR 22,800,000" },
    brand_id: "Apple",
    category_id: "category.smartwatch",
    description: {
      fa: "نسخه ۴۲ میلی‌متری اپل واچ ۱۱ با طراحی ظریف‌تر و تمام ویژگی‌های جدید.",
      en: "42mm version of Apple Watch 11 with a sleeker design and all new features."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "S11 SiP", en: "S11 SiP" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "OLED Retina همیشه روشن", en: "Always-on OLED Retina" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "تا ۱۸ ساعت", en: "Up to 18 hours" } },
      { label: { fa: "مقاومت آب", en: "Water Resistance" }, value: { fa: "تا عمق ۵۰ متر", en: "Up to 50 meters" } },
    ],
  },
  {
    slug: "apple-watch-ultra-3-black-titanium",
    name: { fa: "ساعت هوشمند اپل مدل Apple Watch Ultra 3 تیتانیوم مشکی", en: "Apple Watch Ultra 3 (Black Titanium)" },
    image: "/images/products/apple-watch-series10-40mm-blk.webp",
    price: { fa: "۴۸,۵۰۰,۰۰۰ تومان", en: "IRR 48,500,000" },
    brand_id: "Apple",
    category_id: "category.smartwatch",
    description: {
      fa: "اپل واچ اولترا ۳ با بدنه تیتانیوم مشکی و بیشترین دوام باتری.",
      en: "Apple Watch Ultra 3 with black titanium body and maximum battery life."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "S11 SiP", en: "S11 SiP" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "OLED Retina همیشه روشن", en: "Always-on OLED Retina" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "تا ۱۰۰ ساعت", en: "Up to 100 hours" } },
      { label: { fa: "جنس بدنه", en: "Build" }, value: { fa: "تیتانیوم مشکی", en: "Black Titanium" } },
    ],
  },
  {
    slug: "apple-watch-se-44mm",
    name: { fa: "ساعت هوشمند اپل مدل Apple Watch SE", en: "Apple Watch SE 44mm" },
    image: "/images/products/apple-watch-se-44mm.webp",
    price: { fa: "۱۵,۴۰۰,۰۰۰ تومان", en: "IRR 15,400,000" },
    brand_id: "Apple",
    category_id: "category.smartwatch",
    description: {
      fa: "بهترین ارزش خرید در ساعت‌های هوشمند اپل با تمام ویژگی‌های ضروری.",
      en: "The best value in Apple smartwatches with all the essential features."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "S8 SiP", en: "S8 SiP" } },
      { label: { fa: "صفحه‌نمایش", en: "Display" }, value: { fa: "Retina LTPO OLED", en: "Retina LTPO OLED" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "تا ۱۸ ساعت", en: "Up to 18 hours" } },
      { label: { fa: "جنس بدنه", en: "Build" }, value: { fa: "آلومینیوم بازیافتی", en: "Recycled Aluminum" } },
    ],
  },

  // --- ACCESSORIES ---
  {
    slug: "apple-airpods-pro-2",
    name: { fa: "هدفون بی‌سیم اپل مدل AirPods Pro 2", en: "AirPods Pro 2" },
    image: "/images/products/apple-airpods-pro2.webp",
    price: { fa: "۱۲,۲۰۰,۰۰۰ تومان", en: "IRR 12,200,000" },
    brand_id: "Apple",
    category_id: "category.accessories",
    description: {
      fa: "ایرفونز اپل مدل AirPods Pro 2 با حذف نویز فعال دو برابر قوی‌تر.",
      en: "Apple AirPods Pro 2 with two times stronger Active Noise Cancellation."
    },
    specEntries: [
      { label: { fa: "تراشه", en: "Chip" }, value: { fa: "Apple H2", en: "Apple H2" } },
      { label: { fa: "حذف نویز", en: "Noise Cancellation" }, value: { fa: "حذف نویز فعال", en: "Active Noise Cancellation" } },
      { label: { fa: "باتری", en: "Battery" }, value: { fa: "۶ ساعت + ۳۰ ساعت با کیس", en: "6h + 30h with case" } },
      { label: { fa: "مقاومت", en: "Resistance" }, value: { fa: "IPX4", en: "IPX4" } },
    ],
  },
];