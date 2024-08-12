export const CategoryListSkeleton = () => {
    return (
        <div className="flex justify-center items-center w-full overflow-auto px-1">
            <div className="flex items-start space-x-4">
                <div className="bg-gray-200 h-8 w-24 rounded-md animate-pulse"></div>
                <div className="bg-gray-200 h-8 w-24 rounded-md animate-pulse"></div>
                <div className="bg-gray-200 h-8 w-24 rounded-md animate-pulse"></div>
                <div className="bg-gray-200 h-8 w-24 rounded-md animate-pulse"></div>
            </div>
        </div>
    )
}