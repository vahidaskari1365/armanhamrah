-- This script fixes Row Level Security (RLS) to allow public access to products, brands, and categories.

-- 1. Drop the old, incorrect policy on the 'products' table that required users to be logged in.
DROP POLICY IF EXISTS "Allow authenticated read access to products" ON public.products;

-- 2. Create a new, correct policy that allows ANYONE (public) to read products.
CREATE POLICY "Allow public read access to products"
ON public.products
FOR SELECT
USING (true);

-- 3. Just in case, ensure brands and categories are also publicly readable.
DROP POLICY IF EXISTS "Public Read Access on Brands" ON public.brands;
CREATE POLICY "Public Read Access on Brands" ON public.brands FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access on Categories" ON public.categories;
CREATE POLICY "Public Read Access on Categories" ON public.categories FOR SELECT USING (true);
