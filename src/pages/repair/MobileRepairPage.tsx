import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import { motion } from 'framer-motion';
import pageBg from '@/assets/page-bg.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const MobileRepairPage = () => {
  const { t, language } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": language === 'fa' 
      ? "تعمیرات موبایل آرمان همراه - علاءالدین تهران" 
      : "Mobile Repair Center - Arman Hamrah Aladdin Tehran",
    "description": language === 'fa'
      ? "تعمیر گوشی در تهران | تعمیرات موبایل در پاساژ علاءالدین | تعویض ال سی دی | باتری | برد با قطعات اورجینال"
      : "Mobile repair in Tehran | Aladdin Passage repair | LCD replacement | Battery | Board with original parts",
    "url": "https://armanhamrah.com/repair/mobile",
    "telephone": "+982166745916",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "خیابان جمهوری، پاساژ علاءالدین، طبقه ششم، پلاک 614",
      "addressLocality": "تهران",
      "addressCountry": "IR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.6892",
      "longitude": "51.3890"
    },
    "openingHours": "Sa-Th 09:00-18:00",
    "priceRange": "$$",
    "serviceType": language === 'fa' 
      ? "تعمیرات تخصصی موبایل" 
      : "Professional Mobile Repair"
  };

  return (
    <HelmetProvider>
      <SEO 
        title={language === 'fa' 
          ? "تعمیرات موبایل تهران | تعمیر گوشی در پاساژ علاءالدین با گارانتی - آرمان همراه"
          : "Tehran Mobile Repair | iPhone Samsung Xiaomi Repair at Aladdin Passage"}
        description={language === 'fa'
          ? "تعمیر موبایل در تهران | مرکز تخصصی تعمیرات گوشی در پاساژ علاءالدین | تعویض ال سی دی آیفون، سامسونگ، شیائومی | تعمیر برد | باتری اصل با گارانتی 3 ماهه"
          : "Mobile repair in Tehran | Expert phone repair at Aladdin Passage | iPhone, Samsung, Xiaomi LCD replacement | Board repair | Original battery with 3-month warranty'}
        keywords={language === 'fa'
          ? "تعمیرات موبایل تهران, تعمیر گوشی علاءالدین, تعمیر موبایل جمهوری, تعویض ال سی دی تهران, تعمیر آیفون تهران, تعمیر سامسونگ تهران, تعمیر شیائومی تهران, مرکز تعمیرات موبایل"
          : "mobile repair tehran, phone repair aladdin, iphone repair tehran, samsung repair tehran, xiaomi repair tehran, lcd replacement tehran"}
        url="https://armanhamrah.com/repair/mobile"
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
                {language === 'fa' ? 'تعمیرات موبایل تهران' : 'Tehran Mobile Repair'}
              </h1>
              <p className="text-lg text-primary font-semibold mb-4">
                {language === 'fa' ? '📍 پاساژ علاءالدین' : '📍 Aladdin Passage'}
              </p>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary mb-6" />
              <p className="text-lg text-foreground max-w-3xl mx-auto">
                {language === 'fa'
                  ? 'مرکز تخصصی تعمیرات موبایل در تهران | آیفون | سامسونگ | شیائومی | تعویض ال سی دی | باتری | برد | گارانتی 3 ماهه'
                  : 'Expert mobile repair center in Tehran | iPhone | Samsung | Xiaomi | LCD | Battery | Board | 3-month warranty'}
              </p>
            </motion.div>

            {/* Brands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              {['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Poco', 'Nokia'].map((brand) => (
                <div key={brand} className="px-6 py-3 bg-card rounded-xl">
                  <span className="font-bold text-foreground">{brand}</span>
                </div>
              ))}
            </motion.div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              
              {/* iPhone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🍎</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر آیفون' : 'iPhone Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر تخصصی تمام مدل‌های آیفون از 11 تا 17 پرو مکس'
                    : 'Professional repair for all iPhone models from 11 to 17 Pro Max'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض ال سی دی' : 'LCD replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعویض باتری' : 'Battery replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر برد' : 'Board repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر آبخوردگی' : 'Water damage repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعویض گلس' : 'Glass replacement'}</li>
                </ul>
              </motion.div>

              {/* Samsung */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">📱</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر سامسونگ' : 'Samsung Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر گلکسی S25 Ultra، S24 Ultra، A56، Z Fold، Z Flip'
                    : 'Galaxy S25 Ultra, S24 Ultra, A56, Z Fold, Z Flip repair'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض ال سی دی' : 'LCD replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر قلم S Pen' : 'S Pen repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعویض باتری' : 'Battery replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر زد فولد' : 'Z Fold repair'}</li>
                </ul>
              </motion.div>

              {/* Xiaomi */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">📲</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر شیائومی' : 'Xiaomi Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر شیائومی 15T، ردمی نوت 14 پرو، پوکو C85، M7'
                    : 'Xiaomi 15T, Redmi Note 14 Pro, Poco C85, M7 repair'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض ال سی دی' : 'LCD replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعویض باتری' : 'Battery replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر برد' : 'Board repair'}</li>
                </ul>
              </motion.div>

              {/* LCD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🖥️</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعویض ال سی دی' : 'LCD Replacement'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعویض ال سی دی اورجینال و OEM با گارانتی'
                    : 'Original and OEM LCD replacement with warranty'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'ال سی دی اورجینال' : 'Original LCD'}</li>
                  <li>✅ {language === 'fa' ? 'گلس اصلی' : 'Original glass'}</li>
                  <li>✅ {language === 'fa' ? 'تاچ اورجینال' : 'Original touch'}</li>
                </ul>
              </motion.div>

              {/* Battery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🔋</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعویض باتری' : 'Battery Replacement'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'باتری اصلی با ظرفیت واقعی و گارانتی 3 ماهه'
                    : 'Original battery with real capacity and 3-month warranty'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'باتری اورجینال' : 'Original battery'}</li>
                  <li>✅ {language === 'fa' ? 'تست ظرفیت' : 'Capacity test'}</li>
                  <li>✅ {language === 'fa' ? 'گارانتی' : 'Warranty'}</li>
                </ul>
              </motion.div>

              {/* Board */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🔧</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر برد' : 'Board Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر تخصصی برد با دستگاه BGA و میکروسکوپ'
                    : 'Professional board repair with BGA machine and microscope'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'BGA Reballing' : 'BGA Reballing'}</li>
                  <li>✅ {language === 'fa' ? 'IC تعویض' : 'IC replacement'}</li>
                  <li>✅ {language === 'fa' ? 'میکروسکوپ' : 'Microscope'}</li>
                </ul>
              </motion.div>

            </div>

            {/* Popular Models */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-card rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {language === 'fa' ? 'مدل‌های پرتقاضا' : 'Popular Models'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'iPhone 17 Pro Max',
                  'iPhone 16 Pro',
                  'Galaxy S25 Ultra',
                  'Galaxy S24 Ultra',
                  'Xiaomi 15T',
                  'Redmi Note 14 Pro',
                  'Galaxy A56',
                  'Poco M7'
                ].map((model) => (
                  <div key={model} className="text-center p-3 bg-secondary rounded-xl">
                    <span className="text-sm text-foreground">{model}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why Aladdin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {language === 'fa' ? 'چرا تعمیرات علاءالدین؟' : 'Why Aladdin Repair?'}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">📍</div>
                  <h3 className="font-bold text-foreground mb-2">
                    {language === 'fa' ? 'موقعیت مرکزی' : 'Central Location'}
                  </h3>
                  <p className="text-sm text-foreground">
                    {language === 'fa'
                      ? 'پاساژ علاءالدین در خیابان جمهوری'
                      : 'Aladdin Passage on Jomhouri Street'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h3 className="font-bold text-foreground mb-2">
                    {language === 'fa' ? 'گارانتی' : 'Warranty'}
                  </h3>
                  <p className="text-sm text-foreground">
                    {language === 'fa'
                      ? 'گارانتی 3 ماهه روی تمام تعمیرات'
                      : '3-month warranty on all repairs'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-bold text-foreground mb-2">
                    {language === 'fa' ? 'تعمیر سریع' : 'Fast Repair'}
                  </h3>
                  <p className="text-sm text-foreground">
                    {language === 'fa'
                      ? '1 تا 72 ساعت بسته به نوع تعمیر'
                      : '1 to 72 hours depending on repair type'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {language === 'fa' ? 'درخواست تعمیر موبایل' : 'Request Mobile Repair'}
              </h2>
              <p className="text-foreground mb-6">
                {language === 'fa'
                  ? 'عیب‌یابی رایگان | قطعات اورجینال | گارانتی 3 ماهه'
                  : 'Free diagnosis | Original parts | 3-month warranty'}
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

export default MobileRepairPage;
