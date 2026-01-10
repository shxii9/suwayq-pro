import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/seller/stats
 * الحصول على إحصائيات البائع المفصلة
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const sellerId = session.user.id;

    // الحصول على إحصائيات البائع
    let stats = await prisma.sellerStats.findUnique({
      where: { sellerId }
    });

    // إذا لم توجد إحصائيات، قم بإنشائها
    if (!stats) {
      stats = await prisma.sellerStats.create({
        data: { sellerId }
      });
    }

    // حساب الإحصائيات الإضافية
    const [
      activeProducts,
      pendingOrders,
      recentReviews,
      monthlyRevenue
    ] = await Promise.all([
      // عدد المنتجات النشطة
      prisma.product.count({
        where: {
          sellerId,
          status: 'active'
        }
      }),
      
      // الطلبات المعلقة
      prisma.order.count({
        where: {
          sellerId,
          status: 'pending'
        }
      }),

      // آخر التقييمات
      prisma.sellerRating.findMany({
        where: { sellerId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          buyer: {
            select: {
              name: true,
              image: true
            }
          }
        }
      }),

      // الإيرادات الشهرية
      prisma.order.aggregate({
        where: {
          sellerId,
          status: 'completed',
          createdAt: {
            gte: new Date(new Date().setDate(1)) // أول يوم من الشهر
          }
        },
        _sum: {
          total: true
        }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        ...stats,
        activeProducts,
        pendingOrders,
        recentReviews,
        monthlyRevenue: monthlyRevenue._sum.total || 0
      }
    });

  } catch (error) {
    console.error('خطأ في جلب إحصائيات البائع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الإحصائيات' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/seller/stats/update
 * تحديث إحصائيات البائع (يتم استدعاؤه تلقائياً عند إتمام طلب)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const { orderId, action } = await request.json();
    const sellerId = session.user.id;

    // الحصول على تفاصيل الطلب
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order || order.sellerId !== sellerId) {
      return NextResponse.json(
        { error: 'الطلب غير موجود' },
        { status: 404 }
      );
    }

    // تحديث الإحصائيات
    const stats = await prisma.sellerStats.upsert({
      where: { sellerId },
      create: {
        sellerId,
        totalSales: action === 'complete' ? 1 : 0,
        totalRevenue: action === 'complete' ? order.total : 0,
        completedOrders: action === 'complete' ? 1 : 0,
        cancelledOrders: action === 'cancel' ? 1 : 0
      },
      update: {
        totalSales: action === 'complete' ? { increment: 1 } : undefined,
        totalRevenue: action === 'complete' ? { increment: order.total } : undefined,
        completedOrders: action === 'complete' ? { increment: 1 } : undefined,
        cancelledOrders: action === 'cancel' ? { increment: 1 } : undefined,
        lastActiveAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('خطأ في تحديث إحصائيات البائع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث الإحصائيات' },
      { status: 500 }
    );
  }
}
