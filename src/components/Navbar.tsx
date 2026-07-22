import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/arman-aria-logo.png';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.warranty', href: '/warranty' },
    { key: 'nav.products', href: '/products' },
    { key: 'nav.export', href: '/export' },
    { key: 'nav.representatives', href: '/representatives' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-[100] glass"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <motion.div whileHover={{ scale: 1.02 }}>
              <img 
                src={logo} 
                alt="آرمان همراه ارتباطات آریا" 
                className="h-20 w-auto object-contain dark:bg-white dark:rounded-2xl dark:p-2"
              loading="lazy" decoding="async" />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div key={item.key} whileHover={{ y: -2 }}>
                <Link
                  to={item.href}
                  className={`font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {t(item.key)}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={language === 'fa' ? 'English' : 'فارسی'}
            >
              <span className="text-xs font-bold">{language === 'fa' ? 'EN' : 'FA'}</span>
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-6"
          >
            <div className="flex flex-col gap-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium py-2 transition-colors text-lg ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
