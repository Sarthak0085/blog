import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryForm } from "./category-form";
import { useState } from "react";

interface CategoryModalProps {
  children?: React.ReactNode;
  asChild?: boolean;
  isUpdate?: boolean;
  initialValues?: { id: string; name: string; userId: string };
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CategoryModal = ({
  children,
  initialValues,
  isUpdate,
  asChild,
  open,
  setOpen,
}: CategoryModalProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild={asChild} onClick={() => setOpen(!open)}>
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <DialogTitle hidden>
          {isUpdate ? "Update Category" : "Create Category"}
        </DialogTitle>
        <CategoryForm
          initialValues={initialValues}
          isUpdate={isUpdate}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
