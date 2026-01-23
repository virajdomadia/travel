"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Check, X, Trash2, Calendar, User, Mail, Phone, MapPin } from 'lucide-react';

interface Booking {
    _id: string;
    tourName: string;
    fullName: string;
    email: string;
    phone: string;
    travelers: number;
    date: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    basePrice: string;
    createdAt: string;
}

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings');
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setBookings(prev => prev.map(b =>
                    b._id === id ? { ...b, status: newStatus as any } : b
                ));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;

        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setBookings(prev => prev.filter(b => b._id !== id));
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    if (loading) return <div className="text-white text-center mt-20">Loading bookings...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
                Booking Management
            </h2>

            <div className="space-y-4">
                {bookings.length === 0 ? (
                    <div className="text-gray-400 text-center py-10">No bookings found.</div>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking._id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                                <div className="space-y-2 flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            {booking.tourName}
                                            <span className={`text-xs px-2 py-1 rounded-full border ${booking.status === 'confirmed' ? 'border-green-500 text-green-500 bg-green-500/10' :
                                                    booking.status === 'cancelled' ? 'border-red-500 text-red-500 bg-red-500/10' :
                                                        'border-yellow-500 text-yellow-500 bg-yellow-500/10'
                                                }`}>
                                                {booking.status.toUpperCase()}
                                            </span>
                                        </h3>
                                        <span className="text-sm text-gray-400">
                                            {format(new Date(booking.createdAt), 'MMM d, yyyy HH:mm')}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <User size={16} className="text-blue-400" />
                                            {booking.fullName} ({booking.travelers} ppl)
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-blue-400" />
                                            Travel Date: {format(new Date(booking.date), 'MMM d, yyyy')}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} className="text-blue-400" />
                                            {booking.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} className="text-blue-400" />
                                            {booking.phone}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                                    {booking.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(booking._id, 'confirmed')}
                                                className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors tooltip"
                                                title="Confirm"
                                            >
                                                <Check size={20} />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(booking._id, 'cancelled')}
                                                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                                                title="Cancel"
                                            >
                                                <X size={20} />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        className="p-2 text-gray-500 hover:text-red-400 transition-colors ml-2"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
