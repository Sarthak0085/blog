import { Blogs } from "@/components/blog/blogs";

export default function BlogsPage() {
    return (
        <section className="py-10 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">VortexVista Blogs</h1>
                    <p className="text-lg text-gray-600 my-2">Enjoy reading our latest articles and insights.</p>
                </div>
                <div className="border-t border-gray-300 mb-8 w-full"></div>
                <Blogs />
            </div>
        </section>
    )
}