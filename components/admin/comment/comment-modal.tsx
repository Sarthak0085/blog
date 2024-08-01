import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CommentForm } from "./comment-form";

interface CategoryModalProps {
  children?: React.ReactNode;
  asChild?: boolean;
  initialValues?: {
    id: string;
    blogId: string;
    parentId: string | null;
    content: string;
  };
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CommentModal = ({
  children,
  initialValues,
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
        <DialogTitle hidden>Edit Comment</DialogTitle>
        <CommentForm initialValues={initialValues} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
