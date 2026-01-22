"use client";

import Link from "next/link";
import Image from "next/image";
import { destinations } from "../lib/data";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Destinations() {
    const [searchQuery, setSearchQuery] = useState("");
    const [maxPrice, setMaxPrice] = useState(100000);
    const [selectedDuration, setSelectedDuration] = useState("all");

    // Extract unique durations for filter
    const durations = ["all", ...Array.from(new Set(destinations.map(d => d.duration)))];

    const filteredDestinations = useMemo(() => {
        return destinations.filter(dest => {
            const priceValue = parseInt(dest.price.replace(/[^0-9]/g, ""));
            const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dest.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = priceValue <= maxPrice;
            const matchesDuration = selectedDuration === "all" || dest.duration === selectedDuration;

            return matchesSearch && matchesPrice && matchesDuration;
        });
    }, [searchQuery, maxPrice, selectedDuration]);

    return (
        <div className="max-w-7xl mx-auto px-8 py-32 min-h-screen">
            <div className="mb-12 text-center md:text-left">
                <h1 className="text-5xl font-bold text-white mb-4">India's Hidden Gems</h1>
                <p className="text-slate-400 max-w-2xl text-lg mb-8">
                    Discover your next adventure. Use the filters below to find the perfect trip for you.
                </p>

                {/* Filters Board */}
                <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col lg:flex-row gap-8 items-center justify-between">

                    {/* Search */}
                    <div className="relative w-full lg:w-1/3">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            type="text"
                            placeholder="Search places..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 w-full lg:w-auto items-center">
                        {/* Price Filter */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <label className="text-slate-300 text-sm whitespace-nowrap">Max Price: <span className="text-primary font-bold">₹{maxPrice.toLocaleString()}</span></label>
                            <input
                                type="range"
                                min="20000"
                                max="100000"
                                step="5000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                className="w-full md:w-32 accent-primary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Duration Filter */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <span className="text-slate-300 text-sm whitespace-nowrap">Duration:</span>
                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                                {durations.map(dur => (
                                    <button
                                        key={dur}
                                        onClick={() => setSelectedDuration(dur)}
                                        className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-all ${selectedDuration === dur
                                            ? "bg-primary border-primary text-white"
                                            : "bg-transparent border-white/20 text-slate-400 hover:border-white/50"
                                            }`}
                                    >
                                        {dur === "all" ? "All" : dur}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredDestinations.length > 0 ? (
                        filteredDestinations.map((dest) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={dest.id}
                            >
                                <Link href={`/tours/${dest.id}`} className="block relative h-[400px] rounded-2xl overflow-hidden bg-background-alt border border-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group">
                                    <div className="relative h-[240px] w-full overflow-hidden">
                                        <Image
                                            src={dest.image}
                                            alt={dest.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                                            {dest.rating} ★
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2 text-primary font-semibold text-sm uppercase tracking-wider">
                                            <span>{dest.duration}</span>
                                            <span className="text-lg text-white normal-case">{dest.price}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{dest.name}</h3>
                                        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{dest.description}</p>

                                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-primary text-sm font-bold gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            View Itinerary <span>&rarr;</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-white mb-2">No destinations found</h3>
                            <p className="text-slate-400">Try adjusting your filters or search query.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setMaxPrice(3000); setSelectedDuration("all"); }}
                                className="mt-6 text-primary hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
