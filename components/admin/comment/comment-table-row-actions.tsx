"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExtendComment } from "@/utils/types";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { deleteComment } from "@/actions/comments/delete-comment";
import { pinnedComment } from "@/actions/comments/pinned-comment";
import { CommentModal } from "./comment-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function CommentTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = useCurrentUser();
  const comment = row.original as ExtendComment;
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteComment = () => {
    startTransition(() => {
      deleteComment({ commentId: comment?.id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            setOpenDeleteModal(false);
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
      pinnedComment({ commentId: comment?.id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
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

  const handleClick = (value: string) => {
    setOpenModal(false);
    setTimeout(() => {
      if (value === "edit") setOpen(true);
      else setOpenDeleteModal(true);
    }, 50);
  };

  return (
    <>
      <DropdownMenu defaultOpen={openModal}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            onClick={() => setOpenModal((prev) => !prev)}
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[100px]">
          <DropdownMenuItem className="p-0">
            <Button
              asChild
              className="w-full !justify-start p-1 space-x-2 text-[blue] hover:text-[blue]"
              variant="ghost"
            >
              <Link href={`/blog/${comment?.blog?.slug}`}>
                <IoEyeOutline color="blue" size={20} />
                <span> View </span>
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user?.id === comment.userId && (
            <DropdownMenuItem className="p-0">
              <Button
                className="w-full !justify-start p-1 space-x-2 font-medium"
                variant={"edit"}
                onClick={() => handleClick("edit")}
              >
                <CiEdit color="#FFC107" size={20} />
                <span> Edit </span>
              </Button>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            {user?.id === comment.userId &&
              (!comment?.isPinned ? (
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
              onClick={() => handleClick("delete")}
            >
              <MdDeleteOutline size={20} />
              <span>Delete</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CommentModal initialValues={comment} setOpen={setOpen} open={open} />
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteComment}
        isPending={isPending}
        text={"Comment will be deleted from blog"}
      />
    </>
  );
}
