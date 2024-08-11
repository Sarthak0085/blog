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
import { HiBars3 } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchDialog } from "./search-dialog";
import { getAllPublishedBlogs } from "@/actions/blog/get-blogs";
import { Blog } from "@prisma/client";

const font = Lato({
    subsets: ["latin"],
    weight: ["400", "700", "900"],
})

export const Header = () => {
    const pathname = usePathname();
    const user = useCurrentUser();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPublishedBlogs({});
                if (data?.error) {
                    setError(data?.error);
                }
                if (data?.blogs) {
                    setBlogs(data?.blogs);
                }
            } catch (error) {
                setError("Error while fetching blogs");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="hidden md:flex w-full z-20 fixed top-0 left-0 h-[80px] items-center justify-between border-b mb-10 px-10 bg-transparent shadow-md">
                <div className="flex space-x-2 ">
                    <Link href={"/"}>
                        <h2 className={cn("text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-700", font.className)}>VortexVista</h2>
                    </Link>
                </div>
                <div className="w-[300px]">
                    <SearchDialog blogs={blogs} isLoading={isLoading} error={error} />
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        variant={"ghost"}
                        className={cn("!bg-transparent text-muted-foreground hover:!text-blue-500", pathname === "/" && "text-blue-600")}
                    >
                        <Link href={"/"}>
                            Home
                        </Link>
                    </Button>
                    <Button
                        variant={"ghost"}
                        className={cn("!bg-transparent text-muted-foreground hover:!text-blue-500", pathname === "/blogs" && "text-blue-600")}
                    >
                        <Link href={"/blogs"}>
                            Blogs
                        </Link>
                    </Button>
                    <Button
                        variant={"ghost"}
                        className={cn("!bg-transparent text-muted-foreground hover:!text-blue-500", pathname === `/${user?.id}/add-blog` && "text-blue-600")}
                    >
                        <Link href={`/${user?.id}/add-blog`}>
                            Write
                        </Link>
                    </Button>
                    {!user &&
                        <>
                            <Button
                                variant={"ghost"}
                                className={cn("!bg-transparent text-muted-foreground hover:!text-blue-500", pathname === `/auth/login` && "text-blue-600")}
                            >
                                <Link href={"/auth/login"}>
                                    Sign In
                                </Link>
                            </Button>
                            <Button
                                variant={"default"}
                                className={cn("!bg-transparent text-muted-foreground hover:!text-blue-500", pathname === `/auth/register` && "text-blue-600")}
                            >
                                <Link href={"/auth/register"} className="flex gap-2 items-center justify-center">
                                    Get Started <FaArrowRightLong />
                                </Link>
                            </Button>
                        </>
                    }
                    {user &&
                        <Link href={`/${user?.id}`}>
                            <Avatar className={cn(pathname === `/${user?.id}` && "border border-blue-500")}>
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
            <div className="md:hidden flex w-full z-20 fixed top-0 left-0 h-[80px] items-center justify-between border-b mb-10 px-10 bg-transparent shadow-md">
                <div className="flex space-x-2">
                    <Link href={"/"}>
                        <h2 className={cn("text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-700", font.className)}>VortexVista</h2>
                    </Link>
                </div>
                <div className="justify-end">
                    <Button
                        title="Open Header"
                        aria-label="Open Header"
                        variant={"icon"}
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <HiBars3 size={25} />
                    </Button>
                </div>
            </div>
            {
                open &&
                <div className="min-w-[400px] min-h-[100vh] z-[10000] fixed right-0 top-0 flex flex-col items-center justify-start py-20 bg-white">
                    <div className="fixed right-5 top-5">
                        <Button
                            title="Close Header"
                            aria-label="Close Header"
                            variant={"icon"}
                            onClick={() => setOpen(false)}
                        >
                            <RxCross2 size={25} />
                        </Button>
                    </div>
                    <div className="max-w-[300px] px-4 pt-5 pb-20">
                        <SearchDialog blogs={blogs} isLoading={isLoading} error={error} />
                    </div>
                    <div className="flex flex-col items-center space-y-6 px-4">
                        <Button
                            asChild
                            variant={"ghost"}
                            className={cn("!bg-transparent text-[16px] text-muted-foreground hover:!text-blue-500", pathname === "/" && "text-blue-600 text-[18px]")}
                        >
                            <Link href={"/"}>
                                Home
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant={"ghost"}
                            className={cn("!bg-transparent text-[16px] text-muted-foreground hover:!text-blue-500", pathname === "/blogs" && "text-blue-600 text-[18px]")}
                        >
                            <Link href={"/blogs"}>
                                Blogs
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant={"ghost"}
                            className={cn("!bg-transparent text-[16px] text-muted-foreground hover:!text-blue-500", pathname === "/about" && "text-blue-600 text-[18px]")}
                        >
                            <Link href={`/about`}>
                                About
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant={"ghost"}
                            className={cn("!bg-transparent text-[16px] text-muted-foreground hover:!text-blue-500", pathname === `/${user?.id}/add-blog` && "text-blue-600 text-[18px]")}
                        >
                            <Link href={`/${user?.id}/add-blog`}>
                                Write
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant={"ghost"}
                            className={cn("!bg-transparent text-[16px] text-muted-foreground hover:!text-blue-500", pathname === `/contact` && "text-blue-600 text-[18px]")}
                        >
                            <Link href={`/contact`}>
                                Contact
                            </Link>
                        </Button>
                        {!user &&
                            <>
                                <Button
                                    variant={"ghost"}
                                    className={cn("!bg-transparent text-[16px] text-muted-foreground hover:!text-blue-500", pathname === `/auth/login` && "text-blue-600 text-[18px]")}
                                >
                                    <Link href={"/auth/login"}>
                                        Sign In
                                    </Link>
                                </Button>
                                <Button
                                    variant={"default"}
                                    className={cn("!bg-transparent text-[16px] text-muted-foreground hover:!text-blue-500", pathname === `/auth/register` && "text-blue-600 text-[18px]")}
                                >
                                    <Link href={"/auth/register"} className="flex gap-2 items-center justify-center">
                                        Get Started <FaArrowRightLong />
                                    </Link>
                                </Button>
                            </>
                        }
                        {user &&
                            <Link href={`/${user?.id}`}>
                                <Avatar className={cn("!w-[50px] !h-[50px]", pathname === `/${user?.id}` && "border border-blue-500")}>
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
            }
        </>
    )
}