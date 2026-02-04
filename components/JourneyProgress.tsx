"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function JourneyProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Calculate top position as percentage
    const topPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="fixed left-6 lg:left-12 top-0 bottom-0 w-1 z-50 hidden md:flex flex-col justify-center pointer-events-none">
            {/* Dashed Track */}
            <div className="absolute left-0 top-10 bottom-10 w-[2px] border-l-2 border-dashed border-white/20" />

            {/* Progress Line */}
            <motion.div
                className="absolute left-0 top-0 w-[2px] bg-secondary origin-top"
                style={{ scaleY, height: "100%" }}
            />

            {/* Plane Icon traveling down the line */}
            <motion.div
                className="absolute left-[-11px] w-6 h-6 text-secondary filter drop-shadow-[0_0_8px_rgba(237,204,38,0.8)]"
                style={{ top: topPosition }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full rotate-180">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
            </motion.div>
        </div>
    );
}
