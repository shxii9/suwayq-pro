"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Send, Image as ImageIcon, Smile, MoreVertical, CheckCheck, MapPin } from "lucide-react";

const contacts = [
  { id: 1, name: "يوسف المنصور", lastMsg: "كم سعرك النهائي للصورة؟", time: "10:30 م", active: true, online: true, avatar: "Y" },
  { id: 2, name: "سارة العلي", lastMsg: "هل العقار مازال متوفر؟", time: "أمس", active: false, online: false, avatar: "S" },
];

export default function ChatPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="h-screen bg-[#F8FAFC] dark:bg-[#020617] flex flex-col" dir="rtl">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-6 flex gap-6 overflow-hidden">
        
        {/* Contacts Sidebar */}
        <aside className="w-full md:w-96 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-50 dark:border-gray-800">
            <h2 className="text-2xl font-black dark:text-white">الرسائل</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {contacts.map((c) => (
              <div key={c.id} className={`p-4 rounded-3xl flex items-center gap-4 cursor-pointer transition-all ${c.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${c.active ? 'bg-white/20' : 'bg-blue-100 text-blue-600'}`}>
                    {c.avatar}
                  </div>
                  {c.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white dark:border-gray-900 rounded-full"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-sm">{c.name}</span>
                    <span className={`text-[10px] ${c.active ? 'text-blue-100' : 'text-gray-400'}`}>{c.time}</span>
                  </div>
                  <p className={`text-xs font-medium truncate ${c.active ? 'text-blue-50' : 'text-gray-500'}`}>{c.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <section className="hidden md:flex flex-1 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl flex-col overflow-hidden relative">
          
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black">Y</div>
              <div>
                <h3 className="font-black dark:text-white">يوسف المنصور</h3>
                <span className="text-xs text-green-500 font-bold italic">متصل الآن</span>
              </div>
            </div>
            <button className="p-2 text-gray-400"><MoreVertical /></button>
          </div>

          {/* Product Reference Card */}
          <div className="mx-6 mt-4 p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-4">
             <div className="w-16 h-16 rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=200" className="object-cover h-full w-full" />
             </div>
             <div className="flex-1">
                <h4 className="text-sm font-black dark:text-white">تويوتا لاندكروزر 2024</h4>
                <p className="text-blue-600 font-black text-sm">32,000 د.ك</p>
             </div>
          </div>

          {/* Messages Space */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="flex justify-start">
               <div className="bg-slate-100 dark:bg-gray-800 p-5 rounded-t-[1.5rem] rounded-bl-[1.5rem] max-w-[70%]">
                  <p className="text-sm font-bold text-slate-700 dark:text-gray-300">السلام عليكم، هل السيارة متوفرة للمعاينة غداً؟</p>
                  <span className="text-[10px] text-gray-400 mt-2 block">10:00 م</span>
               </div>
            </div>
            <div className="flex justify-end">
               <div className="bg-blue-600 p-5 rounded-t-[1.5rem] rounded-br-[1.5rem] max-w-[70%] text-white shadow-lg shadow-blue-500/20">
                  <p className="text-sm font-bold">وعليكم السلام، نعم متوفرة في معرضنا بالشويخ.</p>
                  <div className="flex items-center justify-end gap-1 mt-2">
                    <span className="text-[10px] text-blue-100">10:05 م</span>
                    <CheckCheck size={12} className="text-blue-100" />
                  </div>
               </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-gray-50 dark:bg-gray-900/50">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-3xl flex items-center gap-2 shadow-sm border border-gray-100 dark:border-gray-700">
               <button className="p-3 text-gray-400 hover:text-blue-600"><Smile size={24} /></button>
               <button className="p-3 text-gray-400 hover:text-blue-600"><ImageIcon size={24} /></button>
               <input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text" 
                  placeholder="اكتب رسالتك هنا..." 
                  className="flex-1 bg-transparent outline-none font-bold text-sm px-2 dark:text-white"
               />
               <button className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all">
                  <Send size={20} className="rotate-180" />
               </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
