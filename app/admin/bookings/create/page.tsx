"use client";

import BookingForm from "@/components/admin/BookingForm";

export default function CreateBookingPage() {
    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create Manual Booking</h1>
                    <p className="text-slate-400">Manually record a booking for a customer.</p>
                </div>
                <BookingForm />
            </div>
        </main>
    );
}
