"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Destination {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: number;
    duration: string;
}

export default function WishlistPage() {
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch User's Wishlist IDs
                const wishRes = await fetch('/api/wishlist');
                const wishData = await wishRes.json();

                if (wishData.wishlist && wishData.wishlist.length > 0) {
                    setWishlistIds(wishData.wishlist);

                    // 2. Fetch All Destinations to filter (In real app, fetch specific IDs)
                    const destRes = await fetch('/api/destinations');
                    const destData = await destRes.json();

                    const saved = destData.filter((d: Destination) => wishData.wishlist.includes(d.id));
                    setDestinations(saved);
                } else {
                    setDestinations([]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const removeFromWishlist = async (id: string) => {
        try {
            await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destinationId: id })
            });

            setDestinations(prev => prev.filter(d => d.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">My Wishlist</h1>
                        <p className="text-slate-400">Your saved dream destinations.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-white text-center py-20">Loading...</div>
                ) : destinations.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <div className="text-6xl mb-4">❤️</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h3>
                        <p className="text-slate-400 mb-8">Start exploring the world and save your favorites here.</p>
                        <Link href="/" className="btn btn-primary">
                            Explore Destinations
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((dest, i) => (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-slate-800 border border-white/10 rounded-3xl overflow-hidden group"
                            >
                                <div className="relative h-64">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />

                                    <button
                                        onClick={() => removeFromWishlist(dest.id)}
                                        className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
                                        title="Remove from wishlist"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>

                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div>
                                            <div className="bg-primary/80 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white mb-2 w-max uppercase tracking-wider">
                                                {dest.duration}
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-2xl font-bold text-white">{dest.price}</span>
                                        <div className="flex items-center gap-1 text-amber-400">
                                            <span>★</span>
                                            <span className="text-white font-medium">{dest.rating}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/tours/${dest.id}`}
                                        className="btn btn-primary w-full text-center block"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
