import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, XCircle, Shield, Clock, Headphones, FileText, Smartphone, Award, Wrench, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import EditableText from '@/components/admin/EditableText';

const warrantyConditions = [
  'رعایت شرایط استفاده از محصول طبق دفترچه راهنما',
  'عدم باز کردن و دستکاری دستگاه توسط افراد غیرمجاز',
  'ارائه اصل برگ گارانتی به همراه فاکتور خرید',
  'عدم استفاده از قطعات غیراصلی و لوازم جانبی نامعتبر',
  'عدم وجود آسیب‌های فیزیکی ناشی از ضربه یا سقوط',
  'ثبت محصول در سامانه آرمان من ظرف ۷ روز پس از خرید',
  'مراجعه به نمایندگی‌های مجاز برای تعمیرات',
  'نگهداری از جعبه و لوازم جانبی محصول',
];

const exceptions = [
  'آسیب ناشی از ورود مایعات به دستگاه',
  'خرابی ناشی از نوسانات برق',
  'آسیب‌های فیزیکی و ضربه',
  'تعمیر توسط افراد غیرمجاز',
  'استفاده از نرم‌افزارهای غیرمجاز',
  'خرابی ناشی از حوادث طبیعی',
  'آسیب ناشی از استفاده نادرست',
  'خرابی باتری در اثر شارژ غیراستاندارد',
];

const benefits = [
  {
    icon: Shield,
    title: 'گارانتی ۱۸ ماهه',
    description: 'پوشش گارانتی کامل برای ۱۸ ماه از تاریخ خرید',
    contentKey: 'benefit-warranty',
  },
  {
    icon: Headphones,
    title: 'پشتیبانی ۲۴/۷',
    description: 'پشتیبانی آنلاین و تلفنی در تمام ساعات',
    contentKey: 'benefit-support',
  },
  {
    icon: Clock,
    title: 'تعمیر سریع',
    description: 'تعمیر و تحویل دستگاه در کوتاه‌ترین زمان',
    contentKey: 'benefit-repair',
  },
  {
    icon: FileText,
    title: 'پیگیری آنلاین',
    description: 'امکان پیگیری وضعیت گارانتی از طریق آرمان من',
    contentKey: 'benefit-tracking',
  },
];

const services = [
  {
    icon: Smartphone,
    title: 'تعمیر تخصصی',
    description: 'تعمیر تخصصی انواع گوشی‌های هوشمند توسط کارشناسان مجرب',
    contentKey: 'service-repair',
  },
  {
    icon: Award,
    title: 'قطعات اصلی',
    description: 'استفاده از قطعات اصلی و با کیفیت در تمامی تعمیرات',
    contentKey: 'service-parts',
  },
  {
    icon: Wrench,
    title: 'خدمات متنوع',
    description: 'ارائه خدمات نرم‌افزاری، سخت‌افزاری و تعویض قطعات',
    contentKey: 'service-variety',
  },
  {
    icon: Users,
    title: 'تیم متخصص',
    description: 'تیمی از متخصصین با تجربه در حوزه تعمیرات موبایل',
    contentKey: 'service-team',
  },
];

const brands = [
  { name: 'اپل', logo: 'https://www.armanhamrah.com/uploads/brands/apple-logo.webp' },
  { name: 'سامسونگ', logo: 'https://www.armanhamrah.com/uploads/brands/samsung-logo.webp' },
  { name: 'شیائومی', logo: 'https://www.armanhamrah.com/uploads/brands/xiaomi-logo.webp' },
  { name: 'سونی', logo: 'https://www.armanhamrah.com/uploads/brands/sony-logo.webp' },
  { name: 'هارمن کاردن', logo: 'https://www.armanhamrah.com/uploads/brands/harman-kardon-logo.webp' },
];

const WarrantyPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="گارانتی آرمان همراه | شرایط گارانتی ۱۸ ماهه"
            description="شرایط گارانتی ۱۸ ماهه آرمان همراه ارتباطات آریا برای محصولات اپل، سامسونگ، شیائومی و سونی"
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
                        contentKey="warranty-title"
                        page="warranty"
                        section="hero"
                        defaultValue="هوشمندترین گارانتی و خدمات پس از فروش در ایران"
                        as="span"
                      />
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      <EditableText
                        contentKey="warranty-description"
                        page="warranty"
                        section="hero"
                        defaultValue="شرکت گارانتی آرمان همراه ارتباطات آریا از سال ۱۳۹۳ تا کنون با بهترین تجربه در ارائه خدمات به مشتریان"
                        as="span"
                        multiline
                      />
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Brands */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">برندهای تحت پوشش گارانتی</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="flex flex-wrap justify-center gap-8 items-center">
                    {brands.map((brand, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="h-12 object-contain filter dark:invert"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Benefits */}
              <section className="section-padding">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">مزایای گارانتی آرمان همراه</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="card-premium text-center group"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <benefit.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          <EditableText
                            contentKey={`${benefit.contentKey}-title`}
                            page="warranty"
                            section="benefits"
                            defaultValue={benefit.title}
                            as="span"
                          />
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          <EditableText
                            contentKey={`${benefit.contentKey}-desc`}
                            page="warranty"
                            section="benefits"
                            defaultValue={benefit.description}
                            as="span"
                          />
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Services */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">خدمات ما</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="card-premium text-center group"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
                          <service.icon size={28} className="text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          <EditableText
                            contentKey={`${service.contentKey}-title`}
                            page="warranty"
                            section="services"
                            defaultValue={service.title}
                            as="span"
                          />
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          <EditableText
                            contentKey={`${service.contentKey}-desc`}
                            page="warranty"
                            section="services"
                            defaultValue={service.description}
                            as="span"
                          />
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Conditions */}
              <section className="section-padding">
                <div className="container-custom">
                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Warranty Conditions */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="card-premium"
                    >
                      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-green-500" size={28} />
                        شرایط گارانتی
                      </h2>
                      <ul className="space-y-4">
                        {warrantyConditions.map((condition, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{condition}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Exceptions */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="card-premium"
                    >
                      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                        <XCircle className="text-red-500" size={28} />
                        موارد خارج از پوشش گارانتی
                      </h2>
                      <ul className="space-y-4">
                        {exceptions.map((exception, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <XCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{exception}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="section-padding">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center card-premium bg-gradient-gold p-12"
                  >
                    <Shield size={48} className="mx-auto mb-6 text-primary-foreground" />
                    <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                      ثبت و پیگیری گارانتی
                    </h2>
                    <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                      برای ثبت محصول و پیگیری وضعیت گارانتی خود، وارد سامانه آرمان من شوید
                    </p>
                    <div className="flex justify-center">
                      <Link
                        to="/contact"
                        className="inline-block bg-background text-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
                      >
                        تماس با پشتیبانی
                      </Link>
                    </div>
                  </motion.div>
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

export default WarrantyPage;