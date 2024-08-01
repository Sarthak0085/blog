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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function CommentTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = useCurrentUser();
  const comment = row.original as ExtendComment;
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteLike = () => {
    startTransition(() => {
      deleteComment({ commentId: comment?.id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            setOpenDeleteModal(false);
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

  const handlePinned = () => {
    startTransition(() => {
      pinnedComment({ commentId: comment?.id })
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

  return (
    <div className="flex items-center justify-center space-x-2">
      <Link href={`/blog/${comment?.blog?.slug}`}>
        <Button
          title="View"
          aria-label="View"
          variant="ghost"
          className="flex h-8 w-8 p-0 bg-transparent"
        >
          <IoEyeOutline color="blue" size={20} />
        </Button>
      </Link>
      {user?.id === comment.userId && (
        <CommentModal initialValues={comment} setOpen={setOpen} open={open}>
          <CiEdit
            title="Edit Comment"
            aria-label="Edit Comment"
            color="blue"
            size={20}
          />
        </CommentModal>
      )}
      {user?.id === comment.userId &&
        (!comment?.isPinned ? (
          <Button
            title="Pinned"
            aria-label="Pinned"
            variant="ghost"
            className="flex h-8 w-8 p-0 bg-transparent"
            onClick={() => handlePinned()}
          >
            <TbPinned color="blue" size={20} />
          </Button>
        ) : (
          <Button
            title="Unpinned"
            aria-label="Unpinned"
            variant="ghost"
            className="flex h-8 w-8 p-0 bg-transparent"
            onClick={() => handlePinned()}
          >
            <TbPinnedFilled color="blue" size={20} />
          </Button>
        ))}
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteLike}
        isPending={isPending}
        text={"Comment will be deleted from blog"}
      >
        <MdDeleteOutline
          title="Delete Comment"
          aria-label="Delete Comment"
          color="red"
          size={20}
        />
      </DeleteConfirmModal>
    </div>
  );
}
