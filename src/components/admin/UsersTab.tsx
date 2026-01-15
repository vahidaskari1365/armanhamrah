import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Trash2, X, Users, Key, Mail } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const newUserSchema = z.object({
  email: z.string().trim().email('ایمیل معتبر نیست').max(255),
  password: z.string().min(6, 'رمز عبور حداقل 6 کاراکتر'),
  first_name: z.string().trim().min(1, 'نام الزامی است').max(100),
  last_name: z.string().trim().max(100).optional(),
  role: z.enum(['admin', 'editor']),
});

interface UserWithRole {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  created_at: string;
}

interface UsersTabProps {
  users: UserWithRole[];
  currentUser: User | null;
  onRefresh: () => void;
}

const UsersTab = ({ users, currentUser, onRefresh }: UsersTabProps) => {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'editor' as 'admin' | 'editor',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [creatingUser, setCreatingUser] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [changingPassword, setChangingPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const { toast } = useToast();

  const handleCreateUser = async () => {
    setErrors({});
    
    try {
      newUserSchema.parse(newUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setCreatingUser(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email.trim(),
        password: newUser.password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: {
            first_name: newUser.first_name.trim(),
            last_name: newUser.last_name.trim(),
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role: newUser.role,
          });

        if (roleError) throw roleError;
      }

      toast({ title: 'موفق', description: 'کاربر با موفقیت ایجاد شد' });
      setNewUser({ email: '', password: '', first_name: '', last_name: '', role: 'editor' });
      onRefresh();
    } catch (error: any) {
      let message = 'خطا در ایجاد کاربر';
      if (error.message?.includes('already registered')) {
        message = 'این ایمیل قبلا ثبت شده است';
      }
      toast({ title: 'خطا', description: message, variant: 'destructive' });
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUser?.id) {
      toast({ title: 'خطا', description: 'نمی‌توانید خودتان را حذف کنید', variant: 'destructive' });
      return;
    }

    if (deleteConfirm !== userId) {
      setDeleteConfirm(userId);
      return;
    }

    const { error } = await supabase.from('user_roles').delete().eq('user_id', userId);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در حذف نقش کاربر', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'نقش کاربر با موفقیت حذف شد' });
    setDeleteConfirm(null);
    onRefresh();
  };

  const handleChangeRole = async (userId: string, newRole: 'admin' | 'editor') => {
    if (userId === currentUser?.id) {
      toast({ title: 'خطا', description: 'نمی‌توانید نقش خودتان را تغییر دهید', variant: 'destructive' });
      return;
    }

    const { error } = await supabase
      .from('user_roles')
      .update({ role: newRole })
      .eq('user_id', userId);

    if (error) {
      toast({ title: 'خطا', description: 'خطا در تغییر نقش', variant: 'destructive' });
      return;
    }

    toast({ title: 'موفق', description: 'نقش کاربر با موفقیت تغییر کرد' });
    onRefresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Add User Form */}
      <div className="card-premium p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          افزودن کاربر جدید
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>ایمیل *</Label>
            <Input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="email@example.com"
              dir="ltr"
              maxLength={255}
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label>رمز عبور *</Label>
            <Input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="حداقل 6 کاراکتر"
              dir="ltr"
            />
            {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <Label>نام *</Label>
            <Input
              value={newUser.first_name}
              onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
              placeholder="نام"
              maxLength={100}
            />
            {errors.first_name && <p className="text-destructive text-xs mt-1">{errors.first_name}</p>}
          </div>
          <div>
            <Label>نام خانوادگی</Label>
            <Input
              value={newUser.last_name}
              onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
              placeholder="نام خانوادگی"
              maxLength={100}
            />
          </div>
          <div>
            <Label>نقش *</Label>
            <Select value={newUser.role} onValueChange={(value: 'admin' | 'editor') => setNewUser({ ...newUser, role: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">ادمین</SelectItem>
                <SelectItem value="editor">ویرایشگر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleCreateUser} className="mt-4 btn-gold" disabled={creatingUser}>
          <UserPlus className="w-4 h-4 ml-2" />
          {creatingUser ? 'در حال ایجاد...' : 'ایجاد کاربر'}
        </Button>
      </div>

      {/* Users List */}
      <div className="card-premium p-6">
        <h2 className="text-lg font-semibold mb-4">لیست کاربران ({users.length})</h2>
        <div className="space-y-4">
          {users.map((u) => (
            <div key={u.id} className="p-4 rounded-lg border border-border bg-secondary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {u.first_name || u.last_name ? `${u.first_name || ''} ${u.last_name || ''}`.trim() : 'بدون نام'}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      {u.id === currentUser?.id ? (
                        <span className={`px-2 py-0.5 rounded text-xs ${u.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
                          {u.role === 'admin' ? 'ادمین' : 'ویرایشگر'}
                        </span>
                      ) : (
                        <Select 
                          value={u.role} 
                          onValueChange={(value: 'admin' | 'editor') => handleChangeRole(u.id, value)}
                        >
                          <SelectTrigger className="h-7 w-24 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">ادمین</SelectItem>
                            <SelectItem value="editor">ویرایشگر</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      {u.id === currentUser?.id && <span className="text-xs text-green-600">(شما)</span>}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {u.id !== currentUser?.id && (
                    <>
                      <Button
                        size="sm"
                        variant={deleteConfirm === u.id ? 'destructive' : 'ghost'}
                        className={deleteConfirm !== u.id ? 'text-destructive hover:text-destructive' : ''}
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        {deleteConfirm === u.id ? <span className="text-xs">تایید حذف</span> : <Trash2 className="w-4 h-4" />}
                      </Button>
                      {deleteConfirm === u.id && (
                        <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <p className="text-center text-muted-foreground py-8">هیچ کاربری وجود ندارد</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UsersTab;
