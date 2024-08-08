"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@//components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "./category-modal";
import { useState, useTransition } from "react";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import { deleteCategory } from "@/actions/category/delete-category";
import { Category } from "@prisma/client";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { pinnedCategory } from "@/actions/category/pinned-category";

interface CategoriesTableRowActionsProps<TData> {
  row: Row<TData>;
  refetch: () => void;
}

export function CategoriesTableRowActions<TData>({
  row,
  refetch
}: CategoriesTableRowActionsProps<TData>) {
  const user = useCurrentUser();
  const category = row.original as Category;
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteCategory = () => {
    startTransition(() => {
      deleteCategory({ categoryId: (row?.original as Category).id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            setOpenDeleteModal(false);
            refetch();
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

  const handlePinned = () => {
    startTransition(() => {
      pinnedCategory({ categoryId: category?.id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            refetch();
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
        <DropdownMenuContent align="end" className="w-[160px]">
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
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            {user?.id === category.userId &&
              (!category?.isPinned ? (
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
      </DropdownMenu >
      <CategoryModal
        asChild={true}
        isUpdate={true}
        initialValues={row.original as any}
        open={open}
        refetch={refetch}
        setOpen={setOpen}
      />
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteCategory}
        isPending={isPending}
      />
    </>
  );
}
