"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2, MapPin, Star } from 'lucide-react';
import Image from 'next/image';

interface Destination {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: number;
    category: string;
}

export default function AdminDashboard() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await fetch('/api/destinations');
            const data = await response.json();
            if (Array.isArray(data)) {
                setDestinations(data);
            }
        } catch (error) {
            console.error('Error fetching destinations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this destination?')) return;

        try {
            const response = await fetch(`/api/destinations/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setDestinations(prev => prev.filter(d => d.id !== id));
            } else {
                alert('Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const handleSeed = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/seed', { method: 'POST' });
            if (response.ok) {
                await fetchDestinations();
                alert('Database seeded successfully!');
            }
        } catch (error) {
            console.error('Error seeding:', error);
            alert('Failed to seed database');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-white text-center mt-20">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Dashboard
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={handleSeed}
                        className="px-4 py-2 text-sm text-yellow-500 hover:bg-yellow-500/10 border border-yellow-500/20 rounded-lg transition-colors"
                    >
                        Reset / Seed Data
                    </button>
                    <Link
                        href="/admin/create"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                        + Add New
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination) => (
                    <div key={destination.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
                        <div className="relative h-48 w-full">
                            <Image
                                src={destination.image}
                                alt={destination.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white border border-white/10">
                                {destination.category}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                    <Star size={14} fill="currentColor" />
                                    {destination.rating}
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                                {destination.description}
                            </p>

                            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                <span className="text-blue-400 font-bold">{destination.price}</span>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/edit/${destination.id}`}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(destination.id)}
                                        className="p-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {destinations.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">No destinations found.</p>
                    <p className="text-sm mt-2">Click "Reset / Seed Data" to load sample content.</p>
                </div>
            )}
        </div>
    );
}
