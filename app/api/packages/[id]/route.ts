import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Package from '@/app/lib/models/Package';

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const id = params.id;
        const result = await Package.findOne({ id: id });

        if (!result) {
            return NextResponse.json({ error: 'Package not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Failed to fetch package:', error);
        return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
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

        const updatedPackage = await Package.findOneAndUpdate(
            { id: id },
            body,
            { new: true }
        );

        if (!updatedPackage) {
            return NextResponse.json({ error: 'Package not found' }, { status: 404 });
        }

        return NextResponse.json(updatedPackage);
    } catch (error) {
        console.error('Failed to update package:', error);
        return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const id = params.id;

        const deletedPackage = await Package.findOneAndDelete({ id: id });

        if (!deletedPackage) {
            return NextResponse.json({ error: 'Package not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Package deleted successfully' });
    } catch (error) {
        console.error('Failed to delete package:', error);
        return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
    }
}
