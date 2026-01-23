"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Plus, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy password for demo
        if (password === 'admin123') {
            localStorage.setItem('admin_auth', 'true');
            setIsAuthenticated(true);
        } else {
            alert('Invalid password');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                                placeholder="Enter admin password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
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
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col fixed h-full bg-black z-10">
                <div className="mb-8">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Travel Admin
                    </h1>
                </div>

                <nav className="space-y-2 flex-1">
                    <Link
                        href="/admin"
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/create"
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === '/admin/create' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Plus size={20} />
                        Add Destination
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
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
