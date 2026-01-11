import { NextRequest, NextResponse } from "next/server";

// بيانات تجريبية
const mockUsers = [
  {
    id: "user-1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+965 99999999",
    role: "buyer",
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-2",
    name: "فاطمة علي",
    email: "fatima@example.com",
    phone: "+965 98888888",
    role: "seller",
    verified: true,
    createdAt: new Date().toISOString(),
  },
];

// GET - الحصول على المستخدمين
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");
    const search = searchParams.get("search");

    let filtered = [...mockUsers];

    if (role) {
      filtered = filtered.filter((u) => u.role === role);
    }

    if (search) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
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
      { success: false, error: "خطأ في جلب المستخدمين" },
      { status: 500 }
    );
  }
}

// POST - إنشاء مستخدم جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "الحقول المطلوبة غير مكتملة" },
        { status: 400 }
      );
    }

    // التحقق من عدم وجود بريد مكرر
    if (mockUsers.some((u) => u.email === email)) {
      return NextResponse.json(
        { success: false, error: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 400 }
      );
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone: phone || "",
      role: role || "buyer",
      verified: false,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newUser,
        message: "تم إنشاء الحساب بنجاح",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطأ في إنشاء الحساب" },
      { status: 500 }
    );
  }
}
