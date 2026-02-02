"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SimplePackageCard from "@/components/SimplePackageCard";
import Footer from "@/components/Footer";

export default function PackagesPage() {
    const [packages, setPackages] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/packages')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPackages(data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <main className="min-h-screen bg-slate-900">
            <Navbar />
            <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">All Packages</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <SimplePackageCard key={pkg.id} destination={pkg} />
                    ))}
                </div>
                {packages.length === 0 && (
                    <p className="text-slate-400 text-center">Loading packages...</p>
                )}
            </section>
            <Footer />
        </main>
    );
}
