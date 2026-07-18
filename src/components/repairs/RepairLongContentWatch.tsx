import { CheckCircle2, Watch } from 'lucide-react';

const RepairLongContentWatch = () => {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto">
        <div className="card-premium p-6 md:p-8 rounded-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Watch size={28} className="text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground warranty-title">تعمیر ساعت هوشمند</h2>
              <p className="text-sm text-muted-foreground mt-1 warranty-text">اپل واچ اولترا ۳، سری ۱۱، SE، گلکسی واچ ۸، واچ ۷، واچ اولترا</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <img src="/images/repairs/watch-repair-1.jpg" alt="تعمیر ساعت" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/smartwatch-apple-watch-galaxy-watch-repa-1.webp" alt="تعویض گلس اپل واچ" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground warranty-text">
            <p>گلس شکسته، باتری باد کرده، سنسور ECG خطا، تاچ کار نمی‌کند، آب رفته؟ با اتاق تمیز HEPA و چسب IP68 و پرس هواگیری تعمیر می‌کنیم.</p>

            <h3 className="text-lg font-bold text-foreground mt-8 warranty-title">خدمات ساعت هوشمند</h3>
            <ul className="space-y-2 mt-3">
              {[
                'تعویض گلس سافایر با OCA و پرس ۳ اتمسفر - ۲۴ ساعته',
                'تعویض باتری باد کرده ۵۹۰mAh اصلی',
                'تعمیر سنسور ECG، اکسیژن، دما، فشار',
                'تعمیر برد آبخورده با التراسونیک'
              ].map((t,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1" />{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentWatch;
