import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Truck, Shield, FileCheck, Package, BadgeCheck, Handshake, MapPin, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import pageBg from '@/assets/page-bg.jpeg';
import EditableText from '@/components/admin/EditableText';

const features = [
  {
    icon: Globe,
    title: 'International Export',
    titleFa: 'صادرات بین‌المللی',
    description: 'Exporting products to Middle East, Central Asia and neighboring countries',
    descriptionFa: 'صادرات محصولات به کشورهای منطقه خلیج فارس، آسیای میانه و کشورهای همسایه',
  },
  {
    icon: Truck,
    title: 'Safe Transportation',
    titleFa: 'حمل و نقل امن',
    description: 'Safe shipping with full insurance and online tracking at all stages',
    descriptionFa: 'ارسال ایمن کالا با بیمه کامل و ردیابی آنلاین محموله در تمام مراحل',
  },
  {
    icon: Shield,
    title: 'Original Products',
    titleFa: 'محصولات اورجینال',
    description: 'Guarantee of product authenticity with valid international warranty',
    descriptionFa: 'تضمین اصالت کالا با گارانتی معتبر بین‌المللی و سرتیفیکیت اصالت',
  },
  {
    icon: FileCheck,
    title: 'Complete Documentation',
    titleFa: 'مستندات کامل',
    description: 'Preparation of all customs documents and export permits',
    descriptionFa: 'تهیه کلیه مدارک گمرکی، اسناد صادراتی و مجوزهای لازم',
  },
];

const services = [
  {
    icon: Package,
    title: 'Export Packaging',
    titleFa: 'بسته‌بندی صادراتی',
    description: 'Standard and professional packaging according to international standards',
    descriptionFa: 'بسته‌بندی استاندارد و حرفه‌ای مطابق با استانداردهای بین‌المللی',
  },
  {
    icon: BadgeCheck,
    title: 'Customs Clearance',
    titleFa: 'ترخیص گمرکی',
    description: 'All customs affairs and cargo clearance at origin and destination',
    descriptionFa: 'انجام کلیه امور گمرکی و ترخیص کالا در مبدا و مقصد',
  },
  {
    icon: Handshake,
    title: 'Quality Guarantee',
    titleFa: 'تضمین کیفیت',
    description: 'Inspection and quality control of all products before shipment',
    descriptionFa: 'بازرسی و کنترل کیفیت تمامی محصولات قبل از ارسال',
  },
];

const countries = [
  { name: 'امارات', nameEn: 'UAE', flag: '🇦🇪' },
  { name: 'عراق', nameEn: 'Iraq', flag: '🇮🇶' },
  { name: 'افغانستان', nameEn: 'Afghanistan', flag: '🇦🇫' },
  { name: 'ترکمنستان', nameEn: 'Turkmenistan', flag: '🇹🇲' },
  { name: 'آذربایجان', nameEn: 'Azerbaijan', flag: '🇦🇿' },
  { name: 'ارمنستان', nameEn: 'Armenia', flag: '🇦🇲' },
  { name: 'قطر', nameEn: 'Qatar', flag: '🇶🇦' },
  { name: 'کویت', nameEn: 'Kuwait', flag: '🇰🇼' },
];

