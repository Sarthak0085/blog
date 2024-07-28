import CustomError from "@/lib/customError";
import { db } from "@/lib/db";

export const getLikeByUserIdAndBlogId = async (userId: string, blogId: string) => {
    try {
        const like = await db.like.findUnique({
            where: {
                userId_blogId: {
                    userId: userId,
                    blogId: blogId
                }
            }
        });
        return like;
    } catch (error) {
        console.error("Error getting like:", error);
        throw new CustomError("Failed to get like", 400);
    }
}
