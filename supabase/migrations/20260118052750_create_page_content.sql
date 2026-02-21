CREATE TABLE IF NOT EXISTS public.page_content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    page text NOT NULL,
    section text NOT NULL,
    content_key text NOT NULL,
    content_fa text NOT NULL,
    content_en text NOT NULL
);

ALTER TABLE public.page_content OWNER TO postgres;
ALTER TABLE ONLY public.page_content
    ADD CONSTRAINT page_content_pkey PRIMARY KEY (id);

-- Clear existing data to prevent duplicates
DELETE FROM public.page_content;

-- Insert new data
INSERT INTO public.page_content (page, section, content_key, content_fa, content_en) VALUES
-- General
('general', 'general', 'all', 'همه', 'All'),
('general', 'product', 'coming_soon', 'اطلاعات این محصول به زودی تکمیل می‌شود.', 'Product information will be available soon.'),

-- Brands
('general', 'brands', 'Apple', 'اپل', 'Apple'),
('general', 'brands', 'Samsung', 'سامسونگ', 'Samsung'),
('general', 'brands', 'Xiaomi', 'شیائومی', 'Xiaomi'),
('general', 'brands', 'Poco', 'پوکو', 'Poco'),
('general', 'brands', 'Nokia', 'نوکیا', 'Nokia'),

-- Categories
('general', 'categories', 'mobile', 'موبایل', 'Mobile'),
('general', 'categories', 'smartwatch', 'ساعت هوشمند', 'Smartwatch'),
('general', 'categories', 'tablet', 'تبلت', 'Tablet'),
('general', 'categories', 'accessories', 'لوازم جانبی', 'Accessories'),
('general', 'categories', 'feature_phone', 'موبایل ساده', 'Feature Phone'),

-- Navigation
('navigation', 'main', 'home', 'صفحه اصلی', 'Home'),
('navigation', 'main', 'warranty', 'گارانتی آرمان همراه', 'Arman Warranty'),
('navigation', 'main', 'products', 'محصولات', 'Products'),
('navigation', 'main', 'export', 'صادرات', 'Export'),
('navigation', 'main', 'representatives', 'نمایندگان', 'Representatives'),
('navigation', 'main', 'blog', 'بلاگ و آموزش', 'Blog & Training'),
('navigation', 'main', 'contact', 'تماس با ما', 'Contact Us'),
('navigation', 'main', 'myArman', 'ثبت نام', 'Register'),
('navigation', 'main', 'cooperation', 'همکاری با ما', 'Cooperation'),

-- Hero Section
('home', 'hero', 'title', 'هوشمندترین گارانتی و خدمات', 'The Smartest Warranty & Services'),
('home', 'hero', 'subtitle', 'پس از فروش در ایران', 'After-Sales in Iran'),
('home', 'hero', 'description', 'شرکت گارانتی آرمان همراه ارتباطات آریا از سال ۱۳۹۳ تا کنون با بهترین تجربه در ارائه خدمات به مشتریان', 'Arman Hamrah Aria Communications Warranty Company has been providing the best customer service experience since 2014'),
('home', 'hero', 'cta', 'خدمات ما', 'Our Services'),
('home', 'hero', 'cta2', 'ثبت نام', 'Register'),

-- Other sections based on your LanguageContext...
('home', 'brands', 'title', 'برندهای تحت پوشش', 'Covered Brands'),
('home', 'services', 'title', 'خدمات ما', 'Our Services'),
('home', 'subsidiaries', 'title', 'شرکت‌های زیرمجموعه', 'Subsidiary Companies'),
('home', 'app_section', 'title', 'خدمات پس از فروش در دستان شما', 'After-Sales Service at Your Fingertips'),

-- Products Page
('products_page', 'main', 'title', 'محصولات', 'Products'),
('products_page', 'main', 'description', 'تمامی محصولات با گارانتی معتبر آرمان همراه ارتباطات آریا عرضه می‌شوند', 'All products come with a valid Arman Hamrah Communications Aria warranty'),

-- Export Page
('export_page', 'main', 'title', 'صادرات آرمان', 'Arman Export'),

-- Guarantee Page
('guarantee_page', 'main', 'title', 'شرایط گارانتی ۱۸ ماهه', '18-Month Warranty Terms'),

-- Representatives Page
('representatives_page', 'main', 'title', 'نمایندگان فروش', 'Sales Representatives'),

-- Footer
('footer', 'main', 'description', 'شرکت گارانتی آرمان همراه ارتباطات آریا، ارائه دهنده خدمات گارانتی و پس از فروش برای برندهای معتبر جهانی', 'Arman Hamrah Aria Communications Warranty Company, providing warranty and after-sales services for prestigious global brands'),
('footer', 'links', 'quickLinks', 'لینک‌های سریع', 'Quick Links'),
('footer', 'contact', 'contact', 'تماس با ما', 'Contact Us'),
('footer', 'social', 'followUs', 'ما را دنبال کنید', 'Follow Us');
