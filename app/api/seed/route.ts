import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Destination from '@/app/lib/models/Destination';

export async function GET() {
    try {
        // Test 1: Can we import data?
        const { destinations } = await import('@/app/lib/data');

        // Test 2: Find Kerala
        const kerala = destinations.find(d => d.id === 'kerala-backwaters');

        return NextResponse.json({
            totalDestinations: destinations.length,
            keralaFound: !!kerala,
            keralaHasItinerary: kerala?.itinerary?.length || 0,
            keralaHasGallery: kerala?.gallery?.length || 0,
            keralaItineraryPreview: kerala?.itinerary?.[0] || null
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}

export async function POST() {
    try {
        await connectToDatabase();

        // Import data
        const { destinations } = await import('@/app/lib/data');
        console.log('✓ Imported', destinations.length, 'destinations');

        // Find Kerala
        const kerala = destinations.find(d => d.id === 'kerala-backwaters');
        if (!kerala) {
            throw new Error('Kerala not found in data');
        }

        console.log('✓ Kerala found with', kerala.itinerary?.length, 'days');

        // Try to save just Kerala first
        try {
            const saved = await Destination.findOneAndUpdate(
                { id: 'kerala-backwaters' },
                kerala,
                { upsert: true, new: true, strict: false }
            );
            console.log('✓ Kerala saved successfully');
            console.log('Saved itinerary length:', saved.itinerary?.length);
        } catch (err: any) {
            console.error('✗ Error saving Kerala:', err.message);
            throw err;
        }

        // If Kerala works, save all
        let successCount = 0;
        let errorCount = 0;

        for (const place of destinations) {
            try {
                await Destination.findOneAndUpdate(
                    { id: place.id },
                    place,
                    { upsert: true, new: true, strict: false }
                );
                successCount++;
            } catch (err: any) {
                console.error(`✗ Error seeding ${place.id}:`, err.message);
                errorCount++;
            }
        }

        console.log(`✓ Seeded ${successCount}/${destinations.length} destinations`);

        return NextResponse.json({
            message: 'Database seeded',
            success: successCount,
            errors: errorCount,
            total: destinations.length
        });
    } catch (error: any) {
        console.error('✗ Seeding error:', error.message);
        return NextResponse.json({
            error: 'Failed to seed database',
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
