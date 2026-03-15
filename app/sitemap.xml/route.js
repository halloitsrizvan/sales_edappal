
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET() {
  await dbConnect();
  
  const properties = await Property.find({ isApproved: true }).select('_id updatedAt').lean();
  
  const baseUrl = 'https://salesedappal.com';
  
  const staticPaths = [
    '',
    '/properties',
    '/about',
    '/contact',
    '/list-property',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPaths.map(path => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${path === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${properties.map(prop => `
  <url>
    <loc>${baseUrl}/properties/${prop._id}</loc>
    <lastmod>${prop.updatedAt ? new Date(prop.updatedAt).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
