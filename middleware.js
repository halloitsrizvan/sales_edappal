
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    const token = request.cookies.get('admin_token')?.value;
    const { pathname } = request.nextUrl;

    // Only run on admin routes
    if (pathname.startsWith('/admin')) {

        // Handling the Login Page
        if (pathname === '/admin/login') {
            // If user has a token, check if it is valid
            if (token) {
                try {
                    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
                    await jwtVerify(token, secret);
                    // If valid, redirect to dashboard (prevent double login)
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
                } catch (error) {
                    // If invalid, let them stay on login page to re-login
                    return NextResponse.next();
                }
            }
            // No token, allow access to login page
            return NextResponse.next();
        }

        // Handling all other Protected Admin Routes
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            // Token verification failed
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
