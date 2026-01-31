"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Destination {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: number;
    duration: string;
    date?: string; // Added date
    category?: string;
}

interface SimplePackageCardProps {
    destination: Destination;
}

export default function SimplePackageCard({ destination }: SimplePackageCardProps) {
    return (
        <div className="group relative h-[400px] w-full bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
            {/* Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            </div>

            {/* Badge */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                <div className="bg-primary/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">
                        {destination.duration} {isNaN(Number(destination.duration)) ? '' : (Number(destination.duration) > 1 ? 'Days' : 'Day')}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{destination.name}</h3>

                <div className="flex items-center gap-4 text-white/90 mb-4 font-medium">
                    {/* Date Display */}
                    {destination.date && (
                        <div className="flex items-center gap-2">
                            <span>📅</span>
                            <span>{new Date(destination.date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</span>
                        </div>
                    )}
                </div>

                <div className="border-t border-white/20 pt-4 mt-2">
                    <div className="flex justify-between items-end mb-4">
                        <div className="flex flex-col">
                            <span className="text-slate-300 text-xs uppercase tracking-wider">Price</span>
                            <span className="text-primary font-bold text-xl">
                                {destination.price.startsWith('₹') ? destination.price : '₹' + new Intl.NumberFormat('en-IN').format(parseInt(destination.price.replace(/[^0-9]/g, '') || '0'))}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={(e) => { e.preventDefault(); alert("Booking coming soon!"); }}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group/btn"
                    >
                        <span>Book Package</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
