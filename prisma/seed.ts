import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  console.log('🧹 تنظيف البيانات القديمة...')
  await prisma.favorite.deleteMany({})
  await prisma.listing.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('👥 إنشاء مستخدمين...')
  const admin = await prisma.user.create({
    data: { email: 'admin@suwayq.com', name: 'إدارة سويق', password: hashedPassword, role: 'ADMIN' }
  })

  // بيانات الصور لكل قسم لضمان التنوع
  const categoryImages: { [key: string]: string[] } = {
    'سيارات': [
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=800',
      'https://images.unsplash.com/photo-1520050206274-a1af4463d84d?w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
    ],
    'أجهزة': [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=800',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
    ],
    'عقارات': [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    'أثاث': [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'
    ]
  }

  const locations = ['الشويخ', 'السالمية', 'حولي', 'الأحمدي', 'الجهراء', 'مبارك الكبير', 'الفروانية']
  const categories = ['سيارات', 'أجهزة', 'عقارات', 'أثاث']

  console.log('📦 جاري ضخ 50 إعلان متنوع...')

  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const images = categoryImages[category];
    
    await prisma.listing.create({
      data: {
        title: `${category} مميز - عرض رقم ${i}`,
        description: `هذا وصف تفصيلي للإعلان رقم ${i} من قسم ${category}. الحالة ممتازة جداً والسعر قابل للمساومة بالمعقول.`,
        price: Math.floor(Math.random() * (50000 - 10 + 1)) + 10,
        category: category,
        status: 'ACTIVE',
        userId: admin.id,
        images: [images[Math.floor(Math.random() * images.length)]]
      }
    })
  }

  console.log('✅ تم الانتهاء من ضخ البيانات الضخمة بنجاح!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
