import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "./user-form";
import { User } from "@prisma/client";

interface UserModalProps {
    children?: React.ReactNode;
    asChild?: boolean;
    data: User;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const UserModal = ({
    children,
    data,
    asChild,
    open,
    setOpen,
}: UserModalProps) => {
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild={asChild} onClick={() => setOpen(!open)}>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <DialogTitle hidden>Edit Comment</DialogTitle>
                <UserForm data={data} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
};
