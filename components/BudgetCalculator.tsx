"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BudgetCategory {
    name: string;
    amount: number;
    icon: string;
    color: string;
}

interface BudgetCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
    initialDestination?: string;
    initialDuration?: number;
}

export default function BudgetCalculator({
    isOpen,
    onClose,
    initialDestination = "Kerala",
    initialDuration = 5,
}: BudgetCalculatorProps) {
    const [destination, setDestination] = useState(initialDestination);
    const [duration, setDuration] = useState(initialDuration);
    const [travelers, setTravelers] = useState(2);
    const [accommodation, setAccommodation] = useState<"budget" | "standard" | "luxury">("standard");
    const [includeFlights, setIncludeFlights] = useState(true);

    // Calculate costs based on inputs
    const calculateCosts = (): BudgetCategory[] => {
        const baseMultiplier = destination === "International" ? 2.5 : 1;

        const accommodationCosts = {
            budget: 2000 * duration * baseMultiplier,
            standard: 5000 * duration * baseMultiplier,
            luxury: 12000 * duration * baseMultiplier,
        };

        const flightCost = includeFlights ? (destination === "International" ? 45000 : 8000) * travelers : 0;
        const hotelCost = accommodationCosts[accommodation] * travelers;
        const foodCost = (accommodation === "luxury" ? 3000 : accommodation === "standard" ? 1500 : 800) * duration * travelers;
        const activitiesCost = (accommodation === "luxury" ? 5000 : accommodation === "standard" ? 2500 : 1200) * duration * travelers;
        const transportCost = 1000 * duration * travelers * baseMultiplier;
        const miscCost = 500 * duration * travelers;

        return [
            { name: "Flights", amount: flightCost, icon: "✈️", color: "from-blue-500 to-cyan-500" },
            { name: "Accommodation", amount: hotelCost, icon: "🏨", color: "from-purple-500 to-pink-500" },
            { name: "Food & Dining", amount: foodCost, icon: "🍽️", color: "from-orange-500 to-red-500" },
            { name: "Activities", amount: activitiesCost, icon: "🎭", color: "from-green-500 to-emerald-500" },
            { name: "Local Transport", amount: transportCost, icon: "🚗", color: "from-yellow-500 to-amber-500" },
            { name: "Miscellaneous", amount: miscCost, icon: "💼", color: "from-slate-500 to-gray-500" },
        ].filter(item => item.amount > 0);
    };

    const categories = calculateCosts();
    const totalCost = categories.reduce((sum, cat) => sum + cat.amount, 0);
    const perPersonCost = totalCost / travelers;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-slate-900 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-primary to-sky-500 p-6 text-white z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Budget Calculator</h2>
                                <p className="text-white/80">Plan your trip expenses with precision</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Input Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Destination */}
                            <div>
                                <label className="text-white font-semibold mb-2 block">Destination Type</label>
                                <select
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="Kerala">Domestic (Kerala)</option>
                                    <option value="Goa">Domestic (Goa)</option>
                                    <option value="Rajasthan">Domestic (Rajasthan)</option>
                                    <option value="International">International</option>
                                </select>
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="text-white font-semibold mb-2 block">Duration (Days)</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setDuration(Math.max(1, duration - 1))}
                                        className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-bold"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="flex-1 bg-slate-800 text-white text-center px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        onClick={() => setDuration(duration + 1)}
                                        className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Travelers */}
                            <div>
                                <label className="text-white font-semibold mb-2 block">Number of Travelers</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                                        className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-bold"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={travelers}
                                        onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="flex-1 bg-slate-800 text-white text-center px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        onClick={() => setTravelers(travelers + 1)}
                                        className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Accommodation Level */}
                            <div>
                                <label className="text-white font-semibold mb-2 block">Accommodation Level</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(["budget", "standard", "luxury"] as const).map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setAccommodation(level)}
                                            className={`px-4 py-3 rounded-xl font-medium capitalize transition-all ${accommodation === level
                                                    ? "bg-primary text-white"
                                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Include Flights Toggle */}
                        <div className="mb-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={includeFlights}
                                    onChange={(e) => setIncludeFlights(e.target.checked)}
                                    className="w-5 h-5 accent-primary"
                                />
                                <span className="text-white font-medium">Include flight costs</span>
                            </label>
                        </div>

                        {/* Cost Breakdown */}
                        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-white mb-6">Cost Breakdown</h3>

                            <div className="space-y-4 mb-6">
                                {categories.map((category, index) => {
                                    const percentage = (category.amount / totalCost) * 100;
                                    return (
                                        <motion.div
                                            key={category.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl">{category.icon}</span>
                                                    <span className="text-white font-medium">{category.name}</span>
                                                </div>
                                                <span className="text-white font-bold">₹{category.amount.toLocaleString()}</span>
                                            </div>
                                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                                    className={`h-full bg-gradient-to-r ${category.color}`}
                                                />
                                            </div>
                                            <div className="text-xs text-slate-400 mt-1">{percentage.toFixed(1)}% of total</div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Total Summary */}
                            <div className="border-t border-white/10 pt-6 space-y-3">
                                <div className="flex items-center justify-between text-lg">
                                    <span className="text-slate-300">Total Cost</span>
                                    <span className="text-white font-bold text-2xl">₹{totalCost.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Per Person</span>
                                    <span className="text-primary font-bold text-xl">₹{perPersonCost.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">Per Day (Total)</span>
                                    <span className="text-slate-300">₹{(totalCost / duration).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 btn btn-outline"
                            >
                                Close
                            </button>
                            <button
                                className="flex-1 btn btn-primary"
                            >
                                Proceed to Booking
                            </button>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-slate-500 text-center mt-6">
                            * Estimated costs may vary based on season, availability, and specific preferences. Contact us for accurate quotes.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
