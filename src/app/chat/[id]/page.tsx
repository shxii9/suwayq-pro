
"use client";
import { useState, useEffect } from "react";

export default function Chat({ params }) {
  const storageKey = "chat-" + params.id;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  function send() {
    if (!text.trim()) return;

    const updated = [...messages, { text, from: "me", time: new Date().toLocaleTimeString() }];
    setMessages(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setText("");
  }

  return (
    <div className="p-6 max-w-xl mx-auto" dir="rtl">
      <h1 className="text-xl font-black mb-4">محادثة الإعلان #{params.id}</h1>

      <div className="border rounded-xl p-4 h-80 overflow-y-auto bg-gray-50 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.from === "me" ? "text-right" : ""}`}>
            <div className="inline-block bg-white px-3 py-2 rounded shadow">
              <p>{m.text}</p>
              <span className="text-xs text-gray-400">{m.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="اكتب رسالتك..."
        />
        <button
          onClick={send}
          className="bg-black text-white px-4 rounded"
        >
          إرسال
        </button>
      </div>
    </div>
  );
}
