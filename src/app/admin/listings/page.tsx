// src/app/admin/listings/page.tsx
import { ShoppingBag, CheckCircle, Clock, Trash2 } from "lucide-react";

// تم استخدام مكونات وهمية (UI) لضمان العمل
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; 

import Image from 'next/image';


export default function AdminListings() {
    const listings = [
        { id: 1, title: "iPhone 15 Pro Max", user: "فهد العلي", price: "400 د.ك", status: "Pending" },
        { id: 2, title: "مرسيدس G-Class", user: "سارة خالد", price: "45,000 د.ك", status: "Active" },
        { id: 3, title: "شقة للإيجار", user: "أحمد منصور", price: "350 د.ك", status: "Rejected" },
    ];
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <ShoppingBag /> إدارة الإعلانات
            </h2>
            
            {/* الفلاتر */}
            <div className="flex gap-4 mb-6 text-sm">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">الكل (120)</button>
                <button className="bg-slate-700 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-600">بانتظار (15)</button>
                <button className="bg-slate-700 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-600">منتهية (30)</button>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <table className="w-full text-sm text-right">
                    <thead className="text-slate-400 bg-slate-800/50">
                        <tr>
                            <th className="p-4">العنوان</th>
                            <th className="p-4">المعلن</th>
                            <th className="p-4">السعر</th>
                            <th className="p-4">الحالة</th>
                            <th className="p-4">إجراء</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-slate-300">
                        {listings.map(item => (
                            <tr key={item.id} className="hover:bg-slate-700/50 transition">
                                <td className="p-4 font-bold">{item.title}</td>
                                <td className="p-4 text-slate-500">{item.user}</td>
                                <td className="p-4 font-bold text-blue-400">{item.price}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Active' ? 'bg-green-500/20 text-green-400' : item.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{item.status}</span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    {item.status === 'Pending' && <button className="text-green-500 hover:text-green-300 p-1 rounded"><CheckCircle size={16}/></button>}
                                    <button className="text-red-500 hover:text-red-300 p-1 rounded"><Trash2 size={16}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



