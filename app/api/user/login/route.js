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

        if (!email || !password) {
            return NextResponse.json({ success: false, message: 'Please provide email and password' }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        // Issue token
        const token = jwt.sign({ userId: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
        (await cookies()).set('user_token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 7 * 24 * 60 * 60, // 7 days 
            path: '/' 
        });

        return NextResponse.json({ success: true, message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
