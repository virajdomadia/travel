"use client";

import PackageForm from "@/components/admin/PackageForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditDestinationPage() {
    const params = useParams();
    const [destination, setDestination] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const res = await fetch(`/api/destinations/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setDestination(data);
                } else {
                    console.error("Failed to fetch destination");
                }
            } catch (error) {
                console.error("Error fetching destination", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchDestination();
        }
    }, [params.id]);

    if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
    if (!destination) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Destination not found</div>;

    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Package</h1>
                    <p className="text-slate-400">Update details for {destination.name}.</p>
                </div>

                <PackageForm initialData={destination} isEdit={true} />
            </div>
        </main>
    );
}
