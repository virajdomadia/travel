
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User as UserIcon, Loader2, MapPin, Calendar, Wallet, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import MagneticButton from "./MagneticButton";

interface Message {
    role: "user" | "assistant";
    content: string;
    type?: "text" | "itinerary";
    data?: any;
}

interface AIPlannerProps {
    onBook?: (details: { tourName: string; price: string }) => void;
}

export default function AIPlanner({ onBook }: AIPlannerProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! I'm your sophisticated AI travel concierge. Tell me about your dream trip. Where, when, and what's your budget?"
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user" as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch('/api/ai-planner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, history: messages })
            });

            const data = await res.json();

            setMessages(prev => [...prev, {
                role: "assistant",
                content: data.response,
                type: data.isItinerary ? "itinerary" : "text",
                data: data.itinerary
            }]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: "assistant", content: "I apologize, but I'm having trouble connecting to my neural network right now." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Header */}
            <div className="bg-slate-800 p-4 border-b border-white/10 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
                            AI Concierge <Sparkles size={14} className="text-amber-400" />
                        </h3>
                        <p className="text-[10px] md:text-xs text-slate-400">Powered by Neural Travel Engine</p>
                    </div>
                </div>
                <div className="flex gap-2 text-[10px] md:text-xs text-slate-500">
                    <span className="hidden md:flex items-center gap-1"><MapPin size={12} /> Smart Routing</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> Seasonal Aware</span>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-secondary text-slate-900" : "bg-indigo-500/20 text-indigo-400"}`}>
                            {msg.role === "user" ? <UserIcon size={16} /> : <Bot size={16} />}
                        </div>

                        <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-4 ${msg.role === "user" ? "bg-secondary text-slate-900" : "bg-slate-800 border border-white/10 text-slate-300"}`}>
                            {msg.type === "itinerary" ? (
                                <div className="space-y-4">
                                    <p className="mb-4 text-white font-medium">{msg.content}</p>

                                    {/* Itinerary Card */}
                                    <div className="bg-slate-950 rounded-xl overflow-hidden border border-white/10">
                                        <div className="p-4 bg-indigo-500/10 border-b border-white/5 flex justify-between items-center">
                                            <span className="text-indigo-400 font-bold text-sm">Suggested Itinerary</span>
                                            {msg.data.totalPrice && (
                                                <span className="text-white font-bold">{msg.data.totalPrice}</span>
                                            )}
                                        </div>
                                        <div className="p-4 space-y-4">
                                            {msg.data && msg.data.days.map((day: any, idx: number) => (
                                                <div key={idx} className="relative pl-4 border-l-2 border-slate-700 pb-4 last:pb-0 last:border-none">
                                                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-indigo-500" />
                                                    <h4 className="font-bold text-white text-sm mb-1">Day {day.day}: {day.title}</h4>
                                                    <p className="text-xs text-slate-400 line-clamp-2">
                                                        {day.activities.join(" • ")}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 bg-slate-900 border-t border-white/10">
                                            <button
                                                onClick={() => onBook?.({
                                                    tourName: msg.data.tripName || "Custom AI Trip",
                                                    price: msg.data.totalPrice || "₹50,000"
                                                })}
                                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Wallet size={16} />
                                                Book This Trip
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                            <Bot size={16} />
                        </div>
                        <div className="bg-slate-800 border border-white/10 rounded-2xl p-4 flex items-center gap-2 text-slate-400">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 font-bold animate-pulse">
                                Crafting your perfect journey...
                            </span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-800 border-t border-white/10 z-10">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Describe your dream trip..."
                        className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-500 text-sm"
                    />
                    <MagneticButton
                        onClick={handleSend}
                        className={`bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl w-12 h-12 flex items-center justify-center transition-colors shadow-lg shadow-indigo-500/25 ${loading || !input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    </MagneticButton>
                </div>
            </div>
        </div>
    );
}
