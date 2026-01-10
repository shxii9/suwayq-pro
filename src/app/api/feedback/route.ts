import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/feedback
 * إرسال تغذية راجعة من المستخدم
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    const body = await request.json();
    const {
      type, // bug, feature_request, improvement, general
      category, // ui_ux, performance, functionality, other
      title,
      description,
      rating, // 1-5
      page,
      userAgent,
      screenshot
    } = body;

    // التحقق من البيانات المطلوبة
    if (!type || !title || !description) {
      return NextResponse.json(
        { error: 'النوع والعنوان والوصف مطلوبة' },
        { status: 400 }
      );
    }

    // إنشاء التغذية الراجعة
    const feedback = await prisma.feedback.create({
      data: {
        userId: session?.user?.id,
        type,
        category: category || 'other',
        title,
        description,
        rating: rating || null,
        page: page || null,
        userAgent: userAgent || request.headers.get('user-agent'),
        screenshot: screenshot || null,
        status: 'pending',
        priority: determinePriority(type, rating)
      }
    });

    // إرسال إشعار للمسؤولين
    await notifyAdmins(feedback);

    // إنشاء إشعار للمستخدم
    if (session?.user?.id) {
      await prisma.notification.create({
        data: {
          userId: session.user.id,
          type: 'feedback_received',
          title: 'شكراً على ملاحظاتك',
          message: 'تم استلام ملاحظاتك وسيتم مراجعتها قريباً',
          link: `/feedback/${feedback.id}`
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: feedback,
      message: 'شكراً لك! تم إرسال ملاحظاتك بنجاح'
    });

  } catch (error) {
    console.error('خطأ في إرسال التغذية الراجعة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إرسال التغذية الراجعة' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/feedback
 * الحصول على قائمة التغذية الراجعة (للمسؤولين)
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
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const myFeedback = searchParams.get('myFeedback') === 'true';
    
    const skip = (page - 1) * limit;

    // بناء شروط الاستعلام
    const where: any = {};
    
    if (myFeedback) {
      where.userId = session.user.id;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (type) {
      where.type = type;
    }

    // جلب التغذية الراجعة
    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true
            }
          }
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      prisma.feedback.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        feedbacks,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('خطأ في جلب التغذية الراجعة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب التغذية الراجعة' },
      { status: 500 }
    );
  }
}

/**
 * تحديد أولوية التغذية الراجعة
 */
function determinePriority(type: string, rating?: number): string {
  if (type === 'bug') {
    return 'high';
  }
  
  if (rating && rating <= 2) {
    return 'high';
  }
  
  if (type === 'feature_request') {
    return 'medium';
  }
  
  return 'low';
}

/**
 * إرسال إشعار للمسؤولين
 */
async function notifyAdmins(feedback: any) {
  try {
    // الحصول على قائمة المسؤولين
    const admins = await prisma.user.findMany({
      where: {
        role: 'admin'
      },
      select: {
        id: true
      }
    });

    // إنشاء إشعارات للمسؤولين
    const notifications = admins.map(admin => ({
      userId: admin.id,
      type: 'new_feedback',
      title: `تغذية راجعة جديدة: ${feedback.type}`,
      message: feedback.title,
      link: `/admin/feedback/${feedback.id}`
    }));

    await prisma.notification.createMany({
      data: notifications
    });

  } catch (error) {
    console.error('خطأ في إرسال إشعار للمسؤولين:', error);
  }
}
