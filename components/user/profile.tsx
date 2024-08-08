"use client";

import { getUserById } from "@/actions/user/get-users";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { ProfileForm } from "./profile-form";
import { ExtendUser } from "@/nextauth";

export const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<ExtendUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const data = await getUserById(userId as string);
            if (data?.error) {
                setError(data?.error);
            }
            if (data?.data) {
                setUser(data?.data as unknown as ExtendUser)
            }
        } catch (error) {
            setError("Error while fetching user data");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [userId]);

    const handleRefetch = () => {
        fetchData();
    }


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
        <ProfileForm user={user} refetch={handleRefetch} />
    )

}