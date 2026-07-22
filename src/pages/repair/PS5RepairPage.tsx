import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import { motion } from 'framer-motion';
import pageBg from '@/assets/page-bg.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const PS5RepairPage = () => {
  const { t, language } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": language === 'fa' 
      ? "تعمیرات تخصصی PS5 آرمان همراه - تهران" 
      : "PS5 Repair Center - Arman Hamrah Tehran",
    "description": language === 'fa'
      ? "تعمیر PS5 در تهران | تعمیر برد، HDMI، درایو، دسته DualSense با گارانتی 90 روزه"
      : "PS5 repair in Tehran | Board, HDMI, Drive, DualSense controller repair",
    "url": "https://armanhamrah.com/repair/ps5",
    "telephone": "+982166745916",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "خیابان جمهوری، پاساژ علاءالدین، طبقه ششم",
      "addressLocality": "تهران",
      "addressCountry": "IR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.6892",
      "longitude": "51.3890"
    },
    "openingHours": "Sa-Th 09:00-18:00",
    "priceRange": "$$$",
    "serviceType": language === 'fa' 
      ? "تعمیرات تخصصی PS5" 
      : "PS5 Repair Services"
  };

  return (
    <HelmetProvider>
      <SEO 
        title={language === 'fa' 
          ? "تعمیر PS5 تهران | مرکز تخصصی تعمیرات پلی استیشن 5 با گارانتی - آرمان همراه"
          : "PS5 Repair Tehran | Expert PlayStation 5 Repair Center"}
        description={language === 'fa'
          ? "تعمیر PS5 در تهران | تعمیر برد PS5، تعویض HDMI، تعمیر درایو، دسته DualSense، رفع ارور با گارانتی 90 روزه در پاساژ علاءالدین"
          : "PS5 repair in Tehran | Expert board repair, HDMI replacement, drive repair, DualSense controller, error fix with 90-day warranty"}
        keywords={language === 'fa'
          ? "تعمیر PS5, تعمیرات PS5 تهران, تعمیر پلی استیشن 5, تعمیر PS5 اسلیم, تعمیر PS5 فت, تعمیر دسته PS5, تعمیر DualSense, تعمیر HDMI PS5, قیمت تعمیر PS5, مرکز تعمیرات PS5 تهران"
          : "ps5 repair tehran, playstation 5 repair, ps5 slim repair, ps5 fat repair, dualshock repair, ps5 hdmi repair"}
        url="https://armanhamrah.com/repair/ps5"
        jsonLd={structuredData}
      />
      <FAQSchema />
      <div className="page-background bg-background" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties}>
        <Navbar />
        <main className="min-h-screen section-padding pt-32">
          <div className="container-custom">
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {language === 'fa' ? 'تعمیر PS5 تهران' : 'PS5 Repair Tehran'}
              </h1>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary mb-6" />
              <p className="text-lg text-foreground max-w-3xl mx-auto">
                {language === 'fa'
                  ? 'مرکز تخصصی تعمیرات PS5 در تهران | تعمیر برد | تعویض HDMI | تعمیر درایو | دسته DualSense | گارانتی 90 روزه'
                  : 'Expert PS5 repair center in Tehran | Board repair | HDMI replacement | Drive repair | DualSense | 90-day warranty'}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              <div className="bg-card rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-foreground">
                  {language === 'fa' ? 'موفقیت تعمیر' : 'Success Rate'}
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">24h</div>
                <div className="text-sm text-foreground">
                  {language === 'fa' ? 'زمان تعمیر' : 'Repair Time'}
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">90</div>
                <div className="text-sm text-foreground">
                  {language === 'fa' ? 'روز گارانتی' : 'Days Warranty'}
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-foreground">
                  {language === 'fa' ? 'سال تجربه' : 'Years Experience'}
                </div>
              </div>
            </motion.div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              
              {/* HDMI */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">📺</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر HDMI PS5' : 'PS5 HDMI Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعویض پورت HDMI و تعمیر مدار HDMI برای رفع مشکل تصویر ندادن'
                    : 'HDMI port replacement and circuit repair for no video issues'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض پورت HDMI' : 'HDMI port replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر برد HDMI' : 'HDMI board repair'}</li>
                  <li>✅ {language === 'fa' ? 'تست قبل از تحویل' : 'Test before delivery'}</li>
                </ul>
              </motion.div>

              {/* Board */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🔧</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر برد PS5' : 'PS5 Board Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر تخصصی برد اصلی PS5 شامل IC، APU و South Bridge'
                    : 'Professional PS5 main board repair: IC, APU, South Bridge'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'BGA Reballing' : 'BGA Reballing'}</li>
                  <li>✅ {language === 'fa' ? 'تعویض IC' : 'IC replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر پاور' : 'Power supply repair'}</li>
                </ul>
              </motion.div>

              {/* Drive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">💿</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر درایو PS5' : 'PS5 Drive Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر درایو نوری و دیجیتال PS5 برای رفع مشکل نخواندن دیسک'
                    : 'PS5 optical and digital drive repair for disc reading issues'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعمیر لیزر' : 'Laser repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعویض درایو' : 'Drive replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر مکانیزم' : 'Mechanism repair'}</li>
                </ul>
              </motion.div>

              {/* DualSense */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🎮</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر دسته DualSense' : 'DualSense Controller Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر دسته PS5 شامل دریفت آنالوگ، دکمه‌ها و باتری'
                    : 'PS5 controller repair: analog drift, buttons, battery'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعمیر دریفت آنالوگ' : 'Analog drift fix'}</li>
                  <li>✅ {language === 'fa' ? 'تعویض باتری' : 'Battery replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر دکمه' : 'Button repair'}</li>
                </ul>
              </motion.div>

              {/* Overheating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🔥</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'رفع overheating PS5' : 'PS5 Overheating Fix'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'رفع مشکل داغ شدن بیش از حد و صدای زیاد فن PS5'
                    : 'Fix excessive heat and loud fan noise on PS5'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض خمیر حرارتی' : 'Thermal paste replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر فن' : 'Fan repair'}</li>
                  <li>✅ {language === 'fa' ? 'تمیزکاری' : 'Cleaning'}</li>
                </ul>
              </motion.div>

              {/* SSD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">💾</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'ارتقاء SSD PS5' : 'PS5 SSD Upgrade'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'نصب و ارتقاء حافظه SSD برای افزایش فضای ذخیره‌سازی'
                    : 'SSD installation and upgrade for more storage'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'نصب SSD' : 'SSD installation'}</li>
                  <li>✅ {language === 'fa' ? 'انتقال دیتا' : 'Data transfer'}</li>
                  <li>✅ {language === 'fa' ? 'گارانتی' : 'Warranty'}</li>
                </ul>
              </motion.div>

            </div>

            {/* Models */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-card rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {language === 'fa' ? 'مدل‌های تحت پوشش' : 'Supported Models'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-secondary rounded-xl">
                  <div className="font-bold text-foreground">PS5 Fat</div>
                  <div className="text-sm text-foreground">2019-2022</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-xl">
                  <div className="font-bold text-foreground">PS5 Slim</div>
                  <div className="text-sm text-foreground">2023+</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-xl">
                  <div className="font-bold text-foreground">PS5 Digital</div>
                  <div className="text-sm text-foreground">بدون دیسک</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-xl">
                  <div className="font-bold text-foreground">DualSense</div>
                  <div className="text-sm text-foreground">همه نسخه‌ها</div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {language === 'fa' ? 'درخواست تعمیر PS5' : 'Request PS5 Repair'}
              </h2>
              <p className="text-foreground mb-6">
                {language === 'fa'
                  ? 'عیب‌یابی رایگان | تعمیر در 24-48 ساعت | گارانتی 90 روزه'
                  : 'Free diagnosis | 24-48h repair | 90-day warranty'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:02166745916" className="btn-gold">
                  📞 {language === 'fa' ? 'تماس: 021-66745916' : 'Call: 021-66745916'}
                </a>
                <a href="/contact" className="btn-outline">
                  {language === 'fa' ? 'فرم درخواست' : 'Request Form'}
                </a>
              </div>
            </motion.div>

          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default PS5RepairPage;
