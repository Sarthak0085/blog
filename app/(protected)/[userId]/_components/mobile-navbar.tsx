"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { LuUser2 } from "react-icons/lu";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { User } from "next-auth";
import { RiLockPasswordLine } from "react-icons/ri";

interface MobileNavbarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    user?: User
}

export const MobileNavbar = ({ open, setOpen, user }: MobileNavbarProps) => {
    const pathname = usePathname();
    const role = useCurrentRole();
    return (
        <DropdownMenu defaultOpen={open}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0"
                    onClick={() => setOpen(!open)}
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="left-2">
                <div className="flex w-full my-8 flex-col space-y-2">
                    <DropdownMenuItem className="p-0 mx-[20px]">
                        <Button
                            className="w-full !justify-start"
                            asChild
                            variant={pathname === `/${user?.id}` ? "primary" : "outline"}
                        >
                            <Link
                                href={`/${user?.id}`}
                                className="gap-2"
                            >
                                <LuUser2 size={20} /> Profile
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0 mx-[20px]">
                        <Button
                            className="mx-[20px] !justify-start"
                            asChild
                            variant={pathname === `/${user?.id}/new-password` ? "primary" : "outline"}
                        >
                            <Link
                                href={`/${user?.id}/new-password`}
                                className="gap-2"
                            >
                                <RiLockPasswordLine size={20} /> New Password
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0 mx-[20px]">
                        <Button
                            className="w-full !justify-start"
                            asChild
                            variant={pathname === `/${user?.id}/get-blogs` ? "primary" : "outline"}
                        >
                            <Link
                                href={`/${user?.id}/get-blogs`}
                                className="gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z" />
                                </svg> All Blogs
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0 mx-[20px]">
                        <Button
                            className="w-full !justify-start"
                            asChild
                            variant={pathname === `/${user?.id}/add-blog` ? "primary" : "outline"}
                        >
                            <Link
                                href={`/${user?.id}/add-blog`}
                                className="gap-2"
                            >
                                <IoAddCircleOutline size={20} /> Add Blog
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0 mx-[20px]">
                        <Button
                            className="w-full !justify-start"
                            asChild
                            variant={pathname === `/${user?.id}/get-likes` ? "primary" : "outline"}
                        >
                            <Link
                                href={`/${user?.id}/get-likes`}
                                className="gap-2"
                            >
                                <FaRegThumbsUp size={16} /> All Likes
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0 mx-[20px]">
                        <Button
                            className="w-full !justify-start"
                            asChild
                            variant={pathname === `/${user?.id}/get-dislikes` ? "primary" : "outline"}
                        >
                            <Link
                                href={`/${user?.id}/get-dislikes`}
                                className="gap-2"
                            >
                                <FaRegThumbsDown size={16} /> All Dislikes
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0 mx-[20px]">
                        <Button
                            className="w-full !justify-start"
                            asChild
                            variant={pathname === `/${user?.id}/get-favourites` ? "primary" : "outline"}
                        >
                            <Link
                                href={`/${user?.id}/get-favourites`}
                                className="gap-2"
                            >
                                <IoMdHeartEmpty size={20} /> All Favourites
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0 mx-[20px]">
                        <Button
                            className="w-full!justify-start"
                            asChild
                            variant={pathname === `/${user?.id}/get-saved-posts` ? "primary" : "outline"}
                        >
                            <Link
                                href={`/${user?.id}/get-saved-posts`}
                                className="gap-2"
                            >
                                <BookmarkIcon height={18} width={18} /> All Saved Posts
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0 mx-[20px]">
                        <Button
                            className="w-full !justify-start"
                            asChild
                            variant={pathname === `/${user?.id}/get-comments` ? "primary" : "outline"}
                        >
                            <Link
                                href={`/${user?.id}/get-comments`}
                                className="gap-2"
                            >
                                <svg fill="none" viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m12.5278 14.5556v-.75h-.75-8.00002c-.56801 0-1.02778-.4598-1.02778-1.0278v-8.00002c0-.56801.45977-1.02778
                                        1.02778-1.02778h12.44442c.568 0 1.0278.45977 1.0278 1.02778v7.94842c0 .9051-.4384 1.7561-1.1748
                                        2.2822l-3.5474 2.5341z"
                                        fill="#fff"
                                        stroke="#646970"
                                        strokeWidth="1.5"
                                    >
                                    </path>
                                </svg>
                                All Comments
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {
                        role === "ADMIN" &&
                        <DropdownMenuItem className="p-0 mx-[20px]">
                            <Button
                                className="w-full !justify-start"
                                asChild
                                variant={pathname === "/admin" ? "secondary" : "outline"}
                            >
                                <Link
                                    href={"/admin"}
                                    className="gap-2"
                                >
                                    <MdOutlineAdminPanelSettings size={20} /> Admin
                                </Link>
                            </Button>
                        </DropdownMenuItem>

                    }
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}