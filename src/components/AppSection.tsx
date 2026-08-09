import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Smartphone, ArrowLeft, ArrowRight } from 'lucide-react';
import EditableText from '@/components/admin/EditableText';

const AppSection = () => {
  const { t, language } = useLanguage();
  const { isEditMode } = useAdmin();
  const Arrow = language === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: language === 'fa' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={language === 'fa' ? 'lg:order-2' : 'lg:order-1'}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              <EditableText
                contentKey="app-title"
                page="home"
                section="app"
                defaultValue={t('app.title')}
              />
            </h2>
            <p className="text-lg text-foreground mb-8 leading-relaxed">
              <EditableText
                contentKey="app-description"
                page="home"
                section="app"
                defaultValue={t('app.description')}
                multiline
              />
            </p>
            <motion.a
              href="https://my.armanhamrah.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <EditableText
                contentKey="app-cta"
                page="home"
                section="app"
                defaultValue={t('app.cta')}
              />
              <Arrow size={20} />
            </motion.a>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: language === 'fa' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative ${language === 'fa' ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="relative mx-auto max-w-sm">
              {/* Glow Effect */}
              <div className="absolute inset-0 blur-3xl opacity-30" style={{ background: 'var(--gradient-gold)' }} />
              
              {/* Phone Frame */}
              <motion.div
                className="relative z-10 bg-card rounded-[3rem] p-3 shadow-elegant"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground/10 rounded-full z-20" />
                  
                  {/* Screen Content */}
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 bg-gradient-to-b from-primary/10 to-transparent p-6 pt-14">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary flex items-center justify-center mb-4">
                          <Smartphone className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">
                          {language === 'fa' ? 'آرمان من' : 'My Arman'}
                        </h3>
                      </div>
                      
                      {/* Fake UI Elements */}
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="bg-secondary rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-muted rounded w-3/4" />
                              <div className="h-2 bg-muted rounded w-1/2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bottom Nav */}
                    <div className="bg-secondary border-t border-border p-4 flex justify-around">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`w-10 h-10 rounded-xl ${i === 1 ? 'bg-primary' : 'bg-muted'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
