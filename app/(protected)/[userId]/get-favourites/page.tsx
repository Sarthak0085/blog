import { getAllFavouritesByUserId } from "@/actions/favourites/get-favourites";
import { favouriteColumns } from "@/components/admin/favourite/favourite-columns";
import { AllFavouritesTable } from "@/components/admin/favourite/favourite-table";
import { ExtendFavourites } from "@/utils/types";

interface FavouritesPageProps {
    params: {
        userId: string;
    }
}

export default async function FavouritesPage({ params: { userId } }: FavouritesPageProps) {
    const response = await getAllFavouritesByUserId(userId as string);
    const error = response.error;
    const data = response.data as ExtendFavourites[];

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
                        Here&apos;s a list of all the favourites!
                    </p>
                </div>
            </div>
            <AllFavouritesTable data={data} columns={favouriteColumns} />
        </div>
    );
}
