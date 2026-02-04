
import { NextResponse } from 'next/server';
import dbData from '@/app/lib/db';
import Package from '@/app/lib/models/Package';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbData();

        const updates = [
            {
                name: 'Bhutan Himalayan Experience',
                image: 'https://images.unsplash.com/photo-1605634502035-7c9d72728fba?auto=format&fit=crop&w=800'
            },
            {
                name: 'Meghalaya – Abode of Clouds',
                image: 'https://images.unsplash.com/photo-1518002171953-a080ee802e12?auto=format&fit=crop&w=800'
            }
        ];

        const results = [];

        for (const update of updates) {
            const result = await Package.updateOne(
                { name: update.name },
                { $set: { image: update.image } }
            );
            results.push({ name: update.name, modified: result.modifiedCount, newImage: update.image });
        }

        return NextResponse.json({ success: true, results });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
