
CREATE TABLE public.representatives (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  province TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.representatives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view representatives"
ON public.representatives FOR SELECT
USING (true);

CREATE POLICY "Admins can insert representatives"
ON public.representatives FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update representatives"
ON public.representatives FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete representatives"
ON public.representatives FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.representatives (name, province, city, phone, address) VALUES
('موبایل کسری', 'گیلان', 'رشت', '013-33235303', 'رشت خیابان لاکانی ، جنب بیمه آسیا موبایل کسری'),
('موبایل اورژانس', 'خراسان رضوی', 'سبزوار', '051-44230039', 'سبزوار،خیابان کاشفی شمالی نبش کاشفی8،اورژانس موبایل'),
('موبایل وحید', 'اصفهان', 'اصفهان', '031-32228180', 'خیابان فردوسی مجتمع زاینده رود طبقه اول فروشگاه وحید'),
('سامسونگ مرکزی', 'آذربایجان شرقی', 'تبریز', '041-36600150', 'تبریز اتوبان پاسداران میدان فهمیده مجتمع تجاری لاله پارک،طبقه منفی یک فروشگاه سامسونگ'),
('فروشگاه ایران زمین', 'اصفهان', 'اصفهان', '031-32214031', 'اصفهان خیابان فردوسی ،روبه روی بانک صادرات فروشگاه ایران زمین'),
('فروشگاه هایپرفون', 'فارس', 'شیراز', '071-36290217', 'شیراز-خیابان عفیف آباد روبه روی کوچه 1 فروشگاه هایپرفون'),
('فروشگاه کنسل', 'مازندران', 'قائم شهر', '011-42231256', 'قائم شهر خیابان امام خمینی پاساژ نسیم پلاک43 طبقه همکف آقای گرائلی'),
('شرکت فنی مهندسی نانو', 'بوشهر', 'بوشهر', '077-33320708', 'بوشهر بلوار بهشت صادق روبروی بانک سپه طبقه همکف آقای عبدالرضا کارگر'),
('آل دیجیتال', 'کرمان', 'کرمان', '034-32231911', 'کرمان خیابان فردوسی نبش وحشی بافقی فروشگاه آل دیجیتال'),
('موبایل آوا', 'آذربایجان غربی', 'ارومیه', '044-3469061', 'ارومیه خیابان مدرس نبش کوچه 20متری نوذری آقای نوید قدرتی'),
('گروه فنی سپهر پویا', 'البرز', 'کرج', '026-32233652', 'کرج میدان کرج خیابان شهید دکتر بهشتی کوچه هما پاساژ کمالی گروه فنی سپهرپویا'),
('فروشگاه موبایل حافظ', 'مرکزی', 'اراک', '086-42222522', 'ساوه خیابان امام پاساژ رضا طبقه همکف پلاک 60 فروشگاه موبایل حافظ'),
('آقای حامد صمدی', 'خراسان رضوی', 'مشهد', '0915-5099431', 'مشهد احمدآباد نبش خیابان بهشت مجتمع موبایل مشهد طبقه اول اداری واحد4');
