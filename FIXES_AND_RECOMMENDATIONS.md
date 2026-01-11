# ملف التوصيات والإصلاحات المقترحة لمشروع Suwayq Pro

## القسم الأول: الإصلاحات الحتمية (Critical Fixes)

### 1. إصلاح ملف `src/app/listing/[id]/page.tsx`

**المشكلة:** الملف يحتوي على كود مدمج بشكل غير صحيح مع محارف خاصة.

**الحل:** إعادة كتابة الملف بالكامل. إليك نموذج مقترح:

```typescript
"use client";

import { Skeleton } from "@/components/Skeleton";
import { QRCode } from 'react-qrcode-logo';
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StarRating } from "@/components/StarRating";
import { CheckCircle, MessageCircle, Eye, Phone, MapPin, Calendar, ChevronRight, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

export default function ListingDetail() {
  const { id } = useParams();
  const { theme } = useTheme();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("KWD");
  const [views, setViews] = useState(0);

  useEffect(() => {
    setViews(Math.floor(Math.random() * 500) + 120);
  }, []);

  const rates = { KWD: 1, SAR: 12.2, USD: 3.25 };

  useEffect(() => {
    fetch("/api/listings")
      .then(res => res.json())
      .then(data => {
        const item = data.find((l: any) => l.id === id);
        setListing(item);
        setLoading(false);
      })
      .catch(() => {
        toast.error("فشل تحميل الإعلان");
        setLoading(false);
      });
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing?.title,
        url: window.location.href,
      }).catch(() => toast.error("فشلت المشاركة"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط الإعلان!");
    }
  };

  const handleWhatsApp = () => {
    const message = `مرحباً، أنا مهتم بإعلانك: ${listing?.title} المعروض بسعر ${listing?.price} د.ك. هل لا يزال متوفراً؟`;
    const whatsappUrl = `https://wa.me/96590000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24" dir="rtl">
        <Navbar />
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-[3rem]" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-40 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        الإعلان غير موجود
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src={listing.image || "/placeholder.png"} 
              fill 
              className="object-cover" 
              alt={listing.title} 
            />
          </div>
          <div className="flex flex-col">
            <div className="hidden md:flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 mb-8">
              <p className="text-xs font-bold text-gray-400 mb-4">مسح سريع للإعلان</p>
              <QRCode 
                value={typeof window !== "undefined" ? window.location.href : ""} 
                size={120}
                qrStyle="dots"
                eyeRadius={10}
                fgColor={theme === "dark" ? "#60a5fa" : "#2563eb"}
              />
            </div>

            <h1 className="text-4xl font-black text-gray-900 mb-6">{listing.title}</h1>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl mb-8 flex items-center justify-between border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                  B
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-900 dark:text-white">بائع موثوق</span>
                    <CheckCircle size={16} className="text-blue-500 fill-blue-500 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">عضو منذ 2024</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">متصل الآن</span>
            </div>

            <div className="bg-blue-50 p-6 rounded-3xl mb-8">
              <span className="text-blue-600 text-3xl font-black">{listing.price} د.ك</span>
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed bg-gray-50 p-6 rounded-3xl">
              {listing.description}
            </p>

            <div className="mb-8">
              <StarRating />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleShare} 
                className="col-span-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all mb-4"
              >
                <Share2 size={20} /> مشاركة الإعلان مع الأصدقاء
              </button>
              <button 
                onClick={handleWhatsApp} 
                className="bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-100 transition-transform active:scale-95"
              >
                <MessageCircle size={24} /> واتساب
              </button>
              <a 
                href="tel:96590000000" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-transform active:scale-95"
              >
                <Phone size={24} /> اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 2. إصلاح ملف `src/app/page.tsx`

**المشكلة:** وجود محارف خاصة في مسارات الاستيراد.

**الحل:** تصحيح السطر 7 ليصبح:

