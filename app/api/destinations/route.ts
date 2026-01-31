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
        if (!body.name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Auto-generate ID if missing
        if (!body.id) {
            body.id = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        // Ensure uniqueness check might be needed or let DB throw error on unique index?
        // Let's check for existing ID to be safe and avoid 500 error
        const existing = await Destination.findOne({ id: body.id });
        if (existing) {
            return NextResponse.json({ error: 'A package with this generated ID already exists. Please change the title.' }, { status: 400 });
        }

        const destination = await Destination.create(body);
        return NextResponse.json(destination, { status: 201 });
    } catch (error) {
        console.error('Failed to create destination:', error);
        return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
    }
}
