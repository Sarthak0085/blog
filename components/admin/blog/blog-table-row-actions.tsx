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
import { useState, useTransition } from "react";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { Blog } from "@prisma/client";

interface BlogsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function BlogTableRowActions<TData>({
  row,
}: BlogsTableRowActionsProps<TData>) {
  const blog = row.original as Blog;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteBlog = () => {
    startTransition(() => {
      //  delete({ userId: user?.id })
      //    .then((data) => {
      //      if (data?.success) {
      //        toast.success(data?.success);
      //        setOpen(false);
      //        window.location.reload();
      //      }
      //      if (data?.error) {
      //        toast.error(data?.error);
      //      }
      //    })
      //    .catch(() => {
      //      toast.error(
      //        "Something went wrong. Please try again after sometime."
      //      );
      //    });
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
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DeleteConfirmModal
          open={open}
          setOpen={setOpen}
          handleDelete={handleDeleteBlog}
          isPending={isPending}
        >
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DeleteConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
