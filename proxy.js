
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const userToken = request.cookies.get('user_token')?.value;
    const { pathname, search } = request.nextUrl;

    // --- ADMIN ROUTES ---
    if (pathname.startsWith('/admin')) {
        // Handling the Admin Login Page
        if (pathname === '/admin/login') {
            if (adminToken) {
                try {
                    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
                    await jwtVerify(adminToken, secret);
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
                } catch (error) {
                    return NextResponse.next();
                }
            }
            return NextResponse.next();
        }

        // Handling all other Protected Admin Routes
        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(adminToken, secret);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
