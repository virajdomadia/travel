import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Destination from '@/app/lib/models/Destination';

export async function GET() {
    try {
        await connectToDatabase();
        const destinations = await Destination.find({});
        return NextResponse.json(destinations);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectToDatabase();

        const newDestination = await Destination.create(body);
        return NextResponse.json(newDestination, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
    }
}
