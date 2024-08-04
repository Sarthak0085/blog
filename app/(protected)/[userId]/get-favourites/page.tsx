"use client";

import { getAllFavouritesByUserId } from "@/actions/favourites/get-favourites";
import { favouriteColumns } from "@/components/admin/favourite/favourite-columns";
import { AllFavouritesTable } from "@/components/admin/favourite/favourite-table";
import { ExtendFavourites } from "@/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function GetFavouritessPage() {
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<ExtendFavourites[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllFavouritesByUserId(userId as string);
                if (data?.error) {
                    console.error("Error while fetching Dislikes.");
                    setError(data?.error);
                }
                if (data?.data) {
                    setData(data?.data as ExtendFavourites[]);
                }
            } catch (error) {
                setError("Error while fetching Dislikes.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (isLoading) {
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
                        Here&apos;s a list of all the favourites!
                    </p>
                </div>
            </div>
            <AllFavouritesTable data={data} columns={favouriteColumns} />
        </div>
    );
}
