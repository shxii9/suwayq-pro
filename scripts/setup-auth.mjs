import fs from "fs";
import path from "path";

const files = [
  "src/lib/auth.ts",
  "src/app/api/auth/session/route.ts",
  "src/middleware.ts"
];

files.forEach(file => {
  if (!fs.existsSync(file)) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, "// TODO: implement auth\n");
    console.log("✅ created", file);
  } else {
    console.log("ℹ️ exists", file);
  }
});

console.log("🔥 Auth skeleton ready");
