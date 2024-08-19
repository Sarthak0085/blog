import { ExtendCategory } from "@/utils/types";
import { getAllCategories } from "@/actions/category/get-categories";
import { CategoriesTable } from "@/components/admin/category/category-table";
import { categoryColumns } from "@/components/admin/category/category-columns";
import { AddCategory } from "@/components/admin/category/add-category";

export default async function CategoriesPage() {
  const response = await getAllCategories();
  const error = response.error;
  const data = response.data as ExtendCategory[];

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
          <AddCategory />
        </div>
      </div>
      <CategoriesTable data={data} columns={categoryColumns} />
    </div>
  );
}
