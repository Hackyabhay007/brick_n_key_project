"use client"

const ShimmerEffect = () => {
    return (
        <div className="animate-pulse flex flex-col gap-4 w-full">
            <div className="bg-gray-700/50 h-[300px] w-full rounded-[20px]"></div>
            <div className="space-y-3">
                <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default ShimmerEffect;
