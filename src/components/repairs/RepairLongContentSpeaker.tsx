import { CheckCircle2, Speaker } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const RepairLongContentSpeaker = () => {
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
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Speaker size={28} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground warranty-title">{t('تعمیر اسپیکر و باند', 'Speaker & Audio Repair')}</h2>
              <p className="text-sm text-muted-foreground mt-1 warranty-text">JBL Charge 5, Flip 6, Sony, Harman Kardon, PartyBox, Soundbar</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <img src="/images/repairs/speaker-repair-1.webp" alt="Speaker" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/bluetooth-speaker-repair-technician-2.jpg" alt="Amp" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground warranty-text">
            <p>{t('روشن نمی‌شود؟ شارژ نگه نمی‌دارد؟ خش خش می‌کند؟ بلوتوث وصل نمی‌شود؟ با اسیلوسکوپ و تستر درایور تعمیر می‌کنیم.', 'No power? No charge? Hissing? No Bluetooth? We repair with oscilloscope and driver tester.')}</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">{t('خدمات اسپیکر و باند', 'Speaker Services')}</h3>
            <ul className="space-y-2 mt-3">
              {[
                t('تعمیر برد آمپلی‌فایر TPA3116 سوخته', 'Burnt TPA3116 amplifier board repair'),
                t('تعویض باتری ۷۵۰۰mAh اصلی', 'Original 7500mAh battery replacement'),
                t('تعمیر درایور پاره و کویل', 'Torn driver and coil repair'),
                t('تعمیر بلوتوث CSR8645 و پورت USB-C', 'CSR8645 Bluetooth and USB-C port repair')
              ].map((txt,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1" />{txt}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentSpeaker;
