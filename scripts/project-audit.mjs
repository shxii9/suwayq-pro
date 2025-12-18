import fs from "fs";

const checks = [
  "src/lib/db.ts",
  "src/middleware.ts",
  "src/app/api/auth/login/route.ts",
  "src/app/api/listings/create/route.ts"
];

checks.forEach(c => {
  if (fs.existsSync(c)) {
    console.log("✅", c);
  } else {
    console.log("❌ MISSING:", c);
  }
});
