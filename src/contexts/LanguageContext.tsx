
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
    'loading': 'در حال بارگذاری...',
    'export.back': 'بازگشت به صفحه صادرات',
    'product.coming_soon': 'اطلاعات این محصول به زودی تکمیل می‌شود.',
    'warranty.backLink': 'بازگشت به صفحه گارانتی',

    // Brands & Countries
    'Apple': 'اپل', 'Samsung': 'سامسونگ', 'Xiaomi': 'شیائومی', 'Poco': 'پوکو', 'Nokia': 'نوکیا',
    'country.uae': 'امارات متحده عربی', 'country.iraq': 'عراق', 'country.afghanistan': 'افغانستان', 'country.turkmenistan': 'ترکمنستان', 'country.azerbaijan': 'آذربایجان', 'country.armenia': 'ارمنستان', 'country.qatar': 'قطر', 'country.kuwait': 'کویت',

    // Categories
    'category.mobile': 'موبایل',
    'category.smartwatch': 'ساعت هوشمند',
    'category.tablet': 'تبلت',
    'category.accessories': 'لوازم جانبی',
    'category.feature_phone': 'گوشی ساده',

    // Navigation
    'nav.home': 'صفحه اصلی', 'nav.warranty': 'گارانتی', 'nav.products': 'محصولات', 'nav.export': 'صادرات', 'nav.representatives': 'نمایندگان', 'nav.contact': 'تماس با ما', 'nav.myArman': 'ورود / ثبت نام', 'nav.profile': 'پروفایل', 'nav.logout': 'خروج',
    'nav.blog': 'بلاگ و آموزش',
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
    'products_page.title': 'محصولات ما',
    'products_page.description': 'در اینجا می‌توانید جدیدترین و با کیفیت‌ترین محصولات ما را مشاهده کنید.',
    'products.search_placeholder': 'جستجو بر اساس نام محصول یا برند...',

    // Export Main Page
    'export.title_main': 'صادرات آرمان', 'export.subtitle_main': 'تجارت بین‌المللی با کیفیت و اطمینان', 'export.description_main': 'ما در آرمان با تکیه بر تجربه و شبکه گسترده خود، محصولات با کیفیت ایرانی و بین‌المللی را به بازارهای جهانی عرضه می‌کنیم.',
    'export.features.title': 'ویژگی‌های خدمات صادراتی ما', 'export.features.international.title': 'شبکه بین‌المللی', 'export.features.international.description': 'دسترسی به بازارهای متنوع در سراسر جهان.', 'export.features.transportation.title': 'حمل و نقل امن', 'export.features.transportation.description': 'تضمین سلامت کالا تا رسیدن به مقصد.', 'export.features.original.title': 'تضمین اصالت کالا', 'export.features.original.description': 'ارائه مدارک و گواهی‌های معتبر بین‌المللی.', 'export.features.documentation.title': 'تسهیل امور گمرکی', 'export.features.documentation.description': 'انجام کلیه فرآیندهای گمرکی توسط تیم متخصص ما.',
    'export.products.title': 'محصولات صادراتی ما', 'export.products.category.metals': 'فلزات', 'export.products.category.petrochemical': 'پتروشیمی', 'export.products.category.textile': 'نساجی', 'export.products.category.construction': 'ساختمانی', 'export.products.category.general': 'عمومی', 'export.products.iron_steel.name': 'آهن و فولاد', 'export.products.iron_steel.description': 'انواع مقاطع فولادی و محصولات آهنی.', 'export.products.copper_rod.name': 'مفتول مس', 'export.products.copper_rod.description': 'مفتول مس با خلوص بالا برای صنایع مختلف.', 'export.products.bitumen.name': 'قیر', 'export.products.bitumen.description': 'انواع گریدهای قیر برای مصارف جاده‌ای و صنعتی.', 'export.products.oil.name': 'روغن موتور', 'export.products.oil.description': 'روغن موتورهای با کیفیت برای انواع خودروها.', 'export.products.thread.name': 'نخ', 'export.products.thread.description': 'انواع نخ‌های پنبه‌ای و مصنوعی برای نساجی.', 'export.products.piping-equipment.name': 'تجهیزات لوله‌کشی', 'export.products.piping-equipment.description': 'شیرآلات، لوله‌ها و اتصالات صنعتی.', 'export.products.petrochemical-downstream.name': 'پایین‌دستی پتروشیمی', 'export.products.petrochemical-downstream.description': 'محصولات پلیمری و شیمیایی.', 'export.products.general-industrial-supplies.name': 'تامین عمومی صنعتی', 'export.products.general-industrial-supplies.description': 'تامین قطعات، تجهیزات و مواد اولیه.', 'export.products.view_details': 'مشاهده جزئیات',
    'export.services.title': 'خدمات تکمیلی صادرات', 'export.services.packaging.title': 'بسته‌بندی استاندارد', 'export.services.packaging.description': 'بسته‌بندی محصولات طبق استانداردهای بین‌المللی.', 'export.services.clearance.title': 'ترخیص کالا از گمرک', 'export.services.clearance.description': 'انجام سریع امور ترخیص کالا در گمرکات مبدا و مقصد.', 'export.services.quality.title': 'کنترل کیفیت', 'export.services.quality.description': 'بازرسی و کنترل کیفیت محصولات قبل از ارسال.',
    'export.goal.title': 'هدف ما', 'export.goal.description': 'ایجاد پلی مطمئن بین تولیدکنندگان برتر و بازارهای جهانی برای روابط تجاری بلندمدت و سودمند.',
    'export.countries.title': 'صادرات به کشورهای', 'export.countries.subtitle': 'ما به طور فعال با کشورهای زیر در ارتباط تجاری هستیم.',
    'export.contact.title': 'تماس با واحد صادرات', 'export.contact.subtitle': 'برای مشاوره و شروع همکاری با ما تماس بگیرید.', 'export.contact.phone': 'تلفن', 'export.contact.address': 'آدرس', 'export.contact.address_value': 'تهران، خ مطهری، خ قائم مقام فراهانی، کوچه چهارم، پلاک ۱۵، واحد ۱',
    'export.form.title': 'ارسال پیام', 'export.form.full_name': 'نام کامل', 'export.form.full_name_placeholder': 'نام خود را وارد کنید', 'export.form.company_name': 'نام شرکت', 'export.form.company_name_placeholder': 'نام شرکت را وارد کنید', 'export.form.message': 'پیام شما', 'export.form.message_placeholder': 'درخواست خود را بنویسید...', 'export.form.send': 'ارسال',
    'export.cta.title': 'کسب و کار خود را جهانی کنید؟', 'export.cta.subtitle': 'تیم ما آماده است تا به شما در یافتن بهترین راه‌حل‌ها برای ورود به بازارهای جهانی کمک کند.', 'export.cta.button_start': 'شروع از طریق واتساپ',
    'export.seo.title': 'صادرات | آرمان همراه', 'export.seo.description': 'صادرات محصولات با کیفیت با خدمات جامع گمرکی و حمل و نقل توسط آرمان همراه.',

    // Iron & Steel Page
    'iron.title': 'صادرات آهن و فولاد', 'iron.subtitle': 'کیفیت برتر، استاندارد جهانی', 'iron.description': 'تامین کننده انواع محصولات فولادی از جمله میلگرد، تیرآهن، ورق و سایر مقاطع برای پروژه‌های ساختمانی و صنعتی شما.',
    'iron.productsTitle': 'محصولات فولادی ما', 'iron.product1.name': 'میلگرد', 'iron.product1.desc': 'در سایزها و استانداردهای مختلف برای افزایش مقاومت بتن.', 'iron.product2.name': 'تیرآهن', 'iron.product2.desc': 'تیرآهن‌های IPE، IPB و INP برای اسکلت‌های فلزی.', 'iron.product3.name': 'ورق فولادی', 'iron.product3.desc': 'ورق‌های سیاه، گالوانیزه و رنگی برای مصارف صنعتی.', 'iron.product4.name': 'پروفیل', 'iron.product4.desc': 'انواع پروفیل‌های باز و بسته برای ساختمان و صنعت.', 'iron.product5.name': 'نبشی و ناودانی', 'iron.product5.desc': 'برای استفاده در سازه‌ها و ماشین‌آلات صنعتی.', 'iron.product6.name': 'لوله فولادی', 'iron.product6.desc': 'لوله‌های درزدار و بدون درز برای انتقال سیالات.',
    'iron.featuresTitle': 'چرا ما؟', 'iron.feature1.title': 'تطابق با استانداردها', 'iron.feature1.desc': 'تمامی محصولات دارای گواهینامه کیفیت بین‌المللی هستند.', 'iron.feature2.title': 'قیمت رقابتی', 'iron.feature2.desc': 'ارائه بهترین قیمت‌ها به دلیل حذف واسطه‌ها.', 'iron.feature3.title': 'بسته‌بندی صادراتی', 'iron.feature3.desc': 'بسته‌بندی ایمن و استاندارد برای حمل و نقل.', 'iron.feature4.title': 'مشاوره فنی', 'iron.feature4.desc': 'تیم فنی ما آماده ارائه مشاوره تخصصی است.',
    'iron.seo.title': 'صادرات آهن و فولاد | آرمان همراه', 'iron.seo.description': 'صادرات انواع میلگرد، تیرآهن، ورق و پروفیل فولادی با بهترین کیفیت و قیمت رقابتی.',
    
    // Copper Rod Page
    'copper.title': 'صادرات مفتول مس', 'copper.subtitle': 'خلوص بالا برای صنایع پیشرفته', 'copper.description': 'ما مفتول مس با درجه خلوص ۹۹.۹۹٪ را برای استفاده در صنایع کابل‌سازی، ترانسفورماتور و الکترونیک با بهترین کیفیت عرضه می‌کنیم.',
    'copper.specsTitle': 'مشخصات فنی', 'copper.spec1.name': 'قطر مفتول', 'copper.spec1.value': '۸ تا ۲۵ میلی‌متر', 'copper.spec2.name': 'استاندارد', 'copper.spec2.value': 'ASTM B49, EN 1977', 'copper.spec3.name': 'بسته‌بندی', 'copper.spec3.value': 'کلاف‌های ۲ تا ۴ تنی', 'copper.spec4.name': 'خلوص', 'copper.spec4.value': '۹۹.۹۹٪ Cu',
    'copper.featuresTitle': 'ویژگی‌های محصول ما', 'copper.feature1.title': 'هدایت الکتریکی بالا', 'copper.feature1.desc': 'ایده‌آل برای تولید کابل‌های برق و مخابرات.', 'copper.feature2.title': 'انعطاف‌پذیری عالی', 'copper.feature2.desc': 'مناسب برای فرآیندهای کشش و تولید سیم‌های نازک.', 'copper.feature3.title': 'کیفیت سطح برتر', 'copper.feature3.desc': 'سطح صاف و بدون اکسیداسیون برای بهترین عملکرد.',
    'copper.seo.title': 'صادرات مفتول مس | آرمان همراه', 'copper.seo.description': 'صادرات مفتول مس با خلوص بالا و کیفیت برتر برای صنایع کابل و الکترونیک در سراسر جهان.',

    // Bitumen Page
    'bitumen.title': 'صادرات قیر', 'bitumen.subtitle': 'پوششی مطمئن برای زیرساخت‌ها', 'bitumen.description': 'تامین کننده انواع گریدهای قیر نفوذی و عملکردی (VG) برای پروژه‌های راه‌سازی و عایق‌کاری مطابق با استانداردهای بین‌المللی.',
    'bitumen.gradesTitle': 'گریدهای قابل ارائه', 'bitumen.grade1': '60/70', 'bitumen.grade2': '80/100', 'bitumen.grade3': '40/50', 'bitumen.grade4': 'VG-10', 'bitumen.grade5': 'VG-30',
    'bitumen.featuresTitle': 'تضمین کیفیت ما', 'bitumen.feature1.title': 'تست در آزمایشگاه معتبر', 'bitumen.feature1.desc': 'ارائه برگه آنالیز کیفیت (SGS) برای هر محموله.', 'bitumen.feature2.title': 'بسته‌بندی متنوع', 'bitumen.feature2.desc': 'عرضه به صورت فله، بشکه نو و جامبوبگ.', 'bitumen.feature3.title': 'تحویل به موقع', 'bitumen.feature3.desc': 'تضمین زمانبندی دقیق تحویل در مقاصد مختلف.',
    'bitumen.seo.title': 'صادرات قیر | آرمان همراه', 'bitumen.seo.description': 'صادرات و فروش انواع گریدهای قیر نفوذی و عملکردی با بهترین کیفیت و بسته‌بندی استاندارد.',
    
    // Piping Equipment Page
    'piping.title': 'تجهیزات خطوط لوله', 'piping.subtitle': 'اتصالات حیاتی برای صنعت شما', 'piping.description': 'تامین کننده جامع انواع شیرآلات صنعتی، لوله‌ها، فلنج‌ها و اتصالات برای صنایع نفت، گاز، پتروشیمی و آب و فاضلاب.',
    'piping.productsTitle': 'دسته بندی محصولات', 'piping.product1.name': 'شیرآلات (Valves)', 'piping.product1.desc': 'شیرهای توپی، کشویی، پروانه‌ای و کنترلی.', 'piping.product2.name': 'لوله‌ها (Pipes)', 'piping.product2.desc': 'لوله‌های فولادی، استنلس استیل و پلیمری.', 'piping.product3.name': 'اتصالات (Fittings)', 'piping.product3.desc': 'زانویی، سه‌راهی، تبدیل و کپ.', 'piping.product4.name': 'فلنج‌ها (Flanges)', 'piping.product4.desc': 'فلنج‌های گلودار، اسلیپ‌آن و کور.',
    'piping.featuresTitle': 'مزایای تامین از ما', 'piping.feature1.title': 'برندهای معتبر', 'piping.feature1.desc': 'تامین تجهیزات از تولیدکنندگان برتر جهانی و داخلی.', 'piping.feature2.title': 'گواهی اصالت', 'piping.feature2.desc': 'ارائه گواهی‌نامه محصول (Certificate) همراه با کالا.', 'piping.feature3.title': 'پشتیبانی فنی', 'piping.feature3.desc': 'مشاوره در انتخاب و نصب تجهیزات متناسب با نیاز شما.',
    'piping.seo.title': 'صادرات تجهیزات خطوط لوله | آرمان همراه', 'piping.seo.description': 'تامین و صادرات انواع شیرآلات، لوله‌ها و اتصالات صنعتی برای پروژه‌های نفت، گاز و پتروشیمی.',

    // Warranty Page - Conditions
    'warranty.conditions.title': 'شرایط گارانتی 18 ماه',
    'warranty.conditions.item1': 'کلیه دستگاه های گارانتی شده توسط شرکت آرمان همراه ارتباطات آریا دارای 18 ماه گارانتی از لحظه فروش به مصرف کننده می باشد. همچنین تا 3 سال ضمانت تامین قطعه و پذیرش دستگاه و رفع ایراد مذکور توسط مشتری را دارد.<br/>(تبصره ۱ : مبنای محاسبه زمان شروع گارانتی برای کالاهای تلفن همراه و تبلت و اکسسوری های هوشمند از زمان فعالسازی (فاکتور خرید) و حداکثر ۶ماه پس از زمان اظهار واردات در سامانه جامع تجارت خواهد بود.)',
    'warranty.conditions.item2': 'مدت اعتبار گارانتی باتری های داخلی 18 ماه و باطری های جداشدنی 6 ماه می باشد.',
    'warranty.conditions.item3': 'لوازم جانبی شامل هندزفری و کابل شارژ شامل گارانتی نمی باشد لذا در حین خرید از سالم بودن آنها اطمینان حاصل نمایید.',
    'warranty.conditions.item4': 'در صورتیکه خریدار پس از گذشت 7 روز از زمان فعالسازی ایرادی در دستگاه خود مشاهده نماید که سخت افزاری بوده ،دستگاه شامل تعویض خواهد بود و این امر در صورت داشتن ایراد فنی از سوی سازنده تا 1 ماه نیز میباشد.',
    'warranty.conditions.item5': 'هر گونه آسیب فیزیکی ،ضرب خوردگی و شکستگی،آبخوردگی نوسانات برقی و سوختگی شامل گارانتی نمی باشد.',
    'warranty.conditions.item6': 'چنانچه دستگاه در مراکز غیر مجاز تعمیر گردد فاقد گارانتی می باشد.',
    'warranty.conditions.item7': 'عملیات Root کردن و نصب رام های غیر رسمی،هم چنین unlock Boot loader به دلیل اینکه ضریب ایمنی دستگاه را کاهش داده فاقد گارانتی و شامل هزینه می باشد.',
    'warranty.conditions.item8': 'این شرکت در قبال فراموش کردن mi account و Google account مشتری هیچ گونه مسئولیتی را نمی پذیرد و چنانچه موارد فوق با صرف credit قابل حل شدن باشند کلیه هزینه ها بر عهده ی خود مشتری می باشد.',
    'warranty.conditions.item9': 'این شرکت در قبال حفظ و نگهداری اطلاعات شخصی مشتری یا بازیابی آنها هیچگونه مسئولیتی ندارد چنانچه اطاعات داخل دستگاه برای مشتری مهم می باشد لطفا پیش از مراجعه به مرکز خدمات حتما از اطلاعات بک آپ گرفته شود.',
    'warranty.conditions.item10': 'تغییر شماره سریال دستگاه و یا مخدوش نمودن آن توسط نرم افزارهای غیر اصلی شامل خدمات گارانتی نمی باشد.',
    'warranty.conditions.item11': 'در ارتباط با ایرادات عمده ی کارخانه ای که به صورت فراخوان از سمت شرکت سازنده اعلام گردد این شرکت نیز طبق مقررات اعلامی وارد عمل خواهد شد.(چنانچه ایراد ذکر شده، از سوی شرکت سازنده نرم افزاری اعلام شده باشد کاربران میبایست تا زمان عرضه نسخه نرم افزاری جدید که در آن ایراد مذکور رفع گردیده باشد، منتظر بمانند.)',
    'warranty.exceptions.title': 'موارد قابل اغماض در ارائه خدمات...',
    'warranty.exceptions.item1': 'در مناطق مرطوب وگرم مثل شهرهای شمالی و جنوبی کشور روئیت آبخوردگی از 10% الی 15% بلا مانع بوده و شامل گارانتی می باشد.',
    'warranty.exceptions.item2': 'در صورت باز نمودن دستگاه در صورتیکه تکنسین متوجه شود که دستگاه قبلا در جایی غیر از مراکز اصلی خدمات آرمان باز شده اما دستکاری روی قطعات و برد نداشته باشد دستگاه شامل گارانتی می باشد.',
    'warranty.exceptions.item3': 'در صورتیکه دستگاهی در جایی غیر از نمایندگی های مجاز آرمان نرم افزار خورده باشد چنانچه به Rom دستگاه آسیب نرسیده باشد با گارانتی رفع ایراد نرم افزاری می گردد اما چنانچه ورژن پایین تر خورده باشد و Boot دستگاه آسیب دیده باشد غیر گارانتی می باشد.',
    'warranty.exceptions.item4': 'قطعات تعویض شده در این مرکز که بر روی دستگاه های غیر گارانتی قرار می گیرد تا سه ماه گارانتی دارند چنانچه تغییر وضعیت ظاهری نداده باشند یا دچار آبخوردگی و شکستگی نباشند.',
    'warranty.exceptions.item5': 'در صورتیکه برد جانبی دستگاهی در اثر استفاده نا مناسب آبخوردگی و یا شکستگی داشته باشد شامل هزینه می باشد اما گارانتی دستگاه ابطال نمی گردد.',
    'warranty.exceptions.item6': 'چنانچه جهت ایرادی مشابه مشتری 3 بار مراجعه به مرکز خدمات پس از فروش را داشته باشد و ایراد هم چنان پس از مدتی مشاهده گردد،جهت جلب رضایت و رفاه حال مشتری دستگاه مذکور تعویض می گردد.',
    'warranty.exceptions.item7': 'چنانچه دستگاهی شامل تعویض گردد و در مدت اعلامی کالا تامین نگردیده باشد به مشتری اعلام می گردد در صورت تمایل دستگاه دیگری انتخاب نموده یا هزینه ایشان به حسابشان واریز گردد.در این دستورالعمل طبق مصوبه به ازای هر 1 ماه کارکرد دستگاه 4% از مبلغ فاکتور به علت استهلاک محصول کسر میگردد.<br/>تبصره: در صورتیکه دستگاه پیشنهادی از سمت شرکت ارزشی بالاتر از دستگاه خود مشتری داشته و مشتری رضایت به پرداخت مابه التفاوت نداشته باشد ، مبلغ فاکتور به مشتری عودت خواهد شد.',
    'warranty.exceptions.item8': 'در هنگام پذیرش، دستگاه میبایست در مدت زمان اعلامی جهت بررسی و رفع ایراد در شرکت بماند،چنانچه مصرف کننده در طی این مدت دستگاه جایگزین نداشتند و نیاز مبرم به دستگاه داشته باشند می توانند با تکمیل کردن فرم و ارائه کارت شناسایی دستگاه جایگزین به صورت امانی از شرکت دریافت نمایند.',
    'warranty.exceptions.item9': 'مصرف کننده ملزم است در زمان تحویل دستگاه امانی از بخش پذیرش ظاهر دستگاه را کاملا چک نموده و صحیح و سالم تحویل گیرد، فلذا هنگام باز گرداندن محصول به شرکت موظف است با ظاهر اولیه که تحویل گرفته است دستگاه را عودت دهند.',
    'warranty.exceptions.item10': 'چنانچه در زمان مصرف از دستگاه امانی دستگاه از لحاظ ظاهری و یا فنی دچار مشکل گردیده باشد شرکت میتواند ضرر و زیان وارده را از مصرف کننده اخذ نماید و تا زمانیکه دستگاه امانی را عودت نداده انددستگاهشان نزد شرکت به امانت می ماند.',
    'warranty.exceptions.item11': 'چنانچه تعمیر دستگاه کاربر بیشتر از مدت زمان اعلام شده به وی باشد به ازای هر یک هفته تاخیر یک ماه به گارانتی محصول اضافه میگردد (توجه داشته باشید این بند شامل موارد خاص از قبیل تعطیلی رسمی اعلام شده از طرف دولت و یا کم شدن ساعت کاری و ایام نوروز نمی باشد.)',
    'warranty.exceptions.item12': 'در زمان مراجعه به مرکز خدمات آرمان همراه، همراه داشتن فاکتور رسمی مهمور و جعبه دستگاه الزامی می باشد.',

    // Representatives Page
    'representatives.hero.title': 'نمایندگان فروش',
    'representatives.hero.description': 'شبکه گسترده نمایندگان آرمان همراه در سراسر ایران آماده خدمت‌رسانی به شما عزیزان است.',
    'representatives.list.title': 'نمایندگان ما در سراسر کشور',
    'representatives.add_button': 'افزودن نماینده جدید',
    'representatives.loading': 'در حال بارگذاری نمایندگان...',
    'representatives.benefits.title': 'مزایای همکاری با آرمان همراه',
    'representatives.benefits.1.title': 'محصولات اورجینال',
    'representatives.benefits.1.description': 'دسترسی به محصولات اورجینال برندهای معتبر با گارانتی رسمی آرمان همراه',
    'representatives.benefits.2.title': 'قیمت‌های رقابتی',
    'representatives.benefits.2.description': 'ارائه قیمت‌های ویژه و تخفیف‌های اختصاصی برای همکاران و نمایندگان',
    'representatives.benefits.3.title': 'پشتیبانی اختصاصی',
    'representatives.benefits.3.description': 'تیم پشتیبانی ویژه همکاران برای پاسخگویی سریع به سوالات و نیازها',
    'representatives.seo.title': 'نمایندگان | آرمان همراه',
    'representatives.seo.description': 'لیست نمایندگان فروش و خدمات پس از فروش آرمان همراه در سراسر ایران.',

    // App Section
    'app.title': 'خدمات پس از فروش در دستان شما',
    'app.description': 'مشتریان گرامی شرکت آرمان همراه ارتباطات آریا، با نصب اپلیکیشن "مای آرمان" یا استفاده از نسخه وب برای iOS، از خدمات آنلاین ما بهره‌مند شوید.',
    'app.cta': 'ورود به مای آرمان',
    
    // Footer
    'footer.description': 'شرکت گارانتی آرمان همراه ارتباطات آریا از سال ۱۳۹۴ تا کنون با بهترین تجربه در ارائه خدمات پس از فروش به مشتریان، هوشمندترین گارانتی در ایران را ارائه می‌دهد.',
    'footer.quickLinks': 'لینک‌های سریع',
    'footer.contact': 'تماس با ما',
    'footer.followUs': 'ما را دنبال کنید',
    'footer.rights': 'تمامی حقوق محفوظ است',
    
    // Theme
    'theme.light': 'روشن',
    'theme.dark': 'تاریک',
  },
  en: {
    // General
    'all': 'All',
    'loading': 'Loading...',
    'export.back': 'Back to Export Page',
    'product.coming_soon': 'Product information will be available soon.',
    'warranty.backLink': 'Back to Warranty Page',

    // Brands & Countries
    'Apple': 'Apple', 'Samsung': 'Samsung', 'Xiaomi': 'Xiaomi', 'Poco': 'Poco', 'Nokia': 'Nokia',
    'country.uae': 'UAE', 'country.iraq': 'Iraq', 'country.afghanistan': 'Afghanistan', 'country.turkmenistan': 'Turkmenistan', 'country.azerbaijan': 'Azerbaijan', 'country.armenia': 'Armenia', 'country.qatar': 'Qatar', 'country.kuwait': 'Kuwait',

    // Categories
    'category.mobile': 'Mobile',
    'category.smartwatch': 'Smartwatch',
    'category.tablet': 'Tablet',
    'category.accessories': 'Accessories',
    'category.feature_phone': 'Feature Phone',

    // Navigation
    'nav.home': 'Home', 'nav.warranty': 'Warranty', 'nav.products': 'Products', 'nav.export': 'Export', 'nav.representatives': 'Reps', 'nav.contact': 'Contact', 'nav.myArman': 'Login / Sign Up', 'nav.profile': 'Profile', 'nav.logout': 'Logout',
    'nav.blog': 'Blog & Training',
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
    'services.export': 'Export',
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
    'products_page.title': 'Our Products',
    'products_page.description': 'Here you can see our latest and highest quality products.',
    'products.search_placeholder': 'Search by product name or brand...',

    // Export Main Page
    'export.title_main': 'Arman Export', 'export.subtitle_main': 'International Trade with Quality and Confidence', 'export.description_main': 'At Arman, relying on our experience and extensive network, we supply quality Iranian and international products to global markets.',
    'export.features.title': 'Features of Our Export Services', 'export.features.international.title': 'International Network', 'export.features.international.description': 'Access to diverse markets worldwide.', 'export.features.transportation.title': 'Secure Transportation', 'export.features.transportation.description': 'Ensuring the safety of goods until destination.', 'export.features.original.title': 'Authenticity Guarantee', 'export.features.original.description': 'Providing valid international documents.', 'export.features.documentation.title': 'Customs Facilitation', 'export.features.documentation.description': 'Handling all customs procedures by our expert team.',
    'export.products.title': 'Our Export Products', 'export.products.category.metals': 'Metals', 'export.products.category.petrochemical': 'Petrochemical', 'export.products.category.textile': 'Textile', 'export.products.category.construction': 'Construction', 'export.products.category.general': 'General', 'export.products.iron_steel.name': 'Iron & Steel', 'export.products.iron_steel.description': 'Various steel sections and iron products.', 'export.products.copper_rod.name': 'Copper Rod', 'export.products.copper_rod.description': 'High-purity copper rod for various industries.', 'export.products.bitumen.name': 'Bitumen', 'export.products.bitumen.description': 'Various grades of bitumen for road and industrial uses.', 'export.products.oil.name': 'Engine Oil', 'export.products.oil.description': 'High-quality engine oils for all types of vehicles.', 'export.products.thread.name': 'Thread', 'export.products.thread.description': 'Cotton and synthetic threads for the textile industry.', 'export.products.piping-equipment.name': 'Piping Equipment', 'export.products.piping-equipment.description': 'Industrial valves, pipes, and fittings.', 'export.products.petrochemical-downstream.name': 'Petrochemical Downstream', 'export.products.petrochemical-downstream.description': 'Polymer and chemical products.', 'export.products.general-industrial-supplies.name': 'General Industrial Supplies', 'export.products.general-industrial-supplies.description': 'Supplying parts, equipment, and raw materials.', 'export.products.view_details': 'View Details',
    'export.services.title': 'Complementary Export Services', 'export.services.packaging.title': 'Standard Packaging', 'export.services.packaging.description': 'Packaging products according to international standards.', 'export.services.clearance.title': 'Customs Clearance', 'export.services.clearance.description': 'Fast handling of customs clearance at origin and destination.', 'export.services.quality.title': 'Quality Control', 'export.services.quality.description': 'Inspecting product quality before shipment.',
    'export.goal.title': 'Our Goal', 'export.goal.description': 'To create a reliable bridge between top producers and global markets for long-term, mutually beneficial business relationships.',
    'export.countries.title': 'Exporting to Countries', 'export.countries.subtitle': 'We are actively engaged in trade with the following countries.',
    'export.contact.title': 'Contact Export Dept.', 'export.contact.subtitle': 'Contact us for consultation and to start a partnership.', 'export.contact.phone': 'Phone', 'export.contact.address': 'Address', 'export.contact.address_value': 'Unit 1, No. 15, 4th Alley, Qaem Maqam Farahani St, Motahari St, Tehran',
    'export.form.title': 'Send a Message', 'export.form.full_name': 'Full Name', 'export.form.full_name_placeholder': 'Enter your name', 'export.form.company_name': 'Company Name', 'export.form.company_name_placeholder': 'Enter company name', 'export.form.message': 'Message', 'export.form.message_placeholder': 'Write your request...', 'export.form.send': 'Send',
    'export.cta.title': 'Ready to Take Your Business Global?', 'export.cta.subtitle': 'Our export team is ready to help you find the best solutions for entering global markets.', 'export.cta.button_start': 'Start via WhatsApp',
    'export.seo.title': 'Export | Arman Hamrah', 'export.seo.description': 'Export of quality products with comprehensive customs and transportation services by Arman Hamrah.',

    // Iron & Steel Page
    'iron.title': 'Iron & Steel Export', 'iron.subtitle': 'Superior Quality, Global Standards', 'iron.description': 'Supplier of various steel products including rebar, beams, sheets, and other sections for your construction and industrial projects.',
    'iron.productsTitle': 'Our Steel Products', 'iron.product1.name': 'Rebar', 'iron.product1.desc': 'In various sizes and standards to increase concrete strength.', 'iron.product2.name': 'Beam', 'iron.product2.desc': 'IPE, IPB, and INP beams for steel structures.', 'iron.product3.name': 'Steel Sheet', 'iron.product3.desc': 'Black, galvanized, and colored sheets for industrial use.', 'iron.product4.name': 'Profile', 'iron.product4.desc': 'Open and closed profiles for construction and industry.', 'iron.product5.name': 'Angle & Channel', 'iron.product5.desc': 'For use in structures and industrial machinery.', 'iron.product6.name': 'Steel Pipe', 'iron.product6.desc': 'Seamed and seamless pipes for fluid transfer.',
    'iron.featuresTitle': 'Why Us?', 'iron.feature1.title': 'Standard Compliance', 'iron.feature1.desc': 'All products have international quality certification.', 'iron.feature2.title': 'Competitive Pricing', 'iron.feature2.desc': 'Offering the best prices by eliminating intermediaries.', 'iron.feature3.title': 'Export Packaging', 'iron.feature3.desc': 'Safe and standard packaging for transport.', 'iron.feature4.title': 'Technical Consultation', 'iron.feature4.desc': 'Our technical team is ready to provide expert advice.',
    'iron.seo.title': 'Iron & Steel Export | Arman Hamrah', 'iron.seo.description': 'Export of rebar, beams, sheets, and steel profiles with the best quality and competitive prices.',

    // Copper Rod Page
    'copper.title': 'Copper Rod Export', 'copper.subtitle': 'High Purity for Advanced Industries', 'copper.description': 'We supply high-purity 99.99% copper rod for use in the cable, transformer, and electronics industries with the best quality.',
    'copper.specsTitle': 'Technical Specifications', 'copper.spec1.name': 'Rod Diameter', 'copper.spec1.value': '8mm to 25mm', 'copper.spec2.name': 'Standard', 'copper.spec2.value': 'ASTM B49, EN 1977', 'copper.spec3.name': 'Packaging', 'copper.spec3.value': 'Coils of 2 to 4 tons', 'copper.spec4.name': 'Purity', 'copper.spec4.value': '99.99% Cu',
    'copper.featuresTitle': 'Our Product Features', 'copper.feature1.title': 'High Electrical Conductivity', 'copper.feature1.desc': 'Ideal for producing power and telecommunication cables.', 'copper.feature2.title': 'Excellent Flexibility', 'copper.feature2.desc': 'Suitable for drawing processes and producing thin wires.', 'copper.feature3.title': 'Superior Surface Quality', 'copper.feature3.desc': 'Smooth and oxidation-free surface for best performance.',
    'copper.seo.title': 'Copper Rod Export | Arman Hamrah', 'copper.seo.description': 'Export of high-purity, top-quality copper rod for the cable and electronics industries worldwide.',

    // Bitumen Page
    'bitumen.title': 'Bitumen Export', 'bitumen.subtitle': 'A Reliable Coating for Infrastructures', 'bitumen.description': 'Supplier of various penetration and viscosity grade (VG) bitumen for road construction and insulation projects, compliant with international standards.',
    'bitumen.gradesTitle': 'Available Grades', 'bitumen.grade1': '60/70', 'bitumen.grade2': '80/100', 'bitumen.grade3': '40/50', 'bitumen.grade4': 'VG-10', 'bitumen.grade5': 'VG-30',
    'bitumen.featuresTitle': 'Our Quality Assurance', 'bitumen.feature1.title': 'Certified Lab Testing', 'bitumen.feature1.desc': 'Providing a quality analysis report (SGS) for each shipment.', 'bitumen.feature2.title': 'Various Packaging', 'bitumen.feature2.desc': 'Available in bulk, new drums, and jumbo bags.', 'bitumen.feature3.title': 'Timely Delivery', 'bitumen.feature3.desc': 'Guaranteeing precise delivery schedules to various destinations.',
    'bitumen.seo.title': 'Bitumen Export | Arman Hamrah', 'bitumen.seo.description': 'Export and sale of various penetration and viscosity grades of bitumen with the best quality and standard packaging.',
    
    // Piping Equipment Page
    'piping.title': 'Piping Equipment', 'piping.subtitle': 'Vital Connections for Your Industry', 'piping.description': 'Comprehensive supplier of industrial valves, pipes, flanges, and fittings for the oil, gas, petrochemical, and water/wastewater industries.',
    'piping.productsTitle': 'Product Categories', 'piping.product1.name': 'Valves', 'piping.product1.desc': 'Ball, gate, butterfly, and control valves.', 'piping.product2.name': 'Pipes', 'piping.product2.desc': 'Carbon steel, stainless steel, and polymer pipes.', 'piping.product3.name': 'Fittings', 'piping.product3.desc': 'Elbows, tees, reducers, and caps.', 'piping.product4.name': 'Flanges', 'piping.product4.desc': 'Weld neck, slip-on, and blind flanges.',
    'piping.featuresTitle': 'Advantages of Sourcing From Us', 'piping.feature1.title': 'Reputable Brands', 'piping.feature1.desc': 'Sourcing equipment from top global and local manufacturers.', 'piping.feature2.title': 'Certificate of Authenticity', 'piping.feature2.desc': 'Providing a product certificate with the goods.', 'piping.feature3.title': 'Technical Support', 'piping.feature3.desc': 'Consultation on selecting and installing equipment tailored to your needs.',
    'piping.seo.title': 'Piping Equipment Export | Arman Hamrah', 'piping.seo.description': 'Sourcing and exporting industrial valves, pipes, and fittings for oil, gas, and petrochemical projects.',

    // Warranty Page - Conditions
    'warranty.conditions.title': '18-Month Warranty Conditions',
    'warranty.conditions.item1': 'All devices guaranteed by Arman Hamrah Ertebatat Aria Company have an 18-month warranty from the moment of sale to the consumer. It also has a 3-year warranty for supplying parts, accepting the device, and resolving the said issue by the customer.<br/>(Note 1: The basis for calculating the start of the warranty period for mobile phones, tablets, and smart accessories is from the time of activation (purchase invoice) and a maximum of 6 months after the import declaration in the comprehensive trade system.)',
    'warranty.conditions.item2': 'The warranty period for internal batteries is 18 months and for removable batteries is 6 months.',
    'warranty.conditions.item3': 'Accessories including headphones and charging cables are not covered by the warranty, so please ensure they are in working order at the time of purchase.',
    'warranty.conditions.item4': 'If the buyer observes a hardware defect in their device after 7 days from activation, the device will be eligible for replacement. This also applies for up to 1 month if there is a technical defect from the manufacturer.',
    'warranty.conditions.item5': 'Any physical damage, impact and breakage, water damage, electrical fluctuations, and burns are not covered by the warranty.',
    'warranty.conditions.item6': 'If the device is repaired at unauthorized centers, the warranty will be void.',
    'warranty.conditions.item7': 'Rooting operations and installing unofficial ROMs, as well as unlocking the Bootloader, will void the warranty and incur costs because they reduce the device\'s security coefficient.',
    'warranty.conditions.item8': 'The company accepts no responsibility for forgotten mi account and Google account. If the above issues can be resolved by spending credit, all costs will be borne by the customer.',
    'warranty.conditions.item9': 'The company has no responsibility for maintaining or recovering the customer\'s personal information. If the data on the device is important to the customer, please be sure to back up the data before referring to the service center.',
    'warranty.conditions.item10': 'Changing the device\'s serial number or tampering with it using unofficial software is not covered by the warranty services.',
    'warranty.conditions.item11': 'Regarding major factory defects announced as a recall by the manufacturer, this company will also act according to the declared regulations. (If the mentioned defect is announced by the manufacturer as a software issue, users must wait until the release of a new software version in which the said defect is resolved.)',
    'warranty.exceptions.title': 'Tolerable Cases in Service Provision...',
    'warranty.exceptions.item1': 'In humid and hot areas such as the northern and southern cities of the country, seeing 10% to 15% water damage is permissible and is covered by the warranty.',
    'warranty.exceptions.item2': 'If the device is opened and the technician finds that the device was previously opened at a location other than Arman\'s main service centers but there was no tampering with the parts and board, the device is covered by the warranty.',
    'warranty.exceptions.item3': 'If a device has had software installed at a place other than Arman\'s authorized dealers, if the device\'s ROM is not damaged, the software issue will be fixed under warranty. However, if a lower version has been installed and the device\'s Boot is damaged, it is not covered by the warranty.',
    'warranty.exceptions.item4': 'Replacement parts installed at this center on out-of-warranty devices have a three-month warranty, provided they have not undergone any changes in appearance or suffered from water damage or breakage.',
    'warranty.exceptions.item5': 'If a device\'s side board is damaged due to improper use, water damage, or breakage, it will be subject to a fee, but the device\'s warranty will not be voided.',
    'warranty.exceptions.item6': 'If a customer has visited the after-sales service center 3 times for a similar issue and the issue still persists after some time, the said device will be replaced to ensure customer satisfaction and well-being.',
    'warranty.exceptions.item7': 'If a device is eligible for replacement and the product is not supplied within the announced period, the customer will be notified and given the option to choose another device or have their money refunded. In this directive, according to the resolution, for every 1 month of device use, 4% of the invoice amount is deducted due to product depreciation.<br/>Addendum: If the device suggested by the company has a higher value than the customer\'s own device and the customer is not willing to pay the difference, the invoice amount will be refunded to the customer.',
    'warranty.exceptions.item8': 'Upon admission, the device must remain at the company for the announced period for inspection and repair. If the consumer does not have a replacement device during this period and has an urgent need for a device, they can receive a replacement device on loan from the company by completing a form and providing an identification card.',
    'warranty.exceptions.item9': 'The consumer is obliged to thoroughly check the appearance of the loaner device at the reception and receive it in good and sound condition. Therefore, when returning the product to the company, they are obliged to return it in the initial condition they received it.',
    'warranty.exceptions.item10': 'If the loaner device is damaged in appearance or technically during use, the company can claim the damages from the consumer, and their device will be held by the company as a deposit until they return the loaner device.',
    'warranty.exceptions.item11': 'If the user\'s device repair takes longer than the time announced to them, for each week of delay, one month will be added to the product\'s warranty (note that this clause does not include special cases such as official holidays announced by the government, reduced working hours, or the Nowruz holidays).',
    'warranty.exceptions.item12': 'When visiting the Arman Hamrah service center, it is mandatory to bring the official stamped invoice and the device box.',

    // Representatives Page
    'representatives.hero.title': 'Sales Representatives',
    'representatives.hero.description': 'Our extensive network of Arman Hamrah representatives throughout Iran is ready to serve you.',
    'representatives.list.title': 'Our Representatives Across the Country',
    'representatives.add_button': 'Add New Representative',
    'representatives.loading': 'Loading representatives...',
    'representatives.benefits.title': 'Benefits of Cooperating with Arman Hamrah',
    'representatives.benefits.1.title': 'Original Products',
    'representatives.benefits.1.description': 'Access to original products from reputable brands with the official Arman Hamrah warranty.',
    'representatives.benefits.2.title': 'Competitive Prices',
    'representatives.benefits.2.description': 'Offering special prices and exclusive discounts for partners and representatives.',
    'representatives.benefits.3.title': 'Dedicated Support',
    'representatives.benefits.3.description': 'A special support team for partners to quickly respond to questions and needs.',
    'representatives.seo.title': 'Representatives | Arman Hamrah',
    'representatives.seo.description': 'List of sales and after-sales service representatives of Arman Hamrah throughout Iran.',

    // App Section
    'app.title': 'After-Sales Service at Your Fingertips',
    'app.description': 'Dear customers of Arman Hamrah Aria Communications, enjoy our online services by installing the My Arman app or using the web version for iOS.',
    'app.cta': 'Login to My Arman',
    
    // Footer
    'footer.description': 'Arman Hamrah Aria Communications Warranty Company has been providing the smartest warranty in Iran with the best after-sales service experience since 2015.',
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
  const [translations, setTranslations] = useState<Translations>(transformFallback());
  const [loading, setLoading] = useState(true);

  const direction: Direction = language === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    const fetchTranslations = async () => {
      setLoading(true);
      const baseTranslations = transformFallback();

      const { data, error } = await supabase.from('page_content').select('content_key, content_fa, content_en');
      
      if (error || !data || data.length === 0) {
        console.warn('Could not fetch translations from DB, using only fallback data.', error);
        setTranslations(baseTranslations);
      } else {
        const dbTranslations: Translations = data.reduce((acc, item) => {
          acc[item.content_key] = { fa: item.content_fa, en: item.content_en };
          return acc;
        }, {} as Translations);
        setTranslations({ ...baseTranslations, ...dbTranslations });
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
    if (!key) return fallback;
    const keyLower = key.toLowerCase();
    const translationSet = translations[key] || translations[keyLower];

    if (translationSet) {
      return translationSet[language] || translationSet.fa || fallback;
    }
    
    const fallbackSet = fallbackTranslationsData.fa[key as keyof typeof fallbackTranslationsData.fa] ? 
        { fa: fallbackTranslationsData.fa[key as keyof typeof fallbackTranslationsData.fa], en: fallbackTranslationsData.en[key as keyof typeof fallbackTranslationsData.en] } : null;

    if (fallbackSet) {
        return fallbackSet[language] || fallbackSet.fa || fallback;
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
