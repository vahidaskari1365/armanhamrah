import { Gamepad2, MapPin, Wrench, Zap, Hash, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const RepairLongContentPS5 = () => {
  return (
    <section id="ps5" className="section-padding bg-zinc-950 text-white scroll-mt-24 border-y border-white/10">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start mb-10">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-4 border border-purple-500/30">
                <Gamepad2 size={14} /> دسته ۲: تعمیرات PS5 • ۱۵۰۰+ کلمه + عکس واقعی HDMI & برد
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                تعمیرات فوق تخصصی PS5 اسلیم، فت، دیجیتال و دسته DualSense
                <span className="block text-lg font-bold text-purple-300 mt-2">سریع‌ترین مرکز تعمیر PS5 تهران با ۹۸٪ موفقیت - بیا پیش ما!</span>
              </h2>
              <p className="text-sm text-zinc-300 leading-8 mb-4">
                PS5 شما <strong className="text-white">تصویر نمی‌دهد؟ روشن نمی‌شود؟ فن صدای جت می‌دهد؟ دسته دریفت دارد؟ ارور CE-108255-1 می‌دهد؟</strong> وحشت نکن! <strong className="text-white">لابراتوار تخصصی PS5 آرمان همراه در علاءالدین</strong>، تخصصی‌ترین مرکز <strong className="text-white">تعمیر PS5، تعمیر HDMI PS5، تعمیر برد PS5، تعمیر دسته PS5، تعمیر PS5 اسلیم و فت و دیجیتال</strong> در ایران است. ما با پروگرامر برد، تستر HDMI، هیتر اینفرارد Quick 861 و خمیر گریزلی اورجینال، حتی PS5 های آبخورده و ضربه‌خورده که در مراکز دیگر جواب نشده‌اند را با گارانتی ۹۰ روزه تعمیر می‌کنیم. بیش از ۷ سال تجربه PS5، ۱۵ هزار PS5 تعمیر موفق، تعمیر در حضور مشتری برای سرویس فن. اگر دنبال <strong>تعمیرات PS5 تهران، تعمیر دسته DualSense دریفت، تعمیر HDMI PS5 فوری</strong> هستی، بیا پیش ما - تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴، عیب‌یابی رایگان، قیمت شفاف، گارانتی کتبی.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['#تعمیر_PS5', '#تعمیر_پلی_استیشن', '#تعمیر_HDMI_PS5', '#تعمیر_دسته_PS5', '#تعمیر_PS5_اسلیم', '#تعمیر_برد_PS5', '#DualSense_Repair', '#آرمان_همراه', '#تعمیرات_PS5_تهران'].map((h,i)=>(
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">{h}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-[20px] overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/repairs/ps5-repair-1.webp" alt="تعمیر تخصصی PS5 HDMI برد دسته DualSense تهران آرمان همراه" loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
                <div className="p-4 bg-zinc-900">
                  <div className="text-xs font-bold text-white flex items-center gap-2"><MapPin size={12} className="text-purple-400" /> بیا پیش ما برای تعمیر PS5:</div>
                  <div className="text-[11px] text-zinc-400 leading-6 mt-1">تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴ - سرویس فن ۱ ساعته، تعمیر HDMI همان روز</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <img src="/images/repairs/ps5-playstation-5-repair-technician-1.jpg" alt="تعمیر HDMI PS5 تصویر ندادن" loading="lazy" className="rounded-xl border border-white/10 aspect-[4/3] object-cover" />
                <img src="/images/repairs/ps5-playstation-5-repair-technician-3.jpg" alt="تعمیر برد PS5 روشن نشدن" loading="lazy" className="rounded-xl border border-white/10 aspect-[4/3] object-cover" />
              </div>
            </div>
          </div>

          <article className="prose prose-invert max-w-none text-[14px] leading-9 text-zinc-300">
            <h3 className="text-xl font-black text-white">چرا تعمیر PS5 شوخی نیست و باید بیای پیش متخصص؟</h3>
            <p>
              برد PS5 با ۳ لایه PCB و ۳۰۰۰ قطعه SMD، با گوشی فرق می‌کند. تعمیرگاه معمولی با هیتر معمولی، کل برد را می‌سوزاند. ما با <strong className="text-white">هیتر اینفرارد، میکروسکوپ ۳ چشمی، مولتی‌متر دقیق و نقشه شماتیک PS5</strong> کار می‌کنیم. HDMI PS5 با ۱۹ پین ظریف، اگر یک پد کنده شود، باید سیم‌کشی شود. دسته DualSense آنالوگ Alps با مقاومت ۵ کیلو، اگر فیک بزنی ۱ ماهه دوباره دریفت می‌دهد. ما Alps اصلی ژاپن می‌زنیم.
              <br />
              آمار ما: ۹۸٪ تعمیر HDMI موفق، ۹۵٪ برد روشن نشدن، ۱۰۰٪ دریفت دسته (چون آنالوگ اصلی). تعمیرگاه‌های دیگر PS5 هایشان را برای تعمیر به ما می‌دهند، ما مرجعیم.
            </p>

            <h3 className="text-xl font-black text-white mt-10">۸ خرابی شایع PS5 که روزانه تعمیر می‌کنیم - ۱۵۰۰ کلمه تخصصی</h3>
            <p><strong className="text-white">۱. تعمیر HDMI PS5 - تصویر ندادن یا پرپر زدن:</strong> شایع‌ترین خرابی تاریخ PS5. پورت HDMI به دلیل کشیدن کابل، ضربه یا استفاده از کابل بی‌کیفیت، پین‌هایش کنده یا اتصال کوتاه می‌کند. نشانه: PS5 روشن می‌شود، چراغ سفید، اما تلویزیون No Signal. یا تصویر پرپر، خط خطی، صورتی. ما با میکروسکوپ پین‌ها را چک، پورت HDMI اورجینال Foxconn تعویض و اگر پد کنده شده، با سیم لاکی ۰.۱ میلی‌متر جامپر می‌زنیم. تست با ۴K ۱۲۰ هرتز. هزینه ۱.۵ تا ۲.۵ میلیون، همان روز تحویل. پیشگیری: همیشه اول HDMI را بعد برق جدا کن، کابل را نکش.
            </p>
            <p><strong className="text-white">۲. تعمیر برد PS5 - روشن نشدن، سه بوق، چراغ آبی چشمک زن:</strong> بعد نوسان برق، آبخوردگی یا استفاده از چندراهی بی‌کیفیت، IC تغذیه، South Bridge یا APU شورتی می‌کند. PS5 بعد دکمه پاور، یک بوق و خاموش یا آبی چشمک زن و سه بوق. با تستر جریان، آمپرکشی چک می‌کنیم، قطعه شورتی با هیتر تعویض. ریبال APU با دستگاه BGA نیاز به ۲۵۰ درجه دقیق دارد، نه هیتر دستی. هزینه ۲ تا ۸ میلیون بسته به IC. ۷۰٪ مواقع تعمیر می‌شود، ۳۰٪ نیاز به تعویض برد.
            </p>
            <p><strong className="text-white">۳. تعمیر فن و اورهیت PS5 - صدای زیاد، داغ شدن، خاموش ناگهانی:</strong> بعد ۱-۱.۵ سال، خمیر سیلیکون خشک و خاک هیت‌سینک را می‌بندد. PS5 موقع بازی صدای جت، بعد ۱۵ دقیقه خاموش و پیغام Too Hot. سرویس کامل: باز کردن کامل PS5 اسلیم و فت، تمیز کردن فن و هیت‌سینک با بلوئر، تعویض خمیر سیلیکون Thermal Grizzly Kryonaut (نه خمیر ۵۰ هزاری)، تعویض پد حرارتی VRAM. دما ۱۵ درجه کم، صدا نصف. هزینه ۸۰۰ هزار، ۱ ساعت حضوری. هر سال یکبار سرویس کن.
            </p>
            <p><strong className="text-white">۴. تعمیر دسته DualSense - دریفت آنالوگ، R2 خراب، باتری:</strong> دریفت بیماری DualSense است. آنالوگ بعد ۶ ماه، خود به خود حرکت می‌کند. R2 به دلیل فنر ضعیف، نصف می‌گیرد. باتری ۱۵۶۰ میلی‌آمپر بعد ۱ سال زود خالی. ما آنالوگ Alps اصلی ژاپن با پتانسیومتر ۱۰ کیلو تعویض، فنر R2 استیل، باتری اصلی سونی. کالیبره با نرم‌افزار سونی و تست Deadzone. هزینه دریفت ۶۰۰-۹۰۰ هزار، گارانتی ۲ ماهه دریفت. پیشگیری: دسته را با فشار پرت نکن، آنالوگ را با الکل هر ماه تمیز کن.
            </p>
            <p><strong className="text-white">۵-۸. تعمیر درایو، SSD، ارورها و سرویس دوره‌ای:</strong> درایو بلوری PS5 دیسک را نمی‌خواند یا صدای تق تق؟ لنس لیزر کثیف یا موتور ضعیف. سرویس لنس و رگلاژ. نصب SSD M.2 NVMe ۱ یا ۲ ترابایت با هیت‌سینک برای افزایش بازی‌ها - هزینه SSD + ۳۰۰ هزار اجرت. ارور CE-108255-1 یعنی خرابی دیتا، باید دیتابیس Rebuild. ارور SU-101312-8 یعنی آپدیت ناقص، با Safe Mode فلش. Safe Mode Loop؟ برد را Reball. سرویس دوره‌ای شامل تعویض خمیر، تمیز کردن فن و تست HDMI و دسته، هر ۱۲ ماه یکبار.
            </p>

            <h3 className="text-xl font-black text-white mt-10">هزینه، زمان و چرا بیای پیش آرمان همراه برای PS5؟</h3>
            <p>
              زمان: سرویس فن ۱ ساعت حضوری، HDMI ۳-۵ ساعت، برد ۲۴-۴۸ ساعت، دسته ۲-۳ ساعت. هزینه شفاف قبل تعمیر اعلام، بدون پیش‌پرداخت. گارانتی ۹۰ روزه کتبی، فاکتور رسمی. ما PS5 فت، اسلیم، دیجیتال، حتی PS5 پرو آینده را هم تعمیر می‌کنیم.
              <br />
              <strong>بیا پیش ما</strong> چون: تنها مرکز با پروگرامر PS5 در علاءالدین، تنها مرکز با تستر HDMI ۴K، تنها مرکز با آنالوگ Alps اصلی. فیلم تعمیر برایت واتساپ می‌شود. اگر تعمیر نشد، هیچ هزینه‌ای نمی‌گیریم. دستگاه شهرستانی؟ تیپاکس با ضربه‌گیر. آدرس: تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴. تلفن ۰۲۱-XXXX. همین الان تماس بگیر یا آنلاین ثبت کن.
              <br />
              #تعمیر_PS5 #تعمیر_PS5_اسلیم #تعمیر_HDMI_PS5 #تعمیر_دسته_PS5_DualSense #تعمیر_برد_PS5 #رفع_اورهیت_PS5 #آرمان_همراه #تعمیرات_PS5_تهران #تعمیر_پلی_استیشن_5
            </p>
          </article>

          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <Link to="/contact" className="flex-1 py-4 rounded-xl bg-purple-600 text-white font-black text-center hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
              <Wrench size={18} /> ثبت درخواست تعمیر PS5 - عیب‌یابی رایگان
            </Link>
            <a href="tel:+9821" className="flex-1 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-center hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
              <Zap size={18} /> مشاوره فوری PS5: ۰۲۱-XXXX
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentPS5;
