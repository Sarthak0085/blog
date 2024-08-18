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
import { ExtendDislike } from "@/utils/types";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import Link from "next/link";
import { deleteDislike } from "@/actions/dislikes/delete-dislike";
import { pinnedDislike } from "@/actions/dislikes/pinned-dislike";
import { IoEyeOutline } from "react-icons/io5";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DislikeTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dislike = row.original as ExtendDislike;
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteDislike = () => {
    startTransition(() => {
      deleteDislike({ dislikeId: dislike?.id })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            setOpen(false);
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
      pinnedDislike({ dislikeId: dislike?.id })
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

  const handleClick = () => {
    setOpen(false);
    setTimeout(() => {
      setOpenDeleteModal(true);
    }, 50);
  };

  return (
    <>
      <DropdownMenu defaultOpen={open}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            onClick={() => setOpen((prev) => !prev)}
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[100px]">
          <DropdownMenuItem className="p-0">
            <Link href={`/blog/${dislike?.blog?.slug}`}>
              <Button
                className="w-full !justify-start px-2 py-2 space-x-2 h-auto  font-medium text-[blue] hover:text-[blue]"
                variant="ghost"
              >
                <IoEyeOutline color="blue" size={20} />
                <span> View </span>
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            {user?.id === dislike.userId &&
              (!dislike?.isPinned ? (
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
              onClick={() => handleClick()}
            >
              <MdDeleteOutline size={20} />
              <span>Remove</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteDislike}
        isPending={isPending}
        text={"Comment will be deleted from blog"}
      />
    </>
  );
}
