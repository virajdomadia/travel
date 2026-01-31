"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminContentPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<any>({
        hero: { title: "", subtitle: "", bgImage: "" },
        about: { title: "", description: "", image: "" },
        contact: { email: "", phone: "", address: "", socials: { instagram: "", twitter: "", facebook: "" } }
    });

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/content');
                if (res.ok) {
                    const data = await res.json();
                    setContent(data);
                }
            } catch (err) {
                console.error("Failed to fetch content", err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const handleChange = (section: string, field: string, value: string, nested?: string) => {
        setContent((prev: any) => {
            if (nested) {
                return {
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [nested]: {
                            ...prev[section][nested],
                            [field]: value
                        }
                    }
                };
            }
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            };
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });

            if (res.ok) {
                alert("Site content updated successfully!");
            } else {
                alert("Failed to update content.");
            }
        } catch (err) {
            console.error(err);
            alert("Error saving content.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Site Content</h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn btn-primary flex items-center gap-2 px-6 py-3 rounded-xl disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Hero Section */}
                    <section className="bg-slate-800 p-6 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-4 text-primary">Hero Section</h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={content.hero?.title}
                                    onChange={(e) => handleChange("hero", "title", e.target.value)}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Subtitle</label>
                                <input
                                    type="text"
                                    value={content.hero?.subtitle}
                                    onChange={(e) => handleChange("hero", "subtitle", e.target.value)}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <ImageUpload
                                    label="Background Image"
                                    value={content.hero?.bgImage || ''}
                                    onChange={(val) => handleChange("hero", "bgImage", val)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="bg-slate-800 p-6 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-4 text-primary">About Us Section</h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={content.about?.title}
                                    onChange={(e) => handleChange("about", "title", e.target.value)}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                                <textarea
                                    value={content.about?.description}
                                    onChange={(e) => handleChange("about", "description", e.target.value)}
                                    rows={8}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <ImageUpload
                                    label="About Image"
                                    value={content.about?.image || ''}
                                    onChange={(val) => handleChange("about", "image", val)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="bg-slate-800 p-6 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-4 text-primary">Contact & Socials</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                <input
                                    type="text"
                                    value={content.contact?.email}
                                    onChange={(e) => handleChange("contact", "email", e.target.value)}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={content.contact?.phone}
                                    onChange={(e) => handleChange("contact", "phone", e.target.value)}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">Address</label>
                                <input
                                    type="text"
                                    value={content.contact?.address}
                                    onChange={(e) => handleChange("contact", "address", e.target.value)}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Instagram URL</label>
                                <input
                                    type="text"
                                    value={content.contact?.socials?.instagram}
                                    onChange={(e) => handleChange("contact", "instagram", e.target.value, "socials")}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Twitter URL</label>
                                <input
                                    type="text"
                                    value={content.contact?.socials?.twitter}
                                    onChange={(e) => handleChange("contact", "twitter", e.target.value, "socials")}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Facebook URL</label>
                                <input
                                    type="text"
                                    value={content.contact?.socials?.facebook}
                                    onChange={(e) => handleChange("contact", "facebook", e.target.value, "socials")}
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
