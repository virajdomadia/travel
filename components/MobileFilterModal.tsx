"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";

interface MobileFilterModalProps {
    isOpen: boolean;
    onClose: () => void;

    // Filter State & Setters
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    maxPrice: number;
    setMaxPrice: (val: number) => void;
    selectedAmenities: string[];
    setSelectedAmenities: (val: string[]) => void;
    selectedHotelTypes: string[];
    setSelectedHotelTypes: (val: string[]) => void;
    selectedStops: string[];
    setSelectedStops: (val: string[]) => void;

    // Available Options
    availableAmenities: string[];
    availableHotelTypes: string[];
    availableStops: string[];

    // Result Count for "Apply" button
    resultCount: number;
}

export default function MobileFilterModal({
    isOpen,
    onClose,
    searchQuery,
    setSearchQuery,
    maxPrice,
    setMaxPrice,
    selectedAmenities,
    setSelectedAmenities,
    selectedHotelTypes,
    setSelectedHotelTypes,
    selectedStops,
    setSelectedStops,
    availableAmenities,
    availableHotelTypes,
    availableStops,
    resultCount
}: MobileFilterModalProps) {

    const toggleFilter = (item: string, current: string[], setFn: (val: string[]) => void) => {
        if (current.includes(item)) {
            setFn(current.filter(i => i !== item));
        } else {
            setFn([...current, item]);
        }
    };

    const clearAll = () => {
        setSearchQuery("");
        setMaxPrice(150000);
        setSelectedAmenities([]);
        setSelectedHotelTypes([]);
        setSelectedStops([]);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 h-[85vh] bg-slate-900 border-t border-white/10 rounded-t-3xl z-[70] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Filter size={20} className="text-primary" /> Filters
                            </h2>
                            <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-white bg-white/5 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">

                            {/* Search */}
                            <div>
                                <label className="text-sm font-bold text-slate-300 mb-3 block">Keywords</label>
                                <input
                                    type="text"
                                    placeholder="Search places..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-4 text-white focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            {/* Price Range */}
                            <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                                <label className="flex justify-between text-sm font-bold text-slate-300 mb-4">
                                    <span>Max Price</span>
                                    <span className="text-primary bg-primary/10 px-2 py-1 rounded">₹{maxPrice.toLocaleString()}</span>
                                </label>
                                <input
                                    type="range"
                                    min="20000"
                                    max="150000"
                                    step="5000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    className="w-full accent-primary h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium">
                                    <span>₹20k</span>
                                    <span>₹1.5L</span>
                                </div>
                            </div>

                            {/* Category 1 (Hotel/Difficulty) */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-300 mb-3 block">Category</h3>
                                <div className="flex flex-wrap gap-2">
                                    {availableHotelTypes.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => toggleFilter(type, selectedHotelTypes, setSelectedHotelTypes)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedHotelTypes.includes(type)
                                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                                : 'bg-slate-800 text-slate-400 border-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category 2 (Amenities/Activities) */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-300 mb-3 block">Features</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {availableAmenities.map(amenity => (
                                        <button
                                            key={amenity}
                                            onClick={() => toggleFilter(amenity, selectedAmenities, setSelectedAmenities)}
                                            className={`px-3 py-3 rounded-xl text-xs font-medium border text-left flex items-center gap-2 transition-all ${selectedAmenities.includes(amenity)
                                                ? 'bg-slate-700 text-white border-primary/50'
                                                : 'bg-slate-800/50 text-slate-400 border-white/5'
                                                }`}
                                        >
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedAmenities.includes(amenity) ? 'border-primary bg-primary' : 'border-slate-500'}`}>
                                                {selectedAmenities.includes(amenity) && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            {amenity}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Apply actions */}
                        <div className="p-6 border-t border-white/10 bg-slate-900 shrink-0 flex gap-4">
                            <button
                                onClick={clearAll}
                                className="px-6 py-4 rounded-xl text-sm font-bold text-slate-400 hover:text-white bg-white/5 transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 bg-primary text-white font-bold rounded-xl py-4 shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors flex justify-center items-center gap-2"
                            >
                                Show {resultCount} Results
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
