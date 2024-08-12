import { Blogs } from "@/components/blogs/blogs";
import { Separator } from "@/components/ui/separator";
import Head from "next/head";

export default function BlogsPage() {
    return (
        <>
            <Head>
                <title>Blogs | Vortex Vista - Discover Stories, Articles, and More</title>
                <meta name="description" content="Browse through our collection of engaging blog posts, including stories, articles, and more. Use filters to find content that interests you and engage with our community." />
                <meta name="keywords" content="blog, articles, stories, community, writing, filters, authors" />
                <meta name="author" content="Sarthak" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />
                <meta name="theme-color" content="#ffffff" />
                <link rel="canonical" href="https://www.yourwebsite.com/blogs" />
                <meta property="og:title" content="Blogs | Vortex Vista - Discover Stories, Articles, and More" />
                <meta property="og:description" content="Browse through our collection of engaging blog posts, including stories, articles, and more. Use filters to find content that interests you and engage with our community." />
                <meta property="og:image" content="https://www.yourwebsite.com/path-to-your-blog-page-image.jpg" />
                <meta property="og:url" content="https://www.yourwebsite.com/blogs" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Vortex Vista" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blogs | Vortex Vista - Discover Stories, Articles, and More" />
                <meta name="twitter:description" content="Browse through our collection of engaging blog posts, including stories, articles, and more. Use filters to find content that interests you and engage with our community." />
                <meta name="twitter:image" content="https://www.yourwebsite.com/path-to-your-blog-page-image.jpg" />
                <meta name="twitter:site" content="@yourtwitterhandle" />
                <meta name="twitter:creator" content="@yourtwitterhandle" />
            </Head>
            <section className="py-10 bg-transparent">
                <div className="container w-[100%] mx-auto lg:px-2 px-6">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">VortexVista Blogs</h1>
                        <p className="text-lg text-gray-600 my-2">Enjoy reading our latest articles and insights.</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col lg:flex-row justify-between">
                        <Blogs />
                    </div>
                </div>
            </section>
        </>
    )
}