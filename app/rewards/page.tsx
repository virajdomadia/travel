"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Crown, Gift, TrendingUp, Clock, ShieldCheck, Plane } from "lucide-react";
import Link from "next/link";

export default function RewardsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setUser(data.user);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    const points = user?.loyaltyPoints || 450; // Use mock points if 0 for demo visual
    const tier = user?.rewardsTier || "Silver";

    const nextTier = tier === "Silver" ? "Gold" : "Platinum";
    const nextTierPoints = tier === "Silver" ? 1000 : 5000;
    const progress = (points / nextTierPoints) * 100;

    const history = [
        { id: 1, action: "Trip to Kyoto", date: "2024-03-15", points: "+1,200", type: "earn" },
        { id: 2, action: "Review: Santorini", date: "2024-02-10", points: "+50", type: "earn" },
        { id: 3, action: "Welcome Bonus", date: "2024-01-01", points: "+200", type: "earn" },
        { id: 4, action: "Redeemed: Discount Voucher", date: "2024-03-20", points: "-500", type: "spend" },
    ];

    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">

                {/* 1. Hero Card */}
                <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-indigo-900 to-slate-900 border border-white/10 p-8 md:p-12 mb-12">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${tier === "Platinum" ? "bg-slate-100 text-slate-900 border-white" :
                                    tier === "Gold" ? "bg-amber-400/20 text-amber-400 border-amber-400/50" :
                                        "bg-slate-700 text-slate-300 border-slate-600"
                                    }`}>
                                    {tier} Member
                                </span>
                                {user && <span className="text-slate-400 text-sm">Member since 2024</span>}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
                                {points.toLocaleString()} <span className="text-3xl text-primary font-normal">pts</span>
                            </h1>
                            <p className="text-slate-300 text-lg mb-8 max-w-md">
                                You're {nextTierPoints - points} points away from unlocking <strong className="text-white">{nextTier}</strong> status and exclusive perks.
                            </p>

                            {/* Progress Bar */}
                            <div className="max-w-md">
                                <div className="flex justify-between text-xs text-slate-400 mb-2 uppercase tracking-wider">
                                    <span>{tier}</span>
                                    <span>{nextTier}</span>
                                </div>
                                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-primary to-purple-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3D Coin/Visual */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="w-40 h-40 md:w-52 md:h-52 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full shadow-[0_0_50px_rgba(245,158,11,0.5)] flex items-center justify-center text-6xl shadow-inner border-4 border-amber-200">
                                👑
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* 2. Benefits / Perks */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Your Benefits</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 flex gap-4 items-start">
                                    <div className="bg-primary/20 text-primary p-3 rounded-xl"><Gift size={24} /></div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Free Room Upgrades</h3>
                                        <p className="text-slate-400 text-sm">Subject to availability on check-in at partner hotels.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 flex gap-4 items-start">
                                    <div className="bg-purple-500/20 text-purple-400 p-3 rounded-xl"><Clock size={24} /></div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Late Check-out</h3>
                                        <p className="text-slate-400 text-sm">Enjoy your stay until 2 PM at no extra cost.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 flex gap-4 items-start opacity-50 grayscale">
                                    <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-xl"><ShieldCheck size={24} /></div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1 flex justify-between">
                                            Priority Support
                                            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white self-center">GOLD</span>
                                        </h3>
                                        <p className="text-slate-400 text-sm">24/7 dedicated travel concierge line.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 flex gap-4 items-start opacity-50 grayscale">
                                    <div className="bg-amber-500/20 text-amber-400 p-3 rounded-xl"><Plane size={24} /></div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1 flex justify-between">
                                            Airport Lounge
                                            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white self-center">PLATINUM</span>
                                        </h3>
                                        <p className="text-slate-400 text-sm">Access to over 1,200 lounges worldwide.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Points History</h2>
                                <button className="text-sm text-primary hover:text-white">View All</button>
                            </div>
                            <div className="bg-slate-800 border border-white/5 rounded-2xl overflow-hidden">
                                {history.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 border-b border-white/5 last:border-none hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'earn' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {item.type === 'earn' ? <TrendingUp size={18} /> : <Gift size={18} />}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">{item.action}</h4>
                                                <p className="text-xs text-slate-500">{item.date}</p>
                                            </div>
                                        </div>
                                        <span className={`font-mono font-bold ${item.type === 'earn' ? 'text-emerald-400' : 'text-slate-400'}`}>
                                            {item.points}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* 3. Redeem Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-slate-800 border border-white/10 rounded-3xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Redeem Points</h3>
                            <div className="space-y-4">
                                <div className="bg-slate-900 rounded-xl p-4 border border-white/5 group cursor-pointer hover:border-primary/50 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-white/10 p-2 rounded-lg text-2xl">🏷️</div>
                                        <span className="text-primary font-bold text-sm">500 pts</span>
                                    </div>
                                    <h4 className="text-white font-bold group-hover:text-primary transition-colors">₹1,000 Off Voucher</h4>
                                    <p className="text-xs text-slate-400 mt-1">Applicable on any booking over ₹10k.</p>
                                </div>

                                <div className="bg-slate-900 rounded-xl p-4 border border-white/5 group cursor-pointer hover:border-primary/50 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-white/10 p-2 rounded-lg text-2xl">🥂</div>
                                        <span className="text-primary font-bold text-sm">2,500 pts</span>
                                    </div>
                                    <h4 className="text-white font-bold group-hover:text-primary transition-colors">Free Dinner for Two</h4>
                                    <p className="text-xs text-slate-400 mt-1">At any of our partner luxury resorts.</p>
                                </div>

                                <div className="bg-slate-900 rounded-xl p-4 border border-white/5 group cursor-pointer hover:border-primary/50 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-white/10 p-2 rounded-lg text-2xl">🚗</div>
                                        <span className="text-primary font-bold text-sm">1,000 pts</span>
                                    </div>
                                    <h4 className="text-white font-bold group-hover:text-primary transition-colors">Free Airport Transfer</h4>
                                    <p className="text-xs text-slate-400 mt-1">Luxury sedan pickup/drop.</p>
                                </div>
                            </div>
                            <button className="w-full btn bg-white/5 text-white mt-6 border border-white/10 hover:bg-white hover:text-slate-900">View Rewards Catalog</button>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-6 text-white text-center">
                            <h3 className="font-bold text-xl mb-2">Refer a Friend</h3>
                            <p className="text-sm text-white/80 mb-4">Earn 500 bonus points for every friend who books their first trip.</p>
                            <button className="bg-white text-primary font-bold py-2 px-4 rounded-xl w-full">Invite Friends</button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
