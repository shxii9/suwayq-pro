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
