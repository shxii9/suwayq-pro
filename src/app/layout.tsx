import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | سُوَيق PRO",
    default: "سُوَيق PRO | منصة الإعلانات الأولى في الكويت",
  },
  description: "بيع واشترِ سيارات، عقارات، وإلكترونيات في الكويت بسهولة وأمان عبر منصة سويق برو.",
  keywords: ["سوق الكويت", "حراج", "سيارات للبيع", "عقارات الكويت", "سويق برو"],
  openGraph: {
    title: "سُوَيق PRO",
    description: "أفضل منصة للبيع والشراء في الكويت.",
    url: "https://suwayq-pro.vercel.app",
    siteName: "سُوَيق PRO",
    locale: "ar_KW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
