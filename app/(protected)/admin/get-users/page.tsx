import { getAllUsers } from "@/actions/user/get-users";
import { ExtendUser } from "@/nextauth";
import { AllUsersTables } from "@/components/admin/user/users-table";
import { userColumns } from "@/components/admin/user/user-columns";

export default async function UsersPage() {
  const response = await getAllUsers();
  const error = response.error;
  const data = response.data as unknown as ExtendUser[];

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
            Here&apos;s a list of all the users!
          </p>
        </div>
      </div>
      <AllUsersTables data={data} columns={userColumns} />
    </div>
  );
}
