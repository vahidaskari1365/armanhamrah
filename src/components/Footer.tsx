import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.jpeg';

const Footer = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.warranty', href: '/warranty' },
    { key: 'nav.products', href: '/products' },
    { key: 'nav.export', href: '/export' },
    { key: 'nav.blog', href: '/blog' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/armanhamrah', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://t.me/armanhamrah', label: 'Telegram' },
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
              <img 
                src={logo} 
                alt="آرمان همراه ارتباطات آریا" 
                className="h-14 w-auto object-contain rounded"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              شرکت گارانتی آرمان همراه ارتباطات آریا از سال ۱۳۹۳ تا اکنون با بهترین تجربه در ارائه خدمات پس از فروش به مشتریان، هوشمندترین گارانتی در ایران را ارائه می‌دهد.
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
                <div className="flex flex-col">
                  <span dir="ltr">021-91009009</span>
                  <span dir="ltr">021-91008080</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <span>info@armanhamrah.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                <span>
                  تهران، خیابان ولیعصر، بالاتر از میدان ولیعصر، برج آرمان همراه، طبقه ۵
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
            © {new Date().getFullYear()} آرمان همراه ارتباطات آریا. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;