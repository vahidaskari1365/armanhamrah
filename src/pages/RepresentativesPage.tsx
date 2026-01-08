import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, TrendingUp, HeadphonesIcon, ShieldCheck, Gift, Store, Truck, CheckCircle2, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';

const representatives = [
  {
    name: 'موبایل کسری',
    province: 'گیلان',
    city: 'رشت',
    phone: '013-33235303',
    address: 'رشت خیابان لاکانی ، جنب بیمه آسیا موبایل کسری'
  },
  {
    name: 'موبایل اورژانس',
    province: 'خراسان رضوی',
    city: 'سبزوار',
    phone: '051-44230039',
    address: 'سبزوار،خیابان کاشفی شمالی نبش کاشفی8،اورژانس موبایل'
  },
  {
    name: 'موبایل وحید',
    province: 'اصفهان',
    city: 'اصفهان',
    phone: '031-32228180',
    address: 'خیابان فردوسی مجتمع زاینده رود طبقه اول فروشگاه وحید'
  },
  {
    name: 'سامسونگ مرکزی',
    province: 'آذربایجان شرقی',
    city: 'تبریز',
    phone: '041-36600150',
    address: 'تبریز اتوبان پاسداران میدان فهمیده مجتمع تجاری لاله پارک،طبقه منفی یک فروشگاه سامسونگ'
  },
  {
    name: 'فروشگاه ایران زمین',
    province: 'اصفهان',
    city: 'اصفهان',
    phone: '031-32214031',
    address: 'اصفهان خیابان فردوسی ،روبه روی بانک صادرات فروشگاه ایران زمین'
  },
  {
    name: 'فروشگاه هایپرفون',
    province: 'فارس',
    city: 'شیراز',
    phone: '071-36290217',
    address: 'شیراز-خیابان عفیف آباد روبه روی کوچه 1 فروشگاه هایپرفون'
  },
  {
    name: 'فروشگاه کنسل',
    province: 'مازندران',
    city: 'قائم شهر',
    phone: '011-42231256',
    address: 'قائم شهر خیابان امام خمینی پاساژ نسیم پلاک43 طبقه همکف آقای گرائلی'
  },
  {
    name: 'شرکت فنی مهندسی نانو',
    province: 'بوشهر',
    city: 'بوشهر',
    phone: '077-33320708',
    address: 'بوشهر بلوار بهشت صادق روبروی بانک سپه طبقه همکف آقای عبدالرضا کارگر'
  },
  {
    name: 'آل دیجیتال',
    province: 'کرمان',
    city: 'کرمان',
    phone: '034-32231911',
    address: 'کرمان خیابان فردوسی نبش وحشی بافقی فروشگاه آل دیجیتال'
  },
  {
    name: 'موبایل آوا',
    province: 'آذربایجان غربی',
    city: 'ارومیه',
    phone: '044-3469061',
    address: 'ارومیه خیابان مدرس نبش کوچه 20متری نوذری آقای نوید قدرتی'
  },
  {
    name: 'گروه فنی سپهر پویا',
    province: 'البرز',
    city: 'کرج',
    phone: '026-32233652',
    address: 'کرج میدان کرج خیابان شهید دکتر بهشتی کوچه هما پاساژ کمالی گروه فنی سپهرپویا'
  },
  {
    name: 'فروشگاه موبایل حافظ',
    province: 'مرکزی',
    city: 'اراک',
    phone: '086-42222522',
    address: 'ساوه خیابان امام پاساژ رضا طبقه همکف پلاک 60 فروشگاه موبایل حافظ'
  },
  {
    name: 'آقای حامد صمدی',
    province: 'خراسان رضوی',
    city: 'مشهد',
    phone: '0915-5099431',
    address: 'مشهد احمدآباد نبش خیابان بهشت مجتمع موبایل مشهد طبقه اول اداری واحد4'
  }
];

const benefits = [
  {
    icon: Award,
    title: 'محصولات اورجینال',
    description: 'دسترسی به محصولات اورجینال برندهای معتبر با گارانتی رسمی آرمان همراه',
  },
  {
    icon: TrendingUp,
    title: 'قیمت‌های رقابتی',
    description: 'ارائه قیمت‌های ویژه و تخفیف‌های اختصاصی برای همکاران و نمایندگان',
  },
  {
    icon: HeadphonesIcon,
    title: 'پشتیبانی اختصاصی',
    description: 'تیم پشتیبانی ویژه همکاران برای پاسخگویی سریع به سوالات و نیازها',
  },
  {
    icon: ShieldCheck,
    title: 'گارانتی معتبر',
    description: 'پشتیبانی و گارانتی ۱۸ ماهه رسمی برای تمامی محصولات فروخته شده',
  },
  {
    icon: Gift,
    title: 'جوایز و پاداش',
    description: 'برنامه‌های تشویقی و پاداش برای همکاران فعال با فروش بالا',
  },
  {
    icon: Truck,
    title: 'ارسال سریع',
    description: 'ارسال سریع و ایمن محصولات به سراسر کشور با بسته‌بندی حرفه‌ای',
  },
];

