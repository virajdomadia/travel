"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Contact {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    destination: string;
    message: string;
    createdAt: string;
}

export default function AdminInquiries() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch("/api/admin/contacts");
                if (res.ok) {
                    const data = await res.json();
                    setContacts(data);
                }
            } catch (error) {
                console.error("Failed to fetch contacts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Inquiries</h1>
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">
                    &larr; Back to Dashboard
                </Link>
            </div>

            <div className="overflow-x-auto bg-slate-900 border border-white/10 rounded-xl shadow-xl">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950 text-xs uppercase text-slate-400">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Destination
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Additional Info
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{contact.name}</td>
                                <td className="px-6 py-4">{contact.mobile}</td>
                                <td className="px-6 py-4">{contact.destination}</td>
                                <td className="px-6 py-4">{contact.email}</td>
                                <td className="px-6 py-4 max-w-md truncate" title={contact.message}>
                                    {contact.message}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}

                        {contacts.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No inquiries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
