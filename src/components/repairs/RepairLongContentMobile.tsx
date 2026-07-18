import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Wrench, Smartphone, Shield, Clock } from 'lucide-react';

const RepairLongContentMobile = () => {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto">
        {/* Intro */}
        <div className="card-premium p-6 md:p-8 rounded-2xl mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Smartphone size={28} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground">تعمیرات تخصصی موبایل</h2>
              <p className="text-sm text-muted-foreground mt-1">آیفون ۱۷ پرو، ۱۶ پرو، سامسونگ S25 Ultra، S24 Ultra، A56، A36، شیائومی 15T، ردمی نوت ۱۴ پرو، پوکو M7</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <img src="/images/repairs/mobile-repair-1.jpg" alt="تعمیر موبایل آیفون سامسونگ" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/mobile-phone-repair-technician-professio-1.jpg" alt="تعمیر برد موبایل با میکروسکوپ" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
            <img src="/images/repairs/mobile-repair-2.jpg" alt="تعویض ال سی دی" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-sm leading-8 text-muted-foreground">
            <p>
              گوشی شما شکسته، آبخورده یا خاموش شده؟ مرکز تخصصی تعمیرات موبایل آرمان همراه با مجهزترین لابراتوار میکروسکوپ و ابزار کالیبره، انواع گوشی <strong>آیفون ۱۷ پرو، ۱۶ پرو، سامسونگ S25 Ultra، S24 Ultra، S25 FE، A56، A36، شیائومی 15T، ردمی نوت ۱۴ پرو، پوکو M7 و C85</strong> را با قطعات ۱۰۰٪ اورجینال و گارانتی ۳ ماهه تعمیر می‌کند. عیب‌یابی رایگان.
            </p>

            <h3 className="text-lg font-bold text-foreground mt-8">چرا آرمان همراه؟</h3>
            <ul className="space-y-2 mt-3">
              {[
                'لابراتوار میکروسولدر: میکروسکوپ ۳ چشمی، هیتر Quick، پروگرامر JC',
                'قطعه اورجینال سرویس پک با TrueTone و ۱۲۰ هرتز واقعی',
                'تکنسین Certified دوره دیده در دبی',
                'تست ۲۰ مرحله‌ای و گارانتی کتبی ۳ ماهه'
              ].map((t,i)=><li key={i} className="flex gap-2"><CheckCircle2 size={16} className="text-green-500 mt-1 flex-shrink-0" />{t}</li>)}
            </ul>

            <h3 className="text-lg font-bold text-foreground mt-8">تعمیرات آیفون</h3>
            <p>تعویض ال‌سی‌دی اورجینال Super Retina XDR با کالیبره TrueTone، تعویض باتری اصلی با هلث ۱۰۰٪، تعمیر برد آبخورده و ارور ۴۰۱۳، تعمیر فیس آیدی و دوربین.</p>

            <h3 className="text-lg font-bold text-foreground mt-8">تعمیرات سامسونگ</h3>
            <p>تعویض گلس بدون ال‌سی‌دی با وکیوم OCA (۴۰٪ ارزان‌تر)، تعویض ال‌سی‌دی Dynamic AMOLED 2X سرویس پک با قلم S Pen کالیبره، تعمیر برد و شارژ، تعمیر قلم S Pen.</p>

            <h3 className="text-lg font-bold text-foreground mt-8">تعمیرات شیائومی و پوکو</h3>
            <p>آنلاک Mi Account قانونی با فاکتور، ریبال CPU و هارد UFS بعد ضربه، فلش رام رسمی و رفع بوت لوپ، تعویض باتری ۵۵۰۰mAh با ظرفیت واقعی.</p>

            <div className="mt-8 p-4 rounded-xl bg-secondary/50 border">
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentMobile;
