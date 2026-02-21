
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function POST() {
    try {
        await dbConnect();

        // Update the last read timestamp in settings
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({ lastReadNotificationsAt: new Date() });
        } else {
            settings.lastReadNotificationsAt = new Date();
            await settings.save();
        }

        return NextResponse.json({ success: true, message: 'Notifications marked as read' });
    } catch (error) {
        console.error('Mark Read Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
