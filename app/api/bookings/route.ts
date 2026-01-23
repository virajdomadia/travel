import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Booking from '@/app/lib/models/Booking';

export async function GET() {
    try {
        await connectToDatabase();
        const bookings = await Booking.find({}).sort({ createdAt: -1 });
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

        // Basic validation could go here

        const newBooking = await Booking.create(body);
        return NextResponse.json({ message: 'Booking confirmed', booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
