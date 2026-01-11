"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, Search } from "lucide-react";
import toast from "react-hot-toast";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv-1",
      name: "متجر الإلكترونيات",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      lastMessage: "شكراً على شرائك من متجرنا",
      lastMessageTime: "2024-01-09 10:30",
      unread: 2,
      messages: [
        {
          id: "msg-1",
          senderId: "seller-1",
          senderName: "متجر الإلكترونيات",
          senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
          content: "هل المنتج وصلك بسلام؟",
          timestamp: "2024-01-09 10:00",
          isOwn: false,
        },
        {
          id: "msg-2",
          senderId: "user-1",
          senderName: "أنت",
          senderAvatar: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100",
          content: "نعم، المنتج ممتاز شكراً",
          timestamp: "2024-01-09 10:15",
          isOwn: true,
        },
        {
          id: "msg-3",
          senderId: "seller-1",
          senderName: "متجر الإلكترونيات",
          senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
          content: "شكراً على شرائك من متجرنا",
          timestamp: "2024-01-09 10:30",
          isOwn: false,
        },
      ],
    },
    {
      id: "conv-2",
      name: "أحمد محمد",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      lastMessage: "هل المنتج متوفر؟",
      lastMessageTime: "2024-01-08 14:20",
      unread: 0,
      messages: [],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0]
  );
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");

  const sendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "user-1",
      senderName: "أنت",
      senderAvatar: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100",
      content: messageText,
      timestamp: new Date().toLocaleTimeString("ar-SA"),
      isOwn: true,
    };

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
    });

    setMessageText("");
    toast.success("تم إرسال الرسالة");
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir="rtl">
      <div className="container mx-auto px-4 h-screen flex flex-col">
        {/* رأس الصفحة */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            الرسائل
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            تواصل مع البائعين والمشترين
          </p>
        </div>

        <div className="flex gap-6 flex-1 min-h-0">
          {/* قائمة المحادثات */}
          <div className="w-full md:w-80 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
            {/* البحث */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="ابحث عن محادثة..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* قائمة المحادثات */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-right ${
                    selectedConversation?.id === conv.id
                      ? "bg-blue-50 dark:bg-blue-900"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={conv.avatar}
                        alt={conv.name}
                        fill
                        className="object-cover"
                      />
                      {conv.unread > 0 && (
                        <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {conv.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {conv.lastMessage}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {conv.lastMessageTime}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* نافذة المحادثة */}
          {selectedConversation ? (
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
              {/* رأس المحادثة */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {selectedConversation.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    نشط الآن
                  </p>
                </div>
              </div>

              {/* الرسائل */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.isOwn
                          ? "bg-blue-600 text-white rounded-bl-none"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-br-none"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.isOwn ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* حقل الإدخال */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="اكتب رسالة..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">
                اختر محادثة لبدء الرسائل
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
