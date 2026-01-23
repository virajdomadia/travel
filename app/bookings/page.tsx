"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { generateItineraryPDF } from "@/utils/pdfGenerator";

export default function BookingsPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Check auth
                const authRes = await fetch('/api/auth/me');
                const authData = await authRes.json();

                if (!authData.user) {
                    router.push("/login"); // Force login if no session
                    return;
                }

                setUser(authData.user);

                // Fetch bookings
                // Uses API with no args - API should infer user from cookie
                const bookingsRes = await fetch(`/api/bookings?username=${authData.user.username}`);
                const bookingsData = await bookingsRes.json();

                if (Array.isArray(bookingsData)) {
                    setBookings(bookingsData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [router]);

    if (!user) return null; // Redirecting...

    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">My Journeys</h1>
                        <p className="text-slate-400">Manage your upcoming and past expeditions.</p>
                    </div>
                    <Link
                        href="/"
                        className="text-primary hover:text-white transition-colors font-medium flex items-center gap-2"
                    >
                        ← Plan New Trip
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500 animate-pulse">
                        Loading your itinerary...
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <div className="text-6xl mb-4">🌍</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Bookings Yet</h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            You haven't booked any trips yet. Start your next adventure today.
                        </p>
                        <Link href="/" className="btn btn-primary">
                            Explore Destinations
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-slate-800 transition-colors group"
                            >
                                {/* Thumbnail */}
                                <div className="w-full md:w-32 h-32 bg-slate-700 rounded-xl overflow-hidden relative shrink-0">
                                    <Image
                                        src={booking.tourName.includes("Swiss") ? "/swiss-alps.png" : (booking.tourName.includes("Kyoto") ? "/kyoto.png" : "/santorini.png")}
                                        alt={booking.tourName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white">{booking.tourName}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                                            booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                                                'bg-amber-500/20 text-amber-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-400">
                                        <div>
                                            <span className="block text-slate-500 text-xs uppercase mb-1">Date</span>
                                            {new Date(booking.date).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <span className="block text-slate-500 text-xs uppercase mb-1">Travelers</span>
                                            {booking.travelers} Adults
                                        </div>
                                        <div>
                                            <span className="block text-slate-500 text-xs uppercase mb-1">Total</span>
                                            ₹{(booking.totalAmount || 0).toLocaleString()}
                                        </div>
                                        <div>
                                            <span className="block text-slate-500 text-xs uppercase mb-1">Booking ID</span>
                                            <span className="font-mono text-xs">{booking._id?.slice(-6)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
                                    <button
                                        onClick={() => generateItineraryPDF(booking)}
                                        className="btn bg-white/5 hover:bg-white/10 text-white border border-white/10 w-full whitespace-nowrap"
                                    >
                                        Download PDF
                                    </button>
                                    {booking.status !== 'cancelled' && (
                                        <button
                                            onClick={() => alert("Cancellation request sent! Support will contact you shortly.")}
                                            className="btn bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 w-full whitespace-nowrap"
                                        >
                                            Cancel Trip
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
