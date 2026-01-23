
import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import User from '@/app/lib/models/User';
import { getSession } from '@/app/lib/auth';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { destinationId } = await request.json();
        if (!destinationId) {
            return NextResponse.json({ error: 'Destination ID required' }, { status: 400 });
        }

        await connectToDatabase();

        // Find user and toggle
        const sessionData = session as any;
        const user = await User.findOne({ username: sessionData.username });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const index = user.wishlist.indexOf(destinationId);
        let action = '';

        if (index === -1) {
            user.wishlist.push(destinationId);
            action = 'added';
        } else {
            user.wishlist.splice(index, 1);
            action = 'removed';
        }

        await user.save();

        return NextResponse.json({ message: 'Wishlist updated', wishlist: user.wishlist, action });

    } catch (error) {
        console.error('Wishlist error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ wishlist: [] });
        }

        await connectToDatabase();
        const sessionData = session as any;
        const user = await User.findOne({ username: sessionData.username });

        return NextResponse.json({ wishlist: user?.wishlist || [] });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }
}
