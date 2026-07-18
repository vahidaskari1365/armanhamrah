import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Shield, ArrowRight, Smartphone, Gamepad2, Headset, Headphones, Watch, Speaker, MapPin } from 'lucide-react';
import { repairCategoriesData } from '@/data/repairCategoriesData';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: any = {
  Smartphone,
  Gamepad2,
  Headset,
  Headphones,
  Watch,
  Speaker
};

const RepairCategoryGrid = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  const t = (fa: string, en: string) => isFa ? fa : en;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 warranty-title">
            {t('دسته‌بندی خدمات تعمیرات تخصصی', 'Professional Repair Categories')}
          </h2>
          <p className="text-muted-foreground leading-7 warranty-text">
            {t(
              'هر دستگاهی که داری، تیم تخصصی تعمیرش رو داریم. روی دسته مورد نظر کلیک کن و خدمات، مدل‌های تحت پوشش و نحوه ثبت سفارش رو ببین.',
              'Whatever device you have, we have its specialized repair team. Click on a category to see services, covered models and how to order.'
            )}
          </p>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairCategoriesData.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Smartphone;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="group bg-card border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-secondary">
                  <img
                    src={cat.image}
                    alt={cat.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-card/90 backdrop-blur flex items-center justify-center shadow">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold font-titr">{cat.warranty}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-[16px] leading-6 warranty-title">{isFa ? cat.title : cat.titleEn}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-white/80 warranty-text">
                      <span className="flex items-center gap-1"><Clock size={11} />{cat.time}</span>
                      <span className="flex items-center gap-1"><Shield size={11} />{t('قطعه اصلی', 'Original Part')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[13px] text-muted-foreground leading-7 mb-4 line-clamp-3 warranty-text">
                    {isFa ? cat.shortDesc : cat.titleEn + ' - Professional repair with original parts, free diagnosis and 3-month warranty in Tehran.'}
                  </p>

                  <div className="mb-4">
                    <div className="text-xs font-bold text-foreground mb-2 warranty-title">{t('مدل‌های پرتعمیر:', 'Top Models:')}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.models.slice(0,4).map((m, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-secondary border text-muted-foreground warranty-text">{m}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="text-xs font-bold text-foreground mb-2 warranty-title">{t('مشکلات رایج:', 'Common Issues:')}</div>
                    <div className="space-y-1.5">
                      {cat.problems.slice(0,3).map((p, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground warranty-text">
                          <CheckCircle2 size={12} className="text-green-500" /> {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    <div className="p-3 rounded-xl bg-secondary/50 border">
                      <div className="text-[11px] font-bold text-foreground flex items-center gap-1.5 mb-1 warranty-title">
                        <MapPin size={12} className="text-primary" /> {t('بیا پیش ما:', 'Come to us:')}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-6 warranty-text">
                        {t(
                          'تهران، خیابان مطهری، بعد از مفتح، ابتدای سلیمان خاطر، ساختمان امیراتابک، پ ۱۳۰، ط ۳، واحد ۲۰۴',
                          'Tehran, Motahari St., After Mofatteh, Soleyman Khater St., Amir Atabak Bldg, No.130, 3rd Fl, Unit 204'
                        )}
                      </div>
                    </div>
                    <Link
                      to={`/repair/${cat.id}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors font-titr"
                    >
                      {t('مشاهده جزئیات و ثبت سفارش', 'View Details & Order')}
                      <ArrowRight size={15} className={isFa ? '' : 'rotate-180'} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RepairCategoryGrid;
