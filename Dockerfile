# Dockerfile: ملف تهيئة للنشر السحابي (Docker)

# المرحلة الأولى: بناء التطبيق
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# المرحلة الثانية: التشغيل النهائي
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# نسخ ملفات التشغيل الأساسية فقط
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# تهيئة المنفذ
EXPOSE 3000

# أمر التشغيل (Start)
CMD ["npm", "start"]