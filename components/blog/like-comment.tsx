import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LikeCommentSchema } from "@/schemas";
import { ExtendComment } from "@/utils/types";
import * as z from "zod";
import { useState, useTransition } from "react"
import { likeComment } from "@/actions/comments/like-comment";
import { toast } from "sonner";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

export const LikeComment = ({ comment }: { comment: ExtendComment | undefined }) => {
    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();
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
                        toast.success(data?.success)
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
        <Button
            title="Favourite"
            aria-label="Favourite"
            variant={"icon"}
            className="text-left"
            disabled={isPending}
            onClick={() => handleLike({ commentId: comment?.id as string })}
        >
            {like.isLiked ? (
                <IoMdHeart color="red" size={20} />
            ) : (
                <IoMdHeartEmpty color="red" size={20} />
            )}
        </Button>
    )
} 