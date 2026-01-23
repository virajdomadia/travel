
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | 7 Fold Wonders',
    description: 'Terms and conditions for using 7 Fold Wonders travel services.',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-900 pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-8 text-slate-300">
                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
                    <p>Welcome to 7 Fold Wonders. By accessing our website and booking our services, you agree to comply with and be bound by the following terms and conditions.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Booking Conditions</h2>
                    <p>All bookings are subject to availability and acceptance by us. A booking is confirmed only when you receive a confirmation email from us and a deposit or full payment has been received.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. User Responsibilities</h2>
                    <p>You agree to provide accurate and complete information when making a booking. You are responsible for ensuring that all travelers in your group meet the entry requirements for the destination country (e.g., passports, visas).</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">4. Payment Terms</h2>
                    <p>We accept payments via approved methods. Full payment is required before the start of the trip unless otherwise specified.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">5. Limitation of Liability</h2>
                    <p>7 Fold Wonders is not liable for any indirect, incidental, or consequential damages arising from the use of our services or potential trip disruptions outside our control.</p>
                </section>

                <p className="text-sm text-slate-500 pt-8">Last Updated: January 2026</p>
            </div>
        </main>
    );
}
