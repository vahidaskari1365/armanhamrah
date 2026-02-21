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

const WarrantyAccessoriesPageContent = () => {
  const { language } = useLanguage();
  
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
                {language === 'fa' ? 'بازگشت به صفحه گارانتی' : 'Back to Warranty Page'}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
                {language === 'fa' ? 'شرایط گارانتی لوازم جانبی و اکسسوری' : 'Accessory Warranty Conditions'}
              </h1>

              <div className="card-premium prose prose-invert max-w-none text-muted-foreground">
                <p>کلیه ساعتها و گجت های گارانتی شده توسط شرکت آرمان همراه دارای 18 ماه گارانتی از لحظه فروش به مصرف کننده می باشد.<br/>(تبصره ۱ : مبنای محاسبه زمان شروع گارانتی برای کالاهای تلفن همراه و تبلت و اکسسوری های هوشمند از زمان فعالسازی (فاکتور خرید) و حداکثر ۶ماه پس از زمان اظهار واردات در سامانه جامع تجارت خواهد بود.)</p>
                <ul>
                  <li>تعویض محصولات در صورت داشتن عیوب ذاتی از سوی شرکت سازنده وبه مدت 1 ماه می باشد توجه فرمائید که این بند شامل عیوب ظاهری و یا رنگ و مدل نمی باشند لذا در حین خرید محصول خود را از لحاظ سلامت فیزیکی و ظاهری در حضور فروشنده تست نمایید چنانچه محصولی دارای رنگ رفتگی ،فرورفتگی،شکستگی و یا ایرادات ظاهری باشد شامل گارانتی تعویض نمی گردد.</li>
                  <li>صدمات ناشی از آبخوردگی،ضربه خوردگی،رنگ رفتگی،دفرمه شدن محصول،باز شدن محصول در مراکز غیر مجاز و خارج از مجموعه و نوسانات برقی و سوختگی شامل گارانتی نمی باشد لذا در حفظ و نگهداری محصول خود نهایت دقت را بفرمایید.</li>
                  <li>شرکت هیچ گونه مسئولیتی در قبال حفظ برنامه ها و اطلاعات شخصی کاربر ندارد.</li>
                  <li>محصولاتی که با مشکلاتی از قبیل آبخوردگی ،ضربه خوردگی،شکستگی و … به مرکز خدمات مراجعه می نمایند بعضا امکان حفظ شرایط قبلی آنها وجود ندارد که این مطالب توسط بخش پذیرش و یا تکنسین مربوطه پس از بررسی فنی به اطلاع مشتری رسانده می شود.</li>
                  <li>در صورت بروز خرابی به صورت فراگیر بر روی هر محصولی،اطلاع رسانی رسمی بر روی سایت آرمان همراه جهت راهنمایی نحوه رفع ایراد و یا فراخوان مراجعه به مرکز خدمات جهت دریافت سرویس و در صورت لزوم جمع آوری محصول و تعویض آن صورت خواهد پذیرفت.</li>
                  <li>چنانچه محصول نیاز به تعویض داشته باشد و مدل محصول موجود نباشد با اخذ ما به التفاوت و مبلغ فرانشیز مصوب بابت فرسودگی محصول معیوب،اقدام به تعویض خواهد شد. به ازای هر ماه کارکرد دستگاه 4% ارزش کالا کسر خواهد شد که مبنای محاسبه ی کالا متوسط قیمت فروش 3 ماهه گذشته همان مدل کالا می باشد.(در صورت عدم وجود کالا ملاک آخرین فاکتور فروش شرکت می باشد).</li>
                  <li>در صورت توقف بیش از 15 روز کاری از زمان دریافت کالا تا زمان تحویل آن ( بدون در نظر گرفتن زمان ارسال و دریافت از طریق پست یا مبادی مشابه ) به ازای هر 1 هفته 1 ماه به مدت زمان گارانتی اضافه می گردد.</li>
                  <li>شارژر و کابل شارژر مربوط به محصول در صورت بررسی اصل بودن ، به مدت 1 ماه دارای گارانتی می باشند لازم به ذکر است که قطع شدن،آسیب دیدگی،شکستگی سری شارژر شامل این بند نمی باشد و فاقد گارانتی می باشند.</li>
                  <li>در زمان مراجعه به مرکز خدمات آرمان همراه، همراه داشتن فاکتور رسمی مهمور و جعبه دستگاه الزامی می باشد.</li>
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

const WarrantyAccessoriesPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="شرایط گارانتی لوازم جانبی | آرمان همراه"
            description="اطلاعات مربوط به گارانتی انواع لوازم جانبی و اکسسوری‌های شرکت آرمان همراه ارتباطات آریا"
          />
          <WarrantyAccessoriesPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyAccessoriesPage;
