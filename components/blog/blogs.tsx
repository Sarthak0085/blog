"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./blog-card";
import { ExtendBlog } from "@/utils/types";
import { getAllPublishedBlogs } from "@/actions/blog/get-blogs";
import { PulseLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

export const Blogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState<ExtendBlog[]>([]);

  const searchParams = useSearchParams();
  const category: string = searchParams.get("category") as string;
  console.log("category", category);
  const tags: string = searchParams.get("tags") as string;
  console.log("tags :", tags);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPublishedBlogs({ category: category, tags: tags });
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
  }, [category, tags])

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

  return (blogs.length > 0 ?
    <div className="flex flex-col items-center justify-center w-full bg-transparent space-y-5">
      {blogs.map((blog) => (
        <div key={blog?.id} >
          <BlogCard
            data={blog}
          />
        </div>
      ))}
    </div>
    :
    <div className="flex items-center justify-center text-5xl text-[red]">
      No Blogs Found
    </div>
  );
};
