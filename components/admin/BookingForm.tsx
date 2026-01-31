"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function BookingForm({ initialData, isEdit = false }: BookingFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        fullName: initialData?.fullName || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        tourName: initialData?.tourName || '',
        travelers: initialData?.travelers || 1,
        date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
        totalAmount: initialData?.totalAmount || 0,
        status: initialData?.status || 'pending',
        userId: initialData?.userId || 'manual-entry', // Default for manual
        basePrice: initialData?.basePrice || '0' // Hidden field required by schema
    });

    useEffect(() => {
        // Fetch packages for dropdown
        const fetchPackages = async () => {
            try {
                const res = await fetch('/api/destinations');
                if (res.ok) {
                    const data = await res.json();
                    setPackages(data);
                }
            } catch (err) {
                console.error("Failed to load packages", err);
            }
        };
        fetchPackages();
    }, []);

    // Auto-calculate price when package/travelers change
    useEffect(() => {
        if (!isEdit && formData.tourName && packages.length > 0) {
            const selectedPackage = packages.find(p => p.name === formData.tourName);
            if (selectedPackage) {
                // simple parse: "₹50,000" -> 50000
                const priceNum = parseInt(selectedPackage.price.replace(/[^0-9]/g, '')) || 0;
                setFormData(prev => ({
                    ...prev,
                    basePrice: selectedPackage.price,
                    totalAmount: priceNum * prev.travelers
                }));
            }
        }
    }, [formData.tourName, formData.travelers, packages, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit ? `/api/bookings/${initialData._id}` : '/api/bookings';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/admin/bookings');
                router.refresh();
            } else {
                alert('Failed to save booking');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving booking');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Customer Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none bg-slate-900"
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="md:col-span-2 border-t border-white/10 pt-6 mt-2">
                    <h3 className="text-lg font-bold text-white mb-4">Trip Details</h3>
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Select Package</label>
                    <select
                        name="tourName"
                        value={formData.tourName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none bg-slate-900"
                    >
                        <option value="">-- Select Package --</option>
                        {packages.map(p => (
                            <option key={p.id} value={p.name}>{p.name} ({p.price})</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Trip Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none [color-scheme:dark]"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Travelers</label>
                    <input
                        type="number"
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Total Amount (Auto-Calculated)</label>
                    <input
                        type="number"
                        name="totalAmount"
                        value={formData.totalAmount}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold text-emerald-400"
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
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all disabled:opacity-50"
                >
                    {loading ? 'Saving...' : (isEdit ? 'Update Booking' : 'Create Booking')}
                </button>
            </div>
        </form>
    );
}
