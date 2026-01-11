import { NextRequest, NextResponse } from "next/server";

// بيانات تجريبية
const mockListings = [
  {
    id: "1",
    title: "آيفون 15 برو ماكس",
    price: 450,
    description: "هاتف ذكي جديد بحالة ممتازة",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=400",
    category: "إلكترونيات",
    condition: "جديد",
    location: "الكويت",
    seller: { id: "seller-1", name: "متجر الإلكترونيات", verified: true },
    rating: 4.8,
    reviews: 125,
    createdAt: new Date().toISOString(),
  },
];

// GET - الحصول على الإعلانات
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    let filtered = [...mockListings];

    if (category) {
      filtered = filtered.filter((l) => l.category === category);
    }

    if (minPrice) {
      filtered = filtered.filter((l) => l.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((l) => l.price <= parseInt(maxPrice));
    }

    if (search) {
      filtered = filtered.filter((l) =>
        l.title.toLowerCase().includes(search.toLowerCase())
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
      { success: false, error: "خطأ في جلب الإعلانات" },
      { status: 500 }
    );
  }
}

// POST - إنشاء إعلان جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description, price, category, condition, location } = body;

    if (!title || !description || !price || !category) {
      return NextResponse.json(
        { success: false, error: "الحقول المطلوبة غير مكتملة" },
        { status: 400 }
      );
    }

    const newListing = {
      id: `listing-${Date.now()}`,
      title,
      description,
      price: parseFloat(price),
      category,
      condition,
      location,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      seller: { id: "seller-1", name: "البائع", verified: false },
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newListing,
        message: "تم إنشاء الإعلان بنجاح",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "خطأ في إنشاء الإعلان" },
      { status: 500 }
    );
  }
}
