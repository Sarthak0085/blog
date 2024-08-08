"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BookmarkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { FaBlog } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoAddCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const Navbar = () => {
  const pathname = usePathname();
  const role = useCurrentRole();
  const user = useCurrentUser();
  return (
    <aside className="bg-transparent fixed top-[78px] pt-[30px] shadow-lg w-[220px] max-w-[250px] h-[calc(100vh-68px)] flex flex-col justify-between items-center rounded-xl border border-r">
      <div className="flex w-full flex-col gap-y-5">
        <Button
          className="mx-[20px] !justify-start"
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
        <Button
          className="mx-[20px] !justify-start"
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
        <Button
          className="mx-[20px] !justify-start"
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
        <Button
          className="mx-[20px] !justify-start"
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
        <Button
          className="mx-[20px] !justify-start"
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
        <Button
          className="mx-[20px] !justify-start"
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
        <Button
          className="mx-[20px] !justify-start"
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
                stroke-width="1.5"
              >
              </path>
            </svg>
            All Comments
          </Link>
        </Button>
        {
          role === "ADMIN" &&
          <Button
            className="mx-[20px] !justify-start"
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
        }
        <Button
          className="mx-[20px] !justify-start"
          asChild
          variant={pathname === "/settings" ? "primary" : "outline"}
        >
          <Link
            href={"/settings"}
            className="gap-2"
          >
            <IoSettingsOutline size={20} /> Settings
          </Link>
        </Button>
      </div>
      <div className="py-5">
        <UserButton />
      </div>
    </aside>
  );
};
