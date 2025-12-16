# System-2-Realtime-Chat.ps1
# بناء نظام المحادثات والرسائل

$ErrorActionPreference = "Stop"
Write-Host "💬 بناء نظام المحادثات الفوري..." -ForegroundColor Cyan

$ChatDir = "src\app\messages"
if (-not (Test-Path $ChatDir)) { New-Item -ItemType Directory -Force -Path $ChatDir | Out-Null }

$ChatContent = @'
import { Navbar } from "@/components/Navbar";
import { Search, Send, MoreVertical, Phone, Image as ImageIcon, Paperclip } from "lucide-react";

export default function Messages() {
  const chats = [
    { id: 1, name: "عبدالله العتيبي", msg: "هل السعر قابل للمساومة؟", time: "10:30 ص", unread: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah" },
    { id: 2, name: "Sarah Smith", msg: "Where is the location exactly?", time: "أمس", unread: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { id: 3, name: "محمد الكندري", msg: "تم التحويل، شكراً لك", time: "أمس", unread: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden" dir="rtl">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-4 md:py-8 h-[calc(100vh-64px)]">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex overflow-hidden">
          
          {/* Chat List (Sidebar) */}
          <div className="w-full md:w-80 lg:w-96 border-l border-gray-100 flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-black mb-4">الرسائل</h2>
              <div className="relative">
                <Search size={18} className="absolute top-3 right-3 text-gray-400" />
                <input type="text" placeholder="بحث في المحادثات..." className="w-full bg-gray-50 border-none rounded-xl py-2.5 pr-10 text-sm focus:ring-0" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div key={chat.id} className={`p-4 flex gap-3 hover:bg-gray-50 cursor-pointer transition border-b border-gray-50 ${chat.id === 1 ? "bg-blue-50/50" : ""}`}>
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate flex justify-between">
                      {chat.msg}
                      {chat.unread > 0 && <span className="bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{chat.unread}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Chat Window */}
          <div className="hidden md:flex flex-1 flex-col bg-gray-50/30">
            {/* Header */}
            <div className="p-4 bg-white border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={chats[0].avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-bold text-gray-900">عبدالله العتيبي</h3>
                  <span className="flex items-center gap-1 text-xs text-green-500 font-medium"><span className="w-2 h-2 bg-green-500 rounded-full"></span> متصل الآن</span>
                </div>
              </div>
              <div className="flex gap-2 text-gray-500">
                <button className="p-2 hover:bg-gray-100 rounded-full"><Phone size={20} /></button>
                <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical size={20} /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-center"><span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">اليوم</span></div>
              
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 text-gray-800 p-4 rounded-2xl rounded-tr-none max-w-md shadow-sm">
                  مرحباً، هل جهاز الايفون لا يزال متوفراً؟
                  <span className="text-[10px] text-gray-400 block mt-2 text-left">10:28 ص</span>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tl-none max-w-md shadow-md">
                  أهلاً بك، نعم موجود.
                  <span className="text-[10px] text-blue-200 block mt-2 text-right">10:29 ص</span>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 text-gray-800 p-4 rounded-2xl rounded-tr-none max-w-md shadow-sm">
                  هل السعر قابل للمساومة؟
                  <span className="text-[10px] text-gray-400 block mt-2 text-left">10:30 ص</span>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                <button className="p-2 text-gray-400 hover:text-gray-600"><Paperclip size={20} /></button>
                <button className="p-2 text-gray-400 hover:text-gray-600"><ImageIcon size={20} /></button>
                <input type="text" placeholder="اكتب رسالتك..." className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 px-2" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition shadow-md">
                  <Send size={18} className="rtl:-rotate-90" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("$ChatDir\page.tsx", $ChatContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ تم بناء نظام المحادثات بنجاح!" -ForegroundColor Green