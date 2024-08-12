"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react"
import { ExtendBlog } from "@/utils/types";
import { getBlogDetailsBySlug } from "@/actions/blog/blog-details";
import { toast } from "sonner";
import { BlogDetails } from "./blog-detail";
import { RelatedBlogs } from "./related-blogs";
import Link from "next/link";
import { AiOutlineTag } from "react-icons/ai";

export const Blog = () => {
    const { slug } = useParams();
    const [data, setData] = useState<ExtendBlog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBlogDetailsBySlug(slug as string);
                if (!data) {
                    toast.error("Blog post not found");
                } else {
                    setData(data?.data as unknown as ExtendBlog);
                }
            } catch (error) {
                console.error("Error fetching blog data:", error);
                toast.error("Error while fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);


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
                    <BlogDetails data={data} />
                </div>
            </div>
            <div className="fixed hidden lg:block lg:w-[300px] xl:w-[400px] right-2 py-8">
                <RelatedBlogs categoryId={data?.categoryId} />
            </div>
            <div className="w-full bg-white/20 shadow-sm my-16 py-10 block lg:hidden">
                <div className="w-full flex items-center justify-center">
                    <RelatedBlogs categoryId={data?.categoryId} />
                </div>
            </div>
        </div>
    )
}