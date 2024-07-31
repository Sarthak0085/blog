import CustomError from "@/lib/customError";
import { db } from "@/lib/db";

export const getSavedPostByUserIdAndBlogId = async (userId: string, blogId: string) => {
    try {
        const savedPost = await db.savedPost.findUnique({
            where: {
                userId_blogId: {
                    userId: userId,
                    blogId: blogId
                }
            }
        });
        return savedPost;
    } catch (error) {
        console.error("Error getting like:", error);
        throw new CustomError("Failed to get like", 400);
    }
}

export const getSavedPostById = async (id: string) => {
    try {
        const savedPost = await db.favourite.findUnique({
            where: {
                id: id
            }
        });
        return savedPost;
    } catch (error) {
        throw new CustomError("Failed to get Favourite", 400);
    }
}