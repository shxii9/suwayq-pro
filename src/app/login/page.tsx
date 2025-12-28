"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const r = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">البريد الإلكتروني</label>
              <Input id="email" type="email" placeholder="example@domain.com" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">كلمة المرور</label>
              <Input id="password" type="password" required />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                document.cookie = "session=1";
                r.push("/dashboard");
              }}
            >
              دخول
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
