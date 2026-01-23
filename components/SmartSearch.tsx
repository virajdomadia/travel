"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, Calendar, Users, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categories = [
    { id: 'beach', label: 'Beach', icon: '🏖️' },
    { id: 'mountain', label: 'Mountain', icon: '🏔️' },
    { id: 'city', label: 'City', icon: '🏙️' },
    { id: 'forest', label: 'Forest', icon: '🌲' },
    { id: 'desert', label: 'Desert', icon: '🐪' },
];

export default function SmartSearch() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    const handleSearch = () => {
        let url = '/destinations?';
        if (query) url += `search=${query}&`;
        if (activeCategory) url += `category=${activeCategory}`;
        router.push(url);
        setIsOpen(false);
    };

    return (
        <div className="relative z-50 w-full max-w-2xl mx-auto">
            {/* Search Trigger Bar */}
            <motion.div
                layoutId="search-bar"
                onClick={() => setIsOpen(true)}
                className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 flex items-center cursor-pointer hover:bg-white/15 transition-colors ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <div className="pl-6 flex-1 text-gray-300 font-medium truncate">
                    {query || "Where do you want to go?"}
                </div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <Search size={20} />
                </div>
            </motion.div>

            {/* Expanded Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            layoutId="search-bar"
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl z-[70] overflow-hidden"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-bold text-xl">Plan Your Trip</h3>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="relative mb-8">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search destinations (e.g., 'Kerala', 'Peaceful')..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-500"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>

                            <div className="mb-8">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 block">Vibe</label>
                                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(activeCategory === cat.id ? '' : cat.id)}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all whitespace-nowrap ${activeCategory === cat.id
                                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <span className="text-xl">{cat.icon}</span>
                                            <span className="font-medium">{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleSearch}
                                className="w-full bg-gradient-to-r from-primary to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Search Experiences
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
