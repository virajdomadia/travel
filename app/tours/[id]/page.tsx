"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import Link from "next/link";
import { useState, useEffect } from "react";
import BookingModal from "@/components/BookingModal";
import ReviewsSection from "@/components/ReviewsSection";
import { usePersonalization } from "@/context/PersonalizationContext";

export default function TourDetails() {
    const params = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tour, setTour] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { trackView } = usePersonalization();

    useEffect(() => {
        if (!params?.id) return;

        const fetchTour = async () => {
            try {
                const res = await fetch(`/api/destinations/${params.id}`);
                const data = await res.json();
                if (res.ok) {
                    setTour(data);
                    trackView(data.category, data.id);
                } else {
                    console.error("Tour not found");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, [params?.id, trackView]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    if (!tour) {
        return <div className="min-h-screen flex items-center justify-center text-white">Tour not found</div>;
    }

    return (
        <div className="min-h-screen">
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tourName={tour.name}
                basePrice={tour.price}
            />

            {/* Hero Image */}
            <div className="relative h-[60vh] min-h-[400px] w-full">
                <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 flex items-end pb-16 px-8">
                    <div className="max-w-7xl mx-auto w-full">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">{tour.name}</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8 md:py-12 pb-24 grid grid-cols-1 md:grid-cols-3 gap-16">
                {/* Main Content */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
                    <p className="text-slate-400 leading-relaxed mb-8 text-lg">{tour.description}</p>
                    <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                        Experience the ultimate vacation with our curated package to {tour.name}.
                        This {tour.duration} trip includes premium accommodations, guided tours of key landmarks,
                        and exclusive local experiences designed to immerse you in the culture and beauty of the region.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 text-white">Highlights</h2>
                    <ul className="text-slate-400 list-disc pl-6 space-y-2 mb-8 text-lg">
                        <li>5-star accommodation included</li>
                        <li>Daily breakfast and welcome dinner</li>
                        <li>Private transfer from airport</li>
                        <li>Expert local guide</li>
                        <li>Flexible itinerary</li>
                    </ul>

                    <Link href="/destinations" className="text-primary hover:underline flex items-center gap-2 font-medium">
                        &larr; Back to Destinations
                    </Link>

                    {/* Reviews */}
                    <ReviewsSection destinationId={tour.id} />
                </div>

                {/* Sidebar Booking Card */}
                <div className="relative">
                    <div className="sticky top-24 bg-background-alt/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                        <span className="text-4xl font-bold text-primary block mb-2">{tour.price}</span>
                        <span className="text-slate-400 text-sm block mb-6">per person</span>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between border-b border-white/10 pb-4 text-white/90">
                                <span>Duration</span>
                                <span>{tour.duration}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-4 text-white/90">
                                <span>Rating</span>
                                <span>{tour.rating} / 5.0</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-4 text-white/90">
                                <span>Group Size</span>
                                <span>Max 12</span>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary w-full mb-4"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Book This Trip
                        </button>
                        <button className="btn btn-outline w-full text-center justify-center">
                            Download Itinerary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
