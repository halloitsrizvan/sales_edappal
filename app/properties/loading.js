
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-48" />
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Skeleton */}
                    <aside className="md:w-64 flex-shrink-0 hidden md:block">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-3">
                                    <Skeleton className="h-5 w-1/2" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Grid Skeleton */}
                    <div className="flex-1">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <PropertyCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
