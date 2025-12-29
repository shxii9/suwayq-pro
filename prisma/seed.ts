import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  console.log('🧹 تنظيف شامل للقاعدة...')
  await prisma.favorite.deleteMany({})
  await prisma.listing.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('👥 إنشاء مستخدمين موثوقين...')
  const admin = await prisma.user.create({
    data: { email: 'admin@suwayq.com', name: 'إدارة سويق PRO', password: hashedPassword, role: 'ADMIN' }
  })

  const locations = ['السالمية', 'حولي', 'الشويخ', 'الأحمدي', 'الجهراء', 'العاصمة', 'الفروانية']
  const categories = [
    { name: 'سيارات', min: 2000, max: 45000, terms: ['لكزس', 'تويوتا', 'مرسيدس', 'نيسان', 'فورد'] },
    { name: 'أجهزة', min: 50, max: 600, terms: ['آيفون', 'ماكبوك', 'بلايستيشن', 'ساعة ذكية'] },
    { name: 'عقارات', min: 250, max: 1500, terms: ['شقة للإيجار', 'دور واسع', 'ملحق قديم', 'استوديو مودرن'] },
    { name: 'أثاث', min: 20, max: 800, terms: ['طقم كنب', 'طاولة طعام', 'غرفة نوم كاملة', 'سجاد إيراني'] }
  ]

  console.log('🏗️ جاري ضخ 100 إعلان احترافي بنظام التوقيت الموزع...')

  for (let i = 0; i < 100; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)]
    const term = cat.terms[Math.floor(Math.random() * cat.terms.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    
    // إنشاء تاريخ عشوائي خلال الـ 30 يوم الماضية
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    await prisma.listing.create({
      data: {
        title: `${term} - حالة ممتازة في ${location}`,
        description: `إعلان رقم ${i+1}: عرض خاص ومميز لـ ${term}. المعاينة في منطقة ${location}. السعر نهائي والصور حقيقية.`,
        price: Math.floor(Math.random() * (cat.max - cat.min + 1)) + cat.min,
        category: cat.name,
        status: 'ACTIVE',
        userId: admin.id,
        createdAt: date,
        // استخدام محرك Unsplash لجلب صور فريدة بناءً على القسم والكلمة
        images: [`https://source.unsplash.com/featured/?${encodeURIComponent(cat.name)},${encodeURIComponent(term)}&sig=${i}`]
      }
    })
  }

  console.log('✅ اكتملت عملية الضخ المليوني بنجاح!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
