"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number;
}

export default function ParallaxImage({ src, alt, className = "", speed = 150 }: ParallaxImageProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                />
            </motion.div>
        </div>
    );
}
