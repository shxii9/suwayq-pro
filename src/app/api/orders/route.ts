import { NextRequest, NextResponse } from "next/server";

// بيانات تجريبية
const mockOrders = [
  {
    id: "ORD-001",
    userId: "user-1",
    items: [
      {
        listingId: "1",
        title: "آيفون 15 برو",
        price: 450,
        quantity: 1,
      },
    ],
    total: 455,
    status: "تم التسليم",
    shippingAddress: "الكويت - حولي",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ORD-002",
    userId: "user-1",
    items: [
      {
        listingId: "2",
        title: "سماعات Sony",
        price: 180,
        quantity: 2,
      },
    ],
    total: 365,
    status: "قيد التسليم",
    shippingAddress: "الكويت - الفروانية",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// GET - الحصول على الطلبات
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    let filtered = [...mockOrders];

    if (userId) {
      filtered = filtered.filter((o) => o.userId === userId);
    }

    if (status) {
      filtered = filtered.filter((o) => o.status === status);
    }

    return NextResponse.json(
      {
        success: true,
        data: filtered,
        total: filtered.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطأ في جلب الطلبات" },
      { status: 500 }
    );
  }
}

// POST - إنشاء طلب جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, items, shippingAddress } = body;

    if (!userId || !items || items.length === 0 || !shippingAddress) {
      return NextResponse.json(
        { success: false, error: "البيانات المطلوبة غير مكتملة" },
        { status: 400 }
      );
    }

    const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) + 5; // +5 شحن

    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId,
      items,
      total,
      status: "قيد المعالجة",
      shippingAddress,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
        message: "تم إنشاء الطلب بنجاح",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطأ في إنشاء الطلب" },
      { status: 500 }
    );
  }
}
