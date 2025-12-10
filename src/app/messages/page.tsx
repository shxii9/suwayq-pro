import { Navbar } from "@/components/Navbar";
import { User, Send } from "lucide-react";

import Image from 'next/image';

import Image from 'next/image';

export default function Messages() {
  return (
    <div className="h-screen bg-gray-50 font-sans flex flex-col" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-l bg-gray-50 flex flex-col">
            <div className="p-4 border-b font-bold text-gray-700">المحادثات</div>
            <div className="flex-1 overflow-y-auto">
               <div className="p-4 bg-white border-b flex items-center gap-3 cursor-pointer border-r-4 border-r-blue-600">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><User size={20}/></div>
                  <div><h3 className="font-bold text-sm">أحمد محمد</h3><p className="text-xs text-gray-500">هل السعر نهائي؟</p></div>
               </div>
            </div>
          </div>
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
             <div className="p-4 border-b flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white"><User size={16}/></div>
                <span className="font-bold">أحمد محمد</span>
             </div>
             <div className="flex-1 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5 p-6 space-y-4">
                <div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tr-none shadow-sm border max-w-sm">مرحباً، هل السلعة متوفرة؟</div></div>
                <div className="flex justify-end"><div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tl-none shadow-md max-w-sm">نعم متوفرة، تفضل.</div></div>
             </div>
             <div className="p-4 bg-white border-t flex gap-2">
               <input type="text" placeholder="اكتب رسالة..." className="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none" />
               <button className="bg-blue-600 text-white p-2 rounded-xl"><Send size={20}/></button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}


