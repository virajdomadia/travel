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
        const isAdmin = searchParams.get('admin') === 'true'; // Simple check for now

        let query = {};
        if (isAdmin) {
            query = {}; // No filter, return all
        } else if (username) {
            query = { userId: username };
        } else {
            // Return nothing if no user specified and not admin
            return NextResponse.json([]);
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
