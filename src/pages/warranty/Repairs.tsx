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

const WarrantyRepairsPageContent = () => {
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
                {language === 'fa' ? 'تعمیرات دستگاه‌های فاقد گارانتی' : 'Out-of-Warranty Repairs'}
              </h1>

              <div className="card-premium prose prose-invert max-w-none text-muted-foreground">
                <ol>
                    <li>دستگاه های آب خورده.ضربه خورده به علت تغییر شکل ظاهری و وضعیت داخلی ,ممکن است پس از بازکردن به حالت اولیه در زمان پذیرش باز نگردد.</li>
                    <li>دستگاهی که فاقد گارانتی می باشد چنانچه با یک ایراد مشخص به مرکز مراجعه نماید.این مرکز فقط در قبال ایراد ذکرشده مسئولیت می پذیرد بدین علت که ممکن است دستگاه آب خورده یا ضربه خورده به علت آسیبی که به آن وارد شده بعد از گذشت مدتی سایر عیوب خود را نمایان سازد.</li>
                    <li>قطعه ی تعویضی در این مرکز به مدت 1 ماه پس از تحویل خدمات گارانتی دارد,این خدمات در صورتی می باشد که دستگاه مجددا اب یا ضربه نخورد و تغییر فیزیکی نداشته باشد</li>
                </ol>
                <p>چنانچه دستگاه به جز ایرادی که مشتری اعلام نموده پس از کارشناسی ایرادات دیگری نیز مشاهده گردد طی تماس تلفنی با مشتری هماهنگ می گردد.<br/>این مرکز ایرادات تا سقف 3.000.000 میلیون ریال را بدون هماهنگی تعمیر می نماید ومبالغ بالاتر تماس تلفنی هماهنگ می گردد.<br/>لطفا شرایط دستگاه های فاقد گارانتی را با دقت مطالعه فرمایید و با آگاهی کامل و در صورت تمایل فرم رضایت نامه را امضاء و تکمیل نمایید.<br/>* کدملی ، امضاء و اثرانگشت در فرم رضایت الزامی می باشد. *</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const WarrantyRepairsPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="تعمیرات دستگاه‌های فاقد گارانتی | آرمان همراه"
            description="شرایط و رویه‌های تعمیر دستگاه‌هایی که گارانتی آن‌ها به اتمام رسیده"
          />
          <WarrantyRepairsPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default WarrantyRepairsPage;
