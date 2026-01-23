"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DealFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function DealForm({ initialData, isEdit = false }: DealFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        originalPrice: initialData?.originalPrice || '',
        discountedPrice: initialData?.discountedPrice || '',
        image: initialData?.image || '/hero.png',
        expires: initialData?.expires ? new Date(initialData.expires).toISOString().split('T')[0] : '',
        features: initialData?.features?.join(', ') || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            originalPrice: Number(formData.originalPrice),
            discountedPrice: Number(formData.discountedPrice),
            features: formData.features.split(',').map((t: string) => t.trim()).filter((t: string) => t),
        };

        try {
            const url = isEdit
                ? `/api/deals/${initialData._id}`
                : '/api/deals';

            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                router.push('/admin/deals');
                router.refresh();
            } else {
                alert('Failed to save deal');
            }
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-gray-400 mb-2 text-sm">Deal Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Original Price (₹)</label>
                    <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Discounted Price (₹)</label>
                    <input
                        type="number"
                        name="discountedPrice"
                        value={formData.discountedPrice}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Expiration Date</label>
                    <input
                        type="date"
                        name="expires"
                        value={formData.expires}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-gray-400 mb-2 text-sm">Features (comma separated)</label>
                    <input
                        type="text"
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                        placeholder="Houseboat Stay, All Meals, Free Wifi"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-all disabled:opacity-50"
                >
                    {loading ? 'Saving...' : (isEdit ? 'Update Deal' : 'Create Deal')}
                </button>
            </div>
        </form>
    );
}
