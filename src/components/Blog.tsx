import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: {
      fa: 'راهنمای خرید دانشجویان و دانش آموزان',
      en: 'Student Shopping Guide'
    },
    excerpt: {
      fa: 'شروع سال تحصیلی جدید همواره با هیجان و اضطراب همراه است که با داشتن آمادگی لازم می‌توانیم از اضطرابمان کم کنیم...',
      en: 'The start of a new school year is always accompanied by excitement and anxiety, which we can reduce with proper preparation...'
    },
    readTime: 5,
    date: '1402/6/29',
    link: 'https://www.armanhamrah.com/post.php?post=14',
    image: 'https://www.armanhamrah.com/uploads/blog/sLZkpuvob7tNGQwfh5jL/sLZkpuvob7tNGQwfh5jL-2023-09-20-09:37:38.webp',
  },
  {
    title: {
      fa: 'بازی‌های کنسولی را روی سری پرو آیفون 15 اجرا کنید!',
      en: 'Play Console Games on iPhone 15 Pro Series!'
    },
    excerpt: {
      fa: 'اپل از پرقدرت‌ترین آیفون‌های تاریخ رونمایی کرد. مدیران اپل مدعی شده اند سری پرو آیفون 15 بهترین کنسول بازی است...',
      en: 'Apple unveiled the most powerful iPhones in history. Apple executives claim the iPhone 15 Pro series is the best gaming console...'
    },
    readTime: 2,
    date: '1402/6/28',
    link: 'https://www.armanhamrah.com/post.php?post=13',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
  },
  {
    title: {
      fa: 'زمان انتشار اندروید 14 و ویژگی های جدید آن',
      en: 'Android 14 Release Date and New Features'
    },
    excerpt: {
      fa: 'در‌حال‌حاضر، گوگل روی اندروید ۱۴ بزرگ‌ترین به‌روزرسانی این سیستم‌عامل در سال ۲۰۲۳ کار می‌کند...',
      en: 'Google is currently working on Android 14, the biggest update to the operating system in 2023...'
    },
    readTime: 3,
    date: '1402/6/27',
    link: 'https://www.armanhamrah.com/post.php?post=9',
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800',
  },
];

const Blog = () => {
  const { t, language } = useLanguage();
  const Arrow = language === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <section id="blog" className="section-padding bg-gradient-premium">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('blog.title')}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="card-premium group overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title[language]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title[language]}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt[language]}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime} {t('blog.minutes')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                  {t('blog.readMore')}
                  <Arrow size={14} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
