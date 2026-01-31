import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Booking from '@/app/lib/models/Booking';
import { getSession } from '@/app/lib/auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const booking = await Booking.findById(params.id);
        if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

        // Authorization check: Admin or Owner
        if ((session as any).role !== 'admin' && booking.userId !== (session as any).username) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const session = await getSession();
        if (!session || (session as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const updatedBooking = await Booking.findByIdAndUpdate(params.id, body, { new: true });

        if (!updatedBooking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const session = await getSession();
        if (!session || (session as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const deletedBooking = await Booking.findByIdAndDelete(params.id);
        if (!deletedBooking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

        return NextResponse.json({ message: 'Booking deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