// Export Products with detailed specifications
const exportProducts = [
  {
    id: 'iron-steel',
    slug: '/export/iron-steel',
    name: 'آهن و فولاد',
    nameEn: 'Iron and Steel',
    image: 'https://export.armanhamrah.com/uploads/products/iron.webp',
    category: 'فلزات',
    categoryEn: 'Metals',
    description: 'The best and highest quality Iron And Steel in the IRAN market.',
    descriptionFa: 'بهترین و با کیفیت‌ترین آهن و فولاد در بازار ایران',
  },
  {
    id: 'copper-rod',
    slug: '/export/copper-rod',
    name: 'مفتول مسی',
    nameEn: 'Copper Rod',
    image: 'https://export.armanhamrah.com/uploads/products/copper-rod.webp',
    category: 'فلزات',
    categoryEn: 'Metals',
    description: 'The best and highest quality Copper Rod in the IRAN market.',
    descriptionFa: 'بهترین و با کیفیت‌ترین مفتول مسی در بازار ایران',
  },
  {
    id: 'bitumen',
    slug: '/export/bitumen',
    name: 'قیر',
    nameEn: 'Bitumen',
    image: 'https://export.armanhamrah.com/uploads/products/bitumen.webp',
    category: 'پتروشیمی',
    categoryEn: 'Petrochemical',
    description: 'The best and highest quality bitumen in the IRAN market.',
    descriptionFa: 'بهترین و با کیفیت‌ترین قیر در بازار ایران',
    grades: ['60/70', 'VG10', 'VG20', 'VG30', 'VG40'],
  },
  {
    id: 'oil',
    slug: '/export/oil',
    name: 'روغن',
    nameEn: 'Oil',
    image: 'https://export.armanhamrah.com/uploads/products/oil.webp',
    category: 'پتروشیمی',
    categoryEn: 'Petrochemical',
    description: 'The best and highest quality Oil in the IRAN market.',
    descriptionFa: 'بهترین و با کیفیت‌ترین روغن در بازار ایران',
  },
  {
    id: 'thread',
    slug: null,
    name: 'نخ',
    nameEn: 'Thread',
    image: 'https://export.armanhamrah.com/uploads/products/thread.webp',
    category: 'نساجی',
    categoryEn: 'Textile',
    description: 'The best and highest quality Thread in the IRAN market.',
    descriptionFa: 'بهترین و با کیفیت‌ترین نخ در بازار ایران',
  },
];

const ExportPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="صادرات | Arman Export - Best Solution for importing goods from IRAN"
            description="خدمات صادرات محصولات به کشورهای منطقه - آهن و فولاد، مفتول مسی، قیر، روغن و نخ"
          />
          <div className="page-background bg-background admin-toolbar-offset" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
            <Navbar />
            <main className="pt-24">
              {/* Hero */}
              <section className="bg-gradient-hero py-16">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
                      <ArrowRight size={20} />
                      بازگشت به صفحه اصلی
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                      <EditableText
                        contentKey="export-title"
                        page="export"
                        section="hero"
                        defaultValue="Arman Export"
                        as="span"
                      />
                    </h1>
                    <p className="text-xl text-primary font-medium mb-4" dir="ltr">
                      <EditableText
                        contentKey="export-subtitle"
                        page="export"
                        section="hero"
                        defaultValue="Best Solution for importing goods from IRAN"
                        as="span"
                      />
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      <EditableText
                        contentKey="export-description"
                        page="export"
                        section="hero"
                        defaultValue="با بیش از ۹ سال تجربه، شرکت آرمان در واردات و صادرات کالاهای اساسی و تخصصی در بخش‌های مختلف از جمله فناوری اطلاعات، مواد غذایی، پوشاک، نفت، فلزات و مصالح ساختمانی فعالیت موفقی داشته است."
                        as="span"
                        multiline
                      />
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Features */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">ویژگی‌های خدمات صادراتی</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
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
                        <h3 className="text-lg font-bold text-foreground mb-2">{feature.titleFa}</h3>
                        <p className="text-sm text-primary/80 mb-2" dir="ltr">{feature.title}</p>
                        <p className="text-muted-foreground text-sm">{feature.descriptionFa}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Products */}
              <section className="section-padding">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">محصولات صادراتی</h2>
                    <p className="text-xl text-primary" dir="ltr">Our Products</p>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-4" />
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {exportProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="card-premium group cursor-pointer"
                        onClick={() => product.slug && window.location.assign(product.slug)}
                      >
                        <div className="relative mb-4 overflow-hidden rounded-xl bg-secondary/50 p-6">
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                          <span className="absolute top-3 right-3 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {product.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                        <p className="text-primary mb-3" dir="ltr">{product.nameEn}</p>
                        <p className="text-muted-foreground text-sm mb-4">{product.descriptionFa}</p>
                        
                        {product.grades && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {product.grades.map((grade) => (
                                <span key={grade} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  {grade}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {product.slug && (
                          <Link 
                            to={product.slug}
                            className="inline-flex items-center gap-2 text-primary text-sm hover:underline mt-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>مشاهده جزئیات</span>
                            <ExternalLink size={14} />
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Services */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">خدمات صادراتی ما</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        whileHover={{ y: -5 }}
                        className="card-premium"
                      >
                        <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
                          <service.icon size={24} className="text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{service.titleFa}</h3>
                        <p className="text-primary text-sm mb-3" dir="ltr">{service.title}</p>
                        <p className="text-muted-foreground leading-relaxed">{service.descriptionFa}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Our Goal */}
              <section className="section-padding">
                <div className="container-custom">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-3xl font-bold text-foreground mb-4">هدف ما</h2>
                      <p className="text-xl text-primary mb-4" dir="ltr">More Connections</p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        با بیش از ۹ سال تجربه، شرکت آرمان با موفقیت در واردات و صادرات کالاهای اساسی و تخصصی در بخش‌های مختلف از جمله فناوری اطلاعات، مواد غذایی، پوشاک، نفت، فلزات و مصالح ساختمانی فعالیت داشته است. هدف شرکت ایجاد ارتباطات تجاری گسترده در سراسر جهان است.
                      </p>
                      <p className="text-muted-foreground leading-relaxed" dir="ltr">
                        With over 9 years of experience, Arman Company has successfully engaged in importing and exporting basic and specialized goods in various sectors including IT, food, clothing, petroleum, metals, and construction materials. The company's purpose is to establish extensive business connections worldwide.
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        src="https://export.armanhamrah.com/uploads/goals.webp"
                        alt="Our Goal"
                        className="rounded-2xl shadow-2xl w-full"
                      />
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Countries */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">کشورهای هدف صادرات</h2>
                    <p className="text-muted-foreground">صادرات به کشورهای منطقه و همسایه</p>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-4" />
                  </motion.div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {countries.map((country, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="card-premium text-center flex flex-col items-center justify-center gap-2"
                      >
                        <span className="text-4xl">{country.flag}</span>
                        <span className="font-medium text-foreground">{country.name}</span>
                        <span className="text-sm text-muted-foreground" dir="ltr">{country.nameEn}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="section-padding">
                <div className="container-custom">
                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-3xl font-bold text-foreground mb-6">تماس با ما</h2>
                      <p className="text-xl text-primary mb-8" dir="ltr">For More Information Contact Our Specialist</p>
                      
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                            <MessageCircle size={24} className="text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-1">WhatsApp</p>
                            <a href="https://wa.me/9888321032" className="text-muted-foreground hover:text-primary" dir="ltr">+98 88321032</a>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Mail size={24} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-1">Email</p>
                            <a href="mailto:export@armanhamrah.com" className="text-muted-foreground hover:text-primary" dir="ltr">export@armanhamrah.com</a>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Phone size={24} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-1">Phone</p>
                            <a href="tel:02188321032" className="text-muted-foreground hover:text-primary" dir="ltr">+98 21 88321032</a>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MapPin size={24} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground mb-1">Address</p>
                            <p className="text-muted-foreground text-sm" dir="ltr">
                              Unit 304, 3rd Floor, Amir Atabak Building, Soleyman Khater St, Motahari St, Tehran, IRAN
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="card-premium"
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-6">Contact Form</h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="Your full name"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="Your company name"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                          <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="your@email.com"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Your Message</label>
                          <textarea
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                            placeholder="How can we help you?"
                            dir="ltr"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full btn-gold py-4 text-lg"
                        >
                          Send Message
                        </button>
                      </form>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center card-premium bg-gradient-gold p-12"
                  >
                    <Globe size={48} className="mx-auto mb-6 text-primary-foreground" />
                    <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                      Start Your Business With Us
                    </h2>
                    <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                      Our commercial experts are always striving to enhance convenience for your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="https://wa.me/9888321032"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-background text-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
                      >
                        Start Conversation
                      </a>
                      <Link
                        to="/contact"
                        className="inline-block bg-background/20 text-primary-foreground border-2 border-primary-foreground/30 px-8 py-4 rounded-xl font-bold hover:bg-background/30 transition-colors"
                      >
                        تماس با ما
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </section>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default ExportPage;