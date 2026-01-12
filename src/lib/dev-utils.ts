/**
 * Developer Experience Utilities
 * أدوات تحسين تجربة المطور
 */

/**
 * Logger Utility
 * أداة تسجيل الأحداث
 */
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data);
  },
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, data);
    }
  },
};

/**
 * Performance Monitor
 * مراقب الأداء
 */
export class PerformanceMonitor {
  private startTime: number;
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.startTime = Date.now();
  }

  end() {
    const duration = Date.now() - this.startTime;
    logger.debug(`[PERF] ${this.name} took ${duration}ms`);
    return duration;
  }
}

/**
 * API Request Logger
 * مسجل طلبات API
 */
export function logApiRequest(method: string, url: string, statusCode?: number, duration?: number) {
  const status = statusCode ? `[${statusCode}]` : '';
  const time = duration ? `${duration}ms` : '';
  logger.info(`${method} ${url} ${status} ${time}`);
}

/**
 * Environment Variables Validator
 * محقق متغيرات البيئة
 */
export function validateEnvVars(required: string[]): boolean {
  const missing = required.filter((key) => !process.env[key]);
  
  if (missing.length > 0) {
    logger.error('Missing environment variables:', missing);
    return false;
  }
  
  logger.info('All required environment variables are set');
  return true;
}

/**
 * Format Error Response
 * تنسيق رد الخطأ
 */
export function formatErrorResponse(error: any) {
  return {
    message: error.message || 'An error occurred',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Retry Utility
 * أداة إعادة المحاولة
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delayMs?: number;
    backoff?: boolean;
  } = {}
): Promise<T> {
  const { maxAttempts = 3, delayMs = 1000, backoff = true } = options;
  
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      logger.debug(`Attempt ${attempt}/${maxAttempts}`);
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < maxAttempts) {
        const delay = backoff ? delayMs * Math.pow(2, attempt - 1) : delayMs;
        logger.warn(`Attempt ${attempt} failed, retrying in ${delay}ms`, lastError.message);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

/**
 * Debounce Function
 * دالة تأخير التنفيذ
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delayMs);
  };
}

/**
 * Throttle Function
 * دالة تحديد معدل التنفيذ
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let lastCallTime = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastCallTime >= delayMs) {
      fn(...args);
      lastCallTime = now;
    }
  };
}

/**
 * Memoize Function
 * دالة تخزين النتائج
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Deep Clone Object
 * نسخ عميق للكائن
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }
  
  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as any;
  }
  
  if (obj instanceof Object) {
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  
  return obj;
}

/**
 * Format Bytes
 * تنسيق الحجم بالبايتات
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format Time Duration
 * تنسيق مدة الوقت
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(2)}m`;
  return `${(ms / 3600000).toFixed(2)}h`;
}

/**
 * Export all dev utilities
 */
export const devUtils = {
  logger,
  PerformanceMonitor,
  logApiRequest,
  validateEnvVars,
  formatErrorResponse,
  retry,
  debounce,
  throttle,
  memoize,
  deepClone,
  formatBytes,
  formatDuration,
};
