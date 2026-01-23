"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePersonalization } from "@/context/PersonalizationContext";

interface Destination {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
    rating: number;
}

export default function RecommendedTours() {
    const { lastCategory, recentlyViewed } = usePersonalization();
    const [recommendations, setRecommendations] = useState<Destination[]>([]);
    const [recentTours, setRecentTours] = useState<Destination[]>([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await fetch('/api/destinations');
                const data: Destination[] = await res.json();

                // 1. Get Recently Viewed Details
                if (recentlyViewed.length > 0) {
                    const recent = data.filter(d => recentlyViewed.includes(d.id));
                    setRecentTours(recent);
                }

                // 2. Get Recommendations based on Category, excluding recently viewed
                if (lastCategory) {
                    const recommended = data.filter(d =>
                        d.category === lastCategory && !recentlyViewed.includes(d.id)
                    ).slice(0, 3);
                    setRecommendations(recommended);
                } else {
                    // Fallback to highest rated if no history
                    const topRated = data.sort((a, b) => b.rating - a.rating).slice(0, 3);
                    setRecommendations(topRated);
                }

            } catch (err) {
                console.error(err);
            }
        };

        fetchDestinations();
    }, [lastCategory, recentlyViewed]);

    if (recommendations.length === 0 && recentTours.length === 0) return null;

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-8">

                {/* Recently Viewed */}
                {recentTours.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6">Pick up where you left off</h2>
                        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10">
                            {recentTours.map(tour => (
                                <Link
                                    href={`/tours/${tour.id}`}
                                    key={tour.id}
                                    className="min-w-[280px] bg-slate-800 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all group"
                                >
                                    <div className="relative h-40">
                                        <Image src={tour.image} alt={tour.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-white text-lg">{tour.name}</h3>
                                        <p className="text-primary text-sm font-semibold mt-1">{tour.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Recommended for You</h2>
                    <p className="text-slate-400 mb-8">Based on your interests in {lastCategory || "popular destinations"}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {recommendations.map(tour => (
                            <Link
                                href={`/tours/${tour.id}`}
                                key={tour.id}
                                className="group relative block h-[300px] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={tour.image}
                                    alt={tour.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded mb-2 inline-block">
                                        {tour.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1">{tour.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-300 text-sm">7 Days</span>
                                        <span className="text-primary font-bold">{tour.price}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
