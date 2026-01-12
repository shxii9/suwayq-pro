/**
 * Error Handler
 * معالج الأخطاء الآمن والموحد
 */

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Global Error Handler
 * معالج الأخطاء العام
 */
export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      isOperational: error.isOperational,
    };
  }

  if (error instanceof Error) {
    // Log the error for debugging
    console.error('Error:', error.message);
    
    return {
      statusCode: 500,
      message: 'Internal Server Error',
      isOperational: false,
    };
  }

  return {
    statusCode: 500,
    message: 'Unknown Error',
    isOperational: false,
  };
}

/**
 * Common Errors
 * الأخطاء الشائعة
 */
export const errors = {
  notFound: (resource: string) => new AppError(404, `${resource} not found`),
  unauthorized: () => new AppError(401, 'Unauthorized access'),
  forbidden: () => new AppError(403, 'Forbidden'),
  badRequest: (message: string) => new AppError(400, message),
  conflict: (message: string) => new AppError(409, message),
  internalServer: () => new AppError(500, 'Internal Server Error', false),
  validationError: (message: string) => new AppError(422, message),
  tooManyRequests: () => new AppError(429, 'Too many requests'),
};

/**
 * API Response Format
 * صيغة الرد على API
 */
export function apiResponse<T>(
  statusCode: number,
  message: string,
  data?: T,
  error?: string
) {
  return {
    statusCode,
    message,
    data: data || null,
    error: error || null,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Success Response
 * رد النجاح
 */
export function successResponse<T>(message: string, data?: T) {
  return apiResponse(200, message, data);
}

/**
 * Error Response
 * رد الخطأ
 */
export function errorResponse(statusCode: number, message: string, error?: string) {
  return apiResponse(statusCode, message, undefined, error);
}
