
"use client";

import AIPlanner from "@/components/AIPlanner";
import BookingModal from "@/components/BookingModal";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import BackgroundGradient from "@/components/BackgroundGradient";
import { useState } from "react";

export default function PlannerPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        tourName: "",
        price: "",
        date: ""
    });

    const handleBook = (details: { tourName: string; price: string }) => {
        setBookingDetails({
            tourName: details.tourName,
            price: details.price,
            date: new Date().toISOString().split('T')[0] // Default to today or let user pick
        });
        setIsBookingOpen(true);
    };

    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-12 px-4 md:px-8 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
            <BackgroundGradient />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                tourName={bookingDetails.tourName}
                basePrice={bookingDetails.price}
                initialDate={bookingDetails.date}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold tracking-widest uppercase text-[10px] mb-6 animate-pulse">
                            Beta / Neural Engine 2.0
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            <TextReveal>AI Travel Architect</TextReveal>
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
                            Design your perfect bespoke itinerary in seconds. <br className="hidden md:block" />
                            Our AI analyzes millions of data points to craft a journey uniquely yours.
                        </p>
                    </div>

                    <div className="transform hover:scale-[1.01] transition-transform duration-700 ease-out">
                        <AIPlanner onBook={handleBook} />
                    </div>
                </ScrollReveal>
            </div>
        </main>
    );
}
