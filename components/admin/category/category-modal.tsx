import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CategoryForm } from "./category-form";

interface CategoryModalProps {
  children: React.ReactNode;
  asChild?: boolean;
  isUpdate?: boolean;
  initialValues?: { id: string; name: string; userId: string };
}

export const CategoryModal = ({
  children,
  initialValues,
  isUpdate,
  asChild,
}: CategoryModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <CategoryForm initialValues={initialValues} isUpdate={isUpdate} />
      </DialogContent>
    </Dialog>
  );
};
