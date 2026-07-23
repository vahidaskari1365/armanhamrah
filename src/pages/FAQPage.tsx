import { HelmetProvider } from 'react-helmet-async';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import { motion } from 'framer-motion';
import pageBg from '@/assets/page-bg.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';

const faqs = [
  {
    q: "هزینه تعمیرات موبایل در آرمان همراه چقدر است؟",
    a: "هزینه تعمیرات بستگی به مدل گوشی و نوع خرابی دارد. عیب‌یابی در آرمان همراه رایگان است و قبل از هر تعمیر، قیمت دقیق به شما اعلام می‌شود. برای استعلام قیمت می‌توانید با ما تماس بگیرید."
  },
  {
    q: "آیا تعمیرات آرمان همراه گارانتی دارد؟",
    a: "بله، تمام تعمیرات آرمان همراه دارای گارانتی ۱۸ ماهه است. همچنین قطعات مصرفی مانند باتری و LCD دارای گارانتی ۳ ماهه هستند."
  },
  {
    q: "تعمیر PS5 چقدر طول می‌کشد؟",
    a: "بسته به نوع خرابی، تعمیر PS5 معمولاً بین ۱ تا ۳ روز کاری زمان می‌برد. عیب‌یابی اولیه رایگان است و پس از تشخیص، زمان تقریبی تعمیر به شما اعلام می‌شود."
  },
  {
    q: "آیا قطعات تعمیرات اورجینال هستند؟",
    a: "بله، آرمان همراه از قطعات اورجینال و با کیفیت برای تعمیرات استفاده می‌کند. تمام قطعات دارای گارانتی اصالت هستند."
  },
  {
    q: "آدرس مرکز تعمیرات آرمان همراه کجاست؟",
    a: "مرکز تعمیرات آرمان همراه در تهران، تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۲، واحد ۲۰۴ قرار دارد. ساعات کاری: شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر."
  },
  {
    q: "آیا امکان تعمیر ایرپاد پرو 2 وجود دارد؟",
    a: "بله، آرمان همراه تخصص ویژه‌ای در تعمیر انواع ایرپاد از جمله ایرپاد پرو ۲، ایرپاد مکس، ایرپاد نسل ۳ و ۴ دارد. تعویض باتری، تعمیر اسپیکر و تعمیرات آبخوردگی انجام می‌شود."
  },
  {
    q: "ساعت هوشمند اپل واچ را تعمیر می‌کنید؟",
    a: "بله، تعمیرات انواع اپل واچ شامل تعویض باتری، تعویض صفحه نمایش، تعمیر آبخوردگی، تعویض قاب و تعمیر دکمه‌ها در آرمان همراه انجام می‌شود."
  },
  {
    q: "تعمیرات سرفیس و تبلت مایکروسافت هم انجام می‌دهید؟",
    a: "بله، علاوه بر موبایل و PS5، آرمان همراه خدمات تعمیرات تبلت و سرفیس مایکروسافت را نیز ارائه می‌دهد."
  },
  {
    q: "آیا امکان تعویض باتری گوشی وجود دارد؟",
    a: "بله، تعویض باتری اصلی برای تمام مدل‌های آیفون، سامسونگ، شیائومی و سایر برندها با گارانتی ۳ ماهه انجام می‌شود."
  },
  {
    q: "تعمیرات گلکسی بادز و هدفون بلوتوثی انجام می‌شود؟",
    a: "بله، آرمان همراه تعمیرات انواع هدفون بی‌سیم شامل گلکسی بادز پرو، گلکسی بادز ۳ پرو، هدفون‌های انکر، سونی و بوز را انجام می‌دهد."
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-card/80 transition-colors text-right"
      >
        <span className="font-semibold text-foreground">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-6 py-4 bg-secondary/50 border-t border-border"
        >
          <p className="text-foreground leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const FAQPage = () => {
  const { t } = useLanguage();

  return (
    <HelmetProvider>
      <SEO
        title="سوالات متداول | آرمان همراه - مرکز تخصصی تعمیرات"
        description="پاسخ سوالات متداول درباره تعمیرات موبایل، PS5، ایرپاد، ساعت هوشمند و اسپیکر در آرمان همراه. عیب‌یابی رایگان، گارانتی ۱۸ ماهه."
        keywords="سوالات متداول تعمیرات, FAQ تعمیرات موبایل, قیمت تعمیرات, گارانتی تعمیرات"
        url="https://armanhamrah.com/faq"
      />
      <FAQSchema />
      <div className="page-background bg-background" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties}>
        <Navbar />
        <main className="min-h-screen section-padding pt-32">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                سوالات متداول
              </h1>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary mb-6" />
              <p className="text-lg text-foreground max-w-2xl mx-auto">
                پاسخ سوالات رایج درباره خدمات تعمیرات آرمان همراه
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12 p-8 bg-card rounded-2xl border border-border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                سوالی دارید؟
              </h2>
              <p className="text-foreground mb-6">
                برای مشاوره رایگان و استعلام قیمت با ما تماس بگیرید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:02166745916" className="btn-gold">
                  تماس با فروشگاه: ۰۲۱-۶۶۷۴۵۹۱۶
                </a>
                <a href="/contact" className="btn-outline">
                  فرم تماس
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

export default FAQPage;
