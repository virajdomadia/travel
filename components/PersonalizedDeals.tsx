"use client";

import { usePersonalization } from "@/context/PersonalizationContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function PersonalizedDeals() {
    const { lastCategory } = usePersonalization();
    const [isVisible, setIsVisible] = useState(false);

    // Simulate finding a deal after a short delay
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    const dealContent = lastCategory ? {
        title: `Exclusive 20% Off ${lastCategory} Trips!`,
        description: "Your dream getaway is closer than you think. Book now and save big.",
        code: `${lastCategory.toUpperCase()}20`,
        color: "from-purple-500 to-pink-500"
    } : {
        title: "Welcome Offer: 10% Off Your First Trip",
        description: "Start your journey with us. Explore the world for less.",
        code: "WELCOME10",
        color: "from-blue-500 to-teal-500"
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-900 border-b border-white/10 relative overflow-hidden"
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${dealContent.color} opacity-10`} />

                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <span className="bg-white/10 p-2 rounded-full text-xl">🎁</span>
                        <div>
                            <h3 className="font-bold text-white text-sm md:text-base">{dealContent.title}</h3>
                            <p className="text-slate-400 text-xs md:text-sm hidden md:block">{dealContent.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-slate-800 border border-white/20 px-3 py-1 rounded text-xs text-slate-300 font-mono tracking-widest">
                            CODE: <span className="text-white font-bold">{dealContent.code}</span>
                        </div>
                        <Link
                            href="/destinations"
                            className="bg-white text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors"
                        >
                            Claim Deal
                        </Link>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-slate-500 hover:text-white"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
