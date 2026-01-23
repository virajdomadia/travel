"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Tag, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function DealsPage() {
    const [deals, setDeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await fetch('/api/deals');
                const data = await response.json();
                setDeals(data);
            } catch (error) {
                console.error('Error fetching deals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this deal?')) return;
        try {
            const res = await fetch(`/api/deals/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setDeals(prev => prev.filter(d => d._id !== id));
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Manage Deals
                </h2>
                <Link
                    href="/admin/deals/create"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                >
                    + Add New Deal
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map((deal) => (
                    <div key={deal._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                        <div className="relative h-40">
                            {/* Ideally use Next Image, but simpler for now */}
                            <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                Save ₹{deal.originalPrice - deal.discountedPrice}
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-white mb-2">{deal.title}</h3>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                <Calendar size={14} />
                                Expires: {format(new Date(deal.expires), 'MMM d, yyyy')}
                            </div>

                            <div className="flex justify-between items-center border-t border-white/10 pt-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 line-through">₹{deal.originalPrice}</span>
                                    <span className="text-lg font-bold text-purple-400">₹{deal.discountedPrice}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/admin/deals/edit/${deal._id}`} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg">
                                        <Edit size={16} />
                                    </Link>
                                    <button onClick={() => handleDelete(deal._id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {deals.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                    No active deals. Add one to get started.
                </div>
            )}
        </div>
    );
}
