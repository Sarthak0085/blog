"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllAuthors } from "@/actions/user/get-users";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useCustomSearchParams } from "@/hooks/useSearchParams";

export const AuthorLists = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [authors, setAuthors] = useState<User[]>([]);
    const router = useRouter();
    const { updateParam } = useCustomSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllAuthors();
                if (data?.error) {
                    setError(data?.error);
                }
                if (data?.data) {
                    setAuthors(data?.data);
                }
            } catch (error) {
                setError("Error while fetching authors");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);


    if (error) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center text-[red] font-bold text-3xl">
                {error}
            </div>
        );
    }

    return (
        isLoading === false &&
        <div className="w-full my-10">
            <h3 className="text-xl pl-2 text-muted-foreground font-semibold py-4">Popular Authors</h3>
            <div className="w-full">
                {authors.slice(0, 10).map((author, index) => (
                    <Card key={index}>
                        <CardContent
                            className="flex items-center justify-center space-x-4 !p-5 cursor-pointer"
                            onClick={() => updateParam("author", author?.id)}
                        >
                            <Avatar>
                                <AvatarImage src={author?.image ?? ""} alt="Avatar" />
                                <AvatarFallback className="bg-sky-500">
                                    <FaUser />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col space-y-2 w-full ">
                                <h4 className="text-[18px] font-semibold">{author?.name}</h4>
                                <p className="text-muted-foreground">{`${author?.bio?.slice(0, 50)}...`}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}