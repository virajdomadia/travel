import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Booking from '@/app/lib/models/Booking';
import { sendBookingConfirmationEmail } from '@/app/lib/email';
import { URL } from 'url';

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        const email = searchParams.get('email'); // Fallback for guest lookups if needed

        let query = {};
        if (username) {
            // In a real app we'd query by ID, but for this session-based auth:
            // We can store username in the booking, or assume username lookup.
            // Let's rely on finding bookings where 'userId' matches the username 
            // (since we're using username as the ID in our simplified session)
            query = { userId: username };
        }

        const bookings = await Booking.find(query).sort({ createdAt: -1 });
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        // Ensure status is pending initially
        const bookingData = {
            ...body,
            status: 'pending'
        };

        const newBooking = await Booking.create(bookingData);

        // Send Email
        await sendBookingConfirmationEmail(newBooking.email, newBooking);

        return NextResponse.json({ message: 'Booking confirmed', booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
