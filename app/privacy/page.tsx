
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | 7 Fold Wonders',
    description: 'How we handle and protect your data.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-slate-900 pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-8 text-slate-300">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, make a booking, or contact customer support. This includes your name, email, phone number, and payment information.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
                    <p>We use your information to facilitate bookings, send confirmations, provide customer support, and improve our services.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Data Sharing</h2>
                    <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., to hotels and activity providers for your booking) or as required by law.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Security</h2>
                    <p>We employ industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
                </section>

                <p className="text-sm text-slate-500 pt-8">Last Updated: January 2026</p>
            </div>
        </main>
    );
}
