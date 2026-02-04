import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MessageCircle, Mail, Phone, MapPin, Factory, Shield, Award, FileCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BitumenContent = () => {
  const { language } = useLanguage();
  const isRTL = language === 'fa';
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  // Bitumen 60/70 specifications
  const bitumen6070 = [
    { characteristic: 'Penetration @25°C', unit: '0.1 mm', specification: '60-70', testMethod: 'ASTM D-5' },
    { characteristic: 'Specific gravity @25°C', unit: 'gr/cm³', specification: '1.01-10.060', testMethod: 'ASTM D-70' },
    { characteristic: 'Softening Point', unit: '°C', specification: '46-56', testMethod: 'ASTM D-36' },
    { characteristic: 'Ductility @ 25°C', unit: 'Cm', specification: '100 Min', testMethod: 'ASTM D-113' },
    { characteristic: 'Loss on heating', unit: '% wt', specification: '0.2 Max', testMethod: 'ASTM D-6' },
    { characteristic: 'Drop in Penetration after heating', unit: '%', specification: '20 Max', testMethod: 'ASTM D-6 & D-5' },
    { characteristic: 'Flash Point', unit: '°C', specification: '250 Min', testMethod: 'ASTM D-92' },
    { characteristic: 'Solubility in CS2', unit: '% wt', specification: '99.0 Min', testMethod: 'ASTM D-4' },
    { characteristic: 'Organic Matter insoluble in CS2', unit: '% wt', specification: '0.2 Max', testMethod: 'ASTM D-4' },
    { characteristic: 'Viscosity @ 60°C', unit: 'p', specification: '2000±400', testMethod: 'ASTM D-2171' },
    { characteristic: 'Spot Test', unit: '-', specification: 'Negative', testMethod: 'A.A.S.H.O.T.102' },
  ];

  // VG grades specifications
  const vgGrades = {
    VG10: [
      { spec: 'Penetration @25°C', method: 'IS23', result: '80' },
      { spec: 'Absolute Viscosity@60°C', method: 'IS1206', result: '800-1200' },
      { spec: 'Kinematic Viscosity@135°C', method: 'IS1206', result: '250' },
      { spec: 'Flash Point°C', method: 'IS1448', result: '220' },
      { spec: 'Solubility in CS2(wt)%', method: 'IS1216', result: 'Min 99' },
      { spec: 'Softening Point', method: 'IS1205', result: '40' },
      { spec: 'Spot Test', method: '-', result: 'NEGATIVE' },
      { spec: 'Viscosity Ratio @60°C', method: 'IS1206', result: '4' },
      { spec: 'Ductility@25°C cm/min', method: 'IS1208', result: '75' },
    ],
    VG20: [
      { spec: 'Penetration @25°C', method: 'IS23', result: '60' },
      { spec: 'Absolute Viscosity@60°C', method: 'IS1206', result: '1600-2400' },
      { spec: 'Kinematic Viscosity@135°C', method: 'IS1206', result: '300' },
      { spec: 'Flash Point°C', method: 'IS1448', result: '220' },
      { spec: 'Solubility in CS2(wt)%', method: 'IS1216', result: 'Min 99' },
      { spec: 'Softening Point', method: 'IS1205', result: '45' },
      { spec: 'Spot Test', method: '-', result: 'NEGATIVE' },
      { spec: 'Viscosity Ratio @60°C', method: 'IS1206', result: '4' },
      { spec: 'Ductility@25°C cm/min', method: 'IS1208', result: '50' },
    ],
    VG30: [
      { spec: 'Penetration @25°C', method: 'IS23', result: '45' },
      { spec: 'Absolute Viscosity@60°C', method: 'IS1206', result: '2400-3600' },
      { spec: 'Kinematic Viscosity@135°C', method: 'IS1206', result: '350' },
      { spec: 'Flash Point°C', method: 'IS1448', result: '220' },
      { spec: 'Solubility in CS2(wt)%', method: 'IS1216', result: 'Min 99' },
      { spec: 'Softening Point', method: 'IS1205', result: '47' },
      { spec: 'Spot Test', method: '-', result: 'NEGATIVE' },
      { spec: 'Viscosity Ratio @60°C', method: 'IS1206', result: '4' },
      { spec: 'Ductility@25°C cm/min', method: 'IS1208', result: '40' },
    ],
    VG40: [
      { spec: 'Penetration @25°C', method: 'IS23', result: '35' },
      { spec: 'Absolute Viscosity@60°C', method: 'IS1206', result: '3200-4800' },
      { spec: 'Kinematic Viscosity@135°C', method: 'IS1206', result: '400' },
      { spec: 'Flash Point°C', method: 'IS1448', result: '220' },
      { spec: 'Solubility in CS2(wt)%', method: 'IS1216', result: 'Min 99' },
      { spec: 'Softening Point', method: 'IS1205', result: '50' },
      { spec: 'Spot Test', method: '-', result: 'NEGATIVE' },
      { spec: 'Viscosity Ratio @60°C', method: 'IS1206', result: '4' },
      { spec: 'Ductility@25°C cm/min', method: 'IS1208', result: '25' },
    ],
  };

  const content = {
    fa: {
      backToExport: 'بازگشت به صادرات',
      title: 'قیر',
      subtitle: 'Bitumen',
      description: 'بهترین و با کیفیت‌ترین قیر در بازار ایران',
      descriptionEn: 'The best and highest quality bitumen in the IRAN market.',
      category: 'پتروشیمی',
      gradesTitle: 'گریدهای موجود',
      specsTitle: 'مشخصات فنی محصول',
      tableHeaders60_70: ['ویژگی', 'واحد', 'مشخصات', 'روش تست'],
      tableHeadersVG: ['مشخصات', 'روش تست', 'نتیجه'],
      features: [
        { icon: Factory, title: 'تولید پالایشگاهی', desc: 'تولید شده در پالایشگاه‌های معتبر ایران' },
        { icon: Shield, title: 'کیفیت تضمینی', desc: 'تضمین کیفیت با استانداردهای بین‌المللی' },
        { icon: Award, title: 'گواهینامه‌ها', desc: 'مطابق با استانداردهای ASTM' },
        { icon: FileCheck, title: 'مستندات کامل', desc: 'ارائه تمامی مدارک و سرتیفیکیت‌ها' },
      ],
      contactTitle: 'برای اطلاعات بیشتر با متخصصین ما تماس بگیرید',
      contactDesc: 'کارشناسان تجاری ما همواره در تلاش هستند تا راحتی کسب و کار شما را افزایش دهند.',
      contactBtn: 'شروع مکالمه',
      whatsapp: '+98 88 321 032',
      email: 'export@armanhamrah.com',
      address: 'واحد 304، طبقه 3، ساختمان امیر اتابک، خیابان سلیمان خاطر، خیابان مطهری، تهران',
    },
    en: {
      backToExport: 'Back to Export',
      title: 'Bitumen',
      subtitle: 'قیر',
      description: 'The best and highest quality bitumen in the IRAN market.',
      descriptionEn: 'بهترین و با کیفیت‌ترین قیر در بازار ایران',
      category: 'Petrochemical',
      gradesTitle: 'Available Grades',
      specsTitle: 'Product Specifications',
      tableHeaders60_70: ['Characteristics', 'Unit', 'Specification', 'Test Method'],
      tableHeadersVG: ['Specification', 'Test Method', 'Result'],
      features: [
        { icon: Factory, title: 'Refinery Production', desc: 'Produced in reputable Iranian refineries' },
        { icon: Shield, title: 'Guaranteed Quality', desc: 'Quality assurance with international standards' },
        { icon: Award, title: 'Certifications', desc: 'ASTM standards compliant' },
        { icon: FileCheck, title: 'Complete Documentation', desc: 'All documents and certificates provided' },
      ],
      contactTitle: 'For More Information Contact Our Specialist',
      contactDesc: 'Our commercial experts are always striving to enhance convenience for your business.',
      contactBtn: 'Start Conversation',
      whatsapp: '+98 88 321 032',
      email: 'export@armanhamrah.com',
      address: 'Unit 304, 3rd Floor, Amir Atabak Building, Soleyman Khater St, Motahari St, Tehran, IRAN',
    }
  };

  const t = content[language];
  const grades = ['60/70', 'VG10', 'VG20', 'VG30', 'VG40'];

  return (
    <div className={`page-background bg-background admin-toolbar-offset`} style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/export" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                <ArrowIcon size={20} />
                {t.backToExport}
              </Link>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-sm bg-primary/10 text-primary px-4 py-1 rounded-full mb-4 inline-block">
                    {t.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {t.title}
                  </h1>
                  <p className="text-xl text-primary mb-6" dir={isRTL ? 'ltr' : 'rtl'}>
                    {t.subtitle}
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t.description}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-3">{t.gradesTitle}:</p>
                    <div className="flex flex-wrap gap-2">
                      {grades.map((grade) => (
                        <span key={grade} className="text-sm bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                          {grade}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-8">
                    <img 
                      src="https://export.armanhamrah.com/uploads/products/bitumen.webp" 
                      alt="Bitumen"
                      className="w-full h-80 object-contain"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-gradient-premium">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <feature.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications with Tabs */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">{t.specsTitle}</h2>
              <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
            </motion.div>

            <Tabs defaultValue="60/70" className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
                {grades.map((grade) => (
                  <TabsTrigger 
                    key={grade} 
                    value={grade}
                    className="px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary text-foreground"
                  >
                    {grade}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="60/70">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="card-premium overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-primary/10">
                          {t.tableHeaders60_70.map((header, index) => (
                            <th key={index} className="px-6 py-4 text-foreground font-bold text-left">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bitumen6070.map((row, index) => (
                          <tr key={index} className="border-t border-border hover:bg-secondary/50 transition-colors">
                            <td className="px-6 py-4 text-foreground font-medium">{row.characteristic}</td>
                            <td className="px-6 py-4 text-muted-foreground">{row.unit}</td>
                            <td className="px-6 py-4 text-primary font-medium">{row.specification}</td>
                            <td className="px-6 py-4 text-muted-foreground">{row.testMethod}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </TabsContent>

              {Object.entries(vgGrades).map(([grade, specs]) => (
                <TabsContent key={grade} value={grade}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="card-premium overflow-hidden"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-primary/10">
                            {t.tableHeadersVG.map((header, index) => (
                              <th key={index} className="px-6 py-4 text-foreground font-bold text-left">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {specs.map((row, index) => (
                            <tr key={index} className="border-t border-border hover:bg-secondary/50 transition-colors">
                              <td className="px-6 py-4 text-foreground font-medium">{row.spec}</td>
                              <td className="px-6 py-4 text-muted-foreground">{row.method}</td>
                              <td className="px-6 py-4 text-primary font-medium">{row.result}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-gradient-premium">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-premium max-w-4xl mx-auto text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle size={40} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.contactTitle}</h2>
              <p className="text-muted-foreground mb-8">{t.contactDesc}</p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <a href={`https://wa.me/9888321032`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                  <Phone size={18} />
                  <span dir="ltr">{t.whatsapp}</span>
                </a>
                <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                  <Mail size={18} />
                  <span>{t.email}</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
                <MapPin size={18} />
                <span className="text-sm">{t.address}</span>
              </div>

              <a 
                href="https://wa.me/9888321032"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-gold">
                  {t.contactBtn}
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const BitumenPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="Bitumen | Arman Export"
            description="The best and highest quality Bitumen in the IRAN market - 60/70, VG10, VG20, VG30, VG40 grades available"
          />
          <BitumenContent />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default BitumenPage;
