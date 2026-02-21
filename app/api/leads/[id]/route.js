
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const lead = await Lead.findByIdAndUpdate(id, body, { new: true });

        if (!lead) return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: lead });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const lead = await Lead.findByIdAndDelete(id);

        if (!lead) return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });

        return NextResponse.json({ success: true, message: 'Lead deleted' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
