export const BlogCardSkeleton = () => {
    return (
        <div className="w-full bg-gradient-to-br from-purple-300 to-emerald-200 min-h-[250px] min-w-[400px] max-w-[600px] border-[2px] shadow-md shadow-[#00000000d] animate-pulse">
            <div className="flex min-h-[200px]">
                <div className="flex flex-col-reverse pt-8 sm:py-2 sm:flex-row items-center justify-between gap-6">
                    <div className="min-h-[100px] space-y-2 flex-1">
                        <div className="flex flex-col">
                            <div className="bg-gray-200 h-6 w-3/4 mb-2 rounded"></div>
                            <div className="flex text-[14px] space-x-1">
                                <div className="flex items-start space-x-1">
                                    <div className="bg-gray-200 h-4 w-24 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-4 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-24 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-4 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-24 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-4 rounded"></div>
                                    <div className="bg-gray-200 h-4 w-24 rounded"></div>
                                </div>
                            </div>
                            <div className="bg-gray-200 h-4 w-full mt-4 mb-2 rounded"></div>
                            <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                        </div>
                    </div>
                    <div className="items-end">
                        <div className="flex items-center justify-center">
                            <div className="bg-gray-200 h-24 w-24 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="flex items-start mb-5">
                <li className="bg-gray-200 h-8 w-24 rounded"></li>
                <li className="bg-gray-200 h-8 w-24 rounded ml-4"></li>
                <li className="bg-gray-200 h-8 w-24 rounded ml-4"></li>
                <li className="bg-gray-200 h-8 w-24 rounded ml-4"></li>
            </ul>
        </div>

    )
}