import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Deal from '@/app/lib/models/Deal';

export async function GET() {
    try {
        await connectToDatabase();
        const deals = await Deal.find({}).sort({ createdAt: -1 });
        return NextResponse.json(deals);
    } catch (error) {
        console.error('Failed to fetch deals:', error);
        return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();

        const deal = await Deal.create(body);
        return NextResponse.json(deal, { status: 201 });
    } catch (error) {
        console.error('Failed to create deal:', error);
        return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
    }
}
