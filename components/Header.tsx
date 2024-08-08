"use client";

import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { FaUser } from "react-icons/fa"
import { FaArrowRightLong } from "react-icons/fa6";
import { Lato } from "next/font/google"
import { cn } from "@/lib/utils"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const font = Lato({
    subsets: ["latin"],
    weight: ["400", "700", "900"],
})

export const Header = () => {
    const user = useCurrentUser();
    return (
        <div className="w-full z-20 fixed top-0 left-0 h-[80px] flex items-center justify-between border-b mb-10 px-10 bg-transparent shadow-md">
            <div className="flex space-x-2 ">
                <h2 className={cn("text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-700", font.className)}>VortexVista</h2>
            </div>
            <div className="w-[300px]">
                <Input
                    placeholder="Search posts by title, slug..."
                    className="placeholder:text-muted-foreground text-sm outline-none outline-1 outline-black focus:!outline-none focus:!ring-2 focus:!ring-blue-500"
                />
            </div>
            <div className="flex items-center space-x-4">
                <Button
                    variant={"ghost"}
                    className="!bg-transparent text-muted-foreground hover:!text-blue-500"
                >
                    <Link href={"/"}>
                        Home
                    </Link>
                </Button>
                <Button
                    variant={"ghost"}
                    className="!bg-transparent text-muted-foreground hover:!text-blue-500"
                >
                    <Link href={"/blogs"}>
                        Blogs
                    </Link>
                </Button>
                <Button
                    variant={"ghost"}
                    className="!bg-transparent text-muted-foreground hover:!text-blue-500"
                >
                    <Link href={`/${user?.id}/add-blog`}>
                        Write
                    </Link>
                </Button>
                {!user &&
                    <>
                        <Button
                            variant={"ghost"}
                            className="!bg-transparent text-muted-foreground hover:!text-blue-500"
                        >
                            <Link href={"/auth/login"}>
                                Sign In
                            </Link>
                        </Button>
                        <Button
                            variant={"default"}
                            className="!bg-blue-500 hover:!bg-blue-600 rounded-lg"
                        >
                            <Link href={"/auth/register"} className="flex gap-2 items-center justify-center">
                                Get Started <FaArrowRightLong />
                            </Link>
                        </Button>
                    </>
                }
                {user &&
                    <Link href={`/${user?.id}`}>
                        <Avatar>
                            <AvatarImage
                                src={user?.image ?? ""}
                                alt="Avatar"
                            />
                            <AvatarFallback className="bg-sky-500">
                                <FaUser className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                }
            </div>
        </div>
    )
}