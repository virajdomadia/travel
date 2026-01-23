"use client";

import { useEffect, useState } from 'react';
import DealForm from '@/components/admin/DealForm';

export default function EditDealPage({ params }: { params: { id: string } }) {
    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeal = async () => {
            try {
                const response = await fetch(`/api/deals/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setDeal(data);
                }
            } catch (error) {
                console.error('Error fetching deal:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeal();
    }, [params.id]);

    if (loading) return <div className="text-white">Loading...</div>;
    if (!deal) return <div className="text-white">Deal not found</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
                Edit Deal
            </h1>
            <DealForm initialData={deal} isEdit={true} />
        </div>
    );
}
