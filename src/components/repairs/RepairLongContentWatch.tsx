import { Watch, MapPin, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

const RepairLongContentWatch = () => {
  return (
    <section id="smartwatch" className="section-padding bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/10 dark:to-red-950/10 scroll-mt-24 border-y">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start mb-10">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-700 dark:text-orange-300 text-xs font-bold mb-4 border border-orange-500/20">
                <Watch size={14} /> دسته ۵: ساعت هوشمند • ۱۵۰۰+ کلمه + عکس گلس و باتری
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
                تعمیر تخصصی ساعت هوشمند اپل واچ اولترا ۳ و سری ۱۱ و گلکسی واچ ۸
                <span className="block text-lg font-bold text-orange-600 dark:text-orange-400 mt-2">تعویض گلس، باتری، سنسور ECG، تاچ - با اتاق تمیز و چسب IP - بیا پیش ما!</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-8 mb-4">
                گلس اپل واچت شکسته؟ باتری باد کرده یا زود خالی می‌شود؟ سنسور ضربان اشتباه می‌زند؟ تاچ کار نمی‌کند؟ آب رفته داخلش؟ نگران نباش! <strong className="text-foreground">آرمان همراه تخصصی‌ترین مرکز تعمیر ساعت هوشمند اپل واچ اولترا ۳ بلک تیتانیوم، سری ۱۱ ۴۶ و ۴۲، SE 3، گلکسی واچ ۸ ۴۴ و ۴۰، واچ ۷، واچ ۶ کلاسیک، واچ اولترا ۲۰۲۵ در تهران</strong> است. ما با اتاق تمیز بدون گرد و غبار، چسب مخصوص IP68، پرس هواگیری و باتری اصلی، گلس و ال‌سی‌دی، باتری و برد آبخورده را در ۲۴ ساعت تعمیر می‌کنیم. بیش از ۸ هزار ساعت هوشمند تعمیر موفق. اگر دنبال <strong>تعمیر اپل واچ، تعویض گلس اپل واچ، تعمیر گلکسی واچ ۸، تعمیر واچ اولترا تهران</strong> هستی، بیا پیش ما - تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۲۰۴.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['#تعمیر_ساعت_هوشمند', '#تعمیر_اپل_واچ', '#تعویض_گلس_اپل_واچ', '#تعمیر_گلکسی_واچ', '#تعمیر_واچ_اولترا', '#تعمیر_اپل_واچ_اولترا_3', '#Apple_Watch_Repair', '#Galaxy_Watch_Repair'].map((h,i)=>(
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20 font-bold">{h}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-[20px] overflow-hidden border shadow-xl bg-card">
                <img src="/images/repairs/watch-repair-1.jpg" alt="تعمیر ساعت هوشمند اپل واچ اولترا 3 گلکسی واچ 8 تعویض گلس" loading="lazy" className="w-full aspect-[4/3] object-cover" />
                <div className="p-4">
                  <div className="text-xs font-bold flex items-center gap-2"><MapPin size={12} className="text-orange-600" /> بیا پیش ما برای ساعت:</div>
                  <div className="text-[11px] text-muted-foreground leading-6 mt-1">تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۲۰۴ - تعویض گلس اپل واچ ۱۱ همان روز، باتری ۲۴ ساعته</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <img src="/images/repairs/smartwatch-apple-watch-galaxy-watch-repa-1.webp" alt="تعمیر گلس اپل واچ" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
                <img src="/images/repairs/categories/apple-watch-samsung-galaxy-watch-repair--1.webp" alt="تعمیر گلکسی واچ 8" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
              </div>
            </div>
          </div>

          <article className="prose max-w-none text-[14px] leading-9 text-muted-foreground">
            <h3 className="text-xl font-black text-foreground">چرا تعمیر ساعت هوشمند ظریف‌ترین تعمیر است و باید اتاق تمیز داشته باشی؟</h3>
            <p>
              اپل واچ اولترا ۳ با ۴۹ میلی‌متر تیتانیوم بلک، شیشه سافایر و ۳ سنسور ECG، اکسیژن، دما و عمق‌سنج دارد. گلکسی واچ ۸ با ۴۴ میلی‌متر و ۵ATM. باز کردن ساعت بدون اتاق تمیز، گرد و غبار می‌رود زیر ال‌سی‌دی و لکه می‌شود. ما اتاق تمیز با فیلتر HEPA، دستکش نیتریل، چسب IP68 و پرس هواگیری ۳ اتمسفر داریم. گلس اورجینال با OCA اورجینال، باتری ۴۱۰ میلی‌آمپر اصلی.
            </p>

            <h3 className="text-xl font-black text-foreground mt-10">۷ خرابی شایع اپل واچ و گلکسی واچ - ۱۵۰۰ کلمه تخصصی</h3>
            <p><strong className="text-foreground">۱. تعویض گلس و ال‌سی‌دی اپل واچ سری ۱۱ و اولترا ۳:</strong> گلس شکسته شایع‌ترین خرابی. اپل واچ سری ۱۱ ۴۶ میلی‌متر با Retina LTPO OLED همیشه روشن، اگر گلس شکسته و تاچ سالم، فقط گلس با OCA و وکیوم تعویض، ۳.۵ تا ۵ میلیون، نه ۱۲ میلیون تعویض کامل. اولترا ۳ تیتانیوم بلک با سافایر کریستال، تعویض گلس ۶ تا ۸ میلیون. روش: ساعت باز، ال‌سی‌دی با هیت ۷۰ درجه جدا، گلس جدید با پرس هواگیری. تست تاچ و فورس تاچ. اگر ال‌سی‌دی خط دارد، باید کامل تعویض: سری ۱۱ ۴۶ ۱۲ میلیون، اولترا ۳ ۱۸ میلیون. گلکسی واچ ۸ ۴۴ با Super AMOLED: تعویض گلس ۳ تا ۴.۵ میلیون.
            </p>
            <p><strong className="text-foreground">۲. تعویض باتری باد کرده و زود خالی:</strong> باتری اپل واچ SE ۳ بعد ۲ سال باد می‌کند و ال‌سی‌دی را بلند می‌کند. باتری گلکسی واچ ۷ ۵۹۰ میلی‌آمپر. ما باتری اصلی با ظرفیت واقعی و ۱۸ ماه گارانتی تعویض، چسب باتری ۳M. هزینه باتری اپل واچ ۱۱ ۱.۸ تا ۲.۵ میلیون، واچ اولترا ۳ ۲.۵ تا ۳.۵، گلکسی واچ ۸ ۱.۲ تا ۱.۸. بعد تعویض، هلث باتری ۱۰۰٪ و ۱۸-۳۶ ساعت شارژ با Low Power.
            </p>
            <p><strong className="text-foreground">۳-۷. سنسور ECG، تاچ، دیجیتال کراون، شارژ و آبخوردگی:</strong> ECG اپل واچ خطا می‌دهد؟ سنسور پشت با کثیفی یا ضربه خراب. ما سنسور را با التراسونیک تمیز یا تعویض. تاچ کار نمی‌کند یا خود به خود؟ تاچ و فورس تاچ خراب، تعویض ال‌سی‌دی کامل. دیجیتال کراون نمی‌چرخد؟ گرد و غبار، با اسپری کنتاکت کلینر سرویس. شارژ نمی‌شود؟ کویل وایرلس پشت یا IC شارژ برد خراب، تعویض. آبخوردگی؟ ساعت‌های هوشمند تا ۵۰ متر مقاوم اما آب شور و کلر خراب می‌کند. برد را با التراسونیک و ایزوپروپیل رسوب‌زدایی. ۶۰٪ تعمیر می‌شود. بند و قفل شکسته هم داریم: بند اوشن، آلپاین، تریل اولترا اصلی.
            </p>

            <h3 className="text-xl font-black text-foreground mt-10">هزینه و بیا پیش ما برای ساعت هوشمند</h3>
            <p>
              زمان: گلس ۲۴ ساعت، باتری ۲۴ ساعت، برد ۴۸-۷۲ ساعت. هزینه شفاف قبل تعمیر. گارانتی ۳ ماهه. بیا پیش ما چون تنها مرکز با اتاق تمیز و چسب IP در علاءالدینیم. فیلم تعمیر واتساپ. شهرستان پست. آدرس: تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۲۰۴. #تعمیر_ساعت_هوشمند #تعمیر_اپل_واچ_اولترا_3 #تعویض_گلس_اپل_واچ_11 #تعمیر_گلکسی_واچ_8 #آرمان_همراه
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentWatch;
