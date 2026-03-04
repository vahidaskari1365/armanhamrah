import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container-custom py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">{t('about.title')}</h1>
        <p className="text-lg text-center text-muted-foreground">
          {t('about.p1')}
        </p>
        <p className="text-lg text-center text-muted-foreground mt-4">
          {t('about.p2')}
        </p>
        <p className="text-lg text-center text-muted-foreground mt-4">
          {t('about.p3')}
        </p>
        <p className="text-lg text-center text-muted-foreground mt-4">
          {t('about.p4')}
        </p>
      </motion.div>
    </div>
  );
};

export default AboutPage;
