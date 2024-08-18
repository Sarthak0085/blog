"use client";

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { savedPostColumns } from "@/components/admin/saved-post/saved-post-columns";
import { AllSavedPostsTables } from "@/components/admin/saved-post/saved-post-table";
import { ExtendSavedPost } from "@/utils/types";
import { getAllSavedPosts } from "@/actions/savedpost/get-saved-posts";

export default async function AllSavedPostsPage() {
  const response = await getAllSavedPosts();
  const error = response.error;
  const data = response.data as ExtendSavedPost[];

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
            Here&apos;s a list of all the saved posts!
          </p>
        </div>
      </div>
      <AllSavedPostsTables data={data} columns={savedPostColumns} />
    </div>
  );
}
