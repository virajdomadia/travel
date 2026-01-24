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
    category?: string;
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

    // ... (existing refs and springs)

    const [isInWishlist, setIsInWishlist] = React.useState(false);

    // Check wishlist status
    React.useEffect(() => {
        const checkWishlist = async () => {
            const res = await fetch('/api/wishlist');
            if (res.ok) {
                const data = await res.json();
                if (data.wishlist && data.wishlist.includes(destination.id)) {
                    setIsInWishlist(true);
                }
            }
        };
        checkWishlist();
    }, [destination.id]);

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link click
        e.stopPropagation();

        try {
            const res = await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destinationId: destination.id })
            });

            if (res.ok) {
                const data = await res.json();
                setIsInWishlist(data.action === 'added');
            } else {
                if (res.status === 401) alert("Please sign in to save trips!");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // ... (handlers)

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-[400px] w-full cursor-pointer perspective-1000"
        >
            <Link href={`/tours/${destination.id}`} className="block w-full h-full relative preserve-3d">

                {/* ... (Shadow Drop) */}

                {/* Card Container */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">

                    {/* Parallax Image */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <motion.div
                            className="absolute inset-[-25px] w-[calc(100%+50px)] h-[calc(100%+50px)]"
                            style={{
                                x: imageTranslateX,
                                y: imageTranslateY,
                            }}
                        >
                            <Image
                                src={destination.image}
                                alt={destination.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                        </motion.div>
                    </div>

                    {/* Floating Price Tag */}
                    <motion.div
                        className="absolute top-6 right-6 z-20 flex gap-2"
                        style={{
                            x: contentTranslateX,
                            y: contentTranslateY,
                            z: 50
                        }}
                    >
                        <button
                            onClick={toggleWishlist}
                            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-colors ${isInWishlist ? "bg-red-500/80 text-white border-red-500" : "bg-white/10 text-white hover:bg-white/20"}`}
                        >
                            <svg className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg flex items-center">
                            <span className="text-white font-bold">{destination.price}</span>
                        </div>
                    </motion.div>

                    {/* Duration Badge */}
                    <motion.div
                        className="absolute top-6 left-6 z-20 flex flex-col gap-2"
                        style={{
                            x: contentTranslateX,
                            y: contentTranslateY,
                            z: 50
                        }}
                    >
                        <div className="bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">{destination.duration}</span>
                        </div>
                        {destination.category && (
                            <div className={`backdrop-blur-md px-3 py-1 rounded-full shadow-lg flex items-center gap-1 ${destination.category === "Domestic"
                                    ? "bg-green-500/80"
                                    : "bg-blue-500/80"
                                }`}>
                                <span className="text-xs">{destination.category === "Domestic" ? "🇮🇳" : "🌍"}</span>
                                <span className="text-white text-xs font-bold uppercase tracking-wider">{destination.category}</span>
                            </div>
                        )}
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
