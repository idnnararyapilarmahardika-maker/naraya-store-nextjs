// components/SkeletonCard.js
export default function SkeletonCard() {
    return (
        <div className="border p-4 rounded-lg shadow-sm space-y-3 bg-white">
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        </div>
    );
}