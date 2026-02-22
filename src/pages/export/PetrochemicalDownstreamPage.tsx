
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Layers, Recycle, Ruler } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';

const PetrochemicalDownstreamPage = () => {
  const { t, direction } = useLanguage();

  const product = {
    name: t('petrodownstream.title', 'صنایع پایین دست پتروشیمی'),
    subtitle: t('petrodownstream.subtitle', 'Petrochemical Downstream Industries'),
    category: t('export.products.category.petrochemical', 'پتروشیمی'),
    description: t('petrodownstream.description', 'تولید و صادرات انواع محصولات پلیمری و شیمیایی با کیفیت بالا.'),
    products: [
      {
        name: t('petrodownstream.product1.name', 'فیلم، شیرینک 3 لایه لوله ای چاپ نشده'),
        material: t('petrodownstream.product1.material', 'LLDPE/HDPE/LLDPE'),
        width: t('petrodownstream.product1.width', 'عرض: 100 cm'),
        length: t('petrodownstream.product1.length', 'طول: 140 m'),
        features: [
          {
            icon: Recycle,
            text: t('petrodownstream.product1.feature1', 'دارای قابلیت بازیافت'),
          },
        ],
      },
      {
        name: t('petrodownstream.product2.name', 'فیلم معمولی تک لایه لوله ایی'),
        material: t('petrodownstream.product2.material', 'LLDPE/HDPE/LLDPE'),
        width: t('petrodownstream.product2.width', 'عرض : 150 cm'),
        length: t('petrodownstream.product2.length', 'طول : 140 m'),
        features: [
          {
            icon: Recycle,
            text: t('petrodownstream.product2.feature1', 'دارای قابلیت بازیافت'),
          },
        ],
      },
    ],
  };

  return (
    <HelmetProvider>
      <SEO
        title={t('petrodownstream.seo.title', 'صادرات صنایع پایین دست پتروشیمی | آرمان همراه')}
        description={t('petrodownstream.seo.description', 'صادرات انواع محصولات پایین دست پتروشیمی از جمله فیلم‌های شیرینک سه لایه با کیفیت بالا و قابلیت بازیافت.')}
      />
      <div className="page-background" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={direction}>
        <Navbar />
        <main className="pt-20">
          <header className="bg-gradient-hero py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center text-muted-foreground mb-4">
                  <Link to="/export" className="hover:text-primary transition-colors">{t('nav.export', 'صادرات')}</Link>
                  <ChevronRight size={18} className="mx-1" />
                  <span>{product.name}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">{product.name}</h1>
                <p className="text-xl text-primary mt-2">{product.subtitle}</p>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{product.description}</p>
              </motion.div>
            </div>
          </header>

          <section className="section-padding">
            <div className="container-custom grid gap-8">
              {product.products.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                  className="card-premium p-8"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-6">{item.name}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Layers size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{t('general.material', 'جنس')}</p>
                        <p className="text-muted-foreground">{item.material}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Ruler size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{t('general.size', 'ابعاد')}</p>
                        <p className="text-muted-foreground">{item.width}</p>
                        <p className="text-muted-foreground">{item.length}</p>
                      </div>
                    </div>
                    {item.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-4">
                        <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                          <feature.icon size={24} className="text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">{feature.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default PetrochemicalDownstreamPage;
