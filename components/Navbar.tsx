"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";


export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "signup">("login");

    const [user, setUser] = useState<{ username: string } | null>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();
                setUser(data.user);
            } catch (err) {
                setUser(null);
            }
        };

        checkAuth();
        window.addEventListener("auth-change", checkAuth);

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("auth-change", checkAuth);
        };
    }, []);

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
        window.dispatchEvent(new Event("auth-change"));
        window.location.href = "/";
    };

    const openAuth = (mode: "login" | "signup") => {
        setAuthMode(mode);
        setIsAuthOpen(true);
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { name: "Destinations", href: "/destinations" },
        { name: "Tours", href: "/tours" },
        { name: "Deals", href: "/deals" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialMode={authMode}
            />
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"}`}>
                <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold font-heading text-white flex items-center gap-2 z-50 relative">
                        <span className="text-primary">7</span>Fold Wonders
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/planner" className="flex items-center gap-1 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            AI Planner
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-white/80 hover:text-white p-2 hidden md:block" title="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>

                        {user ? (
                            <div className="relative hidden md:block group">
                                <button className="flex items-center gap-2 text-white/80 hover:text-white font-medium">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold uppercase">
                                        {user.username.charAt(0)}
                                    </div>
                                    <span className="max-w-[100px] truncate">{user.username}</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                                    <Link href="/profile" className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">My Profile</Link>
                                    <Link href="/bookings" className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">My Bookings</Link>
                                    <Link href="/wishlist" className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">My Wishlist ❤️</Link>
                                    <button onClick={logout} className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors">Sign Out</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => openAuth("login")}
                                    className="text-white/80 hover:text-white text-sm font-bold hidden md:block px-4"
                                >
                                    Sign In
                                </button>

                                <button
                                    onClick={() => openAuth("signup")}
                                    className="btn btn-primary hidden md:block"
                                >
                                    Join Free
                                </button>
                            </>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-white z-50 relative p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 bg-slate-950 z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-bold text-white hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-4 w-full px-12 mt-4">
                            {user ? (
                                <>
                                    <div className="flex items-center gap-3 text-white mb-4 justify-center">
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold uppercase text-lg">
                                            {user.username.charAt(0)}
                                        </div>
                                        <span className="font-bold text-lg">{user.username}</span>
                                    </div>
                                    <Link href="/profile" className="btn bg-white/10 w-full text-center">My Profile</Link>
                                    <button onClick={logout} className="btn bg-red-500/10 text-red-400 w-full">Sign Out</button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => openAuth("signup")}
                                        className="btn btn-primary w-full"
                                    >
                                        Join Club
                                    </button>
                                    <button
                                        onClick={() => openAuth("login")}
                                        className="text-white/60 font-medium py-2"
                                    >
                                        Already a member? Sign In
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
