"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersonalization } from "@/context/PersonalizationContext";

const questions = [
    {
        id: "travelStyle",
        question: "What's your ideal vibe?",
        options: [
            { id: "adventure", label: "Adventure", icon: "🌋" },
            { id: "relax", label: "Relaxation", icon: "🏖️" },
            { id: "culture", label: "Culture", icon: "🏛️" },
            { id: "luxury", label: "Luxury", icon: "💎" },
        ]
    },
    {
        id: "companions",
        question: "Who are you traveling with?",
        options: [
            { id: "solo", label: "Solo", icon: "🎒" },
            { id: "couple", label: "Couple", icon: "💑" },
            { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
            { id: "group", label: "Friends", icon: "👯" },
        ]
    },
    {
        id: "budget",
        question: "What's your budget style?",
        options: [
            { id: "budget", label: "Smart Value", icon: "💰" },
            { id: "premium", label: "Premium", icon: "💳" },
            { id: "ultra-luxury", label: "No Limits", icon: "🚁" },
        ]
    }
];

interface PreferencesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
    const { setPreferences } = usePersonalization();
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState<any>({});

    useEffect(() => {
        if (isOpen) {
            setStep(0);
            setSelections({});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSelect = (key: string, value: string) => {
        const newSelections = { ...selections, [key]: value };
        setSelections(newSelections);

        if (step < questions.length - 1) {
            setTimeout(() => setStep(step + 1), 300);
        } else {
            setTimeout(() => {
                setPreferences(newSelections);
                onClose();
            }, 300);
        }
    };

    const currentQuestion = questions[step];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-slate-800 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                        className="h-full bg-primary"
                    />
                </div>

                <div className="text-center mb-8 mt-4">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
                        Customize Your Experience
                    </span>
                    <h2 className="text-3xl font-bold text-white">
                        {currentQuestion.question}
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSelect(currentQuestion.id, option.id)}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all rounded-xl p-6 flex flex-col items-center gap-3 group"
                        >
                            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                {option.icon}
                            </span>
                            <span className="text-white font-medium group-hover:text-primary transition-colors">
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={onClose}
                        className="text-slate-500 text-sm hover:text-white underline"
                    >
                        Skip Personalization
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
