
"use client";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/admin/users").then(r => r.json()).then(setUsers);
  }, []);
  return (
    <div dir="rtl" className="p-6">
      <h1 className="text-xl font-bold mb-4">المستخدمين</h1>
      {users.map((u:any) => (
        <div key={u.id} className="border p-2 mb-2">{u.email}</div>
      ))}
    </div>
  );
}
