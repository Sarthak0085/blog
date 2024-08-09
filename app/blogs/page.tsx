import { Blogs } from "@/components/blog/blogs";
import { CategoriesList } from "@/components/blog/categories-list";
import { Separator } from "@/components/ui/separator";

export default function BlogsPage() {
    return (
        <section className="py-10 bg-transparent">
            <div className="container mx-auto max-w-[720px] px-6">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-700">VortexVista Blogs</h1>
                    <p className="text-lg text-gray-600 my-2">Enjoy reading our latest articles and insights.</p>
                </div>
                <Separator />
                <div className="my-8 w-full overflow-auto">
                    <CategoriesList />
                </div>
                <Blogs />
            </div>
        </section>
    )
}