"use client";

import { motion } from 'framer-motion';

interface PriceSummaryProps {
    price: string;
    duration: string;
    rating: number;
    inclusions: string[];
    onBookNow: () => void;
    onDownloadPDF: () => void;
}

export default function PriceSummary({
    price,
    duration,
    rating,
    inclusions,
    onBookNow,
    onDownloadPDF
}: PriceSummaryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
            {/* Price Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-8 text-white">
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold">{price}</span>
                    <span className="text-orange-100">per person</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-orange-100">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 fill-yellow-300" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {rating} Rating
                    </span>
                </div>
            </div>

            {/* Quick Inclusions */}
            <div className="px-6 py-6 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Package Includes
                </h3>
                <ul className="space-y-2">
                    {inclusions.slice(0, 5).map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="line-clamp-2">{item}</span>
                        </li>
                    ))}
                    {inclusions.length > 5 && (
                        <li className="text-sm text-blue-600 font-medium">
                            +{inclusions.length - 5} more inclusions
                        </li>
                    )}
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-6 space-y-3">
                <button
                    onClick={onBookNow}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Book Now
                </button>

                <button
                    onClick={onDownloadPDF}
                    className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 transition-all flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Itinerary
                </button>
            </div>

            {/* Trust Badges */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="text-xs">
                        <div className="text-green-600 font-semibold">✓ Secure</div>
                        <div className="text-gray-500">Payment</div>
                    </div>
                    <div className="text-xs">
                        <div className="text-blue-600 font-semibold">24/7</div>
                        <div className="text-gray-500">Support</div>
                    </div>
                    <div className="text-xs">
                        <div className="text-orange-600 font-semibold">Best</div>
                        <div className="text-gray-500">Price</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
