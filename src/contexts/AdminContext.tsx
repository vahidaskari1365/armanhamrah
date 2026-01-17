import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  isLoading: boolean;
  toggleEditMode: () => void;
  checkAdminStatus: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setIsAdmin(false);
        setIsEditMode(false);
        return;
      }

      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      setIsAdmin(!!roleData);
      if (!roleData) {
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      setIsEditMode(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleEditMode = () => {
    if (!isAdmin) {
      toast({
        title: 'خطا',
        description: 'شما دسترسی ادمین ندارید',
        variant: 'destructive',
      });
      return;
    }
    setIsEditMode(prev => !prev);
    toast({
      title: isEditMode ? 'حالت مشاهده' : 'حالت ویرایش',
      description: isEditMode ? 'از حالت ویرایش خارج شدید' : 'می‌توانید محتوا را ویرایش کنید',
    });
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isEditMode, isLoading, toggleEditMode, checkAdminStatus }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
