"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
    const words = children.split(" ");

    return (
        <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            transition={{ staggerChildren: 0.1, delayChildren: delay }}
            className={`inline-block ${className}`}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden px-[0.5em] -mx-[0.5em] mr-[0.2em] -mb-[0.2em] pb-[0.2em]">
                    <motion.span
                        variants={{
                            hidden: { y: "100%" },
                            visible: {
                                y: 0,
                                transition: {
                                    duration: 0.8,
                                    ease: [0.21, 0.47, 0.32, 0.98]
                                }
                            }
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
