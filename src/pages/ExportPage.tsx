import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Truck, Shield, FileCheck, Package, BadgeCheck, Handshake, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';

const features = [
  {
    icon: Globe,
    title: 'صادرات بین‌المللی',
    description: 'صادرات محصولات الکترونیکی به کشورهای منطقه خلیج فارس، آسیای میانه و کشورهای همسایه',
  },
  {
    icon: Truck,
    title: 'حمل و نقل امن',
    description: 'ارسال ایمن کالا با بیمه کامل و ردیابی آنلاین محموله در تمام مراحل',
  },
  {
    icon: Shield,
    title: 'محصولات اورجینال',
    description: 'تضمین اصالت کالا با گارانتی معتبر بین‌المللی و سرتیفیکیت اصالت',
  },
  {
    icon: FileCheck,
    title: 'مستندات کامل',
    description: 'تهیه کلیه مدارک گمرکی، اسناد صادراتی و مجوزهای لازم',
  },
];

const services = [
  {
    icon: Package,
    title: 'بسته‌بندی صادراتی',
    description: 'بسته‌بندی استاندارد و حرفه‌ای مطابق با استانداردهای بین‌المللی برای حفاظت کامل محصولات در طول حمل و نقل',
  },
  {
    icon: BadgeCheck,
    title: 'ترخیص گمرکی',
    description: 'انجام کلیه امور گمرکی و ترخیص کالا در مبدا و مقصد با سرعت و دقت بالا توسط تیم متخصص',
  },
  {
    icon: Handshake,
    title: 'تضمین کیفیت',
    description: 'بازرسی و کنترل کیفیت تمامی محصولات قبل از ارسال و صدور گواهی کیفیت معتبر',
  },
];

const countries = [
  { name: 'امارات متحده عربی', flag: '🇦🇪' },
  { name: 'عراق', flag: '🇮🇶' },
  { name: 'افغانستان', flag: '🇦🇫' },
  { name: 'ترکمنستان', flag: '🇹🇲' },
  { name: 'آذربایجان', flag: '🇦🇿' },
  { name: 'ارمنستان', flag: '🇦🇲' },
  { name: 'قطر', flag: '🇶🇦' },
  { name: 'کویت', flag: '🇰🇼' },
];

const ExportPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="صادرات | آرمان همراه ارتباطات آریا"
            description="خدمات صادرات محصولات الکترونیکی به کشورهای منطقه با بسته‌بندی استاندارد و ترخیص گمرکی"
          />
          <div className="min-h-screen bg-background" dir="rtl">
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
                      صادرات
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      شرکت آرمان همراه ارتباطات آریا با سابقه درخشان در حوزه واردات و توزیع محصولات الکترونیکی، خدمات صادرات حرفه‌ای به کشورهای منطقه ارائه می‌دهد.
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Features */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">ویژگی‌های خدمات صادراتی</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="card-premium text-center group"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <feature.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Services */}
              <section className="section-padding">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">خدمات صادراتی ما</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        whileHover={{ y: -5 }}
                        className="card-premium"
                      >
                        <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
                          <service.icon size={24} className="text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Countries */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">کشورهای هدف صادرات</h2>
                    <p className="text-muted-foreground">صادرات به کشورهای منطقه و همسایه</p>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-4" />
                  </motion.div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {countries.map((country, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="card-premium text-center flex items-center justify-center gap-3"
                      >
                        <span className="text-3xl">{country.flag}</span>
                        <span className="font-medium text-foreground">{country.name}</span>
                      </motion.div>
                    ))}
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
                    <MapPin size={48} className="mx-auto mb-6 text-primary-foreground" />
                    <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                      برای اطلاعات بیشتر در مورد خدمات صادراتی با ما تماس بگیرید
                    </h2>
                    <Link
                      to="/contact"
                      className="inline-block bg-background text-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity mt-4"
                    >
                      تماس با ما
                    </Link>
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

export default ExportPage;
