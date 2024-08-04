"use server";

import { db } from "@/lib/db";
import { BlogStatus } from "@prisma/client";

const checkAndPublishBlogs = async () => {
    const now = new Date();
    const blogsToPublish = await db.blog.findMany({
        where: {
            status: BlogStatus.SCHEDULED,
            publishedDateAndTime: {
                lte: now,
            }
        },
    });
    console.log(blogsToPublish);

    for (const blog of blogsToPublish) {
        await db.blog.update({
            where: { id: blog.id },
            data: {
                status: BlogStatus.PUBLISHED
            },
        });
        console.log(`Published blog: ${blog.title}`);
    }
};

setInterval(checkAndPublishBlogs, 60 * 1000); 
