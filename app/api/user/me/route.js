import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Property from '@/models/Property';
import Lead from '@/models/Lead';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const userToken = (await cookies()).get('user_token')?.value;

        if (!userToken) {
            return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(userToken, process.env.JWT_SECRET);
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        // Fetch user's submitted properties
        const properties = await Property.find({ userId: user._id }).sort({ createdAt: -1 });
        
        // Fetch user's submitted requirements (leads without propertyId)
        const requirements = await Lead.find({ 
            userId: user._id,
            $or: [
                { propertyId: { $exists: false } },
                { propertyId: "" },
                { propertyId: null }
            ]
        }).sort({ createdAt: -1 });

        return NextResponse.json({ 
            success: true, 
            user,
            properties,
            requirements
        });

    } catch (error) {
        console.error('Fetch user data error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
