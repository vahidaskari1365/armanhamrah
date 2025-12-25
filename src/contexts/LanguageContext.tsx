import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fa' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  fa: {
    // Navigation
    'nav.home': 'صفحه اصلی',
    'nav.warranty': 'گارانتی آرمان همراه',
    'nav.products': 'محصولات',
    'nav.representatives': 'نمایندگان',
    'nav.blog': 'بلاگ و آموزش',
    'nav.contact': 'تماس با ما',
    'nav.myArman': 'آرمان من',
    
    // Hero
    'hero.title': 'هوشمندترین گارانتی و خدمات',
    'hero.subtitle': 'پس از فروش در ایران',
    'hero.description': 'شرکت گارانتی آرمان همراه ارتباطات آریا از سال ۱۳۹۳ تا اکنون با بهترین تجربه در ارائه خدمات به مشتریان',
    'hero.cta': 'خدمات ما',
    'hero.cta2': 'ورود به آرمان من',
    
    // Brands
    'brands.title': 'برندهای تحت پوشش',
    
    // Services
    'services.title': 'خدمات ما',
    'services.warranty.title': 'گارانتی آرمان همراه',
    'services.warranty.desc': 'گارانتی معتبر برای محصولات اپل، سامسونگ، شیائومی و سونی',
    'services.myarman.title': 'آرمان من',
    'services.myarman.desc': 'مدیریت آنلاین گارانتی و پیگیری وضعیت دستگاه',
    'services.shop.title': 'فروشگاه',
    'services.shop.desc': 'خرید محصولات اصل با گارانتی معتبر',
    
    // Products
    'products.title': 'جدیدترین محصولات',
    'products.view': 'مشاهده',
    
    // App Section
    'app.title': 'خدمات پس از فروش در دستان شما',
    'app.description': 'شما عزیزان و همراهان آرمان همراه ارتباطات آریا با نصب اپلیکیشن آرمان من و یا استفاده از نسخه وب اپلیکیشن برای iOS از خدمات ما به صورت آنلاین بهره مند شوید.',
    'app.cta': 'ورود به آرمان من',
    
    // Blog
    'blog.title': 'آخرین مطالب',
    'blog.readMore': 'ادامه مطلب',
    'blog.readTime': 'زمان مطالعه',
    'blog.minutes': 'دقیقه',
    
    // Footer
    'footer.description': 'شرکت گارانتی آرمان همراه ارتباطات آریا، ارائه دهنده خدمات گارانتی و پس از فروش برای برندهای معتبر جهانی',
    'footer.quickLinks': 'لینک‌های سریع',
    'footer.contact': 'تماس با ما',
    'footer.followUs': 'ما را دنبال کنید',
    'footer.rights': 'تمامی حقوق محفوظ است',
    
    // Theme
    'theme.light': 'روشن',
    'theme.dark': 'تاریک',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.warranty': 'Arman Warranty',
    'nav.products': 'Products',
    'nav.representatives': 'Representatives',
    'nav.blog': 'Blog & Training',
    'nav.contact': 'Contact Us',
    'nav.myArman': 'My Arman',
    
    // Hero
    'hero.title': 'The Smartest Warranty & Services',
    'hero.subtitle': 'After-Sales in Iran',
    'hero.description': 'Arman Hamrah Aria Communications Warranty Company has been providing the best customer service experience since 2014',
    'hero.cta': 'Our Services',
    'hero.cta2': 'Login to My Arman',
    
    // Brands
    'brands.title': 'Covered Brands',
    
    // Services
    'services.title': 'Our Services',
    'services.warranty.title': 'Arman Warranty',
    'services.warranty.desc': 'Valid warranty for Apple, Samsung, Xiaomi and Sony products',
    'services.myarman.title': 'My Arman',
    'services.myarman.desc': 'Online warranty management and device status tracking',
    'services.shop.title': 'Shop',
    'services.shop.desc': 'Buy original products with valid warranty',
    
    // Products
    'products.title': 'Latest Products',
    'products.view': 'View',
    
    // App Section
    'app.title': 'After-Sales Service at Your Fingertips',
    'app.description': 'Dear customers of Arman Hamrah Aria Communications, enjoy our online services by installing the My Arman app or using the web version for iOS.',
    'app.cta': 'Login to My Arman',
    
    // Blog
    'blog.title': 'Latest Articles',
    'blog.readMore': 'Read More',
    'blog.readTime': 'Read Time',
    'blog.minutes': 'min',
    
    // Footer
    'footer.description': 'Arman Hamrah Aria Communications Warranty Company, providing warranty and after-sales services for prestigious global brands',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');
  const direction: Direction = language === 'fa' ? 'rtl' : 'ltr';

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fa']] || key;
  };

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
