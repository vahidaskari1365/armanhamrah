import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'fa' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  loading: boolean;
}

type Translations = Record<string, { fa: string; en: string }>;

const fallbackTranslationsData = {
  fa: {
    // General
    'all': 'همه',
    'product.coming_soon': 'اطلاعات این محصول به زودی تکمیل می‌شود.',

    // Brands
    'Apple': 'اپل',
    'Samsung': 'سامسونگ',
    'Xiaomi': 'شیائومی',
    'Poco': 'پوکو',
    'Nokia': 'نوکیا',

    // Categories
    'category.mobile': 'موبایل',
    'category.smartwatch': 'ساعت هوشمند',
    'category.tablet': 'تبلت',
    'category.accessories': 'لوازم جانبی',
    'category.feature_phone': 'موبایل ساده',

    // Navigation
    'nav.home': 'صفحه اصلی',
    'nav.warranty': 'گارانتی آرمان همراه',
    'nav.products': 'محصولات',
    'nav.export': 'صادرات',
    'nav.representatives': 'نمایندگان',
    'nav.blog': 'بلاگ و آموزش',
    'nav.contact': 'تماس با ما',
    'nav.myArman': 'ثبت نام',
    'nav.cooperation': 'همکاری با ما',
    
    // Hero
    'hero.title': 'هوشمندترین گارانتی و خدمات',
    'hero.subtitle': 'پس از فروش در ایران',
    'hero.description': 'شرکت گارانتی آرمان همراه ارتباطات آریا از سال ۱۳۹۴ تا کنون با بهترین تجربه در ارائه خدمات به مشتریان',
    'hero.cta': 'خدمات ما',
    'hero.cta2': 'ثبت نام',
    
    // Brands
    'brands.title': 'برندهای تحت پوشش',
    
    // Services
    'services.title': 'خدمات ما',
    'services.warranty.title': 'گارانتی آرمان همراه',
    'services.warranty.desc': 'گارانتی معتبر برای محصولات اپل، سامسونگ، شیائومی و سونی',
    'services.representatives.title': 'نمایندگان',
    'services.representatives.desc': 'شبکه گسترده نمایندگان آرمان همراه در سراسر ایران',
    'services.shop.title': 'فروشگاه',
    'services.shop.desc': 'خرید محصولات اصل با گارانتی معتبر',
    'services.export.title': 'صادرات',
    'services.export.desc': 'صادرات محصولات به سراسر جهان',

    // Subsidiaries
    'subsidiaries.title': 'شرکت‌های زیرمجموعه',
    'subsidiary.1.name': 'آیین تجارت آران',
    'subsidiary.2.name': 'آرشا فن آوران رادان',
    'subsidiary.3.name': 'آرتا تجارت کیهان',
    'subsidiary.4.name': 'فرنام تجارت دادار',
    'subsidiary.5.name': 'دانیال تجارت دارا',
    'subsidiary.6.name': 'فرنام تجارت کارا',
    'subsidiary.7.name': 'کارزین تجارت پرگون',
    'subsidiary.8.name': 'مانیا تجارت ماکان',
    'subsidiary.9.name': 'کارزین تجارت آرشان',
    'subsidiary.10.name': 'رادیکال وان',

    // Products Page
    'products.title': 'محصولات',
    'products.back': 'بازگشت به صفحه اصلی',
    'products.back_to_list': 'بازگشت به لیست محصولات',
    'products.description': 'تمامی محصولات با گارانتی معتبر آرمان همراه ارتباطات آریا عرضه می‌شوند.',
    'products.availability': 'جهت اطلاع از قیمت و موجودی لطفا با فروشگاه تماس حاصل بفرمایید.',
    'products.brand': 'برند:',
    'products.category': 'دسته‌بندی:',
    'products.view': 'مشاهده',
    'products.noProducts': 'محصولی یافت نشد',
    'products.not_found': 'محصول یافت نشد',
    'products.intro': 'معرفی محصول',
    'products.specs': 'مشخصات فنی',
    'products.specs_soon': 'مشخصات فنی این محصول به زودی اضافه خواهد شد.',
    'products.seo.title': 'محصولات | آرمان همراه ارتباطات آریا',
    'products.seo.description': 'مشاهده تمامی محصولات اپل، سامسونگ با گارانتی آرمان همراه - آیفون، گلکسی، اپل واچ و ساعت‌های هوشمند',

    'product.redmi_a5.description': 'شیائومی Redmi A5 یک گوشی هوشمند اقتصادی با نمایشگر بزرگ، باتری بادوام و عملکردی قابل اعتماد برای کارهای روزمره است.',
    'spec.value.camera_redmi_a5': 'دوربین اصلی 13 مگاپیکسل، دوربین سلفی 5 مگاپیکسل',
    'product.poco_m7.description': 'پوکو M7 با پردازنده قدرتمند، نمایشگر روان و باتری با شارژدهی فوق‌العاده، یک انتخاب عالی برای گیمینگ و استفاده‌های سنگین است.',
    'spec.value.camera_poco_m7': 'دوربین اصلی 108 مگاپیکسل، دوربین اولترا واید 8 مگاپیکسل، دوربین ماکرو 2 مگاپیکسل',
    'product.poco_c85.description': 'پوکو C85 یک گوشی اقتصادی با طراحی مدرن، نمایشگر بزرگ و باتری حجیم است که نیازهای روزمره شما را به خوبی برآورده می‌کند.',
    'spec.value.camera_poco_c85': 'دوربین اصلی 50 مگاپیکسل، دوربین عمق 2 مگاپیکسل',
    'product.poco_c75.description': 'پوکو C75 با قیمتی مناسب، عملکردی روان و باتری بزرگ، یک گوشی هوشمند قابل اعتماد برای استفاده‌های روزمره است.',
    'spec.value.camera_poco_c75': 'دوربین اصلی 50 مگاپیکسل، دوربین سلفی 8 مگاپیکسل',
    'product.poco_c71.description': 'پوکو C71 یک گزینه اقتصادی با نمایشگر بزرگ و باتری قدرتمند است که برای تماشای فیلم و وب‌گردی بسیار مناسب است.',
    'spec.value.camera_poco_c71': 'دوربین اصلی 13 مگاپیکسل، دوربین عمق 2 مگاپیکسل',

    // Export Page
    'export.back': 'بازگشت به صفحه صادرات',
    'export.title_main': 'صادرات آرمان',
    'export.subtitle_main': 'بهترین راهکار برای واردات کالا از ایران',
    'export.description_main': 'با بیش از ۹ سال تجربه، شرکت آرمان در واردات و صادرات کالاهای اساسی و تخصصی در بخش‌های مختلف از جمله فناوری اطلاعات، مواد غذایی، پوشاک، نفت، فلزات و مصالح ساختمانی فعالیت موفقی داشته است.',
    'export.features.title': 'ویژگی‌های خدمات صادراتی',
    'export.features.international.title': 'صادرات بین‌المللی',
    'export.features.international.description': 'صادرات محصولات به کشورهای منطقه خلیج فارس، آسیای میانه و کشورهای همسایه',
    'export.features.transportation.title': 'حمل و نقل امن',
    'export.features.transportation.description': 'ارسال ایمن کالا با بیمه کامل و ردیابی آنلاین محموله در تمام مراحل',
    'export.features.original.title': 'محصولات اورجینال',
    'export.features.original.description': 'تضمین اصالت کالا با گارانتی معتبر بین‌المللی و سرتیفیکیت اصالت',
    'export.features.documentation.title': 'مستندات کامل',
    'export.features.documentation.description': 'تهیه کلیه مدارک گمرکی، اسناد صادراتی و مجوزهای لازم',
    'export.products.title': 'محصولات صادراتی',
    'export.products.view_details': 'مشاهده جزئیات',
    'export.products.category.metals': 'فلزات',
    'export.products.category.petrochemical': 'پتروشیمی',
    'export.products.category.textile': 'نساجی',
    'export.products.iron_steel.name': 'آهن و فولاد',
    'export.products.iron_steel.description': 'بهترین و با کیفیت‌ترین آهن و فولاد در بازار ایران',
    'export.products.copper_rod.name': 'مفتول مسی',
    'export.products.copper_rod.description': 'بهترین و با کیفیت‌ترین مفتول مسی در بازار ایران',
    'export.products.bitumen.name': 'قیر',
    'export.products.bitumen.description': 'بهترین و با کیفیت‌ترین قیر در بازار ایران',
    'export.products.oil.name': 'روغن',
    'export.products.oil.description': 'بهترین و با کیفیت‌ترین روغن‌های صنعتی و پایه در بازار ایران',
    'export.products.thread.name': 'نخ',
    'export.products.thread.description': 'بهترین و با کیفیت‌ترین نخ در بازار ایران',
    'export.services.title': 'خدمات صادراتی ما',
    'export.services.packaging.title': 'بسته‌بندی صادراتی',
    'export.services.packaging.description': 'بسته‌بندی استاندارد و حرفه‌ای مطابق با استانداردهای بین‌المللی',
    'export.services.clearance.title': 'ترخیص گمرکی',
    'export.services.clearance.description': 'انجام کلیه امور گمرکی و ترخیص کالا در مبدا و مقصد',
    'export.services.quality.title': 'تضمین کیفیت',
    'export.services.quality.description': 'بازرسی و کنترل کیفیت تمامی محصولات قبل از ارسال',
    'export.goal.title': 'هدف ما',
    'export.goal.description': 'با بیش از ۹ سال تجربه، شرکت آرمان با موفقیت در واردات و صادرات کالاهای اساسی و تخصصی در بخش‌های مختلف از جمله فناوری اطلاعات، مواد غذایی، پوشاک، نفت، فلزات و مصالح ساختمانی فعالیت داشته است. هدف شرکت ایجاد ارتباطات تجاری گسترده در سراسر جهان است.',
    'export.countries.title': 'کشورهای هدف صادرات',
    'export.countries.subtitle': 'صادرات به کشورهای منطقه و همسایه',
    'country.uae': 'امارات',
    'country.iraq': 'عراق',
    'country.afghanistan': 'افغانستان',
    'country.turkmenistan': 'ترکمنستان',
    'country.azerbaijan': 'آذربایجان',
    'country.armenia': 'ارمنستان',
    'country.qatar': 'قطر',
    'country.kuwait': 'کویت',
    'export.contact.title': 'تماس با ما',
    'export.contact.subtitle': 'برای اطلاعات بیشتر با متخصصین ما تماس بگیرید',
    'export.contact.phone': 'تلفن',
    'export.contact.address': 'آدرس',
    'export.contact.address_value': 'واحد ۳۰۴، طبقه ۳، ساختمان امیر اتابک، خیابان سلیمان خاطر، خیابان مطهری، تهران',
    'export.form.title': 'فرم تماس',
    'export.form.full_name': 'نام کامل',
    'export.form.full_name_placeholder': 'نام کامل شما',
    'export.form.company_name': 'نام شرکت',
    'export.form.company_name_placeholder': 'نام شرکت شما',
    'export.form.message': 'پیام شما',
    'export.form.message_placeholder': 'چطور می‌توانیم به شما کمک کنیم؟',
    'export.form.send': 'ارسال پیام',
    'export.cta.title': 'کسب و کار خود را با ما شروع کنید',
    'export.cta.subtitle': 'کارشناسان تجاری ما همواره در تلاش هستند تا راحتی کسب و کار شما را افزایش دهند.',
    'export.cta.button_start': 'شروع مکالمه',
    'export.seo.title': 'صادرات | بهترین راهکار برای واردات کالا از ایران',
    'export.seo.description': 'خدمات صادرات محصولات به کشورهای منطقه - آهن و فولاد، مفتول مسی، قیر، روغن و نخ',
    
    // Bitumen Page
    'bitumen.title': 'قیر',
    'bitumen.subtitle': 'Bitumen',
    'bitumen.category': 'پتروشیمی',
    'bitumen.description': 'بهترین و با کیفیت‌ترین قیر در بازار ایران، تولید شده در پالایشگاه‌های معتبر و مطابق با استانداردهای بین‌المللی.',
    'bitumen.gradesTitle': 'گریدهای موجود',
    'bitumen.specsTitle': 'مشخصات فنی محصول',
    'bitumen.feature1.title': 'تولید پالایشگاهی',
    'bitumen.feature1.desc': 'تولید شده در پالایشگاه‌های معتبر ایران',
    'bitumen.feature2.title': 'کیفیت تضمینی',
    'bitumen.feature2.desc': 'تضمین کیفیت با استانداردهای بین‌المللی',
    'bitumen.feature3.title': 'گواهینامه‌ها',
    'bitumen.feature3.desc': 'مطابق با استانداردهای ASTM',
    'bitumen.feature4.title': 'مستندات کامل',
    'bitumen.feature4.desc': 'ارائه تمامی مدارک و سرتیفیکیت‌ها',
    'bitumen.table.characteristic': 'ویژگی',
    'bitumen.table.unit': 'واحد',
    'bitumen.table.specification': 'مشخصات',
    'bitumen.table.testMethod': 'روش تست',
    'bitumen.spec.penetration': 'درجه نفوذ @25°C',
    'bitumen.spec.specificGravity': 'وزن مخصوص @25°C',
    'bitumen.spec.softeningPoint': 'نقطه نرمی',
    'bitumen.spec.ductility': 'خاصیت انگمی @25°C',
    'bitumen.spec.lossOnHeating': 'افت وزنی در اثر حرارت',
    'bitumen.spec.dropInPenetration': 'کاهش درجه نفوذ پس از افت وزنی',
    'bitumen.spec.flashPoint': 'نقطه اشتعال',
    'bitumen.spec.solubility': 'درجه حلالیت در CS2',
    'bitumen.seo.title': 'صادرات قیر | آرمان همراه',
    'bitumen.seo.description': 'صادرات بهترین و با کیفیت‌ترین قیر ایران در گریدهای مختلف (60/70, VG10, VG30) با تضمین کیفیت و استانداردهای بین‌المللی.',

    // Copper Rod Page
    'copper.title': 'مفتول مسی',
    'copper.subtitle': 'Copper Rod',
    'copper.description': 'صادرات مفتول مس با کیفیت بالا و خلوص ۹۹.۹٪، تولید شده مطابق با استانداردهای جهانی برای صنایع کابل و سیم.',
    'copper.featuresTitle': 'ویژگی‌های مفتول مس',
    'copper.feature1.title': 'انعطاف‌پذیری بالا',
    'copper.feature1.desc': 'مناسب برای انواع کاربردهای صنعتی و ساختمانی',
    'copper.feature2.title': 'هدایت الکتریکی عالی',
    'copper.feature2.desc': 'تضمین کمترین اتلاف انرژی در انتقال برق',
    'copper.feature3.title': 'استاندارد جهانی',
    'copper.feature3.desc': 'تولید مطابق با استاندارد ASTM B49',
    'copper.feature4.title': 'بسته‌بندی مطمئن',
    'copper.feature4.desc': 'حفاظت کامل محصول در برابر اکسیداسیون و آسیب',
    'copper.specsTitle': 'مشخصات فنی مفتول مس',
    'copper.table.characteristic': 'مشخصه',
    'copper.table.value': 'مقدار',
    'copper.spec.diameter': 'قطر',
    'copper.spec.conductivity': 'هدایت الکتریکی',
    'copper.spec.tensile': 'مقاومت کششی',
    'copper.spec.elongation': 'ازدیاد طول',
    'copper.spec.purity': 'درجه خلوص',
    'copper.spec.standard': 'استاندارد',
    'copper.seo.title': 'صادرات مفتول مسی | آرمان همراه',
    'copper.seo.description': 'صادرات مفتول مسی با خلوص ۹۹.۹٪ و هدایت الکتریکی بالا، مطابق با استاندارد ASTM B49 برای صنایع کابل.',

    // Iron & Steel Page
    'iron.title': 'آهن و فولاد',
    'iron.subtitle': 'Iron & Steel',
    'iron.description': 'تأمین و صادرات انواع محصولات فولادی از جمله میلگرد، ورق، شمش و پروفیل‌های ساختمانی با بهترین کیفیت از کارخانه‌های معتبر ایران.',
    'iron.productsTitle': 'محصولات قابل تأمین',
    'iron.product1.name': 'میلگرد (Rebar)',
    'iron.product1.desc': 'انواع میلگرد آجدار و ساده در سایزهای مختلف',
    'iron.product2.name': 'ورق فولادی (Steel Sheet)',
    'iron.product2.desc': 'ورق گرم، ورق سرد، ورق گالوانیزه و رنگی',
    'iron.product3.name': 'شمش (Billet/Bloom/Slab)',
    'iron.product3.desc': 'انواع شمش فولادی برای کاربردهای نورد',
    'iron.product4.name': 'تیرآهن (Beam)',
    'iron.product4.desc': 'تیرآهن IPE, IPB و هاش در سایزهای استاندارد',
    'iron.product5.name': 'پروفیل (Profile)',
    'iron.product5.desc': 'انواع قوطی و پروفیل‌های ساختمانی و صنعتی',
    'iron.product6.name': 'نبشی و ناودانی (Angle/Channel)',
    'iron.product6.desc': 'نبشی و ناودانی فولادی در ابعاد متنوع',
    'iron.featuresTitle': 'چرا آهن و فولاد ایران؟',
    'iron.feature1.title': 'تولیدکنندگان برتر',
    'iron.feature1.desc': 'تأمین از بزرگترین و معتبرترین کارخانجات فولاد ایران',
    'iron.feature2.title': 'کنترل کیفیت',
    'iron.feature2.desc': 'بازرسی و کنترل کیفیت دقیق قبل از بارگیری',
    'iron.feature3.title': 'قیمت رقابتی',
    'iron.feature3.desc': 'بهترین قیمت‌های صادراتی با حذف واسطه‌ها',
    'iron.feature4.title': 'گواهی استاندارد',
    'iron.feature4.desc': 'ارائه گواهی کیفیت و استاندارد معتبر برای تمام محصولات',
    'iron.seo.title': 'صادرات آهن و فولاد | آرمان همراه',
    'iron.seo.description': 'صادرات انواع محصولات فولادی شامل میلگرد، ورق، شمش و پروفیل از برترین کارخانه‌های ایران با بهترین قیمت و کیفیت.',

    // Oil Page
    'oil.title': 'روغن‌های صنعتی و پایه',
    'oil.subtitle': 'Industrial & Base Oil',
    'oil.description': 'تأمین و صادرات انواع روغن‌های پایه و صنعتی با کیفیت بالا، مناسب برای روانکارها، گریس و سایر مصارف صنعتی از پالایشگاه‌های معتبر.',
    'oil.productsTitle': 'انواع روغن قابل تأمین',
    'oil.product1.name': 'روغن پایه (Base Oil)',
    'oil.product1.desc': 'گریدهای مختلف روغن پایه ویرجین و ریسایکل',
    'oil.product2.name': 'روغن موتور (Engine Oil)',
    'oil.product2.desc': 'روغن موتورهای بنزینی و دیزلی با استانداردهای API',
    'oil.product3.name': 'روغن هیدرولیک (Hydraulic Oil)',
    'oil.product3.desc': 'روغن هیدرولیک برای سیستم‌های صنعتی و ماشین‌آلات سنگین',
    'oil.product4.name': 'روغن دنده (Gear Oil)',
    'oil.product4.desc': 'روغن دنده برای گیربکس‌های صنعتی و خودرو',
    'oil.featuresTitle': 'ویژگی‌های محصولات ما',
    'oil.feature1.title': 'کیفیت بالا',
    'oil.feature1.desc': 'تولید با افزودنی‌های معتبر و مطابق با استانداردهای جهانی',
    'oil.feature2.title': 'آنالیز آزمایشگاهی',
    'oil.feature2.desc': 'ارائه برگه آنالیز و مشخصات فنی دقیق برای هر محصول',
    'oil.feature3.title': 'تأمین از پالایشگاه',
    'oil.feature3.desc': 'تأمین مستقیم از پالایشگاه‌های معتبر ایران',
    'oil.feature4.title': 'بسته‌بندی متنوع',
    'oil.feature4.desc': 'امکان بسته‌بندی به صورت فله، بشکه و IBC',
    'oil.seo.title': 'صادرات روغن صنعتی و پایه | آرمان همراه',
    'oil.seo.description': 'صادرات انواع روغن‌های پایه، روغن موتور، هیدرولیک و دنده از پالایشگاه‌های معتبر ایران با کیفیت تضمینی.',

    // Guarantee
    'guarantee.title': '18-Month Warranty Terms',
    'guarantee.subtitle': 'Arman Hamrah Aria Communications Company',
    'guarantee.conditionsTitle': 'Warranty Conditions',
    'guarantee.exceptionsTitle': 'Acceptable Exceptions',
    
    // App Section
    'app.title': 'After-Sales Service at Your Fingertips',
    'app.description': 'Dear customers of Arman Hamrah Aria Communications, enjoy our online services by installing the My Arman app or using the web version for iOS.',
    'app.cta': 'Login to My Arman',
    
    // Representatives
    'representatives.title': 'Sales Representatives',
    'representatives.subtitle': 'Our extensive network across Iran',
    
    // Footer
    'footer.description': 'شرکت گارانتی آرمان همراه ارتباطات آریا از سال ۱۳۹۴ تا کنون با بهترین تجربه در ارائه خدمات پس از فروش به مشتریان، هوشمندترین گارانتی در ایران را ارائه می‌دهد.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',

    'export.products.category.construction':'ساختمانی',
    'export.products.piping-equipment.name': 'تجهیزات لوله کشی و شیرآلات',
    'export.products.piping-equipment.description': 'لوله های انتقال مایع ، تک لایه ساده.',
    'export.products.piping-equipment.details.description': 'لوله های انتقال مایع ، تک لایه ساده.',
    'export.products.piping-equipment.details.material': 'PVC',
    'export.products.piping-equipment.details.size': '100mm',
    'export.products.piping-equipment.details.length': '6 متری',
    'general.back_to_export': 'بازگشت به صفحه صادرات',
    'general.product_details': 'توضیحات محصول',
    'general.description': 'توضیحات',
    'general.material': 'جنس',
    'general.size': 'سایز',
    'general.length': 'طول',
  },
  en: {
    // General
    'all': 'All',
    'product.coming_soon': 'Product information will be available soon.',

    // Brands
    'Apple': 'Apple',
    'Samsung': 'Samsung',
    'Xiaomi': 'Xiaomi',
    'Poco': 'Poco',
    'Nokia': 'Nokia',

    // Categories
    'category.mobile': 'Mobile',
    'category.smartwatch': 'Smartwatch',
    'category.tablet': 'Tablet',
    'category.accessories': 'Accessories',
    'category.feature_phone': 'Feature Phone',

    // Navigation
    'nav.home': 'Home',
    'nav.warranty': 'Arman Warranty',
    'nav.products': 'Products',
    'nav.export': 'Export',
    'nav.representatives': 'Representatives',
    'nav.blog': 'Blog & Training',
    'nav.contact': 'Contact Us',
    'nav.myArman': 'Register',
    'nav.cooperation': 'Cooperation',
    
    // Hero
    'hero.title': 'The Smartest Warranty & Services',
    'hero.subtitle': 'After-Sales in Iran',
    'hero.description': 'Arman Hamrah Aria Communications Warranty Company has been providing the best customer service experience since 2015',
    'hero.cta': 'Our Services',
    'hero.cta2': 'Register',
    
    // Brands
    'brands.title': 'Covered Brands',
    
    // Services
    'services.title': 'Our Services',
    'services.warranty.title': 'Arman Warranty',
    'services.warranty.desc': 'Valid warranty for Apple, Samsung, Xiaomi and Sony products',
    'services.representatives.title': 'Representatives',
    'services.representatives.desc': 'Our extensive network of representatives across Iran',
    'services.shop.title': 'Shop',
    'services.shop.desc': 'Buy original products with valid warranty',
    'services.export.title': 'Export',
    'services.export.desc': 'Exporting products worldwide',

    // Subsidiaries
    'subsidiaries.title': 'Subsidiary Companies',
    'subsidiary.1.name': 'Aein Tejarat Aran',
    'subsidiary.2.name': 'Arsha Fanavaran Radan',
    'subsidiary.3.name': 'Arta Tejarat Keyhan',
    'subsidiary.4.name': 'Farnam Tejarat Dadar',
    'subsidiary.5.name': 'Danial Tejarat Dara',
    'subsidiary.6.name': 'Farnam Tejarat Kara',
    'subsidiary.7.name': 'Karzin Tejarat Pargon',
    'subsidiary.8.name': 'Mania Tejarat Makan',
    'subsidiary.9.name': 'Karzin Tejarat Arshan',
    'subsidiary.10.name': 'Radical One',

    // Products Page
    'products.title': 'Products',
    'products.back': 'Back to Home',
    'products.back_to_list': 'Back to Products',
    'products.description': 'All products come with a valid Arman Hamrah Communications Aria warranty.',
    'products.availability': 'For information on price and availability, please contact the store.',
    'products.brand': 'Brand:',
    'products.category': 'Category:',
    'products.view': 'View',
    'products.noProducts': 'No products found',
    'products.not_found': 'Product not found',
    'products.intro': 'Product Introduction',
    'products.specs': 'Specifications',
    'products.specs_soon': 'Specifications for this product will be added soon.',
    'products.seo.title': 'Products | Arman Hamrah Communications Aria',
    'products.seo.description': 'View all Apple, Samsung products with Arman Hamrah warranty - iPhone, Galaxy, Apple Watch and smartwatches',

    'product.redmi_a5.description': 'Xiaomi Redmi A5 is an affordable smartphone with a large display, durable battery, and reliable performance for daily tasks.',
    'spec.value.camera_redmi_a5': 'Main Camera: 13 MP, Selfie Camera: 5 MP',
    'product.poco_m7.description': 'Poco M7, with its powerful processor, smooth display, and excellent battery life, is a great choice for gaming and heavy usage.',
    'spec.value.camera_poco_m7': 'Main Camera: 108 MP, Ultra-wide: 8 MP, Macro: 2 MP',
    'product.poco_c85.description': 'Poco C85 is a budget-friendly phone with a modern design, large display, and a massive battery that meets your daily needs.',
    'spec.value.camera_poco_c85': 'Main Camera: 50 MP, Depth Sensor: 2 MP',
    'product.poco_c75.description': 'Poco C75 offers smooth performance, a large battery, and an affordable price, making it a reliable smartphone for everyday use.',
    'spec.value.camera_poco_c75': 'Main Camera: 50 MP, Selfie Camera: 8 MP',
    'product.poco_c71.description': 'Poco C71 is an economical option with a large display and a powerful battery, perfect for watching movies and browsing the web.',
    'spec.value.camera_poco_c71': 'Main Camera: 13 MP, Depth Sensor: 2 MP',

    // Export Page
    'export.back': 'Back to Export Page',
    'export.title_main': 'Arman Export',
    'export.subtitle_main': 'Best Solution for importing goods from IRAN',
    'export.description_main': 'With over 9 years of experience, Arman Company has successfully engaged in importing and exporting basic and specialized goods in various sectors including IT, food, clothing, petroleum, metals, and construction materials.',
    'export.features.title': 'Export Services Features',
    'export.features.international.title': 'International Export',
    'export.features.international.description': 'Exporting products to Middle East, Central Asia and neighboring countries',
    'export.features.transportation.title': 'Safe Transportation',
    'export.features.transportation.description': 'Safe shipping with full insurance and online tracking at all stages',
    'export.features.original.title': 'Original Products',
    'export.features.original.description': 'Guarantee of product authenticity with valid international warranty and certificate of authenticity',
    'export.features.documentation.title': 'Complete Documentation',
    'export.features.documentation.description': 'Preparation of all customs documents, export permits, and necessary licenses',
    'export.products.title': 'Export Products',
    'export.products.view_details': 'View Details',
    'export.products.category.metals': 'Metals',
    'export.products.category.petrochemical': 'Petrochemical',
    'export.products.category.textile': 'Textile',
    'export.products.iron_steel.name': 'Iron and Steel',
    'export.products.iron_steel.description': 'The best and highest quality Iron and Steel in the IRAN market.',
    'export.products.copper_rod.name': 'Copper Rod',
    'export.products.copper_rod.description': 'The best and highest quality Copper Rod in the IRAN market.',
    'export.products.bitumen.name': 'Bitumen',
    'export.products.bitumen.description': 'The best and highest quality Bitumen in the IRAN market.',
    'export.products.oil.name': 'Oil',
    'export.products.oil.description': 'The best and highest quality industrial and base oils in the IRAN market.',
    'export.products.thread.name': 'Thread',
    'export.products.thread.description': 'The best and highest quality Thread in the IRAN market.',
    'export.services.title': 'Our Export Services',
    'export.services.packaging.title': 'Export Packaging',
    'export.services.packaging.description': 'Standard and professional packaging according to international standards',
    'export.services.clearance.title': 'Customs Clearance',
    'export.services.clearance.description': 'All customs affairs and cargo clearance at origin and destination',
    'export.services.quality.title': 'Quality Guarantee',
    'export.services.quality.description': 'Inspection and quality control of all products before shipment',
    'export.goal.title': 'Our Goal',
    'export.goal.description': 'With over 9 years of experience, Arman Company has successfully engaged in importing and exporting basic and specialized goods in various sectors including IT, food, clothing, petroleum, metals, and construction materials. The company’s purpose is to establish extensive business connections worldwide.',
    'export.countries.title': 'Target Export Countries',
    'export.countries.subtitle': 'Export to regional and neighboring countries',
    'country.uae': 'UAE',
    'country.iraq': 'Iraq',
    'country.afghanistan': 'Afghanistan',
    'country.turkmenistan': 'Turkmenistan',
    'country.azerbaijan': 'Azerbaijan',
    'country.armenia': 'Armenia',
    'country.qatar': 'Qatar',
    'country.kuwait': 'Kuwait',
    'export.contact.title': 'Contact Us',
    'export.contact.subtitle': 'For More Information Contact Our Specialist',
    'export.contact.phone': 'Phone',
    'export.contact.address': 'Address',
    'export.contact.address_value': 'Unit 304, 3rd Floor, Amir Atabak Building, Soleyman Khater St, Motahari St, Tehran, IRAN',
    'export.form.title': 'Contact Form',
    'export.form.full_name': 'Full Name',
    'export.form.full_name_placeholder': 'Your full name',
    'export.form.company_name': 'Company Name',
    'export.form.company_name_placeholder': 'Your company name',
    'export.form.message': 'Your Message',
    'export.form.message_placeholder': 'How can we help you?',
    'export.form.send': 'Send Message',
    'export.cta.title': 'Start Your Business With Us',
    'export.cta.subtitle': 'Our commercial experts are always striving to enhance convenience for your business.',
    'export.cta.button_start': 'Start Conversation',
    'export.seo.title': 'Export | Best Solution for importing goods from IRAN',
    'export.seo.description': 'Export services for products to regional countries - Iron and Steel, Copper Rod, Bitumen, Oil, and Thread',
    
    // Bitumen Page
    'bitumen.title': 'Bitumen',
    'bitumen.subtitle': 'Bitumen',
    'bitumen.category': 'Petrochemical',
    'bitumen.description': 'The best and highest quality bitumen in the Iranian market, produced in reputable refineries and in accordance with international standards.',
    'bitumen.gradesTitle': 'Available Grades',
    'bitumen.specsTitle': 'Product Specifications',
    'bitumen.feature1.title': 'Refinery Production',
    'bitumen.feature1.desc': 'Produced in reputable Iranian refineries',
    'bitumen.feature2.title': 'Guaranteed Quality',
    'bitumen.feature2.desc': 'Quality assurance with international standards',
    'bitumen.feature3.title': 'Certifications',
    'bitumen.feature3.desc': 'Compliant with ASTM standards',
    'bitumen.feature4.title': 'Complete Documentation',
    'bitumen.feature4.desc': 'All necessary documents and certificates provided',
    'bitumen.table.characteristic': 'Characteristic',
    'bitumen.table.unit': 'Unit',
    'bitimen.table.specification': 'Specification',
    'bitumen.table.testMethod': 'Test Method',
    'bitumen.spec.penetration': 'Penetration @25°C',
    'bitumen.spec.specificGravity': 'Specific Gravity @25°C',
    'bitumen.spec.softeningPoint': 'Softening Point',
    'bitumen.spec.ductility': 'Ductility @25°C',
    'bitumen.spec.lossOnHeating': 'Loss on Heating',
    'bitumen.spec.dropInPenetration': 'Drop in Penetration after Heating',
    'bitumen.spec.flashPoint': 'Flash Point',
    'bitumen.spec.solubility': 'Solubility in CS2',
    'bitumen.seo.title': 'Bitumen Export | Arman Hamrah',
    'bitumen.seo.description': 'Export of the best and highest quality Iranian bitumen in various grades (60/70, VG10, VG30) with quality assurance and international standards.',

    // Copper Rod Page
    'copper.title': 'Copper Rod',
    'copper.subtitle': 'مفتول مسی',
    'copper.description': 'Export of high-quality copper rod with 99.9% purity, produced according to global standards for the cable and wire industries.',
    'copper.featuresTitle': 'Copper Rod Features',
    'copper.feature1.title': 'High Flexibility',
    'copper.feature1.desc': 'Suitable for various industrial and construction applications',
    'copper.feature2.title': 'Excellent Electrical Conductivity',
    'copper.feature2.desc': 'Ensures minimal energy loss in power transmission',
    'copper.feature3.title': 'Global Standard',
    'copper.feature3.desc': 'Manufactured in accordance with ASTM B49 standard',
    'copper.feature4.title': 'Secure Packaging',
    'copper.feature4.desc': 'Complete protection against oxidation and damage',
    'copper.specsTitle': 'Copper Rod Specifications',
    'copper.table.characteristic': 'Characteristic',
    'copper.table.value': 'Value',
    'copper.spec.diameter': 'Diameter',
    'copper.spec.conductivity': 'Electrical Conductivity',
    'copper.spec.tensile': 'Tensile Strength',
    'copper.spec.elongation': 'Elongation',
    'copper.spec.purity': 'Purity',
    'copper.spec.standard': 'Standard',
    'copper.seo.title': 'Copper Rod Export | Arman Hamrah',
    'copper.seo.description': 'Export of 99.9% purity copper rod with high electrical conductivity, compliant with ASTM B49 standard for cable industries.',

    // Iron & Steel Page
    'iron.title': 'Iron & Steel',
    'iron.subtitle': 'آهن و فولاد',
    'iron.description': 'Supply and export of various steel products including rebar, sheets, billets, and structural profiles with the best quality from reputable Iranian factories.',
    'iron.productsTitle': 'Available Products',
    'iron.product1.name': 'Rebar',
    'iron.product1.desc': 'Deformed and plain rebar in various sizes',
    'iron.product2.name': 'Steel Sheet',
    'iron.product2.desc': 'Hot-rolled, cold-rolled, galvanized, and colored sheets',
    'iron.product3.name': 'Billet/Bloom/Slab',
    'iron.product3.desc': 'Various types of steel billets for rolling applications',
    'iron.product4.name': 'Beam',
    'iron.product4.desc': 'IPE, IPB, and H-beams in standard sizes',
    'iron.product5.name': 'Profile',
    'iron.product5.desc': 'Various types of structural and industrial box profiles',
    'iron.product6.name': 'Angle/Channel',
    'iron.product6.desc': 'Steel angles and channels in various dimensions',
    'iron.featuresTitle': 'Why Iranian Iron & Steel?',
    'iron.feature1.title': 'Top Producers',
    'iron.feature1.desc': 'Sourced from the largest and most reputable steel factories in Iran',
    'iron.feature2.title': 'Quality Control',
    'iron.feature2.desc': 'Strict quality control and inspection before loading',
    'iron.feature3.title': 'Competitive Pricing',
    'iron.feature3.desc': 'Best export prices by eliminating intermediaries',
    'iron.feature4.title': 'Standard Certification',
    'iron.feature4.desc': 'Provision of valid quality and standard certificates for all products',
    'iron.seo.title': 'Iron & Steel Export | Arman Hamrah',
    'iron.seo.description': 'Export of various steel products including rebar, sheets, billets, and profiles from top Iranian factories at the best price and quality.',

    // Oil Page
    'oil.title': 'Industrial & Base Oil',
    'oil.subtitle': 'روغن‌های صنعتی و پایه',
    'oil.description': 'Supply and export of high-quality base and industrial oils, suitable for lubricants, grease, and other industrial applications from reputable refineries.',
    'oil.productsTitle': 'Available Oil Types',
    'oil.product1.name': 'Base Oil',
    'oil.product1.desc': 'Various grades of virgin and recycled base oil',
    'oil.product2.name': 'Engine Oil',
    'oil.product2.desc': 'Gasoline and diesel engine oils with API standards',
    'oil.product3.name': 'Hydraulic Oil',
    'oil.product3.desc': 'Hydraulic oil for industrial systems and heavy machinery',
    'oil.product4.name': 'Gear Oil',
    'oil.product4.desc': 'Gear oil for industrial and automotive gearboxes',
    'oil.featuresTitle': 'Our Product Features',
    'oil.feature1.title': 'High Quality',
    'oil.feature1.desc': 'Produced with reputable additives and compliant with global standards',
    'oil.feature2.title': 'Laboratory Analysis',
    'oil.feature2.desc': 'Provision of analysis sheets and detailed technical specifications for each product',
    'oil.feature3.title': 'Refinery Sourced',
    'oil.feature3.desc': 'Directly sourced from reputable Iranian refineries',
    'oil.feature4.title': 'Flexible Packaging',
    'oil.feature4.desc': 'Available in bulk, drum, and IBC packaging',
    'oil.seo.title': 'Industrial & Base Oil Export | Arman Hamrah',
    'oil.seo.description': 'Export of various base oils, engine oil, hydraulic, and gear oil from reputable Iranian refineries with guaranteed quality.',

    // Guarantee
    'guarantee.title': '18-Month Warranty Terms',
    'guarantee.subtitle': 'Arman Hamrah Aria Communications Company',
    'guarantee.conditionsTitle': 'Warranty Conditions',
    'guarantee.exceptionsTitle': 'Acceptable Exceptions',
    
    // App Section
    'app.title': 'After-Sales Service at Your Fingertips',
    'app.description': 'Dear customers of Arman Hamrah Aria Communications, enjoy our online services by installing the My Arman app or using the web version for iOS.',
    'app.cta': 'Login to My Arman',
    
    // Representatives
    'representatives.title': 'Sales Representatives',
    'representatives.subtitle': 'Our extensive network across Iran',
    
    // Footer
    'footer.description': 'Arman Hamrah Aria Communications Warranty Company has been providing the smartest warranty in Iran with the best after-sales service experience since 2015.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',

    'export.products.category.construction':'Construction',
    'export.products.piping-equipment.name': 'Piping and Fittings',
    'export.products.piping-equipment.description': 'Single-layer, plain fluid transfer pipes.',
    'export.products.piping-equipment.details.description': 'Single-layer, plain fluid transfer pipes.',
    'export.products.piping-equipment.details.material': 'PVC',
    'export.products.piping-equipment.details.size': '100mm',
    'export.products.piping-equipment.details.length': '6 meters',
    'general.back_to_export': 'Back to Export Page',
    'general.product_details': 'Product Description',
    'general.description': 'Description',
    'general.material': 'Material',
    'general.size': 'Size',
    'general.length': 'Length',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const transformFallback = () => {
    const newTranslations: Translations = {};
    for (const key in fallbackTranslationsData.fa) {
        if (Object.prototype.hasOwnProperty.call(fallbackTranslationsData.fa, key)) {
            newTranslations[key] = {
                fa: (fallbackTranslationsData.fa as any)[key],
                en: (fallbackTranslationsData.en as any)[key] || '',
            };
        }
    }
    return newTranslations;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => 
    (typeof window !== 'undefined' && localStorage.getItem('language') as Language) || 'fa'
  );
  const [translations, setTranslations] = useState<Translations>(transformFallback()); // Use fallback data initially
  const [loading, setLoading] = useState(true);

  const direction: Direction = language === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    const fetchTranslations = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('page_content').select('content_key, content_fa, content_en');
      
      if (error || !data || data.length === 0) {
        console.warn('Could not fetch translations from DB, using fallback data.', error);
        // Fallback is already set, so we just stop loading
      } else {
        const newTranslations: Translations = data.reduce((acc, item) => {
          acc[item.content_key] = { fa: item.content_fa, en: item.content_en };
          return acc;
        }, {} as Translations);
        setTranslations(newTranslations);
      }
      setLoading(false);
    };

    fetchTranslations();
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'fa' ? 'en' : 'fa';
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = useCallback((key: string, fallback: string = ''): string => {
    const translationSet = translations[key];
    if (translationSet) {
      return translationSet[language] || translationSet.fa || fallback;
    }

    return fallback || key;
  }, [language, translations]);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t, loading }}>
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
