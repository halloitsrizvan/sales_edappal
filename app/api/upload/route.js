
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const bytes = Buffer.from(buffer);

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'sales-edappal-properties',
                    // Optional: remove upload_preset if it doesn't exist in Cloudinary dashboard
                    // upload_preset: 'sales_edappal' 
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary Stream Error:', error);
                        reject(error);
                    }
                    else {
                        console.log('Upload Success:', result.secure_url);
                        resolve(result);
                    }
                }
            );
            uploadStream.end(bytes);
        });

        return NextResponse.json({ success: true, url: result.secure_url });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || 'Upload failed',
            error: error 
        }, { status: 500 });
    }
}

