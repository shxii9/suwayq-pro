import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/notifications
 * الحصول على إشعارات المستخدم
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    
    const userId = session.user.id;
    const skip = (page - 1) * limit;

    // بناء شروط الاستعلام
    const where: any = { userId };
    if (unreadOnly) {
      where.isRead = false;
    }

    // جلب الإشعارات
    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: {
          userId,
          isRead: false
        }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        notifications,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        unreadCount
      }
    });

  } catch (error) {
    console.error('خطأ في جلب الإشعارات:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الإشعارات' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/notifications/:id/read
 * تعليم إشعار كمقروء
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const { notificationId, markAllAsRead } = await request.json();
    const userId = session.user.id;

    if (markAllAsRead) {
      // تعليم جميع الإشعارات كمقروءة
      await prisma.notification.updateMany({
        where: {
          userId,
          isRead: false
        },
        data: {
          isRead: true
        }
      });

      return NextResponse.json({
        success: true,
        message: 'تم تعليم جميع الإشعارات كمقروءة'
      });
    }

    if (!notificationId) {
      return NextResponse.json(
        { error: 'معرف الإشعار مطلوب' },
        { status: 400 }
      );
    }

    // تعليم إشعار واحد كمقروء
    const notification = await prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId
      },
      data: {
        isRead: true
      }
    });

    if (notification.count === 0) {
      return NextResponse.json(
        { error: 'الإشعار غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'تم تعليم الإشعار كمقروء'
    });

  } catch (error) {
    console.error('خطأ في تحديث الإشعار:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث الإشعار' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/notifications/:id
 * حذف إشعار
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
    const notificationId = searchParams.get('id');
    const userId = session.user.id;

    if (!notificationId) {
      return NextResponse.json(
        { error: 'معرف الإشعار مطلوب' },
        { status: 400 }
      );
    }

    // حذف الإشعار
    const result = await prisma.notification.deleteMany({
      where: {
        id: notificationId,
        userId
      }
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: 'الإشعار غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'تم حذف الإشعار'
    });

  } catch (error) {
    console.error('خطأ في حذف الإشعار:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف الإشعار' },
      { status: 500 }
    );
  }
}
