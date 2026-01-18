import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import EditableText from '@/components/admin/EditableText';

const Guarantee = () => {
  const { t, language } = useLanguage();

  const conditions = [
    {
      fa: 'کلیه دستگاه‌های گارانتی شده توسط شرکت آرمان همراه ارتباطات آریا دارای ۱۸ ماه گارانتی از لحظه فروش به مصرف‌کننده می‌باشد. همچنین تا ۳ سال ضمانت تامین قطعه و پذیرش دستگاه و رفع ایراد مذکور توسط مشتری را دارد.',
      en: 'All devices warranted by Arman Hamrah Aria Communications Company have 18 months warranty from the time of sale. Also, up to 3 years guarantee of parts supply and device acceptance.',
    },
    {
      fa: 'مدت اعتبار گارانتی باتری‌های داخلی ۱۸ ماه و باطری‌های جداشدنی ۶ ماه می‌باشد.',
      en: 'Internal batteries have 18 months warranty and removable batteries have 6 months warranty.',
    },
    {
      fa: 'لوازم جانبی شامل هندزفری و کابل شارژ شامل گارانتی نمی‌باشد.',
      en: 'Accessories including earphones and charging cables are not covered by warranty.',
    },
    {
      fa: 'در صورتیکه خریدار پس از گذشت ۷ روز از زمان فعالسازی ایرادی در دستگاه مشاهده نماید که سخت‌افزاری بوده، دستگاه شامل تعویض خواهد بود.',
      en: 'If the buyer finds a hardware defect within 7 days of activation, the device will be replaced.',
    },
    {
      fa: 'هرگونه آسیب فیزیکی، ضربخوردگی و شکستگی، آبخوردگی، نوسانات برقی و سوختگی شامل گارانتی نمی‌باشد.',
      en: 'Any physical damage, impact, breakage, water damage, electrical fluctuations and burns are not covered.',
    },
    {
      fa: 'چنانچه دستگاه در مراکز غیرمجاز تعمیر گردد فاقد گارانتی می‌باشد.',
      en: 'If the device is repaired at unauthorized centers, the warranty will be void.',
    },
    {
      fa: 'عملیات Root کردن و نصب رام‌های غیررسمی و Unlock Boot Loader فاقد گارانتی می‌باشد.',
      en: 'Rooting, installing unofficial ROMs, and Unlock Boot Loader will void the warranty.',
    },
    {
      fa: 'این شرکت در قبال فراموش کردن Mi Account و Google Account مشتری هیچگونه مسئولیتی را نمی‌پذیرد.',
      en: 'The company accepts no responsibility for forgotten Mi Account or Google Account.',
    },
    {
      fa: 'این شرکت در قبال حفظ و نگهداری اطلاعات شخصی مشتری یا بازیابی آنها هیچگونه مسئولیتی ندارد.',
      en: 'The company has no responsibility for maintaining or recovering customer personal data.',
    },
    {
      fa: 'تغییر شماره سریال دستگاه و یا مخدوش نمودن آن شامل خدمات گارانتی نمی‌باشد.',
      en: 'Changing or tampering with the device serial number is not covered by warranty.',
    },
  ];

  const exceptions = [
    {
      fa: 'در مناطق مرطوب و گرم مثل شهرهای شمالی و جنوبی کشور روئیت آبخوردگی از ۱۰ الی ۱۵ درصد بلامانع بوده و شامل گارانتی می‌باشد.',
      en: 'In humid and hot areas like northern and southern cities, 10-15% water damage detection is acceptable and covered by warranty.',
    },
    {
      fa: 'در صورت باز نمودن دستگاه در صورتیکه تکنسین متوجه شود که دستگاه قبلا در جایی غیر از مراکز اصلی باز شده اما دستکاری روی قطعات نداشته باشد، شامل گارانتی می‌باشد.',
      en: 'If the device was previously opened at unauthorized centers but no parts were tampered with, it remains under warranty.',
    },
    {
      fa: 'قطعات تعویض شده در این مرکز که بر روی دستگاه‌های غیرگارانتی قرار می‌گیرد تا سه ماه گارانتی دارند.',
      en: 'Replaced parts installed on non-warranty devices have a 3-month warranty.',
    },
    {
      fa: 'چنانچه جهت ایرادی مشابه مشتری ۳ بار مراجعه داشته باشد و ایراد همچنان مشاهده گردد، دستگاه تعویض می‌گردد.',
      en: 'If a customer visits 3 times for the same issue and it persists, the device will be replaced.',
    },
  ];

  return (
    <section id="guarantee" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-gold">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <EditableText
              contentKey="guarantee-title"
              page="home"
              section="guarantee"
              defaultValue={t('guarantee.title')}
            />
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            <EditableText
              contentKey="guarantee-subtitle"
              page="home"
              section="guarantee"
              defaultValue={t('guarantee.subtitle')}
              multiline
            />
          </p>
        </motion.div>

        {/* Main Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              {t('guarantee.conditionsTitle')}
            </h3>
          </div>
          <div className="grid gap-4">
            {conditions.map((condition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: language === 'fa' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card-premium flex gap-4"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {condition[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Exceptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-2xl font-bold text-foreground">
              {t('guarantee.exceptionsTitle')}
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {exceptions.map((exception, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-premium border-green-500/20 bg-green-500/5"
              >
                <div className="flex gap-4">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground leading-relaxed">
                    {exception[language]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 card-premium border-primary/20 bg-primary/5"
        >
          <div className="flex gap-4">
            <Info className="w-6 h-6 text-primary flex-shrink-0" />
            <p className="text-muted-foreground leading-relaxed">
              {language === 'fa' 
                ? 'در زمان مراجعه به مرکز خدمات آرمان همراه، همراه داشتن فاکتور رسمی مهمور و جعبه دستگاه الزامی می‌باشد.'
                : 'When visiting Arman Hamrah service center, bringing the official stamped invoice and device box is mandatory.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
