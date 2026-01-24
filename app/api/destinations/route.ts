import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Destination from '@/app/lib/models/Destination';

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectToDatabase();
        const destinations = await Destination.find({});
        return NextResponse.json(destinations);
    } catch (error) {
        console.error('Failed to fetch destinations:', error);
        return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();

        // Basic validation
        if (!body.id || !body.name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const destination = await Destination.create(body);
        return NextResponse.json(destination, { status: 201 });
    } catch (error) {
        console.error('Failed to create destination:', error);
        return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
    }
}
