"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react"
import { ExtendBlog } from "@/utils/types";
import { getBlogDetailsBySlug } from "@/actions/blog/blog-details";
import { BlogDetails } from "./blog-detail";
import { RelatedBlogs } from "./related-blogs";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { User } from "next-auth";
import { BlogDetailSkeleton } from "../loader/blog-detail-skeleton";

export const Blog = () => {
    const { slug } = useParams();
    const user = useCurrentUser();
    const [data, setData] = useState<ExtendBlog | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await getBlogDetailsBySlug(slug as string);
            if (data?.error) {
                setError(data?.error);
            }
            if (data?.data) {
                setData(data?.data as ExtendBlog);
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
            setError("Error while fetching data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [slug]);

    const handleRefetch = () => {
        fetchData();
    }

    console.log("user", user);

    if (isLoading) {
        return (
            <BlogDetailSkeleton />
        )
    }


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
                    {!isLoading && !error && <BlogDetails data={data} user={user as User} refetch={handleRefetch} />}
                </div>
            </div>
            <div className="fixed hidden lg:block lg:w-[300px] xl:w-[400px] right-2 py-8">
                {!isLoading && !error && <RelatedBlogs categoryId={data?.categoryId} />}
            </div>
            <div className="w-full bg-white/20 shadow-sm my-16 py-10 block lg:hidden">
                <div className="w-full flex items-center justify-center">
                    {!isLoading && !error && <RelatedBlogs categoryId={data?.categoryId} />}
                </div>
            </div>
        </div>
    )
}