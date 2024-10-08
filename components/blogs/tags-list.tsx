"use client";

import { getAllTags } from "@/actions/tags/get-tags";
import { Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { TagsListSkeleton } from "@/components/loader/tags-list-skeleton";
import { useCustomSearchParams } from "@/hooks/useSearchParams";

export const TagsLists = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const queryTags = searchParams.get("tags");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const { params, updateParam } = useCustomSearchParams();
    const [selectedTags, setSelectedTags] = useState<string[]>(params?.tags?.split(",") ?? []);

    // const handleClick = (tag: string) => {
    //     setSelectedTags((prevTags) => {
    //         const updatedTags = prevTags.includes(tag)
    //             ? prevTags.filter((item) => item !== tag)
    //             : [...prevTags, tag];

    //         updateQueryParams(updatedTags);

    //         return updatedTags;
    //     });
    // }

    // const updateQueryParams = (tags: string[]) => {
    //     const tagQuery = tags.length > 0 ? `tags=${encodeURIComponent(tags.join(','))}` : '';
    //     const categoryQuery = category ? `category=${encodeURIComponent(category)}` : '';

    //     const queryString = [tagQuery, categoryQuery].filter(Boolean).join('&');

    //     const url = `/blogs${queryString ? `?${queryString}` : ''}`;

    //     router.push(url);
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllTags();
                if (data?.error) {
                    setError(data?.error);
                }
                if (data?.data) {
                    setTags(data?.data);
                }
            } catch (error) {
                setError("Error while fetching tags");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);


    if (error) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center text-[red] font-bold text-3xl">
                {error}
            </div>
        );
    }

    return (
        isLoading && <TagsListSkeleton /> ||
        <div className="w-full">
            <h3 className="text-xl pl-2 text-muted-foreground font-semibold py-2">Popular Tags</h3>
            <div className="lg:grid-cols-3">
                {tags.slice(0, 10).map((tag, index) => (
                    <Button
                        key={index}
                        variant={params.tags.includes(tag?.name) ? "primary" : "outline"}
                        className="!bg-transparent !border border-black mx-2 my-2"
                        onClick={() => updateParam("tags", tag?.name)}
                    >
                        {tag?.name}
                    </Button>
                ))}
            </div>
        </div>
    )
}