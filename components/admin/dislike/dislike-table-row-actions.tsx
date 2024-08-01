"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@//components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ExtendDislike } from "@/utils/types";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import Link from "next/link";
import { deleteDislike } from "@/actions/dislikes/delete-dislike";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DislikeTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dislike = row.original as ExtendDislike;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteLike = () => {
    startTransition(() => {
      deleteDislike({ dislikeId: dislike?.id })
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/blog/${dislike?.blog?.slug}`}>
          <DropdownMenuItem>View</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DeleteConfirmModal
          open={open}
          setOpen={setOpen}
          handleDelete={handleDeleteLike}
          isPending={isPending}
          text={"Dislike will be removed from blog"}
        >
          <DropdownMenuItem>
            Remove
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DeleteConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
