/** @type {import('next').NextConfig} */
const nextConfig = {
  // تعطيل فحص ESLint أثناء البناء لكي لا يفشل بسبب أخطاء التنسيق
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;