"use client";

import { getAllDislikes } from "@/actions/dislikes/get-dislikes";
import { dislikeColumns } from "@/components/admin/dislike/dislike-columns";
import { AllDislikesTable } from "@/components/admin/dislike/dislike-table";
import { ExtendDislike } from "@/utils/types";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function GetDislikesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<ExtendDislike[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDislikes();
        if (data?.error) {
          console.error("Error while fetching Dislikes.");
          setError(data?.error);
        }
        if (data?.data) {
          setData(data?.data as ExtendDislike[]);
        }
      } catch (error) {
        setError("Error while fetching Dislikes.");
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
            Here&apos;s a list of all the dislikes!
          </p>
        </div>
      </div>
      <AllDislikesTable data={data} columns={dislikeColumns} />
    </div>
  );
}
