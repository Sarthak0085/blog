export const HomeBlogCardSkeleton = () => {
    return (
        <div className="w-full relative min-w-[400px] min-h-[450px] p-4 border-[2px] border-gray-300 bg-gradient-to-br from-purple-300 to-emerald-200 shadow-md shadow-[#00000000d] animate-pulse">
            <div className="flex flex-col items-center justify-between gap-6">
                <div className="w-full h-[180px] bg-gray-300 rounded-md animate-pulse" />
                <div className="flex flex-col w-full min-h-[100px] space-y-2">
                    <div className="w-full h-[24px] bg-gray-300 rounded-md mb-2 animate-pulse" />
                    <div className="flex flex-col space-y-1">
                        <div className="w-full h-[16px] bg-gray-300 rounded-md animate-pulse" />
                        <div className="w-full h-[16px] bg-gray-300 rounded-md animate-pulse" />
                        <div className="w-full h-[16px] bg-gray-300 rounded-md animate-pulse" />
                    </div>
                    <div className="w-full h-[60px] bg-gray-300 rounded-md animate-pulse" />
                </div>
            </div>
            <div className="absolute w-[100px] h-[40px] right-2 bottom-2 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
    )
}