
'use client';

import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

export default function CopyLink({ slug }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const url = `${window.location.origin}/properties/${slug}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-bold transition-all border border-slate-200"
        >
            {copied ? (
                <>
                    <Check size={16} className="text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                </>
            ) : (
                <>
                    <Share2 size={16} className="text-sky-500" />
                    <span>Share Link</span>
                </>
            )}
        </button>
    );
}
