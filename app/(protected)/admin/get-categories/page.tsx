"use client";

import { ExtendCategory } from "@/utils/types";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { getAllCategories } from "@/actions/category/get-categories";
import { CategoriesTable } from "@/components/admin/category/category-table";
import { categoryColumns } from "@/components/admin/category/category-columns";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "@/components/admin/category/category-modal";

export default function GetBlogsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<ExtendCategory[]>([]);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getAllCategories();
      if (data?.error) {
        console.error("Error while fetching Categories.");
        setError(data?.error);
      }
      if (data?.data) {
        setData(data?.data as ExtendCategory[]);
      }
    } catch (error) {
      console.error("Error fetching categories data:", error);
      setError("Error while fetching Categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefetch = () => {
    fetchData();
  }

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
            Here&apos;s a list of all the categories!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CategoryModal open={open} setOpen={setOpen} refetch={handleRefetch} asChild={true}>
            <Button
              variant={"outline"}
              className="bg-blue-500 text-white font-semibold"
              onClick={() => setOpen(true)}
            >
              Add Category
            </Button>
          </CategoryModal>
        </div>
      </div>
      <CategoriesTable data={data} refetch={handleRefetch} />
    </div>
  );
}
