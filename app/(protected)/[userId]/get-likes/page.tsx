import { ExtendLike } from "@/utils/types";
import { getAllLikesByUserId } from "@/actions/likes/get-likes";
import { AllLikesTable } from "@/components/admin/like/like-table";
import { likeColumns } from "@/components/admin/like/like-columns";

interface LikesPageProps {
    params: {
        userId: string;
    }
}

export default async function LikesPage({ params: { userId } }: LikesPageProps) {
    const response = await getAllLikesByUserId(userId as string);
    const error = response.error;
    const data = response.data as ExtendLike[];

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
                        Here&apos;s a list of all the likes!
                    </p>
                </div>
            </div>
            <AllLikesTable data={data} columns={likeColumns} />
        </div>
    );
}