const requirements = [
  'داشتن جواز کسب معتبر در زمینه موبایل و لوازم جانبی',
  'حداقل ۲ سال سابقه فعالیت در صنف موبایل',
  'داشتن فروشگاه فیزیکی یا فروشگاه اینترنتی معتبر',
  'توانایی خرید حداقلی مطابق با شرایط همکاری',
  'تعهد به رعایت قیمت‌گذاری مصوب شرکت',
  'امکان ارائه ضمانت‌نامه یا چک بانکی معتبر',
];

const steps = [
  {
    number: '۱',
    title: 'ثبت درخواست',
    description: 'فرم درخواست همکاری را تکمیل کنید',
  },
  {
    number: '۲',
    title: 'بررسی مدارک',
    description: 'کارشناسان ما مدارک شما را بررسی می‌کنند',
  },
  {
    number: '۳',
    title: 'تایید نمایندگی',
    description: 'پس از تایید، کد نمایندگی دریافت می‌کنید',
  },
  {
    number: '۴',
    title: 'شروع همکاری',
    description: 'به پنل همکاران دسترسی پیدا می‌کنید',
  },
];

const RepresentativesPage = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SEO 
            title="نمایندگان | آرمان همراه ارتباطات آریا"
            description="لیست نمایندگان فروش و شرایط همکاری با شرکت آرمان همراه ارتباطات آریا در سراسر ایران"
          />
          <div className="min-h-screen bg-background" dir="rtl">
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
                      نمایندگان فروش
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      شبکه گسترده نمایندگان آرمان همراه در سراسر ایران آماده خدمت‌رسانی به شما عزیزان است
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Representatives List */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">نمایندگان ما در سراسر کشور</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {representatives.map((rep, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                        className="card-premium group"
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Store className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                              {rep.name}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {rep.province} - {rep.city}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <a 
                            href={`tel:${rep.phone.replace(/-/g, '')}`}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            dir="ltr"
                          >
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
                </div>
              </section>

              {/* Benefits */}
              <section className="section-padding">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">مزایای همکاری با آرمان همراه</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="card-premium group"
                      >
                        <div className="w-14 h-14 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <benefit.icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Steps */}
              <section className="section-padding bg-gradient-premium">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-foreground mb-4">مراحل شروع همکاری</h2>
                    <div className="w-24 h-1 mx-auto rounded-full bg-primary" />
                  </motion.div>

                  <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center relative"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                          <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                        {index < steps.length - 1 && (
                          <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-border -z-10" style={{ right: '-50%', width: '100%' }} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Requirements */}
              <section className="section-padding">
                <div className="container-custom">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-3xl font-bold text-foreground mb-6">شرایط لازم برای نمایندگی</h2>
                      <ul className="space-y-4">
                        {requirements.map((req, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{req}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="card-premium"
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                        <Store size={28} className="text-primary" />
                        فرم درخواست نمایندگی
                      </h3>
                      <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">نام و نام خانوادگی</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                              placeholder="نام خود را وارد کنید"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">شماره تماس</label>
                            <input
                              type="tel"
                              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                              placeholder="09123456789"
                              dir="ltr"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">نام فروشگاه</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="نام فروشگاه را وارد کنید"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">شهر</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="شهر محل فعالیت"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">توضیحات اضافی</label>
                          <textarea
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                            placeholder="اطلاعات بیشتر درباره کسب و کار خود..."
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full btn-gold py-4 text-lg"
                        >
                          ارسال درخواست نمایندگی
                        </button>
                      </form>
                    </motion.div>
                  </div>
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
                    className="text-center card-premium bg-gradient-gold p-12"
                  >
                    <Users size={48} className="mx-auto mb-6 text-primary-foreground" />
                    <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                      تماس با واحد فروش به نمایندگان
                    </h2>
                    <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                      برای اطلاعات بیشتر و مشاوره رایگان با کارشناسان ما تماس بگیرید
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="tel:02188321030"
                        className="inline-block bg-background text-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
                      >
                        021-88321030
                      </a>
                      <Link
                        to="/contact"
                        className="inline-block bg-background/20 text-primary-foreground border-2 border-primary-foreground/30 px-8 py-4 rounded-xl font-bold hover:bg-background/30 transition-colors"
                      >
                        فرم تماس
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

export default RepresentativesPage;
