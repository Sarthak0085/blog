import { ExtendComment } from "@/utils/types";
import { AllCommentsTable } from "@/components/admin/comment/comment-table";
import { commentColumns } from "@/components/admin/comment/comment-columns";
import { getAllComments } from "@/actions/comments/get-comments";

export default async function AllCommentsPage() {
  const response = await getAllComments();
  const error = response?.error;
  const data = response?.data as ExtendComment[];

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
