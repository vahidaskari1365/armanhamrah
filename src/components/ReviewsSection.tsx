import { Star, Quote } from 'lucide-react';
import { reviewsData } from '@/data/reviewsData';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReviewsSectionProps {
  model: string;
}

const ReviewsSection = ({ model }: ReviewsSectionProps) => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  const reviews = reviewsData.filter(r => r.model === model);
  if (reviews.length === 0) return null;

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className="mt-8 p-6 rounded-2xl bg-card border" id="reviews">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h3 className="font-black warranty-title">{isFa ? 'نظرات کاربران' : 'Customer Reviews'}</h3>
        <div className="flex items-center gap-2">
          <span className="flex">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={15} className={i <= Math.round(avg) ? 'text-amber-400 fill-amber-400' : 'text-muted'} />
            ))}
          </span>
          <span className="text-xs font-bold text-foreground">{avg.toLocaleString('fa-IR', { maximumFractionDigits: 1 })} از ۵</span>
          <span className="text-xs text-muted-foreground">({reviews.length.toLocaleString('fa-IR')} نظر)</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {reviews.map(r => (
          <div key={r.id} className="p-4 rounded-xl bg-secondary/40 border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Quote size={16} className="text-primary/60 rotate-180" />
                <span className="font-bold text-sm warranty-title">{r.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground">{r.date}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={12} className={i <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-6 warranty-text">{r.text}</p>
            <span className="inline-block mt-3 text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/10 font-bold">{r.service}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;