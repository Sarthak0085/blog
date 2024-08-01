"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExtendFavourites, ExtendSavedPost } from "@/utils/types";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import Link from "next/link";
import { deleteFavourite } from "@/actions/favourites/delete-favourite";
import { IoEyeOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { pinnedFavourite } from "@/actions/favourites/pinned-favourite";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { deleteSavedPost } from "@/actions/savedpost/delete-saved-post";
import { pinnedSavedPost } from "@/actions/savedpost/pinned-saved-post";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function SavedPostTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = useCurrentUser();
  const savedPost = row.original as ExtendSavedPost;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteLike = () => {
    startTransition(() => {
      deleteSavedPost({ savedPostId: savedPost?.id })
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
      <Link href={`/blog/${savedPost?.blog?.slug}`}>
        <Button
          title="View Blog"
          aria-label="View Blog"
          variant="ghost"
          className="flex h-8 w-8 p-0 bg-transparent"
        >
          <IoEyeOutline color="blue" size={20} />
        </Button>
      </Link>
      {user?.id === savedPost.userId &&
        (!savedPost?.isPinned ? (
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
        open={open}
        setOpen={setOpen}
        handleDelete={handleDeleteLike}
        isPending={isPending}
        text={"This saved blog post will be removed"}
      >
        <IoRemoveCircleOutline
          title="Remove Saved Post"
          aria-label="Remove Saved Post"
          color="red"
          size={20}
        />
      </DeleteConfirmModal>
    </div>
  );
}
