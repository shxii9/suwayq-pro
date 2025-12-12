'use client';

// src/app/admin/users/page.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // يجب إضافة مكتبة واجهة المستخدم
import { Users, Trash2, ShieldOff } from "lucide-react";

import Image from 'next/image';


export default function AdminUsers() {
    const users = [
        { id: 1, name: "فهد العلي", email: "fahad@ali.com", status: "Active" },
        { id: 2, name: "سارة خالد", email: "sara@khaled.net", status: "Banned" },
    ];
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2"><Users /> إدارة المستخدمين</h2>
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <table className="w-full text-sm text-right">
                    <thead className="text-slate-400 bg-slate-800/50">
                        <tr>
                            <th className="p-4">الاسم</th>
                            <th className="p-4">البريد</th>
                            <th className="p-4">الحالة</th>
                            <th className="p-4">إجراء</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-slate-300">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-700/50 transition">
                                <td className="p-4 font-bold">{user.name}</td>
                                <td className="p-4 text-slate-500">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{user.status}</span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button className="text-red-500 hover:text-red-300 p-1 rounded"><Trash2 size={16}/></button>
                                    {user.status === 'Active' && <button className="text-orange-500 hover:text-orange-300 p-1 rounded"><ShieldOff size={16}/></button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



