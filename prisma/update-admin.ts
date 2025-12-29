import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const email = 'admin@suwayq.com' // الإيميل الذي سنرفعه لرتبة أدمن
  
  const user = await prisma.user.update({
    where: { email: email },
    data: { role: 'ADMIN' },
  })
  
  console.log(`✅ تم بنجاح رفع صلاحيات المستخدم: ${user.name} إلى ADMIN`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
