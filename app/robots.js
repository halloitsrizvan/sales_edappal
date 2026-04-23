export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/profile/'],
        },
        sitemap: 'https://www.salesedappal.com/sitemap.xml',
    }
}
