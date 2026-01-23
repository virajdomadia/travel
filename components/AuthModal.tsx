"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">(initialMode);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const url = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
            const body = mode === "login"
                ? { username: form.email, password: form.password } // Allow email as username
                : { username: form.username, email: form.email, password: form.password };

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Authentication failed");
            }

            if (mode === "login") {
                // Check if user object exists and has username
                if (data.user && data.user.username) {
                    window.dispatchEvent(new Event("auth-change"));
                }
            }

            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                if (mode === "signup") {
                    setMode("login"); // Switch to login after signup, or auto-login?
                    // For now, let's auto-login or ask to login.
                    // The original code reset logic is fine.
                }
            }, 2000);
        } catch (err: any) {
            setIsLoading(false);
            setError(err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-slate-800/50 border border-white/10 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative"
            >
                {/* Background Glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[100px] rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-500/20 blur-[100px] rounded-full" />

                <div className="p-8 md:p-12 relative z-10">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">Welcome!</h3>
                                <p className="text-slate-400">Successfully {mode === "login" ? "logged in" : "signed up"}.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-10 text-center">
                                    <h2 className="text-4xl font-bold text-white mb-3">
                                        {mode === "login" ? "Sign In" : "Join the Club"}
                                    </h2>
                                    <p className="text-slate-400">
                                        {mode === "login"
                                            ? "Access your curated itineraries & deals."
                                            : "Unlock exclusive travel experiences & rewards."}
                                    </p>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-xl text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {mode === "signup" && (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                required
                                                value={form.username}
                                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-slate-600"
                                            />
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            placeholder={mode === "login" ? "Username or Email" : "Email Address"}
                                            required
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-slate-600"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            required
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-slate-600"
                                        />
                                    </div>

                                    {mode === "login" && (
                                        <div className="text-right">
                                            <button type="button" className="text-primary text-sm font-medium hover:underline">
                                                Forgot password?
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn btn-primary w-full py-4 text-lg font-bold shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                                    >
                                        <span className={isLoading ? "opacity-0" : "opacity-100"}>
                                            {mode === "login" ? "Sign In" : "Create Account"}
                                        </span>
                                        {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            </div>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-8">
                                    <div className="relative flex items-center justify-center mb-8">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full h-px bg-white/10" />
                                        </div>
                                        <span className="relative z-10 bg-slate-800 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                            Or Continue With
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 hover:bg-white/10 transition-all text-white font-medium text-sm">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Google
                                        </button>
                                        <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 hover:bg-white/10 transition-all text-white font-medium text-sm">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                                            </svg>
                                            Apple
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-10 text-center">
                                    <p className="text-slate-400">
                                        {mode === "login" ? "Don't have an account?" : "Already a member?"}{" "}
                                        <button
                                            onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                            className="text-primary font-bold hover:underline"
                                        >
                                            {mode === "login" ? "Sign Up Now" : "Sign In"}
                                        </button>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
