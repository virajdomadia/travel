
import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Review from '@/app/lib/models/Review';
import { getSession } from '@/app/lib/auth';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const destinationId = searchParams.get('destinationId');

        await connectToDatabase();

        let query = {};
        if (destinationId) query = { destinationId };

        const reviews = await Review.find(query).sort({ createdAt: -1 });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        if (!body.destinationId || !body.rating || !body.comment) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        await connectToDatabase();

        const sessionData = session as any;

        const newReview = await Review.create({
            userId: sessionData.id || sessionData.username, // Fallback if ID not in token
            username: sessionData.username,
            destinationId: body.destinationId,
            rating: body.rating,
            comment: body.comment,
        });

        return NextResponse.json({ message: 'Review added', review: newReview });

    } catch (error) {
        console.error('Review error:', error);
        return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
    }
}
