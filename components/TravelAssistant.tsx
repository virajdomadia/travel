"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

const quickActions = [
    "Best destinations for families",
    "Budget-friendly trips",
    "Adventure destinations",
    "Visa requirements",
    "Best time to visit Kerala",
    "Luxury packages",
];

const travelKnowledge: Record<string, string> = {
    "best destinations for families": "Great family destinations include Kerala (houseboat experiences), Goa (beaches), and Rajasthan (cultural heritage). All offer kid-friendly activities and safe environments.",
    "budget-friendly trips": "For budget travel, consider Goa, Rishikesh, or Pondicherry. We offer packages starting from ₹15,000 per person with accommodation and meals included.",
    "adventure destinations": "Adventure seekers love Ladakh (trekking), Rishikesh (rafting), Manali (paragliding), and Andaman Islands (scuba diving). Check our adventure category!",
    "visa requirements": "For Indian destinations, no visa is needed for Indian citizens. For international travel, visa requirements vary by country. Contact our support team for specific guidance.",
    "best time to visit kerala": "Kerala is best visited from October to March when the weather is pleasant. Monsoon season (June-September) offers lush greenery and Ayurvedic treatments.",
    "luxury packages": "Our luxury packages include 5-star accommodations, private transfers, personal guides, and exclusive experiences. Prices start from ₹75,000 per person.",
    "booking process": "Booking is simple: Select your destination → Choose dates and travelers → Review itinerary → Make payment. We accept all major payment methods and offer EMI options.",
    "cancellation policy": "Free cancellation up to 15 days before departure. 50% refund for 7-15 days, 25% for 3-7 days. Visit our cancellation policy page for details.",
    "group bookings": "For groups of 8+, we offer special discounts and customized itineraries. Contact our group travel specialists for personalized quotes.",
    "payment options": "We accept credit/debit cards, UPI, net banking, and offer EMI plans. International cards are also accepted for global bookings.",
};

export default function TravelAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hi! I'm your AI Travel Assistant. How can I help you plan your perfect trip today?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        // Check for exact or partial matches in knowledge base
        for (const [key, value] of Object.entries(travelKnowledge)) {
            if (lowerMessage.includes(key)) {
                return value;
            }
        }

        // Keyword-based responses
        if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
            return "Our packages range from ₹15,000 to ₹150,000 per person depending on destination, duration, and luxury level. Use our Budget Calculator to get a detailed breakdown!";
        }
        if (lowerMessage.includes("weather") || lowerMessage.includes("climate")) {
            return "Check out our Weather-Based Recommendations section to find destinations with optimal weather for your travel dates!";
        }
        if (lowerMessage.includes("book") || lowerMessage.includes("reserve")) {
            return "To book a trip, browse our destinations, select your preferred package, and click 'Book This Trip'. Our team will confirm within 24 hours!";
        }
        if (lowerMessage.includes("contact") || lowerMessage.includes("support")) {
            return "You can reach our 24/7 support team at support@traveldct.com or call +91-1800-123-4567. We're here to help!";
        }
        if (lowerMessage.includes("thank")) {
            return "You're welcome! Feel free to ask anything else about your travel plans. Happy to help! ✈️";
        }

        // Default response
        return "That's a great question! While I'm still learning, I recommend checking our destinations page or contacting our expert travel consultants for personalized assistance. Is there anything specific about destinations, pricing, or booking I can help with?";
    };

    const handleSendMessage = (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateResponse(messageText),
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary to-sky-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[400px] h-[600px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-sky-500 p-6 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">AI Travel Assistant</h3>
                                    <p className="text-xs text-white/80">Online • Ready to help</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.sender === "user"
                                                ? "bg-primary text-white rounded-br-sm"
                                                : "bg-slate-800 text-slate-200 rounded-bl-sm"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{message.text}</p>
                                        <span className="text-xs opacity-60 mt-1 block">
                                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {messages.length <= 2 && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-slate-400 mb-2">Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickActions.slice(0, 3).map((action) => (
                                        <button
                                            key={action}
                                            onClick={() => handleSendMessage(action)}
                                            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition-colors"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-slate-500"
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputValue.trim()}
                                    className="w-12 h-12 bg-primary hover:bg-primary/80 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
