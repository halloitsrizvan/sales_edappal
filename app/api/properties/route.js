
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const search = searchParams.get('search') || '';
        const type = searchParams.get('type');
        let status = searchParams.get('status');
        const location = searchParams.get('location');
        const minPrice = parseInt(searchParams.get('minPrice'));
        const maxPrice = parseInt(searchParams.get('maxPrice'));
        const isAdmin = searchParams.get('admin') === 'true';
        const isApproved = searchParams.get('isApproved');

        const query = {};

        // Security: Public users only see approved properties
        if (!isAdmin) {
            query.isApproved = true;
            query.status = { $ne: 'Sold' }; // Hide sold properties from public
        } else if (isApproved !== null && isApproved !== undefined && isApproved !== '') {
            query.isApproved = isApproved === 'true';
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (location && location !== 'All' && location.trim() !== '') {
            query.location = { $regex: location.trim(), $options: 'i' };
        }

        if (type && type !== 'All') {
            query.type = type;
        }

        if (status && status !== 'All') {
            // Map "Buy" from frontend to "For Sale" in database
            if (status === 'Buy') status = 'For Sale';

            if (status === 'Available') {
                query.status = { $ne: 'Sold' };
            } else {
                query.status = status;
            }
        }

        if (minPrice || maxPrice) {
            query.priceAmount = {};
            if (minPrice) query.priceAmount.$gte = minPrice;
            if (maxPrice) query.priceAmount.$lte = maxPrice;
        }

        const featured = searchParams.get('featured');
        if (featured === 'true') {
            query.featured = true;
        }

        const skip = (page - 1) * limit;

        const properties = await Property.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Property.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: properties,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}



export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        
        const property = await Property.create(body);

        return NextResponse.json({ success: true, data: property }, { status: 201 });

    } catch (error) {
        console.error('CRITICAL: Property creation failed:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || 'Database save failed',
            error: error
        }, { status: 500 });
    }
}
