import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { ArrowDown } from 'lucide-react';
import heroBg from '@/assets/hero-phones.jpg';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';

const Hero = () => {
  const { t, language } = useLanguage();
  const { isEditMode } = useAdmin();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {isEditMode ? (
          <EditableImage
            contentKey="hero-background"
            page="home"
            section="hero"
            defaultSrc={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <img
            src={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      </div>

      {/* Fire Glow Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'var(--gradient-fire)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-25"
          style={{ background: 'var(--gradient-fire)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10 pt-32 md:pt-40 lg:pt-48 pb-20 px-4 md:px-8">
        <div className="text-center max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <EditableText
                contentKey="hero-title"
                page="home"
                section="hero"
                defaultValue={t('hero.title')}
                as="span"
                className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              />
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-orange-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-8">
              <EditableText
                contentKey="hero-subtitle"
                page="home"
                section="hero"
                defaultValue={t('hero.subtitle')}
                as="span"
                className="text-orange-400"
              />
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            <EditableText
              contentKey="hero-description"
              page="home"
              section="hero"
              defaultValue={t('hero.description')}
              as="p"
              multiline
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#services"
              className="btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.cta')}
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#brands"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={24} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
