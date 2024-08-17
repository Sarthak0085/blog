import { getAllPublishedBlogs } from '@/actions/blog/get-blogs';
import { getAllAuthors } from '@/actions/user/get-users';
import { domain } from '@/lib/domain';
import { Blog } from '@prisma/client';
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await getAllPublishedBlogs({});
    const blogs: Blog[] = response.blogs as Blog[];
    const { data } = await getAllAuthors();

    const blogEntries: MetadataRoute.Sitemap = blogs?.map((blog) => ({
        url: `${domain}/blog/${blog?.slug}`,
        lastModified: blog?.updatedAt,
        changeFrequency: "weekly",
        priority: 0.9,
        images: [`${blog?.imageUrl}`],
    }));

    const authorEntries: MetadataRoute.Sitemap = data?.map((author) => ({
        url: `${domain}/author/${author?.id}`,
        lastModified: author?.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
        ...(author?.image && {
            images: [`${author?.image as string}`],
        })
    })) as MetadataRoute.Sitemap;

    const authorContactEntries: MetadataRoute.Sitemap = data?.map((author) => ({
        url: `${domain}/contact/${author?.id}`,
        lastModified: author?.updatedAt ?? author?.createdAt,
        changeFrequency: "yearly",
        priority: 0.4,
        ...(author?.image && {
            images: [`${author?.image}`],
        })
    })) as MetadataRoute.Sitemap;

    return [
        {
            url: `${domain}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${domain}/about`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: `${domain}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${domain}/blogs`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.8,
        },
        ...blogEntries,
        ...authorEntries,
        ...authorContactEntries
    ]
}