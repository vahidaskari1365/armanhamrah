import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Gamepad2, Headset, Headphones, Watch, Speaker, ArrowRight, MapPin, Wrench, Shield, Clock, Award, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import { repairCategoriesData } from '@/data/repairCategoriesData';

const iconMap: any = { Smartphone, Gamepad2, Headset, Headphones, Watch, Speaker };

const RepairsHubPageContent = () => {
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span><span className="text-foreground font-bold">مرکز تعمیرات تخصصی</span>
        </div>

        <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-16">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold mb-6">
                <Wrench size={12} /> هاب تخصصی تعمیرات - برای انفجار سئو تمام کیوردها
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                مرکز تخصصی تعمیرات موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند در تهران
                <span className="block text-xl text-zinc-300 mt-3">هر دستگاهی داری، لندینگ اختصاصی ۱۵۰۰ کلمه‌ای با عکس واقعی و گارانتی کتبی داریم - بیا پیش ما!</span>
              </h1>
              <p className="text-zinc-300 leading-8 max-w-3xl mb-8">
                اینجا هاب اصلی تعمیرات آرمان همراه است. برای هر دسته <strong className="text-white">تعمیرات موبایل آیفون و سامسونگ و شیائومی، تعمیر PS5 و دسته DualSense، تعمیر ایرپاد پرو ۲ و ایرپاد ۴، تعمیر هدفون بلوتوثی گلکسی بادز و انکر، تعمیر ساعت هوشمند اپل واچ اولترا ۳ و گلکسی واچ ۸، تعمیر اسپیکر JBL و باند و پارتی باکس</strong> صفحه جدا با محتوای ۱۵۰۰+ کلمه، عکس واقعی، هشتگ پرجستجو، FAQ و نقشه بیا پیش ما ساختیم. روی هر کارت کلیک کن و به لندینگ اختصاصی برو.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Shield, t: '۳ ماه گارانتی' },
                  { icon: Clock, t: 'عیب‌یابی رایگان' },
                  { icon: Award, t: 'قطعه اورجینال' },
                  { icon: CheckCircle2, t: '۵۰۰k تعمیر موفق' }
                ].map((i, idx)=>(
                  <div key={idx} className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 flex gap-2 items-center text-sm"><i.icon size={16} className="text-primary" />{i.t}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repairCategoriesData.map((cat, idx)=>{
                const Icon = iconMap[cat.icon] || Smartphone;
                return (
                  <Link key={cat.id} to={`/repair/${cat.id}`} className="group bg-card border rounded-[20px] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={cat.image} alt={cat.imageAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-3 right-3 left-3">
                        <h3 className="text-white font-black text-lg leading-6">{cat.title}</h3>
                        <div className="text-xs text-white/70 mt-1">{cat.models.slice(0,3).join(' • ')}</div>
                      </div>
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-primary flex items-center justify-center"><Icon size={18} className="text-white" /></div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground leading-6 line-clamp-3 mb-3">{cat.shortDesc}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {cat.hashtags.slice(0,4).map((h,i)=><span key={i} className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/10">{h}</span>)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">لندینگ تخصصی <ArrowRight size={14} /></span>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">۱۵۰۰+ کلمه</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
              <h3 className="font-black flex items-center gap-2"><MapPin size={18} className="text-amber-600" /> بیا پیش ما - آدرس هاب تعمیرات آرمان همراه</h3>
              <p className="text-sm leading-7 text-muted-foreground mt-2">تهران، جمهوری، پاساژ علاءالدین، طبقه ۶، پلاک ۶۱۴ - شرکت آرمان همراه ارتباطات آریا - شنبه تا پنجشنبه ۱۰ تا ۲۰ - عیب‌یابی رایگان + گارانتی کتبی + قطعه اورجینال + مشاوره تخصصی</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const RepairsHubPage = () => {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "خانه", "item": "https://armanhamrah.com/" },
      { "@type": "ListItem", "position": 2, "name": "مرکز تعمیرات تخصصی", "item": "https://armanhamrah.com/repair" }
    ]
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "لیست خدمات تعمیرات تخصصی آرمان همراه",
    "itemListElement": repairCategoriesData.map((c,i)=>({
      "@type": "ListItem",
      "position": i+1,
      "item": { "@type": "Service", "name": c.title, "url": `https://armanhamrah.com/repair/${c.id}` }
    }))
  };
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO title="مرکز تخصصی تعمیرات موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند | آرمان همراه تهران" description="هاب اصلی تعمیرات تخصصی انواع گوشی آیفون سامسونگ شیائومی، PS5 و دسته DualSense، ایرپاد پرو 2، هدفون گلکسی بادز و انکر، ساعت اپل واچ و گلکسی واچ، اسپیکر JBL و باند - هر کدام لندینگ 1500+ کلمه با عکس واقعی و گارانتی 3 ماهه در علاءالدین" jsonLd={[breadcrumb, itemList]} />
          <RepairsHubPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default RepairsHubPage;
