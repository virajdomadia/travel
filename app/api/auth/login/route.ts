import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import User from '@/app/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const { username, password } = await request.json();

        // Allow login with username or email
        const user = await User.findOne({
            $or: [{ username }, { email: username }]
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Ideally, use JWT or session here. for this quick implementation,
        // we'll return success and let client handle "session" in localstorage 
        // (as it was before, but now verified against DB)
        // A better approach would be HttpOnly cookie.

        return NextResponse.json({ message: 'Login successful', username: user.username });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
