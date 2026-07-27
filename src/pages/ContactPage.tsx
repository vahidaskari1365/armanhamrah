import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Clock, Instagram, MessageCircle, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import EditableText from '@/components/admin/EditableText';

const contactInfo = [
  {
    icon: Phone,
    title: { fa: 'تلفن دفتر مرکزی', en: 'Head Office Phone' },
    contentKey: 'phone-office',
    phones: [
      { number: '02158798', href: 'tel:02158798' },
      { number: '02188329274 داخلی 4', href: 'tel:02188329274' },
    ],
  },
  {
    icon: Phone,
    title: { fa: 'تلفن پشتیبانی', en: 'Support Phone' },
    contentKey: 'phone-support',
    phones: [
      { number: '021-58798', href: 'tel:02158798' },
      { number: '021-88329274 داخلی 4', href: 'tel:02188329274' },
    ],
  },
    {
      icon: Phone,
      title: { fa: 'تلفن فروشگاه', en: 'Store Phone' },
      contentKey: 'phone-store',
      phones: [
        { number: '021-66745916', href: 'tel:02166745916' },
        { number: '09931635153', href: 'tel:09931635153' },
      ],
    },
  {
    icon: Mail,
    title: { fa: 'ایمیل', en: 'Email' },
    contentKey: 'email',
    phones: [
      { number: 'info@armanhamrah.com', href: 'mailto:info@armanhamrah.com' },
      { number: 'export@armanhamrah.com', href: 'mailto:export@armanhamrah.com' },
    ],
  },
  {
    icon: Clock,
    title: { fa: 'ساعات کاری', en: 'Working Hours' },
    contentKey: 'hours',
    phones: [
      { number: 'شنبه تا چهارشنبه: 9 صبح تا 17', numberEn: 'Sat-Wed: 9 AM - 5 PM', href: '#' },
      { number: 'پنجشنبه: 9 صبح تا 14', numberEn: 'Thu: 9 AM - 2 PM', href: '#' },
    ],
  },
];

const addressInfo = {
  icon: MapPin,
  title: { fa: 'آدرس دفتر مرکزی', en: 'Head Office Address' },
  value: {
    fa: 'تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۲، واحد ۲۰۴',
    en: 'Unit 204, 2nd Floor, Amir Atabak Building, Soleyman Khater St, Motahari St, Tehran, IRAN'
  },
  postalCode: '1575945335',
};

const socialLinks = [
  { icon: Instagram, name: { fa: 'اینستاگرام', en: 'Instagram' }, href: 'https://www.instagram.com/armanholdingco/', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  { icon: MessageCircle, name: { fa: 'تلگرام', en: 'Telegram' }, href: 'https://t.me/armanhamrah', color: 'bg-blue-500' },
  { icon: Send, name: { fa: 'واتساپ', en: 'WhatsApp' }, href: 'https://wa.me/989888321032', color: 'bg-green-500' },
];

const ContactPageContent = () => {
  const { language } = useLanguage();
  
  return (
    <div className="page-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={language === 'fa' ? 'rtl' : 'ltr'}>
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
                  contentKey="contact-title"
                  page="contact"
                  section="hero"
                  defaultValue={language === 'fa' ? 'تماس با ما' : 'Contact Us'}
                  as="span"
                />
              </h1>
              <p className="text-lg text-foreground max-w-2xl">
                <EditableText
                  contentKey="contact-description"
                  page="contact"
                  section="hero"
                  defaultValue={language === 'fa' 
                    ? 'ما آماده پاسخگویی به سوالات شما هستیم. از هر طریقی که راحت‌تر هستید با ما در ارتباط باشید.'
                    : 'We are ready to answer your questions. Contact us through any channel you prefer.'
                  }
                  as="span"
                  multiline
                />
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-premium text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <item.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{item.title[language]}</h3>
                  <div className="space-y-2">
                    {item.phones.map((phone, phoneIndex) => (
                      <a
                        key={phoneIndex}
                        href={phone.href}
                        className="block text-foreground text-sm hover:text-primary transition-colors"
                        dir={phone.href.startsWith('tel') ? 'ltr' : language === 'fa' ? 'rtl' : 'ltr'}
                      >
                        {language === 'en' && 'numberEn' in phone ? phone.numberEn : phone.number}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-premium mb-16"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{addressInfo.title[language]}</h3>
                  <p className="text-foreground mb-2">{addressInfo.value[language]}</p>
                  <p className="text-sm text-foreground/70" dir="rtl">
                    {language === 'fa' ? 'کد پستی: ' : 'Postal Code: '}{addressInfo.postalCode}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form & Social */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="card-premium"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {language === 'fa' ? 'ارسال پیام' : 'Send Message'}
                </h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'fa' ? 'نام و نام خانوادگی' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder={language === 'fa' ? 'نام خود را وارد کنید' : 'Enter your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'fa' ? 'شماره تماس' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder={language === 'fa' ? '09123456789' : '+98 912 345 6789'}
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {language === 'fa' ? 'ایمیل' : 'Email'}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {language === 'fa' ? 'موضوع' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder={language === 'fa' ? 'موضوع پیام خود را بنویسید' : 'Enter your subject'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {language === 'fa' ? 'پیام' : 'Message'}
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder={language === 'fa' ? 'پیام خود را بنویسید...' : 'Write your message...'}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-gold py-4 text-lg"
                  >
                    {language === 'fa' ? 'ارسال پیام' : 'Send Message'}
                  </button>
                </form>
              </motion.div>

              {/* Map & Social */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Map */}
                <div className="card-premium overflow-hidden h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9!2d51.4196!3d35.7202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00f1b1b1b1b1%3A0x1234567890123456!2z2K7bjNin2KjYp9mGINiz2YTbjNmF2KfZhiDYrtin2LfYsdiMINiq2YfYsdin2YY!5e0!3m2!1sfa!2sir!4v1700000000000!5m2!1sfa!2sir"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  />
                </div>

                {/* Social Links */}
                <div className="card-premium">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    {language === 'fa' ? 'ما را در شبکه‌های اجتماعی دنبال کنید' : 'Follow Us on Social Media'}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} text-white rounded-xl p-4 text-center hover:opacity-90 transition-opacity`}
                      >
                        <social.icon size={32} className="mx-auto mb-2" />
                        <span className="text-sm font-medium">{social.name[language]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
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
            title="تماس با ما | Contact Us - Arman Hamrah"
            description="راه‌های ارتباط با شرکت آرمان همراه ارتباطات آریا - Contact Arman Hamrah Communications"
          />
          <ContactPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default ContactPage;