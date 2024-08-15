"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./blog-card";
import { ExtendBlog } from "@/utils/types";
import { getAllPublishedBlogs } from "@/actions/blog/get-blogs";
import { BlogCardSkeleton } from "../loader/blog-card-skeleton";
import { CategoriesList } from "./categories-list";
import { FilterList } from "./filters-lists";
import { TagsLists } from "./tags-list";
import { AuthorLists } from "./author-lists";
import { Button } from "../ui/button";
import { RxCross1 } from "react-icons/rx";
import { useCustomSearchParams } from "@/hooks/useSearchParams";
import { PulseLoader } from "react-spinners";

export const Blogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState<ExtendBlog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 2;

  const { params, updateParam } = useCustomSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPublishedBlogs({
          category: params?.category,
          tags: params?.tags,
          author: params?.author,
          time: params?.time,
          date: params?.date,
          page: page,
          limit: limit
        });
        if (data?.error) {
          setError(data?.error);
        }
        if (data?.blogs) {
          //@ts-ignore
          setBlogs((prevBlogs) => {
            const newBlogs = data.blogs;
            if (page === 1) {
              return newBlogs;
            }
            return [...prevBlogs, ...newBlogs] as ExtendBlog[];
          });
          setHasMore(data.blogs.length === limit);
        }
      } catch (error) {
        setError("Error while fetching the blogs");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, [page, params, refetch]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;
      if (nearBottom && hasMore && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

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
        <div className="flex justify-center items-center w-full max-w-[600px] my-2">
          <div className="flex items-start gap-4 flex-wrap">
            {Object.entries(params).filter(([key, value]) => value !== '').map(([key, value]) => {
              if (key === 'tags') {
                const tags = value.split(',');
                return (
                  <div key={key} className="flex items-start gap-4 flex-wrap">
                    {tags.map((tag, index) => (
                      <Button
                        key={index}
                        variant={"primary"}
                        onClick={() => updateParam(key, tag)}
                      >
                        {tag}
                        <RxCross1 className="ms-2" />
                      </Button>
                    ))}
                  </div>
                );
              } else {
                let time, date;
                if (key === "time" || key === "date") {
                  time = key === "time" && value.split(",").join("-");
                  date = key === "date" && (value.split(",").slice(4, 15).join("-") || value.slice(4, 15));
                }
                return (
                  <Button
                    key={key}
                    variant={"primary"}
                    onClick={() => updateParam(key)}
                  >
                    {time || date || value}
                    <RxCross1 className="ms-2" />
                  </Button>
                );
              }
            })}
          </div>
        </div>
        <CategoriesList />
        {
          isLoading &&
          [1, 2, 3].map((_, index) => (
            <div key={index} className="my-2">
              <BlogCardSkeleton />
            </div>
          ))
        }
        {
          !isLoading && !error ? blogs.length > 0 ?
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
        {loading && <div className="flex items-center justify-center">
          <PulseLoader />
        </div>}
      </div >
      <div className="hidden lg:block lg:w-[25%] mt-8">
        {!isLoading && <FilterList />}
        <TagsLists />
        <AuthorLists />
      </div>
    </>
  )
};
