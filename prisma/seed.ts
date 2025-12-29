import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  console.log('🧹 تنظيف شامل لبناء مجتمع احترافي...')
  await prisma.favorite.deleteMany({})
  await prisma.listing.deleteMany({})
  await prisma.user.deleteMany({})

  const userNames = ['بدر المنصور', 'نورة المطيري', 'سليمان الفضلي', 'دلال الكندري', 'مشعل العتيبي', 'فاطمة بهبهاني', 'حسين العنزي', 'ليلى القطان']
  const locations = ['السالمية', 'حولي', 'الشويخ الصناعية', 'المنقف', 'صباح الأحمد', 'الخالدية', 'مشرف']
  
  const categorySpecs = [
    { 
      name: 'سيارات', 
      items: [
        { title: 'تويوتا لاندكروزر GXR', img: 'land-cruiser' },
        { title: 'نيسان باترول بلاتينيوم', img: 'nissan-patrol' },
        { title: 'لكزس LX570 فل كامل', img: 'lexus' },
        { title: 'مرسيدس S500 وكالة', img: 'mercedes-s-class' },
        { title: 'فورد اف 150 رابتر', img: 'ford-raptor' }
      ],
      minPrice: 5000, maxPrice: 45000
    },
    { 
      name: 'أجهزة', 
      items: [
        { title: 'آيفون 15 برو ماكس', img: 'iphone-15' },
        { title: 'ماكبوك برو M3', img: 'macbook-pro' },
        { title: 'بلايستيشن 5 مع يدتين', img: 'ps5' },
        { title: 'ساعة رولكس صبمارينر', img: 'rolex' }
      ],
      minPrice: 100, maxPrice: 8000
    },
    { 
      name: 'عقارات', 
      items: [
        { title: 'شقة فاخرة إطلالة بحرية', img: 'modern-apartment' },
        { title: 'فيلا مودرن للبيع', img: 'modern-villa' },
        { title: 'دور أرضي واسع للإيجار', img: 'house-interior' }
      ],
      minPrice: 400, maxPrice: 2500
    }
  ]

  console.log('👥 جاري إنشاء البائعين...')
  const users = []
  for (let name of userNames) {
    const user = await prisma.user.create({
      data: {
        email: `${name.replace(' ', '.')}@suwayq.com`,
        name: name,
        password: hashedPassword,
        role: 'USER'
      }
    })
    users.push(user)
  }

  console.log('📦 جاري ضخ 100 إعلان ذكي...')
  for (let i = 0; i < 100; i++) {
    const cat = categorySpecs[i % categorySpecs.length]
    const item = cat.items[Math.floor(Math.random() * cat.items.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const user = users[Math.floor(Math.random() * users.length)]
    
    // حالة الإعلان (90% نشط، 10% تم البيع)
    const status = Math.random() > 0.1 ? 'ACTIVE' : 'SOLD'
    const date = new Date()
    date.setHours(date.getHours() - Math.floor(Math.random() * 500))

    await prisma.listing.create({
      data: {
        title: `${item.title} - ${location}`,
        description: `للبيع ${item.title}. استعمال خفيف جداً، بحالة الوكالة. التواصل للجادين فقط في منطقة ${location}.`,
        price: Math.floor(Math.random() * (cat.maxPrice - cat.minPrice)) + cat.minPrice,
        category: cat.name,
        location: location,
        status: status,
        userId: user.id,
        createdAt: date,
        // تحسين: جلب صورة دقيقة بناءً على اسم المنتج
        images: [`https://source.unsplash.com/800x600/?${item.img.replace('-', ',')}`]
      }
    })
  }

  console.log('✅ تم إنجاز النظام المليوني! القاعدة الآن تحاكي منصة تجارية ناضجة.')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
