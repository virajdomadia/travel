"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DestinationFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function DestinationForm({ initialData, isEdit = false }: DestinationFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: initialData?.id || '',
        name: initialData?.name || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        image: initialData?.image || '/hero.png',
        rating: initialData?.rating || 5,
        duration: initialData?.duration || '',
        lat: initialData?.lat || 0,
        lng: initialData?.lng || 0,
        category: initialData?.category || 'relax',
        tags: initialData?.tags?.join(', ') || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            rating: Number(formData.rating),
            lat: Number(formData.lat),
            lng: Number(formData.lng),
            tags: formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t),
        };

        try {
            const url = isEdit
                ? `/api/destinations/${formData.id}`
                : '/api/destinations';

            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to save'}`);
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Unique ID (e.g., 'paris')</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        disabled={isEdit}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-gray-400 mb-2 text-sm">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Price (String, e.g. ₹50,000)</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Duration (e.g. 5 Days)</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="relax" className="text-black">Relax</option>
                        <option value="adventure" className="text-black">Adventure</option>
                        <option value="culture" className="text-black">Culture</option>
                        <option value="luxury" className="text-black">Luxury</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Rating (0-5)</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        max="5"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Latitude</label>
                    <input
                        type="number"
                        name="lat"
                        value={formData.lat}
                        onChange={handleChange}
                        step="any"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Longitude</label>
                    <input
                        type="number"
                        name="lng"
                        value={formData.lng}
                        onChange={handleChange}
                        step="any"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-gray-400 mb-2 text-sm">Image URL (Public Path)</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-gray-400 mb-2 text-sm">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="beach, mountains, solo"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
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
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? 'Saving...' : (isEdit ? 'Update Destination' : 'Create Destination')}
                </button>
            </div>
        </form>
    );
}
