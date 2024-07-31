"use client";

import { ExtendLike } from "@/utils/types";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { getAllLikes } from "@/actions/likes/get-likes";
import { AllLikesTable } from "@/components/admin/like-table/like-table";
import { likeColumns } from "@/components/admin/like-table/like-columns";

export default function GetLikesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<ExtendLike[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLikes();
        if (data?.error) {
          console.error("Error while fetching Blogs.");
          setError(data?.error);
        }
        if (data?.data) {
          setData(data?.data as ExtendLike[]);
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
      <AllLikesTable data={data} columns={likeColumns} />
    </div>
  );
}
