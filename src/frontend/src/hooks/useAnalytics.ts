import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

// Hook to track page views automatically
export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(window.location.href, document.title);
  }, [location]);
};

// Hook to track scroll depth
export const useScrollTracking = () => {
  useEffect(() => {
    let maxScroll = 0;
    const scrollMilestones = [25, 50, 75, 90, 100];
    const trackedMilestones = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track scroll milestones
        scrollMilestones.forEach(milestone => {
          if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone);
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'scroll', {
                event_category: 'engagement',
                event_label: `${milestone}%`,
                value: milestone,
              });
            }
          }
        });
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 500);
    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);
};

// Throttle function to limit scroll event frequency
function throttle<T extends (...args: unknown[]) => void>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
}

// Hook to track user engagement time
export const useEngagementTracking = () => {
  useEffect(() => {
    let startTime = Date.now();
    let isActive = true;

    const trackEngagement = () => {
      if (isActive) {
        const engagementTime = Date.now() - startTime;
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'user_engagement', {
            engagement_time_msec: engagementTime,
            event_category: 'engagement',
          });
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false;
        trackEngagement();
      } else {
        isActive = true;
        startTime = Date.now();
      }
    };

    const handleBeforeUnload = () => {
      trackEngagement();
    };

    // Track engagement every 30 seconds
    const interval = setInterval(trackEngagement, 30000);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackEngagement();
    };
  }, []);
};