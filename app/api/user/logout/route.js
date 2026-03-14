import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        (await cookies()).delete('user_token');
        return NextResponse.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
