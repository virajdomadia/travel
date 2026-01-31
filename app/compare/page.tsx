"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Plus } from "lucide-react";

interface Destination {
    id: string;
    name: string;
    price: string;
    rating: number;
    duration: string;
    image: string;
    category: string;
    hotelType: string;
    stops: string;
    description: string;
    amenities: string[];
}

export default function ComparePage() {
    const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/destinations')
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setAllDestinations(data);
                    // Pre-select first 3 for demo if available
                    if (data.length >= 2) {
                        setSelectedIds([data[0].id, data[1].id]);
                    }
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    const toggleSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(i => i !== id));
        } else {
            if (selectedIds.length >= 3) {
                alert("You can compare up to 3 destinations at a time.");
                return;
            }
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const selectedDestinations = allDestinations.filter(d => selectedIds.includes(d.id));

    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Compare Experiences</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Not sure where to go next? Compare details side-by-side to make the perfect choice for your journey.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20 text-white">Loading...</div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* 1. Selection Sidebar */}
                        <div className="w-full lg:w-1/4 shrink-0">
                            <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 sticky top-24">
                                <h3 className="text-white font-bold text-lg mb-4">Select to Compare</h3>
                                <p className="text-xs text-slate-500 mb-4">{selectedIds.length} / 3 selected</p>

                                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                    {allDestinations.map(dest => (
                                        <div
                                            key={dest.id}
                                            onClick={() => toggleSelection(dest.id)}
                                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedIds.includes(dest.id)
                                                ? "bg-primary/20 border-primary shadow-lg shadow-primary/10"
                                                : "bg-white/5 border-white/5 hover:bg-white/10"
                                                }`}
                                        >
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                                <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                                                {selectedIds.includes(dest.id) && (
                                                    <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
                                                        <Check size={20} className="text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-medium text-sm truncate">{dest.name}</h4>
                                                <p className="text-xs text-slate-400">{dest.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 2. Comparison Table */}
                        <div className="flex-1 overflow-x-auto pb-4">
                            {selectedIds.length === 0 ? (
                                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/5 rounded-3xl border border-white/10 border-dashed text-slate-500">
                                    <Plus size={48} className="mb-4 opacity-50" />
                                    <p className="text-lg font-medium">Select destinations to compare</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <AnimatePresence>
                                        {selectedDestinations.map((dest, i) => (
                                            <motion.div
                                                key={dest.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-slate-800 border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors duration-300"
                                            >
                                                {/* Card Header */}
                                                <div className="relative h-48 group">
                                                    <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                                                    <button
                                                        onClick={() => toggleSelection(dest.id)}
                                                        className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <div className="text-amber-400 text-sm font-bold mb-1 flex items-center gap-1">
                                                            ★ {dest.rating}
                                                        </div>
                                                        <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                                                    </div>
                                                </div>

                                                {/* Comparison Metrics */}
                                                <div className="p-6 flex-1 space-y-6">
                                                    {/* Price */}
                                                    <div>
                                                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Price</p>
                                                        <p className="text-2xl font-bold text-primary">{dest.price}</p>
                                                    </div>

                                                    {/* Duration & Category */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Duration</p>
                                                            <p className="text-white font-medium">{dest.duration}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Type</p>
                                                            <p className="text-white font-medium">{dest.category}</p>
                                                        </div>
                                                    </div>

                                                    {/* Hotel & Amenities */}
                                                    <div className="space-y-3 pt-4 border-t border-white/5">
                                                        <div className="flex justify-between items-center text-sm">
                                                            <span className="text-slate-400">Accomodation</span>
                                                            <span className="text-white font-semibold">{dest.hotelType}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-sm">
                                                            <span className="text-slate-400">Travel</span>
                                                            <span className="text-white font-semibold">{dest.stops}</span>
                                                        </div>
                                                    </div>

                                                    {/* Amenities Badges */}
                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                        {dest.amenities?.map((am, idx) => (
                                                            <span key={idx} className="bg-white/5 text-slate-300 text-xs px-2 py-1 rounded-md border border-white/5">
                                                                {am}
                                                            </span>
                                                        ))}
                                                        {(!dest.amenities || dest.amenities.length === 0) && (
                                                            <>
                                                                <span className="bg-white/5 text-slate-300 text-xs px-2 py-1 rounded-md border border-white/5">WiFi</span>
                                                                <span className="bg-white/5 text-slate-300 text-xs px-2 py-1 rounded-md border border-white/5">Breakfast</span>
                                                                <span className="bg-white/5 text-slate-300 text-xs px-2 py-1 rounded-md border border-white/5">Guide</span>
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="pt-6 mt-auto">
                                                        <Link
                                                            href={`/packages/${dest.id}`}
                                                            className="btn w-full bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/10 hover:border-white transition-all py-3 flex items-center justify-center gap-2 group"
                                                        >
                                                            View Details
                                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

// Helper for Framer Motion AnimatePresence
import { AnimatePresence } from "framer-motion";
