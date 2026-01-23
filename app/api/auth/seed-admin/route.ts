import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import User from '@/app/lib/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await connectToDatabase();

        // check if admin already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            return NextResponse.json({ message: 'Admin already exists' });
        }

        // Create random strong password if you were automating this, 
        // but for this request "seed a admin user", I'll set a default one
        // and log it, or set a specific one requested by user (none requested, so I pick one).
        // Let's use a strong default but simple enough to communicate: 'admin123' (hashed)
        // OR better: 'TravelAdmin2024!'

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const newAdmin = await User.create({
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });

        return NextResponse.json({ message: 'Admin seeded successfully' });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Failed to seed admin' }, { status: 500 });
    }
}
