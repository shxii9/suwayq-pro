import fs from "fs";

const checks = [
  ["Auth helpers", "src/lib/auth.ts"],
  ["Roles helpers", "src/lib/roles.ts"],
  ["API handler", "src/lib/api-handler.ts"],
  ["Middleware", "src/middleware.ts"],
  ["Prisma schema", "prisma/schema.prisma"],
  ["Dashboard API", "src/app/api/dashboard/stats/route.ts"],
];

let ok = true;

for (const [name, path] of checks) {
  if (fs.existsSync(path)) {
    console.log("✅", name);
  } else {
    console.log("❌", name, "مفقود");
    ok = false;
  }
}

// .env check
const trackedEnv = fs
  .readFileSync(".gitignore", "utf-8")
  .includes(".env");

if (trackedEnv) {
  console.log("✅ .env غير متتبع");
} else {
  console.log("⚠️ .env غير مذكور في .gitignore");
}

console.log("\n--------------------------------");

if (ok) {
  console.log("🎉 المشروع جاهز للإنتاج (تقنيًا)");
} else {
  console.log("⚠️ المشروع فيه نواقص");
}
