"use client";

import DestinationForm from '@/components/admin/DestinationForm';

export default function CreateDestinationPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
                Add New Destination
            </h1>
            <DestinationForm />
        </div>
    );
}
