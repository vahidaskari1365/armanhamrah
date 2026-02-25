
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/arman-aria-logo.png';
import { useAdmin } from '@/contexts/AdminContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAdmin(); 
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-[100] glass"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="آرمان همراه ارتباطات آریا" 
                className="h-10 w-auto object-contain rounded"
              />
            </Link>
          </motion.div>

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
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={language === 'fa' ? 'English' : 'فارسی'}
            >
              <span className="text-xs font-bold">{language === 'fa' ? 'EN' : 'FA'}</span>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* User Profile / Register Button */}
            {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button 
                        className="hidden sm:flex btn-gold text-sm px-4 py-2 items-center gap-2"
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                       <User size={18}/>
                       <span>{t('nav.profile', 'Profile')}</span>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={language === 'fa' ? 'start' : 'end'} className="w-48">
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                      <LogOut className={`w-4 h-4 ${language === 'fa' ? 'ml-2' : 'mr-2'}`} />
                      <span>{t('nav.logout', 'Sign Out')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                        to="/auth"
                        className="hidden sm:flex btn-gold text-sm px-6 py-3"
                    >
                        {t('nav.myArman')}
                    </Link>
                </motion.div>
            )}

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
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium py-2 transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              {user ? (
                 <button onClick={() => { signOut(); setIsOpen(false); }} className="btn-gold text-sm px-6 py-3 text-center flex items-center justify-center gap-2">
                    <LogOut size={18}/>
                    <span>{t('nav.logout', 'Sign Out')}</span>
                 </button>
              ) : (
                <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="btn-gold text-sm px-6 py-3 text-center"
                >
                    {t('nav.myArman')}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
