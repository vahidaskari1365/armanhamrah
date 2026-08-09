import { CheckCircle2, Gamepad2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const RepairLongContentPS5 = () => {
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
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Gamepad2 size={28} className="text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground warranty-title">{t('تعمیرات تخصصی PS5', 'Professional PS5 Repair')}</h2>
              <p className="text-sm text-muted-foreground mt-1 warranty-text">PS5 Slim, Fat, Digital, DualSense</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <img src="/images/repairs/ps5-repair-1.webp" alt="PS5 repair" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/ps5-playstation-5-repair-technician-1.jpg" alt="HDMI" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground warranty-text">
            <p>{t('PS5 تصویر نمی‌دهد؟ روشن نمی‌شود؟ فن صدا می‌دهد؟ دسته دریفت دارد؟ لابراتوار PS5 آرمان همراه با پروگرامر برد و تستر HDMI و خمیر گریزلی اورجینال تعمیر می‌کند. ۹۸٪ موفقیت، گارانتی ۹۰ روزه.', 'PS5 no image? No power? Loud fan? Controller drift? Arman Hamrah PS5 lab with board programmer, HDMI tester and Grizzly paste repairs it. 98% success, 90-day warranty.')}</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">{t('خرابی‌های شایع PS5', 'Common PS5 Issues')}</h3>
            <ul className="space-y-3 mt-3">
              <li><strong className="text-foreground warranty-title">{t('HDMI تصویر ندادن:', 'HDMI No Image:')}</strong> {t('پورت HDMI ظریف است، پین کنده می‌شود. تعویض با Foxconn اورجینال و سیم‌کشی.', 'HDMI port is delicate, pins break. Replacement with original Foxconn and jumper wiring.')}</li>
              <li><strong className="text-foreground warranty-title">{t('برد روشن نشدن:', 'Board No Power:')}</strong> {t('بعد نوسان برق شورتی می‌کند. تستر جریان و تعویض IC.', 'After power fluctuation, short circuit. Current tester and IC replacement.')}</li>
              <li><strong className="text-foreground warranty-title">{t('فن و اورهیت:', 'Fan & Overheat:')}</strong> {t('خمیر خشک و خاک هیت‌سینک. سرویس کامل و خمیر گریزلی.', 'Dry paste and dust. Full service and Grizzly paste.')}</li>
              <li><strong className="text-foreground warranty-title">{t('دسته DualSense دریفت:', 'DualSense Drift:')}</strong> {t('آنالوگ Alps اصلی ژاپن تعویض و کالیبره.', 'Original Japan Alps analog replacement and calibration.')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentPS5;
