"use client";

import BookingForm from "@/components/admin/BookingForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditBookingPage() {
    const params = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await fetch(`/api/bookings/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBooking(data);
                }
            } catch (err) {
                console.error("Failed to load booking", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [params.id]);

    if (loading) return <div className="min-h-screen bg-slate-900 text-white p-8">Loading...</div>;
    if (!booking) return <div className="min-h-screen bg-slate-900 text-white p-8">Booking not found</div>;

    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Booking</h1>
                    <p className="text-slate-400 text-sm">ID: {params.id}</p>
                </div>
                <BookingForm initialData={booking} isEdit />
            </div>
        </main>
    );
}
