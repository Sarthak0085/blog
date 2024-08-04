"use client"

import { getUserById } from "@/actions/user/get-users";
import { UserForm } from "@/components/admin/user/user-form";
import { User } from "@prisma/client";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";

export default function EditUserPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<User>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserById(String(id))
                if (data.error) {
                    toast.error(data.error);
                } if (data?.data) {
                    setData(data?.data as User)
                }
            } catch (error) {
                toast.error("Error while fetching user data");
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center text-blue-600">
                <PulseLoader margin={2} size={20} />
            </div>
        );
    }

    return (
        <div className="bg-white flex flex-grow items-center justify-center h-[100vh] min-w-[600px] max-w-[900px]">
            <UserForm data={data as User} />
        </div>
    )
}