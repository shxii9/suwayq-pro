# Auto-SEO-Install.ps1
# يقوم بتركيب نظام SEO كامل (Sitemap, Robots, Metadata) تلقائياً

$ErrorActionPreference = "Stop"
Write-Host "🚀 بدء تثبيت حزمة SEO..." -ForegroundColor Cyan

# -----------------------------------------------------------
# 1. إنشاء ملف sitemap.ts (خريطة الموقع الديناميكية)
# -----------------------------------------------------------
$SitemapPath = "src/app/sitemap.ts"
$SitemapContent = @'
import { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const prisma = new PrismaClient();
  const baseUrl = 'https://suwayq-pro.vercel.app';
  
  try {
      // جلب آخر 100 إعلان نشط
      const listings = await prisma.listing.findMany({
        where: { status: 'ACTIVE' },
        select: { id: true, updatedAt: true },
        take: 100,
        orderBy: { updatedAt: 'desc' }
      });

      const listingUrls = listings.map((listing) => ({
        url: `${baseUrl}/listings/${listing.id}`,
        lastModified: listing.updatedAt,
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }));

      const routes = ['', '/search', '/dashboard', '/messages'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      }));

      return [...routes, ...listingUrls];
  } catch (error) {
      console.error('Sitemap generation error:', error);
      return [];
  }
}
'@
Set-Content -Path $SitemapPath -Value $SitemapContent -Encoding UTF8
Write-Host "✅ تم إنشاء sitemap.ts" -ForegroundColor Green

# -----------------------------------------------------------
# 2. إنشاء ملف robots.txt
# -----------------------------------------------------------
$RobotsPath = "src/app/robots.ts"
$RobotsContent = @'
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard/"],
    },
    sitemap: "https://suwayq-pro.vercel.app/sitemap.xml",
  };
}
'@
Set-Content -Path $RobotsPath -Value $RobotsContent -Encoding UTF8
Write-Host "✅ تم إنشاء robots.ts" -ForegroundColor Green

# -----------------------------------------------------------
# 3. تحديث layout.tsx (لإضافة العناوين والوصف العام)
# -----------------------------------------------------------
# سنقوم بتحديث ملف التخطيط الرئيسي ليحتوي على إعدادات SEO عالمية
$LayoutPath = "src/app/layout.tsx"
$LayoutContent = @'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | سُوَيق PRO",
    default: "سُوَيق PRO | منصة الإعلانات الأولى في الكويت",
  },
  description: "بيع واشترِ سيارات، عقارات، وإلكترونيات في الكويت بسهولة وأمان عبر منصة سويق برو.",
  keywords: ["سوق الكويت", "حراج", "سيارات للبيع", "عقارات الكويت", "سويق برو"],
  openGraph: {
    title: "سُوَيق PRO",
    description: "أفضل منصة للبيع والشراء في الكويت.",
    url: "https://suwayq-pro.vercel.app",
    siteName: "سُوَيق PRO",
    locale: "ar_KW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
'@
Set-Content -Path $LayoutPath -Value $LayoutContent -Encoding UTF8
Write-Host "✅ تم تحديث layout.tsx بإعدادات SEO." -ForegroundColor Green

Write-Host "🎉 اكتمل تثبيت SEO بنجاح!" -ForegroundColor Cyan