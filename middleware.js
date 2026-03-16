import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const { pathname } = request.nextUrl;

    // Only intercept /admin routes
    if (pathname.startsWith('/admin')) {
        
        // Don't protect the login page itself, but redirect away if already logged in
        if (pathname === '/admin/login') {
            if (adminToken) {
                try {
                    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
                    await jwtVerify(adminToken, secret);
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
                } catch (error) {
                    // Token invalid, allow access to login page
                    return NextResponse.next();
                }
            }
            return NextResponse.next();
        }

        // Protect all other /admin/ routes
        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(adminToken, secret);
            return NextResponse.next();
        } catch (error) {
            // Token invalid or expired, clear and redirect to login
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_token');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
