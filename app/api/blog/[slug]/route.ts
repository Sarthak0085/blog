import CustomError from "@/lib/customError";
import { db } from "@/lib/db";
import { BlogStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        if (!slug) {
            throw new CustomError("Slug not found", 400);
        }

        const blog = await db.blog.findUnique({
            where: {
                slug: slug,
                status: BlogStatus.PUBLISHED,
            },
            include: {
                user: true,
                category: true,
                likes: true,
                comments: {
                    include: {
                        user: true,
                        likes: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    }
                },
                dislikes: true,
                favourites: true,
                savedPosts: true,
            }
        });

        if (!blog) {
            throw new CustomError("Blog Not Found", 404);
        }

        return new Response(JSON.stringify(blog), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        const customError = error as CustomError;
        const status = customError.code || 500;

        return new Response(
            JSON.stringify({
                error: customError.message || 'Internal Server Error',
            }),
            {
                status,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}