export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/profile/'],
        },
        sitemap: 'https://salesedappal.com/sitemap.xml',
    }
}
