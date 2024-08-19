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
import { User } from "@prisma/client";
import { useState, useTransition } from "react";
import { deleteUser } from "@/actions/user/delete-user";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../delete-confirmation-modal";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { UserModal } from "./user-modal";

interface UsersTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function UserTableRowActions<TData>({
  row,
}: UsersTableRowActionsProps<TData>) {
  const user = row.original as User;
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteUser = () => {
    startTransition(() => {
      deleteUser({ userId: user?.id })
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
          toast.error("Something went wrong. Please try again after sometime.");
        });
    });
  };

  const handleClick = (value: string) => {
    setOpen(false);
    setTimeout(() => {
      if (value === "edit") setOpenModal(true);
      else setOpenDeleteModal(true);
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
          {
            user?.role !== "ADMIN" &&
            <>
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
            </>
          }
        </DropdownMenuContent>
      </DropdownMenu >
      <UserModal
        open={openModal}
        setOpen={setOpenModal}
        data={user}
      />
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteUser}
        isPending={isPending}
      />
    </>
  );
}
