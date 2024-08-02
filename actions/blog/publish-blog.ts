"use server";

import { db } from "@/lib/db";

const checkAndPublishBlogs = async () => {
    const now = new Date();
    const blogsToPublish = await db.blog.findMany({
        where: {
            status: ,
            scheduledPublishDate: {
                lte: now, // Find blogs scheduled to be published now or in the past
            },
        },
    });

    // Update each blog to published status
    for (const blog of blogsToPublish) {
        await db.blog.update({
            where: { id: blog.id },
            data: { status: 'Published' },
        });
        console.log(`Published blog: ${blog.title}`);
    }
};

// Set an interval to check every minute
setInterval(checkAndPublishBlogs, 60 * 1000); // Check every 60 seconds
