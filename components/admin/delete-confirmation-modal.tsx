import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

interface DeleteConfirmModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
  children: React.ReactNode;
  isPending?: boolean;
  text?: string;
}

export const DeleteConfirmModal = ({
  open,
  setOpen,
  handleDelete,
  children,
  isPending,
  text,
}: DeleteConfirmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger onClick={() => setOpen(false)}>{children}</DialogTrigger>
      <DialogContent className="w-[400px] shadow-md items-center justify-center">
        <DialogTitle>Are you sure you want to delete ?</DialogTitle>
        {text && <DialogHeader>{text}</DialogHeader>}
        <div className="w-full flex items-center justify-between">
          <Button
            aria-label="Cancel"
            variant={"cancel"}
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            aria-label="Delete"
            variant={"delete"}
            disabled={isPending}
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
