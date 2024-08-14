import { Separator } from "../ui/separator";

export const BlogDetailSkeleton = () => {
    const backgroundImageUrl =
        "https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif";
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
            }}
            className="relative bg-cover bg-center min-h-screen w-full bg-fixed flex flex-col lg:flex-row justify-center overflow-x-hidden"
        >
            <div className="flex items-center justify-center lg:block w-full lg:w-[75%]">
                <div className="w-full md:w-[80%] lg:w-[75%] xl:w-[70%] px-10 py-10">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-20 h-4 bg-gray-300 animate-pulse rounded" ></div >
                        <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                        <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </div>
                    <div className="w-full text-sm text-muted-foreground space-x-1 mb-4 text-wrap flex items-center">
                        <div className="w-10 h-4 bg-gray-300 animate-pulse rounded"></div>
                        <div className="w-2 h-2 bg-gray-300 animate-pulse rounded-full"></div>
                        <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                        <div className="w-2 h-2 bg-gray-300 animate-pulse rounded-full"></div>
                        <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                        <div className="w-2 h-2 bg-gray-300 animate-pulse rounded-full"></div>
                        <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </div>
                    <div className="flex flex-wrap text-muted-foreground gap-4 mb-4 w-full justify-start">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                    </div>
                    <div className="space-y-6 mb-4">
                        <div className="space-y-3">
                            <div className="w-full h-6 bg-gray-300 animate-pulse rounded-md"></div>
                            <div className="w-full h-6 bg-gray-300 animate-pulse rounded-md"></div>
                            <div className="w-full h-6 bg-gray-300 animate-pulse rounded-md"></div>
                        </div>
                        <div className="w-full mb-4 h-80 bg-gray-300 animate-pulse rounded-md"></div>
                        <div className="space-y-4">
                            {[...Array(15)].map((_, index) => (
                                <div key={index} className="w-full h-4 bg-gray-300 animate-pulse rounded-md"></div>
                            ))}
                        </div>
                    </div>
                </div >
            </div>
        </div >
    )
}