
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <h1 className="text-9xl font-bold text-sky-100">404</h1>
            <div className="absolute">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Page Not Found</h2>
            </div>
            <p className="text-slate-500 mt-4 max-w-md mx-auto">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="flex gap-4 mt-8">
                <Link
                    href="/"
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:-translate-y-1"
                >
                    <Home size={20} /> Go Home
                </Link>
                <Link
                    href="/properties"
                    className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-all hover:bg-slate-50"
                >
                    <Search size={20} /> Browse Properties
                </Link>
            </div>
        </div>
    );
}
