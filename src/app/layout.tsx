import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "سويق برو | Suwayq Pro",
  description: "المنصة الأقوى للبيع والشراء",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
