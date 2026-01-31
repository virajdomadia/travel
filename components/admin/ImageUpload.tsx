"use client";
import { useState } from 'react';

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
    const [imageError, setImageError] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 4 * 1024 * 1024) { // 4MB
            alert("File is too large. Max 4MB allowed.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageError(false); // Reset error on new upload
            onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full">
            {label && <label className="block text-gray-400 mb-2 text-sm">{label}</label>}

            {value && !imageError && (
                <div className="mb-4 relative w-full h-64 rounded-xl overflow-hidden border border-white/10 group bg-slate-900">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <label className="flex-1 w-full md:w-auto cursor-pointer">
                    <div className="bg-white/5 border border-dashed border-white/20 rounded-lg p-6 text-center hover:bg-white/10 transition-colors">
                        <div className="text-2xl mb-2">📷</div>
                        <span className="text-sm text-slate-400 font-medium">Click to Upload</span>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                <div className="hidden md:block text-slate-600">OR</div>

                <div className="flex-1 w-full md:w-auto">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                            if (e.target.value !== value) setImageError(false);
                            onChange(e.target.value);
                        }}
                        placeholder="Paste Image URL..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-600"
                    />
                </div>
            </div>
        </div>
    );
}
