// Animation utilities and variants for Framer Motion-style animations
// Using CSS keyframes and Tailwind for performance

export const animationConfig = {
  // Duration presets
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  // Easing presets
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const;

// Stagger delay calculator for sequential animations
export function getStaggerDelay(index: number, baseDelay = 50): string {
  return `${index * baseDelay}ms`;
}

// Animation class generators
export const animations = {
  fadeIn: 'animate-fade-in',
  fadeUp: 'animate-fade-up',
  fadeDown: 'animate-fade-down',
  fadeLeft: 'animate-fade-left',
  fadeRight: 'animate-fade-right',
  scaleIn: 'animate-scale-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  float: 'animate-float',
  pulseGlow: 'animate-pulse-glow',
  shimmer: 'animate-shimmer',
  gradientShift: 'animate-gradient-shift',
  bounce: 'animate-bounce-subtle',
} as const;

// Intersection Observer hook for scroll-triggered animations
export function createScrollObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

// CSS class builder for animated elements
export function buildAnimationClasses(
  animation: keyof typeof animations,
  options?: {
    delay?: string;
    duration?: keyof typeof animationConfig.duration;
    once?: boolean;
  }
): string {
  const classes: string[] = [animations[animation]];
  
  if (options?.delay) {
    classes.push(`[animation-delay:${options.delay}]`);
  }
  
  if (options?.duration) {
    classes.push(`[animation-duration:${animationConfig.duration[options.duration]}]`);
  }
  
  return classes.join(' ');
}

// Reduced motion helper
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Animation variants for common patterns
export const variants = {
  // Container that staggers children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  // Fade up animation for items
  fadeUpItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
  
  // Scale in animation
  scaleItem: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
  
  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
  
  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
} as const;
