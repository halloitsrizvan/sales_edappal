
import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.v2.config({
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

        // Upload to Cloudinary with Preset
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                {
                    folder: 'sales-edappal-properties',
                    upload_preset: 'sales_edappal'
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
        return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
    }
}
