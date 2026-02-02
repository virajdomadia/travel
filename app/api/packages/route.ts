import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import Package from '@/app/lib/models/Package';

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectToDatabase();
        const packages = await Package.find({});
        return NextResponse.json(packages);
    } catch (error) {
        console.error('Failed to fetch packages:', error);
        return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
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

        // Check for existing ID
        const existing = await Package.findOne({ id: body.id });
        if (existing) {
            return NextResponse.json({ error: 'A package with this generated ID already exists. Please change the title.' }, { status: 400 });
        }

        const newPackage = await Package.create(body);
        return NextResponse.json(newPackage, { status: 201 });
    } catch (error) {
        console.error('Failed to create package:', error);
        return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
    }
}
