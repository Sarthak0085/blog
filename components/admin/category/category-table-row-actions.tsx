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
import { useState } from "react";

interface CategoriesTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function CategoriesTableRowActions<TData>({
  row,
}: CategoriesTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
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
            <Button
              variant={"ghost"}
              className="w-full"
              onClick={() => setOpen(true)}
            >
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Button>
          </CategoryModal>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
