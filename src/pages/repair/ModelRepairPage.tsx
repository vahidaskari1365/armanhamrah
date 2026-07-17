import { useParams, Link } from 'react-router-dom';
import { repairModelsData } from '@/data/repairModelsData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import { ChevronLeft, Wrench, MapPin, CheckCircle2, Hash, Clock, Shield, ArrowRight } from 'lucide-react';
import NotFound from '../NotFound';

const ModelRepairPageContent = () => {
  const { model } = useParams();
  const data = repairModelsData.find(m => m.slug === model);

  if (!data) return <NotFound />;

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span>
          <Link to="/repair" className="hover:text-primary">تعمیرات</Link><span>/</span>
          <Link to={`/repair/${data.category}`} className="hover:text-primary capitalize">{data.category}</Link><span>/</span>
          <span className="text-foreground font-bold">{data.title}</span>
        </div>

        <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-12">
          <div className="container-custom">
            <Link to={`/repair/${data.category}`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6"><ChevronLeft size={20} /> بازگشت به {data.category}</Link>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold mb-4">
                  <Wrench size={12} /> لندینگ مدل - {data.brand} {data.model} - ۸۰۰+ کلمه تخصصی
                </div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">{data.seoTitle.split('|')[0]}</h1>
                <p className="text-zinc-300 leading-8 text-sm mb-6">{data.seoDesc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {data.hashtags.map((h,i)=><span key={i} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">{h}</span>)}
                </div>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <div className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-sm flex gap-2 items-center"><Clock size={16} className="text-primary" /> عیب‌یابی رایگان</div>
                  <div className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-sm flex gap-2 items-center"><Shield size={16} className="text-green-400" /> گارانتی ۳ ماهه</div>
                </div>
              </div>
              <div className="rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
                <img src={data.image} alt={data.title + ' - آرمان همراه'} loading="lazy" className="w-full aspect-[4/3] object-cover bg-white" />
                <div className="p-4 bg-zinc-900">
                  <div className="text-xs font-bold text-white flex items-center gap-2"><MapPin size={12} className="text-primary" /> بیا پیش ما برای {data.model}:</div>
                  <div className="text-[11px] text-zinc-400 mt-1 leading-6">تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴ - عیب‌یابی رایگان + قطعه اورجینال + گارانتی کتبی - همین الان ثبت کن</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <article className="prose prose-invert max-w-none text-[14px] leading-9 text-muted-foreground whitespace-pre-wrap">
              {data.content}
            </article>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="font-black mb-3">مشکلات رایج {data.model}</h3>
                <ul className="space-y-2 text-sm">
                  {data.problems.map((p,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-0.5" />{p}</li>)}
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/50 border">
                <h3 className="font-black mb-3 flex items-center gap-2"><Hash size={16} className="text-primary" /> هشتگ‌های پرجستجو</h3>
                <div className="flex flex-wrap gap-2">
                  {data.hashtags.map((h,i)=><span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">{h}</span>)}
                </div>
                <div className="mt-4">
                  <h4 className="text-xs font-bold mb-2">کیوردها:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.keywords.map((k,i)=><span key={i} className="text-[11px] px-2 py-1 rounded-full bg-card border">{k}</span>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-primary text-primary-foreground">
              <h3 className="font-black text-lg mb-2">🚀 {data.model} خرابه؟ بیا پیش ما همین الان!</h3>
              <p className="text-sm leading-8 opacity-90">ما تخصصی‌ترین مرکز تعمیر {data.model} در تهرانیم. عیب‌یابی رایگان، قیمت شفاف قبل تعمیر، قطعه اورجینال، گارانتی ۳ ماهه کتبی. آدرس: تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴. تلفن: ۰۲۱-XXXX. <Link to="/contact" className="underline font-black">ثبت درخواست تعمیر آنلاین</Link></p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/repair" className="px-6 py-3 rounded-xl bg-white text-primary font-black text-sm flex items-center gap-2">همه مدل‌ها <ArrowRight size={14} /></Link>
                <a href="tel:+9821" className="px-6 py-3 rounded-xl bg-black/20 border border-white/20 font-bold text-sm">تماس فوری</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const ModelRepairPage = () => {
  const { model } = useParams();
  const data = repairModelsData.find(m => m.slug === model);
  if (!data) return <NotFound />;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
      { "@type": "ListItem", "position": 2, "name": "تعمیرات", "item": "https://armanhamrah.com/repair" },
      { "@type": "ListItem", "position": 3, "name": data.title, "item": `https://armanhamrah.com/repair/${data.slug}` }
    ]
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title,
    "provider": { "@type": "Organization", "name": "آرمان همراه" },
    "description": data.seoDesc,
    "areaServed": "IR"
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.problems.map(p=>({
      "@type": "Question",
      "name": `${p} ${data.model}؟`,
      "acceptedAnswer": { "@type": "Answer", "text": data.content.slice(0,300) }
    }))
  };
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title={data.seoTitle} description={data.seoDesc} keywords={data.keywords.join(', ') + ', ' + data.hashtags.join(', ')} jsonLd={[breadcrumb, service, faq]} />
          <ModelRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default ModelRepairPage;
