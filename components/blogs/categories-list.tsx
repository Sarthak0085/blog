"use client";

import { getAllCategories } from "@/actions/category/get-categories";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/hooks/useWindowSize";
import { CategoryListSkeleton } from "@/components/loader/category-list-skeleton";

interface CategoriesListProps {
    searchParamsState: { [key: string]: string };
    onSearchParamsChange: (key: string, value?: string) => void;
}

export const CategoriesList = ({ searchParamsState, onSearchParamsChange }: CategoriesListProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(6);

    const { width } = useWindowSize();

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
        const updatedParams = { ...searchParamsState };

        if (updatedParams.category === name) {
            delete updatedParams.category;
        } else {
            updatedParams.category = name;
        }
        onSearchParamsChange('category', updatedParams?.category);

        const queryString = Object.entries(updatedParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const url = `/blogs${queryString ? `?${queryString}` : ''}`;
        router.push(url);
    };

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
            <div className="my-4">
                <CategoryListSkeleton />
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
        <div className="relative max-w-[600px] my-8 overflow-hidden">
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
                                variant={searchParamsState?.category !== category?.name ? "outline" : "primary"}
                                className={cn(searchParamsState?.category !== category?.id && "!bg-transparent !border border-black")}
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