"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Destination {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: number;
    duration: string;
}

interface DestinationCardProps {
    destination: Destination;
    index: number;
}

export default function DestinationCard({ destination, index }: DestinationCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Motion values for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for rotation
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    // Transform mouse values to rotation degrees
    // We want the card to rotate towards the mouse
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Parallax for inner content (moves opposite to card rotation for depth)
    const contentTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
    const contentTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

    // Image parallax (moves more for deeper effect)
    const imageTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-25px", "25px"]);
    const imageTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-25px", "25px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative h-[500px] w-full rounded-[2rem] cursor-pointer perspective-1000 group"
        >
            <Link href={`/tours/${destination.id}`} className="block w-full h-full relative preserve-3d">

                {/* Shadow Drop */}
                <div
                    className="absolute inset-4 bg-primary/20 rounded-[2rem] blur-2xl transform translate-z-[-50px] transition-all duration-500 group-hover:bg-primary/40 group-hover:scale-105"
                    style={{ transform: "translateZ(-50px)" }}
                />

                {/* Card Container */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">

                    {/* Parallax Image */}
                    <motion.div
                        className="absolute inset-[-30px] w-[calc(100%+60px)] h-[calc(100%+60px)]"
                        style={{
                            x: imageTranslateX,
                            y: imageTranslateY,
                            scale: 1.1
                        }}
                    >
                        <Image
                            src={destination.image}
                            alt={destination.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
                    </motion.div>

                    {/* Floating Price Tag */}
                    <motion.div
                        className="absolute top-6 right-6 z-20"
                        style={{
                            x: contentTranslateX,
                            y: contentTranslateY,
                            z: 50
                        }}
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg">
                            <span className="text-white font-bold">{destination.price}</span>
                        </div>
                    </motion.div>

                    {/* Duration Badge */}
                    <motion.div
                        className="absolute top-6 left-6 z-20"
                        style={{
                            x: contentTranslateX,
                            y: contentTranslateY,
                            z: 50
                        }}
                    >
                        <div className="bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">{destination.duration}</span>
                        </div>
                    </motion.div>

                    {/* Content Info */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 p-8 z-20 transform-style-3d"
                        style={{
                            x: contentTranslateX,
                            y: contentTranslateY,
                            z: 30
                        }}
                    >
                        <h3 className="text-4xl font-bold text-white mb-2 drop-shadow-lg translate-z-20">{destination.name}</h3>

                        <div className="overflow-hidden mb-4">
                            <p className="text-white/80 line-clamp-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                {destination.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                            <div className="flex items-center gap-1 text-amber-400">
                                <span>★</span>
                                <span className="text-white font-medium">{destination.rating}</span>
                            </div>
                            <div className="text-primary font-bold uppercase text-sm tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
                                View Details
                            </div>
                        </div>
                    </motion.div>

                </div>
            </Link>
        </motion.div>
    );
}
