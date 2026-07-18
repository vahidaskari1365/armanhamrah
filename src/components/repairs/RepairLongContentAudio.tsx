import { CheckCircle2, Headset } from 'lucide-react';

const RepairLongContentAudio = () => {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto">
        <div className="card-premium p-6 md:p-8 rounded-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Headset size={28} className="text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground warranty-title">تعمیر تخصصی ایرپاد</h2>
              <p className="text-sm text-muted-foreground mt-1 warranty-text">ایرپاد پرو ۲، ایرپاد ۴، ایرپاد مکس، کیس شارژ</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <img src="/images/repairs/airpods-repair-1.jpg" alt="تعمیر ایرپاد" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/airpods-pro-repair-close-up-1.jpg" alt="باتری ایرپاد" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/buds-repair-1.webp" alt="تعمیر بادز" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground warranty-text">
            <p>ایرپاد یک گوش کار نمی‌کند؟ باتری زود خالی؟ کیس شارژ نمی‌کند؟ فکر می‌کنی قابل تعمیر نیست؟ ما با باتری Varta آلمان و چسب B7000 و پرس ۳ ساعته تعمیر می‌کنیم.</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">خدمات ایرپاد</h3>
            <ul className="space-y-2 mt-3">
              {[
                'تعویض باتری ۴۵mAh Varta اصلی - ۶ ساعت پخش با ANC',
                'تعمیر کیس MagSafe - باتری ۵۲۰mAh و IC Qi',
                'رفع یک گوش کار نکردن - سنسور مجاورت و فریمور',
                'تعمیر میکروفون و ANC - میکروفون بیرونی'
              ].map((t,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1" />{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentAudio;
