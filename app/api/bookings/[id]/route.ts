import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Booking from '@/app/lib/models/Booking';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const id = params.id;
        const body = await request.json();

        // Allow updating status or other fields
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );

        if (!updatedBooking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error('Failed to update booking:', error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const id = params.id;

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Failed to delete booking:', error);
        return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
    }
}
