import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Clock, Instagram, MessageCircle, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';

const contactInfo = [
  {
    icon: Phone,
    title: 'تلفن تماس',
    value: '021-91009009',
    subValue: '021-44556677',
    href: 'tel:02191009009',
  },
  {
    icon: Mail,
    title: 'ایمیل',
    value: 'info@armanhamrah.com',
    subValue: 'support@armanhamrah.com',
    href: 'mailto:info@armanhamrah.com',
  },
  {
    icon: MapPin,
    title: 'آدرس',
    value: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک',
    subValue: 'پلاک 123، طبقه 5',
    href: '#',
  },
  {
    icon: Clock,
    title: 'ساعات کاری',
    value: 'شنبه تا پنجشنبه: 9 صبح تا 6 عصر',
    subValue: 'جمعه: تعطیل',
    href: '#',
  },
];

const socialLinks = [
  { icon: Instagram, name: 'اینستاگرام', href: 'https://instagram.com/armanhamrah', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  { icon: MessageCircle, name: 'تلگرام', href: 'https://t.me/armanhamrah', color: 'bg-blue-500' },
  { icon: Send, name: 'واتساپ', href: 'https://wa.me/989121234567', color: 'bg-green-500' },
];

const ContactPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="تماس با ما | آرمان همراه ارتباطات آریا"
            description="راه‌های ارتباط با شرکت آرمان همراه ارتباطات آریا - تلفن، ایمیل، آدرس و شبکه‌های اجتماعی"
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
                      تماس با ما
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      ما آماده پاسخگویی به سوالات شما هستیم. از هر طریقی که راحت‌تر هستید با ما در ارتباط باشید.
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Contact Info */}
              <section className="section-padding">
                <div className="container-custom">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactInfo.map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="card-premium text-center group"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <item.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mb-1">{item.value}</p>
                        <p className="text-muted-foreground text-xs">{item.subValue}</p>
                      </motion.a>
                    ))}
                  </div>

                  {/* Contact Form & Social */}
                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="card-premium"
                    >
                      <h2 className="text-2xl font-bold text-foreground mb-6">ارسال پیام</h2>
                      <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">نام و نام خانوادگی</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                              placeholder="نام خود را وارد کنید"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">شماره تماس</label>
                            <input
                              type="tel"
                              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                              placeholder="09123456789"
                              dir="ltr"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">ایمیل</label>
                          <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="example@email.com"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">موضوع</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="موضوع پیام خود را بنویسید"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">پیام</label>
                          <textarea
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                            placeholder="پیام خود را بنویسید..."
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full btn-gold py-4 text-lg"
                        >
                          ارسال پیام
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
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.5660988886!2d51.40837731525907!3d35.75863028017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ1JzMxLjEiTiA1McKwMjQnMzguMSJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
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
                        <h3 className="text-xl font-bold text-foreground mb-6">ما را در شبکه‌های اجتماعی دنبال کنید</h3>
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
                              <span className="text-sm font-medium">{social.name}</span>
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
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default ContactPage;
