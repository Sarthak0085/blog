"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { BookmarkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoAddCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { User } from "next-auth";
import { useState } from "react";
import { AdminMobileNavbar } from "./admin-mobile-navbar";

export const AdminNavbar = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const role = useCurrentRole();
  const [open, setOpen] = useState(false);
  return (role === "ADMIN" &&
    <>
      <aside className="bg-transparent lg:flex hidden fixed top-[78px] left-0 pt-[30px] shadow-lg w-[220px] max-w-[250px] h-[calc(100vh-68px)]  flex-col justify-between items-center rounded-xl border border-r">
        <div className="flex w-full flex-col gap-y-5">
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === `/admin/get-users` ? "primary" : "outline"}
          >
            <Link
              href={`/admin/get-users`}
              className="gap-2"
            >
              <HiOutlineUserGroup size={20} /> All Users
            </Link>
          </Button>
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === `/admin/get-blogs` ? "primary" : "outline"}
          >
            <Link
              href={`/admin/get-blogs`}
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
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === `/admin/add-blog` ? "primary" : "outline"}
          >
            <Link
              href={`/admin/add-blog`}
              className="gap-2"
            >
              <IoAddCircleOutline size={20} /> Add Blog
            </Link>
          </Button>
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === `/admin/get-categories` ? "primary" : "outline"}
          >
            <Link
              href={`/admin/get-categories`}
              className="gap-2"
            >
              <BiCategory size={20} /> All Categories
            </Link>
          </Button>
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === `/admin/get-likes` ? "primary" : "outline"}
          >
            <Link
              href={`/admin/get-likes`}
              className="gap-2"
            >
              <FaRegThumbsUp size={16} /> All Likes
            </Link>
          </Button>
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === `/admin/get-dislikes` ? "primary" : "outline"}
          >
            <Link
              href={`/admin/get-dislikes`}
              className="gap-2"
            >
              <FaRegThumbsDown size={16} /> All Dislikes
            </Link>
          </Button>
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === `/admin/get-favourites` ? "primary" : "outline"}
          >
            <Link
              href={`/admin/get-favourites`}
              className="gap-2"
            >
              <IoMdHeartEmpty size={20} /> All Favourites
            </Link>
          </Button>
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === `/admin/get-saved-posts` ? "primary" : "outline"}
          >
            <Link
              href={`/admin/get-saved-posts`}
              className="gap-2"
            >
              <BookmarkIcon height={18} width={18} /> All Saved Posts
            </Link>
          </Button>
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === `/admin/get-comments` ? "primary" : "outline"}
          >
            <Link
              href={`/admin/get-comments`}
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
          <Button
            className="mx-[20px] !justify-start"
            asChild
            variant={pathname === "/admin/settings" ? "primary" : "outline"}
          >
            <Link
              href={"/admin/settings"}
              className="gap-2"
            >
              <IoSettingsOutline size={20} /> Settings
            </Link>
          </Button>
        </div>
        <div className="py-5">
          <UserButton user={user} />
        </div>
      </aside>
      <div className="block lg:hidden">
        <AdminMobileNavbar open={open} setOpen={setOpen} user={user} />
      </div>
    </>
  );
};
