import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import EditableText from '@/components/admin/EditableText';

const WarrantyConditionsPageContent = () => {
  const { language, t } = useLanguage();
  
  const warrantyConditions = [
    { key: 'warranty.conditions.item1', default: 'کلیه دستگاه های گارانتی شده توسط شرکت آرمان همراه ارتباطات آریا دارای 18 ماه گارانتی از لحظه فروش به مصرف کننده می باشد. همچنین تا 3 سال ضمانت تامین قطعه و پذیرش دستگاه و رفع ایراد مذکور توسط مشتری را دارد.<br/>(تبصره ۱ : مبنای محاسبه زمان شروع گارانتی برای کالاهای تلفن همراه و تبلت و اکسسوری های هوشمند از زمان فعالسازی (فاکتور خرید) و حداکثر ۶ماه پس از زمان اظهار واردات در سامانه جامع تجارت خواهد بود.)' },
    { key: 'warranty.conditions.item2', default: 'مدت اعتبار گارانتی باتری های داخلی 18 ماه و باطری های جداشدنی 6 ماه می باشد.' },
    { key: 'warranty.conditions.item3', default: 'لوازم جانبی شامل هندزفری و کابل شارژ شامل گارانتی نمی باشد لذا در حین خرید از سالم بودن آنها اطمینان حاصل نمایید.' },
    { key: 'warranty.conditions.item4', default: 'در صورتیکه خریدار پس از گذشت 7 روز از زمان فعالسازی ایرادی در دستگاه خود مشاهده نماید که سخت افزاری بوده ،دستگاه شامل تعویض خواهد بود و این امر در صورت داشتن ایراد فنی از سوی سازنده تا 1 ماه نیز میباشد.' },
    { key: 'warranty.conditions.item5', default: 'هر گونه آسیب فیزیکی ،ضرب خوردگی و شکستگی،آبخوردگی نوسانات برقی و سوختگی شامل گارانتی نمی باشد.' },
    { key: 'warranty.conditions.item6', default: 'چنانچه دستگاه در مراکز غیر مجاز تعمیر گردد فاقد گارانتی می باشد.' },
    { key: 'warranty.conditions.item7', default: 'عملیات Root کردن و نصب رام های غیر رسمی،هم چنین unlock Boot loader به دلیل اینکه ضریب ایمنی دستگاه را کاهش داده فاقد گارانتی و شامل هزینه می باشد.' },
    { key: 'warranty.conditions.item8', default: 'این شرکت در قبال فراموش کردن mi account و Google account مشتری هیچ گونه مسئولیتی را نمی پذیرد و چنانچه موارد فوق با صرف credit قابل حل شدن باشند کلیه هزینه ها بر عهده ی خود مشتری می باشد.' },
    { key: 'warranty.conditions.item9', default: 'این شرکت در قبال حفظ و نگهداری اطلاعات شخصی مشتری یا بازیابی آنها هیچگونه مسئولیتی ندارد چنانچه اطاعات داخل دستگاه برای مشتری مهم می باشد لطفا پیش از مراجعه به مرکز خدمات حتما از اطلاعات بک آپ گرفته شود.' },
    { key: 'warranty.conditions.item10', default: 'تغییر شماره سریال دستگاه و یا مخدوش نمودن آن توسط نرم افزارهای غیر اصلی شامل خدمات گارانتی نمی باشد.' },
    { key: 'warranty.conditions.item11', default: 'در ارتباط با ایرادات عمده ی کارخانه ای که به صورت فراخوان از سمت شرکت سازنده اعلام گردد این شرکت نیز طبق مقررات اعلامی وارد عمل خواهد شد.(چنانچه ایراد ذکر شده، از سوی شرکت سازنده نرم افزاری اعلام شده باشد کاربران میبایست تا زمان عرضه نسخه نرم افزاری جدید که در آن ایراد مذکور رفع گردیده باشد، منتظر بمانند.)' },
  ];

  const exceptions = [
    { key: 'warranty.exceptions.item1', default: 'در مناطق مرطوب وگرم مثل شهرهای شمالی و جنوبی کشور روئیت آبخوردگی از 10% الی 15% بلا مانع بوده و شامل گارانتی می باشد.' },
    { key: 'warranty.exceptions.item2', default: 'در صورت باز نمودن دستگاه در صورتیکه تکنسین متوجه شود که دستگاه قبلا در جایی غیر از مراکز اصلی خدمات آرمان باز شده اما دستکاری روی قطعات و برد نداشته باشد دستگاه شامل گارانتی می باشد.' },
    { key: 'warranty.exceptions.item3', default: 'در صورتیکه دستگاهی در جایی غیر از نمایندگی های مجاز آرمان نرم افزار خورده باشد چنانچه به Rom دستگاه آسیب نرسیده باشد با گارانتی رفع ایراد نرم افزاری می گردد اما چنانچه ورژن پایین تر خورده باشد و Boot دستگاه آسیب دیده باشد غیر گارانتی می باشد.' },
    { key: 'warranty.exceptions.item4', default: 'قطعات تعویض شده در این مرکز که بر روی دستگاه های غیر گارانتی قرار می گیرد تا سه ماه گارانتی دارند چنانچه تغییر وضعیت ظاهری نداده باشند یا دچار آبخوردگی و شکستگی نباشند.' },
    { key: 'warranty.exceptions.item5', default: 'در صورتیکه برد جانبی دستگاهی در اثر استفاده نا مناسب آبخوردگی و یا شکستگی داشته باشد شامل هزینه می باشد اما گارانتی دستگاه ابطال نمی گردد.' },
    { key: 'warranty.exceptions.item6', default: 'چنانچه جهت ایرادی مشابه مشتری 3 بار مراجعه به مرکز خدمات پس از فروش را داشته باشد و ایراد هم چنان پس از مدتی مشاهده گردد،جهت جلب رضایت و رفاه حال مشتری دستگاه مذکور تعویض می گردد.' },
    { key: 'warranty.exceptions.item7', default: 'چنانچه دستگاهی شامل تعویض گردد و در مدت اعلامی کالا تامین نگردیده باشد به مشتری اعلام می گردد در صورت تمایل دستگاه دیگری انتخاب نموده یا هزینه ایشان به حسابشان واریز گردد.در این دستورالعمل طبق مصوبه به ازای هر 1 ماه کارکرد دستگاه 4% از مبلغ فاکتور به علت استهلاک محصول کسر میگردد.<br/>تبصره: در صورتیکه دستگاه پیشنهادی از سمت شرکت ارزشی بالاتر از دستگاه خود مشتری داشته و مشتری رضایت به پرداخت مابه التفاوت نداشته باشد ، مبلغ فاکتور به مشتری عودت خواهد شد.' },
    { key: 'warranty.exceptions.item8', default: 'در هنگام پذیرش، دستگاه میبایست در مدت زمان اعلامی جهت بررسی و رفع ایراد در شرکت بماند،چنانچه مصرف کننده در طی این مدت دستگاه جایگزین نداشتند و نیاز مبرم به دستگاه داشته باشند می توانند با تکمیل کردن فرم و ارائه کارت شناسایی دستگاه جایگزین به صورت امانی از شرکت دریافت نمایند.' },
    { key: 'warranty.exceptions.item9', default: 'مصرف کننده ملزم است در زمان تحویل دستگاه امانی از بخش پذیرش ظاهر دستگاه را کاملا چک نموده و صحیح و سالم تحویل گیرد، فلذا هنگام باز گرداندن محصول به شرکت موظف است با ظاهر اولیه که تحویل گرفته است دستگاه را عودت دهند.' },
    { key: 'warranty.exceptions.item10', default: 'چنانچه در زمان مصرف از دستگاه امانی دستگاه از لحاظ ظاهری و یا فنی دچار مشکل گردیده باشد شرکت میتواند ضرر و زیان وارده را از مصرف کننده اخذ نماید و تا زمانیکه دستگاه امانی را عودت نداده انددستگاهشان نزد شرکت به امانت می ماند.' },
    { key: 'warranty.exceptions.item11', default: 'چنانچه تعمیر دستگاه کاربر بیشتر از مدت زمان اعلام شده به وی باشد به ازای هر یک هفته تاخیر یک ماه به گارانتی محصول اضافه میگردد (توجه داشته باشید این بند شامل موارد خاص از قبیل تعطیلی رسمی اعلام شده از طرف دولت و یا کم شدن ساعت کاری و ایام نوروز نمی باشد.)' },
    { key: 'warranty.exceptions.item12', default: 'در زمان مراجعه به مرکز خدمات آرمان همراه، همراه داشتن فاکتور رسمی مهمور و جعبه دستگاه الزامی می باشد.' },
  ];

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` }} dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/warranty" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
                <ChevronLeft size={20} />
                <EditableText as="span" page="warranty" section="conditions" contentKey="backLink" defaultValue={t('warranty.backLink', 'بازگشت به صفحه گارانتی')} />
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
                <EditableText as="span" page="warranty" section="conditions" contentKey="pageTitle" defaultValue={t('warranty.conditionsTitle', 'شرایط گارانتی 18 ماه')} />
              </h1>

              <div className="card-premium prose prose-invert max-w-none text-muted-foreground">
                <ol>
                  {warrantyConditions.map(item => (
                    <li key={item.key}>
                      <EditableText as="span" page="warranty" section="conditions" contentKey={item.key} defaultValue={item.default} multiline renderAsHTML />
                    </li>
                  ))}
                </ol>
                <h2 className="!mt-16">
                  <EditableText as="span" page="warranty" section="exceptions" contentKey="title" defaultValue={t('warranty.exceptionsTitle', 'موارد قابل اغماض در ارائه خدمات...')} />
                </h2>
                <ul>
                  {exceptions.map(item => (
                    <li key={item.key}>
                      <EditableText as="span" page="warranty" section="exceptions" contentKey={item.key} defaultValue={item.default} multiline renderAsHTML />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const WarrantyConditionsPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="شرایط گارانتی 18 ماه | آرمان همراه"
            description="شرایط و ضوابط کامل گارانتی ۱۸ ماهه محصولات شرکت آرمان همراه ارتباطات آریا"
          />
          <WarrantyConditionsPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyConditionsPage;
