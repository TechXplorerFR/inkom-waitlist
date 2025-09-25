// Google Analytics 4 utility functions
// Using actual Google Analytics 4 Measurement ID: G-XLM4D802FL

type GtagCommand = 'config' | 'event' | 'js' | 'set';
type GtagConfig = Record<string, string | number | boolean>;
type GtagEvent = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag: (command: GtagCommand, ...args: (string | Date | GtagConfig | GtagEvent)[]) => void;
    dataLayer: Record<string, unknown>[];
  }
}

// Initialize Google Analytics
export const GA_MEASUREMENT_ID = 'G-XLM4D802FL'; // Your actual GA4 Measurement ID

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: string | number | boolean | undefined;
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventParams: GtagEvent = {
      event_category: parameters?.event_category || 'engagement',
      ...(parameters?.event_label && { event_label: parameters.event_label }),
      ...(parameters?.value && { value: parameters.value }),
      ...Object.fromEntries(
        Object.entries(parameters || {}).filter(([, value]) => value !== undefined)
      ),
    };
    window.gtag('event', eventName, eventParams);
  }
};

// Predefined tracking functions for common actions
export const trackWaitlistSignup = (email: string) => {
  trackEvent('waitlist_signup', {
    event_category: 'conversion',
    event_label: 'waitlist',
    value: 1,
    user_email: email,
  });
};

export const trackFeatureClick = (featureName: string) => {
  trackEvent('feature_click', {
    event_category: 'engagement',
    event_label: featureName,
  });
};

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    event_category: 'engagement',
    event_label: platform,
  });
};

export const trackVideoPlay = (videoId: string) => {
  trackEvent('video_play', {
    event_category: 'engagement',
    event_label: videoId,
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    event_category: 'localization',
    event_label: language,
  });
};

export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent('outbound_link', {
    event_category: 'navigation',
    event_label: linkText || url,
    outbound_url: url,
  });
};

// Enhanced ecommerce tracking (for future use)
export const trackPurchase = (transactionId: string, value: number, currency = 'USD') => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    event_category: 'ecommerce',
  });
};

// User engagement tracking
export const trackUserEngagement = (engagementTime: number) => {
  trackEvent('user_engagement', {
    engagement_time_msec: engagementTime,
    event_category: 'engagement',
  });
};

// Error tracking
export const trackError = (errorMessage: string, errorLevel: 'warning' | 'error' | 'fatal' = 'error') => {
  trackEvent('exception', {
    description: errorMessage,
    fatal: errorLevel === 'fatal',
    event_category: 'error',
  });
};

// Scroll tracking
export const trackScroll = (scrollPercentage: number) => {
  trackEvent('scroll', {
    event_category: 'engagement',
    event_label: `${scrollPercentage}%`,
    value: scrollPercentage,
  });
};