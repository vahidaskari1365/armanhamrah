import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAdminRole = async (currentUser: User | null) => {
      if (currentUser) {
        try {
          const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentUser.id)
            .eq('role', 'admin')
            .maybeSingle();

          if (error) {
            console.error('Error fetching user role:', error);
            setIsAdmin(false);
          } else {
            setIsAdmin(!!data);
          }
        } catch (e) {
          console.error('An error occurred while checking admin status:', e);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    const fetchSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        await checkAdminRole(session?.user ?? null);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      await checkAdminRole(currentUser);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, loading, user };
};