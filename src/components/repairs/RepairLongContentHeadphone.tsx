import { CheckCircle2, Headphones } from 'lucide-react';

const RepairLongContentHeadphone = () => {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto">
        <div className="card-premium p-6 md:p-8 rounded-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Headphones size={28} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground warranty-title">تعمیر هدفون بلوتوثی</h2>
              <p className="text-sm text-muted-foreground mt-1 warranty-text">گلکسی بادز ۳ پرو، بادز ۳، انکر R60i NC، R50i، P40i، سونی، JBL</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <img src="/images/repairs/headphone-repair-1.jpg" alt="تعمیر هدفون" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/buds-repair-1.webp" alt="تعمیر بادز" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground warranty-text">
            <p>هدفون بلوتوثی وصل نمی‌شود؟ یک گوش قطع؟ خش خش می‌کند؟ باتری زود خالی؟ گلکسی بادز ۳ پرو و انکر R60i NC و سونی و JBL را با تستر و باتری اصلی تعمیر می‌کنیم.</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">خدمات هدفون</h3>
            <ul className="space-y-2 mt-3">
              {[
                'تعویض باتری ۵۰mAh اصلی',
                'تعمیر میکروفون ENC و اسپیکر ۱۰mm',
                'رفع مشکل بلوتوث و ANC',
                'تعمیر کیس شارژ و درب'
              ].map((t,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1" />{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentHeadphone;
