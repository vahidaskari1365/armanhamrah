import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Store, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
];

const Representatives = () => {
  const { language } = useLanguage();

  return (
    <section id="representatives" className="section-padding bg-gradient-premium">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'fa' ? 'نمایندگان فروش' : 'Sales Representatives'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'fa' 
              ? 'شبکه گسترده نمایندگان آرمان همراه در سراسر ایران آماده خدمت‌رسانی به شما عزیزان است' 
              : 'Our extensive network of representatives across Iran is ready to serve you'}
          </p>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <span className="leading-relaxed line-clamp-2">{rep.address}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/representatives"
            className="inline-flex items-center gap-2 btn-gold px-8 py-4 text-lg"
          >
            {language === 'fa' ? 'مشاهده همه نمایندگان' : 'View All Representatives'}
            {language === 'fa' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Representatives;