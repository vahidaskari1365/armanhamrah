
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
    'warranty.exceptions.title': 'موارد قابل اغماض در ارائه خدمات',
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

    // Warranty Page - Accessories
    'warranty.accessories.title': 'شرایط گارانتی لوازم جانبی و اکسسوری',
    'warranty.accessories.main': '(اسپیکر، ساعت های هوشمند، هدست،و …)<br/><br/>کلیه ساعتها و گجت های گارانتی شده توسط شرکت آرمان همراه دارای 18 ماه گارانتی از لحظه فروش به مصرف کننده می باشد.<br/>(تبصره ۱ : مبنای محاسبه زمان شروع گارانتی برای کالاهای تلفن همراه و تبلت و اکسسوری های هوشمند از زمان فعالسازی (فاکتور خرید) و حداکثر ۶ماه پس از زمان اظهار واردات در سامانه جامع تجارت خواهد بود.)',
    'warranty.accessories.item1': 'تعویض محصولات در صورت داشتن عیوب ذاتی از سوی شرکت سازنده وبه مدت 1 ماه می باشد توجه فرمائید که این بند شامل عیوب ظاهری و یا رنگ و مدل نمی باشند لذا در حین خرید محصول خود را از لحاظ سلامت فیزیکی و ظاهری در حضور فروشنده تست نمایید چنانچه محصولی دارای رنگ رفتگی ،فرورفتگی،شکستگی و یا ایرادات ظاهری باشد شامل گارانتی تعویض نمی گردد.',
    'warranty.accessories.item2': 'صدمات ناشی از آبخوردگی،ضربه خوردگی،رنگ رفتگی،دفرمه شدن محصول،باز شدن محصول در مراکز غیر مجاز و خارج از مجموعه و نوسانات برقی و سوختگی شامل گارانتی نمی باشد لذا در حفظ و نگهداری محصول خود نهایت دقت را بفرمایید.',
    'warranty.accessories.item3': 'شرکت هیچ گونه مسئولیتی در قبال حفظ برنامه ها و اطلاعات شخصی کاربر ندارد.',
    'warranty.accessories.item4': 'محصولاتی که با مشکلاتی از قبیل آبخوردگی ،ضربه خوردگی،شکستگی و … به مرکز خدمات مراجعه می نمایند بعضا امکان حفظ شرایط قبلی آنها وجود ندارد که این مطالب توسط بخش پذیرش و یا تکنسین مربوطه پس از بررسی فنی به اطلاع مشتری رسانده می شود.',
    'warranty.accessories.item5': 'در صورت بروز خرابی به صورت فراگیر بر روی هر محصولی،اطلاع رسانی رسمی بر روی سایت آرمان همراه جهت راهنمایی نحوه رفع ایراد و یا فراخوان مراجعه به مرکز خدمات جهت دریافت سرویس و در صورت لزوم جمع آوری محصول و تعویض آن صورت خواهد پذیرفت.',
    'warranty.accessories.item6': 'چنانچه محصول نیاز به تعویض داشته باشد و مدل محصول موجود نباشد با اخذ ما به التفاوت و مبلغ فرانشیز مصوب بابت فرسودگی محصول معیوب،اقدام به تعویض خواهد شد. به ازای هر ماه کارکرد دستگاه 4% ارزش کالا کسر خواهد شد که مبنای محاسبه ی کالا متوسط قیمت فروش 3 ماهه گذشته همان مدل کالا می باشد.(در صورت عدم وجود کالا ملاک آخرین فاکتور فروش شرکت می باشد).',
    'warranty.accessories.item7': 'در صورت توقف بیش از 15 روز کاری از زمان دریافت کالا تا زمان تحویل آن ( بدون در نظر گرفتن زمان ارسال و دریافت از طریق پست یا مبادی مشابه ) به ازای هر 1 هفته 1 ماه به مدت زمان گارانتی اضافه می گردد.',
    'warranty.accessories.item8': 'شارژر و کابل شارژر مربوط به محصول در صورت بررسی اصل بودن ، به مدت 1 ماه دارای گارانتی می باشند لازم به ذکر است که قطع شدن،آسیب دیدگی،شکستگی سری شارژر شامل این بند نمی باشد و فاقد گارانتی می باشند.',
    'warranty.accessories.item9': 'در زمان مراجعه به مرکز خدمات آرمان همراه، همراه داشتن فاکتور رسمی مهمور و جعبه دستگاه الزامی می باشد.',

    // Warranty Page - Repairs
    'warranty.repairs.title': 'شرایط عمومی تعمیرات دستگاه های فاقد گارانتی',
    'warranty.repairs.main': '',
    'warranty.repairs.item1': 'دستگاه های آب خورده.ضربه خورده به علت تغییر شکل ظاهری و وضعیت داخلی ,ممکن است پس از بازکردن به حالت اولیه در زمان پذیرش باز نگردد.',
    'warranty.repairs.item2': 'دستگاهی که فاقد گارانتی می باشد چنانچه با یک ایراد مشخص به مرکز مراجعه نماید.این مرکز فقط در قبال ایراد ذکرشده مسئولیت می پذیرد بدین علت که ممکن است دستگاه آب خورده یا ضربه خورده به علت آسیبی که به آن وارد شده بعد از گذشت مدتی سایر عیوب خود را نمایان سازد.',
    'warranty.repairs.item3': 'قطعه ی تعویضی در این مرکز به مدت 1 ماه پس از تحویل خدمات گارانتی دارد,این خدمات در صورتی می باشد که دستگاه مجددا اب یا ضربه نخورد و تغییر فیزیکی نداشته باشد',
    'warranty.repairs.note': 'چنانچه دستگاه به جز ایرادی که مشتری اعلام نموده پس از کارشناسی ایرادات دیگری نیز مشاهده گردد طی تماس تلفنی با مشتری هماهنگ می گردد.<br/>این مرکز ایرادات تا سقف 3.000.000 میلیون ریال را بدون هماهنگی تعمیر می نماید ومبالغ بالاتر تماس تلفنی هماهنگ می گردد.<br/>لطفا شرایط دستگاه های فاقد گارانتی را با دقت مطالعه فرمایید و با آگاهی کامل و در صورت تمایل فرم رضایت نامه را امضاء و تکمیل نمایید.<br/>* کدملی ، امضاء و اثرانگشت در فرم رضایت الزامی می باشد. *',
    
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
    // English translations would go here...
    // For now, I'll just put placeholders or the Persian text.
    'all': 'All',
    'loading': 'Loading...',
    'export.back': 'Back to Export Page',
    'product.coming_soon': 'Product information will be available soon.',
    'warranty.backLink': 'Back to Warranty Page',

    'Apple': 'Apple', 'Samsung': 'Samsung', 'Xiaomi': 'Xiaomi', 'Poco': 'Poco', 'Nokia': 'Nokia',
    'country.uae': 'UAE', 'country.iraq': 'Iraq', 'country.afghanistan': 'Afghanistan', 'country.turkmenistan': 'Turkmenistan', 'country.azerbaijan': 'Azerbaijan', 'country.armenia': 'Armenia', 'country.qatar': 'Qatar', 'country.kuwait': 'Kuwait',

    'category.mobile': 'Mobile',
    'category.smartwatch': 'Smartwatch',
    'category.tablet': 'Tablet',
    'category.accessories': 'Accessories',
    'category.feature_phone': 'Feature Phone',

    'nav.home': 'Home', 'nav.warranty': 'Warranty', 'nav.products': 'Products', 'nav.export': 'Export', 'nav.representatives': 'Reps', 'nav.contact': 'Contact', 'nav.myArman': 'Login / Sign Up', 'nav.profile': 'Profile', 'nav.logout': 'Logout',
    'nav.blog': 'Blog & Training',
    'nav.cooperation': 'Cooperation',

    'hero.title': 'The Smartest Warranty & Services',
    'hero.subtitle': 'After-Sales in Iran',
    'hero.description': 'Arman Hamrah Aria Communications Warranty Company has been providing the best customer service experience since 2015',
    'hero.cta': 'Our Services',
    'hero.cta2': 'Register',

    'brands.title': 'Covered Brands',
    
    'services.title': 'Our Services',
    'services.warranty.title': 'Arman Warranty',
    'services.warranty.desc': 'Valid warranty for Apple, Samsung, Xiaomi and Sony products',
    'services.representatives.title': 'Representatives',
    'services.representatives.desc': 'Our extensive network of representatives across Iran',
    'services.shop.title': 'Shop',
    'services.shop.desc': 'Buy original products with valid warranty',
    'services.export': 'Export',
    'services.export.desc': 'Exporting products worldwide',

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
    'warranty.exceptions.title': 'Tolerable Cases in Service Provision',
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

    // Warranty Page - Accessories
    'warranty.accessories.title': 'Accessory and Gadget Warranty Conditions',
    'warranty.accessories.main': '(Speakers, Smartwatches, Headsets, etc.)<br/><br/>All watches and gadgets guaranteed by Arman Hamrah have an 18-month warranty from the moment of sale.<br/>(Note 1: The warranty period for mobile phones, tablets, and smart accessories starts from activation (purchase invoice) and up to 6 months after the import declaration in the trade system.)',
    'warranty.accessories.item1': 'Products with inherent manufacturer defects will be replaced for up to 1 month. This does not cover cosmetic issues, color, or model. Please inspect the product physically in the seller\'s presence. Products with discoloration, dents, breakages, or other cosmetic flaws are not eligible for replacement warranty.',
    'warranty.accessories.item2': 'Damage from water, impact, discoloration, deformation, opening at unauthorized centers, and electrical fluctuations are not covered. Please take care of your product.',
    'warranty.accessories.item3': 'The company is not responsible for saving user\'s personal data or applications.',
    'warranty.accessories.item4': 'Products brought to the service center with issues like water damage, impact, breakage, etc., may not be restorable to their previous condition. The customer will be informed after technical assessment.',
    'warranty.accessories.item5': 'In case of a widespread defect in any product, an official announcement will be made on the Arman Hamrah website with instructions on how to fix it, or a recall for service/replacement.',
    'warranty.accessories.item6': 'If a product needs replacement and the model is unavailable, it will be replaced with a different model after charging the price difference and a depreciation fee. 4% of the product’s value is deducted for each month of use, based on the average selling price over the last 3 months (or the last sales invoice if unavailable).',
    'warranty.accessories.item7': 'If the product is held for more than 15 working days (excluding shipping time), 1 month will be added to the warranty period for each week of delay.',
    'warranty.accessories.item8': 'The charger and cable are warrantied for 1 month if confirmed to be original. This does not cover disconnection, damage, or breakage of the charger head.',
    'warranty.accessories.item9': 'Bringing the official stamped invoice and the device box is mandatory when visiting the service center.',

    // Warranty Page - Repairs
    'warranty.repairs.title': 'General Conditions for Out-of-Warranty Repairs',
    'warranty.repairs.main': '',
    'warranty.repairs.item1': 'Water or impact-damaged devices may not return to their original admission state after being opened due to internal and external changes.',
    'warranty.repairs.item2': 'For an out-of-warranty device brought in for a specific issue, the center is only responsible for that issue. Water or impact damage may cause other faults to appear later.',
    'warranty.repairs.item3': 'Replaced parts are warrantied for 1 month after delivery, provided the device does not suffer new water or impact damage and has no physical changes.',
    'warranty.repairs.note': 'If other issues are found during inspection, the customer will be contacted by phone.<br/>Repairs up to 3,000,000 IRR will be done without coordination; for higher amounts, the customer will be contacted.<br/>Please read the conditions for out-of-warranty devices carefully and sign the consent form if you agree.<br/>* National ID, signature, and fingerprint are required on the consent form. *',
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
