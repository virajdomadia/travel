
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();
                if (data.user) {
                    setUser(data.user);
                } else {
                    router.push('/');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading...</div>;
    if (!user) return null;

    return (
        <main className="min-h-screen bg-slate-900 pt-32 pb-16 px-6">
            <div className="max-w-3xl mx-auto bg-slate-800 border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl text-white font-bold uppercase shadow-lg shadow-primary/20">
                        {user.username.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">{user.username}</h1>
                        <p className="text-slate-400">{user.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase text-slate-300">
                            {user.role} Account
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            Account Settings
                        </h3>
                        <div className="grid gap-4">
                            <button className="bg-white/5 border border-white/10 p-4 rounded-xl text-left text-slate-300 hover:bg-white/10 transition-colors flex justify-between group">
                                <span>Change Password</span>
                                <span className="text-slate-500 group-hover:text-white transition-colors">→</span>
                            </button>
                            <button className="bg-white/5 border border-white/10 p-4 rounded-xl text-left text-slate-300 hover:bg-white/10 transition-colors flex justify-between group">
                                <span>Email Preferences</span>
                                <span className="text-slate-500 group-hover:text-white transition-colors">→</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4 mt-8">Danger Zone</h3>
                        <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
