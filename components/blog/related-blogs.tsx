"use client";

import { getAllRelatedPublishedBlogs } from "@/actions/blog/get-blogs";
import { Blog } from "@prisma/client";
import { useEffect, useState } from "react";
import { RelatedBlogListSkeleton } from "../loader/related-blogs-skeleton";
import { BlogCard } from "../blog-card";

export const RelatedBlogs = ({ categoryId }: { categoryId?: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllRelatedPublishedBlogs({ categoryId });
                if (data?.error) {
                    setError(data?.error);
                } else {
                    setBlogs(data?.blogs as Blog[]);
                }
            } catch (error) {
                setError("Error while fetching blogs");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [categoryId]);

    return (
        <div className="space-y-4">
            <h3 className="text-black text-2xl text-left font-semibold">Related Blogs</h3>
            <div className="w-full max-w-2xl h-auto space-y-3">
                {isLoading && <RelatedBlogListSkeleton />}
                {error && <div className="flex items-center justify-center text-3xl text-[red]">
                    {error}
                </div>}
                {!isLoading ? blogs?.length > 0 ? blogs.slice(0, 3).map((blog) => (
                    <div key={blog.id} className={`p-2 bg-white/40 border shadow-md rounded-md hover:scale-105`}>
                        <BlogCard blog={blog} related={true} />
                    </div>

                )) :
                    <div className="flex h-full items-center justify-center text-3xl text-[blue]">
                        No Blog Found
                    </div>
                    : null
                }
            </div>
        </div>
    )
}