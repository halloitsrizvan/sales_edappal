
import Skeleton from './Skeleton';

export default function PropertyCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full">
            {/* Image Placeholder */}
            <Skeleton className="h-64 w-full rounded-none" />

            <div className="p-5 flex flex-col flex-grow space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1 mr-4">
                        {/* Title */}
                        <Skeleton className="h-6 w-3/4" />
                        {/* Location */}
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    {/* Price */}
                    <Skeleton className="h-6 w-20" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100 mt-4 mb-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-10 rounded-lg" />
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                    <Skeleton className="flex-1 h-11 rounded-xl" />
                    <Skeleton className="w-12 h-11 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
