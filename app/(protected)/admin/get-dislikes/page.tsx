import { getAllDislikes } from "@/actions/dislikes/get-dislikes";
import { dislikeColumns } from "@/components/admin/dislike/dislike-columns";
import { AllDislikesTable } from "@/components/admin/dislike/dislike-table";
import { ExtendDislike } from "@/utils/types";

export default async function AllDislikesPage() {
  const response = await getAllDislikes();
  const error = response.error;
  const data = response.data as ExtendDislike[];

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
