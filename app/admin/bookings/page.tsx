"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/bookings?admin=true');
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setBookings(bookings.filter(b => b._id !== id));
            }
        } catch (error) {
            alert("Failed to delete");
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-900 text-white p-8">Loading...</div>;

    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Manage Bookings</h1>
                    <Link href="/admin/bookings/create" className="btn bg-primary text-white hover:bg-sky-600 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg font-bold">
                        <Plus size={16} /> New Booking
                    </Link>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="border-b border-white/10 text-xs uppercase bg-white/5">
                                <tr>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Package</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Travelers</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white">{booking.fullName}</div>
                                            <div className="text-xs">{booking.email}</div>
                                            <div className="text-xs">{booking.phone}</div>
                                        </td>
                                        <td className="p-4 text-white">{booking.tourName}</td>
                                        <td className="p-4">{new Date(booking.date).toLocaleDateString()}</td>
                                        <td className="p-4 text-emerald-400 font-bold">₹{booking.totalAmount?.toLocaleString()}</td>
                                        <td className="p-4">{booking.travelers}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                                                    booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                                                        'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link href={`/admin/bookings/edit/${booking._id}`} className="text-blue-400 hover:text-blue-300 mr-4 font-bold">Edit</Link>
                                            <button onClick={() => handleDelete(booking._id)} className="text-red-400 hover:text-red-300 font-bold">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8">No bookings found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
