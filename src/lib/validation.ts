import { z } from 'zod';

/**
 * Basic Validation Schemas (Original)
 * مخططات التحقق الأساسية
 */
export const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const registerSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  name: z.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين'),
});

export const createListingSchema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون على الأقل 3 أحرف'),
  description: z.string().optional(),
  price: z.string().min(1, 'السعر مطلوب'),
  location: z.string().optional(),
  category: z.string().min(1, 'الفئة مطلوبة'),
  image: z.string().url('رابط الصورة غير صحيح'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;

/**
 * Advanced Validation Schemas
 * مخططات التحقق المتقدمة
 */

/**
 * User Validation Schemas
 * مخططات التحقق من بيانات المستخدم
 */
export const userValidationSchemas = {
  updateProfile: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').optional(),
    phone: z.string().optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    avatar: z.string().url('Invalid avatar URL').optional(),
  }),

  changePassword: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
};

/**
 * Listing Validation Schemas
 * مخططات التحقق من بيانات الإعلانات
 */
export const listingValidationSchemas = {
  update: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters').optional(),
    description: z.string().min(20, 'Description must be at least 20 characters').max(5000, 'Description must be less than 5000 characters').optional(),
    price: z.number().positive('Price must be positive').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor']).optional(),
    location: z.string().min(3, 'Location must be at least 3 characters').optional(),
    images: z.array(z.string().url('Invalid image URL')).optional(),
    tags: z.array(z.string()).optional(),
  }),

  search: z.object({
    query: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor']).optional(),
    location: z.string().optional(),
    page: z.number().min(1, 'Page must be at least 1').optional(),
    limit: z.number().min(1, 'Limit must be at least 1').max(100, 'Limit must be less than 100').optional(),
  }),
};

/**
 * Order Validation Schemas
 * مخططات التحقق من بيانات الطلبات
 */
export const orderValidationSchemas = {
  create: z.object({
    items: z.array(z.object({
      listingId: z.string(),
      quantity: z.number().positive('Quantity must be positive'),
    })).min(1, 'At least one item is required'),
    shippingAddress: z.object({
      street: z.string().min(5, 'Street must be at least 5 characters'),
      city: z.string().min(2, 'City must be at least 2 characters'),
      state: z.string().min(2, 'State must be at least 2 characters'),
      zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
      country: z.string().min(2, 'Country must be at least 2 characters'),
    }),
  }),
};

/**
 * Review Validation Schemas
 * مخططات التحقق من بيانات التقييمات
 */
export const reviewValidationSchemas = {
  create: z.object({
    listingId: z.string(),
    rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
    comment: z.string().min(10, 'Comment must be at least 10 characters').max(1000, 'Comment must be less than 1000 characters').optional(),
  }),
};

/**
 * Validate Data
 * التحقق من البيانات
 */
export async function validateData<T>(
  schema: z.ZodSchema,
  data: unknown
): Promise<{ success: boolean; data?: T; errors?: Record<string, string[]> }> {
  try {
    const validatedData = await schema.parseAsync(data);
    return { success: true, data: validatedData as T };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: ['Validation failed'] } };
  }
}

/**
 * Export all validation schemas
 */
export const validationSchemas = {
  user: userValidationSchemas,
  listing: listingValidationSchemas,
  order: orderValidationSchemas,
  review: reviewValidationSchemas,
};
