import { NextRequest, NextResponse } from "next/server";

// بيانات تجريبية
const mockListings: Record<string, any> = {
  "1": {
    id: "1",
    title: "آيفون 15 برو ماكس",
    price: 450,
    description: "هاتف ذكي جديد تماماً بحالة ممتازة مع جميع الملحقات الأصلية",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=400",
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=800",
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=800",
    ],
    category: "إلكترونيات",
    condition: "جديد",
    location: "الكويت",
    seller: { id: "seller-1", name: "متجر الإلكترونيات", verified: true },
    rating: 4.8,
    reviews: 125,
    createdAt: new Date().toISOString(),
    specifications: {
      "الماركة": "Apple",
      "الموديل": "iPhone 15 Pro Max",
      "السعة": "256GB",
    },
  },
};

// GET - الحصول على تفاصيل إعلان واحد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const listing = mockListings[params.id];

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "الإعلان غير موجود" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: listing,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطأ في جلب الإعلان" },
      { status: 500 }
    );
  }
}

// PUT - تحديث إعلان
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const listing = mockListings[params.id];

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "الإعلان غير موجود" },
        { status: 404 }
      );
    }

    const updated = { ...listing, ...body, id: params.id };
    mockListings[params.id] = updated;

    return NextResponse.json(
      {
        success: true,
        data: updated,
        message: "تم تحديث الإعلان بنجاح",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطأ في تحديث الإعلان" },
      { status: 500 }
    );
  }
}

// DELETE - حذف إعلان
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!mockListings[params.id]) {
      return NextResponse.json(
        { success: false, error: "الإعلان غير موجود" },
        { status: 404 }
      );
    }

    delete mockListings[params.id];

    return NextResponse.json(
      {
        success: true,
        message: "تم حذف الإعلان بنجاح",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطأ في حذف الإعلان" },
      { status: 500 }
    );
  }
}
