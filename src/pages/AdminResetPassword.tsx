import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Lock, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import pageBg from '@/assets/page-bg.jpeg';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().trim().email('ایمیل معتبر نیست').max(255, 'ایمیل حداکثر 255 کاراکتر'),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, 'رمز عبور حداقل 6 کاراکتر'),
    confirmPassword: z.string().min(6, 'تکرار رمز عبور حداقل 6 کاراکتر'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'رمز عبور و تکرار آن یکسان نیست',
  });

const AdminResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasSession, setHasSession] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setHasSession(!!session?.user);
    });

    // Support newer recovery links that use "?code=..." (PKCE)
    void (async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        // Remove code from URL to avoid re-exchanging on refresh
        url.searchParams.delete('code');
        window.history.replaceState({}, document.title, url.toString());

        if (error) {
          toast({
            title: 'خطا',
            description: 'لینک بازیابی معتبر نیست یا منقضی شده است؛ دوباره درخواست دهید',
            variant: 'destructive',
          });
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      setHasSession(!!session?.user);
    })();

    return () => subscription.unsubscribe();
  }, [toast]);

  const sendResetLink = async () => {
    setLoading(true);
    setErrors({});

    try {
      emailSchema.parse({ email: email.trim() });

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;

      toast({
        title: 'ارسال شد',
        description: 'لینک بازیابی رمز عبور به ایمیل شما ارسال شد',
      });
    } catch (error: any) {
      const message = error?.message?.includes('rate limit')
        ? 'تعداد درخواست‌ها زیاد است، کمی بعد دوباره تلاش کنید'
        : 'ارسال لینک بازیابی ناموفق بود';

      toast({
        title: 'خطا',
        description: message,
        variant: 'destructive',
      });

      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      passwordSchema.parse({ password, confirmPassword });

      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      toast({
        title: 'انجام شد',
        description: 'رمز عبور با موفقیت تغییر کرد؛ لطفاً دوباره وارد شوید',
      });

      await supabase.auth.signOut();
      navigate('/admin/auth');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
        return;
      }

      const debug = new URLSearchParams(window.location.search).has('debug');
      toast({
        title: 'خطا',
        description: debug
          ? `تغییر رمز عبور ناموفق بود: ${error?.message ?? 'unknown'}`
          : 'تغییر رمز عبور ناموفق بود',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page-background bg-background flex items-center justify-center p-4 min-h-screen"
      style={{ '--page-bg-image': `url(${pageBg})` } as React.CSSProperties}
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-premium p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">بازیابی رمز عبور ادمین</h1>
            <p className="text-muted-foreground text-sm">
              {hasSession
                ? 'رمز عبور جدید را تنظیم کنید'
                : 'ایمیل را وارد کنید تا لینک بازیابی ارسال شود'}
            </p>
          </div>

          {hasSession ? (
            <form onSubmit={updatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور جدید</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    placeholder="••••••••"
                    className="pr-10"
                    dir="ltr"
                    required
                    minLength={6}
                  />
                </div>
                {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                    }}
                    placeholder="••••••••"
                    className="pr-10"
                    dir="ltr"
                    required
                    minLength={6}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-destructive text-xs">{errors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full btn-gold" disabled={loading}>
                {loading ? 'در حال ذخیره...' : 'تغییر رمز عبور'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="email@example.com"
                    className="pr-10"
                    dir="ltr"
                    required
                    maxLength={255}
                  />
                </div>
                {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
              </div>

              <Button onClick={sendResetLink} className="w-full btn-gold" disabled={loading}>
                {loading ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
              </Button>

              <p className="text-xs text-muted-foreground leading-6">
                بعد از کلیک روی لینک داخل ایمیل، همین صفحه باز می‌شود و می‌توانید رمز جدید را تنظیم کنید.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/admin/auth"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به ورود ادمین
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminResetPassword;
