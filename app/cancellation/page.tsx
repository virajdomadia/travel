
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cancellation Policy | 7 Fold Wonders',
    description: 'Our cancellation and refund policies.',
};

export default function CancellationPage() {
    return (
        <main className="min-h-screen bg-slate-900 pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-8 text-slate-300">
                <h1 className="text-4xl font-bold text-white mb-8">Cancellation & Refund Policy</h1>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">1. Cancellation by You</h2>
                    <p>You may cancel your booking at any time. Cancellation fees apply as follows:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>More than 30 days before departure: Full refund less administrative fee.</li>
                        <li>15-30 days before departure: 50% refund.</li>
                        <li>Less than 15 days before departure: No refund.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">2. Cancellation by Us</h2>
                    <p>In the unlikely event that we must cancel a trip due to unforeseen circumstances (e.g., natural disasters), you will receive a full refund of all amounts paid to us.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">3. Refund Process</h2>
                    <p>Refunds are processed within 7-10 business days to the original method of payment.</p>
                </section>

                <p className="text-sm text-slate-500 pt-8">Last Updated: January 2026</p>
            </div>
        </main>
    );
}
