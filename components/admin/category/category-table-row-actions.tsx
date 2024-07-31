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
import { CategoryModal } from "./category-modal";
import { useState, useTransition } from "react";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import { deleteCategory } from "@/actions/category/delete-category";
import { Category } from "@prisma/client";
import { toast } from "sonner";

interface CategoriesTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function CategoriesTableRowActions<TData>({
  row,
}: CategoriesTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteCategory = () => {
    startTransition(() => {
      deleteCategory({ categoryId: (row?.original as Category).id })
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
          toast.error("Something went wrong. Please try again after Sometime");
        });
    });
  };

  return (
    <>
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
          <CategoryModal
            asChild={true}
            isUpdate={true}
            initialValues={row.original as any}
            open={open}
            setOpen={setOpen}
          >
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </CategoryModal>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DeleteConfirmModal
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            handleDelete={handleDeleteCategory}
          >
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DeleteConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
