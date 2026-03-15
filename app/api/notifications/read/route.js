
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function POST() {
    try {
        await dbConnect();

        // Update the last read timestamp in settings
        let siteSettings = await SiteSettings.findOne();
        if (!siteSettings) {
            siteSettings = await SiteSettings.create({ lastReadNotificationsAt: new Date() });
        } else {
            siteSettings.lastReadNotificationsAt = new Date();
            await siteSettings.save();
        }

        return NextResponse.json({ success: true, message: 'Notifications marked as read' });
    } catch (error) {
        console.error('Mark Read Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
