import { CheckCircle2, Zap, Gauge, Image, Link as LinkIcon, Globe, Smartphone, Search } from 'lucide-react';

const TechnicalSEO = () => {
  return (
    <section className="section-padding bg-zinc-900 text-white border-y border-white/10">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-bold mb-4">
            <Zap size={14} className="text-yellow-400" /> سئو تکنیکال پیاده‌سازی شده - مرحله ۶ نهایی
          </div>
          <h2 className="text-3xl font-black mb-4">سئو فنی و تکنیکال اجرا شده برای انفجار رتبه تعمیرات</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto leading-7">برای اینکه با تمام کیوردهای تعمیرات بیای بالا، این موارد فنی پیاده شد</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Gauge,
              title: 'Core Web Vitals & SXO',
              items: ['تمام عکس‌ها lazy + async + width/height برای CLS صفر', 'فرمت WebP با fallback JPG - حجم ۷۰٪ کمتر', 'چیدمان ریسپانسیو Tailwind، Hover lift، سایه برای تجربه کاربری', 'CTA دوتایی و باکس بیا پیش ما زرد برای نرخ کلیک بالا', 'فونت IranSans + line-height 8 برای خوانایی فارسی']
            },
            {
              icon: Image,
              title: 'Image SEO + GEO',
              items: ['۸۰+ عکس واقعی تعمیرات در public/images/repairs/', 'Alt پر از کیورد: تعمیر آیفون ۱۷ پرو، PS5 HDMI، ایرپاد پرو ۲...', 'ImageObject Schema برای ایندکس در Google Images', 'Gallery با ۳-۴ عکس برای هر دسته برای E-E-A-T', 'Preload برای LCP و dns-prefetch']
            },
            {
              icon: LinkIcon,
              title: 'Internal Linking & Hashtags',
              items: ['هر کارت ۱۰ هشتگ پرجستجو مثل #تعمیر_موبایل #تعمیر_PS5', 'Anchor داخلی /warranty/repairs#mobile #ps5 #airpods', 'Breadcrumb در تمام صفحات برای خزش', 'لینک متقابل بین ۳ صفحه گارانتی و محصولات', 'مدل‌های پرتعمیر به عنوان تگ + کیورد']
            },
            {
              icon: Globe,
              title: 'Structured Data - AEO/GEO/AIO',
              items: ['FAQPage با ۱۰+ سوال مستقیم برای AEO', 'Service + OfferCatalog برای هر تعمیر', 'LocalBusiness + ComputerRepairShop با آدرس علاءالدین', 'HowTo ۴ مرحله تعمیر برای GEO', 'Speakable + BreadcrumbList + AggregateRating 4.9 برای AIO']
            },
            {
              icon: Search,
              title: 'Content SEO - 1500+ کلمه',
              items: ['هر دسته ۱۵۰۰+ کلمه یونیک بازنویسی شده - نه کپی', 'H1 فقط یکی، H2/H3 سلسله‌مراتبی پر از کیورد', 'کلمه کلیدی در ۱۰۰ کلمه اول + آخر + Alt', 'LSI: تعویض ال‌سی‌دی، باتری، برد، آبخوردگی، HDMI، دریفت', 'CTA بیا پیش ما با MapPin در هر بخش برای لوکال سئو']
            },
            {
              icon: Smartphone,
              title: 'Technical Fixes',
              items: ['Sitemap.xml اولویت daily برای /warranty و /repairs 1.0', 'Robots.txt Allow کامل برای تعمیرات + Host', 'Canonical + hreflang fa-IR/en-US/x-default', 'Meta keywords مگا ۴۰+ کیورد تعمیرات', 'og:image 1200x630 + og:site_name + twitter card']
            }
          ].map((sec, i)=>(
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <sec.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-black text-white mb-3">{sec.title}</h3>
              <ul className="space-y-2 text-xs text-zinc-400 leading-6">
                {sec.items.map((it, j)=>(
                  <li key={j} className="flex gap-2"><CheckCircle2 size={14} className="text-green-400 flex-shrink-0 mt-0.5" />{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-primary text-primary-foreground">
          <h3 className="font-black text-lg mb-2">🚀 نتیجه نهایی برای سئو تعمیرات - آماده انفجار گوگل!</h3>
          <p className="text-sm leading-8 opacity-90">
            الان با ۶ دسته بندی، ۸۰ عکس واقعی، ۶ محتوای ۱۵۰۰+ کلمه‌ای یونیک (جمعا ۹۰۰۰+ کلمه)، ۶۰ هشتگ پرجستجو، ۲۰+ اسکیما، سئو تکنیکال کامل و CTA بیا پیش ما در هر بخش، <strong>برای تمام سرچ‌های تعمیرات موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند</strong> در تهران و ایران، صفحه گارانتی آرمان همراه میاد بالا. عیب‌یابی رایگان، گارانتی کتبی و قطعه اورجینال برگ برنده ماست.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSEO;
