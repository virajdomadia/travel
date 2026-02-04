"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Activity {
    time: string;
    description: string;
    icon: string;
    photos?: string[];
    location?: string;
}

interface HotelOption {
    name: string;
    type: string;
    image: string;
    amenities: string[];
    price: string;
    rating: number;
    description: string;
}

interface DayItinerary {
    day: number;
    title: string;
    activities: Activity[];
    meals: string[];
    accommodation?: string;  // Legacy support
    hotelOptions?: HotelOption[];
    highlights: string[];
}

interface TourItineraryProps {
    itinerary: DayItinerary[];
}

export default function TourItinerary({ itinerary }: TourItineraryProps) {
    const [expandedDay, setExpandedDay] = useState<number | null>(1);

    const toggleDay = (day: number) => {
        setExpandedDay(expandedDay === day ? null : day);
    };

    return (
        <section className="py-16 bg-slate-900">
            <div className="max-w-7xl mx-auto px-8">
                {/* Header */}
                <div className="mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-secondary font-bold tracking-widest uppercase mb-2 block"
                    >
                        Day-by-Day Itinerary
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white"
                    >
                        Your Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Awaits</span>
                    </motion.h2>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                    {itinerary.map((day, index) => (
                        <motion.div
                            key={day.day}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Day Card */}
                            <div
                                className={`bg-slate-800/50 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${expandedDay === day.day
                                    ? "border-primary shadow-lg shadow-primary/20"
                                    : "border-white/10 hover:border-white/20"
                                    }`}
                                onClick={() => toggleDay(day.day)}
                            >
                                {/* Day Header */}
                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Day Number Badge */}
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-sky-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-xl">Day {day.day}</span>
                                        </div>

                                        {/* Day Title */}
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">{day.title}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {day.highlights.slice(0, 2).map((highlight, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full"
                                                    >
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expand Icon */}
                                    <motion.div
                                        animate={{ rotate: expandedDay === day.day ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-primary text-2xl"
                                    >
                                        ▼
                                    </motion.div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {expandedDay === day.day && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 border-t border-white/10 pt-6">
                                                {/* Activities Timeline */}
                                                <div className="mb-6">
                                                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                        <span className="text-secondary">📅</span>
                                                        Activities
                                                    </h4>
                                                    <div className="space-y-4">
                                                        {day.activities.map((activity, i) => (
                                                            <div key={i} className="flex gap-4 items-start">
                                                                {/* Timeline Dot */}
                                                                <div className="relative flex flex-col items-center">
                                                                    <div className="w-10 h-10 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center flex-shrink-0">
                                                                        <span className="text-lg">{activity.icon}</span>
                                                                    </div>
                                                                    {i < day.activities.length - 1 && (
                                                                        <div className="w-0.5 h-12 bg-gradient-to-b from-secondary to-transparent mt-2" />
                                                                    )}
                                                                </div>

                                                                {/* Activity Details */}
                                                                <div className="flex-1 pt-2">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <div className="text-secondary text-sm font-semibold">
                                                                            {activity.time}
                                                                        </div>
                                                                        {activity.location && (
                                                                            <span className="text-xs text-slate-500">
                                                                                📍 {activity.location}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-slate-300 mb-3">
                                                                        {activity.description}
                                                                    </div>

                                                                    {/* Activity Photos */}
                                                                    {activity.photos && activity.photos.length > 0 && (
                                                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                                                            {activity.photos.map((photo, photoIdx) => (
                                                                                <div
                                                                                    key={photoIdx}
                                                                                    className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer"
                                                                                >
                                                                                    <Image
                                                                                        src={photo}
                                                                                        alt={`${activity.description} - Photo ${photoIdx + 1}`}
                                                                                        fill
                                                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                                                    />
                                                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Meals */}
                                                <div className="mb-6">
                                                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                                        <span className="text-secondary">🍽️</span>
                                                        Meals Included
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {day.meals.map((meal, i) => (
                                                            <span
                                                                key={i}
                                                                className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                                                            >
                                                                {meal}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Hotel Options */}
                                                {day.hotelOptions && day.hotelOptions.length > 0 ? (
                                                    <div className="mb-6">
                                                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                                            <span className="text-secondary">🏨</span>
                                                            Hotel Options for Day {day.day}
                                                        </h4>
                                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            {day.hotelOptions.map((hotel, hotelIdx) => (
                                                                <div
                                                                    key={hotelIdx}
                                                                    className="bg-slate-900/50 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all group"
                                                                >
                                                                    {/* Hotel Image */}
                                                                    <div className="relative h-40 overflow-hidden">
                                                                        <Image
                                                                            src={hotel.image}
                                                                            alt={hotel.name}
                                                                            fill
                                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                                        />
                                                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                                                                            <span className="text-yellow-500">⭐</span>
                                                                            <span className="text-xs font-bold text-slate-900">{hotel.rating}</span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Hotel Details */}
                                                                    <div className="p-4">
                                                                        <h5 className="text-white font-bold mb-1">{hotel.name}</h5>
                                                                        <p className="text-xs text-secondary mb-2">{hotel.type}</p>
                                                                        <p className="text-sm text-slate-400 mb-3 line-clamp-2">{hotel.description}</p>

                                                                        {/* Amenities */}
                                                                        <div className="flex flex-wrap gap-1 mb-3">
                                                                            {hotel.amenities.slice(0, 3).map((amenity, i) => (
                                                                                <span
                                                                                    key={i}
                                                                                    className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
                                                                                >
                                                                                    {amenity}
                                                                                </span>
                                                                            ))}
                                                                            {hotel.amenities.length > 3 && (
                                                                                <span className="text-xs text-slate-500">
                                                                                    +{hotel.amenities.length - 3} more
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        {/* Price */}
                                                                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                                                            <span className="text-secondary font-bold">{hotel.price}</span>
                                                                            <button className="text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary px-3 py-1 rounded-full transition-colors">
                                                                                View Details
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : day.accommodation ? (
                                                    <div className="mb-6">
                                                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                                            <span className="text-secondary">🏨</span>
                                                            Accommodation
                                                        </h4>
                                                        <div className="bg-slate-900/50 rounded-xl p-4">
                                                            <p className="text-slate-300 text-sm">{day.accommodation}</p>
                                                        </div>
                                                    </div>
                                                ) : null}

                                                {/* All Highlights */}
                                                {day.highlights.length > 2 && (
                                                    <div className="mt-6">
                                                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                                            <span className="text-secondary">✨</span>
                                                            Highlights
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {day.highlights.map((highlight, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="bg-gradient-to-r from-secondary/10 to-sky-500/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-sm"
                                                                >
                                                                    {highlight}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
