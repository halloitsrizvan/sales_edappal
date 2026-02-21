
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        // Check if user exists
        const user = await User.findOne({ email });

        // If no user found, check if it's the initial admin setup
        if (!user) {
            // Basic hardcoded check for first time setup or fallback
            if (email === 'admin@salesedappal.com' && password === 'admin123') {
                // Create the admin user if it doesn't exist
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await User.create({
                    email,
                    password: hashedPassword,
                    role: 'admin'
                });

                // Issue token
                const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
                (await cookies()).set('admin_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 86400, path: '/' });

                return NextResponse.json({ success: true, message: 'Admin created and logged in' });
            }
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        // Issue token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        (await cookies()).set('admin_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 86400, path: '/' });

        return NextResponse.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
