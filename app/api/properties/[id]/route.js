import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { cookies } from 'next/headers';
import { sendEmail } from '@/lib/email';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const property = await Property.findById(id);

        if (!property) {
            return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: property });

    } catch (error) {
        console.error('Error fetching property:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const adminToken = (await cookies()).get('admin_token')?.value;
        if (!adminToken) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        // Fetch old property to check approval status before update
        const oldProperty = await Property.findById(id);
        if (!oldProperty) {
            return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
        }

        const property = await Property.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        // If newly approved, send email
        if (body.isApproved === true && oldProperty.isApproved === false) {
            console.log('Property newly approved, triggering email for:', id);
            (async () => {
                try {
                    if (property.ownerEmail) {
                        const emailRes = await sendEmail({
                            to: property.ownerEmail,
                            subject: 'Your Property is Now Listed – Sales Edappal',
                            html: `
                                <h2>Congratulations! Your property is live.</h2>
                                <p>Hi ${property.ownerName || 'User'},</p>
                                <p>We are pleased to inform you that your property <strong>${property.title}</strong> has been verified and is now live on Sales Edappal.</p>
                                <p>You can now share your listing with potential buyers. Our team will also be promoting it to our network.</p>
                                <p>If you need any support or want to make changes, please contact us at +91 98952 94949.</p>
                            `
                        });
                        console.log('Approval email result:', emailRes);
                    } else {
                        console.log('No owner email found for property:', id);
                    }
                } catch (emailErr) {
                    console.error('Approval Email Failed:', emailErr);
                }
            })();
        }

        return NextResponse.json({ success: true, data: property });
    } catch (error) {
        console.error('Error updating property:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const adminToken = (await cookies()).get('admin_token')?.value;
        if (!adminToken) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;

        const property = await Property.findByIdAndDelete(id);

        if (!property) {
            return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}
