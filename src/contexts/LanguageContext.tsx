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
    'warranty.backLink': 'بازگشت به صفحه گارانتی',
    'loading': 'در حال بارگذاری...',

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
    'category.feature_phone': 'گوشی ساده',

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
    'products_page.title': 'محصولات ما',
    'products_page.description': 'در اینجا می‌توانید جدیدترین و با کیفیت‌ترین محصولات ما را مشاهده کنید.',
    'products.search_placeholder': 'جستجو بر اساس نام محصول یا برند...',
    
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

    // Product Specs - Labels
    'spec.chip': 'چیپست',
    'spec.display': 'نمایشگر',
    'spec.camera_system': 'سیستم دوربین',
    'spec.ram': 'رم',
    'spec.features': 'ویژگی‌ها',
    'spec.internal_storage': 'حافظه داخلی',
    'spec.main_camera': 'دوربین اصلی',
    'spec.pen': 'قلم',
    'spec.water_resistance': 'مقاومت در برابر آب',
    'spec.sensors': 'حسگرها',
    'spec.noise_cancellation': 'حذف نویز',
    'spec.transparency_mode': 'حالت شفافیت',
    'spec.spatial_audio': 'صدای فضایی',
    'spec.connectivity': 'اتصالات',
    'spec.os': 'سیستم عامل',
    'spec.dimensions': 'ابعاد',
    'spec.weight': 'وزن',
    'spec.build_material': 'جنس بدنه',
    'spec.chip_model': 'مدل چیپست',
    'spec.security': 'امنیت',
    'spec.battery': 'باتری',
    'spec.resistance': 'مقاومت',
    'spec.connectivity_network': 'شبکه',
    'spec.sim': 'سیم‌کارت',
    'spec.port': 'درگاه',

    // Product Specs - Values
    'spec.value.a19_pro': 'A19 Pro',
    'spec.value.display_iphone_17_pro': 'نمایشگر ۶.۹ اینچی ProMotion XDR',
    'spec.value.pro_camera_under_display': 'سیستم دوربین پیشرفته با دوربین زیر نمایشگر',
    'spec.value.16_gb': '۱۶ گیگابایت',
    'spec.value.features_iphone_17_pro': 'فیس آیدی زیر نمایشگر، وای-فای ۷',
    'spec.value.a18_bionic': 'A18 Bionic',
    'spec.value.display_iphone_16_pro': 'نمایشگر ۶.۱ اینچی Super Retina XDR',
    'spec.value.dual_camera_action_button': 'سیستم دوربین دوگانه با دکمه اکشن',
    'spec.value.features_iphone_16_pro': 'جزیره پویا (Dynamic Island)، دکمه اکشن',
    'spec.value.8_gb': '۸ گیگابایت',
    'spec.value.s8_sip': 'S8 SiP',
    'spec.value.display_apple_watch_se': 'Retina LTPO OLED',
    'spec.value.50_meters': '۵۰ متر',
    'spec.value.sensors_apple_watch_se': 'ضربان قلب، شتاب‌سنج، ژیروسکوپ، فشارسنج',
    'spec.value.features_apple_watch_se': 'GPS، تماس اضطراری',
    'spec.value.apple_h2': 'Apple H2',
    'spec.value.active_noise_cancellation': 'حذف نویز فعال',
    'spec.value.adaptive_transparency': 'شفافیت تطبیقی',
    'spec.value.personalized_spatial_audio': 'صدای فضایی شخصی‌سازی‌شده',
    'spec.value.bluetooth_5_3': 'بلوتوث ۵.۳',
    'spec.value.snapdragon_8_gen_4_galaxy': 'اسنپدراگون ۸ نسل ۴ برای گلکسی',
    'spec.value.512_gb': '۵۱۲ گیگابایت',
    'spec.value.display_s25_ultra': 'نمایشگر ۶.۹ اینچی Dynamic AMOLED 3X',
    'spec.value.250_mp_isocell': 'سنسور ۲۵۰ مگاپیکسلی ISOCELL',
    'spec.value.pen_s25_ultra': 'قلم S Pen داخلی با قابلیت‌های هوش مصنوعی',
    'spec.value.snapdragon_8_gen_3_galaxy': 'اسنپدراگون ۸ نسل ۳ برای گلکسی',
    'spec.value.12_gb': '۱۲ گیگابایت',
    'spec.value.256_gb': '۲۵۶ گیگابایت',
    'spec.value.display_s24_ultra': 'نمایشگر ۶.۸ اینچی Dynamic AMOLED 2X',
    'spec.value.200_mp': '۲۰۰ مگاپیکسل',
    'spec.value.features_s24_ultra': 'هوش مصنوعی Galaxy، فریم تیتانیومی',
    'spec.value.exynos_2400_snapdragon_8_gen_3': 'اگزینوس ۲۴۰۰ / اسنپدراگون ۸ نسل ۳',
    'spec.value.128_gb': '۱۲۸ گیگابایت',
    'spec.value.display_s25_fe': 'نمایشگر ۶.۵ اینچی Super AMOLED 2X',
    'spec.value.50_mp': '۵۰ مگاپیکسل',
    'spec.value.a56_os': 'اندروید ۱۵ با One UI 7',
    'spec.value.a56_dimensions': '۱۶۵ × ۷۶ × ۸.۲ میلی‌متر',
    'spec.value.a56_weight': '۱۹۵ گرم',
    'spec.value.a56_build': 'فریم پلاستیکی، پشت شیشه‌ای',
    'spec.value.a56_water_resistance': 'گواهی IP67',
    'spec.value.a56_display_type': 'Super AMOLED Plus، نرخ نوسازی ۱۲۰ هرتز',
    'spec.value.a56_chip_model': 'اگزینوس ۱۶۵۰ (۴ نانومتری)',
    'spec.value.108_mp': '۱۰۸ مگاپیکسل',
    'spec.value.exynos_1480': 'اگزینوس ۱۴۸۰',
    'spec.value.display_a36': 'نمایشگر ۶.۶ اینچی Super AMOLED، نرخ نوسازی ۱۲۰ هرتز',
    'spec.value.samsung_knox_vault': 'Samsung Knox Vault',
    'spec.value.exynos_1380': 'اگزینوس ۱۳۸۰',
    'spec.value.display_a26': 'نمایشگر ۶.۵ اینچی Super AMOLED، نرخ نوسازی ۱۲۰ هرتز',
    'spec.value.exynos_1280': 'اگزینوس ۱۲۸۰',
    'spec.value.6_gb': '۶ گیگابایت',
    'spec.value.display_a17': 'نمایشگر ۶.۶ اینچی FHD+ LCD، نرخ نوسازی ۱۲۰ هرتز',
    'spec.value.mediatek_helio_g99': 'مدیاتک هلیو G99',
    'spec.value.4_gb': '۴ گیگابایت',
    'spec.value.display_a07': 'نمایشگر ۶.۷ اینچی HD+ LCD، نرخ نوسازی ۹۰ هرتز',
    'spec.value.snapdragon_680_4g': 'اسنپدراگون 680 4G',
    'spec.value.display_a06': 'نمایشگر ۶.۷ اینچی PLS LCD، نرخ نوسازی ۹۰ هرتز',
    'spec.value.snapdragon_695_5g': 'اسنپدراگون 695 5G',
    'spec.value.64_gb': '۶۴ گیگابایت',
    'spec.value.display_tab_a9_plus': 'نمایشگر ۱۱.۰ اینچی TFT LCD، نرخ نوسازی ۹۰ هرتز',
    'spec.value.7040_mah': '۷۰۴۰ میلی‌آمپر ساعت',
    'spec.value.display_tab_a9': 'نمایشگر ۸.۷ اینچی TFT LCD',
    'spec.value.5100_mah': '۵۱۰۰ میلی‌آمپر ساعت',
    'spec.value.snapdragon_8_gen_4': 'اسنپدراگون ۸ نسل ۴',
    'spec.value.display_xiaomi_15t': 'نمایشگر ۶.۷ اینچی CrystalRes AMOLED، نرخ نوسازی ۱۴۴ هرتز',
    'spec.value.xiaomi_hyperos': 'Xiaomi HyperOS',
    'spec.value.snapdragon_7s_gen_2': 'اسنپدراگون 7s نسل ۲',
    'spec.value.display_redmi_note_14_pro': 'نمایشگر ۶.۶۷ اینچی AMOLED، نرخ نوسازی ۱۲۰ هرتز',
    'spec.value.corning_gorilla_glass_victus': 'Corning Gorilla Glass Victus',
    'spec.value.mediatek_dimensity_7200_ultra': 'مدیاتک دایمنسیتی ۷۲۰۰ اولترا',
    'spec.value.display_redmi_note_14': 'نمایشگر ۶.۶۷ اینچی AMOLED، نرخ نوسازی ۱۲۰ هرتز',
    'spec.value.mediatek_dimensity_6080': 'مدیاتک دایمنسیتی ۶۰۸۰',
    'spec.value.display_redmi_15': 'نمایشگر ۶.۶۷ اینچی AMOLED، نرخ نوسازی ۱۲۰ هرتز',
    'spec.value.mediatek_helio_g91_ultra': 'مدیاتک هلیو G91 اولترا',
    'spec.value.display_redmi_15c': 'نمایشگر ۶.۷۴ اینچی IPS LCD، نرخ نوسازی ۹۰ هرتز',
    'spec.value.ip53': 'مقاوم در برابر پاشش آب و گرد و غبار (IP53)',
    'spec.value.mediatek_helio_g37': 'مدیاتک هلیو G37',
    'spec.value.display_redmi_a3': 'نمایشگر ۶.۷۱ اینچی IPS LCD، نرخ نوسازی ۹۰ هرتز',
    'spec.value.8_mp': '۸ مگاپیکسل',
    'spec.value.5000_mah': '۵۰۰۰ میلی‌آمپر ساعت',
    'spec.value.mediatek_helio_g36': 'مدیاتک هلیو G36',
    'spec.value.android_14_go_miui': 'اندروید ۱۴ (نسخه Go) با MIUI',
    'spec.value.8_mp_wide': '۸ مگاپیکسل (واید)',
    'spec.value.mediatek_dimensity_8300_ultra': 'مدیاتک دایمنسیتی ۸۳۰۰ اولترا',
    'spec.value.display_poco_m7': 'نمایشگر ۶.۶۷ اینچی CrystalRes Flow AMOLED، نرخ نوسازی ۱۲۰ هرتز',
    'spec.value.camera_poco_m7': 'دوربین اصلی ۶۴ مگاپیکسل، اولتراواید ۸ مگاپیکسل، ماکرو ۲ مگاپیکسل',
    'spec.value.display_poco_m6': 'نمایشگر ۶.۶۷ اینچی AMOLED، نرخ نوسازی ۱۲۰ هرتز',
    'spec.value.mediatek_helio_g85': 'مدیاتک هلیو G85',
    'spec.value.display_poco_c85': 'نمایشگر ۶.۷۴ اینچی IPS LCD، نرخ نوسازی ۹۰ هرتز',
    'spec.value.camera_poco_c85': 'دوربین اصلی ۵۰ مگاپیکسل، ماکرو ۲ مگاپیکسل',
    'spec.value.unisoc_t612': 'Unisoc T612',
    'spec.value.display_poco_c75': 'نمایشگر ۶.۷۴ اینچی IPS LCD',
    'spec.value.camera_poco_c75': 'دوربین اصلی ۵۰ مگاپیکسل',
    'spec.value.display_poco_c71': 'نمایشگر ۶.۷۱ اینچی IPS LCD',
    'spec.value.camera_poco_c71': 'دوربین اصلی ۱۳ مگاپیکسل',
    'spec.value.display_nokia_105': 'نمایشگر ۱.۸ اینچی QQVGA',
    'spec.value.1000_mah_removable': '۱۰۰۰ میلی‌آمپر ساعت (قابل تعویض)',
    'spec.value.4g': '4G',
    'spec.value.dual_sim': 'دو سیم‌کارت',
    'spec.value.micro_usb': 'Micro-USB',
    'product.redmi_a5.description': 'یک گوشی هوشمند اقتصادی با ویژگی‌های مناسب برای کارهای روزمره.',
    'product.poco_m7.description': 'عملکرد قدرتمند با چیپست مدیاتک و نمایشگر روان برای بازی و سرگرمی.',
    'product.poco_c85.description': 'یک انتخاب هوشمندانه برای کاربرانی که به دنبال یک گوشی با دوام و مقرون‌به‌صرفه هستند.',
    'product.poco_c75.description': 'گوشی ساده و قابل اعتماد با عمر باتری طولانی.',
    'product.poco_c71.description': 'یک گوشی ابتدایی و اقتصادی برای نیازهای اولیه ارتباطی.',

  },
  en: {
    // General
    'all': 'All',
    'product.coming_soon': 'Product information will be available soon.',
    'warranty.backLink': 'Back to Warranty Page',
    'loading': 'Loading...',

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

    // Product Specs - Labels
    'spec.chip': 'Chipset',
    'spec.display': 'Display',
    'spec.camera_system': 'Camera System',
    'spec.ram': 'RAM',
    'spec.features': 'Features',
    'spec.internal_storage': 'Internal Storage',
    'spec.main_camera': 'Main Camera',
    'spec.pen': 'Pen',
    'spec.water_resistance': 'Water Resistance',
    'spec.sensors': 'Sensors',
    'spec.noise_cancellation': 'Noise Cancellation',
    'spec.transparency_mode': 'Transparency Mode',
    'spec.spatial_audio': 'Spatial Audio',
    'spec.connectivity': 'Connectivity',
    'spec.os': 'Operating System',
    'spec.dimensions': 'Dimensions',
    'spec.weight': 'Weight',
    'spec.build_material': 'Build Material',
    'spec.chip_model': 'Chipset Model',
    'spec.security': 'Security',
    'spec.battery': 'Battery',
    'spec.resistance': 'Resistance',
    'spec.connectivity_network': 'Network',
    'spec.sim': 'SIM',
    'spec.port': 'Port',

    // Product Specs - Values
    'spec.value.a19_pro': 'A19 Pro',
    'spec.value.display_iphone_17_pro': '6.9-inch ProMotion XDR Display',
    'spec.value.pro_camera_under_display': 'Pro camera system with under-display camera',
    'spec.value.16_gb': '16 GB',
    'spec.value.features_iphone_17_pro': 'Under-display Face ID, Wi-Fi 7',
    'spec.value.a18_bionic': 'A18 Bionic',
    'spec.value.display_iphone_16_pro': '6.1-inch Super Retina XDR',
    'spec.value.dual_camera_action_button': 'Dual-camera system with Action Button',
    'spec.value.features_iphone_16_pro': 'Dynamic Island, Action Button',
    'spec.value.8_gb': '8 GB',
    'spec.value.s8_sip': 'S8 SiP',
    'spec.value.display_apple_watch_se': 'Retina LTPO OLED',
    'spec.value.50_meters': '50 meters',
    'spec.value.sensors_apple_watch_se': 'Heart rate, Accelerometer, Gyro, Barometer',
    'spec.value.features_apple_watch_se': 'GPS, Emergency SOS',
    'spec.value.apple_h2': 'Apple H2',
    'spec.value.active_noise_cancellation': 'Active Noise Cancellation',
    'spec.value.adaptive_transparency': 'Adaptive Transparency',
    'spec.value.personalized_spatial_audio': 'Personalized Spatial Audio',
    'spec.value.bluetooth_5_3': 'Bluetooth 5.3',
    'spec.value.snapdragon_8_gen_4_galaxy': 'Snapdragon 8 Gen 4 for Galaxy',
    'spec.value.512_gb': '512 GB',
    'spec.value.display_s25_ultra': '6.9-inch Dynamic AMOLED 3X',
    'spec.value.250_mp_isocell': '250MP ISOCELL Sensor',
    'spec.value.pen_s25_ultra': 'Built-in S Pen with AI features',
    'spec.value.snapdragon_8_gen_3_galaxy': 'Snapdragon 8 Gen 3 for Galaxy',
    'spec.value.12_gb': '12 GB',
    'spec.value.256_gb': '256 GB',
    'spec.value.display_s24_ultra': '6.8-inch Dynamic AMOLED 2X',
    'spec.value.200_mp': '200 MP',
    'spec.value.features_s24_ultra': 'Galaxy AI, Titanium Frame',
    'spec.value.exynos_2400_snapdragon_8_gen_3': 'Exynos 2400 / Snapdragon 8 Gen 3',
    'spec.value.128_gb': '128 GB',
    'spec.value.display_s25_fe': '6.5-inch Super AMOLED 2X',
    'spec.value.50_mp': '50 MP',
    'spec.value.a56_os': 'Android 15, One UI 7',
    'spec.value.a56_dimensions': '165 x 76 x 8.2 mm',
    'spec.value.a56_weight': '195 g',
    'spec.value.a56_build': 'Plastic frame, glass back',
    'spec.value.a56_water_resistance': 'IP67 certified',
    'spec.value.a56_display_type': 'Super AMOLED Plus, 120Hz',
    'spec.value.a56_chip_model': 'Exynos 1650 (4 nm)',
    'spec.value.108_mp': '108 MP',
    'spec.value.exynos_1480': 'Exynos 1480',
    'spec.value.display_a36': '6.6-inch Super AMOLED, 120Hz',
    'spec.value.samsung_knox_vault': 'Samsung Knox Vault',
    'spec.value.exynos_1380': 'Exynos 1380',
    'spec.value.display_a26': '6.5-inch Super AMOLED, 120Hz',
    'spec.value.exynos_1280': 'Exynos 1280',
    'spec.value.6_gb': '6 GB',
    'spec.value.display_a17': '6.6-inch FHD+ LCD, 120Hz',
    'spec.value.mediatek_helio_g99': 'MediaTek Helio G99',
    'spec.value.4_gb': '4 GB',
    'spec.value.display_a07': '6.7-inch HD+ LCD, 90Hz',
    'spec.value.snapdragon_680_4g': 'Snapdragon 680 4G',
    'spec.value.display_a06': '6.7-inch PLS LCD, 90Hz',
    'spec.value.snapdragon_695_5g': 'Snapdragon 695 5G',
    'spec.value.64_gb': '64 GB',
    'spec.value.display_tab_a9_plus': '11.0-inch TFT LCD, 90Hz',
    'spec.value.7040_mah': '7040 mAh',
    'spec.value.display_tab_a9': '8.7-inch TFT LCD',
    'spec.value.5100_mah': '5100 mAh',
    'spec.value.snapdragon_8_gen_4': 'Snapdragon 8 Gen 4',
    'spec.value.display_xiaomi_15t': '6.7-inch CrystalRes AMOLED, 144Hz',
    'spec.value.xiaomi_hyperos': 'Xiaomi HyperOS',
    'spec.value.snapdragon_7s_gen_2': 'Snapdragon 7s Gen 2',
    'spec.value.display_redmi_note_14_pro': '6.67-inch AMOLED, 120Hz',
    'spec.value.corning_gorilla_glass_victus': 'Corning Gorilla Glass Victus',
    'spec.value.mediatek_dimensity_7200_ultra': 'MediaTek Dimensity 7200 Ultra',
    'spec.value.display_redmi_note_14': '6.67-inch AMOLED, 120Hz',
    'spec.value.mediatek_dimensity_6080': 'MediaTek Dimensity 6080',
    'spec.value.display_redmi_15': '6.67-inch AMOLED, 120Hz',
    'spec.value.mediatek_helio_g91_ultra': 'MediaTek Helio G91 Ultra',
    'spec.value.display_redmi_15c': '6.74-inch IPS LCD, 90Hz',
    'spec.value.ip53': 'IP53, dust and splash resistant',
    'spec.value.mediatek_helio_g37': 'MediaTek Helio G37',
    'spec.value.display_redmi_a3': '6.71-inch IPS LCD, 90Hz',
    'spec.value.8_mp': '8 MP',
    'spec.value.5000_mah': '5000 mAh',
    'spec.value.mediatek_helio_g36': 'MediaTek Helio G36',
    'spec.value.android_14_go_miui': 'Android 14 (Go edition), MIUI',
    'spec.value.8_mp_wide': '8 MP (wide)',
    'spec.value.mediatek_dimensity_8300_ultra': 'MediaTek Dimensity 8300 Ultra',
    'spec.value.display_poco_m7': '6.67-inch CrystalRes Flow AMOLED, 120Hz',
    'spec.value.camera_poco_m7': '64 MP Main, 8 MP Ultrawide, 2 MP Macro',
    'spec.value.display_poco_m6': '6.67-inch AMOLED, 120Hz',
    'spec.value.mediatek_helio_g85': 'MediaTek Helio G85',
    'spec.value.display_poco_c85': '6.74-inch IPS LCD, 90Hz',
    'spec.value.camera_poco_c85': '50 MP Main, 2 MP Macro',
    'spec.value.unisoc_t612': 'Unisoc T612',
    'spec.value.display_poco_c75': '6.74-inch IPS LCD',
    'spec.value.camera_poco_c75': '50 MP Main',
    'spec.value.display_poco_c71': '6.71-inch IPS LCD',
    'spec.value.camera_poco_c71': '13 MP Main',
    'spec.value.display_nokia_105': '1.8-inch QQVGA display',
    'spec.value.1000_mah_removable': '1000 mAh (removable)',
    'spec.value.4g': '4G',
    'spec.value.dual_sim': 'Dual SIM',
    'spec.value.micro_usb': 'Micro-USB',
    'product.redmi_a5.description': 'An affordable smartphone with suitable features for daily tasks.',
    'product.poco_m7.description': 'Powerful performance with a MediaTek chipset and a smooth display for gaming and entertainment.',
    'product.poco_c85.description': 'A smart choice for users looking for a durable and affordable phone.',
    'product.poco_c75.description': 'A simple and reliable phone with long battery life.',
    'product.poco_c71.description': 'A basic and economical phone for primary communication needs.',
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
