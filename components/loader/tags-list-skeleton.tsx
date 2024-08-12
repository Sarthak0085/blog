export const TagsListSkeleton = () => {
    return (
        <div className="lg:grid lg:grid-cols-3 gap-4 p-4">
            {[...Array(10)].map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-200 h-10 w-[70px] rounded-md mx-2 my-2 animate-pulse"
                ></div>
            ))}
        </div>
    )
}