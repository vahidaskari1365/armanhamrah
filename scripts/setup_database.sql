/*
-- =============================================
-- Description: FINAL, ROBUST & FULLY-TRANSLATED Database Setup Script
--
-- This single script does everything and is designed to be re-runnable:
-- 0. !! DROPS existing tables to ensure a clean state !!
-- 1. Creates all necessary tables: brands, categories, products, user_roles.
-- 2. Sets up proper foreign key relationships.
-- 3. Applies all necessary Row Level Security (RLS) policies.
-- 4. Migrates ALL 31 old products with TRANSLATION KEYS for specs.
--
-- Run this entire script ONCE in a clean Supabase SQL Editor.
-- =============================================
*/

-- ==========
-- Step 0: Clean Slate - Drop Old Tables if they Exist
-- ==========
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.brands CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;


-- ==========
-- Step 1: Create Tables
-- ==========
CREATE TABLE public.brands (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    CONSTRAINT brands_pkey PRIMARY KEY (id),
    CONSTRAINT brands_name_key UNIQUE (name)
);

CREATE TABLE public.categories (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_name_key UNIQUE (name)
);

CREATE TABLE public.products (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    slug text NOT NULL,
    description text NULL,
    image text NULL, 
    brand_id uuid NULL, 
    category_id uuid NULL,
    specs jsonb NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT products_slug_key UNIQUE (slug),
    CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE SET NULL,
    CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL
);

CREATE TABLE public.user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL
);


