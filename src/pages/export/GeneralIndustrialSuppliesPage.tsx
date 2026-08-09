
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
    id: 'polyethylene-jar',
    name: { 
      fa: 'جار، پلی اتیلنی بدون در بدون دسته شفاف درجه یک', 
      en: 'Premium Transparent Polyethylene Jar, No Lid, No Handle' 
    },
    description: { 
      fa: 'جار پلی اتیلنی شفاف و باکیفیت، مناسب برای بسته‌بندی و نگهداری انواع محصولات صنعتی و غذایی.', 
      en: 'High-quality transparent polyethylene jar, suitable for packaging and storing various industrial and food products.' 
    },
    image: '/images/products/export-1.jpeg',
    specs: [
      { key: { fa: 'شکل', en: 'Shape' }, value: { fa: 'چندضلعی', en: 'Polygonal' } },
      { key: { fa: 'ظرفیت', en: 'Capacity' }, value: '12 kg' },
      { key: { fa: 'بسته‌بندی', en: 'Packaging' }, value: { fa: 'بسته بندی پلاستیکی تکی', en: 'Single plastic packaging' } },
    ],
  }
];

const GeneralIndustrialSuppliesPageContent = () => {
  const { language, direction } = useLanguage();

  const pageTitle = language === 'fa' ? 'ملزومات عمومی صنایع' : 'General Industrial Supplies';
  const pageDescription = language === 'fa' ? 'طیف گسترده‌ای از ملزومات عمومی برای صنایع مختلف.' : 'A wide range of general supplies for various industries.';

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
            <div className="max-w-5xl mx-auto space-y-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium p-6 sm:p-8 grid md:grid-cols-2 gap-8 items-center"
                >
                  <div className="w-full h-64 bg-secondary/50 rounded-xl flex items-center justify-center p-4">
                     <img src={product.image} alt={product.name[language]} className="max-w-full max-h-full object-contain" loading="lazy" decoding="async" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">{product.name[language]}</h3>
                    <p className="text-muted-foreground text-base mb-4">{product.description[language]}</p>
                    {product.specs.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-border space-y-3">
                        {product.specs.map((spec, specIndex) => (
                          <div key={specIndex} className="flex justify-between items-center text-base">
                            <span className="font-semibold text-foreground">{spec.key[language]}:</span>
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

const GeneralIndustrialSuppliesPage = () => {
  const { language } = useLanguage();
  const title = language === 'fa' ? 'ملزومات عمومی صنایع | آرمان همراه': 'General Industrial Supplies | Arman Hamrah';
  const description = language === 'fa' ? 'صادرات انواع ملزومات عمومی مورد نیاز صنایع مختلف.' : 'Export of various general supplies required by different industries.';

  return (
    <HelmetProvider>
      <SEO 
        title={title}
        description={description}
      />
      <GeneralIndustrialSuppliesPageContent />
    </HelmetProvider>
  );
};

export default GeneralIndustrialSuppliesPage;
