"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Plus, LogOut, Tag, Calendar, Menu, X } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.user && data.user.role === 'admin') {
                setIsAuthenticated(true);
                setUsername(data.user.username);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                // Cookie is set by server
                checkAuth();
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed');
        }
    };


    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setIsAuthenticated(false);
        setUsername('');
        setPassword('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Travel Admin</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary text-white placeholder-gray-500"
                                placeholder="Enter admin username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-secondary text-white placeholder-gray-500"
                                placeholder="Enter admin password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-secondary w-full py-3 rounded-lg font-bold text-slate-900 shadow-lg shadow-secondary/25"
                        >
                            Login
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-4">Hint: admin123</p>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex relative">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 border-b border-white/10 p-4 z-20 flex justify-between items-center">
                <span className="font-bold text-secondary">Travel Admin</span>
                <button onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`w-64 border-r border-white/10 p-6 flex flex-col fixed h-full bg-slate-900 z-30 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Travel Admin
                    </h1>
                    <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="space-y-2 flex-1">
                    <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-secondary text-slate-900 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/packages/create"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === '/admin/packages/create' ? 'bg-secondary text-slate-900 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Plus size={20} />
                        Add Package
                    </Link>
                    <Link
                        href="/admin/bookings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname.startsWith('/admin/bookings') ? 'bg-secondary text-slate-900 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Calendar size={20} />
                        Manage Bookings
                    </Link>
                    <Link
                        href="/admin/content"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === '/admin/content' ? 'bg-secondary text-slate-900 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Tag size={20} />
                        Manage Site Content
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-auto"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 w-full overflow-x-hidden">
                {children}
            </main>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
