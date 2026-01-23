
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>({
        totalRevenue: 0,
        totalBookings: 0,
        destinations: {},
        recentBookings: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Need to pass admin=true to bypass user filter
            const res = await fetch('/api/bookings?admin=true');
            const data = await res.json();

            if (Array.isArray(data)) {
                // Calculate Stats
                const totalRevenue = data.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
                const totalBookings = data.length;

                const destinations: Record<string, number> = {};
                data.forEach(b => {
                    destinations[b.tourName] = (destinations[b.tourName] || 0) + 1;
                });

                setStats({
                    totalRevenue,
                    totalBookings,
                    destinations,
                    recentBookings: data.slice(0, 10)
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading Dashboard...</div>;

    // Simulate Chart Data (Width percentages)
    const maxBookings = Math.max(...Object.values(stats.destinations as Record<string, number>), 1);

    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Operations Center</h1>
                        <p className="text-slate-400">Real-time metrics and booking oversight.</p>
                    </div>
                    <button onClick={fetchStats} className="btn bg-white/10 text-white">Refresh Data</button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-slate-800 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Total Revenue</h3>
                        <div className="text-3xl font-bold text-emerald-400">₹{stats.totalRevenue.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-800 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Total Bookings</h3>
                        <div className="text-3xl font-bold text-white">{stats.totalBookings}</div>
                    </div>
                    <div className="bg-slate-800 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Conversion Rate</h3>
                        <div className="text-3xl font-bold text-cyan-400">3.2%</div>
                        <div className="text-xs text-slate-500 mt-1">Simulated Metric</div>
                    </div>
                    <div className="bg-slate-800 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Pending Actions</h3>
                        <div className="text-3xl font-bold text-amber-400">0</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Bookings Table */}
                    <div className="lg:col-span-2 bg-slate-800 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-6 flex justify-between items-center">
                            Recent Bookings
                            <button className="text-primary text-sm hover:underline">Export CSV</button>
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="border-b border-white/10 text-xs uppercase bg-white/5">
                                    <tr>
                                        <th className="p-3 rounded-tl-lg">ID</th>
                                        <th className="p-3">Customer</th>
                                        <th className="p-3">Tour</th>
                                        <th className="p-3">Amount</th>
                                        <th className="p-3 rounded-tr-lg">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentBookings.map((booking: any) => (
                                        <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-3 font-mono">{booking._id?.slice(-6)}</td>
                                            <td className="p-3 font-medium text-white">{booking.fullName}</td>
                                            <td className="p-3">{booking.tourName}</td>
                                            <td className="p-3">₹{booking.totalAmount?.toLocaleString()}</td>
                                            <td className="p-3 px-2">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                                                        booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                                                            'bg-amber-500/10 text-amber-500'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Popular Destinations Chart */}
                    <div className="bg-slate-800 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-6">Popular Destinations</h3>
                        <div className="space-y-4">
                            {Object.entries(stats.destinations).map(([name, count]: any) => (
                                <div key={name}>
                                    <div className="flex justify-between text-sm text-slate-300 mb-1">
                                        <span>{name}</span>
                                        <span>{count}</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(count / maxBookings) * 100}%` }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                            ))}
                            {Object.keys(stats.destinations).length === 0 && (
                                <p className="text-slate-500 italic text-center py-8">No booking data yet</p>
                            )}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <h3 className="text-white font-bold mb-4">Traffic Source</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-32 h-32 rounded-full border-4 border-slate-700 relative flex items-center justify-center">
                                    <span className="text-xs text-slate-400">Direct</span>
                                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-l-transparent border-b-transparent rotate-45" />
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                                        <span>Organic (65%)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <div className="w-3 h-3 bg-slate-700 rounded-full" />
                                        <span>Paid (35%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
