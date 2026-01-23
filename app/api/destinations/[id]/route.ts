import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Destination from '@/app/lib/models/Destination';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const id = params.id;
        const destination = await Destination.findOne({ id: id });

        if (!destination) {
            return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
        }

        return NextResponse.json(destination);
    } catch (error) {
        console.error('Failed to fetch destination:', error);
        return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 });
    }
}


export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const id = params.id;
        const body = await request.json();

        const updatedDestination = await Destination.findOneAndUpdate(
            { id: id },
            body,
            { new: true }
        );

        if (!updatedDestination) {
            return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
        }

        return NextResponse.json(updatedDestination);
    } catch (error) {
        console.error('Failed to update destination:', error);
        return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const id = params.id;

        const deletedDestination = await Destination.findOneAndDelete({ id: id });

        if (!deletedDestination) {
            return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Destination deleted successfully' });
    } catch (error) {
        console.error('Failed to delete destination:', error);
        return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
    }
}
