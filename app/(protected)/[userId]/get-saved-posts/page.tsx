"use client";

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { savedPostColumns } from "@/components/admin/saved-post/saved-post-columns";
import { AllSavedPostsTables } from "@/components/admin/saved-post/saved-post-table";
import { ExtendSavedPost } from "@/utils/types";
import { getAllSavedPosts, getAllSavedPostsByUserId } from "@/actions/savedpost/get-saved-posts";
import { useParams } from "next/navigation";

export default function SavedPostsPage() {
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<ExtendSavedPost[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllSavedPostsByUserId(userId as string);
                if (data?.error) {
                    console.error("Error while fetching Likes.");
                    setError(data?.error);
                }
                if (data?.data) {
                    setData(data?.data as ExtendSavedPost[]);
                }
            } catch (error) {
                setError("Error while fetching saved posts.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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
        <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back!!</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of all the saved posts!
                    </p>
                </div>
            </div>
            <AllSavedPostsTables data={data} columns={savedPostColumns} />
        </div>
    );
}
