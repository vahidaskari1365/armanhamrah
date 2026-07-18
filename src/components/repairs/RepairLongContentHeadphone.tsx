import { CheckCircle2, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const RepairLongContentHeadphone = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  const t = (fa: string, en: string) => isFa ? fa : en;

  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto">
        <Link to="/repair" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 text-sm font-titr">
          <ChevronLeft size={16} /> {t('بازگشت به هاب تعمیرات', 'Back to Repair Hub')}
        </Link>

        <div className="card-premium p-6 md:p-8 rounded-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Headphones size={28} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground warranty-title">{t('تعمیر هدفون بلوتوثی', 'Bluetooth Headphone Repair')}</h2>
              <p className="text-sm text-muted-foreground mt-1 warranty-text">Galaxy Buds 3 Pro, Buds 3, Anker R60i NC, R50i, P40i, Sony, JBL</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <img src="/images/repairs/headphone-repair-1.jpg" alt="Headphone" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/buds-repair-1.webp" alt="Buds" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground warranty-text">
            <p>{t('هدفون بلوتوثی وصل نمی‌شود؟ یک گوش قطع؟ خش خش می‌کند؟ باتری زود خالی؟ گلکسی بادز ۳ پرو و انکر R60i NC و سونی و JBL را با تستر و باتری اصلی تعمیر می‌کنیم.', 'Bluetooth headphone not connecting? One side cut? Hissing? Battery draining? We repair Galaxy Buds 3 Pro, Anker R60i NC, Sony and JBL with tester and original battery.')}</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">{t('خدمات هدفون', 'Headphone Services')}</h3>
            <ul className="space-y-2 mt-3">
              {[
                t('تعویض باتری ۵۰mAh اصلی', 'Original 50mAh battery replacement'),
                t('تعمیر میکروفون ENC و اسپیکر ۱۰mm', 'ENC mic and 10mm speaker repair'),
                t('رفع مشکل بلوتوث و ANC', 'Bluetooth and ANC fix'),
                t('تعمیر کیس شارژ و درب', 'Charging case and lid repair')
              ].map((txt,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1" />{txt}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentHeadphone;
