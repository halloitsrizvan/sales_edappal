
import { NextResponse } from 'next/server';

export async function POST(request) {
    // Mock login
    const body = await request.json();
    const { email, password } = body;

    if (email === 'admin@salesedappal.com' && password === 'admin123') {
        return NextResponse.json({ success: true, token: 'mock-token-123' });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
