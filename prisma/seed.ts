import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  console.log('🧹 تنظيف شامل لبناء مجتمع جديد...')
  await prisma.favorite.deleteMany({})
  await prisma.listing.deleteMany({})
  await prisma.user.deleteMany({})

  // قائمة أسماء واقعية لتوليد المستخدمين
  const userNames = [
    'عبدالله الشمري', 'سعود المطيري', 'خالد العنزي', 'فهد الرشيدي', 
    'مريم أبل', 'سارة الكندري', 'نورة العجمي', 'جاسم بهبهاني',
    'يوسف القطان', 'بدر العوضي', 'أحمد الفضلي', 'فيصل الدوسري'
  ]

  console.log('👥 جاري إنشاء مجتمع من البائعين...')
  const users = []
  
  // إنشاء الآدمن أولاً
  const admin = await prisma.user.create({
    data: { email: 'admin@suwayq.com', name: 'إدارة سويق PRO', password: hashedPassword, role: 'ADMIN' }
  })
  users.push(admin)

  // إنشاء 15 مستخدم عشوائي
  for (let i = 0; i < 15; i++) {
    const name = userNames[i % userNames.length] + " " + (Math.floor(Math.random() * 90) + 10)
    const user = await prisma.user.create({
      data: {
        email: `user${i}@suwayq.com`,
        name: name,
        password: hashedPassword,
        role: 'USER'
      }
    })
    users.push(user)
  }

  const locations = ['السالمية', 'حولي', 'الشويخ', 'الأحمدي', 'الجهراء', 'العاصمة', 'الفروانية', 'المنقف', 'القرين']
  const categories = [
    { name: 'سيارات', min: 2500, max: 55000, terms: ['لكزس LX570', 'تويوتا جيب', 'مرسيدس G-Class', 'نيسان باترول', 'تاهو'] },
    { name: 'أجهزة', min: 80, max: 900, terms: ['آيفون 15 برو', 'سوني 5', 'ماكبوك إير', 'ساعة آبل', 'شاشة سامسونج'] },
    { name: 'عقارات', min: 300, max: 2000, terms: ['شقة غرفتين', 'دور أول واسع', 'ملحق عائلات', 'استوديو مفروش'] },
    { name: 'أثاث', min: 40, max: 1200, terms: ['طقم قنفات', 'غرفة طعام مودرن', 'سرير ملكي', 'سجاد يدوي'] }
  ]

  console.log('🏗️ جاري توزيع 100 إعلان على المستخدمين الجدد...')

  for (let i = 0; i < 100; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)]
    const term = cat.terms[Math.floor(Math.random() * cat.terms.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const randomUser = users[Math.floor(Math.random() * users.length)] // اختيار بائع عشوائي
    
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 45)) // توزيع على مدار شهر ونصف

    await prisma.listing.create({
      data: {
        title: `${term} - في ${location}`,
        description: `عرض مميز من ${randomUser.name}. الحالة ممتازة والمعاينة متاحة في ${location}. السعر: ${cat.min + i} د.ك. للتواصل عبر الرسائل.`,
        price: Math.floor(Math.random() * (cat.max - cat.min + 1)) + cat.min,
        category: cat.name,
        status: 'ACTIVE',
        userId: randomUser.id,
        createdAt: date,
        images: [`https://picsum.photos/seed/${i + 123}/800/600`] // استخدام Picsum لضمان استقرار الصور وتنوعها
      }
    })
  }

  console.log('✅ اكتمل بناء المجتمع والبيانات بنجاح! تم إنشاء 16 مستخدم و100 إعلان.')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
