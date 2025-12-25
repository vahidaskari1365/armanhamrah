import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.warranty', href: '#services' },
    { key: 'nav.products', href: '#products' },
    { key: 'nav.blog', href: '#blog' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">آ</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              {language === 'fa' ? 'آرمان همراه' : 'Arman Hamrah'}
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                {t(item.key)}
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={20} />
            </motion.button>

            {/* My Arman Button */}
            <motion.a
              href="https://my.armanhamrah.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex btn-gold text-sm px-6 py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('nav.myArman')}
            </motion.a>

            {/* Mobile Menu Button */}
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
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {t(item.key)}
                </a>
              ))}
              <a
                href="https://my.armanhamrah.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm px-6 py-3 text-center"
              >
                {t('nav.myArman')}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
