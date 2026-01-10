import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  console.log('🧹 تنظيف القاعدة...')
  await prisma.listing.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('🔐 إنشاء مستخدمين بكلمات مرور مشفرة...')
  const admin = await prisma.user.create({
    data: {
      email: 'admin@suwayq.com',
      name: 'إدارة السويق',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  const user1 = await prisma.user.create({
    data: {
      email: 'ahmed@mail.com',
      name: 'أحمد الناصري',
      password: hashedPassword,
    },
  })

  console.log('🚀 إضافة الإعلانات...')
  await prisma.listing.createMany({
    data: [
      { title: 'تويوتا لاندكروزر 2024', description: 'VXR فل كامل، حالة الوكالة', price: 32000, category: 'CARS', userId: admin.id, status: 'ACTIVE' },
      { title: 'فيلا فاخرة في بوشر', description: 'مساحة واسعة، تصميم مودرن، 5 غرف', price: 155000, category: 'REAL_ESTATE', userId: admin.id, status: 'ACTIVE' },
      { title: 'ماكبوك برو M3 Max', description: 'أقوى نسخة، رام 64GB، جديد تماماً', price: 1600, category: 'ELECTRONICS', userId: user1.id, status: 'ACTIVE' },
      { title: 'شقة فاخرة في الموالح', description: 'قريبة من سيتي سنتر، غرفتين وصالة', price: 45000, category: 'REAL_ESTATE', userId: user1.id, status: 'ACTIVE' }
    ],
  })

  console.log('✅ تم التشفير وضخ البيانات بنجاح!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
