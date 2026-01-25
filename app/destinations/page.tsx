"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileFilterModal from "@/components/MobileFilterModal";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { Filter } from "lucide-react";

export default function Destinations() {
    const [destinations, setDestinations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [maxPrice, setMaxPrice] = useState(150000);
    const [selectedDuration, setSelectedDuration] = useState("all");
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedStops, setSelectedStops] = useState<string[]>([]);

    // Mobile Modal State
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Available Options (Derived from Data)
    const [availableAmenities, setAvailableAmenities] = useState<string[]>([]);
    const [availableHotelTypes, setAvailableHotelTypes] = useState<string[]>([]);
    const [availableStops, setAvailableStops] = useState<string[]>([]);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetch('/api/destinations', { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setDestinations(data);

                    const allAmenities = new Set<string>();
                    const allTypes = new Set<string>();
                    const allStops = new Set<string>();

                    data.forEach((d: any) => {
                        d.amenities?.forEach((a: string) => allAmenities.add(a));
                        if (d.hotelType) allTypes.add(d.hotelType);
                        if (d.stops) allStops.add(d.stops);
                    });

                    setAvailableAmenities(Array.from(allAmenities));
                    setAvailableHotelTypes(Array.from(allTypes));
                    setAvailableStops(Array.from(allStops));
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error(err);
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // Extract unique durations for filter
    const durations = ["all", ...Array.from(new Set(destinations.map(d => d.duration)))];

    const filteredDestinations = useMemo(() => {
        return destinations.filter(dest => {
            const priceValue = parseInt(dest.price.replace(/[^0-9]/g, ""));

            // Text Search
            const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dest.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Price & Duration
            const matchesPrice = priceValue <= maxPrice;
            const matchesDuration = selectedDuration === "all" || dest.duration === selectedDuration;

            // Advanced Filters
            const matchesAmenities = selectedAmenities.length === 0 ||
                selectedAmenities.every(a => dest.amenities?.includes(a));

            const matchesHotelType = selectedHotelTypes.length === 0 ||
                selectedHotelTypes.includes(dest.hotelType);

            const matchesStops = selectedStops.length === 0 ||
                selectedStops.includes(dest.stops);

            return matchesSearch && matchesPrice && matchesDuration &&
                matchesAmenities && matchesHotelType && matchesStops;
        });
    }, [searchQuery, maxPrice, selectedDuration, selectedAmenities, selectedHotelTypes, selectedStops, destinations]);

    const toggleFilter = (item: string, current: string[], setFn: (val: string[]) => void) => {
        if (current.includes(item)) {
            setFn(current.filter(i => i !== item));
        } else {
            setFn([...current, item]);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-400">
                Loading destinations...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-28 pb-12 px-6">
            <div className="max-w-[1400px] mx-auto h-full flex flex-col md:flex-row gap-8">

                {/* Mobile Filter Button (FAB) */}
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="md:hidden fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/30 flex items-center gap-2"
                >
                    <Filter size={24} />
                    <span className="font-bold text-sm">Filters</span>
                </button>

                {/* Mobile Filter Modal */}
                <MobileFilterModal
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                    selectedAmenities={selectedAmenities} setSelectedAmenities={setSelectedAmenities}
                    selectedHotelTypes={selectedHotelTypes} setSelectedHotelTypes={setSelectedHotelTypes}
                    selectedStops={selectedStops} setSelectedStops={setSelectedStops}
                    availableAmenities={availableAmenities}
                    availableHotelTypes={availableHotelTypes}
                    availableStops={availableStops}
                    resultCount={filteredDestinations.length}
                />

                {/* Sidebar Filters (Desktop Only) */}
                <aside className="hidden md:block w-80 shrink-0 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Filters</h2>

                        {/* Search */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search places..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-primary transition-colors"
                            />
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <label className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                                <span>Max Price</span>
                                <span className="text-primary">₹{maxPrice.toLocaleString()}</span>
                            </label>
                            <input
                                type="range"
                                min="20000"
                                max="150000"
                                step="5000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                className="w-full accent-primary h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Hotel Type */}
                        <div className="mb-6">
                            <h3 className="text-white font-semibold mb-3">Hotel Class</h3>
                            <div className="space-y-2">
                                {availableHotelTypes.map(type => (
                                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border border-white/20 flex items-center justify-center transition-colors ${selectedHotelTypes.includes(type) ? 'bg-primary border-primary' : 'group-hover:border-white/40'}`}>
                                            {selectedHotelTypes.includes(type) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={selectedHotelTypes.includes(type)} onChange={() => toggleFilter(type, selectedHotelTypes, setSelectedHotelTypes)} />
                                        <span className={`text-sm ${selectedHotelTypes.includes(type) ? 'text-white' : 'text-slate-400'}`}>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Stops */}
                        <div className="mb-6">
                            <h3 className="text-white font-semibold mb-3">Stops</h3>
                            <div className="flex flex-wrap gap-2">
                                {availableStops.map(stop => (
                                    <button
                                        key={stop}
                                        onClick={() => toggleFilter(stop, selectedStops, setSelectedStops)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedStops.includes(stop) ? 'bg-primary/20 border-primary text-primary' : 'border-white/10 text-slate-400 hover:border-white/30'}`}
                                    >
                                        {stop}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="mb-6">
                            <h3 className="text-white font-semibold mb-3">Amenities</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {availableAmenities.map(amenity => (
                                    <label key={amenity} className="flex items-center gap-2 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded border border-white/20 flex items-center justify-center transition-colors ${selectedAmenities.includes(amenity) ? 'bg-primary border-primary' : 'group-hover:border-white/40'}`}>
                                            {selectedAmenities.includes(amenity) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={selectedAmenities.includes(amenity)} onChange={() => toggleFilter(amenity, selectedAmenities, setSelectedAmenities)} />
                                        <span className="text-xs text-slate-400 group-hover:text-slate-300">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Header Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
                        <ScrollReveal>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    <TextReveal>Explore Destinations</TextReveal>
                                </h1>
                                <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">{filteredDestinations.length} experiences found</p>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Content Area */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-96 bg-slate-800/50 rounded-2xl animate-pulse border border-white/5" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredDestinations.length > 0 ? (
                                filteredDestinations.map((dest, index) => (
                                    <ScrollReveal key={dest.id} delay={index * 0.1}>
                                        <div className="h-full transform hover:-translate-y-2 transition-transform duration-500">
                                            <Link href={`/tours/${dest.id}`} className="block h-full bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group">
                                                <div className="relative h-64 overflow-hidden">
                                                    <Image
                                                        src={dest.image}
                                                        alt={dest.name}
                                                        fill
                                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                                                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                                                        <span>★</span> {dest.rating}
                                                    </div>
                                                </div>
                                                <div className="p-6 relative">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{dest.hotelType}</span>
                                                        <span className="text-white font-bold text-lg">{dest.price}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{dest.name}</h3>
                                                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 font-light leading-relaxed">{dest.description}</p>

                                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                                        {dest.amenities?.slice(0, 3).map((a: string) => (
                                                            <span key={a} className="text-[10px] text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:border-white/10 transition-colors">{a}</span>
                                                        ))}
                                                        {dest.amenities?.length > 3 && <span className="text-[10px] text-slate-500 px-1 self-center">+{dest.amenities.length - 3}</span>}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </ScrollReveal>
                                ))
                            ) : (
                                <div className="col-span-full py-32 text-center bg-slate-800/30 rounded-3xl border border-white/5 border-dashed">
                                    <div className="text-6xl mb-6 opacity-50">🏜️</div>
                                    <h3 className="text-2xl font-bold text-white mb-3">No matches found</h3>
                                    <p className="text-slate-400 mb-6">Try adjusting your filters to find your perfect getaway.</p>
                                    <button onClick={() => { setSearchQuery(""); setMaxPrice(150000); setSelectedAmenities([]); setSelectedHotelTypes([]); setSelectedStops([]); }} className="text-primary hover:text-white font-bold transition-colors">Clear all filters</button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