```typescript
import { FavoriteButton } from "@/components/FavoriteButton";
import { ListingSkeleton } from "@/components/Skeleton";
import { MapPin, Search, Mic, MicOff, LayoutGrid, Car, Home as HomeIcon, Smartphone, Sofa } from "lucide-react";
```

بدلاً من:

```typescript
import { FavoriteButton } from "@/components/FavoriteButton";`nimport { ListingSkeleton } from "@/components/Skeleton";`nimport { MapPin, Search, Mic, MicOff, LayoutGrid, Car, Home as HomeIcon, Smartphone, Sofa } from "lucide-react";
```

### 3. إنشاء ملف `src/lib/prisma.ts`

**المشكلة:** الملفات تحاول استيراد `@/lib/prisma` وهو غير موجود.

**الحل:** إنشاء الملف بالمحتوى التالي:

```typescript
export { prisma } from './db';
```

أو بدلاً من ذلك، تعديل جميع الاستيرادات في الملفات التالية لتشير إلى `@/lib/db` بدلاً من `@/lib/prisma`:
- `src/app/api/feedback/route.ts`
- `src/app/api/notifications/route.ts`
- `src/app/api/seller/stats/route.ts`
- `src/app/api/wishlist/route.ts`

---

## القسم الثاني: تحسينات الأمان

### 1. تفعيل Strict Mode في TypeScript

**الملف:** `tsconfig.json`

**التغيير:**
```json
{
  "compilerOptions": {
    "strict": true,  // تغيير من false إلى true
    // ... باقي الخيارات
  }
}
```

**الفائدة:** سيساعد على اكتشاف الأخطاء المحتملة في وقت مبكر.

### 2. تحسين نظام المصادقة

**الملف:** `src/app/api/auth/login/route.ts`

**المشكلة الحالية:** استخدام معرّف المستخدم مباشرة في الكوكيز غير آمن.

**الحل المقترح:** الاستفادة الكاملة من `NextAuth.js`:

```typescript
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET
};
```

---

## القسم الثالث: تحسينات تجربة المطور

### 1. تحديث `.env.example`

```bash
# Database Configuration
DATABASE_URL="postgresql://suwayq_user:123456@localhost:5432/suwayq_db"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Cloudinary (اختياري)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

### 2. تحديث `README.md` بقسم إعداد Docker

إضافة القسم التالي إلى `README.md`:

```markdown
## 🐳 إعداد قاعدة البيانات باستخدام Docker

إذا كنت تريد تشغيل قاعدة بيانات PostgreSQL محليًا، يمكنك استخدام Docker:

```bash
# تشغيل حاوية PostgreSQL
docker-compose up -d

# التحقق من أن الحاوية تعمل
docker-compose ps

# إيقاف الحاوية
docker-compose down
```

بعد تشغيل الحاوية، استخدم بيانات الاتصال التالية في ملف `.env`:
```
DATABASE_URL="postgresql://suwayq_user:123456@localhost:5432/suwayq_db"
```
```

---

## القسم الرابع: اختبارات إضافية مقترحة

### 1. إضافة اختبارات الوحدة (Unit Tests)

يجب إضافة اختبارات للدوال الأساسية مثل:
- اختبارات دوال المصادقة
- اختبارات مسارات API
- اختبارات المكونات الرئيسية

### 2. إضافة اختبارات التكامل (Integration Tests)

اختبار تدفقات المستخدم الكاملة مثل:
- تسجيل مستخدم جديد
- تسجيل الدخول
- إنشاء إعلان
- البحث عن إعلان

---

## الخلاصة

بعد تطبيق الإصلاحات المذكورة أعلاه، سيكون المشروع جاهزًا للبناء والتشغيل. يوصى بتطبيق هذه الإصلاحات بالترتيب التالي:

1. **أولاً:** إصلاح الملفات التالفة (القسم الأول)
2. **ثانيًا:** تطبيق تحسينات الأمان (القسم الثاني)
3. **ثالثًا:** تحسين تجربة المطور (القسم الثالث)
4. **رابعًا:** إضافة الاختبارات (القسم الرابع)
