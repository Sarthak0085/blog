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
import Link from "next/link";
import { User } from "@prisma/client";
import { useState, useTransition } from "react";
import { deleteUser } from "@/actions/user/delete-user";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../delete-confirmation-modal";

interface BlogsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function BlogTableRowActions<TData>({
  row,
}: BlogsTableRowActionsProps<TData>) {
  const user = row.original as User;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteUser = () => {
    startTransition(() => {
      deleteUser({ userId: user?.id })
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
          toast.error("Something went wrong. Please try again after sometime.");
        });
    });
  };
  return (
    user?.role !== "ADMIN" && (
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
          <Link href={`/admin/edit/${user?.id}`} className="w-full">
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DeleteConfirmModal
            open={open}
            setOpen={setOpen}
            handleDelete={handleDeleteUser}
            isPending={isPending}
          >
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DeleteConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
