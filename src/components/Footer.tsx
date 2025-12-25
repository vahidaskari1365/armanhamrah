import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.warranty', href: '#services' },
    { key: 'nav.products', href: '#products' },
    { key: 'nav.blog', href: '#blog' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/armanhamrah', label: 'Instagram' },
    { icon: MessageCircle, href: '#', label: 'Telegram' },
  ];

  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container-custom section-padding pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">آ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {language === 'fa' ? 'آرمان همراه' : 'Arman Hamrah'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'fa' ? 'ارتباطات آریا' : 'Aria Communications'}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
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
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-foreground mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary" />
                <span dir="ltr">021-1234567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <span>info@armanhamrah.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                <span>
                  {language === 'fa' 
                    ? 'تهران، خیابان ولیعصر' 
                    : 'Tehran, Valiasr Street'}
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-8">
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
            © {new Date().getFullYear()} {language === 'fa' ? 'آرمان همراه ارتباطات آریا' : 'Arman Hamrah Aria Communications'}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
