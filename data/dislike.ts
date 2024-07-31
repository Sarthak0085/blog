import CustomError from "@/lib/customError";
import { db } from "@/lib/db";

export const getDislikeByUserIdAndBlogId = async (userId: string, blogId: string) => {
    try {
        const like = await db.dislike.findUnique({
            where: {
                userId_blogId: {
                    userId: userId,
                    blogId: blogId
                }
            }
        });
        return like;
    } catch (error) {
        throw new CustomError("Failed to get like", 400);
    }
}

export const getDislikeById = async (id: string) => {
    try {
        const dislike = await db.dislike.findUnique({
            where: {
                id: id
            }
        });
        return dislike;
    } catch (error) {
        throw new CustomError("Failed to get dislike", 400);
    }
}