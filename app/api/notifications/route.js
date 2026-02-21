
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import Lead from '@/models/Lead';
import Review from '@/models/Review';
import Settings from '@/models/Settings';

export async function GET() {
    try {
        await dbConnect();

        // Get last read timestamp
        let settings = await Settings.findOne();
        if (!settings) settings = await Settings.create({});
        const lastRead = settings.lastReadNotificationsAt || new Date(0);

        // Fetch latest properties
        const latestProperties = await Property.find({ isApproved: false })
            .sort({ createdAt: -1 })
            .limit(5);

        // Fetch latest leads
        const latestLeads = await Lead.find({ status: 'New' })
            .sort({ createdAt: -1 })
            .limit(5);

        // Fetch latest reviews
        const latestReviews = await Review.find({ showInPage: false })
            .sort({ createdAt: -1 })
            .limit(5);

        const notifications = [
            ...latestProperties.map(p => ({
                id: p._id,
                type: 'property',
                title: 'New Property Added',
                message: `${p.title} is waiting for approval`,
                time: p.createdAt,
                link: '/admin/properties',
                isUnread: new Date(p.createdAt) > new Date(lastRead)
            })),
            ...latestLeads.map(l => ({
                id: l._id,
                type: 'lead',
                title: 'New Lead Received',
                message: `From ${l.name} regarding property inquiry`,
                time: l.createdAt,
                link: '/admin/leads',
                isUnread: new Date(l.createdAt) > new Date(lastRead)
            })),
            ...latestReviews.map(r => ({
                id: r._id,
                type: 'review',
                title: 'New Review Posted',
                message: `Rating: ${r.rating} stars - ${r.text.substring(0, 30)}...`,
                time: r.createdAt,
                link: '/admin/reviews',
                isUnread: new Date(r.createdAt) > new Date(lastRead)
            }))
        ].sort((a, b) => new Date(b.time) - new Date(a.time));

        const unreadCount = notifications.filter(n => n.isUnread).length;

        return NextResponse.json({
            success: true,
            data: notifications.slice(0, 15),
            unreadCount
        });
    } catch (error) {
        console.error('Notifications Error:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
