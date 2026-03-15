
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
    try {
        await dbConnect();
        let siteSettings = await SiteSettings.findOne();

        if (!siteSettings) {
            siteSettings = await SiteSettings.create({});
        }

        return NextResponse.json({ success: true, data: siteSettings });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await dbConnect();
        const body = await req.json();

        let siteSettings = await SiteSettings.findOne();
        if (!siteSettings) {
            siteSettings = await SiteSettings.create(body);
        } else {
            siteSettings = await SiteSettings.findByIdAndUpdate(siteSettings._id, body, { new: true });
        }

        return NextResponse.json({ success: true, data: siteSettings });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
