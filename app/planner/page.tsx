
"use client";

import AIPlanner from "@/components/AIPlanner";

export default function PlannerPage() {
    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8 bg-[url('/grid.svg')] bg-fixed">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-2 block animate-pulse">Beta Feature</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        AI Travel Architect
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Design your perfect bespoke itinerary in seconds.
                        Our AI analyzes millions of data points to craft a journey uniquely yours.
                    </p>
                </div>

                <AIPlanner />
            </div>
        </main>
    );
}
