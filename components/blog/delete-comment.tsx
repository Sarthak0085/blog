import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { DeleteCommentSchema } from "@/schemas";
import * as z from "zod";
import { useState, useTransition } from "react"
import { toast } from "sonner";
import LoginButton from "@/components/auth/login-button";
import { MdDeleteOutline } from "react-icons/md";
import { deleteComment } from "@/actions/comments/delete-comment";
import { ExtendComment } from "@/utils/types";
import { User } from "next-auth";

interface DeleteCommentProps {
    comment?: Omit<ExtendComment, "blog">;
    refetch: () => void;
    user: User
}

export const DeleteComment = ({ comment, refetch, user }: DeleteCommentProps) => {
    const [isPending, startTransition] = useTransition();
    const [openLoginModal, setOpenLoginModal] = useState(false);

    const handleLike = (values: z.infer<typeof DeleteCommentSchema>) => {
        startTransition(() => {
            deleteComment(values)
                .then((data) => {
                    if (data?.success) {
                        toast.success(data?.success);
                        refetch();
                    }
                    if (data?.error) {
                        toast.error(data?.error);
                    }
                }).catch(() => {
                    toast.error("Something went wrong");
                })
        })
    }

    return (user?.id === comment?.userId &&
        <>
            <Button
                title="Favourite"
                aria-label="Favourite"
                variant={"icon"}
                className="text-left"
                disabled={isPending}
                onClick={() => !user ? setOpenLoginModal(true) : handleLike({ commentId: comment?.id as string })}
            >
                <MdDeleteOutline color="red" size={22} />
            </Button>
            {openLoginModal && <LoginButton open={openLoginModal} setOpen={setOpenLoginModal} asChild={true} mode="Modal" />}
        </>
    )
} 