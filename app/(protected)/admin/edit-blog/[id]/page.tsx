"use client";

import { getBlogById } from "@/actions/blog/get-blogs";
import { BlogForm } from "@/components/blog/blog-form";
import { ExtendBlog } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";

export default function EditBlog() {
    const { id } = useParams();
    const [data, setData] = useState<ExtendBlog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBlogById(id as string);
                console.log(data);
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
    }, [id])

    if (loading) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center text-blue-600">
                <PulseLoader margin={2} size={20} />
            </div>
        );
    }

    return (
        <div className="bg-white flex flex-grow items-center justify-center w-[600px] max-w-[900px]">
            <BlogForm blogData={data as ExtendBlog} isUpdate={true} />
        </div>
    );
}
