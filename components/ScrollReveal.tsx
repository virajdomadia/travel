"use client";

import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
    staggerChildren?: number;
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    yOffset = 30,
    staggerChildren = 0
}: ScrollRevealProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0, y: yOffset },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration,
                        delay,
                        ease: [0.21, 0.47, 0.32, 0.98],
                        staggerChildren
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
