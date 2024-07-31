import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
  children: React.ReactNode;
  isPending?: boolean;
}

export const DeleteConfirmModal = ({
  open,
  setOpen,
  handleDelete,
  children,
  isPending,
}: DeleteConfirmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger onClick={() => setOpen(false)}>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <DialogTitle hidden>Are you sure you want to delete ?</DialogTitle>
        <div className="w-full items-center justify-between">
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
