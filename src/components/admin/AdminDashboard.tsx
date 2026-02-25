
'use client';

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Cog, LogOut, Shield, Edit } from 'lucide-react';
import { useAdmin } from '@/hooks/use-admin';
import Auth from './Auth';
import AdminTabs from './AdminTabs';
import { useEditMode } from '@/contexts/EditModeContext';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, loading } = useAdmin();
  const { isEditMode, toggleEditMode } = useEditMode();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  if (loading) {
    return null; // Don't show anything while checking auth status
  }

  if (!isAdmin) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full shadow-lg">
              <Shield className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent dir="rtl">
            <SheetHeader>
              <SheetTitle>ورود به پنل مدیریت</SheetTitle>
            </SheetHeader>
            <Auth />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
       <Button onClick={toggleEditMode} size="icon" className={`rounded-full shadow-lg transition-colors ${isEditMode ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          <Edit className="h-6 w-6" />
        </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="rounded-full shadow-lg">
            <Cog className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-[500px] md:w-[700px] lg:w-[900px]" dir="rtl">
          <SheetHeader className="flex-row justify-between items-center pr-10">
            <SheetTitle>پنل مدیریت</SheetTitle>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 ml-2" />
              خروج
            </Button>
          </SheetHeader>
          <AdminTabs />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminDashboard;
