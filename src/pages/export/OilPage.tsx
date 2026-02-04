import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MessageCircle, Mail, Phone, MapPin, Factory, Shield, Award, FileCheck, Droplets, Truck, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import { Button } from '@/components/ui/button';

const OilContent = () => {
  const { language } = useLanguage();
  const isRTL = language === 'fa';
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  const content = {
    fa: {
      backToExport: 'بازگشت به صادرات',
      title: 'روغن',
      subtitle: 'Oil',
      description: 'بهترین و با کیفیت‌ترین روغن در بازار ایران',
      descriptionEn: 'The best and highest quality Oil in the IRAN market.',
      category: 'پتروشیمی',
      features: [
        { icon: Factory, title: 'تولید پالایشگاهی', desc: 'تولید شده در پالایشگاه‌های معتبر ایران' },
        { icon: Shield, title: 'کیفیت تضمینی', desc: 'تضمین کیفیت با استانداردهای بین‌المللی' },
        { icon: Award, title: 'گواهینامه‌ها', desc: 'دارای گواهینامه‌های استاندارد بین‌المللی' },
        { icon: FileCheck, title: 'مستندات کامل', desc: 'ارائه تمامی مدارک و سرتیفیکیت‌ها' },
      ],
      productTypes: 'انواع محصولات',
      types: [
        { icon: Droplets, name: 'روغن صنعتی', desc: 'انواع روغن‌های صنعتی برای ماشین‌آلات و تجهیزات' },
        { icon: Truck, name: 'روغن موتور', desc: 'روغن موتور خودروهای سبک و سنگین' },
        { icon: Package, name: 'روغن هیدرولیک', desc: 'روغن‌های هیدرولیک برای سیستم‌های صنعتی' },
        { icon: Factory, name: 'روغن پایه', desc: 'روغن‌های پایه برای تولید روان‌کننده‌ها' },
      ],
      servicesTitle: 'خدمات ما',
      services: [
        { title: 'بسته‌بندی سفارشی', desc: 'بسته‌بندی در انواع حجم‌ها بر اساس نیاز مشتری' },
        { title: 'حمل و نقل بین‌المللی', desc: 'ارسال به تمام نقاط جهان با بیمه کامل' },
        { title: 'نمونه رایگان', desc: 'ارائه نمونه رایگان برای تست کیفیت محصول' },
      ],
      contactTitle: 'برای اطلاعات بیشتر با متخصصین ما تماس بگیرید',
      contactDesc: 'کارشناسان تجاری ما همواره در تلاش هستند تا راحتی کسب و کار شما را افزایش دهند.',
      contactBtn: 'شروع مکالمه',
      whatsapp: '+98 88 321 032',
      email: 'export@armanhamrah.com',
      address: 'واحد 304، طبقه 3، ساختمان امیر اتابک، خیابان سلیمان خاطر، خیابان مطهری، تهران',
    },
    en: {
      backToExport: 'Back to Export',
      title: 'Oil',
      subtitle: 'روغن',
      description: 'The best and highest quality Oil in the IRAN market.',
      descriptionEn: 'بهترین و با کیفیت‌ترین روغن در بازار ایران',
      category: 'Petrochemical',
      features: [
        { icon: Factory, title: 'Refinery Production', desc: 'Produced in reputable Iranian refineries' },
        { icon: Shield, title: 'Guaranteed Quality', desc: 'Quality assurance with international standards' },
        { icon: Award, title: 'Certifications', desc: 'International standard certifications' },
        { icon: FileCheck, title: 'Complete Documentation', desc: 'All documents and certificates provided' },
      ],
      productTypes: 'Product Types',
      types: [
        { icon: Droplets, name: 'Industrial Oil', desc: 'Various industrial oils for machinery and equipment' },
        { icon: Truck, name: 'Motor Oil', desc: 'Motor oil for light and heavy vehicles' },
        { icon: Package, name: 'Hydraulic Oil', desc: 'Hydraulic oils for industrial systems' },
        { icon: Factory, name: 'Base Oil', desc: 'Base oils for lubricant production' },
      ],
      servicesTitle: 'Our Services',
      services: [
        { title: 'Custom Packaging', desc: 'Packaging in various volumes based on customer needs' },
        { title: 'International Shipping', desc: 'Delivery worldwide with full insurance' },
        { title: 'Free Samples', desc: 'Free samples provided for quality testing' },
      ],
      contactTitle: 'For More Information Contact Our Specialist',
      contactDesc: 'Our commercial experts are always striving to enhance convenience for your business.',
      contactBtn: 'Start Conversation',
      whatsapp: '+98 88 321 032',
      email: 'export@armanhamrah.com',
      address: 'Unit 304, 3rd Floor, Amir Atabak Building, Soleyman Khater St, Motahari St, Tehran, IRAN',
    }
  };

  const t = content[language];

  return (
    <div className={`page-background bg-background admin-toolbar-offset`} style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/export" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                <ArrowIcon size={20} />
                {t.backToExport}
              </Link>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-sm bg-primary/10 text-primary px-4 py-1 rounded-full mb-4 inline-block">
                    {t.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {t.title}
                  </h1>
                  <p className="text-xl text-primary mb-6" dir={isRTL ? 'ltr' : 'rtl'}>
                    {t.subtitle}
                  </p>
                  <p className="text-lg text-muted-foreground mb-4">
                    {t.description}
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-8">
                    <img 
                      src="https://export.armanhamrah.com/uploads/products/oil.webp" 
                      alt="Oil"
                      className="w-full h-80 object-contain"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-gradient-premium">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.features.map((feature, index) => (
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
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Types */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">{t.productTypes}</h2>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {t.types.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium flex items-start gap-4 group"
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <type.icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{type.name}</h3>
                    <p className="text-muted-foreground">{type.desc}</p>
                  </div>
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
              <h2 className="text-3xl font-bold text-foreground mb-4">{t.servicesTitle}</h2>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {t.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium text-center"
                >
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-premium max-w-4xl mx-auto text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle size={40} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.contactTitle}</h2>
              <p className="text-muted-foreground mb-8">{t.contactDesc}</p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <a href={`https://wa.me/9888321032`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                  <Phone size={18} />
                  <span dir="ltr">{t.whatsapp}</span>
                </a>
                <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                  <Mail size={18} />
                  <span>{t.email}</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
                <MapPin size={18} />
                <span className="text-sm">{t.address}</span>
              </div>

              <a 
                href="https://wa.me/9888321032"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-gold">
                  {t.contactBtn}
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const OilPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="Oil | Arman Export"
            description="The best and highest quality Oil in the IRAN market - Industrial, Motor, Hydraulic and Base oils"
          />
          <OilContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default OilPage;
