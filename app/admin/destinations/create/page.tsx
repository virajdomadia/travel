"use client";

import PackageForm from "@/components/admin/PackageForm";

export default function CreateDestinationPage() {
    return (
        <main className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create New Package</h1>
                    <p className="text-slate-400">Add a new destination to your portfolio.</p>
                </div>

                <PackageForm />
            </div>
        </main>
    );
}
