// Type-safe Google Analytics wrapper for landing page tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Safe gtag wrapper that handles cases where gtag isn't loaded
 */
const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  } else {
    console.debug('[Analytics] gtag not available:', args);
  }
};

/**
 * Track a generic event
 */
export const trackEvent = (eventName: string, params?: EventParams) => {
  gtag('event', eventName, params);
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (
  location: 'hero' | 'bottom' | 'sticky',
  variant: 'demo' | 'start',
  ctaText: string
) => {
  trackEvent('cta_click', {
    cta_location: location,
    variant,
    cta_text: ctaText,
  });
};

/**
 * Track form funnel events
 */
export const trackFormStart = (variant: 'demo' | 'start') => {
  trackEvent('form_start', { variant });
};

export const trackLeadStep = (
  step: 1 | 2,
  variant: 'demo' | 'start',
  data?: {
    company?: string;
    role?: string;
    ai_system_count?: string;
    operator_type?: string;
  }
) => {
  const eventName = step === 1 ? 'lead_step1_complete' : 'lead_step2_complete';
  trackEvent(eventName, {
    variant,
    ...data,
  });

  // Fire the main conversion event on step 2 completion
  if (step === 2) {
    trackEvent('generate_lead', {
      variant,
      currency: 'EUR',
      value: 149,
    });
  }
};

/**
 * Track landing page variant view with UTM parameters
 */
export const trackLandingView = (variant: 'demo' | 'start') => {
  const params = new URLSearchParams(window.location.search);
  trackEvent('landing_variant_view', {
    variant,
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  });
};

/**
 * Track scroll depth milestones
 */
export const trackScrollDepth = (percent: 25 | 50 | 75 | 100) => {
  trackEvent('scroll_depth', {
    percent_scrolled: percent,
  });
};

/**
 * Track FAQ expansion
 */
export const trackFAQExpand = (question: string) => {
  trackEvent('faq_expand', {
    question: question.substring(0, 100), // Truncate for GA limits
  });
};

/**
 * Track artifact showcase view
 */
export const trackArtifactView = (artifactType: string) => {
  trackEvent('artifact_view', {
    artifact_type: artifactType,
  });
};

/**
 * Extract UTM parameters from current URL
 */
export const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
  };
};
