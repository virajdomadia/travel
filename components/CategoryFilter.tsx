"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
    selectedCategory: "All" | "Domestic" | "International";
    onCategoryChange: (category: "All" | "Domestic" | "International") => void;
    domesticCount?: number;
    internationalCount?: number;
}

export default function CategoryFilter({
    selectedCategory,
    onCategoryChange,
    domesticCount,
    internationalCount,
}: CategoryFilterProps) {
    const categories = [
        { id: "All", label: "All Destinations", icon: "🌏" },
        { id: "Domestic", label: "Domestic", icon: "🇮🇳", count: domesticCount },
        { id: "International", label: "International", icon: "✈️", count: internationalCount },
    ] as const;

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                    <motion.button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
              relative px-6 py-3 rounded-full font-semibold transition-all duration-300
              flex items-center gap-2
              ${isActive
                                ? "bg-gradient-to-r from-primary to-sky-500 text-white shadow-lg shadow-primary/25"
                                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-white/10"
                            }
            `}
                    >
                        <span className="text-xl">{category.icon}</span>
                        <span>{category.label}</span>
                        {category.id !== "All" && category.count !== undefined && (
                            <span
                                className={`
                  ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                  ${isActive ? "bg-white/20" : "bg-white/10"}
                `}
                            >
                                {category.count}
                            </span>
                        )}
                        {isActive && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute inset-0 bg-gradient-to-r from-primary to-sky-500 rounded-full -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
