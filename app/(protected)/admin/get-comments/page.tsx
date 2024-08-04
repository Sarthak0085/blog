"use client";

import { ExtendComment } from "@/utils/types";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { AllCommentsTable } from "@/components/admin/comment/comment-table";
import { commentColumns } from "@/components/admin/comment/comment-columns";
import { getAllComments } from "@/actions/comments/get-comments";

export default function AllCommentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<ExtendComment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllComments();
        if (data?.error) {
          console.error("Error while fetching Comments.");
          setError(data?.error);
        }
        if (data?.data) {
          setData(data?.data as ExtendComment[]);
        }
      } catch (error) {
        setError("Error while fetching Comments.");
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
            Here&apos;s a list of all the comments!
          </p>
        </div>
      </div>
      <AllCommentsTable data={data} columns={commentColumns} />
    </div>
  );
}
