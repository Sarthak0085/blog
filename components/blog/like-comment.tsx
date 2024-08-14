import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LikeCommentSchema } from "@/schemas";
import { ExtendComment } from "@/utils/types";
import * as z from "zod";
import { useState, useTransition } from "react"
import { likeComment } from "@/actions/comments/like-comment";
import { toast } from "sonner";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import LoginButton from "../auth/login-button";

export const LikeComment = ({ comment, refetch }: { comment: ExtendComment | undefined; refetch: () => void; }) => {
    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [like, setLike] = useState({
        isLiked: comment && !!comment.likes?.find((item) => item.userId === user?.id),
    });

    const handleLike = (values: z.infer<typeof LikeCommentSchema>) => {
        const prevLike = like;
        setLike((prev) => ({
            isLiked: !prev.isLiked,
        }));
        startTransition(() => {
            likeComment(values)
                .then((data) => {
                    if (data?.success) {
                        toast.success(data?.success);
                        refetch();
                    }
                    if (data?.error) {
                        setLike(prevLike);
                        toast.error(data?.error);
                    }
                }).catch(() => {
                    setLike(prevLike);
                    toast.error("Something went wrong");
                })
        })
    }

    return (
        <LoginButton open={openLoginModal} setOpen={setOpenLoginModal} asChild={true} mode="Modal">
            <Button
                title="Favourite"
                aria-label="Favourite"
                variant={"icon"}
                className="text-left"
                disabled={isPending}
                onClick={() => !user ? setOpenLoginModal(true) : handleLike({ commentId: comment?.id as string })}
            >
                {like.isLiked ? (
                    <IoMdHeart color="red" size={20} />
                ) : (
                    <IoMdHeartEmpty color="red" size={20} />
                )}
            </Button>
        </LoginButton>
    )
} 