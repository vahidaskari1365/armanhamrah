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
import { representativesData } from '@/data/representatives';

const RepresentativesPageContent = () => {
  const { language, t } = useLanguage();
  const { isAdmin } = useAdmin();

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
              <p className="text-lg text-foreground max-w-2xl">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {representativesData.map((rep, index) => (
                <motion.div
                  key={rep.id || index}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="card-premium group relative"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Store className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{rep.name}</h3>
                      <span className="text-sm text-foreground font-medium">{rep.province} - {rep.city}</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <a href={`tel:${rep.phone.replace(/-/g, '')}`} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span dir="ltr">{language === 'fa' ? rep.phone.replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]) : rep.phone}</span>
                    </a>
                    <div className="flex items-start gap-2 text-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed font-medium">{rep.address}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
                            <p className="text-foreground leading-relaxed">
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
