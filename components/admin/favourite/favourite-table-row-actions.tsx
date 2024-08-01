"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExtendFavourites } from "@/utils/types";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import Link from "next/link";
import { deleteFavourite } from "@/actions/favourites/delete-favourite";
import { IoEyeOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { pinnedFavourite } from "@/actions/favourites/pinned-favourite";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function FavouriteTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = useCurrentUser();
  const favourite = row.original as ExtendFavourites;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteLike = () => {
    startTransition(() => {
      deleteFavourite({ favouriteId: favourite?.id })
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
      pinnedFavourite({ favouriteId: favourite?.id })
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
      <Link href={`/blog/${favourite?.blog?.slug}`}>
        <Button
          title="View Blog"
          aria-label="View Blog"
          variant="ghost"
          className="flex h-8 w-8 p-0 bg-transparent"
        >
          <IoEyeOutline color="blue" size={20} />
        </Button>
      </Link>
      {user?.id === favourite.userId &&
        (!favourite?.isPinned ? (
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
        text={"Favourite will be removed from blog"}
      >
        <IoRemoveCircleOutline
          title="Remove Favourite"
          aria-label="Remove Favourite"
          color="red"
          size={20}
        />
      </DeleteConfirmModal>
    </div>
  );
}
