import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Gamepad2, Headset, Headphones, Watch, Speaker, ArrowRight, MapPin, Shield, Clock, Award, CheckCircle2, type LucideIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import FAQSchema from '@/components/FAQSchema';
import ProcessStepsSchema from '@/components/ProcessStepsSchema';
import ServiceSchema from '@/components/ServiceSchema';
import ImageObjectSchema from '@/components/ImageObjectSchema';
import pageBg from '@/assets/page-bg.jpeg';
import { repairCategoriesData } from '@/data/repairCategoriesData';
import { tehranAreasData } from '@/data/tehranAreasData';
import { repairModelsData } from '@/data/repairModelsData';

const iconMap: Record<string, LucideIcon> = { Smartphone, Gamepad2, Headset, Headphones, Watch, Speaker };

const RepairsHubPageContent = () => {
  const { language } = useLanguage();
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">{language === 'fa' ? 'خانه' : 'Home'}</Link><span>/</span><span className="text-foreground font-bold">{language === 'fa' ? 'مرکز تعمیرات تخصصی' : 'Repair Center'}</span>
        </div>

        <section className="section-padding">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
                {language === 'fa' ? 'مرکز تخصصی تعمیرات موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند' : 'Specialist repair center for phones, PS5, AirPods, headphones, smartwatches, speakers & sound systems'}
              </h1>
              <p className="text-muted-foreground leading-8">
                هر دستگاهی که داری، تیم تخصصی تعمیرش رو داریم. دسته مورد نظرت رو انتخاب کن و خدمات، مدل‌های تحت پوشش و نحوه ثبت سفارش رو ببین.
              </p>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-6" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
              {[
                { icon: Shield, t: '۳ ماه گارانتی کتبی' },
                { icon: Clock, t: language === 'fa' ? 'عیب‌یابی رایگان' : 'Free Diagnosis' },
                { icon: Award, t: language === 'fa' ? 'قطعه ۱۰۰٪ اورجینال' : '100% Original Parts' },
                { icon: CheckCircle2, t: language === 'fa' ? '۵۰۰k تعمیر موفق' : '500k Successful Repairs' }
              ].map((i, idx)=>(
                <div key={idx} className="p-4 rounded-xl bg-card border flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><i.icon size={18} className="text-primary" /></div>
                  <div className="text-sm font-bold text-foreground">{i.t}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repairCategoriesData.map((cat) => {
                const Icon = iconMap[cat.icon] || Smartphone;
                return (
                  <Link key={cat.id} to={`/repair/${cat.id}`} className="group card-premium rounded-2xl overflow-hidden hover:shadow-xl transition-all p-0">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={cat.image} alt={cat.imageAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-base leading-6">{cat.title}</h3>
                      </div>
                      <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-card/90 flex items-center justify-center"><Icon size={16} className="text-primary" /></div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground leading-6 line-clamp-2 mb-4">{cat.shortDesc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-primary flex items-center gap-1">مشاهده جزئیات <ArrowRight size={14} /></span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-black text-center mb-2 warranty-title">مدل‌های پرتعمیر و قیمت روز</h2>
              <p className="text-center text-sm text-muted-foreground leading-7 mb-8">{language === 'fa' ? 'صفحه تخصصی هر مدل: لیست قیمت تعمیر، عیب‌یابی رایگان و گارانتی ۳ ماهه — روی مدل خودت بزن.' : 'A dedicated page for each model: repair price list, free diagnosis and 3-month warranty — pick your model.'}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {repairModelsData.map(model => (
                  <Link key={model.slug} to={`/repair/${model.slug}`} className="group card-premium rounded-xl overflow-hidden hover:shadow-xl transition-all p-0">
                    <div className="aspect-[4/3] overflow-hidden bg-secondary">
                      <img src={model.image} alt={model.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-xs font-bold text-foreground leading-5 line-clamp-1 group-hover:text-primary transition-colors">{model.title.replace('تعمیر تخصصی ', '')}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-12 max-w-3xl mx-auto card-premium p-6 rounded-2xl">
              <h2 className="text-xl font-black text-center mb-4 warranty-title">خدمات در تمام مناطق تهران</h2>
              <p className="text-center text-sm text-muted-foreground leading-7 mb-5">{language === 'fa' ? 'مرکز ما در خیابان مطهری، در دسترس همه مناطق ۲۲ گانه تهران است — ارسال پیک، عیب‌یابی رایگان و گارانتی کتبی.' : 'Our center is on Motahhari St., serving all 22 districts of Tehran — courier pickup, free diagnosis and written warranty.'}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {tehranAreasData.map(a => (
                  <Link key={a.slug} to={`/repair/areas/${a.slug}`} className="text-xs px-3 py-2 rounded-full bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
                    {a.name}
                  </Link>
                ))}
              </div>
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
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <BreadcrumbSchema />
          <FAQSchema />
          <ProcessStepsSchema name="فرآیند تعمیر در آرمان همراه" steps={[{ text: 'پذیرش رایگان و ثبت سفارش با کد پیگیری' }, { text: 'عیب‌یابی دقیق با میکروسکوپ و تستر پیشرفته' }, { text: 'اعلام قیمت شفاف و تایید مشتری' }, { text: 'تعمیر تخصصی با ابزار دقیق و تحویل با گارانتی کتبی' }]} />
          <ImageObjectSchema url="https://armanhamrah.com/images/repairs/airpods-repair-1.jpg" caption="مرکز تخصصی تعمیرات آرمان همراه" width={1200} height={630} />
          <ServiceSchema name="مرکز تخصصی تعمیرات آرمان همراه" description="مرکز فوق تخصصی خدمات پس از فروش تعمیرات موبایل، PS5 و ایرپاد با گارانتی ۳ ماهه" serviceType="تعمیرات تخصصی" provider="آرمان همراه ارتباطات آریا" offers={[{ name: "تعمیر با گارانتی", price: "بسته به مدل", priceCurrency: "IRR" }, { name: "عیب‌یابی رایگان", price: "رایگان", priceCurrency: "IRR" }]} />
          <SEO title="مرکز تخصصی تعمیرات موبایل، PS5، ایرپاد، هدفون، ساعت هوشمند، اسپیکر و باند | آرمان همراه" description="مرکز تخصصی تعمیرات انواع گوشی آیفون و سامسونگ و شیائومی، PS5 و دسته DualSense، ایرپاد پرو ۲، هدفون بلوتوثی، ساعت هوشمند اپل واچ و گلکسی واچ، اسپیکر JBL و باند با قطعات اورجینال و گارانتی ۳ ماهه" jsonLd={[breadcrumb]} />
          <RepairsHubPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default RepairsHubPage;
