"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PoliciesSectionProps {
    policies: {
        cancellation: string;
        payment: string;
        terms: string[];
    };
}

export default function PoliciesSection({ policies }: PoliciesSectionProps) {
    const [activeTab, setActiveTab] = useState<'cancellation' | 'payment' | 'terms'>('cancellation');

    const tabs = [
        { id: 'cancellation' as const, label: 'Cancellation Policy', icon: '🔄' },
        { id: 'payment' as const, label: 'Payment Terms', icon: '💳' },
        { id: 'terms' as const, label: 'Terms & Conditions', icon: '📋' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Booking Policies</h2>
                <p className="text-blue-100 mt-1">Important information about your booking</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 px-6 py-4 text-sm font-semibold transition-all relative ${activeTab === tab.id
                                ? 'text-blue-600 bg-white'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <span>{tab.icon}</span>
                            <span className="hidden md:inline">{tab.label}</span>
                        </span>
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-8">
                <AnimatePresence mode="wait">
                    {activeTab === 'cancellation' && (
                        <motion.div
                            key="cancellation"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancellation Policy</h3>
                                    <p className="text-gray-700 leading-relaxed">{policies.cancellation}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'payment' && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Terms</h3>
                                    <p className="text-gray-700 leading-relaxed">{policies.payment}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'terms' && (
                        <motion.div
                            key="terms"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
                                    <ul className="space-y-3">
                                        {policies.terms.map((term, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-start gap-3 text-gray-700"
                                            >
                                                <span className="text-purple-600 font-bold flex-shrink-0 mt-1">•</span>
                                                <span className="leading-relaxed">{term}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
