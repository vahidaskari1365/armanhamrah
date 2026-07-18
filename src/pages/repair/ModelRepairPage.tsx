import { useParams, Link } from 'react-router-dom';
import { repairModelsData } from '@/data/repairModelsData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import { ChevronLeft, CheckCircle2, Hash, Clock, Shield, ArrowRight } from 'lucide-react';
import NotFound from '../NotFound';

const ModelRepairPageContent = () => {
  const { model } = useParams();
  const { language } = useLanguage();
  const isFa = language === 'fa';
  const data = repairModelsData.find(m => m.slug === model);

  if (!data) return <NotFound />;

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isFa ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary">{isFa ? 'خانه' : 'Home'}</Link><span>/</span>
          <Link to="/repair" className="hover:text-primary">{isFa ? 'تعمیرات' : 'Repairs'}</Link><span>/</span>
          <span className="text-foreground font-bold warranty-title">{data.title}</span>
        </div>

        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            <Link to={`/repair/${data.category}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
              <ChevronLeft size={20} /> {isFa ? `بازگشت به ${data.category}` : `Back to ${data.category}`}
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 items-start mb-10">
              <div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4 warranty-title">{data.title}</h1>
                <p className="text-muted-foreground leading-8 text-sm mb-6 warranty-text">{data.seoDesc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {data.hashtags.slice(0,5).map((h,i)=><span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/10 font-titr">{h}</span>)}
                </div>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <div className="px-4 py-3 rounded-xl bg-card border text-sm flex gap-2 items-center warranty-text"><Clock size={16} className="text-primary" /> {isFa ? 'عیب‌یابی رایگان' : 'Free Diagnosis'}</div>
                  <div className="px-4 py-3 rounded-xl bg-card border text-sm flex gap-2 items-center warranty-text"><Shield size={16} className="text-green-500" /> {isFa ? 'گارانتی ۳ ماهه' : '3-Month Warranty'}</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border shadow-xl">
                <img src={data.image} alt={data.title} loading="lazy" className="w-full aspect-[4/3] object-cover bg-white" />
              </div>
            </div>

            <div className="card-premium p-6 md:p-8 rounded-2xl">
              <article className="prose prose-invert max-w-none text-[14px] leading-9 text-muted-foreground whitespace-pre-wrap warranty-text">
                {data.content}
              </article>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-secondary/50 border">
                  <h3 className="font-black mb-3 warranty-title">{isFa ? `مشکلات رایج ${data.model}` : `Common issues ${data.model}`}</h3>
                  <ul className="space-y-2 text-sm warranty-text">
                    {data.problems.map((p,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-0.5" />{p}</li>)}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-card border">
                  <h3 className="font-black mb-3 flex items-center gap-2 warranty-title"><Hash size={16} className="text-primary" /> {isFa ? 'هشتگ‌های پرجستجو' : 'Popular Hashtags'}</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.hashtags.map((h,i)=><span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold font-titr">{h}</span>)}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Link to="/repair" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center gap-2 font-titr">
                  {isFa ? 'همه مدل‌ها' : 'All Models'} <ArrowRight size={14} className={isFa ? '' : 'rotate-180'} />
                </Link>
                <Link to="/contact" className="px-6 py-3 rounded-xl bg-secondary border font-bold text-sm warranty-title">
                  {isFa ? 'تماس' : 'Contact'}
                </Link>
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
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title={data.seoTitle} description={data.seoDesc} keywords={data.keywords.join(', ')} jsonLd={[breadcrumb]} />
          <ModelRepairPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default ModelRepairPage;
