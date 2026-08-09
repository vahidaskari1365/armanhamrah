import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, Shield, PhoneCall, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import { tehranAreasData } from '@/data/tehranAreasData';
import { repairCategoriesData } from '@/data/repairCategoriesData';
import NotFound from '../NotFound';

const areaContent = (name: string, neighborhoods: string) => `
## تعمیر موبایل و PS5 در ${name} تهران

ساکنین ${name} (${neighborhoods}) معمولاً دو گزینه دارند: تعمیرگاه محلی نزدیک محل سکونت یا مرکز تخصصی مجهز مانند آرمان همراه. تجربه ما نشان می‌دهد برای خرابی‌های تخصصی — تعویض ال‌سی‌دی اورجینال، تعمیر برد، تعویض باتری همراه با تست ظرفیت، تعمیر PS5 و ایرپاد — مرکز تخصصی با میکروسکوپ و پروگرامر نتیجه‌ی مطمئن‌تری دارد.

### چرا ساکنین ${name} تعمیرات را به آرمان همراه می‌سپارند؟

- عیب‌یابی ۱۰۰٪ رایگان حتی در صورت عدم انجام تعمیر
- قطعات اورجینال با گارانتی کتبی ۳ ماهه؛ بدون قطعات کپی
- تعمیر ال‌سی‌دی، باتری، برد، فیس آیدی و چیپست با میکروسکوپ
- تعمیر PS5، ایرپاد، ساعت هوشمند و اسپیکر همه در یک مرکز

### دسترسی ${name} به مرکز تعمیرات

مرکز ما در خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴ قرار دارد. با مترو (ایستگاه مفتح یا بهارستان)، اتوبوس آنتویی یا تاکسی اینترنتی به راحتی قابل دسترسی است. اگر وقت مراجعه ندارید، می‌توانید دستگاه را با پیک برای ما بفرستید؛ بعد از عیب‌یابی، قیمت دقیق اعلام و پس از تایید شما تعمیر انجام می‌شود.

### خدمات ما برای اهالی ${name}

- گوشی موبایل: آیفون ۱۷ پرو، ۱۶ پرو و ۱۵، سامسونگ S25 و S24 اولترا و سری A، شیائیمی، پوکو
- پلی‌استیشن ۵ (PS5)، دسته DualSense و هدست
- ایرپاد پرو ۲ و ایرپاد ۴، هدفون گلکسی بادز ۳ پرو و انکر
- ساعت هوشمند اپل واچ اولترا ۳ و سری ۱۱، گلکسی واچ ۸

برای نوبت‌دهی و ارسال پیک با ۰۲۱-۵۸۷۹۸ تماس بگیرید یا از صفحه تماس درخواست ثبت کنید. عیب‌یابی رایگان، قیمت شفاف و گارانتی کتبی — خدمات ما برای اهالی ${name} همیشه در دسترس است.
`;

const AreaPageContent = () => {
  const { area } = useParams();
  const data = tehranAreasData.find(a => a.slug === area);

  if (!data) return <NotFound />;

  const content = areaContent(data.name, data.neighborhoods);

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span>
          <Link to="/repair" className="hover:text-primary">مرکز تعمیرات</Link><span>/</span>
          <span className="text-foreground font-bold">تعمیرات {data.name} تهران</span>
        </div>

        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-8 items-start mb-10">
              <div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4 warranty-title">
                  تعمیر موبایل و PS5 در {data.name} تهران
                </h1>
                <p className="text-muted-foreground leading-8 text-sm mb-6 warranty-text">
                  خدمت‌رسانی به محله‌های {data.neighborhoods} — عیب‌یابی رایگان، قطعات اورجینال و گارانتی کتبی.
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <div className="px-4 py-3 rounded-xl bg-card border text-sm flex gap-2 items-center warranty-text"><Clock size={16} className="text-primary" /> عیب‌یابی رایگان</div>
                  <div className="px-4 py-3 rounded-xl bg-card border text-sm flex gap-2 items-center warranty-text"><Shield size={16} className="text-green-500" /> گارانتی کتبی ۳ ماهه</div>
                  <div className="px-4 py-3 rounded-xl bg-card border text-sm flex gap-2 items-center warranty-text"><MapPin size={16} className="text-primary" /> ارسال پیک</div>
                  <div className="px-4 py-3 rounded-xl bg-card border text-sm flex gap-2 items-center warranty-text"><PhoneCall size={16} className="text-primary" /> ۰۲۱-۵۸۷۹۸</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border shadow-xl">
                <img src="/images/repairs/mobile-repair-1.jpg" alt={`تعمیر موبایل ${data.name} تهران`} fetchPriority="high" decoding="async" className="w-full aspect-[4/3] object-cover bg-secondary" />
              </div>
            </div>

            <div className="card-premium p-6 md:p-8 rounded-2xl">
              <article className="prose prose-sm prose-invert max-w-none text-[14px] leading-9 text-muted-foreground whitespace-pre-wrap warranty-text">
                {content}
              </article>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-black text-foreground mb-5 warranty-title">سایر مناطق تهران</h2>
              <div className="flex flex-wrap gap-2">
                {tehranAreasData.map(a => (
                  <Link
                    key={a.slug}
                    to={a.slug === data.slug ? '#top' : `/repair/areas/${a.slug}`}
                    className={`text-xs px-3 py-2 rounded-full border transition-colors ${a.slug === data.slug ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-primary'}`}
                  >
                    {a.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {repairCategoriesData.slice(0, 3).map(cat => (
                <Link key={cat.id} to={`/repair/${cat.id}`} className="card-premium rounded-xl overflow-hidden group">
                  <img src={cat.image} alt={cat.imageAlt} loading="lazy" className="w-full h-36 object-cover" />
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground mb-2 warranty-title">{cat.title}</h3>
                    <span className="text-primary text-xs flex items-center gap-1">مشاهده خدمات <ArrowLeft size={12} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const AreaPage = () => {
  const { area } = useParams();
  const data = tehranAreasData.find(a => a.slug === area);
  if (!data) return <NotFound />;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': `تعمیر موبایل در ${data.name} تهران`,
    'description': data.seoDesc,
    'serviceType': 'Repair Service',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'آرمان همراه',
      'telephone': '+982158798',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'تهران، خیابان مطهری، ساختمان امیراتابک، پلاک ۱۳۰',
        'addressLocality': 'تهران',
        'addressCountry': 'IR',
      },
    },
    'areaServed': { '@type': 'AdministrativeArea', 'name': data.name },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'خانه', 'item': 'https://armanhamrah.com/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'مرکز تعمیرات', 'item': 'https://armanhamrah.com/repair' },
      { '@type': 'ListItem', 'position': 3, 'name': `تعمیر موبایل ${data.name} تهران`, 'item': `https://armanhamrah.com/repair/areas/${data.slug}` },
    ],
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO
            title={data.seoTitle}
            description={data.seoDesc}
            keywords={data.keywords.join(', ')}
            url={`https://armanhamrah.com/repair/areas/${data.slug}`}
            jsonLd={[serviceJsonLd, breadcrumbJsonLd]}
          />
          <AreaPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default AreaPage;