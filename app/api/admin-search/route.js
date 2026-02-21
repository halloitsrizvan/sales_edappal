
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import Lead from '@/models/Lead';

export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q');

        if (!query || query.length < 2) {
            return NextResponse.json({ success: true, data: [] });
        }

        const regex = new RegExp(query, 'i');

        // Search in Properties
        const properties = await Property.find({
            $or: [
                { title: regex },
                { location: regex },
                { type: regex }
            ]
        }).limit(5);

        // Search in Leads
        const leads = await Lead.find({
            $or: [
                { name: regex },
                { phone: regex },
                { email: regex }
            ]
        }).limit(5);

        const results = [
            ...properties.map(p => ({
                id: p._id,
                type: 'property',
                title: p.title,
                subtitle: p.location,
                link: `/admin/properties/edit/${p._id}`
            })),
            ...leads.map(l => ({
                id: l._id,
                type: 'lead',
                title: l.name,
                subtitle: l.phone,
                link: '/admin/leads'
            }))
        ];

        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        console.error('Admin Search Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
