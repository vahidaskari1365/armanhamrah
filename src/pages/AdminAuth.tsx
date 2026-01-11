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
import pageBg from '@/assets/page-bg.jpeg';

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Check if user has admin role
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .eq('role', 'admin')
            .maybeSingle();

          if (roleData) {
            navigate('/admin');
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (roleError) throw roleError;

        if (!roleData) {
          await supabase.auth.signOut();
          toast({
            title: 'دسترسی غیرمجاز',
            description: 'شما دسترسی ادمین ندارید',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        toast({
          title: 'ورود موفق',
          description: 'به پنل مدیریت خوش آمدید',
        });
        navigate('/admin');
      } else {
        // Validate phone number
        if (!phone || phone.length < 10) {
          toast({
            title: 'خطا',
            description: 'لطفا شماره تلفن معتبر وارد کنید',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: {
              first_name: firstName,
              last_name: lastName,
              phone: phone,
            },
          },
        });

        if (error) throw error;

        toast({
          title: 'ثبت‌نام موفق',
          description: 'لطفا منتظر تایید ادمین باشید',
        });
      }
    } catch (error: any) {
      let message = 'خطایی رخ داد';
      if (error.message?.includes('already registered')) {
        message = 'این ایمیل قبلا ثبت شده است';
      } else if (error.message?.includes('Invalid login credentials')) {
        message = 'ایمیل یا رمز عبور اشتباه است';
      }
      toast({
        title: 'خطا',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-background bg-background flex items-center justify-center p-4" style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties} dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-premium p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isLogin ? 'ورود به پنل مدیریت' : 'ثبت‌نام'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin ? 'برای دسترسی به پنل وارد شوید' : 'یک حساب جدید بسازید'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">شماره تلفن</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09123456789"
                      className="pr-10"
                      dir="ltr"
                      required={!isLogin}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">نام</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="نام"
                        className="pr-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">نام خانوادگی</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="نام خانوادگی"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="pr-10"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10 pl-10"
                  dir="ltr"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-gold"
              disabled={loading}
            >
              {loading ? 'در حال پردازش...' : isLogin ? 'ورود' : 'ثبت‌نام'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? 'حساب ندارید؟ ثبت‌نام کنید' : 'قبلا ثبت‌نام کردید؟ وارد شوید'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به سایت
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;
