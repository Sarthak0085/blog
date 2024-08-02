"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@//components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { Blog } from "@prisma/client";
import { IoEyeOutline } from "react-icons/io5";
import { toast } from "sonner";
import { pinnedBlog } from "@/actions/blog/pinned-blog";
import { deleteBlog } from "@/actions/blog/delete-blog";
import { MdDeleteOutline } from "react-icons/md";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface BlogsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function BlogTableRowActions<TData>({
  row,
}: BlogsTableRowActionsProps<TData>) {
  const blog = row.original as Blog;
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handlePinned = () => {
    startTransition(() => {
      pinnedBlog({ blogId: blog?.id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            window.location.reload();
          }
          if (data?.error) {
            toast.error(data?.error);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  const handleDeleteBlog = () => {
    startTransition(() => {
      deleteBlog({ blogId: blog?.id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            setOpen(false);
            window.location.reload();
          }
          if (data?.error) {
            toast.error(data?.error);
          }
        })
        .catch(() => {
          toast.error(
            "Something went wrong. Please try again after sometime."
          );
        });
    });
  };

  const handleClick = () => {
    setOpen(false);
    setTimeout(() => {
      setOpenDeleteModal(true);
    }, 50);
  };

  return (
    <>
      <DropdownMenu defaultOpen={open}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center justify-center h-8 w-8 p-0 data-[state=open]:bg-muted"
            onClick={() => setOpen((prev) => !prev)}
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {blog.status === "PUBLISHED" &&
            <>
              <DropdownMenuItem className="p-0">
                <Link href={`/blog/${blog?.slug}`}>
                  <Button
                    className="w-full !justify-start px-2 py-2 space-x-2 h-auto  font-medium text-[blue] hover:text-[blue]"
                    variant="ghost"
                  >
                    <IoEyeOutline color="blue" size={20} />
                    <span> View </span>
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          }
          <DropdownMenuItem className="p-0">
            <Link href={`/admin/edit-blog/${blog?.id}`}>
              <Button
                className="w-full !justify-start p-1 space-x-2 font-medium"
                variant={"edit"}
              >
                <CiEdit color="#FFC107" size={20} />
                <span> Edit </span>
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            {user?.id === blog.userId &&
              (!blog?.isPinned ? (
                <Button
                  variant="ghost"
                  className="w-full !justify-start space-x-2 font-medium p-1 bg-transparent text-muted-foreground"
                  onClick={() => handlePinned()}
                >
                  <TbPinned size={20} />
                  <span>Pinned</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full !justify-start space-x-2 font-medium p-1 bg-transparent text-muted-foreground"
                  onClick={() => handlePinned()}
                >
                  <TbPinnedFilled size={20} />
                  <span>UnPinned</span>
                </Button>
              ))}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              className="w-full !justify-start space-x-2 font-medium p-1 bg-transparent text-[red] hover:text-[red]"
              onClick={() => handleClick()}
            >
              <MdDeleteOutline size={20} />
              <span>Delete</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu >
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteBlog}
        isPending={isPending}
      />
    </>
  );
}
