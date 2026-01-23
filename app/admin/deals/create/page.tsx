"use client";

import DealForm from '@/components/admin/DealForm';

export default function CreateDealPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
                Create New Deal
            </h1>
            <DealForm />
        </div>
    );
}
