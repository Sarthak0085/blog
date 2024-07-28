import CustomError from "@/lib/customError";
import { db } from "@/lib/db";

export const getFavouriteByUserIdAndBlogId = async (userId: string, blogId: string) => {
    try {
        const favourite = await db.favourite.findUnique({
            where: {
                userId_blogId: {
                    userId: userId,
                    blogId: blogId
                }
            }
        });
        return favourite;
    } catch (error) {
        console.error("Error getting like:", error);
        throw new CustomError("Failed to get like", 400);
    }
}
