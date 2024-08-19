import { AllBlogsTable } from "@/components/admin/blog/blogs-table";
import { blogColumns } from "@/components/admin/blog/blog-columns";
import { ExtendBlog } from "@/utils/types";
import { getAllBlogs } from "@/actions/blog/get-blogs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BlogsPage() {
  const response = await getAllBlogs();
  const error = response.error;
  const data = response.data as unknown as ExtendBlog[];

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
        <div className="flex items-center space-x-2">
          <Link href={`/admin/add-blog`}>
            <Button
              variant={"default"}
              className="bg-blue-600 text-white hover:text-blue-600 hover:bg-white font-semibold"
            >
              Add Blog
            </Button>
          </Link>
        </div>
      </div>
      <AllBlogsTable data={data} columns={blogColumns} />
    </div>
  );
}
