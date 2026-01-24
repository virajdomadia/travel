"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function InitialLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Simulate initial asset loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "unset";
        };
    }, [isLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="initial-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }} // Wipe up effect
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Bezier for premium feel
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
                >
                    <div className="relative w-24 h-24 mb-8">
                        <Image
                            src="/favicon.png"
                            alt="Logo"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                        {/* Glow Effect */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-primary/30 blur-2xl rounded-full -z-10"
                        />
                    </div>

                    <div className="text-center overflow-hidden">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-4xl font-bold text-white tracking-[0.2em] font-heading mb-3"
                        >
                            7 FOLD WONDERS
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-slate-400 text-xs tracking-[0.3em] uppercase"
                        >
                            Premium Travel Experiences
                        </motion.p>
                    </div>

                    {/* Minimal Progress Line */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-slate-800 overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0 bg-white"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
