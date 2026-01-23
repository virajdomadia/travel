
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import shortid from 'shortid';

// Initialize Razorpay
// Note: In real app, put these in .env.local
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourSecretHere',
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, currency = 'INR' } = body;

        const payment_capture = 1;
        const options = {
            amount: (amount * 100).toString(), // Razorpay expects amount in paise
            currency,
            receipt: shortid.generate(),
            payment_capture,
        };

        const response = await razorpay.orders.create(options);

        return NextResponse.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });

    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
