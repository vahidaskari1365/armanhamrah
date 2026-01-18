import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await supabase.from('page_views').insert({
          page_path: location.pathname,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        });
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.error('Failed to track page view:', error);
      }
    };

    // Track after a small delay to ensure page has loaded
    const timeoutId = setTimeout(trackPageView, 500);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);
};

export default usePageTracking;