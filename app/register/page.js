'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, User } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Determine where to redirect based on query params or default
                const urlParams = new URLSearchParams(window.location.search);
                const returnUrl = urlParams.get('returnUrl') || '/';
                window.location.href = returnUrl; 
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#005BC8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-sky-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 z-0 pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create an Account</h2>
                    <p className="mt-2 text-sm text-slate-600 font-medium">
                        Join us to start posting properties today
                    </p>
                </div>

                <div className="bg-white py-10 px-6 sm:px-10 shadow-2xl shadow-slate-200/50 rounded-[2rem] border border-slate-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005BC8]/20 focus:border-[#005BC8] transition-all bg-slate-50 focus:bg-white text-slate-900 outline-none font-medium text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005BC8]/20 focus:border-[#005BC8] transition-all bg-slate-50 focus:bg-white text-slate-900 outline-none font-medium text-sm"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#005BC8]/20 focus:border-[#005BC8] transition-all bg-slate-50 focus:bg-white text-slate-900 outline-none font-medium text-sm"
                                    placeholder="********"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-[#005BC8]/20 text-sm font-bold text-white bg-[#005BC8] hover:bg-[#004A9E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005BC8] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                            >
                                {loading ? 'Creating account...' : (
                                    <>
                                        Register <UserPlus size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-600 font-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-[#005BC8] hover:text-[#004A9E] hover:underline transition-all">
                                Log in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
