
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const products = [
  {
    id: 'shrink-film-3-layer',
    name: { 
      fa: 'فیلم شیرینگ ۳ لایه لوله ای چاپ نشده', 
      en: '3-Layer Unprinted Tubular Shrink Film' 
    },
    description: { 
      fa: 'فیلم شیرینگ سه لایه با کیفیت بالا، مناسب برای بسته‌بندی‌های صنعتی و محافظت قوی از محصولات.', 
      en: 'High-quality three-layer shrink film, suitable for industrial packaging and strong product protection.' 
    },
    specs: [
      { key: { fa: 'جنس', en: 'Material' }, value: 'LLDPE/HDPE/LLDPE' },
      { key: { fa: 'ابعاد', en: 'Dimensions' }, value: { fa: 'عرض ۱۰۰ سانتی‌متر، طول ۱۴۰ متر', en: 'Width 100cm, Length 140m' } },
      { key: { fa: 'قابلیت بازیافت', en: 'Recyclability' }, value: { fa: 'قابل بازیافت، غیر زیست تخریب‌پذیر', en: 'Recyclable, Non-biodegradable' } },
      { key: { fa: 'بسته‌بندی', en: 'Packaging' }, value: { fa: 'رولی', en: 'Roll' } },
    ],
  },
  {
    id: 'shrink-film-1-layer',
    name: { 
      fa: 'فیلم معمولی تک لایه لوله ای چاپ نشده', 
      en: 'Single-Layer Unprinted Tubular Film' 
    },
    description: { 
      fa: 'فیلم شیرینگ تک لایه اقتصادی، ایده‌آل برای کاربردهای عمومی بسته‌بندی که نیاز به محافظت کمتری دارند.', 
      en: 'Economical single-layer shrink film, ideal for general packaging applications with lower protection needs.' 
    },
    specs: [
      { key: { fa: 'جنس', en: 'Material' }, value: 'LLDPE/HDPE/LLDPE' },
      { key: { fa: 'ابعاد', en: 'Dimensions' }, value: { fa: 'عرض ۱۵۰ سانتی‌متر، طول ۱۴۰ متر', en: 'Width 150cm, Length 140m' } },
      { key: { fa: 'قابلیت بازیافت', en: 'Recyclability' }, value: { fa: 'قابل بازیافت، غیر زیست تخریب‌پذیر', en: 'Recyclable, Non-biodegradable' } },
      { key: { fa: 'بسته‌بندی', en: 'Packaging' }, value: { fa: 'رول', en: 'Roll' } },
    ],
  },
  {
    id: 'pe-container',
    name: { 
      fa: 'ظرف یکبار مصرف پلی اتیلنی', 
      en: 'Polyethylene Disposable Container' 
    },
    description: { 
      fa: 'ظرف یکبار مصرف برای نگهداری مواد غذایی، ساخته شده از پلی اتیلن، بدون در.', 
      en: 'Disposable container for food storage, made of polyethylene, without a lid.' 
    },
    specs: [
        { key: { fa: 'وزن', en: 'Weight' }, value: '110 g' },
    ],
  },
  {
    id: 'pp-container',
    name: { 
      fa: 'ظرف یکبار مصرف پلی پروپیلنی', 
      en: 'Polypropylene Disposable Container' 
    },
    description: { 
      fa: 'ظرف یکبار مصرف برای نگهداری مواد غذایی، ساخته شده از پلی پروپیلن، بدون در.', 
      en: 'Disposable container for food storage, made of polypropylene, without a lid.' 
    },
    specs: [
      { key: { fa: 'سایز', en: 'Size' }, value: '20 cm' },
      { key: { fa: 'وزن', en: 'Weight' }, value: '50 g' },
    ],
  },
  {
    id: 'handled-bag',
    name: {
      fa: 'کیسه دسته دار',
      en: 'Handled Bag'
    },
    description: {
      fa: 'کیسه پلاستیکی دسته دار تولید شده از پلی اتیلن، مناسب برای فروشگاه‌ها و مصارف عمومی.',
      en: 'Polyethylene handled plastic bag, suitable for retail stores and general use.'
    },
    specs: [
      { key: { fa: 'جنس', en: 'Material' }, value: { fa: 'پلی اتیلن', en: 'Polyethylene' } },
      { key: { fa: 'سایز', en: 'Size' }, value: '40*30 cm' },
      { key: { fa: 'نوع دسته', en: 'Handle Type' }, value: { fa: 'رکابی', en: 'Vest-type' } },
      { key: { fa: 'بسته‌بندی', en: 'Packaging' }, value: { fa: 'کیسه پلاستیکی', en: 'Plastic bag' } },
    ],
  }
];

const PetrochemicalDownstreamPageContent = () => {
  const { language, direction } = useLanguage();

  const pageTitle = language === 'fa' ? 'صنایع پایین دست پتروشیمی' : 'Petrochemical Downstream Industries';
  const pageDescription = language === 'fa' ? 'محصولات متنوع ما در زمینه صنایع پایین دست پتروشیمی را کاوش کنید.' : 'Explore our diverse products in the petrochemical downstream industries.';

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={direction}>
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-hero py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/export" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                <ArrowRight size={20} />
                {language === 'fa' ? 'بازگشت به صادرات' : 'Back to Export'}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {pageTitle}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {pageDescription}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto space-y-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium p-6"
                >
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-foreground mb-2">{product.name[language]}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.description[language]}</p>
                    {product.specs.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border space-y-2">
                        {product.specs.map((spec, specIndex) => (
                          <div key={specIndex} className="flex justify-between items-center text-sm">
                            <span className="font-medium text-foreground">{spec.key[language]}:</span>
                            <span className="text-muted-foreground">{typeof spec.value === 'string' ? spec.value : spec.value[language]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

const PetrochemicalDownstreamPage = () => {
  const { language } = useLanguage();
  const title = language === 'fa' ? 'محصولات پایین دستی پتروشیمی | آرمان همراه': 'Petrochemical Downstream Products | Arman Hamrah';
  const description = language === 'fa' ? 'لیست محصولات صنایع پایین دستی پتروشیمی برای صادرات، شامل انواع فیلم شیرینگ، ظروف یکبار مصرف و کیسه های پلاستیکی.' : 'List of petrochemical downstream industry products for export, including types of shrink film, disposable containers, and plastic bags.';

  return (
    <HelmetProvider>
      <SEO 
        title={title}
        description={description}
      />
      <PetrochemicalDownstreamPageContent />
    </HelmetProvider>
  );
};

export default PetrochemicalDownstreamPage;
