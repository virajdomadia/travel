"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import Link from "next/link";
import { useState, useEffect } from "react";
import BookingModal from "@/components/BookingModal";
import BudgetCalculator from "@/components/BudgetCalculator";
import ReviewsSection from "@/components/ReviewsSection";
import TourItinerary from "@/components/TourItinerary";
import HeroGallery from "@/components/HeroGallery";
import InclusionsExclusions from "@/components/InclusionsExclusions";
import PoliciesSection from "@/components/PoliciesSection";
import PriceSummary from "@/components/PriceSummary";
import { usePersonalization } from "@/context/PersonalizationContext";
import { generateItineraryPDF } from "@/app/lib/utils/pdfGenerator";

export default function TourDetails() {
    const params = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBudgetCalcOpen, setIsBudgetCalcOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [tour, setTour] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { trackView } = usePersonalization();

    useEffect(() => {
        if (!params?.id) return;
        let isMounted = true;

        const fetchTour = async () => {
            try {
                const res = await fetch(`/api/destinations/${params.id}`);
                const data = await res.json();
                if (res.ok && isMounted) {
                    setTour(data);
                    trackView(data.category, data.id);
                } else if (isMounted) {
                    console.error("Tour not found");
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchTour();
        return () => { isMounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.id]);

    const handleDownloadPDF = async () => {
        if (!tour || !tour.itinerary) return;
        setIsDownloading(true);
        try {
            await generateItineraryPDF(
                tour.name,
                tour.duration || "N/A",
                tour.price || "N/A",
                tour.itinerary
            );
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

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
            <BudgetCalculator
                isOpen={isBudgetCalcOpen}
                onClose={() => setIsBudgetCalcOpen(false)}
                initialDestination={tour.name}
                initialDuration={parseInt(tour.duration?.split(" ")[0]) || 5}
            />

            {/* Hero Gallery */}
            <div className="max-w-7xl mx-auto px-8 py-8">
                {tour.gallery && tour.gallery.length > 0 ? (
                    <HeroGallery
                        images={tour.gallery}
                        title={tour.name}
                        location={tour.category}
                    />
                ) : (
                    <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                        <Image
                            src={tour.image}
                            alt={tour.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <h1 className="text-5xl font-bold text-white">{tour.name}</h1>
                        </div>
                    </div>
                )}
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
                    <ul className="text-slate-400 list-disc pl-6 space-y-2 mb-12 text-lg">
                        <li>5-star accommodation included</li>
                        <li>Daily breakfast and welcome dinner</li>
                        <li>Private transfer from airport</li>
                        <li>Expert local guide</li>
                        <li>Flexible itinerary</li>
                    </ul>

                    {/* Inclusions & Exclusions */}
                    {tour.inclusions && tour.exclusions && (
                        <div className="mb-12">
                            <InclusionsExclusions
                                inclusions={tour.inclusions}
                                exclusions={tour.exclusions}
                            />
                        </div>
                    )}

                    {/* Policies */}
                    {tour.policies && (
                        <div className="mb-12">
                            <PoliciesSection policies={tour.policies} />
                        </div>
                    )}


                    <Link href="/packages" className="text-primary hover:underline flex items-center gap-2 font-medium mb-12">
                        &larr; Back to Packages
                    </Link>


                    {/* Day-Wise Itinerary */}
                    {tour.itinerary && tour.itinerary.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 text-white">Day-Wise Itinerary</h2>
                            <TourItinerary itinerary={tour.itinerary} />
                        </div>
                    )}

                    {/* Reviews */}
                    <ReviewsSection destinationId={tour.id} />
                </div>

                {/* Sidebar - Price Summary */}
                <div className="relative">
                    <PriceSummary
                        price={tour.price}
                        duration={tour.duration}
                        rating={tour.rating}
                        inclusions={tour.inclusions || []}
                        onBookNow={() => setIsModalOpen(true)}
                        onDownloadPDF={handleDownloadPDF}
                    />
                </div>
            </div>
        </div>
    );
}
