import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ProcessStepsSchema from '@/components/ProcessStepsSchema';
import ServiceSchema from '@/components/ServiceSchema';
import ImageObjectSchema from '@/components/ImageObjectSchema';
import { motion } from 'framer-motion';
import pageBg from '@/assets/page-bg.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const AirPodsRepairPage = () => {
  const { t, language } = useLanguage();

  return (
    <HelmetProvider>
      <SEO 
        title={language === 'fa' 
          ? "تعمیر ایرپاد تهران | تعمیرات تخصصی ایرپاد پرو 2، ایرپاد 4 با گارانتی - آرمان همراه"
          : "AirPods Repair Tehran | Professional AirPods Pro 2, AirPods 4 Repair"}
        description={language === 'fa'
          ? "تعمیر ایرپاد در تهران | مرکز تخصصی تعمیرات ایرپاد پرو 2، ایرپاد 4، ایرپاد مکس، تعویض باتری، تعمیر کیس شارژ با قطعات اورجینال و گارانتی 3 ماهه در خیابان مطهری"
          : "AirPods repair in Tehran | Expert repair of AirPods Pro 2, AirPods 4, AirPods Max, battery replacement, charging case repair with original parts"}
        keywords={language === 'fa'
          ? "تعمیر ایرپاد, تعمیرات ایرپاد تهران, تعمیر ایرپاد پرو 2, تعمیر ایرپاد 4, تعمیر ایرپاد مکس, تعویض باتری ایرپاد, تعمیر کیس ایرپاد, تعمیرات ایرپاد مطهری, قیمت تعمیر ایرپاد"
          : "airpods repair tehran, airpods pro 2 repair, airpods 4 repair, airpods max repair, airpods battery replacement"}
        url="https://armanhamrah.com/repair/airpods"
      />
      <ProcessStepsSchema 
        name={language === 'fa' ? 'فرآیند تعمیر در آرمان همراه' : 'Repair Process at Arman Hamrah'}
        steps={[
          { text: language === 'fa' ? 'پذیرش رایگان و ثبت سفارش با کد پیگیری' : 'Free acceptance and order registration with tracking code' },
          { text: language === 'fa' ? 'عیب‌یابی دقیق با میکروسکوپ و تسترهای پیشرفته' : 'Accurate diagnosis with microscope and advanced testers' },
          { text: language === 'fa' ? 'اعلام قیمت شفاف و تایید مشتری' : 'Transparent price announcement and customer confirmation' },
          { text: language === 'fa' ? 'تعمیر تخصصی با ابزار دقیق و تحویل با گارانتی' : 'Specialized repair with precise tools and delivery with warranty' }
        ]}
      />
      <ImageObjectSchema url="https://armanhamrah.com/images/repairs/airpods-repair-1.jpg" caption="تعمیر تخصصی ایرپاد پرو 2 در آرمان همراه" width={1200} height={630} />
      <ServiceSchema 
        name={language === 'fa' ? 'تعمیرات تخصصی ایرپاد آرمان همراه' : 'Arman Hamrah AirPods Repair Service'}
        description={language === 'fa' ? 'مرکز تخصصی تعمیرات ایرپاد با قطعات اورجینال و گارانتی 3 ماهه. تعمیر ایرپاد پرو 2، ایرپاد 4، ایرپاد مکس و کیس شارژ در تهران.' : 'Specialized AirPods repair center with original parts and 3-month warranty. AirPods Pro 2, AirPods 4, AirPods Max and charging case repair in Tehran.'}
        serviceType="تعمیر ایرپاد"
        provider="آرمان همراه ارتباطات آریا"
        offers={[
          { name: "تعمیر ایرپاد با گارانتی 3 ماهه", price: "بسته به مدل", priceCurrency: "IRR" },
          { name: "عیب‌یابی رایگان", price: "رایگان", priceCurrency: "IRR" }
        ]}
      />
      <FAQSchema />
      <BreadcrumbSchema />
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
                {language === 'fa' ? '✅ عیب‌یابی رایگان در کمتر از ۱۵ دقیقه با میکروسکوپ و ابزار دقیق. قطعات ۱۰۰٪ اورجینال با گارانتی کتبی. همین حالا تماس بگیرید یا فرم درخواست بفرستید.' : '✅ Free diagnosis in under 15 minutes with microscope and precise tools. 100% original parts with written warranty. Call now or submit a request form.'}
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

            {/* Internal Links for AEO */}
            <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
              <a href="/repair/ps5" className="text-sm text-primary hover:underline font-semibold">{language === 'fa' ? 'تعمیر PS5 و دسته DualSense →' : 'PS5 & DualSense Repair →'}</a>
              <a href="/repair/airpods" className="text-sm text-primary hover:underline font-semibold">{language === 'fa' ? 'تعمیر ایرپاد و هدفون →' : 'AirPods & Headphone Repair →'}</a>
              <a href="/warranty/repairs" className="text-sm text-primary hover:underline font-semibold">{language === 'fa' ? 'شرایط گارانتی تعمیرات →' : 'Repair Warranty Terms →'}</a>
            </div>

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
                  ? 'تماس بگیرید یا به مرکز خدمات پس از فروش ما در خیابان مطهری مراجعه کنید'
                  : 'Call us or visit our after-sales center on Motahari St'}
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
