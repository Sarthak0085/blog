import { Blog } from "@/components/blog/blog";
import { Footer } from "@/components/footer";
import { domain } from "@/lib/domain";
import { Metadata } from "next";

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
            description: blog?.description,
            url: `https://vortex-vista.vercel.app/blog/${slug}`
        }
    }
}

export default async function BlogPage({
    params: { slug }
}: BlogPageProps) {
    return (
        <div className="w-full">
            <Blog />
            <Footer />
        </div>
    )
}
