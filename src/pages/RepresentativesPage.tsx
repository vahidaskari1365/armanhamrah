import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, HeadphonesIcon, TrendingUp, Store, MapPin, Phone, PlusCircle, Edit, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import { useAdmin } from '@/contexts/AdminContext';
import { supabase } from '@/integrations/supabase/client';

interface Representative {
  id?: number;
  name: string;
  province: string;
  city: string;
  phone: string;
  address: string;
}

const representativeTranslations: { [key: string]: Partial<Representative> } = {
  'فروشگاه خانه موبایل-تهران': {
    name: 'Mobile House Store',
    province: 'Tehran',
    city: 'Tehran',
    address: 'Phase 3, Ekbatan Town, Kourosh Shopping Center, Ground Floor, No. 1',
  },
  'فروشگاه موبایل کلاسیک-تهران': {
    name: 'Classic Mobile Store',
    province: 'Tehran',
    city: 'Tehran',
    address: 'Hafez St., Iran Mobile Market, Ground Floor, No. 236',
  },
  'فروشگاه پرشین موبایل-تهران': {
    name: 'Persian Mobile Store',
    province: 'Tehran',
    city: 'Tehran',
    address: 'Jomhouri St., Alaeddin Passage, First Floor, No. 154',
  },
  'فروشگاه موبایل پایتخت-تهران': {
    name: 'Paytakht Mobile Store',
    province: 'Tehran',
    city: 'Tehran',
    address: 'Valiasr St., Mirdamad intersection, Paytakht Computer Complex, First floor, Unit 101',
  },
  'فروشگاه دنیای موبایل-اصفهان': {
    name: 'Mobile World Store',
    province: 'Isfahan',
    city: 'Isfahan',
    address: 'Ferdowsi St., Isfahan Mobile Passage, Second Floor, Unit 205',
  },
  'فروشگاه دنیای موبایل-شیراز': {
    name: 'Mobile World Store',
    province: 'Shiraz',
    city: 'Shiraz',
    address: 'Mulla Sadra St., Pars Shopping Center, First Floor, No. 110',
  },
  'فروشگاه عصر ارتباط-مشهد': {
    name: 'Asr Ertebat Store',
    province: 'Mashhad',
    city: 'Mashhad',
    address: 'Ahmadabad Blvd., Mashhad Mobile Passage, Third Floor, No. 301',
  },
  'فروشگاه موبایل آنلاین-تبریز': {
    name: 'Mobile Online Store',
    province: 'Tabriz',
    city: 'Tabriz',
    address: 'Shariati St., Tabriz Mobile Passage, Ground Floor, No. 50',
  },
};


const RepresentativesPageContent = () => {
  const { language, t } = useLanguage();
  const { isAdmin } = useAdmin();
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepresentatives = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('representatives')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching representatives:', error);
      } else if (data) {
          if (language === 'en') {
              const translatedData = data.map(rep => {
                  const translationKey = `${rep.name}-${rep.city}`;
                  const translation = representativeTranslations[translationKey];
                  if (translation) {
                      return { ...rep, ...translation };
                  }
                  return rep;
              });
              setRepresentatives(translatedData);
          } else {
              setRepresentatives(data);
          }
      }
      setIsLoading(false);
    };

    fetchRepresentatives();
  }, [language]);

  const benefits = [
    { key: 'representatives.benefits.1', icon: Award },
    { key: 'representatives.benefits.2', icon: TrendingUp },
    { key: 'representatives.benefits.3', icon: HeadphonesIcon },
  ];

  return (
    <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-hero py-16">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('representatives.hero.title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t('representatives.hero.description')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-gradient-premium">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('representatives.list.title')}
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
            </motion.div>

            {isAdmin && (
              <div className="text-center mb-8">
                <button className="btn-primary inline-flex items-center gap-2">
                  <PlusCircle size={20} />
                  {t('representatives.add_button')}
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="text-center text-muted-foreground">{t('representatives.loading')}</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {representatives.map((rep, index) => (
                  <motion.div
                    key={rep.id || index}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="card-premium group relative"
                  >
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"><Edit size={16} /></button>
                        <button className="w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                      </div>
                    )}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Store className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{rep.name}</h3>
                        <span className="text-sm text-muted-foreground">{rep.province} - {rep.city}</span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <a href={`tel:${rep.phone.replace(/-/g, '')}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors" dir="ltr">
                        <Phone className="w-4 h-4" />
                        {rep.phone}
                      </a>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{rep.address}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section-padding">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        {t('representatives.benefits.title')}
                    </h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary"></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit) => (
                        <div key={benefit.key} className="card-premium group">
                            <div className="w-14 h-14 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                <benefit.icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {t(`${benefit.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t(`${benefit.key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

const RepresentativesPage = () => {
  const { t } = useLanguage();
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title={t('representatives.seo.title')}
            description={t('representatives.seo.description')}
          />
          <RepresentativesPageContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default RepresentativesPage;
