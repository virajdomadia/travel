import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Destination from '@/app/lib/models/Destination';
import { destinations } from '@/app/lib/data';

export async function POST() {
    try {
        await connectToDatabase();

        // Clear existing data (optional, or just upsert)
        // await Destination.deleteMany({});

        // Upsert destinations based on 'id'
        for (const place of destinations) {
            await Destination.findOneAndUpdate(
                { id: place.id },
                place,
                { upsert: true, new: true }
            );
        }

        return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}
