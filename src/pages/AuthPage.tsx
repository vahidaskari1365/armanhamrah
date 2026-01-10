import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().trim().email({ message: "ایمیل معتبر نیست" }).max(255),
  password: z.string().min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }).max(100),
});

const signupSchema = authSchema.extend({
  firstName: z.string().trim().min(1, { message: "نام الزامی است" }).max(50),
  lastName: z.string().trim().min(1, { message: "نام خانوادگی الزامی است" }).max(50),
  phone: z.string().regex(/^09\d{9}$/, { message: "شماره تلفن معتبر نیست (مثال: 09123456789)" }),
});

const AuthPageContent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate('/');
        }
      }
    );

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    try {
      if (isLogin) {
        authSchema.parse({ email, password });
      } else {
        signupSchema.parse({ email, password, firstName, lastName, phone });
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        toast({
          title: language === 'fa' ? 'ورود موفق' : 'Login Successful',
          description: language === 'fa' ? 'خوش آمدید' : 'Welcome back!',
        });
        navigate('/');
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              phone: phone.trim(),
            },
          },
        });

        if (error) throw error;

        toast({
          title: language === 'fa' ? 'ثبت‌نام موفق' : 'Registration Successful',
          description: language === 'fa' ? 'حساب شما با موفقیت ایجاد شد' : 'Your account has been created',
        });
        navigate('/');
      }
    } catch (error: any) {
      let message = language === 'fa' ? 'خطایی رخ داد' : 'An error occurred';
      if (error.message?.includes('already registered')) {
        message = language === 'fa' ? 'این ایمیل قبلا ثبت شده است' : 'This email is already registered';
      } else if (error.message?.includes('Invalid login credentials')) {
        message = language === 'fa' ? 'ایمیل یا رمز عبور اشتباه است' : 'Invalid email or password';
      } else if (error.message?.includes('Email not confirmed')) {
        message = language === 'fa' ? 'لطفا ایمیل خود را تایید کنید' : 'Please confirm your email';
      }
      toast({
        title: language === 'fa' ? 'خطا' : 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-premium p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isLogin 
                ? (language === 'fa' ? 'ورود به حساب کاربری' : 'Login to Your Account')
                : (language === 'fa' ? 'ثبت‌نام' : 'Create Account')
              }
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin 
                ? (language === 'fa' ? 'برای استفاده از خدمات وارد شوید' : 'Login to access your account')
                : (language === 'fa' ? 'یک حساب جدید بسازید' : 'Create a new account')
              }
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">{language === 'fa' ? 'شماره تلفن' : 'Phone Number'}</Label>
                  <div className="relative">
                    <Phone className={`absolute ${language === 'fa' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4`} />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09123456789"
                      className={language === 'fa' ? 'pr-10' : 'pl-10'}
                      dir="ltr"
                    />
                  </div>
                  {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{language === 'fa' ? 'نام' : 'First Name'}</Label>
                    <div className="relative">
                      <User className={`absolute ${language === 'fa' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4`} />
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={language === 'fa' ? 'نام' : 'First Name'}
                        className={language === 'fa' ? 'pr-10' : 'pl-10'}
                      />
                    </div>
                    {errors.firstName && <p className="text-destructive text-xs">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{language === 'fa' ? 'نام خانوادگی' : 'Last Name'}</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={language === 'fa' ? 'نام خانوادگی' : 'Last Name'}
                    />
                    {errors.lastName && <p className="text-destructive text-xs">{errors.lastName}</p>}
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{language === 'fa' ? 'ایمیل' : 'Email'}</Label>
              <div className="relative">
                <Mail className={`absolute ${language === 'fa' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4`} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className={language === 'fa' ? 'pr-10' : 'pl-10'}
                  dir="ltr"
                />
              </div>
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{language === 'fa' ? 'رمز عبور' : 'Password'}</Label>
              <div className="relative">
                <Lock className={`absolute ${language === 'fa' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4`} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={language === 'fa' ? 'pr-10 pl-10' : 'pl-10 pr-10'}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${language === 'fa' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              className="w-full btn-gold"
              disabled={loading}
            >
              {loading 
                ? (language === 'fa' ? 'در حال پردازش...' : 'Processing...')
                : isLogin 
                  ? (language === 'fa' ? 'ورود' : 'Login')
                  : (language === 'fa' ? 'ثبت‌نام' : 'Sign Up')
              }
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin 
                ? (language === 'fa' ? 'حساب ندارید؟ ثبت‌نام کنید' : "Don't have an account? Sign up")
                : (language === 'fa' ? 'قبلا ثبت‌نام کردید؟ وارد شوید' : 'Already have an account? Login')
              }
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              {language === 'fa' ? 'بازگشت به سایت' : 'Back to Site'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AuthPage = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthPageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AuthPage;
