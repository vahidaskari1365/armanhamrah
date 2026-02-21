import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, MessageCircle, Phone, Mail, MapPin, Linkedin, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.jpeg';
import EditableText from '@/components/admin/EditableText';

const Footer = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.warranty', href: '/warranty' },
    { key: 'nav.products', href: '/products' },
    { key: 'nav.export', href: '/export' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/armanholdingco/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/arman-corp-a443813a2/', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://t.me/armanhamrah', label: 'Telegram' },
  ];

  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container-custom section-padding pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logo} 
                alt="آرمان همراه ارتباطات آریا" 
                className="h-14 w-auto object-contain rounded"
              />
            </div>
            <EditableText
              contentKey="footer-description"
              page="shared"
              section="footer"
              defaultValue={t('footer.description')}
              as="p"
              multiline
              className="text-muted-foreground leading-relaxed text-sm"
            />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-foreground mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Center Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-foreground mb-6">
              {language === 'fa' ? 'خدمات پس از فروش' : 'After-Sales Service'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <a href="tel:02158798" dir="ltr" className="block hover:text-primary transition-colors">021-58798</a>
                  <a href="tel:02188329274" dir="ltr" className="block hover:text-primary transition-colors">021-88329274</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <span>
                    {language === 'fa' 
                      ? 'تهران، خیابان مطهری، سلیمان خاطر، نبش بانک ملت، ساختمان امیر اتابک، ط۲، واحد ۲۰۴'
                      : 'Tehran, Motahhari St., Soleiman Khater, Amir Atabak Building, Floor 2, Unit 204'
                    }
                  </span>
                  <p className="text-xs text-muted-foreground/70 mt-1" dir="ltr">
                    {language === 'fa' ? 'کد پستی:' : 'Postal Code:'} ۱۵۷۵۹۴۵۳۳۵
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Store Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold text-foreground mb-6">
              {language === 'fa' ? 'فروشگاه' : 'Store'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary flex-shrink-0 mt-1" />
                <span dir="ltr">{language === 'fa' ? '(به زودی)' : '(Coming Soon)'}</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <span>
                    {language === 'fa' 
                      ? 'آدرس فروشگاه به زودی اضافه خواهد شد.'
                      : 'Store address will be added soon.'
                    }
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Headquarters Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-bold text-foreground mb-6">
              {language === 'fa' ? 'دفتر مرکزی' : 'Headquarters'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span dir="ltr">021-88321030-2</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span>info@armanhamrah.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <span>
                    {language === 'fa' 
                      ? 'تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴'
                      : 'Tehran, Motahhari St., After Mofateh, Soleiman Khater St., Amir Atabak Building, No. 130, Floor 3, Unit 304'
                    }
                  </span>
                  <p className="text-xs text-muted-foreground/70 mt-1" dir="ltr">
                    {language === 'fa' ? 'کد پستی:' : 'Postal Code:'} 1575945341
                  </p>
                </div>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-foreground mb-4">{t('footer.followUs')}</h5>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {language === 'fa' ? 'آرمان همراه ارتباطات آریا. تمامی حقوق محفوظ است.' : 'Arman Hamrah Aria Communications. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;