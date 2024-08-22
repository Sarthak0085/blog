"use client";

import { getAllPublishedBlogs } from "@/actions/blog/get-blogs";
import { ExtendBlog } from "@/utils/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Button } from "@/components/ui/button";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { BlogCard } from "./blog-card";
import { HomeBlogCardSkeleton } from "@/components/loader/home-blog-card-skeleton";

export const RecentlyPublishedBlogs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [blogs, setBlogs] = useState<ExtendBlog[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(3);
    const { width } = useWindowSize();

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsToShow < blogs.length ? prevIndex + itemsToShow : prevIndex
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - itemsToShow >= 0 ? prevIndex - itemsToShow : prevIndex
        );
    };

    const currentBlogs = blogs.slice(currentIndex, currentIndex + itemsToShow);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPublishedBlogs({
                    orderby: "most_recent",
                    page: 1,
                    limit: 10
                });
                if (data?.error) {
                    setError(data?.error);
                }
                if (data?.blogs) {
                    setBlogs(data?.blogs as unknown as ExtendBlog[]);
                }
            } catch (error) {
                setError("Error while fetching the blogs");
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        if (width && width > 1400) {
            setItemsToShow(4);
        }
        if (width && width > 1000) {
            setItemsToShow(3);
        }
        else if (width && width > 600) {
            setItemsToShow(2);
        }
        else {
            setItemsToShow(1);
        }

    }, [width])

    return (
        <div className="py-4 border-t bg-white/20">
            <h1 className="text-start text-3xl sm:text-4xl px-3 py-3 text-black font-bold">Recent Posts</h1>
            <div className="relative px-8 py-4 overflow-hidden">
                <div className="flex items-center">
                    <Button
                        variant={"icon"}
                        aria-label="Previous Button"
                        onClick={handlePrev}
                        hidden={currentIndex === 0}
                        disabled={currentIndex === 0}
                        className={cn("absolute left-0 rounded-full !p-3 flex items-center justify-center bg-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500", currentIndex === 0 && "sr-only")}
                    >
                        <BiLeftArrow size={20} />
                        <span className="sr-only">Previous Button</span>
                    </Button>
                    {error &&
                        <div className="w-full h-[100vh] flex items-center justify-center text-[red] font-bold text-3xl">
                            {error}
                        </div>
                    }
                    {isLoading &&
                        <div className="flex items-center justify-center gap-2">
                            {[1, 2].map((_, index) => (
                                <HomeBlogCardSkeleton key={index} />
                            ))}
                        </div>
                    }
                    {!isLoading && !error && blogs.length > 0 &&
                        currentBlogs.map((data) => (
                            <BlogCard key={data?.id} data={data} />
                        ))
                    }
                    <Button
                        variant={"icon"}
                        aria-label="Next Button"
                        onClick={handleNext}
                        hidden={currentIndex + itemsToShow >= blogs.length}
                        disabled={currentIndex + itemsToShow >= blogs.length}
                        className={cn("absolute right-0 rounded-full !p-3 flex items-center justify-center bg-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500", currentIndex + itemsToShow >= blogs.length && "sr-only")}
                    >
                        <BiRightArrow size={20} />
                        <span className="sr-only">Next Button</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}