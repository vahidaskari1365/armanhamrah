import { Speaker, Volume2, MapPin, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

const RepairLongContentSpeaker = () => {
  return (
    <section id="speaker" className="section-padding bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/10 dark:to-orange-950/10 scroll-mt-24 border-y">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start mb-10">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold mb-4 border border-amber-500/20">
                <Speaker size={14} /> دسته ۶: اسپیکر و باند • ۱۵۰۰+ کلمه + عکس درایور و آمپلی‌فایر
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
                تعمیر تخصصی اسپیکر بلوتوثی JBL، سونی، باند خانگی، پارتی باکس و ساندبار
                <span className="block text-lg font-bold text-amber-600 dark:text-amber-400 mt-2">تعمیر آمپلی‌فایر، باتری، درایور، برد بلوتوث - با اسیلوسکوپ و نقشه شماتیک - بیا پیش ما!</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-8 mb-4">
                اسپیکرت روشن نمی‌شود؟ شارژ نگه نمی‌دارد؟ خش خش می‌کند؟ بلوتوث وصل نمی‌شود؟ باند یک کانال کار نمی‌کند؟ پارتی باکس صدای باندش قطع شده؟ نگران نباش! <strong className="text-foreground">آرمان همراه تخصصی‌ترین مرکز تعمیر اسپیکر بلوتوثی JBL Charge 5، Flip 6، Xtreme 4، سونی SRS، هارمن کاردن، انکر Soundcore، پارتی باکس، ساندبار و باند اکتیو و پسیو خانگی در تهران</strong> است. ما با اسیلوسکوپ، تستر درایور، پروگرامر بلوتوث و باتری اصلی، آمپلی‌فایر سوخته، باتری باد کرده، درایور پاره و برد بلوتوث را تعمیر می‌کنیم. بیش از ۵ هزار اسپیکر و باند تعمیر موفق. اگر دنبال <strong>تعمیر اسپیکر بلوتوثی، تعمیر باند، تعمیر JBL، تعمیر پارتی باکس، تعمیر ساندبار تهران</strong> هستی، بیا پیش ما - علاءالدین طبقه ۶ پلاک ۶۱۴، عیب‌یابی رایگان، گارانتی ۲ ماهه.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['#تعمیر_اسپیکر', '#تعمیر_اسپیکر_بلوتوثی', '#تعمیر_باند', '#تعمیر_JBL', '#تعمیر_پارتی_باکس', '#تعمیر_ساندبار', '#تعمیر_باند_خانگی', '#Speaker_Repair'].map((h,i)=>(
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-bold">{h}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-[20px] overflow-hidden border shadow-xl bg-card">
                <img src="/images/repairs/speaker-repair-1.webp" alt="تعمیر اسپیکر بلوتوثی JBL سونی باند پارتی باکس آرمان همراه" loading="lazy" className="w-full aspect-[4/3] object-cover" />
                <div className="p-4">
                  <div className="text-xs font-bold flex items-center gap-2"><MapPin size={12} className="text-amber-600" /> بیا پیش ما برای اسپیکر و باند:</div>
                  <div className="text-[11px] text-muted-foreground leading-6 mt-1">علاءالدین، طبقه ۶، پلاک ۶۱۴ - تعمیر آمپلی‌فایر و باتری ۴۸ ساعته، تست صدا رایگان</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <img src="/images/repairs/bluetooth-speaker-repair-technician-2.jpg" alt="تعمیر آمپلی‌فایر اسپیکر" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
                <img src="/images/repairs/categories/bluetooth-speaker-jbl-repair-technician--1.jpg" alt="تعمیر JBL اسپیکر" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
              </div>
            </div>
          </div>

          <article className="prose max-w-none text-[14px] leading-9 text-muted-foreground">
            <h3 className="text-xl font-black text-foreground">چرا تعمیر اسپیکر و باند نیاز به اسیلوسکوپ و تستر درایور دارد؟</h3>
            <p>
              اسپیکر JBL Charge 5 با ۳۰ وات، آمپلی‌فایر کلاس D، باتری ۷۵۰۰ میلی‌آمپر، برد بلوتوث ۵.۳ و دو درایور ۵۲ میلی‌متر دارد. خرابی آمپلی‌فایر TPA3116 با مولتی‌متر معمولی پیدا نمی‌شود، باید با اسیلوسکوپ سیگنال سینوسی چک شود. درایور پاره با چشم دیده نمی‌شود، با تستر فرکانس ۲۰ هرتز تا ۲۰ کیلو باید تست شود. باتری باد کرده اسپیکر، ولتاژش از ۷.۴ ولت به ۶ ولت می‌افتد و آمپلی‌فایر را خاموش می‌کند. ما اسیلوسکوپ Hantek، تستر باتری و پروگرامر بلوتوث داریم.
            </p>

            <h3 className="text-xl font-black text-foreground mt-10">۷ خرابی شایع اسپیکر و باند و راه حل تخصصی - ۱۵۰۰ کلمه</h3>
            <p><strong className="text-foreground">۱. اسپیکر روشن نمی‌شود - تعمیر برد آمپلی‌فایر:</strong> شایع‌ترین خرابی. دلیل: نوسان برق، آبخوردگی، اتصال کوتاه درایور. آمپلی‌فایر TPA3116 یا TPA3110 سوخته، فیوز SMD قطع. نشانه: دکمه پاور می‌زنی، چراغ می‌آید اما صدا نه، یا کلا روشن نمی‌شود. ما برد را باز، فیوز، دیود و IC تغذیه را چک، IC سوخته را با هیتر هات ایر تعویض، خازن‌های باد کرده را تعویض. هزینه ۵۰۰ تا ۱.۵ میلیون. پیشگیری: با شارژر اصلی ۵ ولت ۲ آمپر شارژ کن، به برق مستقیم نزن.
            </p>
            <p><strong className="text-foreground">۲. شارژ نگه نداشتن و باتری باد کرده:</strong> اسپیکر JBL Flip 6 بعد ۲ سال، ۱۰ ساعت به ۲ ساعت می‌رسد یا باد می‌کند و درب را باز می‌کند. باتری لیتیومی ۳.۷ ولت ۲۵۰۰ میلی‌آمپر ظرفیتش کم. ما باتری اصلی با ظرفیت واقعی و محافظ BMS تعویض، با چسب ۳M فیکس. تست: ۱۲ ساعت پخش با ولوم ۵۰٪. هزینه باتری Charge 5 ۸۰۰ هزار، Flip 6 ۶۰۰ هزار، Xtreme 4 ۱.۲ میلیون. گارانتی ۲ ماهه باتری.
            </p>
            <p><strong className="text-foreground">۳-۷. خش خش، بلوتوث، پورت شارژ، پارتی باکس و ساندبار:</strong> خش خش صدا: درایور کاغذی پاره یا کویل سوخته، با تستر فرکانس چک، درایور اصلی JBL با آهنربا نئودیمیم تعویض، کویل و دیافراگم تعمیر. بلوتوث وصل نمی‌شود: IC بلوتوث CSR8645 خراب یا آنتن قطع، پروگرامر و آنتن تعویض. پورت USB-C شارژ نمی‌شود: سوکت لق یا آبخورده، تعویض سوکت Type-C با هیت. پارتی باکس: باند ۱۵ اینچ با آمپلی‌فایر ۱۱۰ وات، ترانس تغذیه سوخته، تعویض ترانس و ماسفت قدرت. ساندبار: HDMI ARC کار نمی‌کند، برد HDMI و DSP تعمیر.
            </p>

            <h3 className="text-xl font-black text-foreground mt-10">هزینه و بیا پیش ما برای اسپیکر و باند</h3>
            <p>
              زمان: باتری و پورت ۲۴-۴۸ ساعت، آمپلی‌فایر ۴۸ ساعت، درایور ۴۸ ساعت. هزینه شفاف قبل تعمیر. گارانتی ۲ ماهه. بیا پیش ما چون تنها مرکز با اسیلوسکوپ و تستر درایور در علاءالدینیم. تست صدا رایگان، فیلم تعمیر واتساپ. آدرس: جمهوری، علاءالدین، طبقه ۶، پلاک ۶۱۴. شهرستان پست با ضربه‌گیر. #تعمیر_اسپیکر #تعمیر_JBL_Charge_5 #تعمیر_باند_خانگی #تعمیر_پارتی_باکس #تعمیر_ساندبار #آرمان_همراه #تعمیرات_اسپیکر_تهران
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentSpeaker;
