ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Allow read access for all authenticated users
CREATE POLICY "Allow authenticated read access to products" ON public.products
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow full access for the specific admin user
CREATE POLICY "Allow full admin access to products" ON public.products
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'vahid.askari1986@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'vahid.askari1986@gmail.com');

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;