"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@//components/ui/dropdown-menu";
import { ExtendSavedPost } from "@/utils/types";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import Link from "next/link";
import { IoEyeOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { deleteSavedPost } from "@/actions/savedpost/delete-saved-post";
import { pinnedSavedPost } from "@/actions/savedpost/pinned-saved-post";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function SavedPostTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = useCurrentUser();
  const savedPost = row.original as ExtendSavedPost;
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteSavedPost = () => {
    startTransition(() => {
      deleteSavedPost({ savedPostId: savedPost?.id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            setOpen(false);
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

  const handlePinned = () => {
    startTransition(() => {
      pinnedSavedPost({ savedPostId: savedPost?.id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            setOpen(false);
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
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            onClick={() => setOpen((prev) => !prev)}
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[100px]">
          <DropdownMenuItem className="p-0">
            <Link href={`/blog/${savedPost?.blog?.slug}`}>
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
          <DropdownMenuItem className="p-0">
            {user?.id === savedPost.userId &&
              (!savedPost?.isPinned ? (
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
              <IoRemoveCircleOutline size={20} />
              <span>Remove</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteSavedPost}
        isPending={isPending}
        text={"Saved blog post will be removed."}
      />
    </>
  );
}
