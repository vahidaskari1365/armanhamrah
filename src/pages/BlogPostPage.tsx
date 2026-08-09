import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, CalendarDays, ChevronLeft, PhoneCall } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import pageBg from '@/assets/page-bg.jpeg';
import { blogPostsData } from '@/data/blogPosts';
import { repairModelsData } from '@/data/repairModelsData';
import NotFound from './NotFound';

const renderMarkdown = (content: string) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: number) => {
    if (listItems.length === 0) return null;
    const items = listItems;
    listItems = [];
    return (
      <ul key={key} className="space-y-2 my-4 pr-6">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 leading-8">
            <span className="text-primary shrink-0">•</span>
            <span className="warranty-text">{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  let listKey = 0;
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('## ')) {
      elements.push(flushList(listKey++));
      elements.push(<h2 key={`h2-${index}`} className="text-xl md:text-2xl font-black text-foreground mt-8 mb-4 warranty-title">{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith('### ')) {
      elements.push(flushList(listKey++));
      elements.push(<h3 key={`h3-${index}`} className="text-lg font-bold text-primary mt-6 mb-3 warranty-title">{trimmed.slice(4)}</h3>);
    } else if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'));
    } else if (trimmed.startsWith('1. ') || /^[۰-۹0-9]+\. /.test(trimmed)) {
      elements.push(flushList(listKey++));
      elements.push(<p key={`p-${index}`} className="leading-8 text-muted-foreground my-2 warranty-text">{trimmed}</p>);
    } else {
      elements.push(flushList(listKey++));
      const html = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-bold">$1</strong>');
      elements.push(<p key={`p-${index}`} className="leading-8 text-muted-foreground mb-3 warranty-text" dangerouslySetInnerHTML={{ __html: html }} />);
    }
  });
  elements.push(flushList(listKey++));

  return elements;
};

const BlogPostPageContent = () => {
  const { slug } = useParams();
  const post = blogPostsData.find(p => p.slug === slug);

  if (!post) return <NotFound />;

  const relatedByCategory = post.relatedModels
    .map(m => repairModelsData.find(r => r.slug === m))
    .filter((r): r is (typeof repairModelsData)[number] => Boolean(r))
    .filter((r, i, arr) => arr.findIndex(x => x.category === r.category) === i);

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <Navbar />
      <main className="pt-24">
        <div className="container-custom py-4 text-sm text-muted-foreground flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary">خانه</Link><span>/</span>
          <Link to="/blog" className="hover:text-primary">بلاگ و آموزش</Link><span>/</span>
          <span className="text-foreground font-bold line-clamp-1">{post.title}</span>
        </div>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <article className="card-premium rounded-2xl overflow-hidden">
              <div className="relative aspect-[21/9] overflow-hidden">
                <img src={post.image} alt={post.title} fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-xl md:text-3xl font-black text-white leading-9 md:leading-[3rem] mb-3">{post.title}</h1>
                  <div className="flex items-center gap-5 text-xs text-white/80">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} دقیقه مطالعه</span>
                    <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {post.date}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-10 pt-2">
                <p className="text-sm text-muted-foreground leading-8 border-r-4 border-primary pr-4 my-6 warranty-text">{post.excerpt}</p>
                <div className="prose prose-invert max-w-none text-[14px] leading-9 text-muted-foreground warranty-text">
                  {renderMarkdown(post.content)}
                </div>

                {relatedByCategory.length > 0 && (
                  <div className="mt-10 p-6 rounded-2xl bg-secondary/50 border">
                    <h3 className="font-black mb-4 warranty-title">خدمات مرتبط در آرمان همراه</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {relatedByCategory.map(r => (
                        <Link key={r.category} to={`/repair/${r.category}`} className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-card border text-sm font-bold hover:border-primary/50 transition-colors warranty-title">
                          {r.title}
                          <ChevronLeft size={16} className="text-primary shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 p-6 rounded-2xl bg-card border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-black mb-1 warranty-title">دستگاه شما خرابی دارد؟</h3>
                    <p className="text-xs text-muted-foreground">عیب‌یابی در آرمان همراه کاملاً رایگان است؛ کارشناسان ما آماده پاسخگویی و حل مشکل شما هستند.</p>
                  </div>
                  <a href="tel:+982158798" className="btn-gold shrink-0 flex items-center gap-2"><PhoneCall size={16} /> ۰۲۱-۵۸۷۹۸</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="pb-16">
          <div className="container-custom max-w-4xl">
            <h3 className="text-lg font-black text-foreground mb-4 text-right">مطالب بیشتر</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {blogPostsData.filter(p => p.slug !== post.slug).slice(0, 2).map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="card-premium rounded-xl p-4 flex gap-3 items-center group hover:shadow-lg transition-all">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-20 h-16 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-6">{p.title}</h4>
                    <span className="text-[11px] text-muted-foreground">{p.readTime} دقیقه</span>
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

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPostsData.find(p => p.slug === slug);
  if (!post) return <NotFound />;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.excerpt,
    'image': `https://armanhamrah.com${post.image}`,
    'datePublished': post.date,
    'inLanguage': 'fa-IR',
    'wordCount': post.content.length,
    'author': { '@type': 'Organization', 'name': 'آرمان همراه ارتباطات آریا', 'url': 'https://armanhamrah.com' },
    'publisher': {
      '@type': 'Organization',
      'name': 'آرمان همراه',
      'logo': { '@type': 'ImageObject', 'url': 'https://armanhamrah.com/logo.jpeg' },
    },
    'mainEntityOfPage': `https://armanhamrah.com/blog/${post.slug}`,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'خانه', 'item': 'https://armanhamrah.com/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'بلاگ و آموزش', 'item': 'https://armanhamrah.com/blog' },
      { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': `https://armanhamrah.com/blog/${post.slug}` },
    ],
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO
            title={post.seoTitle}
            description={post.seoDesc}
            keywords={post.keywords.join(', ')}
            type="article"
            url={`https://armanhamrah.com/blog/${post.slug}`}
            image={`https://armanhamrah.com${post.image}`}
            jsonLd={[articleJsonLd, breadcrumb]}
          />
          <BlogPostPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default BlogPostPage;