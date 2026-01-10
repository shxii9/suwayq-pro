import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/wishlist
 * الحصول على قائمة الأمنيات للمستخدم
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

    const userId = session.user.id;

    // جلب قائمة الأمنيات مع تفاصيل المنتجات
    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            seller: {
              select: {
                name: true,
                image: true
              }
            },
            images: true
          }
        }
      },
      orderBy: { addedAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: wishlist
    });

  } catch (error) {
    console.error('خطأ في جلب قائمة الأمنيات:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب قائمة الأمنيات' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/wishlist
 * إضافة منتج إلى قائمة الأمنيات
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

    const { productId } = await request.json();
    const userId = session.user.id;

    if (!productId) {
      return NextResponse.json(
        { error: 'معرف المنتج مطلوب' },
        { status: 400 }
      );
    }

    // التحقق من وجود المنتج
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    // إضافة إلى قائمة الأمنيات (أو تحديث التاريخ إذا كان موجوداً)
    const wishlistItem = await prisma.wishlist.upsert({
      where: {
        userId_productId: {
          userId,
          productId
        }
      },
      create: {
        userId,
        productId
      },
      update: {
        addedAt: new Date()
      }
    });

    // إنشاء إشعار إذا انخفض سعر المنتج
    await prisma.notification.create({
      data: {
        userId,
        type: 'wishlist_added',
        title: 'تمت الإضافة إلى قائمة الأمنيات',
        message: `تمت إضافة "${product.name}" إلى قائمة أمنياتك`,
        link: `/products/${productId}`
      }
    });

    return NextResponse.json({
      success: true,
      data: wishlistItem,
      message: 'تمت الإضافة إلى قائمة الأمنيات'
    });

  } catch (error) {
    console.error('خطأ في إضافة المنتج إلى قائمة الأمنيات:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إضافة المنتج' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/wishlist
 * إزالة منتج من قائمة الأمنيات
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const userId = session.user.id;

    if (!productId) {
      return NextResponse.json(
        { error: 'معرف المنتج مطلوب' },
        { status: 400 }
      );
    }

    // إزالة من قائمة الأمنيات
    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'تمت الإزالة من قائمة الأمنيات'
    });

  } catch (error) {
    console.error('خطأ في إزالة المنتج من قائمة الأمنيات:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إزالة المنتج' },
      { status: 500 }
    );
  }
}
