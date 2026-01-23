
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User as UserIcon, Loader2, MapPin, Calendar, Wallet } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "assistant";
    content: string;
    type?: "text" | "itinerary";
    data?: any;
}

export default function AIPlanner() {
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
        <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-slate-800 p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">AI Concierge</h3>
                        <p className="text-xs text-slate-400">Powered by Neural Travel Engine</p>
                    </div>
                </div>
                <div className="flex gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={12} /> Smart Routing</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> Seasonal Aware</span>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary text-white" : "bg-indigo-500/20 text-indigo-400"}`}>
                            {msg.role === "user" ? <UserIcon size={16} /> : <Bot size={16} />}
                        </div>

                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "user" ? "bg-primary text-white" : "bg-slate-800 border border-white/10 text-slate-300"}`}>
                            {msg.type === "itinerary" ? (
                                <div className="space-y-4">
                                    <p className="mb-4 text-white font-medium">{msg.content}</p>
                                    <div className="space-y-4">
                                        {msg.data && msg.data.days.map((day: any, idx: number) => (
                                            <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                                <h4 className="font-bold text-indigo-400 mb-2">Day {day.day}: {day.title}</h4>
                                                <ul className="space-y-2">
                                                    {day.activities.map((act: string, ai: number) => (
                                                        <li key={ai} className="flex gap-2 text-sm">
                                                            <span className="text-indigo-500">•</span>
                                                            {act}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <ReactMarkdown className="prose prose-invert prose-sm">
                                    {msg.content}
                                </ReactMarkdown>
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
                            <span className="text-xs">Generating dream plan...</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-800 border-t border-white/10">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="e.g. 5 days in Kyoto with a budget of ₹200k, looking for zen temples and sushi"
                        className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
