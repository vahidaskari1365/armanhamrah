import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/arman-aria-logo.png';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.warranty', href: '/warranty' },
    { key: 'nav.products', href: '/products' },
    { key: 'nav.export', href: '/export' },
    { key: 'nav.representatives', href: '/representatives' },
    { key: 'nav.contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-[100] glass"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between" style={{ height: '150px' }}>
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-lg p-1 h-full">
            <Link to="/" className="flex items-center h-full">
              <img
                src={logo}
                alt="آرمان همراه ارتباطات آریا"
                className="h-full w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div key={item.key} whileHover={{ y: -2 }}>
                <Link to={item.href} className={`font-medium transition-colors ${location.pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                  {t(item.key)}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button onClick={toggleLanguage} className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span className="text-xs font-bold">{language === 'fa' ? 'EN' : 'FA'}</span>
            </motion.button>
            <motion.button onClick={toggleTheme} className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/auth" className="hidden sm:flex btn-gold text-sm px-6 py-3">{t('nav.myArman')}</Link>
            </motion.div>
            <motion.button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground" whileTap={{ scale: 0.95 }}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="lg:hidden pb-6">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.key} to={item.href} onClick={() => setIsOpen(false)} className={`font-medium py-2 transition-colors ${location.pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                  {t(item.key)}
                </Link>
              ))}
              <Link to="/auth" onClick={() => setIsOpen(false)} className="btn-gold text-sm px-6 py-3 text-center">{t('nav.myArman')}</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;