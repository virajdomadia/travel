"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";


// Removed hardcoded deals


function Countdown({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const end = new Date(targetDate);
            const diff = end.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft("Expired");
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return <span className="font-mono text-primary font-bold">{timeLeft}</span>;
}

export default function Deals() {
    const [deals, setDeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchDeals = async () => {
            try {
                const response = await fetch('/api/deals');
                const data = await response.json();
                if (isMounted) setDeals(data);
            } catch (error) {
                console.error('Error fetching deals:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchDeals();
        return () => { isMounted = false; };
    }, []);

    if (loading) {
        return <div className="min-h-screen pt-32 text-center text-white">Loading offers...</div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-widest uppercase mb-2 block animate-pulse">Limited Time Offers</span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Exclusive Deals</h1>
                <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                    Save up to 40% on luxury packages. These offers expire soon, so don&apos;t wait.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {deals.map((deal) => (
                    <div key={deal.id} className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group">
                        <div className="relative h-64 w-full">
                            <Image
                                src={deal.image}
                                alt={deal.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-4 py-1 rounded-full text-sm shadow-lg">
                                Save ₹{(deal.originalPrice - deal.discountedPrice).toLocaleString()}
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{deal.title}</h3>
                                    <div className="text-sm text-slate-500 mb-4">
                                        Ends in: <Countdown targetDate={deal.expires} />
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-2 mb-8">
                                {deal.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                                        <span className="text-primary">✓</span> {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-end justify-between border-t border-white/10 pt-6">
                                <div>
                                    <span className="text-slate-500 line-through text-sm block">Normally ₹{deal.originalPrice.toLocaleString()}</span>
                                    <span className="text-3xl font-bold text-white">₹{deal.discountedPrice.toLocaleString()}</span>
                                </div>
                                <button className="btn btn-primary">
                                    Claim Deal
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Newsletter Section */}
            <div className="mt-24 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl p-12 border border-white/10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-0" />
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Price Drop</h2>
                    <p className="text-slate-300 mb-8 max-w-md mx-auto">
                        Sign up for our "Flash Sale" alerts and be the first to know when luxury trips go on sale.
                    </p>
                    <div className="flex max-w-md mx-auto gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white focus:outline-none focus:border-primary"
                        />
                        <button className="btn btn-primary whitespace-nowrap">
                            Notify Me
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
