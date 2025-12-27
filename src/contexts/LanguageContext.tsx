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
    'nav.export': 'صادرات',
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
    
    // Export
    'export.title': 'صادرات',
    'export.description': 'شرکت آرمان همراه ارتباطات آریا با سابقه درخشان در حوزه واردات و توزیع محصولات الکترونیکی، خدمات صادرات حرفه‌ای به کشورهای منطقه ارائه می‌دهد.',
    'export.feature1.title': 'صادرات بین‌المللی',
    'export.feature1.desc': 'صادرات محصولات الکترونیکی به کشورهای منطقه خلیج فارس و آسیای میانه',
    'export.feature2.title': 'حمل و نقل امن',
    'export.feature2.desc': 'ارسال ایمن کالا با بیمه کامل و ردیابی آنلاین محموله',
    'export.feature3.title': 'محصولات اورجینال',
    'export.feature3.desc': 'تضمین اصالت کالا با گارانتی معتبر بین‌المللی',
    'export.feature4.title': 'مستندات کامل',
    'export.feature4.desc': 'تهیه کلیه مدارک گمرکی و اسناد صادراتی',
    'export.servicesTitle': 'خدمات صادراتی ما',
    'export.service1.title': 'بسته‌بندی صادراتی',
    'export.service1.desc': 'بسته‌بندی استاندارد و حرفه‌ای مطابق با استانداردهای بین‌المللی برای حفاظت کامل محصولات',
    'export.service2.title': 'ترخیص گمرکی',
    'export.service2.desc': 'انجام کلیه امور گمرکی و ترخیص کالا در مبدا و مقصد با سرعت و دقت بالا',
    'export.service3.title': 'تضمین کیفیت',
    'export.service3.desc': 'بازرسی و کنترل کیفیت تمامی محصولات قبل از ارسال و صدور گواهی کیفیت',
    'export.cta.text': 'برای اطلاعات بیشتر در مورد خدمات صادراتی با ما تماس بگیرید',
    'export.cta.button': 'تماس با ما',
    
    // Guarantee
    'guarantee.title': 'شرایط گارانتی ۱۸ ماهه',
    'guarantee.subtitle': 'شرکت آرمان همراه ارتباطات آریا',
    'guarantee.conditionsTitle': 'شرایط گارانتی',
    'guarantee.exceptionsTitle': 'موارد قابل اغماض',
    
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
    'nav.export': 'Export',
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
    
    // Export
    'export.title': 'Export',
    'export.description': 'Arman Hamrah Aria Communications Company, with a brilliant track record in importing and distributing electronic products, offers professional export services to regional countries.',
    'export.feature1.title': 'International Export',
    'export.feature1.desc': 'Exporting electronic products to Persian Gulf and Central Asian countries',
    'export.feature2.title': 'Secure Shipping',
    'export.feature2.desc': 'Safe delivery with full insurance and online shipment tracking',
    'export.feature3.title': 'Original Products',
    'export.feature3.desc': 'Guaranteed authenticity with valid international warranty',
    'export.feature4.title': 'Complete Documentation',
    'export.feature4.desc': 'Preparation of all customs and export documents',
    'export.servicesTitle': 'Our Export Services',
    'export.service1.title': 'Export Packaging',
    'export.service1.desc': 'Professional standard packaging according to international standards for complete product protection',
    'export.service2.title': 'Customs Clearance',
    'export.service2.desc': 'Complete customs clearance at origin and destination with speed and precision',
    'export.service3.title': 'Quality Assurance',
    'export.service3.desc': 'Inspection and quality control of all products before shipment with quality certificate',
    'export.cta.text': 'Contact us for more information about export services',
    'export.cta.button': 'Contact Us',
    
    // Guarantee
    'guarantee.title': '18-Month Warranty Terms',
    'guarantee.subtitle': 'Arman Hamrah Aria Communications Company',
    'guarantee.conditionsTitle': 'Warranty Conditions',
    'guarantee.exceptionsTitle': 'Acceptable Exceptions',
    
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
