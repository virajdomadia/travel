import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Deal from '@/app/lib/models/Deal';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const deal = await Deal.findById(params.id);

        if (!deal) {
            return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
        }

        return NextResponse.json(deal);
    } catch (error) {
        console.error('Failed to fetch deal:', error);
        return NextResponse.json({ error: 'Failed to fetch deal' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const body = await request.json();

        const updatedDeal = await Deal.findByIdAndUpdate(
            params.id,
            { $set: body },
            { new: true }
        );

        if (!updatedDeal) {
            return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
        }

        return NextResponse.json(updatedDeal);
    } catch (error) {
        console.error('Failed to update deal:', error);
        return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();

        const deletedDeal = await Deal.findByIdAndDelete(params.id);

        if (!deletedDeal) {
            return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Deal deleted successfully' });
    } catch (error) {
        console.error('Failed to delete deal:', error);
        return NextResponse.json({ error: 'Failed to delete deal' }, { status: 500 });
    }
}
