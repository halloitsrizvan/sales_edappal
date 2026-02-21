
export default async function sitemap() {
    const baseUrl = 'https://salesedappal.com';

    // Static routes
    const routes = [
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

    // In a real scenario, you would fetch all properties from your database here
    // and add them to the sitemap. 
    /*
    const properties = await fetchProperties();
    const propertyRoutes = properties.map((p) => ({
      url: `${baseUrl}/properties/${p._id}`,
      lastModified: p.updatedAt,
      changeFrequency: 'daily',
      priority: 0.7,
    }));
    return [...routes, ...propertyRoutes];
    */

    return routes;
}
