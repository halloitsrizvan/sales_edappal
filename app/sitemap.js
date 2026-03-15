import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export default async function sitemap() {
    const baseUrl = 'https://salesedappal.com';
    
    await dbConnect();
    
    // Fetch all approved properties
    const properties = await Property.find({ isApproved: true }).select('_id slug updatedAt').lean();

    // Static routes
    const staticRoutes = [
        '',
        '/properties',
        '/about',
        '/contact',
        '/reviews',
        '/list-property',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic property routes
    const propertyRoutes = properties.map((p) => ({
        url: `${baseUrl}/properties/${p.slug || p._id}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...staticRoutes, ...propertyRoutes];
}
