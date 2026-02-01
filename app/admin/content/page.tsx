"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Layout, Palette, Type, Globe } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const TABS = [
    { id: 'content', label: 'Page Content', icon: Layout },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'branding', label: 'Branding', icon: Globe },
];

const COMMON_FONTS = [
    "Inter", "Roboto", "Open Sans", "Lato", "Poppins",
    "Montserrat", "Oswald", "Raleway", "Nunito", "Dancing Script"
];

export default function AdminContentPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('content');
    const [content, setContent] = useState<any>({
        hero: { title: "", subtitle: "", bgImage: "" },
        about: { title: "", description: "", image: "" },
        contact: { email: "", phone: "", address: "", socials: { instagram: "", twitter: "", facebook: "" } },
        theme: {
            primaryColor: "#3b82f6", secondaryColor: "#f97316", accentColor: "#10b981",
            backgroundColor: "#0f172a", textColor: "#ffffff",
            fontHeading: "Inter", fontBody: "Inter", radius: "0.5rem"
        },
        branding: { siteName: "", logoUrl: "", faviconUrl: "" }
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
                            ...prev[section]?.[nested],
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
                alert("Site settings updated successfully! Refresh your site to see changes.");
            } else {
                alert("Failed to update settings.");
            }
        } catch (err) {
            console.error(err);
            alert("Error saving settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/admin" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold">Site Configuration</h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn btn-primary flex items-center gap-2 px-6 py-3 rounded-xl disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto pb-2">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-t-xl transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? "bg-slate-800 text-primary border-b-2 border-primary font-medium"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-8">
                    {/* Content Tab */}
                    {activeTab === 'content' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <section className="bg-slate-800 p-6 rounded-2xl border border-white/10">
                                <h2 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                                    <Palette size={20} /> Color Palette
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        { label: 'Primary Color', key: 'primaryColor' },
                                        { label: 'Secondary Color', key: 'secondaryColor' },
                                        { label: 'Accent Color', key: 'accentColor' },
                                        { label: 'Background Color', key: 'backgroundColor' },
                                        { label: 'Text Color', key: 'textColor' },
                                    ].map((color) => (
                                        <div key={color.key} className="bg-slate-900 p-4 rounded-xl border border-white/5">
                                            <label className="block text-sm font-medium text-slate-400 mb-3">{color.label}</label>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="color"
                                                    value={content.theme?.[color.key] || '#000000'}
                                                    onChange={(e) => handleChange("theme", color.key, e.target.value)}
                                                    className="h-10 w-20 rounded cursor-pointer bg-transparent border-none p-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={content.theme?.[color.key] || ''}
                                                    onChange={(e) => handleChange("theme", color.key, e.target.value)}
                                                    className="flex-1 bg-slate-800 border border-white/10 rounded-lg p-2 text-white text-sm font-mono uppercase"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-slate-800 p-6 rounded-2xl border border-white/10">
                                <h2 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                                    <Type size={20} /> Typography
                                    <span className="text-xs font-normal text-slate-400 ml-2 bg-slate-700 px-2 py-1 rounded-full">Google Fonts</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Heading Font</label>
                                        <select
                                            value={content.theme?.fontHeading}
                                            onChange={(e) => handleChange("theme", "fontHeading", e.target.value)}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        >
                                            {COMMON_FONTS.map(font => (
                                                <option key={font} value={font}>{font}</option>
                                            ))}
                                        </select>
                                        <p className="mt-2 text-2xl" style={{ fontFamily: content.theme?.fontHeading }}>
                                            The quick brown fox jumps over the lazy dog.
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Body Font</label>
                                        <select
                                            value={content.theme?.fontBody}
                                            onChange={(e) => handleChange("theme", "fontBody", e.target.value)}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        >
                                            {COMMON_FONTS.map(font => (
                                                <option key={font} value={font}>{font}</option>
                                            ))}
                                        </select>
                                        <p className="mt-2 text-base text-slate-400" style={{ fontFamily: content.theme?.fontBody }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-slate-800 p-6 rounded-2xl border border-white/10">
                                <h2 className="text-xl font-bold mb-6 text-primary">Styling Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Border Radius</label>
                                        <select
                                            value={content.theme?.radius}
                                            onChange={(e) => handleChange("theme", "radius", e.target.value)}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        >
                                            <option value="0rem">None (0px)</option>
                                            <option value="0.25rem">Small (4px)</option>
                                            <option value="0.5rem">Medium (8px)</option>
                                            <option value="0.75rem">Large (12px)</option>
                                            <option value="1rem">Extra Large (16px)</option>
                                            <option value="9999px">Full (Round)</option>
                                        </select>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* Branding Tab */}
                    {activeTab === 'branding' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <section className="bg-slate-800 p-6 rounded-2xl border border-white/10">
                                <h2 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                                    <Globe size={20} /> Identity
                                </h2>
                                <div className="grid gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Site Name</label>
                                        <input
                                            type="text"
                                            value={content.branding?.siteName}
                                            onChange={(e) => handleChange("branding", "siteName", e.target.value)}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                            placeholder="e.g. TravelDCT"
                                        />
                                        <p className="text-sm text-slate-500 mt-1">Updates the browser tab title and default headers.</p>
                                    </div>
                                    <div>
                                        <ImageUpload
                                            label="Website Logo"
                                            value={content.branding?.logoUrl || ''}
                                            onChange={(val) => handleChange("branding", "logoUrl", val)}
                                        />
                                    </div>
                                    <div>
                                        <ImageUpload
                                            label="Favicon (Icon)"
                                            value={content.branding?.faviconUrl || ''}
                                            onChange={(val) => handleChange("branding", "faviconUrl", val)}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
