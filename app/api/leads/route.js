
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const type = searchParams.get('type'); // 'property' or 'general'

        const skip = (page - 1) * limit;

        const query = {};
        if (type === 'property') {
            query.propertyId = { $exists: true, $ne: "", $ne: null };
        } else if (type === 'general') {
            query.$or = [
                { propertyId: { $exists: false } },
                { propertyId: "" },
                { propertyId: null }
            ];
        }

        // Migration: Ensure all leads have a status field
        await Lead.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'New' } }
        );

        const leads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Lead.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: leads,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const lead = await Lead.create(body);
        return NextResponse.json({ success: true, data: lead }, { status: 201 });
    } catch (error) {
        console.error('Lead POST Error:', error);
        return NextResponse.json({ success: false, message: 'Submission failed' }, { status: 500 });
    }
}
