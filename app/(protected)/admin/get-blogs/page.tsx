"use client";

import { AllBlogsTable } from "@/components/admin/blog/blogs-table";
import { blogColumns } from "@/components/admin/blog/blog-columns";
import { ExtendBlog } from "@/utils/types";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { getAllBlogs } from "@/actions/blog/get-blogs";

export default function GetBlogsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<ExtendBlog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBlogs();
        if (data?.error) {
          console.error("Error while fetching Blogs.");
          setError(data?.error);
        }
        if (data?.data) {
          setData(data?.data as unknown as ExtendBlog[]);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Error while fetching Blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
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
            Here&apos;s a list of all the blogs!
          </p>
        </div>
        <div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
      </div>
      <AllBlogsTable data={data} columns={blogColumns} />
    </div>
  );
}
