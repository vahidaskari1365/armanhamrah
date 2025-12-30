import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ShoppingCart, Users, Headphones, Briefcase, Send } from 'lucide-react';

const options = [
  {
    id: 'sales',
    icon: ShoppingCart,
    title: 'فروش',
    description: 'خرید محصولات اورجینال',
  },
  {
    id: 'wholesale',
    icon: Users,
    title: 'فروش به همکار',
    description: 'همکاری با نمایندگان',
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'خدمات پس از فروش',
    description: 'پیگیری گارانتی و تعمیرات',
  },
  {
    id: 'commerce',
    icon: Briefcase,
    title: 'بازرگانی',
    description: 'صادرات و واردات',
  },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user'; text: string }>>([]);

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
    setMessages([
      {
        type: 'bot',
        text: 'سلام به هلدینگ آرمان خوش آمدید\nچطور میتونم کمکتون کنم؟',
      },
    ]);
  };

  const handleBack = () => {
    setSelectedOption(null);
    setMessages([]);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-6 z-50 w-80 md:w-96 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-primary-foreground">پشتیبانی آرمان</h3>
                  <span className="text-xs text-primary-foreground/80">آنلاین</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedOption(null);
                  setMessages([]);
                }}
                className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              {!selectedOption ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    لطفاً یکی از گزینه‌های زیر را انتخاب کنید
                  </p>
                  {options.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionClick(option.id)}
                      className="w-full p-4 rounded-xl bg-secondary/50 hover:bg-secondary text-right flex items-center gap-4 transition-colors group"
                      whileHover={{ x: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <option.icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{option.title}</h4>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={handleBack}
                    className="text-sm text-primary hover:underline mb-2"
                  >
                    ← بازگشت به منو
                  </button>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-xl ${
                        message.type === 'bot'
                          ? 'bg-secondary/50 text-foreground'
                          : 'bg-primary text-primary-foreground mr-8'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </motion.div>
                  ))}
                  
                  {/* Quick Contact */}
                  <div className="mt-4 p-3 bg-primary/10 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-2">برای ارتباط مستقیم:</p>
                    <div className="space-y-2">
                      {selectedOption === 'support' && (
                        <a href="tel:02158798" className="block text-sm text-primary font-medium">
                          📞 خدمات پس از فروش: 02158798
                        </a>
                      )}
                      {selectedOption !== 'support' && (
                        <a href="tel:02188321030" className="block text-sm text-primary font-medium">
                          📞 دفتر مرکزی: 02188321030-2
                        </a>
                      )}
                      <a 
                        href="https://www.instagram.com/armanholdingco/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-primary font-medium"
                      >
                        📸 اینستاگرام: @armanholdingco
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