-- ==========
-- Step 2: Apply Row Level Security (RLS) Policies
-- ==========
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access on Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Categories" ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admin Full Access on Products" ON public.products FOR ALL USING ( (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin' ) WITH CHECK ( (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin' );
CREATE POLICY "Admin Full Access on Brands" ON public.brands FOR ALL USING ( (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin' ) WITH CHECK ( (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin' );
CREATE POLICY "Admin Full Access on Categories" ON public.categories FOR ALL USING ( (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin' ) WITH CHECK ( (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin' );


-- ==========
-- Step 3: Apply Storage Policies
-- ==========
DROP POLICY IF EXISTS "Public Read Access on Product Images" ON storage.objects;
CREATE POLICY "Public Read Access on Product Images" ON storage.objects FOR SELECT USING ( bucket_id = 'products' );

DROP POLICY IF EXISTS "Admin Full Access on Product Images" ON storage.objects;
CREATE POLICY "Admin Full Access on Product Images" ON storage.objects FOR ALL USING ( bucket_id = 'products' AND (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin' ) WITH CHECK ( bucket_id = 'products' AND (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin' );


-- ==========
-- Step 4: Migrate Old Data (with Full Translation Keys)
-- ==========
INSERT INTO public.brands (name) VALUES
('Samsung'), ('Apple'), ('Xiaomi'), ('Poco'), ('Nokia')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.categories (name) VALUES
('موبایل'), ('ساعت هوشمند'), ('تبلت'), ('لوازم جانبی'), ('گوشی ساده')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.products (name, slug, description, image, brand_id, category_id, specs)
WITH BrandIDs AS (
  SELECT id, name FROM public.brands
),
CategoryIDs AS (
  SELECT id, name FROM public.categories
)
SELECT 
    p.name,
    p.slug,
    p.description,
    p.image,
    b.id as brand_id,
    c.id as category_id,
    p.specs::jsonb
FROM (
  VALUES
    ('Apple Watch Series 11 46mm', 'apple-watch-series11-46mm', 'product.apple_watch_s11.description', '/images/products/apple-watch-series11-46mm.png', 'Apple', 'ساعت هوشمند', '{"spec.display": "spec.value.retina_ltpo_oled_always_on", "spec.cpu": "spec.value.s11_sip", "spec.water_resistance": "spec.value.water_resistance_50m", "spec.sensors": "spec.value.sensors_s11", "spec.features": "spec.value.features_s11", "spec.battery": "spec.value.battery_s11", "spec.connectivity": "spec.value.connectivity_s11"}'),
    ('Apple Watch SE 44mm', 'apple-watch-se-44mm', 'product.apple_watch_se11_44.description', '/images/products/apple-watch-se-44mm.webp', 'Apple', 'ساعت هوشمند', '{"spec.display": "spec.value.retina_ltpo_oled", "spec.cpu": "spec.value.s8_sip", "spec.water_resistance": "spec.value.water_resistance_50m", "spec.sensors": "spec.value.sensors_se11", "spec.features": "spec.value.features_se", "spec.battery": "spec.value.battery_18h", "spec.connectivity": "spec.value.connectivity_se"}'),
    ('Apple Watch Series 10 40mm Black', 'apple-watch-series10-40mm-blk', 'product.apple_watch_se10_40.description', '/images/products/Apple Watch series10 40mm BLK.png', 'Apple', 'ساعت هوشمند', '{"spec.display": "spec.value.retina_ltpo_oled", "spec.cpu": "spec.value.s8_sip", "spec.internal_storage": "spec.value.32_gb", "spec.water_resistance": "spec.value.water_resistance_50m", "spec.sensors": "spec.value.sensors_se10", "spec.features": "spec.value.features_se_sleep", "spec.battery": "spec.value.battery_18h", "spec.connectivity": "spec.value.connectivity_se"}'),
    ('Apple Watch Series 10 Silver', 'apple-watch-series10-silver', 'product.apple_watch_se10_40.description', '/images/products/Apple-Watch-series10-silver.png', 'Apple', 'ساعت هوشمند', '{"spec.display": "spec.value.retina_ltpo_oled", "spec.cpu": "spec.value.s8_sip", "spec.internal_storage": "spec.value.32_gb", "spec.water_resistance": "spec.value.water_resistance_50m", "spec.sensors": "spec.value.sensors_se10", "spec.features": "spec.value.features_se_sleep", "spec.battery": "spec.value.battery_18h", "spec.connectivity": "spec.value.connectivity_se"}'),
    ('Apple AirPods Pro 2', 'apple-airpods-pro2', 'product.airpods_pro_2.description', '/images/products/apple-airpods-pro2.jpg', 'Apple', 'لوازم جانبی', '{"spec.chip": "spec.value.apple_h2", "spec.noise_cancellation": "spec.value.active_noise_cancellation", "spec.transparency_mode": "spec.value.adaptive_transparency", "spec.spatial_audio": "spec.value.personalized_spatial_audio", "spec.microphones": "spec.value.dual_beamforming_mics", "spec.sensors": "spec.value.sensors_airpods_pro_2", "spec.resistance": "spec.value.resistance_ipx4", "spec.battery_earbuds": "spec.value.battery_airpods_6h", "spec.battery_case": "spec.value.battery_airpods_30h", "spec.connectivity": "spec.value.bluetooth_5_3"}'),
    ('Samsung Galaxy S25 Ultra', 'samsung-galaxys25ultra', 'product.samsung_s25_ultra.description', '/images/products/samsung-galaxys25ultra.png', 'Samsung', 'موبایل', '{"spec.display": "spec.value.display_dynamic_amoled_6_8", "spec.cpu": "spec.value.snapdragon_8_gen_4_galaxy", "spec.ram": "spec.value.12_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_s25_ultra", "spec.battery": "spec.value.battery_5000mah_45w", "spec.pen": "spec.value.spen_ai"}'),
    ('Samsung Galaxy S25 FE', 'samsung-galaxys25-fe', 'product.samsung_s25_fe.description', '/images/products/samsung-galaxys25-fe.png', 'Samsung', 'موبایل', '{"spec.display": "spec.value.display_dynamic_amoled_6_4", "spec.cpu": "spec.value.exynos_2400_snapdragon_8_gen_3", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_s25_fe", "spec.battery": "spec.value.battery_4500mah_25w", "spec.resistance": "spec.value.resistance_ip68"}'),
    ('Samsung A56', 'samsung-a56', 'product.samsung_a56.description', '/images/products/samsung-a56.png', 'Samsung', 'موبایل', '{"spec.display": "spec.value.display_super_amoled_6_6", "spec.cpu": "spec.value.exynos_1480", "spec.ram": "spec.value.12_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_a56", "spec.battery": "spec.value.battery_5000mah_25w", "spec.security": "spec.value.samsung_knox_vault"}'),
    ('Samsung A36', 'samsung-a36', 'product.samsung_a36.description', '/images/products/samsung-a36.png', 'Samsung', 'موبایل', '{"spec.display": "spec.value.display_super_amoled_6_6_120hz", "spec.cpu": "spec.value.exynos_1380", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_a36", "spec.battery": "spec.value.battery_5000mah_25w", "spec.resistance": "spec.value.resistance_ip67"}'),
    ('Samsung A26', 'samsung-a26', 'product.samsung_a26.description', '/images/products/samsung-a26.png', 'Samsung', 'موبایل', '{"spec.display": "spec.value.display_super_amoled_6_5_120hz", "spec.cpu": "spec.value.exynos_1280", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_a26", "spec.battery": "spec.value.battery_5000mah_25w"}'),
    ('Samsung A17', 'samsung-a17', 'product.samsung_a17.description', '/images/products/samsung-a17.png', 'Samsung', 'موبایل', '{"spec.display": "spec.value.display_super_amoled_6_5_90hz", "spec.cpu": "spec.value.mediatek_helio_g99", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_a17", "spec.battery": "spec.value.battery_5000mah_25w"}'),
    ('Samsung A07', 'samsung-a07', 'product.samsung_a07.description', '/images/products/samsung-a07.png', 'Samsung', 'موبایل', '{"spec.display": "spec.value.display_pls_lcd_6_7_90hz", "spec.cpu": "spec.value.snapdragon_680_4g", "spec.ram": "spec.value.6_gb", "spec.internal_storage": "spec.value.128_gb", "spec.main_camera": "spec.value.camera_a07", "spec.battery": "spec.value.battery_5000mah_25w"}'),
    ('Samsung A06', 'samsung-a06', 'product.samsung_a06.description', '/images/products/samsung-a06.png', 'Samsung', 'موبایل', '{"spec.display": "spec.value.display_pls_lcd_6_7", "spec.cpu": "spec.value.mediatek_helio_g85", "spec.ram": "spec.value.4_gb", "spec.internal_storage": "spec.value.128_gb", "spec.main_camera": "spec.value.camera_a06", "spec.battery": "spec.value.battery_5000mah_25w"}'),
    ('Samsung TAB A9 Plus', 'samsung-tab-a9-plus', 'product.samsung_tab_a9_plus.description', '/images/products/samsung-tab-a9-plus.png', 'Samsung', 'تبلت', '{"spec.display": "spec.value.display_tft_lcd_11_90hz", "spec.cpu": "spec.value.snapdragon_695_5g", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.128_gb", "spec.main_camera": "spec.value.8_mp", "spec.battery": "spec.value.7040_mah", "spec.sound": "spec.value.sound_quad_dolby_atmos"}'),
    ('Samsung TAB A9', 'samsung-tab-a9', 'product.samsung_tab_a9.description', '/images/products/samsung-tab-a9.png', 'Samsung', 'تبلت', '{"spec.display": "spec.value.display_tft_lcd_8_7", "spec.cpu": "spec.value.mediatek_helio_g99", "spec.ram": "spec.value.4_gb", "spec.internal_storage": "64 GB", "spec.main_camera": "spec.value.8_mp", "spec.battery": "spec.value.5100_mah"}'),
    ('Xiaomi 15T', 'xiaomi-15t', 'product.xiaomi_15t.description', '/images/products/xiaomi-15t.png', 'Xiaomi', 'موبایل', '{"spec.display": "spec.value.display_crystalres_amoled_6_36", "spec.cpu": "spec.value.snapdragon_8_gen_4", "spec.ram": "spec.value.12_gb", "spec.internal_storage": "spec.value.512_gb", "spec.main_camera": "spec.value.camera_xiaomi_15t", "spec.battery": "spec.value.battery_4610mah_90w", "spec.os": "spec.value.xiaomi_hyperos"}'),
    ('Xiaomi Redmi Note 14S', 'xiaomi-redminote-14-s', 'product.redmi_note_14s.description', '/images/products/xiaomi-redminote-14-s.png', 'Xiaomi', 'موبایل', '{"spec.display": "spec.value.display_1_5k_amoled_6_67", "spec.cpu": "spec.value.snapdragon_7s_gen_2", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_redmi_note_14s", "spec.battery": "spec.value.battery_5100mah_67w", "spec.resistance": "spec.value.corning_gorilla_glass_victus"}'),
    ('Xiaomi Redmi Note 14 Pro', 'xiaomi-redminote-14-pro', 'product.redmi_note_14_pro.description', '/images/products/xiaomi-redminote-14-pro.png', 'Xiaomi', 'موبایل', '{"spec.display": "spec.value.display_1_5k_crystalres_amoled_6_67", "spec.cpu": "spec.value.mediatek_dimensity_7200_ultra", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_redmi_note_14_pro", "spec.battery": "spec.value.battery_5000mah_120w", "spec.resistance": "spec.value.resistance_ip68"}'),
    ('Xiaomi Redmi Note 14', 'xiaomi-redminote-14', 'product.redmi_note_14.description', '/images/products/xiaomi-redminote-14.png', 'Xiaomi', 'موبایل', '{"spec.display": "spec.value.display_amoled_6_67_120hz", "spec.cpu": "spec.value.mediatek_dimensity_6080", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_redmi_note_14", "spec.battery": "spec.value.battery_5000mah_33w"}'),
    ('Xiaomi Redmi 15', 'xiaomi-redmi15', 'product.redmi_15.description', '/images/products/xiaomi-redmi15.png', 'Xiaomi', 'موبایل', '{"spec.display": "spec.value.display_fhd_plus_amoled_6_79_90hz", "spec.cpu": "spec.value.mediatek_helio_g91_ultra", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_redmi_15", "spec.battery": "spec.value.battery_5030mah_33w", "spec.resistance": "spec.value.ip53"}'),
    ('Xiaomi Redmi 15C', 'xiaomi-redmi15c', 'product.redmi_15c.description', '/images/products/xiaomi-redmi15c.png', 'Xiaomi', 'موبایل', '{"spec.display": "spec.value.display_ips_lcd_6_74_90hz", "spec.cpu": "spec.value.mediatek_helio_g85", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_redmi_15c", "spec.battery": "spec.value.battery_5000mah_18w"}'),
    ('Xiaomi Redmi 13X', 'xiaomi-redmi13x', 'product.coming_soon', '/images/products/xiaomi-redmi13x.png', 'Xiaomi', 'موبایل', '{}'),
    ('Xiaomi Redmi A5', 'xiaomi-redmi-a5', 'product.redmi_a5.description', '/images/products/xiaomi-redmi-a5.png', 'Xiaomi', 'موبایل', '{"spec.display": "spec.value.display_ips_lcd_6_71_90hz", "spec.cpu": "spec.value.mediatek_helio_g37", "spec.ram": "spec.value.4_gb", "spec.internal_storage": "spec.value.128_gb", "spec.main_camera": "spec.value.camera_redmi_a5", "spec.battery": "spec.value.5000_mah", "spec.os": "spec.value.android_14_go_miui"}'),
    ('Xiaomi Redmi A3', 'xiaomi-redmia3', 'product.redmi_a3.description', '/images/products/xiaomi-redmia3.png', 'Xiaomi', 'موبایل', '{"spec.display": "spec.value.display_ips_lcd_6_71_90hz", "spec.cpu": "spec.value.mediatek_helio_g36", "spec.ram": "spec.value.4_gb", "spec.internal_storage": "spec.value.128_gb", "spec.main_camera": "spec.value.8_mp_wide", "spec.battery": "spec.value.5000_mah", "spec.os": "spec.value.android_14_go_miui"}'),
    ('Xiaomi Poco M7', 'xiaomi-pocom7', 'product.poco_m7.description', '/images/products/xiaomi-pocom7.png', 'Poco', 'موبایل', '{"spec.display": "spec.value.display_flow_amoled_6_67_120hz", "spec.cpu": "spec.value.mediatek_dimensity_8300_ultra", "spec.ram": "spec.value.12_gb", "spec.internal_storage": "spec.value.512_gb", "spec.main_camera": "spec.value.camera_poco_m7", "spec.battery": "spec.value.battery_5000mah_90w", "spec.fingerprint": "spec.value.fingerprint_under_display"}'),
    ('Xiaomi Poco M6', 'xiaomi-pocom6', 'product.poco_m6.description', '/images/products/xiaomi-pocom6.jpg', 'Poco', 'موبایل', '{"spec.display": "spec.value.display_flow_amoled_6_67_120hz", "spec.cpu": "spec.value.mediatek_helio_g99_ultra", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_poco_m6", "spec.battery": "spec.value.battery_5000mah_67w", "spec.fingerprint": "spec.value.fingerprint_under_display"}'),
    ('Xiaomi Poco C85', 'xiaomi-pococ85', 'product.poco_c85.description', '/images/products/xiaomi-pococ85.png', 'Poco', 'موبایل', '{"spec.display": "spec.value.display_ips_lcd_6_8_90hz", "spec.cpu": "spec.value.mediatek_helio_g99", "spec.ram": "spec.value.8_gb", "spec.internal_storage": "spec.value.256_gb", "spec.main_camera": "spec.value.camera_poco_c85", "spec.battery": "spec.value.battery_5000mah_33w"}'),
    ('Xiaomi Poco C75', 'xiaomi-pococ75', 'product.poco_c75.description', '/images/products/xiaomi-pococ75.png', 'Poco', 'موبایل', '{"spec.display": "spec.value.display_ips_lcd_6_74_90hz", "spec.cpu": "spec.value.mediatek_helio_g88", "spec.ram": "spec.value.6_gb", "spec.internal_storage": "spec.value.128_gb", "spec.main_camera": "spec.value.camera_poco_c75", "spec.battery": "spec.value.battery_5000mah_18w"}'),
    ('Xiaomi Poco C71', 'xiaomi-pococ71', 'product.poco_c71.description', '/images/products/xiaomi-pococ71.png', 'Poco', 'موبایل', '{"spec.display": "spec.value.display_ips_lcd_6_74_90hz", "spec.cpu": "spec.value.unisoc_t612", "spec.ram": "spec.value.4_gb", "spec.internal_storage": "spec.value.128_gb", "spec.main_camera": "spec.value.camera_poco_c71", "spec.battery": "spec.value.battery_5000mah_18w"}'),
    ('Nokia 105 4G', 'nokia-105-4g', 'product.nokia_105.description', '/images/products/nokia-105-4g.webp', 'Nokia', 'گوشی ساده', '{"spec.display": "spec.value.1_8_inch_qqvga", "spec.battery": "spec.value.1000_mah_removable", "spec.features": "spec.value.features_nokia_105", "spec.port": "spec.value.micro_usb", "spec.sim": "spec.value.dual_sim"}')
  ) AS p(name, slug, description, image, brand_name, category_name, specs)
JOIN BrandIDs b ON p.brand_name = b.name
JOIN CategoryIDs c ON p.category_name = c.name
ON CONFLICT (slug) DO NOTHING;


/*
-- =============================================
-- Mission Accomplished! Your database is now fully translated.
-- =============================================
*/
