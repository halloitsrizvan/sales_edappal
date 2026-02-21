
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const isAdmin = searchParams.get('admin') === 'true';

        const query = {};
        if (!isAdmin) {
            query.showInPage = true;
        }

        const reviews = await Review.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: reviews });
    } catch (error) {
        console.error('Reviews GET Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const review = await Review.create(body);
        return NextResponse.json({ success: true, data: review }, { status: 201 });
    } catch (error) {
        console.error('Review POST Error:', error);
        return NextResponse.json({ success: false, message: 'Review submission failed' }, { status: 500 });
    }
}
