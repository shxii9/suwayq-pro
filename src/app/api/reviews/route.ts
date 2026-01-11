import { NextRequest, NextResponse } from "next/server";

// بيانات تجريبية
const mockReviews = [
  {
    id: "review-1",
    listingId: "1",
    userId: "user-1",
    userName: "أحمد محمد",
    rating: 5,
    title: "منتج ممتاز",
    content: "المنتج جديد وبحالة ممتازة، والبائع موثوق جداً",
    helpful: 12,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-2",
    listingId: "1",
    userId: "user-2",
    userName: "فاطمة علي",
    rating: 4,
    title: "جيد جداً",
    content: "المنتج جيد لكن التوصيل استغرق وقتاً أطول من المتوقع",
    helpful: 8,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// GET - الحصول على التقييمات
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const listingId = searchParams.get("listingId");
    const minRating = searchParams.get("minRating");

    let filtered = [...mockReviews];

    if (listingId) {
      filtered = filtered.filter((r) => r.listingId === listingId);
    }

    if (minRating) {
      filtered = filtered.filter((r) => r.rating >= parseInt(minRating));
    }

    return NextResponse.json(
      {
        success: true,
        data: filtered,
        total: filtered.length,
        averageRating:
          filtered.length > 0
            ? (filtered.reduce((sum, r) => sum + r.rating, 0) / filtered.length).toFixed(1)
            : 0,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطأ في جلب التقييمات" },
      { status: 500 }
    );
  }
}

// POST - إضافة تقييم جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { listingId, userId, userName, rating, title, content } = body;

    if (!listingId || !userId || !rating || !title || !content) {
      return NextResponse.json(
        { success: false, error: "البيانات المطلوبة غير مكتملة" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "التقييم يجب أن يكون بين 1 و 5" },
        { status: 400 }
      );
    }

    const newReview = {
      id: `review-${Date.now()}`,
      listingId,
      userId,
      userName,
      rating,
      title,
      content,
      helpful: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newReview,
        message: "تم إضافة التقييم بنجاح",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطأ في إضافة التقييم" },
      { status: 500 }
    );
  }
}
