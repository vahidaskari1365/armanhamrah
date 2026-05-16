import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileText, Headphones, Wrench } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import EditableText from '@/components/admin/EditableText';

const warrantySections = [
  {
    icon: FileText,
    title: { fa: 'شرایط گارانتی 18 ماه', en: '18-Month Warranty Conditions' },
    description: { fa: 'مشاهده کامل شرایط و ضوابط گارانتی ۱۸ ماهه محصولات', en: 'View the full terms and conditions for the 18-month product warranty' },
    link: '/warranty/conditions',
  },
  {
    icon: Headphones,
    title: { fa: 'شرایط گارانتی لوازم جانبی', en: 'Accessory Warranty Conditions' },
    description: { fa: 'اطلاعات مربوط به گارانتی انواع لوازم جانبی و اکسسوری‌ها', en: 'Information regarding the warranty for various accessories' },
    link: '/warranty/accessories',
  },
  {
    icon: Wrench,
    title: { fa: 'تعمیرات دستگاه‌های فاقد گارانتی', en: 'Out-of-Warranty Repairs' },
    description: { fa: 'شرایط و رویه‌های تعمیر دستگاه‌هایی که گارانتی آن‌ها به اتمام رسیده', en: 'Conditions and procedures for repairing out-of-warranty devices' },
    link: '/warranty/repairs',
  }
];

const WarrantyPageContent = () => {
  const { language } = useLanguage();
  
  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={language === 'fa' ? 'rtl' : 'ltr'}>
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
              <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-6">
                <ArrowRight size={20} />
                {language === 'fa' ? 'بازگشت به صفحه اصلی' : 'Back to Home'}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                <EditableText
                  contentKey={language === 'fa' ? 'warranty-title' : 'warranty-title-en'}
                  page="warranty"
                  section="hero"
                  defaultValue={language === 'fa' ? 'هوشمندترین گارانتی و خدمات پس از فروش در ایران' : 'The Smartest Warranty & After-Sales Service in Iran'}
                  as="span"
                />
              </h1>
              <p className="text-lg text-foreground max-w-2xl">
                <EditableText
                  contentKey={language === 'fa' ? 'warranty-description' : 'warranty-description-en'}
                  page="warranty"
                  section="hero"
                  defaultValue={language === 'fa' ? 'شرکت گارانتی آرمان همراه ارتباطات آریا از سال ۱۳۹۴ تا کنون با بهترین تجربه در ارائه خدمات به مشتریان' : 'Arman Hamrah Aria Communications Warranty Company has been providing the best customer service experience since 2015'}
                  as="span"
                  multiline
                />
              </p>
            </motion.div>
          </div>
        </section>

        {/* Conditions */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {language === 'fa' ? 'شرایط خدمات گارانتی' : 'Warranty Service Conditions'}
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
            </motion.div>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {warrantySections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Link to={section.link} className="card-premium h-full flex flex-col text-center group p-8 rounded-2xl">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <section.icon size={32} className="text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {section.title[language]}
                    </h3>
                    <p className="text-foreground text-sm flex-grow">
                      {section.description[language]}
                    </p>
                    <div className="mt-6">
                      <span className="font-bold text-primary group-hover:underline">
                        {language === 'fa' ? 'مشاهده جزئیات' : 'View Details'} <ArrowRight className="inline-block h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        </main>
        <Footer />
        </div>
        );
        };

const WarrantyPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="گارانتی آرمان همراه | Arman Warranty - 18 Month Warranty"
            description="شرایط گارانتی ۱۸ ماهه آرمان همراه ارتباطات آریا برای محصولات اپل، سامسونگ، شیائومی و سونی"
          />
          <WarrantyPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyPage;
