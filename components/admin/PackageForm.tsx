"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';

interface DestinationFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function PackageForm({ initialData, isEdit = false }: DestinationFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: initialData?.id || '',
        name: initialData?.name || '',
        price: initialData?.price || '',
        image: initialData?.image || '',
        duration: initialData?.duration || '',
        date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'price') {
            // Remove non-digits
            const rawValue = value.replace(/[^0-9]/g, '');
            if (rawValue) {
                // Format: ₹XX,XXX
                const formatted = '₹' + new Intl.NumberFormat('en-IN').format(parseInt(rawValue));
                setFormData(prev => ({ ...prev, [name]: formatted }));
            } else {
                setFormData(prev => ({ ...prev, [name]: '' }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
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
                {/* ID Field Removed - Auto Generated */}
                <div className="hidden">
                    <input type="hidden" name="id" value={formData.id} />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Title</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
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
                    <label className="block text-gray-400 mb-2 text-sm">Days (e.g. 5)</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Tour Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none [color-scheme:dark]"
                    />
                </div>

                <div className="md:col-span-2">
                    <ImageUpload
                        label="Destination Image"
                        value={formData.image}
                        onChange={(val) => setFormData(prev => ({ ...prev, image: val }))}
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
                    {loading ? 'Saving...' : (isEdit ? 'Update Package' : 'Create Package')}
                </button>
            </div>
        </form>
    );
}
