
"use client";

import { usePersonalization } from "@/context/PersonalizationContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RecommendedSection() {
    const { lastCategory } = usePersonalization();
    const [recommendations, setRecommendations] = useState<any[]>([]);

    useEffect(() => {
        if (!lastCategory) return;

        fetch('/api/destinations')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter((d: any) => d.category === lastCategory).slice(0, 3);
                setRecommendations(filtered);
            })
            .catch(err => console.error(err));
    }, [lastCategory]);

    if (!lastCategory || recommendations.length === 0) return null;

    if (recommendations.length === 0) return null;

    return (
        <section className="py-24 px-8 bg-slate-900 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">picked just for you</span>
                    <h2 className="text-4xl font-bold text-white">
                        Because you liked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 capitalize">{lastCategory}</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recommendations.map((dest, i) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-80 rounded-3xl overflow-hidden border border-white/10"
                        >
                            <Image
                                src={dest.image}
                                alt={dest.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-xl font-bold text-white mb-1">{dest.name}</h3>
                                <p className="text-slate-300 text-sm mb-4 line-clamp-1">{dest.description}</p>
                                <Link
                                    href={`/tours/${dest.id}`}
                                    className="text-primary font-bold uppercase text-xs tracking-widest hover:text-white transition-colors"
                                >
                                    View Details &rarr;
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
