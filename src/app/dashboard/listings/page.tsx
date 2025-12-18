
"use client";
import { useEffect, useState } from "react";

export default function Listings() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");

  const load = () =>
    fetch("/api/listings").then(r=>r.json()).then(setList);

  useEffect(load, []);

  const add = async () => {
    await fetch("/api/listings", {
      method:"POST",
      body: JSON.stringify({ title }),
    });
    setTitle("");
    load();
  };

  return (
    <div dir="rtl" className="p-6">
      <h1 className="font-bold mb-3">إعلاناتي</h1>
      <input value={title} onChange={e=>setTitle(e.target.value)}
        className="border p-2"/>
      <button onClick={add} className="bg-black text-white p-2 mr-2">إضافة</button>
      {list.map((l:any)=>(
        <div key={l.id} className="border p-2 mt-2">{l.title}</div>
      ))}
    </div>
  );
}
