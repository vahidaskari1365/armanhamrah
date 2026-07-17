import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Shield, ArrowRight, Hash, Smartphone, Gamepad2, Headset, Headphones, Watch, Speaker, Wrench, MapPin, Phone } from 'lucide-react';
import { repairCategoriesData } from '@/data/repairCategoriesData';
import { motion } from 'framer-motion';

const iconMap: any = {
  Smartphone,
  Gamepad2,
  Headset,
  Headphones,
  Watch,
  Speaker
};

const RepairCategoryGrid = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            <Wrench size={14} /> دسته‌بندی تخصصی تعمیرات
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4">
            تعمیرات تخصصی به تفکیک دستگاه
            <span className="block text-xl md:text-2xl font-bold text-primary mt-2">با عکس واقعی، متن ۱۵۰۰ کلمه‌ای و گارانتی کتبی - بیا پیش ما!</span>
          </h2>
          <p className="text-muted-foreground leading-8">
            هر دستگاهی که داری - <strong>موبایل آیفون و سامسونگ و شیائومی، PS5، ایرپاد، هدفون، ساعت هوشمند اپل واچ و گلکسی واچ، اسپیکر و باند</strong> - ما تخصصی‌ترین تیم تعمیرش رو داریم. 
            روی هر دسته کلیک کن و محتوای کامل ۱۵۰۰ کلمه‌ای، عکس واقعی تعمیر، هش‌تگ‌های پرجستجو و آدرس بیا پیش ما رو ببین.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {repairCategoriesData.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Smartphone;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="group bg-card border rounded-[20px] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 flex flex-col hover:-translate-y-2"
              >
                {/* Image with SEO alt */}
                <div className="relative overflow-hidden aspect-[16/10] bg-secondary">
                  <img
                    src={cat.image}
                    alt={cat.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-bold border border-white/10">
                      {cat.difficulty}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                      {cat.warranty}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-black text-[17px] leading-6 drop-shadow-lg">{cat.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-white/80">
                      <span className="flex items-center gap-1"><Clock size={12} />{cat.time}</span>
                      <span className="flex items-center gap-1"><Shield size={12} />{cat.time}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[13px] text-muted-foreground leading-7 line-clamp-4 mb-4">
                    {cat.shortDesc}
                  </p>

                  <div className="mb-4">
                    <div className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                      <Hash size={12} className="text-primary" /> مدل‌های پرتعمیر:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.models.slice(0,5).map((m, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-secondary border text-muted-foreground">{m}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-bold text-foreground mb-2">مشکلات رایج:</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {cat.problems.slice(0,4).map((p, i) => (
                        <div key={i} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <CheckCircle2 size={10} className="text-green-500" /> {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hashtags SEO */}
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-1.5">
                      {cat.hashtags.slice(0,5).map((h, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-primary/5 text-primary border border-primary/10 font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Come to us */}
                  <div className="mt-auto space-y-3">
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
                      <div className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                        <MapPin size={12} /> بیا پیش ما برای تعمیر:
                      </div>
                      <div className="text-[11px] text-amber-700 dark:text-amber-400 leading-6">
                        تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۲۰۴ - عیب‌یابی رایگان + مشاوره تخصصی
                      </div>
                    </div>
                    <Link
                      to={`/warranty/repairs#${cat.id}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                      مطالعه متن کامل + ثبت سفارش
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/contact"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-bold text-xs hover:bg-secondary/80 transition-colors"
                    >
                      <Phone size={14} /> مشاوره رایگان تعمیر {cat.title.split(' ').slice(2,4).join(' ')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical SEO Box */}
        <div className="mt-16 p-6 md:p-8 rounded-[20px] bg-card border shadow-sm">
          <h3 className="text-xl font-black text-foreground mb-4">⚙️ سئو تکنیکال اجرا شده برای این بخش</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm leading-7 text-muted-foreground">
            <div>
              <strong className="text-foreground">🖼️ تصویر:</strong>
              <ul className="list-disc pr-5 mt-2 space-y-1 text-xs">
                <li>تمام عکس‌ها واقعی تعمیرات با alt سئو پر از کیورد (آیفون، PS5...)</li>
                <li>loading="lazy" + decoding="async" + width/height برای Core Web Vital</li>
                <li>فرمت WebP + fallback JPG - ذخیره در public/images/repairs/</li>
                <li>ImageObject Schema برای ایندکس بهتر در Google Images</li>
              </ul>
            </div>
            <div>
              <strong className="text-foreground">🔗 داخلی + هشتگ:</strong>
              <ul className="list-disc pr-5 mt-2 space-y-1 text-xs">
                <li>هر کارت 5 هشتگ پرجستجو مثل #تعمیر_موبایل #تعمیر_PS5</li>
                <li>لینک داخلی به /warranty/repairs#id و /contact</li>
                <li>Anchor Text با کیورد دقیق</li>
                <li>مدل‌های پرتعمیر به عنوان تگ</li>
              </ul>
            </div>
            <div>
              <strong className="text-foreground">📱 چیدمان قشنگ SXO:</strong>
              <ul className="list-disc pr-5 mt-2 space-y-1 text-xs">
                <li>Grid ریسپانسیو، Hover lift، سایه primary</li>
                <li>Badge گارانتی + زمان + سختی برای اعتماد</li>
                <li>CTA دوتایی: مطالعه متن کامل + مشاوره</li>
                <li>باکس "بیا پیش ما" زرد برای جذب توجه</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairCategoryGrid;
