import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import pageBg from '@/assets/page-bg.jpeg';
import { blogPostsData } from '@/data/blogPosts';

const categoryLabels: Record<string, string> = {
  mobile: 'تعمیر موبایل',
  ps5: 'تعمیر PS5',
  airpods: 'تعمیر ایرپاد',
  headphone: 'تعمیر هدفون',
  smartwatch: 'تعمیر ساعت هوشمند',
  speaker: 'تعمیر اسپیکر',
  guide: 'راهنمای خرید و تعمیر',
};

const enCategoryLabels: Record<string, string> = {
  mobile: 'Mobile Repair',
  ps5: 'PS5 Repair',
  airpods: 'AirPods Repair',
  headphone: 'Headphone Repair',
  smartwatch: 'Smartwatch Repair',
  speaker: 'Speaker Repair',
  guide: 'Buying & Repair Guides',
};

const BlogIndexPage = () => {
  const { language } = useLanguage();
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-primary">{language === 'fa' ? 'خانه' : 'Home'}</Link><span>/</span><span className="text-foreground font-bold">{language === 'fa' ? 'بلاگ و آموزش' : 'Blog & Guides'}</span>
        </div>

        <section className="section-padding">
          <div className="container-custom max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
                {language === 'fa' ? 'بلاگ و مقالات تخصصی تعمیرات' : 'Expert Repair Blog & Guides'}
              </h1>
              <p className="text-muted-foreground leading-8">
                {language === 'fa' ? 'راهنماهای قیمت، آموزش عیب‌یابی خانگی و شناخت دقیق خرابی‌های موبایل، PS5، ایرپاد و ساعت هوشمند — نوشته‌شده توسط تکنسین‌های آرمان همراه.' : 'Pricing guides, home troubleshooting tips and how to identify faults in phones, PS5, AirPods and smartwatches — written by Arman Hamrah technicians.'}
              </p>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-6" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPostsData.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group card-premium rounded-2xl overflow-hidden hover:shadow-xl transition-all block h-full">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-3 right-3 text-[11px] px-3 py-1 rounded-full bg-primary text-primary-foreground font-bold">{language === 'fa' ? categoryLabels[post.category] : enCategoryLabels[post.category]}</span>
                    </div>
                    <div className="p-5">
                      <h2 className="text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-7">{post.title}</h2>
                      <p className="text-xs text-muted-foreground leading-6 line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime} دقیقه</span>
                          <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
                        </div>
                        <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">مطالعه <ArrowLeft size={14} /></span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 max-w-3xl mx-auto card-premium p-8 rounded-2xl text-center">
              <h2 className="text-xl font-black text-foreground mb-3">شما مشکل‌تان را در مقاله پیدا نکردید؟</h2>
              <p className="text-sm text-muted-foreground leading-7 mb-6">
                تیم فنی آرمان همراه پاسخگوی سوالات شماست؛ عیب‌یابی رایگان است و قبل از هر تعمیری، قیمت دقیق به شما اعلام می‌شود.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="tel:+982158798" className="btn-gold">{language === 'fa' ? 'تماس: ۰۲۱-۵۸۷۹۸' : 'Contact: 021-58798'}</a>
                <Link to="/contact" className="btn-outline">{language === 'fa' ? 'ارسال درخواست تعمیر' : 'Send Repair Request'}</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const BlogPage = () => (
  <HelmetProvider>
    <ThemeProvider>
      <LanguageProvider>
        <SEO
          title="بلاگ و راهنمای تخصصی تعمیرات موبایل، PS5 و ایرپاد | آرمان همراه"
          description="مطالب آموزشی و راهنمای تعمیرات: قیمت تعمیر آیفون ۱۷ پرو، علت خاموش شدن PS5، تعمیر ایرپاد آبخورده، تعویض گلس بدون ال‌سی‌دی و تشخیص قطعات اورجینال."
          keywords="بلاگ تعمیرات موبایل, راهنمای تعمیر PS5, قیمت تعمیر آیفون, تعویض گلس, تعمیر ایرپاد آبخورده"
          url="https://armanhamrah.com/blog"
        />
        <BreadcrumbSchema />
        <BlogIndexPage />
      </LanguageProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default BlogPage;