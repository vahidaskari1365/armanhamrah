import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import EditableText from '@/components/admin/EditableText';

const blogPosts = [
  {
    title: 'خلاصه مراسم آنپکد سامسونگ؛ زدفولد 4 تا گلکسی بادز 2 پرو',
    excerpt: 'در اوایل فوریه امسال، کمپانی سامسونگ طی برنامه‌ای برای معرفی محصولات پرچمدار خود، منحصر به فردترین محصولاتش را با عنوان galaxy unpacked معرفی کرد.',
    readTime: 5,
    date: '1401/5/15',
    link: 'https://www.armanhamrah.com/post.php?post=1',
    image: 'https://www.armanhamrah.com/wp-content/uploads/2022/08/galaxy_buds_2_studio_shots_review.webp',
    category: 'اخبار تکنولوژی',
  },
  {
    title: 'راهنمای خرید دبیران برای شروع مدارس',
    excerpt: 'با توجه به اهمیت نقش دبیران در تربیت و آموزش نسل‌های بعد، علاوه بر تجربه و علم کافی نیاز هست ابزارها و امکانات مناسب نیز در اختیار دبیران عزیز قرار گیرد تا فرآیند آموزش به بهترین شکل صورت بگیرد.',
    readTime: 6,
    date: '1402/6/26',
    link: 'https://www.armanhamrah.com/post.php?post=2',
    image: 'https://www.armanhamrah.com/uploads/blog/1/main.webp',
    category: 'راهنمای خرید',
  },
  {
    title: 'زمان انتشار اندروید 14 و ویژگی‌های جدید آن',
    excerpt: 'در حال حاضر، گوگل روی اندروید ۱۴ بزرگ‌ترین به‌روزرسانی این سیستم‌عامل در سال ۲۰۲۳ کار می‌کند. انتشار نسخه‌های سالانه از اندروید بیانگر این است که هنوز هم قابلیت‌های کاربردی زیادی در انتظار کاربران این سیستم‌عامل محبوب و منبع‌باز است.',
    readTime: 3,
    date: '1402/6/27',
    link: 'https://www.armanhamrah.com/post.php?post=9',
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800',
    category: 'اخبار تکنولوژی',
  },
  {
    title: 'بازی‌های کنسولی را روی سری پرو آیفون 15 اجرا کنید!',
    excerpt: 'اپل از پرقدرت‌ترین آیفون‌های تاریخ رونمایی کرد. مدیران اپل مدعی شده‌اند سری پرو آیفون 15 بهترین کنسول بازی است و از این طریق قصد رقابت با کنسول‌هایی را دارند که از محبوبیت زیادی برخوردار هستند.',
    readTime: 2,
    date: '1402/6/28',
    link: 'https://www.armanhamrah.com/post.php?post=13',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
    category: 'اخبار تکنولوژی',
  },
  {
    title: 'راهنمای خرید دانشجویان و دانش‌آموزان',
    excerpt: 'شروع سال تحصیلی جدید همواره با هیجان و اضطراب همراه است که با داشتن آمادگی لازم می‌توانیم از اضطرابمان کم کنیم و به استقبال کلاس درس برویم. هر دانشجو و دانش‌آموزی برای پشت سر گذاشتن یک سال تحصیلی پر از موفقیت و تجربه‌ی خوب علاوه بر پشتکار...',
    readTime: 5,
    date: '1402/6/29',
    link: 'https://www.armanhamrah.com/post.php?post=14',
    image: 'https://www.armanhamrah.com/uploads/blog/sLZkpuvob7tNGQwfh5jL/sLZkpuvob7tNGQwfh5jL-2023-09-20-09:37:38.webp',
    category: 'راهنمای خرید',
  },
];

const categories = ['همه', 'راهنمای خرید', 'اخبار تکنولوژی'];

const BlogPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="بلاگ و آموزش | آرمان همراه ارتباطات آریا"
            description="آخرین مقالات و آموزش‌های تکنولوژی، راهنمای خرید و اخبار محصولات"
          />
          <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
            <Navbar />
            <main className="pt-24">
              {/* Hero */}
              <section className="bg-gradient-hero py-16">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                      <ArrowRight size={20} />
                      بازگشت به صفحه اصلی
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                      <EditableText
                        contentKey="blog-title"
                        page="blog"
                        section="hero"
                        defaultValue="بلاگ و آموزش"
                        as="span"
                      />
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      <EditableText
                        contentKey="blog-description"
                        page="blog"
                        section="hero"
                        defaultValue="آخرین مقالات، اخبار تکنولوژی و راهنمای خرید محصولات"
                        as="span"
                        multiline
                      />
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Categories Filter */}
              <section className="py-8 border-b border-border bg-card/50">
                <div className="container-custom">
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category, index) => (
                      <motion.button
                        key={category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                          index === 0
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                        }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Blog Posts */}
              <section className="section-padding">
                <div className="container-custom">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                      <motion.a
                        key={index}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="card-premium group overflow-hidden"
                      >
                        {/* Image */}
                        <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                          <span className="absolute top-4 right-4 text-xs bg-primary/90 text-primary-foreground px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {post.readTime} دقیقه
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {post.date}
                            </span>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default BlogPage;