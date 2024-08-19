import { Blog } from "@/components/blog/blog";
import { Footer } from "@/components/footer";
import { domain } from "@/lib/domain";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPageProps {
    params: { slug: string };
}

export async function generateMetadata({
    params: { slug }
}: BlogPageProps): Promise<Metadata> {

    const response = await fetch(`${domain}/api/blog/${slug}`);
    if (!response.ok) {
        throw new Error(`Error fetching blog: ${response.statusText}`);
    }
    const blog = await response.json();

    return {
        title: blog?.title,
        description: blog?.shortSummary,
        openGraph: {
            title: blog?.title,
            description: blog?.description
        }
    }
}

export default async function BlogPage({
    params: { slug }
}: BlogPageProps) {
    const response = await fetch(`${domain}/api/blog/${slug}`);
    if (!response.ok) {
        <div className="w-full h-full items-center justify-center text-[red] text-3xl">
            Error while fecthing the data
        </div>
    }
    const blog = await response.json();

    if (!blog) {
        notFound();
    }

    return (
        <div className="w-full">
            <Blog />
            <Footer />
        </div>
    )
}
