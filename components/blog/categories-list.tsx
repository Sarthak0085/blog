"use client";

import { getAllCategories } from "@/actions/category/get-categories";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react"
import { PulseLoader } from "react-spinners";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/hooks/useWindowSize";

export const CategoriesList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(6);

    const { width } = useWindowSize();

    const searchParams = useSearchParams();
    const categoryName = searchParams.get("category");
    const tags = searchParams.get("tags");

    const router = useRouter();

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsToShow < categories.length ? prevIndex + itemsToShow : prevIndex
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - itemsToShow >= 0 ? prevIndex - itemsToShow : prevIndex
        );
    };

    const currentCategories = categories.slice(currentIndex, currentIndex + itemsToShow);


    const handleClick = (name: string) => {
        if (categoryName === name && tags !== null) {
            router.push(`/blogs?tags=${tags}`);
        } else if (categoryName === name) {
            router.push(`/blogs?`);
        }
        else if (tags !== null) {
            router.push(`/blogs?category=${name}&tags=${tags}`);
        }
        else {
            router.push(`/blogs?category=${name}`);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCategories();
                if (data?.error) {
                    setError(data?.error);
                }
                if (data?.data) {
                    setCategories(data?.data);
                }
            } catch (error) {
                setError("Error while fetching Categories");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);


    useEffect(() => {
        if (width && width > 640) {
            setItemsToShow(6);
        }
        else if (width && width > 540) {
            setItemsToShow(5);
        }
        else if (width && width > 468) {
            setItemsToShow(4);
        }
        else if (width && width > 300) {
            setItemsToShow(3);
        }
        else {
            setItemsToShow(2);
        }

    }, [width])

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
        <div className="relative my-8 w-full overflow-hidden">
            <div className="flex justify-center items-center">
                <Button
                    variant={"icon"}
                    title="Previous Button"
                    aria-label="Previous Button"
                    onClick={handlePrev}
                    hidden={currentIndex === 0}
                    disabled={currentIndex === 0}
                    className={cn("absolute left-0 rounded-full !p-3 flex items-center justify-center bg-gray-200 hover:bg-sky-500", currentIndex === 0 && "sr-only")}
                >
                    <BiLeftArrow size={15} />
                    <span className="sr-only">Previous Category Button</span>
                </Button>
                <div className="flex justify-center items-center w-full overflow-auto px-1">
                    <div className="flex items-start space-x-4">
                        {currentCategories?.map((category) => (
                            <Button
                                key={category?.id}
                                variant={categoryName !== category?.name ? "outline" : "primary"}
                                className={cn(categoryName !== category?.id && "!bg-transparent !border border-black")}
                                onClick={() => handleClick(category?.name)}
                            >
                                <span>{category?.name}</span>
                            </Button>
                        ))}
                    </div>
                </div>
                <Button
                    variant={"icon"}
                    title="Next Button"
                    aria-label="Next Button"
                    onClick={handleNext}
                    hidden={currentIndex + itemsToShow >= categories.length}
                    disabled={currentIndex + itemsToShow >= categories.length}
                    className={cn("absolute right-0 rounded-full !p-3 flex items-center justify-center bg-gray-200 hover:bg-sky-500", currentIndex + itemsToShow >= categories.length && "sr-only")}
                >
                    <BiRightArrow size={15} />
                    <span className="sr-only">Next Category Button</span>
                </Button>
            </div>
        </div>
    )
}