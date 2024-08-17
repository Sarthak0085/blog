import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { BlogStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const blogs = await db.blog.findMany({
            where: {
                status: BlogStatus.PUBLISHED,
            },
            include: {
                category: true,
                comments: true,
                user: true,
                favourites: true,
                savedPosts: true,
            },
            orderBy: [
                { updatedAt: "desc" },
            ]
        });

        if (!blogs) {
            throw new CustomError("Error While fetching blogs", 400);
        }
        return new Response(JSON.stringify(blogs), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        const customError = error as CustomError;
        const status = customError.code || 500;

        return new Response(JSON.stringify(customError), {
            status: status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}