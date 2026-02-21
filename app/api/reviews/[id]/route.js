
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const review = await Review.findByIdAndUpdate(id, body, { new: true });
        if (!review) return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: review });
    } catch (error) {
        console.error('Review PUT Error:', error);
        return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const review = await Review.findByIdAndDelete(id);
        if (!review) return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });

        return NextResponse.json({ success: true, message: 'Review deleted' });
    } catch (error) {
        console.error('Review DELETE Error:', error);
        return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
    }
}
