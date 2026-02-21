
import Skeleton from '@/components/Skeleton';
import { ArrowLeft } from 'lucide-react';

export default function Loading() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumb Skeleton */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
                        <ArrowLeft size={16} className="text-slate-300" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery Skeleton */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                            <Skeleton className="h-[400px] md:h-[500px] w-full rounded-none" />
                            <div className="flex gap-2 p-4 bg-white">
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} className="h-20 flex-1 rounded-lg" />
                                ))}
                            </div>
                        </div>

                        {/* Details Table Skeleton */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <Skeleton className="h-8 w-48 mb-6" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-24 rounded-xl" />
                                ))}
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-8 space-y-4">
                                <Skeleton className="h-7 w-32" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-sky-100 sticky top-24 space-y-6">
                            <div className="space-y-4 border-b border-dashed border-slate-200 pb-6">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-10 w-32" />
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <Skeleton className="w-16 h-16 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Skeleton className="w-full h-14 rounded-xl" />
                                <Skeleton className="w-full h-14 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
