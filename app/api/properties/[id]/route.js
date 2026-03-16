
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { cookies } from 'next/headers';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const property = await Property.findById(id);

        if (!property) {
            return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: property });

    } catch (error) {
        console.error('Error fetching property:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const adminToken = (await cookies()).get('admin_token')?.value;
        if (!adminToken) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const property = await Property.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!property) {
            return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: property });
    } catch (error) {
        console.error('Error updating property:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const adminToken = (await cookies()).get('admin_token')?.value;
        if (!adminToken) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;

        const property = await Property.findByIdAndDelete(id);

        if (!property) {
            return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
