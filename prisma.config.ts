// prisma.config.ts
import { defineConfig } from "prisma"; // 💡 تم التعديل من @prisma/cli إلى prisma

export default defineConfig({
  config: {
    datasources: {
      db: {
        provider: "postgresql",
        url: {
          env: "DATABASE_URL"
        }
      }
    }
  }
});