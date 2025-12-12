import { z } from 'zod';

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
