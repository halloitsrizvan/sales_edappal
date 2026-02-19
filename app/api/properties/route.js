
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const properties = await Property.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: properties });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const property = await Property.create(body);
        return NextResponse.json({ success: true, data: property }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
