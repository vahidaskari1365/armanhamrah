
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

// Define the types for your data
interface LocalizedText {
  [key: string]: string;
}

interface HeroData {
  title: LocalizedText;
  subtitle: LocalizedText;
  cta_text: LocalizedText;
  cta_link: string;
  image_url: string;
}

interface BrandData {
  id: number;
  name: string;
  logo_url: string;
}

// Helper to get translated text with fallbacks
const getTranslatedText = (textObject: LocalizedText | undefined, lang: string) => {
    if (!textObject) return '';
    // 1. Try the current language
    if (textObject[lang]) return textObject[lang];
    // 2. Try the other language ('en' if 'fa', 'fa' if 'en')
    const fallbackLang = lang === 'fa' ? 'en' : 'fa';
    if (textObject[fallbackLang]) return textObject[fallbackLang];
    // 3. Try the first available language in the object
    const availableKey = Object.keys(textObject)[0];
    if (availableKey) return textObject[availableKey];
    // 4. Return empty string if nothing is found
    return '';
}


const Home = () => {
  const { language } = useLanguage();
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [brands, setBrands] = useState<BrandData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Starting data fetch...");

        // Fetch hero data
        const { data: hero, error: heroError } = await supabase
          .from('home_page')
          .select('content')
          .eq('section', 'hero')
          .single();

        // --- Extensive Logging ---
        console.log("Hero Data Response:", hero);
        if (heroError) {
            console.error("Supabase Hero Error:", heroError);
            throw new Error(`Failed to fetch hero data: ${heroError.message}`);
        }
        if (!hero || !hero.content) {
            throw new Error("Hero data content is missing in the response.");
        }
        console.log("Setting Hero Data:", hero.content);
        setHeroData(hero.content);


        // Fetch brands data
        const { data: brandsData, error: brandsError } = await supabase
          .from('home_page')
          .select('content')
          .eq('section', 'brands')
          .single();

        // --- Extensive Logging ---
        console.log("Brands Data Response:", brandsData);
        if (brandsError) {
            console.error("Supabase Brands Error:", brandsError);
            throw new Error(`Failed to fetch brands data: ${brandsError.message}`);
        }
        if (!brandsData || !brandsData.content) {
            // It's possible to have no brands, so this might not be a critical error
            console.warn("Brands data content is missing in the response.");
            setBrands([]);
        } else {
            console.log("Setting Brands Data:", brandsData.content);
            setBrands(brandsData.content);
        }


      } catch (err: any) {
        console.error("An unexpected error occurred during fetch:", err);
        setError(err.message);
      } finally {
        console.log("Finished data fetch.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">در حال بارگیری...</div>;
  }

  // We show error, but we still try to render what we can with fallback data (if any was set)
  // This is better than a blank screen.
  return (
    <div className="container mx-auto px-4">
      {error && (
         <div className="fixed bottom-0 left-0 w-full text-center py-2 bg-red-500 text-white z-50">
            <p>خطا در بارگیری اطلاعات: {error}</p>
            <p className='text-xs'>ممکن است محتوای نمایش داده شده کامل نباشد. لطفاً کنسول مرورگر را برای جزئیات بررسی کنید.</p>
         </div>
      )}

      {/* Hero Section */}
      {heroData ? (
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4">
            {getTranslatedText(heroData.title, language)}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {getTranslatedText(heroData.subtitle, language)}
          </p>
          <a
            href={heroData.cta_link || '#'}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {getTranslatedText(heroData.cta_text, language)}
          </a>
        </section>
      ) : (
        !loading && <div className='text-center py-20 text-gray-500'>محتوای بخش اصلی یافت نشد.</div>
      )}


      {/* Brands Section */}
      {brands && brands.length > 0 ? (
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-10">{language === 'fa' ? 'برندهای معتبر' : 'Trusted Brands'}</h2>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {brands.map((brand) => (
              <div key={brand.id} className="grayscale hover:grayscale-0 transition-all">
                <img src={brand.logo_url} alt={brand.name} className="h-12" />
              </div>
            ))}
          </div>
        </section>
      ) : (
         !loading && <div className='text-center py-12 text-gray-500'>محتوای بخش برندها یافت نشد.</div>
      )}
    </div>
  );
};

export default Home;
