import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/arman-aria-logo.png';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
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
  
  const getInitials = (email: string | undefined) => {
      if (!email) return '?';
      return email.charAt(0).toUpperCase();
  };

  const renderProfileDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button 
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
          </Avatar>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={language === 'fa' ? "end" : "start"}>
        <DropdownMenuLabel className="truncate font-normal text-muted-foreground">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => alert('Coming soon!')} className="cursor-pointer">
            <User className="w-4 h-4 ltr:mr-2 rtl:ml-2"/>
            {t('nav.profile')}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={signOut} className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10">
          <LogOut className="w-4 h-4 ltr:mr-2 rtl:ml-2"/>
          {t('nav.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-lg p-1">
              <img 
                src={logo} 
                alt="آرمان همراه ارتباطات آریا" 
                className="h-16 w-auto object-contain"
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
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {user ? (
              <div className="hidden sm:flex">{renderProfileDropdown()}</div>
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
              <DropdownMenuSeparator />
              {user ? (
                <div className="flex items-center justify-between py-2">
                    <span className="font-medium text-muted-foreground truncate">
                        {user.email}
                    </span>
                    <button onClick={() => { signOut(); setIsOpen(false); }} className="btn-secondary text-red-500 text-sm">
                        {t('nav.logout')}
                    </button>
                </div>
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
