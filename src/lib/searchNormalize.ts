// Persian ↔ English aliases for product search
const ALIASES: Record<string, string> = {
  // Brands
  'اپل': 'apple',
  'آیفون': 'iphone',
  'ایفون': 'iphone',
  'سامسونگ': 'samsung',
  'گلکسی': 'galaxy',
  'گلگسی': 'galaxy',
  'شیائومی': 'xiaomi',
  'شیاومی': 'xiaomi',
  'ردمی': 'redmi',
  'پوکو': 'poco',
  'نوکیا': 'nokia',
  'هواوی': 'huawei',
  'وان پلاس': 'oneplus',
  'وانپلاس': 'oneplus',
  // Model words
  'پرو': 'pro',
  'مکس': 'max',
  'مگا': 'mega',
  'مینی': 'mini',
  'پلاس': 'plus',
  'اولترا': 'ultra',
  'الترا': 'ultra',
  'نوت': 'note',
  'لایت': 'lite',
  'ایر': 'air',
  'تب': 'tab',
  'تبلت': 'tablet',
  'ساعت': 'watch',
  'واچ': 'watch',
  'گوشی': 'phone',
  'موبایل': 'mobile',
};

// Convert Persian/Arabic digits to ASCII
const digitMap: Record<string, string> = {
  '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9',
  '٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9',
};

export function normalizeText(input: string): string {
  if (!input) return '';
  let s = input.toLowerCase();
  // normalize digits
  s = s.replace(/[۰-۹٠-٩]/g, (d) => digitMap[d] || d);
  // unify Arabic/Persian letters
  s = s.replace(/[يى]/g, 'ی').replace(/ك/g, 'ک');
  // remove diacritics & tatweel
  s = s.replace(/[\u064B-\u0652\u0670\u0640]/g, '');
  // collapse whitespace
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

// Replace any Persian alias tokens in the query with their English equivalents
export function expandQuery(query: string): string[] {
  const norm = normalizeText(query);
  if (!norm) return [''];
  const variants = new Set<string>([norm]);
  let translated = norm;
  // sort longest first to match multi-word aliases first
  const keys = Object.keys(ALIASES).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    if (translated.includes(k)) {
      translated = translated.split(k).join(ALIASES[k]);
    }
  }
  variants.add(translated);
  return Array.from(variants);
}

export function matchesSearch(haystack: string, query: string): boolean {
  const h = normalizeText(haystack);
  if (!h) return false;
  const variants = expandQuery(query);
  return variants.some((v) => v && h.includes(v));
}
