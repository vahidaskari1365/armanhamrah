import { CheckCircle2, Watch } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const RepairLongContentWatch = () => {
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
            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Watch size={28} className="text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground warranty-title">{t('تعمیر ساعت هوشمند', 'Smartwatch Repair')}</h2>
              <p className="text-sm text-muted-foreground mt-1 warranty-text">Apple Watch Ultra 3, Series 11, SE, Galaxy Watch 8, Watch 7, Ultra</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <img src="/images/repairs/watch-repair-1.jpg" alt="Watch repair" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/smartwatch-apple-watch-galaxy-watch-repa-1.webp" alt="Glass" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground warranty-text">
            <p>{t('گلس شکسته، باتری باد کرده، سنسور ECG خطا، تاچ کار نمی‌کند، آب رفته؟ با اتاق تمیز HEPA و چسب IP68 و پرس هواگیری تعمیر می‌کنیم.', 'Broken glass, swollen battery, ECG sensor error, touch not working, water damage? We repair with HEPA clean room, IP68 glue and air-press.')}</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">{t('خدمات ساعت هوشمند', 'Smartwatch Services')}</h3>
            <ul className="space-y-2 mt-3">
              {[
                t('تعویض گلس سافایر با OCA و پرس ۳ اتمسفر - ۲۴ ساعته', 'Sapphire glass with OCA and 3-atm press - 24h'),
                t('تعویض باتری باد کرده ۵۹۰mAh اصلی', 'Swollen 590mAh original battery replacement'),
                t('تعمیر سنسور ECG، اکسیژن، دما، فشار', 'ECG, oxygen, temp, pressure sensor repair'),
                t('تعمیر برد آبخورده با التراسونیک', 'Water damaged board with ultrasonic')
              ].map((txt,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1" />{txt}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentWatch;
