"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./blog-card";
import { ExtendBlog } from "@/utils/types";
import { getAllPublishedBlogs } from "@/actions/blog/get-blogs";
import { PulseLoader } from "react-spinners";
import { User } from "@prisma/client";

export const Blogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState<ExtendBlog[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPublishedBlogs();
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
  }, [])

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
    <div className="w-full">
      {blogs.map((blog) => (
        <BlogCard
          key={blog?.id}
          data={blog}
        />
      ))}

      {/* <BlogCard
        title="How to create nextjs project"
        slug="how-to-create-nextjs-project"
        content="This is the just for the test purpose so i have not read much content in this."
        image={"https://picsum.photos/id/237/200/300"}
        tags="NextJs React Javacsript"
        createdAt={"2023-03-23T10:30:00.000Z"}
      />
      <BlogCard
        title="How to create nextjs project"
        slug="how-to-create-nextjs-project"
        content="This is the just for the test purpose so i have not read much content in this."
        image={"https://picsum.photos/id/237/200/300"}
        tags="NextJs React Javacsript"
        createdAt={"2023-03-23T10:30:00.000Z"}
      /> */}
    </div>
  );
};
