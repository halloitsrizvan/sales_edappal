import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { sendEmail } from '@/lib/email';

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

        // Send Email Notifications (Background - don't block response)
        (async () => {
            console.log('Sending submission notifications for:', property._id);
            try {
                // To User
                if (property.ownerEmail) {
                    const userEmailRes = await sendEmail({
                        to: property.ownerEmail,
                        subject: 'Property Submission Received – Sales Edappal',
                        html: `
                            <h2>Thank you for submitting your property!</h2>
                            <p>Hi ${property.ownerName || 'User'},</p>
                            <p>We have received your listing for: <strong>${property.title}</strong> in <strong>${property.location}</strong>.</p>
                            <p>Your property is currently under review by our moderation team. It will be published on our platform once verification is complete.</p>
                            <p>If you have any questions, feel free to contact us at +91 98952 94949.</p>
                        `
                    });
                    console.log('User submission email result:', userEmailRes);
                } else {
                    console.log('No owner email found for submission notifications.');
                }

                // To Admin
                const adminEmail = process.env.ADMIN_EMAIL || 'clgrizvan@gmail.com';
                const adminEmailRes = await sendEmail({
                    to: adminEmail,
                    subject: 'New Property Submission',
                    html: `
                        <h2>New Listing for Review</h2>
                        <p><strong>Title:</strong> ${property.title}</p>
                        <p><strong>Seller:</strong> ${property.ownerName}</p>
                        <p><strong>Phone:</strong> ${property.ownerPhone}</p>
                        <p><strong>Location:</strong> ${property.location}</p>
                        <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://salesedappal.com'}/admin/properties">Review in Dashboard</a></p>
                    `
                });
                console.log('Admin submission email result:', adminEmailRes);
            } catch (emailErr) {
                console.error('Submission Email Failed:', emailErr);
            }
        })();

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
