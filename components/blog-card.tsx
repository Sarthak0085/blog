import { formatDate } from "@/lib/date-format"
import { cn } from "@/lib/utils"
import { Blog } from "@prisma/client"
import Link from "next/link"

export const BlogCard = ({ blog, related = false }: { blog: Blog, related?: boolean }) => {
    return (
        <Link href={`/blog/${blog?.slug}`}>
            <div className="flex gap-2 px-4 py-2">
                <picture>
                    <img
                        src={blog.imageUrl ?? ""}
                        alt={blog?.slug}
                        className="max-w-full w-16 h-full object-cover aspect-square rounded"
                        width={12}
                        height={12}
                    />
                </picture>
                <div className={cn(related ? "w-[75%]" : "w-[85%]")}>
                    <div className="text-lg truncate">{blog.title}</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{blog?.shortSummary}</p>
                    <p className="text-[11px] text-muted-foreground">{formatDate(blog?.createdAt)}</p>
                </div>
            </div>
        </Link>
    )
}