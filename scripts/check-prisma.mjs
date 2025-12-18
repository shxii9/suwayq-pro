import fs from "fs";

const schemaPath = "prisma/schema.prisma";

if (!fs.existsSync(schemaPath)) {
  console.log("❌ Prisma schema غير موجود");
  process.exit(0);
}

console.log("✅ prisma/schema.prisma موجود");

const schema = fs.readFileSync(schemaPath, "utf-8");

if (schema.includes("model User")) {
  console.log("✅ model User موجود");
} else {
  console.log("❌ model User غير موجود");
}

if (schema.includes("model Listing")) {
  console.log("✅ model Listing موجود");
} else {
  console.log("❌ model Listing غير موجود");
}

if (schema.includes("datasource db")) {
  console.log("✅ datasource db موجود");
} else {
  console.log("❌ datasource db غير موجود");
}
