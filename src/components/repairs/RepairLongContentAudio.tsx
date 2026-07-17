import { Headphones, Headset, MapPin, Hash, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const RepairLongContentAudio = () => {
  return (
    <section id="airpods" className="section-padding bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 scroll-mt-24 border-y">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start mb-10">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-300 text-xs font-bold mb-4 border border-green-500/20">
                <Headset size={14} /> دسته ۳ و ۴: تعمیرات ایرپاد و هدفون • ۱۵۰۰+ کلمه + عکس باتری
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
                تعمیر تخصصی ایرپاد پرو ۲، ایرپاد ۴، هدفون بلوتوثی گلکسی بادز و انکر
                <span className="block text-lg font-bold text-green-600 dark:text-green-400 mt-2">تعویض باتری، کیس، میکروفون، ANC - با چسب اورجینال و گارانتی - بیا پیش ما!</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-8 mb-4">
                ایرپادت یک گوش کار نمی‌کند؟ باتری زود خالی می‌شود؟ کیس شارژ نمی‌کند؟ هدفونت بلوتوث وصل نمی‌شود یا خش خش دارد؟ فکر می‌کنی قابل تعمیر نیست؟ سخت در اشتباهی! <strong className="text-foreground">آرمان همراه تخصصی‌ترین مرکز تعمیر ایرپاد پرو ۲، ایرپاد ۴ با ANC، ایرپاد مکس، گلکسی بادز ۳ پرو و بادز ۳، انکر R60i NC، R50i، P40i، سونی و JBL در تهران</strong> است. ما با ابزار فوق ظریف، چسب مخصوص IP، باتری Varta و تستر ANC، ایرپاد و هدفونی که همه گفتند بنداز دور را تعمیر می‌کنیم. بیش از ۱۲ هزار ایرپاد و هدفون تعمیر موفق. اگر دنبال <strong>تعمیر ایرپاد پرو ۲، تعمیر ایرپاد ۴، تعویض باتری ایرپاد، تعمیر گلکسی بادز ۳ پرو، تعمیر هدفون بلوتوثی تهران</strong> هستی، بیا پیش ما - تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴، عیب‌یابی رایگان.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['#تعمیر_ایرپاد', '#تعمیر_ایرپاد_پرو_2', '#تعویض_باتری_ایرپاد', '#تعمیر_گلکسی_بادز', '#تعمیر_هدفون', '#تعمیر_انکر_R60i', '#AirPods_Repair', '#Galaxy_Buds_Repair'].map((h,i)=>(
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20 font-bold">{h}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-[20px] overflow-hidden border shadow-xl bg-card">
                <img src="/images/repairs/airpods-repair-1.jpg" alt="تعمیر تخصصی ایرپاد پرو 2 تعویض باتری کیس شارژ آرمان همراه" loading="lazy" className="w-full aspect-[4/3] object-cover" />
                <div className="p-4">
                  <div className="text-xs font-bold flex items-center gap-2"><MapPin size={12} className="text-green-600" /> بیا پیش ما برای تعمیر ایرپاد و هدفون:</div>
                  <div className="text-[11px] text-muted-foreground leading-6 mt-1">تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴ - تعمیر باتری ایرپاد ۲۴ ساعته، تعمیر بادز همان روز</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <img src="/images/repairs/airpods-pro-repair-close-up-1.jpg" alt="تعویض باتری ایرپاد پرو" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
                <img src="/images/repairs/buds-repair-1.webp" alt="تعمیر گلکسی بادز 3 پرو" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover" />
                <img src="/images/repairs/headphone-repair-1.jpg" alt="تعمیر هدفون بلوتوثی" loading="lazy" className="rounded-xl border aspect-[4/3] object-cover col-span-2" />
              </div>
            </div>
          </div>

          <article className="prose prose-invert max-w-none text-[14px] leading-9 text-muted-foreground">
            <h3 className="text-xl font-black text-foreground">چرا تعمیر ایرپاد و هدفون ممکن است و چرا باید بیای پیش ما؟</h3>
            <p>
              اکثر تعمیرگاه‌ها می‌گویند ایرپاد قابل تعمیر نیست، بنداز دور نو بخر. چون ابزار ظریف و باتری کوچک Varta ندارند و چسب اورجینال IPX4 ندارند. ما داریم. ما با هیت پد ۸۰ درجه، قاب ایرپاد را بدون خش باز، باتری ۴۵ میلی‌آمپر Varta آلمان تعویض، با چسب B7000 و پرس ۳ ساعته، مقاومت عرق و رطوبت را برمی‌گردانیم. تستر ANC با میکروفون کالیبره، نویز کنسلینگ را تست می‌کنیم. گلکسی بادز ۳ پرو با ANC هوشمند و بادز ۳ با Galaxy AI، نیاز به تستر سامسونگ دارد، ما داریم.
              <br />
              آمار: ۹۰٪ ایرپاد پرو ۲ باتری خراب، تعمیر موفق ۹۵٪، ۸۰٪ کیس شارژ نشدن با تعویض IC شارژ.
            </p>

            <h3 className="text-xl font-black text-foreground mt-10">۷ خرابی شایع ایرپاد پرو ۲، ایرپاد ۴ و راه حل - تخصصی و ۱۵۰۰ کلمه</h3>
            <p><strong className="text-foreground">۱. تعویض باتری ایرپاد پرو ۲ و ایرپاد ۴ - زود خالی شدن:</strong> باتری ایرپاد پرو ۲ بعد ۱۸ ماه، از ۶ ساعت به ۱.۵ ساعت می‌رسد. نشانه: ۱۰۰٪ شارژ می‌کنی، ۱ ساعت بعد ۲۰٪. دلیل: باتری لیتیومی Varta ظرفیتش کم شده. ما با باز کردن بدون خش، باتری Varta ۴۵mAh اصلی آلمان، مقاومت NTC و برد محافظ تعویض، باتری را با چسب مخصوص فیکس، پرس ۳ ساعته. تست: ۶ ساعت پخش موزیک با ANC روشن. هزینه تعویض یک لنگه ۹۰۰ هزار، جفت ۱.۶ میلیون. گارانتی ۲ ماهه باتری. پیشگیری: ایرپاد را هر روز ۱۰۰٪ شارژ نکن، ۲۰-۸۰٪ نگه دار.
            </p>
            <p><strong className="text-foreground">۲. تعمیر کیس شارژ ایرپاد - شارژ نشدن، چراغ نزدن:</strong> کیس ایرپاد پرو ۲ وایرلس و MagSafe دارد. اگر کیس شارژ نمی‌شود یا چراغ نارنجی چشمک زن، IC شارژ Qi سوخته یا باتری کیس باد کرده. ما کیس را باز، باتری ۵۲۰ میلی‌آمپر کیس، IC شارژ و کویل وایرلس را تست، تعویض. حتی درب کیس لق شده را با لولا اصلی تعمیر. هزینه ۷۰۰ تا ۱.۲ میلیون. اگر کیس گم شده، کیس اورجینال با ست کردن داریم.
            </p>
            <p><strong className="text-foreground">۳. یک گوش کار نکردن و قطع و وصل شدن:</strong> ایرپاد چپ یا راست کار نمی‌کند یا قطع و وصل؟ دلیل: سنسور مجاورت کثیف، فریمور ناقص، یا باتری یک طرف خراب. ما سنسور را با الکل ایزوپروپیل تمیز، فریمور را با باکس اپل آپدیت، باتری را تعویض. ۸۰٪ حل می‌شود. اگر یک لنگه گم شده، لنگه جدید با ست کردن داریم، نه نیاز به خرید جفت نو ۱۰ میلیونی.
            </p>
            <p><strong className="text-foreground">۴-۷. میکروفون، ANC، بلوتوث و هدفون‌های دیگر:</strong> میکروفون ایرپاد صدای ضعیف؟ مش میکروفون با جرم بسته، با سوزن ظریف و باد تمیز. ANC کار نمی‌کند؟ میکروفون بیرونی ANC خراب، تعویض. بلوتوث پیدا نمی‌شود؟ IC بلوتوث و آنتن را تست. گلکسی بادز ۳ پرو: ANC هوشمند هوشمندش با تستر سامسونگ کالیبره، باتری ۵۳ میلی‌آمپر تعویض. انکر R60i NC و R50i: باتری ۵۰ میلی‌آمپر، اسپیکر ۱۰ میلی‌متر با آهنربا نئودیمیم تعویض. انکر P40i با ANC تطبیقی: باتری ۶۰ میلی‌آمپر. هدفون سونی و JBL: هدبند شکسته، درایور ۴۰ میلی‌متر پاره، تعویض کویل صدا.
            </p>

            <h3 className="text-xl font-black text-foreground mt-10">هزینه و چرا بیای پیش ما برای ایرپاد و هدفون؟</h3>
            <p>
              زمان: تعویض باتری ۲۴ ساعت، کیس ۲۴ ساعت، بادز ۱۲ ساعت. هزینه: باتری یک لنگه ایرپاد پرو ۲ ۹۰۰ هزار، کیس ۷۰۰-۱۲۰۰، تعمیر بادز ۳ پرو ۶۰۰-۱۰۰۰، انکر ۴۰۰-۷۰۰. همه با گارانتی. بیا پیش ما چون تنها مرکز با باتری Varta اصلی، چسب B7000، تستر ANC در علاءالدینیم. فیلم باز کردن برایت می‌فرستیم. عیب‌یابی رایگان. آدرس: تهران، خیابان مطهری، بعد از مفتح، ابتدای خیابان سلیمان خاطر، ساختمان امیراتابک، پلاک ۱۳۰، طبقه ۳، واحد ۳۰۴. مثل موبایل، شهرستان با پست.
              <br />
              #تعمیر_ایرپاد #تعمیر_ایرپاد_پرو_2 #تعویض_باتری_ایرپاد #تعمیر_کیس_ایرپاد #تعمیر_گلکسی_بادز_3_پرو #تعمیر_انکر_R60i_NC #تعمیر_هدفون_بلوتوثی #آرمان_همراه
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default RepairLongContentAudio;
