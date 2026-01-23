"use client";

import { useEffect, useState } from 'react';
import DestinationForm from '@/components/admin/DestinationForm';

export default function EditDestinationPage({ params }: { params: { id: string } }) {
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await fetch(`/api/destinations/${params.id}`);

                if (response.ok) {
                    const data = await response.json();
                    setDestination(data);
                } else {
                    console.error('Failed to fetch');
                }
            } catch (error) {
                console.error('Error fetching destination:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [params.id]);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    if (!destination) {
        return <div className="text-white">Destination not found</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
                Edit Destination
            </h1>
            <DestinationForm initialData={destination} isEdit={true} />
        </div>
    );
}
