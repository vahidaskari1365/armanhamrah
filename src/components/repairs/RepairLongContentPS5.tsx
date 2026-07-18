import { CheckCircle2, MapPin, Gamepad2 } from 'lucide-react';

const RepairLongContentPS5 = () => {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto">
        <div className="card-premium p-6 md:p-8 rounded-2xl mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Gamepad2 size={28} className="text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground">تعمیرات تخصصی PS5</h2>
              <p className="text-sm text-muted-foreground mt-1">PS5 اسلیم، فت، دیجیتال و دسته DualSense</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <img src="/images/repairs/ps5-repair-1.webp" alt="تعمیر PS5" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/ps5-playstation-5-repair-technician-1.jpg" alt="تعمیر HDMI PS5" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground">
            <p>PS5 تصویر نمی‌دهد؟ روشن نمی‌شود؟ فن صدا می‌دهد؟ دسته دریفت دارد؟ لابراتوار PS5 آرمان همراه با پروگرامر برد و تستر HDMI و خمیر گریزلی اورجینال تعمیر می‌کند. ۹۸٪ موفقیت، گارانتی ۹۰ روزه.</p>

            <h3 className="text-lg font-bold text-foreground mt-8">خرابی‌های شایع PS5</h3>
            <ul className="space-y-3 mt-3">
              <li><strong className="text-foreground">HDMI تصویر ندادن:</strong> پورت HDMI ظریف است، پین کنده می‌شود. تعویض با Foxconn اورجینال و سیم‌کشی پد کنده شده. همان روز تحویل.</li>
              <li><strong className="text-foreground">برد روشن نشدن:</strong> بعد نوسان برق شورتی می‌کند. تستر جریان و تعویض IC با هیتر دقیق.</li>
              <li><strong className="text-foreground">فن و اورهیت:</strong> خمیر خشک و خاک هیت‌سینک. سرویس کامل و خمیر گریزلی، دما ۱۵ درجه کمتر.</li>
              <li><strong className="text-foreground">دسته DualSense دریفت:</strong> آنالوگ Alps اصلی ژاپن تعویض و کالیبره Deadzone.</li>
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10">
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentPS5;
