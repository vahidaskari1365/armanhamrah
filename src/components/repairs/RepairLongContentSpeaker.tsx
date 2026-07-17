import { CheckCircle2, MapPin, Speaker } from 'lucide-react';

const RepairLongContentSpeaker = () => {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto">
        <div className="card-premium p-6 md:p-8 rounded-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Speaker size={28} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground">تعمیر اسپیکر و باند</h2>
              <p className="text-sm text-muted-foreground mt-1">JBL Charge 5، Flip 6، سونی، هارمن کاردن، پارتی باکس، ساندبار</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <img src="/images/repairs/speaker-repair-1.webp" alt="تعمیر اسپیکر" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/bluetooth-speaker-repair-technician-2.jpg" alt="آمپلی‌فایر" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground">
            <p>روشن نمی‌شود؟ شارژ نگه نمی‌دارد؟ خش خش می‌کند؟ بلوتوث وصل نمی‌شود؟ با اسیلوسکوپ و تستر درایور تعمیر می‌کنیم.</p>

            <h3 className="text-lg font-bold text-foreground mt-8">خدمات اسپیکر و باند</h3>
            <ul className="space-y-2 mt-3">
              {[
                'تعمیر برد آمپلی‌فایر TPA3116 سوخته',
                'تعویض باتری ۷۵۰۰mAh اصلی',
                'تعمیر درایور پاره و کویل',
                'تعمیر بلوتوث CSR8645 و پورت USB-C'
              ].map((t,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1" />{t}</li>)}
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-secondary/50 border">
              <h4 className="font-bold text-foreground mb-2 flex items-center gap-2"><MapPin size={14} className="text-amber-600" /> بیا پیش ما برای اسپیکر و باند:</h4>
              <p className="text-xs leading-7">تهران، خیابان مطهری، بعد از مفتح، ابتدای سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۲۰۴ - تست صدا رایگان، فیلم واتساپ.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentSpeaker;
