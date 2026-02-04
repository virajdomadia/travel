"use client";

import { useState } from "react";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto px-8 py-32 min-h-screen">
            <h1 className="text-5xl font-bold text-white mb-4 text-center">Get in Touch</h1>
            <p className="text-slate-400 text-center mb-12 text-lg max-w-2xl mx-auto">
                Have questions about a trip? Want to customize your itinerary? We&apos;re here to help.
            </p>

            <div className="bg-background-alt/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-16">
                {success ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-slate-900">
                            ✓
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-slate-400 mb-8">
                            Thank you for reaching out. Our team will get back to you within 24 hours.
                        </p>
                        <button onClick={() => setSuccess(false)} className="btn btn-secondary">
                            Send Another Message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-white font-medium mb-2">Name</label>
                            <input type="text" required placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-2">Email</label>
                            <input type="email" required placeholder="your@email.com" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-2">Subject</label>
                            <input type="text" required placeholder="Inquiry about..." className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-2">Message</label>
                            <textarea required placeholder="How can we help you?" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white min-h-[150px] resize-y focus:outline-none focus:border-primary focus:bg-white/10 transition-colors"></textarea>
                        </div>
                        <button type="submit" className="btn btn-secondary w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <h3 className="text-white font-bold mb-2">Email Us</h3>
                    <p className="text-slate-400">hello@7foldwonders.com</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                    </div>
                    <h3 className="text-white font-bold mb-2">Call Us</h3>
                    <p className="text-slate-400">+1 (555) 123-4567</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5 15.362 15.362A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <h3 className="text-white font-bold mb-2">Visit Us</h3>
                    <p className="text-slate-400">123 Travel Lane, NY</p>
                </div>
            </div>
        </div>
    );
}
