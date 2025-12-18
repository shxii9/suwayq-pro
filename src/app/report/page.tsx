
"use client";
import { useState } from "react";
import { report } from "@/lib/user-store";

export default function ReportPage() {
  const [reason, setReason] = useState("");

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-xl font-black mb-4">إبلاغ عن إعلان</h1>

      <textarea
        className="border w-full p-2 rounded mb-3"
        placeholder="سبب البلاغ"
        value={reason}
        onChange={e => setReason(e.target.value)}
      />

      <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => {
          report("1", reason);
          alert("تم إرسال البلاغ");
        }}
      >
        إرسال
      </button>
    </div>
  );
}
