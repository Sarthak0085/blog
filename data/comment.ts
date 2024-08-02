import CustomError from "@/lib/customError";
import { db } from "@/lib/db";

export const getCommentById = async (id: string) => {
    try {
        const comment = await db.comment.findUnique({
            where: {
                id
            }
        });
        return comment;
    } catch (error) {
        throw new CustomError("Failed to get comment", 400);
    }
}

export const getCommentLikeByUserIdAndCommentId = async (userId: string, commentId: string) => {
    try {
        const like = await db.commentLike.findUnique({
            where: {
                userId_commentId: {
                    userId: userId,
                    commentId: commentId
                }
            }
        });
        return like;
    } catch (error) {
        throw new CustomError("Failed to get like", 400);
    }
}