import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Booking from '@/app/lib/models/Booking';
import { sendBookingConfirmationEmail } from '@/app/lib/email';
import { getSession } from '@/app/lib/auth';
import { URL } from 'url';

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const isAdminRequest = searchParams.get('admin') === 'true';

        let query = {};

        if (isAdminRequest) {
            // Verify admin role
            if ((session as any).role !== 'admin') {
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }
            query = {}; // Admin sees all matches
        } else {
            // Regular users can ONLY see their own bookings
            query = { userId: (session as any).username };
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

        const session = await getSession();

        // Ensure status is pending initially
        // If user is logged in, force the userId to match the session to prevent spoofing
        const bookingData = {
            ...body,
            userId: session ? (session as any).username : body.userId, // Trust session over body if logged in
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
