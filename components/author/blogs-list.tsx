"use client";

import { getAllPublishedBlogs } from "@/actions/blog/get-blogs";
import { ExtendBlog } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SingleBlogCard } from "./single-blog-card";
import Link from "next/link";
import { BlogsListSkeleton } from "@/components/loader/blogs-list-skeleton";

export const BlogsList = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [blogs, setBlogs] = useState<ExtendBlog[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPublishedBlogs({ authorId: id as string });
                if (data?.error) {
                    setError(data?.error);
                }
                if (data?.blogs) {
                    setBlogs(data?.blogs as any);
                }
            } catch (error) {
                setError("Error while fetching user data");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (isLoading) {
        return (
            <BlogsListSkeleton />
        )
    }

    if (error) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center text-[red] font-bold text-3xl">
                {error}
            </div>
        );
    }

    return (
        <div className="flex w-full items-center justify-center mx-4">
            <div className="py-2 px-3 mt-4 rounded-lg lg:min-w-[85%] bg-white min-h-[720px] max-h-[720px] shadow-md overflow-y-auto hide-scrollbar">
                <h2 className="text-xl py-3 text-muted-foreground font-semibold mb-4">Blogs Related to Author</h2>
                {blogs.map((blog) => (
                    <Link key={blog?.id} href={`/blog/${blog?.slug}`}>
                        <SingleBlogCard
                            blog={blog}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}