
export const BlogsListSkeleton = () => {
    return (
        <div className="flex w-full items-center justify-center mx-4">
            <div className="py-2 px-3 mt-4 rounded-lg !min-w-[85%] bg-white min-h-[720px] max-h-[720px] shadow-md overflow-y-auto hide-scrollbar">
                <div className="h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
                {[1, 2, 3].map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </div>
    )
}

const SkeletonCard = () => {
    return (
        <div className="flex items-center mb-4 max-h-[100px] shadow-md p-4">
            <div className="w-1/3 flex items-center justify-center">
                <div className="w-[70px] h-[70px] bg-gray-300 rounded-full animate-pulse"></div>
            </div>
            <div className="w-2/3 p-4">
                <div className="h-6 bg-gray-300 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 w-3/4 animate-pulse"></div>
            </div>
        </div>
    )
}