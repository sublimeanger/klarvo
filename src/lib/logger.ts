const isDev = import.meta.env.DEV;

export const logger = {
  error: (...args: unknown[]) => {
    if (isDev) {
      console.error(...args);
    }
    // In production, you could send to an error tracking service like Sentry here
  },
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },
  debug: (...args: unknown[]) => {
    if (isDev) {
      console.debug(...args);
    }
  },
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
};
