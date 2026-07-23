import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import { motion } from 'framer-motion';
import pageBg from '@/assets/page-bg.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const AirPodsRepairPage = () => {
  const { t, language } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": language === 'fa' 
      ? "تعمیرات تخصصی ایرپاد آرمان همراه - تهران" 
      : "AirPods Repair Center - Arman Hamrah Tehran",
    "description": language === 'fa'
      ? "تعمیر تخصصی ایرپاد پرو 2، ایرپاد 4، ایرپاد مکس در تهران با قطعات اورجینال و گارانتی 3 ماهه"
      : "Professional AirPods Pro 2, AirPods 4, AirPods Max repair in Tehran with original parts",
    "url": "https://armanhamrah.com/repair/airpods",
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
    "priceRange": "$$",
    "serviceType": language === 'fa' 
      ? "تعمیرات تخصصی ایرپاد" 
      : "AirPods Repair Services"
  };

  return (
    <HelmetProvider>
      <SEO 
        title={language === 'fa' 
          ? "تعمیر ایرپاد تهران | تعمیرات تخصصی ایرپاد پرو 2، ایرپاد 4 با گارانتی - آرمان همراه"
          : "AirPods Repair Tehran | Professional AirPods Pro 2, AirPods 4 Repair"}
        description={language === 'fa'
          ? "تعمیر ایرپاد در تهران | مرکز تخصصی تعمیرات ایرپاد پرو 2، ایرپاد 4، ایرپاد مکس، تعویض باتری، تعمیر کیس شارژ با قطعات اورجینال و گارانتی 3 ماهه در پاساژ علاءالدین"
          : "AirPods repair in Tehran | Expert repair of AirPods Pro 2, AirPods 4, AirPods Max, battery replacement, charging case repair with original parts"}
        keywords={language === 'fa'
          ? "تعمیر ایرپاد, تعمیرات ایرپاد تهران, تعمیر ایرپاد پرو 2, تعمیر ایرپاد 4, تعمیر ایرپاد مکس, تعویض باتری ایرپاد, تعمیر کیس ایرپاد, تعمیرات ایرپاد علاءالدین, قیمت تعمیر ایرپاد"
          : "airpods repair tehran, airpods pro 2 repair, airpods 4 repair, airpods max repair, airpods battery replacement"}
        url="https://armanhamrah.com/repair/airpods"
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
                {language === 'fa' ? 'تعمیر ایرپاد تهران' : 'AirPods Repair Tehran'}
              </h1>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary mb-6" />
              <p className="text-lg text-foreground max-w-3xl mx-auto">
                {language === 'fa'
                  ? 'مرکز تخصصی تعمیرات ایرپاد در تهران | تعویض باتری | تعمیر کیس شارژ | ایرپاد پرو 2 | ایرپاد 4 | ایرپاد مکس با قطعات اورجینال و گارانتی 3 ماهه'
                  : 'Expert AirPods repair center in Tehran | Battery replacement | Charging case repair | AirPods Pro 2 | AirPods 4 | AirPods Max with original parts'}
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              
              {/* AirPods Pro 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🎧</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر ایرپاد پرو 2' : 'AirPods Pro 2 Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر تخصصی ایرپاد پرو 2 با تعویض باتری، تعمیر نویز کنسلینگ، میکروفون و بلوتوث'
                    : 'Professional AirPods Pro 2 repair: battery replacement, ANC repair, microphone and bluetooth'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض باتری' : 'Battery replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر نویز کنسلینگ' : 'ANC repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر میکروفون' : 'Microphone repair'}</li>
                </ul>
              </motion.div>

              {/* AirPods 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🎵</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر ایرپاد 4' : 'AirPods 4 Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر ایرپاد 4 ANC و نسخه معمولی با قطعات اورجینال'
                    : 'AirPods 4 ANC and standard version repair with original parts'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض باتری' : 'Battery replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر بلوتوث' : 'Bluetooth repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر اسپیکر' : 'Speaker repair'}</li>
                </ul>
              </motion.div>

              {/* AirPods Max */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🎶</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر ایرپاد مکس' : 'AirPods Max Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر تخصصی ایرپاد مکس شامل تعویض باتری، تعمیر هدبند و دیجیتاکرون'
                    : 'AirPods Max specialist repair: battery, headband, digital crown'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض باتری' : 'Battery replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر هدبند' : 'Headband repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر دیجیتاکرون' : 'Digital crown repair'}</li>
                </ul>
              </motion.div>

              {/* Charging Case */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🔋</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر کیس شارژ ایرپاد' : 'AirPods Charging Case Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر و تعویض کیس شارژ ایرپاد، پورت لایتنینگ و USB-C'
                    : 'AirPods charging case repair and replacement'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض کیس' : 'Case replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر پورت' : 'Port repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر LED' : 'LED repair'}</li>
                </ul>
              </motion.div>

              {/* Galaxy Buds */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">📱</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر گلکسی بادز' : 'Galaxy Buds Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر گلکسی بادز 3 پرو، گلکسی بادز 2، بادز پرو'
                    : 'Galaxy Buds 3 Pro, Buds 2, Buds Pro repair'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض باتری' : 'Battery replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر ANC' : 'ANC repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر بلوتوث' : 'Bluetooth repair'}</li>
                </ul>
              </motion.div>

              {/* Anker */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card-premium p-6"
              >
                <div className="text-4xl mb-4">🔊</div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {language === 'fa' ? 'تعمیر هدفون انکر' : 'Anker Headphones Repair'}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {language === 'fa'
                    ? 'تعمیر هدفون انکر R60i NC، R50i، Soundcore'
                    : 'Anker R60i NC, R50i, Soundcore repair'}
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ {language === 'fa' ? 'تعویض باتری' : 'Battery replacement'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر اسپیکر' : 'Speaker repair'}</li>
                  <li>✅ {language === 'fa' ? 'تعمیر بلوتوث' : 'Bluetooth repair'}</li>
                </ul>
              </motion.div>

            </div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-card rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {language === 'fa' ? 'چرا آرمان همراه؟' : 'Why Arman Hamrah?'}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-bold text-foreground mb-2">
                    {language === 'fa' ? 'تخصص ویژه' : 'Specialized Expertise'}
                  </h3>
                  <p className="text-sm text-foreground">
                    {language === 'fa'
                      ? '10 سال تجربه در تعمیرات ایرپاد و هدفون'
                      : '10 years experience in AirPods repair'}
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
                      ? 'تعمیر ایرپاد در کمتر از 24 ساعت'
                      : 'AirPods repair in less than 24 hours'}
                  </p>
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
                {language === 'fa' ? 'درخواست تعمیر ایرپاد' : 'Request AirPods Repair'}
              </h2>
              <p className="text-foreground mb-6">
                {language === 'fa'
                  ? 'تماس بگیرید یا به پاساژ علاءالدین مراجعه کنید'
                  : 'Call us or visit Aladdin Passage'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:02158798" className="btn-gold">
                  📞 {language === 'fa' ? 'تماس: 02158798' : 'Call: 02158798'}
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

export default AirPodsRepairPage;
