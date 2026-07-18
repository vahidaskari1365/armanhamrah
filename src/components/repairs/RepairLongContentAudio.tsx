import { CheckCircle2, Headset } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const RepairLongContentAudio = () => {
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
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Headset size={28} className="text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground warranty-title">{t('تعمیر تخصصی ایرپاد', 'Professional AirPods Repair')}</h2>
              <p className="text-sm text-muted-foreground mt-1 warranty-text">AirPods Pro 2, AirPods 4, Max, Case</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <img src="/images/repairs/airpods-repair-1.jpg" alt="AirPods" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/airpods-pro-repair-close-up-1.jpg" alt="Battery" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/buds-repair-1.webp" alt="Buds" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground warranty-text">
            <p>{t('ایرپاد یک گوش کار نمی‌کند؟ باتری زود خالی؟ کیس شارژ نمی‌کند؟ ما با باتری Varta آلمان و چسب B7000 و پرس ۳ ساعته تعمیر می‌کنیم.', 'One side not working? Battery drains fast? Case not charging? We repair with German Varta battery, B7000 glue and 3-hour press.')}</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">{t('خدمات ایرپاد', 'AirPods Services')}</h3>
            <ul className="space-y-2 mt-3">
              {[
                t('تعویض باتری ۴۵mAh Varta اصلی - ۶ ساعت پخش با ANC', '45mAh original Varta battery - 6h playback with ANC'),
                t('تعمیر کیس MagSafe - باتری ۵۲۰mAh و IC Qi', 'MagSafe case repair - 520mAh battery & Qi IC'),
                t('رفع یک گوش کار نکردن - سنسور مجاورت و فریمور', 'One side fix - proximity sensor & firmware'),
                t('تعمیر میکروفون و ANC', 'Mic and ANC repair')
              ].map((txt,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1" />{txt}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentAudio;
