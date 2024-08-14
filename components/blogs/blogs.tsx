"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./blog-card";
import { ExtendBlog } from "@/utils/types";
import { getAllPublishedBlogs } from "@/actions/blog/get-blogs";
import { useSearchParams } from "next/navigation";
import { BlogCardSkeleton } from "../loader/blog-card-skeleton";
import { CategoriesList } from "./categories-list";
import { FilterList } from "./filters-lists";
import { TagsLists } from "./tags-list";
import { AuthorLists } from "./author-lists";

export const Blogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState<ExtendBlog[]>([]);
  const [searchParamsState, setSearchParamsState] = useState<{ [key: string]: string }>({});

  const searchParams = useSearchParams();
  // const category: string = searchParams.get("category") as string;
  // const tags: string = searchParams.get("tags") as string;
  // const authorId: string = searchParams.get("authorId") as string;
  // const time: string = searchParams.get("time") as string;
  // const date: string = searchParams.get("date") as string;

  useEffect(() => {
    const params: { [key: string]: string } = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    setSearchParamsState(params);
  }, [searchParams]);

  const handleSearchParamsState = (key: string, value?: string) => {
    setSearchParamsState(prev => {
      const updatedParams = { ...prev };

      if (value === undefined) {
        delete updatedParams[key];
      } else {
        updatedParams[key] = value;
      }

      return updatedParams;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPublishedBlogs({ category: searchParamsState?.category, tags: searchParamsState?.tags, authorId: searchParamsState?.authorId, time: searchParamsState?.time, date: searchParamsState?.date });
        if (data?.error) {
          setError(data?.error);
        }
        if (data?.blogs) {
          setBlogs(data?.blogs as unknown as ExtendBlog[])
        }
      } catch (error) {
        setError("Error while fetching the blogs");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, [searchParamsState, refetch]);

  const handleRefetch = () => {
    setRefetch((prev) => !prev);
  }

  if (error) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center text-[red] font-bold text-3xl">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="lg:w-[75%] flex flex-col items-center justify-start">
        <CategoriesList searchParamsState={searchParamsState} onSearchParamsChange={handleSearchParamsState} />
        {
          isLoading &&
          [1, 2, 3].map((_, index) => (
            <div key={index} className="my-2">
              <BlogCardSkeleton />
            </div>
          ))
        }
        {!isLoading && !error ? blogs.length > 0 ?
          <div className="flex flex-col items-center justify-center w-full bg-transparent space-y-5">
            {blogs.map((blog) => (
              <div key={blog?.id} >
                <BlogCard
                  data={blog}
                  refetch={handleRefetch}
                />
              </div>
            ))}
          </div>
          :
          <div className="flex items-center justify-center text-5xl text-[red]">
            No Blogs Found
          </div>
          : null
        }
      </div>
      <div className="hidden lg:block lg:w-[25%] mt-8">
        {!isLoading && <FilterList />}
        <TagsLists />
        <AuthorLists />
      </div>
    </>
  )
};
