import { CheckCircle2, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const RepairLongContentMobile = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  const t = (fa: string, en: string) => isFa ? fa : en;

  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto">
        {/* Back button for sub-section */}
        <Link to="/repair" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 text-sm font-titr">
          <ChevronLeft size={16} /> {t('بازگشت به هاب تعمیرات', 'Back to Repair Hub')}
        </Link>

        <div className="card-premium p-6 md:p-8 rounded-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Smartphone size={28} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground warranty-title">{t('تعمیرات تخصصی موبایل', 'Professional Mobile Repair')}</h2>
              <p className="text-sm text-muted-foreground mt-1 warranty-text">iPhone 17 Pro, 16 Pro, Galaxy S25 Ultra, S24 Ultra, A56, A36, Xiaomi 15T, Redmi Note 14 Pro, Poco M7</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <img src="/images/repairs/mobile-repair-1.jpg" alt={t('تعمیر موبایل آیفون سامسونگ', 'iPhone Samsung mobile repair')} loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/mobile-phone-repair-technician-professio-1.jpg" alt="Microscope" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/mobile-repair-2.jpg" alt="LCD" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground warranty-text">
            <p>
              {t(
                'گوشی شما شکسته، آبخورده یا خاموش شده؟ مرکز تخصصی تعمیرات موبایل آرمان همراه با مجهزترین لابراتوار میکروسکوپ و ابزار کالیبره، انواع گوشی آیفون ۱۷ پرو، ۱۶ پرو، سامسونگ S25 Ultra، S24 Ultra، A56، A36، شیائومی 15T، ردمی نوت ۱۴ پرو، پوکو M7 را با قطعات ۱۰۰٪ اورجینال و گارانتی ۳ ماهه تعمیر می‌کند. عیب‌یابی رایگان.',
                'Phone broken, water damaged or dead? Arman Hamrah specialized mobile repair center with most equipped microscope lab repairs iPhone 17 Pro, 16 Pro, Samsung S25 Ultra, S24 Ultra, A56, A36, Xiaomi 15T, Redmi Note 14 Pro, Poco M7 with 100% original parts and 3-month warranty. Free diagnosis.'
              )}
            </p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">{t('چرا آرمان همراه؟', 'Why Arman Hamrah?')}</h3>
            <ul className="space-y-2 mt-3">
              {[
                t('لابراتوار میکروسولدر: میکروسکوپ ۳ چشمی، هیتر Quick، پروگرامر JC', 'Microsoldering lab: 3-eye microscope, Quick heater, JC programmer'),
                t('قطعه اورجینال سرویس پک با TrueTone و ۱۲۰ هرتز واقعی', 'Original service pack with TrueTone and real 120Hz'),
                t('تکنسین Certified دوره دیده در دبی', 'Certified technicians trained in Dubai'),
                t('تست ۲۰ مرحله‌ای و گارانتی کتبی ۳ ماهه', '20-step test and 3-month written warranty')
              ].map((txt,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1 flex-shrink-0" />{txt}</li>)}
            </ul>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">{t('تعمیرات آیفون', 'iPhone Repair')}</h3>
            <p>{t('تعویض ال‌سی‌دی اورجینال Super Retina XDR با کالیبره TrueTone، تعویض باتری اصلی با هلث ۱۰۰٪، تعمیر برد آبخورده و ارور ۴۰۱۳، تعمیر فیس آیدی و دوربین.', 'Original Super Retina XDR LCD with TrueTone calibration, original battery 100% health, water damaged board and error 4013, Face ID and camera repair.')}</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">{t('تعمیرات سامسونگ', 'Samsung Repair')}</h3>
            <p>{t('تعویض گلس بدون ال‌سی‌دی با وکیوم OCA (۴۰٪ ارزان‌تر)، تعویض ال‌سی‌دی Dynamic AMOLED 2X سرویس پک با قلم S Pen کالیبره.', 'Glass-only replacement with OCA vacuum (40% cheaper), Dynamic AMOLED 2X service pack LCD with calibrated S Pen.')}</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">{t('تعمیرات شیائومی و پوکو', 'Xiaomi & Poco Repair')}</h3>
            <p>{t('آنلاک Mi Account قانونی با فاکتور، ریبال CPU و هارد UFS بعد ضربه، فلش رام رسمی و رفع بوت لوپ.', 'Legal Mi Account unlock with invoice, CPU and UFS hard reball after impact, official ROM flash and bootloop fix.')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentMobile;
