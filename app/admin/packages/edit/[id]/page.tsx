"use client";

import PackageForm from "@/components/admin/PackageForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditPackagePage() {
    const params = useParams();
    const [packageData, setPackageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.id) {
            fetch(`/api/packages/${params.id}`)
                .then(res => res.json())
                .then(data => {
                    setPackageData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [params?.id]);

    if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;

    if (!packageData) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Package not found</div>;

    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Package</h1>
                    <p className="text-slate-400">Update package details.</p>
                </div>

                <PackageForm initialData={packageData} isEdit={true} />
            </div>
        </main>
    );
}
