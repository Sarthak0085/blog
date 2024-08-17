import { getAllPublishedBlogs } from "@/actions/blog/get-blogs";
import { getAllAuthors } from "@/actions/user/get-users";
import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const { blogs } = await getAllPublishedBlogs({});
    const { data } = await getAllAuthors();

    const blogPaths = blogs?.map((blog) => `/blog/${blog.slug}`) as string[];
    const authorPaths = data?.map((author) => `/author/${author?.id}`) as string[];
    const authorContactPaths = data?.map((author) => `/contact/${author?.id}`) as string[];

    return {
        rules: [
            {
                userAgent: "*",
                disallow: "/",
                allow: ["/",
                    "/about",
                    "/contact",
                    "/blogs",
                    ...blogPaths,
                    ...authorPaths,
                    ...authorContactPaths,
                ]
            }
        ],
        sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`
    }
}