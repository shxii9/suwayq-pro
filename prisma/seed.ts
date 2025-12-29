import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  console.log('🧹 تنظيف القاعدة...')
  await prisma.favorite.deleteMany({})
  await prisma.listing.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('🔐 إنشاء المستخدمين...')
  const admin = await prisma.user.create({
    data: {
      email: 'admin@suwayq.com',
      name: 'إدارة السويق',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('🚀 إضافة إعلانات تجريبية مع صور...')
  await prisma.listing.create({
    data: {
      title: 'تويوتا لاندكروزر 2024',
      description: 'VXR فل كامل، حالة الوكالة، شاشات وجلد',
      price: 32000,
      category: 'سيارات',
      status: 'ACTIVE',
      userId: admin.id,
      images: ['https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=800']
    }
  })

  await prisma.listing.create({
    data: {
      title: 'ماكبوك برو M3 Max',
      description: 'أقوى نسخة لعام 2024، رام 64GB',
      price: 1600,
      category: 'أجهزة',
      status: 'ACTIVE',
      userId: admin.id,
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800']
    }
  })

  console.log('✅ تم تحديث القاعدة والبيانات بنجاح!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
