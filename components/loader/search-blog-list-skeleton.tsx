export const SearchBlogListSkeleton = () => {
    return (
        <div className={`p-2`} >
            {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex gap-2 px-4 py-2 border-b">
                    <picture>
                        <div
                            className="max-w-full w-16 object-cover bg-muted-foreground/50 aspect-square rounded animate-pulse"
                        />
                    </picture>
                    <div className="w-[85%]">
                        <div className="h-6 w-[50%] rounded-full mb-2 bg-muted-foreground/50 animate-pulse"></div>
                        <p className="h-4 w-full rounded-full mb-2 bg-muted-foreground/50 animate-pulse truncate"></p>
                        <p className="h-3 w-[10%] rounded-full mb-2 bg-muted-foreground/50 animate-pulse"></p>
                    </div>
                </div>
            ))}
        </div>
    )
}