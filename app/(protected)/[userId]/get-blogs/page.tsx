import { getAllBlogsByUserId } from "@/actions/blog/get-blogs";
import { blogColumns } from "@/components/admin/blog/blog-columns";
import { AllBlogsTable } from "@/components/admin/blog/blogs-table";
import { Button } from "@/components/ui/button";
import { ExtendBlog } from "@/utils/types";
import Link from "next/link";

interface BlogsPageProps {
    params: {
        userId: string;
    }
}

export default async function BlogsPage({ params: { userId } }: BlogsPageProps) {
    const response = await getAllBlogsByUserId(userId as string);
    const error = response.error;
    const data = response.blogs as unknown as ExtendBlog[];

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
                    <Link href={`/${userId}/add-blog`}>
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