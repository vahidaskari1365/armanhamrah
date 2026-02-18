import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPageContent = () => {
  const { language } = useLanguage();

  const contactSections = [
    {
      title: language === 'fa' ? 'دفتر مرکزی' : 'Headquarters',
      phone: '021-88321030-2',
      email: 'info@armanhamrah.com',
      address:
        language === 'fa'
          ? 'تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴'
          : 'Tehran, Motahhari St., After Mofateh, Soleiman Khater St., Amir Atabak Building, No. 130, Floor 3, Unit 304',
      postalCode: '1575945341',
    },
    {
      title: language === 'fa' ? 'خدمات پس از فروش' : 'After-Sales Service',
      phone: '021-58798',
      phone2:
        '021-88329274 ' +
        (language === 'fa' ? 'داخلی ۴' : 'Ext. 4'),
      address:
        language === 'fa'
          ? 'تهران، خیابان مطهری، سلیمان خاطر، نبش بانک ملت، ساختمان امیر اتابک، ط۲، واحد ۲۰۴'
          : 'Tehran, Motahhari St., Soleiman Khater, Amir Atabak Building, Floor 2, Unit 204',
      postalCode: '۱۵۷۵۹۴۵۳۳۵',
    },
    {
      title: language === 'fa' ? 'فروشگاه' : 'Store',
      phone: language === 'fa' ? '(به زودی)' : '(Coming Soon)',
      address:
        language === 'fa'
          ? 'آدرس فروشگاه به زودی اضافه خواهد شد.'
          : 'Store address will be added soon.',
    },
  ];

  return (
    <div
      className="bg-background admin-toolbar-offset"
      dir={language === 'fa' ? 'rtl' : 'ltr'}
    >
      <Navbar />
      <main>
        <div className="container-custom section-padding">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center">
            {language === 'fa' ? 'تماس با ما' : 'Contact Us'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactSections.map((section, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-primary mb-6">
                  {section.title}
                </h2>

                <ul className="space-y-5 text-muted-foreground">
                  {section.phone && (
                    <li className="flex items-center gap-4">
                      <Phone size={20} className="text-accent" />
                      <div className="flex flex-col">
                        <span dir="ltr">{section.phone}</span>
                        {section.phone2 && (
                          <span dir="ltr">{section.phone2}</span>
                        )}
                      </div>
                    </li>
                  )}

                  {section.email && (
                    <li className="flex items-center gap-4">
                      <Mail size={20} className="text-accent" />
                      <span>{section.email}</span>
                    </li>
                  )}

                  {section.address && (
                    <li className="flex items-start gap-4">
                      <MapPin
                        size={20}
                        className="text-accent flex-shrink-0 mt-1"
                      />
                      <div>
                        <span>{section.address}</span>
                        {section.postalCode && (
                          <p
                            className="text-xs text-muted-foreground/70 mt-2"
                            dir="ltr"
                          >
                            {language === 'fa'
                              ? 'کد پستی:'
                              : 'Postal Code:'}{' '}
                            {section.postalCode}
                          </p>
                        )}
                      </div>
                    </li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ContactPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO
            title="تماس با ما | آرمان همراه"
            description="اطلاعات تماس با دفتر مرکزی، خدمات پس از فروش و فروشگاه آرمان همراه ارتباطات آریا."
          />
          <ContactPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default ContactPage;
