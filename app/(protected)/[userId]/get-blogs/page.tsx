"use client";

import { getAllBlogsByUserId } from "@/actions/blog/get-blogs";
import { blogColumns } from "@/components/admin/blog/blog-columns";
import { AllBlogsTable } from "@/components/admin/blog/blogs-table";
import { Button } from "@/components/ui/button";
import { ExtendBlog } from "@/utils/types";
import Link from "next/link";
import { useParams, } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function BlogsPage() {
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ExtendBlog[]>([]);
    const [error, setError] = useState("");
    console.log("hello",)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllBlogsByUserId(String(userId));
                if (data.error) {
                    setError(data?.error);
                }
                if (data?.blogs) {
                    setData(data?.blogs as ExtendBlog[]);
                }
            } catch (error) {
                console.error("Error while fetching blogs")
                setError("Error while fetching Blogs.")
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [userId]);

    if (isLoading) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center">
                <PulseLoader margin={3} size={20} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center text-[red] font-bold text-3xl">
                {error}
            </div>
        );
    }

    return (
        <div className="h-full flex-1 overflow-x-auto flex-col space-y-8 p-8 flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back!!</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of all the blogs!
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href={`/${userId}/add-blog`}>
                        <Button
                            variant={"default"}
                            className="bg-blue-600 text-white hover:text-blue-600 hover:bg-white font-semibold"
                        >
                            Add Blog
                        </Button>
                    </Link>
                </div>
            </div>
            <AllBlogsTable data={data} columns={blogColumns} />
        </div>
    );
}